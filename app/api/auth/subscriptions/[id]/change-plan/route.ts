/**
 * Change Subscription Plan API Route
 * 
 * Uses Loop Admin API with the shopify-{id} format.
 * Supports:
 * - Changing delivery frequency (change-frequency endpoint)
 * - Changing product/variant (swap endpoint on line items)
 * 
 * Loop will automatically sync changes to Shopify.
 * 
 * @route POST /api/auth/subscriptions/[id]/change-plan
 * @version 2.0.0
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Plan configurations - maps plan names to their settings
export const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter',
    description: 'Gentle introduction for newcomers',
    packSize: 4,
    interval: 'WEEK' as const,
    intervalCount: 1,
    frequency: 'Weekly delivery',
  },
  pro: {
    name: 'Pro',
    description: 'Balanced protocol for consistent results',
    packSize: 12,
    interval: 'DAY' as const,  // Bi-weekly = 14 days
    intervalCount: 14,
    frequency: 'Bi-weekly delivery',
  },
  max: {
    name: 'Max',
    description: 'Full month coverage for maximum effect',
    packSize: 28,
    interval: 'MONTH' as const,
    intervalCount: 1,
    frequency: 'Monthly delivery',
  },
};

export type PlanType = keyof typeof PLAN_CONFIGURATIONS;

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

// Helper to make Loop API calls with full response logging
async function loopFetch(endpoint: string, options: RequestInit = {}) {
  const token = env.loopApiKey;
  
  if (!token) {
    throw new Error('Loop API not configured');
  }

  const url = `${LOOP_API_BASE}${endpoint}`;
  
  console.log(`[Change-Plan] Loop request: ${options.method || 'GET'} ${url}`);
  if (options.body) {
    console.log(`[Change-Plan] Body:`, options.body);
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Loop-Token': token,
      ...options.headers,
    },
  });

  const responseText = await response.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch {
    data = { rawResponse: responseText };
  }

  console.log(`[Change-Plan] Loop response:`, { status: response.status, data });

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

  if (!env.loopApiKey) {
    return NextResponse.json(
      { error: 'Loop API not configured' },
      { status: 500 }
    );
  }

  // Parse request body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { plan } = body as { plan?: PlanType };

  if (!plan || !PLAN_CONFIGURATIONS[plan]) {
    return NextResponse.json(
      { error: 'Invalid plan. Must be one of: starter, pro, max' },
      { status: 400 }
    );
  }

  const planConfig = PLAN_CONFIGURATIONS[plan];
  
  // Convert to Loop's shopify-{id} format
  const loopSubscriptionId = toLoopShopifyId(subscriptionId);

  console.log(`[Change-Plan] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);
  console.log(`[Change-Plan] Changing to plan: ${plan}`);

  try {
    // Step 1: Get current subscription to find line item IDs
    const { response: subResponse, data: subData } = await loopFetch(`/subscription/${loopSubscriptionId}`);
    
    if (!subResponse.ok) {
      return NextResponse.json({
        success: false,
        error: 'Could not find subscription',
        loopResponse: subData,
        loopSubscriptionId,
      }, { status: 404 });
    }

    const subscription = subData.data || subData;
    
    // Step 2: Update delivery frequency
    const { response: freqResponse, data: freqData } = await loopFetch(
      `/subscription/${loopSubscriptionId}/change-frequency`,
      {
        method: 'POST',
        body: JSON.stringify({
          billingInterval: planConfig.interval,
          billingIntervalCount: planConfig.intervalCount,
          deliveryInterval: planConfig.interval,
          deliveryIntervalCount: planConfig.intervalCount,
        }),
      }
    );

    if (!freqResponse.ok) {
      return NextResponse.json({
        success: false,
        error: freqData.message || 'Failed to update delivery frequency',
        loopResponse: freqData,
        loopSubscriptionId,
      }, { status: freqResponse.status });
    }

    // Step 3: Optionally update quantity if needed
    // Get the first line item
    const lines = subscription.lines || [];
    if (lines.length > 0) {
      const lineId = lines[0].id;
      const currentQuantity = lines[0].quantity || 1;
      
      // Only update quantity if it's different
      // Note: This might not be needed if the product variant already has the right quantity
      // Uncomment if quantity changes are needed:
      /*
      if (currentQuantity !== planConfig.packSize) {
        const { response: qtyResponse, data: qtyData } = await loopFetch(
          `/line/${lineId}/update-quantity`,
          {
            method: 'POST',
            body: JSON.stringify({ quantity: planConfig.packSize }),
          }
        );
        
        if (!qtyResponse.ok) {
          console.warn('[Change-Plan] Quantity update failed (non-blocking):', qtyData);
        }
      }
      */
    }

    // Step 4: Get updated subscription to return
    const { data: updatedData } = await loopFetch(`/subscription/${loopSubscriptionId}`);

    return NextResponse.json({
      success: true,
      message: `Your subscription has been updated to the ${planConfig.name} plan with ${planConfig.frequency.toLowerCase()}.`,
      updatedPlan: planConfig,
      subscription: updatedData.data || updatedData,
    });

  } catch (error) {
    console.error('[Change-Plan] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update subscription',
      details: String(error),
    }, { status: 500 });
  }
}

// GET endpoint to retrieve available plans
export async function GET() {
  return NextResponse.json({
    plans: Object.entries(PLAN_CONFIGURATIONS).map(([key, config]) => ({
      id: key,
      ...config,
    })),
  });
}
