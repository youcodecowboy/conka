/**
 * Subscription Actions API Route
 * 
 * Uses Loop Admin API with the shopify-{id} format.
 * Handles all subscription actions: pause, resume, cancel, skip, change-frequency
 * 
 * This route is named "pause" for historical reasons but handles all actions
 * via the `action` parameter in the request body.
 * 
 * @route POST /api/auth/subscriptions/[id]/pause
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Plan configurations for change-frequency
const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter',
    interval: 'WEEK',
    intervalCount: 1,
  },
  pro: {
    name: 'Pro',
    interval: 'DAY',
    intervalCount: 14,
  },
  max: {
    name: 'Max',
    interval: 'MONTH',
    intervalCount: 1,
  },
};

type ActionType = 'pause' | 'resume' | 'cancel' | 'skip' | 'change-frequency';
type PlanType = 'starter' | 'pro' | 'max';

interface ActionRequest {
  action?: ActionType;
  plan?: PlanType;
  reason?: string;
}

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

/**
 * Make a request to Loop API
 */
async function loopRequest(endpoint: string, loopToken: string, body?: object) {
  const response = await fetch(`${LOOP_API_BASE}${endpoint}`, {
    method: 'POST',
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

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    return NextResponse.json(
      { error: 'Loop API not configured' },
      { status: 500 }
    );
  }

  // Parse request body - action defaults to 'pause' for backwards compatibility
  let body: ActionRequest = { action: 'pause' };
  try {
    const requestBody = await request.json();
    if (requestBody && typeof requestBody === 'object') {
      body = { ...body, ...requestBody };
    }
  } catch {
    // No body or invalid JSON - use default action 'pause'
  }

  const { action = 'pause', plan, reason } = body;

  // Convert to Loop's shopify-{id} format
  const loopSubscriptionId = toLoopShopifyId(subscriptionId);

  console.log(`[${action.toUpperCase()}] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

  try {
    let result: { response: Response; data: any };
    let successMessage: string;

    switch (action) {
      case 'pause':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/pause`, loopToken);
        successMessage = 'Subscription paused successfully';
        break;

      case 'resume':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/resume`, loopToken);
        successMessage = 'Subscription resumed successfully';
        break;

      case 'cancel':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/cancel`, loopToken, {
          cancellationReason: reason,
        });
        successMessage = 'Subscription cancelled successfully';
        break;

      case 'skip':
        // Try to skip the next order
        result = await loopRequest(`/subscription/${loopSubscriptionId}/order/skip`, loopToken);
        
        // If that fails, try alternative endpoint
        if (!result.response.ok) {
          console.log('[SKIP] First endpoint failed, trying skip-order...');
          result = await loopRequest(`/subscription/${loopSubscriptionId}/skip-order`, loopToken);
        }
        successMessage = 'Next delivery skipped successfully';
        break;

      case 'change-frequency':
        if (!plan || !PLAN_CONFIGURATIONS[plan]) {
          return NextResponse.json({
            success: false,
            error: 'Invalid plan. Must be one of: starter, pro, max',
          }, { status: 400 });
        }

        const planConfig = PLAN_CONFIGURATIONS[plan];
        result = await loopRequest(`/subscription/${loopSubscriptionId}/change-frequency`, loopToken, {
          billingInterval: planConfig.interval,
          billingIntervalCount: planConfig.intervalCount,
          deliveryInterval: planConfig.interval,
          deliveryIntervalCount: planConfig.intervalCount,
        });
        successMessage = `Plan updated to ${planConfig.name} successfully`;
        break;

      default:
        return NextResponse.json({
          success: false,
          error: `Unknown action: ${action}`,
        }, { status: 400 });
    }

    console.log(`[${action.toUpperCase()}] Loop API response:`, { 
      status: result.response.status, 
      data: result.data 
    });

    if (!result.response.ok) {
      return NextResponse.json({
        success: false,
        error: result.data.message || `Failed to ${action} subscription`,
        loopResponse: result.data,
        loopSubscriptionId,
      }, { status: result.response.status });
    }

    return NextResponse.json({
      success: true,
      message: successMessage,
      subscription: result.data.data || result.data,
      ...(action === 'change-frequency' && plan ? { updatedPlan: PLAN_CONFIGURATIONS[plan] } : {}),
    });

  } catch (error) {
    console.error(`[${action.toUpperCase()}] Error:`, error);
    return NextResponse.json({
      success: false,
      error: `Failed to ${action} subscription`,
      details: String(error),
    }, { status: 500 });
  }
}
