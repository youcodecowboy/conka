/**
 * Subscription Actions API Route
 * 
 * Single endpoint for all subscription operations to avoid Vercel routing issues.
 * Uses Loop Admin API with the shopify-{id} format.
 * 
 * @route POST /api/auth/subscriptions/actions
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

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

// Plan configurations
const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter',
    interval: 'WEEK' as const,
    intervalCount: 1,
  },
  pro: {
    name: 'Pro',
    interval: 'DAY' as const,
    intervalCount: 14,
  },
  max: {
    name: 'Max',
    interval: 'MONTH' as const,
    intervalCount: 1,
  },
};

type ActionType = 'skip' | 'change-plan';

interface ActionRequest {
  action: ActionType;
  subscriptionId: string;
  plan?: 'starter' | 'pro' | 'max';
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    return NextResponse.json(
      { error: 'Loop API not configured' },
      { status: 500 }
    );
  }

  let body: ActionRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { action, subscriptionId, plan } = body;

  if (!action || !subscriptionId) {
    return NextResponse.json(
      { error: 'action and subscriptionId are required' },
      { status: 400 }
    );
  }

  const loopSubscriptionId = toLoopShopifyId(subscriptionId);
  console.log(`[Actions] ${action} - Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

  try {
    if (action === 'skip') {
      // Skip next delivery
      // First try to get order schedule
      const scheduleResponse = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/order-schedule`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Loop-Token': loopToken,
        },
      });

      let orderIdToSkip: number | null = null;
      
      if (scheduleResponse.ok) {
        const scheduleData = await scheduleResponse.json();
        const orders = scheduleData.data || [];
        const nextOrder = orders.find((o: any) => o.status === 'SCHEDULED' || o.status === 'UPCOMING');
        if (nextOrder) {
          orderIdToSkip = nextOrder.id;
        }
      }

      // Try order-level skip if we found an order ID
      if (orderIdToSkip) {
        const skipResponse = await fetch(`${LOOP_API_BASE}/order/${orderIdToSkip}/skip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Loop-Token': loopToken,
          },
        });

        if (skipResponse.ok) {
          const skipData = await skipResponse.json();
          return NextResponse.json({
            success: true,
            message: 'Next delivery skipped successfully',
            result: skipData.data || skipData,
          });
        }
      }

      // Fallback: try subscription-level skip
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

      if (!response.ok) {
        return NextResponse.json({
          success: false,
          error: data.message || 'Failed to skip delivery',
          loopResponse: data,
        }, { status: response.status });
      }

      return NextResponse.json({
        success: true,
        message: 'Next delivery skipped successfully',
        result: data.data || data,
      });

    } else if (action === 'change-plan') {
      if (!plan || !PLAN_CONFIGURATIONS[plan]) {
        return NextResponse.json(
          { error: 'Invalid plan. Must be one of: starter, pro, max' },
          { status: 400 }
        );
      }

      const planConfig = PLAN_CONFIGURATIONS[plan];

      // Update delivery frequency via Loop API
      const response = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/change-frequency`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Loop-Token': loopToken,
        },
        body: JSON.stringify({
          billingInterval: planConfig.interval,
          billingIntervalCount: planConfig.intervalCount,
          deliveryInterval: planConfig.interval,
          deliveryIntervalCount: planConfig.intervalCount,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { rawResponse: responseText };
      }

      console.log(`[Actions] change-plan response:`, { status: response.status, data });

      if (!response.ok) {
        return NextResponse.json({
          success: false,
          error: data.message || 'Failed to update plan',
          loopResponse: data,
        }, { status: response.status });
      }

      return NextResponse.json({
        success: true,
        message: `Plan updated to ${planConfig.name} successfully`,
        updatedPlan: planConfig,
        result: data.data || data,
      });

    } else {
      return NextResponse.json(
        { error: `Unknown action: ${action}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(`[Actions] Error:`, error);
    return NextResponse.json({
      success: false,
      error: 'Failed to perform action',
      details: String(error),
    }, { status: 500 });
  }
}
// Deploy trigger 1767869375
