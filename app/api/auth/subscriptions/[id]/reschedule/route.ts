/**
 * Reschedule Next Delivery Date API Route
 *
 * Uses Loop Admin API PUT /subscription/{loopInternalId}/frequency to change
 * only the nextBillingDateEpoch while preserving the existing billing/delivery interval.
 *
 * Loop API docs: https://developer.loopwork.co/reference/api-reference
 *
 * @route POST /api/auth/subscriptions/[id]/reschedule
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Minimum lead time in days — fulfillment needs at least this long
const MIN_LEAD_DAYS = 3;

/**
 * Selling plan group IDs mapped by billing interval.
 * Loop's PUT /frequency validates that the variant has a selling plan matching the interval.
 * When a subscription's variant+interval are mismatched (e.g. Pro variant on monthly schedule),
 * we need to re-align the selling plan via a same-variant swap before the frequency update.
 * These must stay in sync with PLAN_CONFIGURATIONS in pause/route.ts.
 */
const INTERVAL_TO_SELLING_PLAN: Record<string, { sellingPlanGroupId: number }> = {
  'WEEK-1':  { sellingPlanGroupId: 98722480502 },  // Starter (Weekly)
  'WEEK-2':  { sellingPlanGroupId: 98722546038 },  // Pro (Bi-Weekly)
  'MONTH-1': { sellingPlanGroupId: 98722578806 },  // Max (Monthly)
};

/**
 * Convert a Loop billing interval to days.
 * Used to compute the max reschedule window (one billing cycle from current date).
 */
function intervalToDays(interval: string, intervalCount: number): number {
  switch (interval) {
    case 'WEEK': return intervalCount * 7;
    case 'MONTH': return intervalCount * 30;
    case 'YEAR': return intervalCount * 365;
    default: return 30; // safe fallback
  }
}

/**
 * Convert a Shopify GID or numeric ID to Loop's shopify-{id} format
 */
function toLoopShopifyId(subscriptionId: string): string {
  if (subscriptionId.startsWith('shopify-') || subscriptionId.startsWith('loop-')) {
    return subscriptionId;
  }
  if (subscriptionId.includes('gid://shopify/SubscriptionContract/')) {
    const numericId = subscriptionId.split('/').pop();
    return `shopify-${numericId}`;
  }
  if (/^\d+$/.test(subscriptionId)) {
    return `shopify-${subscriptionId}`;
  }
  if (subscriptionId.includes('%2F')) {
    const decoded = decodeURIComponent(subscriptionId);
    const numericId = decoded.split('/').pop();
    return `shopify-${numericId}`;
  }
  return subscriptionId;
}

async function loopRequest(
  endpoint: string,
  loopToken: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  body?: object
) {
  const url = `${LOOP_API_BASE}${endpoint}`;
  console.log(`[Loop API] ${method} ${url}`, body ? JSON.stringify(body) : '');

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Loop-Token': loopToken,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseText = await response.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    data = { rawResponse: responseText };
  }

  console.log(`[Loop API] Response ${response.status}:`, JSON.stringify(data).substring(0, 500));
  return { response, data };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: subscriptionId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
  }

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    return NextResponse.json({ error: 'Loop API not configured' }, { status: 500 });
  }

  // Parse and validate the new date
  let newBillingDateEpoch: number;
  try {
    const body = await request.json();
    newBillingDateEpoch = body.newBillingDateEpoch;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!newBillingDateEpoch || typeof newBillingDateEpoch !== 'number') {
    return NextResponse.json({ error: 'newBillingDateEpoch is required' }, { status: 400 });
  }

  // Basic future-date check (detailed interval-aware check comes after fetching the subscription)
  const nowEpoch = Math.floor(Date.now() / 1000);
  const minEpoch = nowEpoch + (MIN_LEAD_DAYS * 86400);
  if (newBillingDateEpoch < minEpoch) {
    return NextResponse.json({
      success: false,
      error: `Please select a date at least ${MIN_LEAD_DAYS} days from now to allow for fulfillment.`,
    }, { status: 400 });
  }

  const loopSubscriptionId = toLoopShopifyId(subscriptionId);
  console.log(`[RESCHEDULE] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

  try {
    // Step 1: GET subscription to get Loop internal ID + current billing policy
    const subResult = await loopRequest(`/subscription/${loopSubscriptionId}`, loopToken, 'GET');
    if (!subResult.response.ok) {
      console.error('[RESCHEDULE] Failed to fetch subscription:', JSON.stringify(subResult.data));
      return NextResponse.json({
        success: false,
        error: 'Unable to reschedule right now. Please try again or contact support.',
      }, { status: 502 });
    }

    const subscriptionData = subResult.data?.data;
    const loopInternalId = subscriptionData?.id;

    if (loopInternalId == null) {
      console.error('[RESCHEDULE] Could not resolve Loop internal ID');
      return NextResponse.json({
        success: false,
        error: 'Could not resolve subscription. Please try again or contact support.',
      }, { status: 500 });
    }

    // Extract current billing/delivery policy to preserve interval
    const billingPolicy = subscriptionData?.billingPolicy;
    const deliveryPolicy = subscriptionData?.deliveryPolicy;

    if (!billingPolicy?.interval || !billingPolicy?.intervalCount) {
      console.error('[RESCHEDULE] Missing billing policy:', JSON.stringify(billingPolicy));
      return NextResponse.json({
        success: false,
        error: 'Unable to read your current billing schedule. Please contact support.',
      }, { status: 500 });
    }

    // Interval-aware max: one billing cycle from the current next billing date
    // This prevents pushing a delivery so far out that it overlaps the following cycle
    const cycleDays = intervalToDays(billingPolicy.interval, billingPolicy.intervalCount);
    const currentNextBillingEpoch = subscriptionData?.nextBillingDate
      ? Math.floor(new Date(subscriptionData.nextBillingDate).getTime() / 1000)
      : nowEpoch;
    const maxEpoch = currentNextBillingEpoch + (cycleDays * 86400);

    if (newBillingDateEpoch > maxEpoch) {
      return NextResponse.json({
        success: false,
        error: `You can reschedule within one billing cycle. For longer delays, use Skip or Pause instead.`,
      }, { status: 400 });
    }

    console.log(`[RESCHEDULE] Using Loop internal ID: ${loopInternalId}, interval: ${billingPolicy.interval} × ${billingPolicy.intervalCount}, cycleDays: ${cycleDays}`);

    // Step 2: PUT /subscription/{loopInternalId}/frequency with same interval but new date
    const frequencyBody = {
      billingPolicy: {
        interval: billingPolicy.interval,
        intervalCount: billingPolicy.intervalCount,
      },
      deliveryPolicy: {
        interval: deliveryPolicy?.interval ?? billingPolicy.interval,
        intervalCount: deliveryPolicy?.intervalCount ?? billingPolicy.intervalCount,
      },
      nextBillingDateEpoch: newBillingDateEpoch,
      discountType: 'OLD',
    };

    let freqResult = await loopRequest(
      `/subscription/${loopInternalId}/frequency`,
      loopToken,
      'PUT',
      frequencyBody,
    );

    // Step 2b: If frequency fails due to selling plan mismatch, align the selling plan and retry.
    // This happens when a subscription's variant doesn't have a selling plan for its current interval
    // (e.g. Pro variant on a monthly schedule after a plan change that swapped the frequency but not the variant).
    const loopErrorMsg = freqResult.data?.message || '';
    if (!freqResult.response.ok && loopErrorMsg.includes('No selling plan found')) {
      const intervalKey = `${billingPolicy.interval}-${billingPolicy.intervalCount}`;
      const planMatch = INTERVAL_TO_SELLING_PLAN[intervalKey];
      const lines = subscriptionData?.lines;

      if (planMatch && lines?.length) {
        console.log(`[RESCHEDULE] Selling plan mismatch detected — aligning via same-variant swap (sellingPlanGroupId: ${planMatch.sellingPlanGroupId})`);

        // Swap each line to the same variant but with the correct selling plan group
        let allSwapsOk = true;
        for (const line of lines) {
          const lineId = line.id;
          const variantId = line.variantShopifyId ?? line.variant?.shopifyId;
          if (!lineId || !variantId) continue;

          const swapResult = await loopRequest(
            `/subscription/${loopSubscriptionId}/line/${lineId}/swap`,
            loopToken,
            'PUT',
            {
              variantShopifyId: variantId,
              quantity: line.quantity || 1,
              pricingType: 'OLD',
              sellingPlanGroupId: planMatch.sellingPlanGroupId,
            },
          );

          if (!swapResult.response.ok) {
            console.error(`[RESCHEDULE] Selling plan alignment swap failed for line ${lineId}:`, JSON.stringify(swapResult.data));
            allSwapsOk = false;
            break;
          }
          console.log(`[RESCHEDULE] Aligned line ${lineId} (variant ${variantId}) with sellingPlanGroupId ${planMatch.sellingPlanGroupId}`);
        }

        if (allSwapsOk) {
          console.log('[RESCHEDULE] Retrying frequency update after selling plan alignment');
          freqResult = await loopRequest(
            `/subscription/${loopInternalId}/frequency`,
            loopToken,
            'PUT',
            frequencyBody,
          );
        }
      } else {
        console.error(`[RESCHEDULE] Cannot align selling plan — no matching config for interval ${intervalKey} or no lines`);
      }
    }

    if (!freqResult.response.ok) {
      console.error('[RESCHEDULE] PUT frequency failed:', JSON.stringify(freqResult.data));
      return NextResponse.json({
        success: false,
        error: 'Unable to reschedule your delivery right now. Please try again or contact support.',
      }, { status: 502 });
    }

    console.log('[RESCHEDULE] Success');

    // Convert epoch back to ISO for the client
    const newDate = new Date(newBillingDateEpoch * 1000).toISOString();

    return NextResponse.json({
      success: true,
      message: 'Delivery rescheduled successfully.',
      nextBillingDate: newDate,
    });
  } catch (error) {
    console.error('[RESCHEDULE] Unexpected error:', error);
    return NextResponse.json({
      success: false,
      error: 'Something went wrong. Please try again or contact support.',
    }, { status: 500 });
  }
}
