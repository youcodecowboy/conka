/**
 * Cancel Subscription API Route
 * 
 * Uses Loop Admin API with the shopify-{id} format.
 * This allows us to pass the Shopify subscription contract ID directly,
 * and Loop will find and cancel the corresponding subscription.
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

/**
 * Convert a Shopify GID or numeric ID to Loop's shopify-{id} format
 * Input: "gid://shopify/SubscriptionContract/126077600118" or "126077600118"
 * Output: "shopify-126077600118"
 */
function toLoopShopifyId(subscriptionId: string): string {
  // If it's already in Loop format, return as-is
  if (subscriptionId.startsWith('shopify-') || subscriptionId.startsWith('loop-')) {
    return subscriptionId;
  }
  
  // Extract numeric ID from Shopify GID format
  if (subscriptionId.includes('gid://shopify/SubscriptionContract/')) {
    const numericId = subscriptionId.split('/').pop();
    return `shopify-${numericId}`;
  }
  
  // If it's a plain numeric ID, prefix with shopify-
  if (/^\d+$/.test(subscriptionId)) {
    return `shopify-${subscriptionId}`;
  }
  
  // If it's a URL-encoded GID, decode and extract
  if (subscriptionId.includes('%2F')) {
    const decoded = decodeURIComponent(subscriptionId);
    const numericId = decoded.split('/').pop();
    return `shopify-${numericId}`;
  }
  
  // Fallback: return as-is and let Loop handle it
  return subscriptionId;
}

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

  // Convert to Loop's shopify-{id} format
  const loopSubscriptionId = toLoopShopifyId(subscriptionId);

  console.log(`[Cancel] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

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
        loopSubscriptionId,
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
