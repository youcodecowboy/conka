/**
 * Cancel Subscription API Route
 * 
 * Uses Loop Admin API as the source of truth.
 * Loop will automatically sync changes to Shopify.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Cancellation reasons for analytics
export const CANCELLATION_REASONS = {
  too_expensive: 'Too expensive',
  not_seeing_results: 'Not seeing results',
  too_frequent: 'Deliveries too frequent',
  too_infrequent: 'Deliveries too infrequent',
  switching_product: 'Switching to a different product',
  no_longer_needed: 'No longer needed',
  other: 'Other reason',
} as const;

export type CancellationReasonKey = keyof typeof CANCELLATION_REASONS;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: subscriptionId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Subscription ID is required' },
      { status: 400 }
    );
  }

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    return NextResponse.json(
      { error: 'Loop API not configured' },
      { status: 500 }
    );
  }

  // Parse request body for cancellation reason
  let body: { reason?: CancellationReasonKey; comment?: string } = {};
  try {
    body = await request.json();
  } catch {
    // Body is optional for cancellation
  }

  const { reason, comment } = body;

  // Log cancellation reason for analytics
  if (reason) {
    console.log('[Cancel] Cancellation reason:', {
      subscriptionId,
      reason: CANCELLATION_REASONS[reason] || reason,
      comment,
      timestamp: new Date().toISOString(),
    });
  }

  // The subscription ID should already be Loop's numeric ID
  const loopSubscriptionId = subscriptionId;

  console.log(`[Cancel] Cancelling subscription ${loopSubscriptionId} via Loop API`);

  try {
    const response = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': loopToken,
      },
      body: JSON.stringify({
        cancellationReason: reason ? CANCELLATION_REASONS[reason] : undefined,
        cancellationComment: comment,
      }),
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawResponse: responseText };
    }

    console.log(`[Cancel] Loop API response:`, { status: response.status, data });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: data.message || 'Failed to cancel subscription in Loop',
        loopResponse: data,
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: data.data || data,
    });

  } catch (error) {
    console.error('[Cancel] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel subscription',
      details: String(error),
    }, { status: 500 });
  }
}

// GET endpoint to retrieve cancellation reasons
export async function GET() {
  return NextResponse.json({
    reasons: Object.entries(CANCELLATION_REASONS).map(([key, label]) => ({
      id: key,
      label,
    })),
  });
}
