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

// Max days into the future a customer can reschedule
const MAX_RESCHEDULE_DAYS = 90;

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

  // Validate: must be in the future
  const nowEpoch = Math.floor(Date.now() / 1000);
  const tomorrowEpoch = nowEpoch + 86400;
  if (newBillingDateEpoch < tomorrowEpoch) {
    return NextResponse.json({
      success: false,
      error: 'Please select a date from tomorrow onwards.',
    }, { status: 400 });
  }

  // Validate: must not be more than MAX_RESCHEDULE_DAYS in the future
  const maxEpoch = nowEpoch + (MAX_RESCHEDULE_DAYS * 86400);
  if (newBillingDateEpoch > maxEpoch) {
    return NextResponse.json({
      success: false,
      error: `You can reschedule up to ${MAX_RESCHEDULE_DAYS} days ahead.`,
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

    console.log(`[RESCHEDULE] Using Loop internal ID: ${loopInternalId}, current interval: ${billingPolicy.interval} × ${billingPolicy.intervalCount}`);

    // Step 2: PUT /subscription/{loopInternalId}/frequency with same interval but new date
    const freqResult = await loopRequest(
      `/subscription/${loopInternalId}/frequency`,
      loopToken,
      'PUT',
      {
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
      }
    );

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
