/**
 * Reschedule Next Delivery Date API Route
 *
 * Uses Loop Admin API POST /subscription/{loopInternalId}/reschedule to change
 * the next billing date. This is Loop's dedicated reschedule endpoint — it does NOT
 * go through the frequency endpoint, so there is no selling plan validation.
 *
 * Loop API docs: https://developer.loopwork.co/reference/reschedule
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
    // Step 1: GET subscription to resolve Loop internal ID + billing policy (for date validation)
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

    // Validate max date using the billing policy (one cycle from current next billing date)
    const billingPolicy = subscriptionData?.billingPolicy;
    if (billingPolicy?.interval && billingPolicy?.intervalCount) {
      const cycleDays = intervalToDays(billingPolicy.interval, billingPolicy.intervalCount);
      const currentNextBillingEpoch = subscriptionData?.nextBillingDate
        ? Math.floor(new Date(subscriptionData.nextBillingDate).getTime() / 1000)
        : nowEpoch;
      const maxEpoch = currentNextBillingEpoch + (cycleDays * 86400);

      if (newBillingDateEpoch > maxEpoch) {
        return NextResponse.json({
          success: false,
          error: 'You can reschedule within one billing cycle. For longer delays, use Skip or Pause instead.',
        }, { status: 400 });
      }

      console.log(`[RESCHEDULE] Loop internal ID: ${loopInternalId}, interval: ${billingPolicy.interval} × ${billingPolicy.intervalCount}, cycleDays: ${cycleDays}`);
    } else {
      console.log(`[RESCHEDULE] Loop internal ID: ${loopInternalId} (no billing policy found, skipping max-date check)`);
    }

    // Step 2: POST /subscription/{loopInternalId}/reschedule
    // This is Loop's dedicated reschedule endpoint — changes the next billing date
    // without touching the frequency or validating selling plans.
    const rescheduleResult = await loopRequest(
      `/subscription/${loopInternalId}/reschedule`,
      loopToken,
      'POST',
      {
        newBillingDateEpoch,
        rescheduleFutureOrders: true,
        notifyCustomer: false,
      },
    );

    if (!rescheduleResult.response.ok) {
      console.error('[RESCHEDULE] POST reschedule failed:', JSON.stringify(rescheduleResult.data));
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
