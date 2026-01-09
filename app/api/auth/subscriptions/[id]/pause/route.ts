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

// Plan configurations with Shopify Selling Plan IDs and Variant IDs
// These must match the selling plans and variants configured in Shopify
// From shopifyProductMapping.ts

// Variant IDs by protocol and tier (just the numeric Shopify ID)
const PROTOCOL_VARIANTS: Record<string, Record<string, number>> = {
  // Protocol 1 (Resilience)
  '1': {
    starter: 56999240597878,  // RESILIANCE_STARTER_4
    pro: 56999240630646,      // RESILIANCE_PRO_12
    max: 56999240663414,      // RESILIANCE_MAX_28
  },
  // Protocol 2 (Precision)
  '2': {
    starter: 56999234503030,  // PRECISION_STARTER_4
    pro: 56999234535798,      // PRECISION_PRO_12
    max: 56999234568566,      // PRECISION_MAX_28
  },
  // Protocol 3 (Balance)
  '3': {
    starter: 56998884573558,  // BALANCED_STARTER_4
    pro: 56998884606326,      // BALANCED_PRO_12
    max: 56998884639094,      // BALANCED_MAX_28
  },
  // Protocol 4 (Ultimate) - no starter tier
  '4': {
    pro: 56999249478006,      // ULTAMATE_PRO_28
    max: 56999249510774,      // ULTAMATE_MAX_56
  },
};

// Reverse lookup: variant ID -> protocol ID
const VARIANT_TO_PROTOCOL: Record<number, string> = {};
for (const [protocolId, variants] of Object.entries(PROTOCOL_VARIANTS)) {
  for (const variantId of Object.values(variants)) {
    VARIANT_TO_PROTOCOL[variantId] = protocolId;
  }
}

const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter (Weekly)',
    interval: 'WEEK',
    intervalCount: 1,
    sellingPlanId: '711429882230',
    quantity: 1,
  },
  pro: {
    name: 'Pro (Bi-Weekly)',
    interval: 'DAY',
    intervalCount: 14,
    sellingPlanId: '711429947766',
    quantity: 1,
  },
  max: {
    name: 'Max (Monthly)',
    interval: 'MONTH',
    intervalCount: 1,
    sellingPlanId: '711429980534',
    quantity: 1,
  },
};

type ActionType = 'pause' | 'resume' | 'cancel' | 'skip' | 'change-frequency';
type PlanType = 'starter' | 'pro' | 'max';
type ProtocolIdType = '1' | '2' | '3' | '4';

interface ActionRequest {
  action?: ActionType;
  plan?: PlanType;
  protocolId?: ProtocolIdType; // Optional: if provided, swap to this protocol
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
 * @param endpoint - API endpoint path
 * @param loopToken - Loop API token
 * @param method - HTTP method (default: POST)
 * @param body - Request body (optional)
 */
async function loopRequest(
  endpoint: string, 
  loopToken: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
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

  const { action = 'pause', plan, protocolId, reason } = body;

  // Convert to Loop's shopify-{id} format
  const loopSubscriptionId = toLoopShopifyId(subscriptionId);

  console.log(`[${action.toUpperCase()}] Input: ${subscriptionId} -> Loop format: ${loopSubscriptionId}`);

  try {
    let result: { response: Response; data: any };
    let successMessage: string;

    switch (action) {
      case 'pause':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/pause`, loopToken, 'POST');
        successMessage = 'Subscription paused successfully';
        break;

      case 'resume':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/resume`, loopToken, 'POST');
        successMessage = 'Subscription resumed successfully';
        break;

      case 'cancel':
        result = await loopRequest(`/subscription/${loopSubscriptionId}/cancel`, loopToken, 'POST', {
          cancellationReason: reason,
        });
        successMessage = 'Subscription cancelled successfully';
        break;

      case 'skip':
        // Use the correct Loop API endpoint for skipping next order
        // Based on Loop API docs: Order actions section
        // First try updating next billing date (skip = delay next order)
        result = await loopRequest(
          `/subscription/${loopSubscriptionId}/order/reschedule`, 
          loopToken, 
          'POST',
          { skipNextOrder: true }
        );
        
        // If that fails, try the direct skip endpoint
        if (!result.response.ok) {
          console.log('[SKIP] Reschedule endpoint failed, trying direct skip...');
          result = await loopRequest(
            `/subscription/${loopSubscriptionId}/skip`, 
            loopToken, 
            'POST'
          );
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
        
        // Step 1: Fetch subscription details from Loop to get lineId and current variant
        console.log('[CHANGE-FREQUENCY] Fetching subscription details...');
        const subDetailsResult = await loopRequest(
          `/subscription/${loopSubscriptionId}`,
          loopToken,
          'GET'
        );
        
        if (!subDetailsResult.response.ok) {
          return NextResponse.json({
            success: false,
            error: 'Failed to fetch subscription details',
            loopResponse: subDetailsResult.data,
          }, { status: subDetailsResult.response.status });
        }
        
        const subscriptionData = subDetailsResult.data.data;
        const lines = subscriptionData?.lines || [];
        
        if (lines.length === 0) {
          return NextResponse.json({
            success: false,
            error: 'No lines found in subscription',
          }, { status: 400 });
        }
        
        // Get the first line (main subscription item)
        const line = lines[0];
        const lineId = line.id;
        const currentVariantId = line.variantShopifyId || line.variant?.shopifyId;
        
        console.log('[CHANGE-FREQUENCY] Current line:', { lineId, currentVariantId });
        
        // Step 2: Determine which protocol to use
        // If protocolId is provided, use that (user wants to change protocol)
        // Otherwise, detect from current variant (just changing tier)
        let targetProtocolId = protocolId;
        
        if (!targetProtocolId) {
          targetProtocolId = VARIANT_TO_PROTOCOL[currentVariantId] as ProtocolIdType;
        }
        
        if (!targetProtocolId) {
          console.log('[CHANGE-FREQUENCY] Unknown variant, trying direct approach...');
          // If we can't identify the protocol, try the change-plan endpoint as fallback
          result = await loopRequest(
            `/subscription/${loopSubscriptionId}/change-plan`, 
            loopToken, 
            'POST',
            { sellingPlanId: planConfig.sellingPlanId }
          );
        } else {
          // Step 3: Get the target variant for the new tier of this protocol
          const protocolVariants = PROTOCOL_VARIANTS[targetProtocolId];
          
          if (!protocolVariants) {
            return NextResponse.json({
              success: false,
              error: `Invalid protocol: ${targetProtocolId}`,
            }, { status: 400 });
          }
          
          const targetVariantId = protocolVariants[plan];
          
          if (!targetVariantId) {
            return NextResponse.json({
              success: false,
              error: `Protocol ${targetProtocolId} doesn't support ${plan} tier`,
            }, { status: 400 });
          }
          
          console.log('[CHANGE-FREQUENCY] Swapping to variant:', { 
            currentProtocol: VARIANT_TO_PROTOCOL[currentVariantId],
            targetProtocol: targetProtocolId,
            plan, 
            targetVariantId,
            lineId 
          });
          
          // Step 4: Call swap-line endpoint to change the variant AND selling plan
          // Including sellingPlanGroupId ensures Shopify subscription contract is updated
          // Note: Loop API expects sellingPlanGroupId as a number, not string
          result = await loopRequest(
            `/subscription/${loopSubscriptionId}/line/${lineId}/swap`,
            loopToken,
            'PUT',
            {
              variantShopifyId: targetVariantId,
              quantity: planConfig.quantity,
              pricingType: 'OLD', // Keep existing discount
              sellingPlanGroupId: parseInt(planConfig.sellingPlanId, 10), // Parse as number for Loop API
            }
          );
        }
        
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
