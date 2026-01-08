/**
 * Skip Next Delivery API Route
 * 
 * Uses Loop Admin API with the shopify-{id} format.
 * This allows us to pass the Shopify subscription contract ID directly,
 * and Loop will find and skip the next delivery for the corresponding subscription.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

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

  // Convert to Loop's shopify-{id} format
  const loopSubscriptionId = toLoopShopifyId(subscriptionId);

  console.log(`[Skip] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

  try {
    // First, get the order schedule to find the next order to skip
    const scheduleResponse = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/order-schedule`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': loopToken,
      },
    });

    let orderIdToSkip: number | null = null;
    
    if (scheduleResponse.ok) {
      const scheduleData = await scheduleResponse.json();
      // Find the next scheduled order
      const orders = scheduleData.data || [];
      const nextOrder = orders.find((o: any) => o.status === 'SCHEDULED' || o.status === 'UPCOMING');
      if (nextOrder) {
        orderIdToSkip = nextOrder.id;
      }
    }

    // Try the order-level skip endpoint if we found an order ID
    if (orderIdToSkip) {
      const skipResponse = await fetch(`${LOOP_API_BASE}/order/${orderIdToSkip}/skip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Loop-Token': loopToken,
        },
      });

      const skipText = await skipResponse.text();
      let skipData;
      try {
        skipData = JSON.parse(skipText);
      } catch {
        skipData = { rawResponse: skipText };
      }

      console.log(`[Skip] Order skip response:`, { status: skipResponse.status, data: skipData });

      if (skipResponse.ok) {
        return NextResponse.json({
          success: true,
          message: 'Next delivery skipped successfully',
          result: skipData.data || skipData,
        });
      }
    }

    // Fallback: try subscription-level skip endpoint
    const response = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/skip-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': loopToken,
      },
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawResponse: responseText };
    }

    console.log(`[Skip] Loop API response:`, { status: response.status, data });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: data.message || 'Failed to skip delivery in Loop',
        loopResponse: data,
        loopSubscriptionId,
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Next delivery skipped successfully',
      result: data.data || data,
    });

  } catch (error) {
    console.error('[Skip] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to skip delivery',
      details: String(error),
    }, { status: 500 });
  }
}
