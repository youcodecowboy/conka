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

// Variant IDs by protocol/formula and tier — verified against Shopify
const PROTOCOL_VARIANTS: Record<string, Record<string, number>> = {
  // Protocol 1: Protocol: CONKA Resilience (Product: 15528618951030)
  '1': {
    starter: 56999240597878,  // RESILIANCE_STARTER_4 - Starter - 4
    pro:     56999240630646,  // RESILIANCE_PRO_12 - Pro - 12
    max:     56999240663414,  // RESILIANCE_MAX_28 - Max - 28
  },
  // Protocol 2: Protocol: CONKA Precision (Product: 15528617804150)
  '2': {
    starter: 56999234503030,  // PRECISION_STARTER_4 - Starter - 4
    pro:     56999234535798,  // PRECISION_PRO_12 - Pro - 12
    max:     56999234568566,  // PRECISION_MAX_28 - Max - 28
  },
  // Protocol 3: Protocol: Conka Balance (Product: 15528510423414)
  '3': {
    starter: 56998884573558,  // BALANCED_STARTER_4 - Starter - 4
    pro:     56998884606326,  // BALANCED_PRO_12 - Pro - 12
    max:     56998884639094,  // BALANCED_MAX_28 - Max - 28
  },
  // Protocol 4: Protocol: CONKA Ultimate (Product: 15528620589430)
  '4': {
    pro: 56999249478006,      // ULTAMATE_PRO_28 - Pro - 28
    max: 56999249510774,      // ULTAMATE_MAX_56 - Max - 56
  },
  // Formula: CONKA Flow (Product: 15528722170230)
  'flow': {
    starter: 57000187363702,  // FLOW_TRIAL_4 - Flow - 4 Shots
    pro_8:   56999967785334,  // FLOW_TRIAL_8 - Flow - 8 Shots
    pro:     56999967752566,  // FLOW_TRIAL_12 - Flow - 12 Shots
    max:     56999967818102,  // FLOW_TRIAL_28 - Flow - 28 Shots
  },
  // Formula: CONKA Clear (Product: 15528796291446)
  'clear': {
    starter: 57000418607478,  // CLEATR_TRIAL_4 - Clear - 4 Shots
    pro_8:   57000418640246,  // CLEAR_TRIAL_8 - Clear - 8 Shots
    pro:     57000418673014,  // CLEAR_TRIAL_12 - Clear - 12 Shots
    max:     57000418705782,  // CLEAR_TRIAL_28 - Clear - 28 Shots
  },
};

// Reverse lookup: variant ID -> protocol/formula ID
const VARIANT_TO_PROTOCOL: Record<number, string> = {};
for (const [protocolId, variants] of Object.entries(PROTOCOL_VARIANTS)) {
  for (const variantId of Object.values(variants)) {
    VARIANT_TO_PROTOCOL[variantId] = protocolId;
  }
}

// Selling plan group IDs and billing intervals verified against Shopify
// SellingPlanGroup numeric IDs extracted from GIDs
const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter (Weekly)',
    interval: 'WEEK',       // Verified: WEEK x 1
    intervalCount: 1,
    sellingPlanId: '711429882230',        // SellingPlan: 711429882230
    sellingPlanGroupId: '98722480502',    // SellingPlanGroup: 98722480502
    quantity: 1,
  },
  pro: {
    name: 'Pro (Bi-Weekly)',
    interval: 'WEEK',       // Verified: WEEK x 2 (NOT DAY x 14 — this was the bug)
    intervalCount: 2,
    sellingPlanId: '711429947766',        // SellingPlan: 711429947766
    sellingPlanGroupId: '98722546038',    // SellingPlanGroup: 98722546038
    quantity: 1,
  },
  max: {
    name: 'Max (Monthly)',
    interval: 'MONTH',      // Verified: MONTH x 1
    intervalCount: 1,
    sellingPlanId: '711429980534',        // SellingPlan: 711429980534
    sellingPlanGroupId: '98722578806',    // SellingPlanGroup: 98722578806
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
        
        // Log prefix for Vercel log tracing (Fix 4)
        const logPrefix = `[Loop plan-update][${loopSubscriptionId}]`;
        
        // Step 1: Fetch subscription details from Loop to get lineId and current variant
        console.log(`${logPrefix} Step 1: GET subscription`);
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
        
        // Loop's internal numeric ID — required for PUT /frequency (not the shopify-{id} format)
        const loopInternalId = subscriptionData?.id;
        
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
        
        console.log(`${logPrefix} Current line:`, { lineId, currentVariantId });
        
        // Step 2: Determine target protocol
        // If protocolId is provided, use it (user may be switching protocol or tier)
        // Otherwise, infer from current variant (tier-only change)
        const currentProtocolFromVariant = VARIANT_TO_PROTOCOL[currentVariantId] as ProtocolIdType | undefined;
        const targetProtocolId = protocolId ?? currentProtocolFromVariant;
        if (!targetProtocolId) {
          console.log(`${logPrefix} Unknown variant, fallback: POST change-plan`, { sellingPlanId: planConfig.sellingPlanId });
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
          
          // Use sellingPlanGroupId (not sellingPlanId) — Loop swap expects the group ID
          const sellingPlanGroupIdSent = parseInt(planConfig.sellingPlanGroupId, 10);
          console.log(`${logPrefix} sellingPlanGroupId sent:`, sellingPlanGroupIdSent);
          
          console.log(`${logPrefix} Step 2: PUT swap line`, { targetVariantId, plan });
          // Step 4: Call swap-line endpoint to change the variant AND selling plan
          result = await loopRequest(
            `/subscription/${loopSubscriptionId}/line/${lineId}/swap`,
            loopToken,
            'PUT',
            {
              variantShopifyId: targetVariantId,
              quantity: planConfig.quantity,
              pricingType: 'OLD', // Keep existing discount
              sellingPlanGroupId: sellingPlanGroupIdSent,
            }
          );
          // Step 5: If swap succeeded, update billing/delivery interval (required for correct billing).
          // Uses PUT /subscription/{loopInternalId}/frequency with Loop's internal ID (not shopify-{id}).
          // If this fails, we do NOT return success — subscription may be in a partial state.
          if (result.response.ok && loopInternalId != null) {
            const intervalUnit = planConfig.interval;
            const intervalCount = planConfig.intervalCount;
            const nextBillingDateRaw = subscriptionData?.nextBillingDate;
            const nextBillingDateEpoch = nextBillingDateRaw
              ? Math.floor(new Date(nextBillingDateRaw).getTime() / 1000)
              : Math.floor(Date.now() / 1000) + 86400; // fallback: tomorrow
            
            console.log(`${logPrefix} Step 3: PUT frequency using Loop internal ID:`, loopInternalId);
            const freqResult = await loopRequest(
              `/subscription/${loopInternalId}/frequency`,
              loopToken,
              'PUT',
              {
                billingPolicy: { interval: intervalUnit, intervalCount },
                deliveryPolicy: { interval: intervalUnit, intervalCount },
                nextBillingDateEpoch,
                discountType: 'OLD',
              }
            );
            if (!freqResult.response.ok) {
              console.error(`${logPrefix} Swap succeeded but PUT frequency failed. Full error:`, JSON.stringify(freqResult.data));
              return NextResponse.json(
                {
                  success: false,
                  partial: true,
                  error: 'Plan product was updated but we could not update your billing schedule. Please contact support so we can fix this for you.',
                  message: freqResult.data?.message || 'Billing interval update failed',
                  loopResponse: freqResult.data,
                  loopSubscriptionId,
                },
                { status: 503 }
              );
            }
            console.log(`${logPrefix} PUT frequency OK`);
          } else if (result.response.ok && loopInternalId == null) {
            console.error(`${logPrefix} Swap succeeded but Loop internal ID missing from GET response; cannot call PUT frequency`);
            return NextResponse.json(
              {
                success: false,
                partial: true,
                error: 'Plan product was updated but we could not update your billing schedule. Please contact support so we can fix this for you.',
                message: 'Missing subscription ID for frequency update',
                loopSubscriptionId,
              },
              { status: 503 }
            );
          }
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
