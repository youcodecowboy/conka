import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  updateSubscriptionFrequency,
  updateSubscriptionQuantity,
  cancelSubscription as cancelLoopSubscription 
} from '@/app/lib/loop';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Extract Loop subscription ID from Shopify contract ID
function extractLoopId(shopifyId: string): string {
  const match = shopifyId.match(/SubscriptionContract\/(\d+)/);
  return match ? match[1] : shopifyId;
}

// Plan configurations - maps plan names to their settings
// These match the subscription tiers available
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
    interval: 'WEEK' as const,
    intervalCount: 2,
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

// Cancel subscription mutation (for Shopify sync)
const CANCEL_SUBSCRIPTION_MUTATION = `
  mutation subscriptionContractCancel($subscriptionContractId: ID!) {
    subscriptionContractCancel(subscriptionContractId: $subscriptionContractId) {
      contract {
        id
        status
      }
      userErrors {
        field
        message
      }
    }
  }
`;

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

  if (!SHOPIFY_SHOP_ID) {
    return NextResponse.json(
      { error: 'Shop ID not configured' },
      { status: 500 }
    );
  }

  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Subscription ID is required' },
      { status: 400 }
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

  const { plan, forceCancel } = body as { 
    plan?: PlanType; 
    forceCancel?: boolean; // Only use cancel flow if explicitly requested
  };

  if (!plan || !PLAN_CONFIGURATIONS[plan]) {
    return NextResponse.json(
      { error: 'Invalid plan. Must be one of: starter, pro, max' },
      { status: 400 }
    );
  }

  const planConfig = PLAN_CONFIGURATIONS[plan];
  const loopSubscriptionId = extractLoopId(subscriptionId);

  // Try to update frequency directly via Loop API (preferred method)
  // This avoids needing to cancel and re-subscribe
  if (!forceCancel) {
    try {
      console.log('Updating frequency in Loop, subscription ID:', loopSubscriptionId);
      
      // Map plan interval to Loop format
      const intervalUnit = planConfig.interval.toLowerCase() as 'week' | 'month' | 'day' | 'year';
      
      const frequencyResult = await updateSubscriptionFrequency(loopSubscriptionId, {
        value: planConfig.intervalCount,
        unit: intervalUnit,
      });

      if (frequencyResult.error) {
        console.error('Loop frequency update error:', frequencyResult.error);
        // If frequency update fails, we could try cancel-and-redirect
        // but for now just return the error
        return NextResponse.json({
          success: false,
          error: frequencyResult.error.message,
          message: 'Could not update subscription frequency. Please contact support.',
        }, { status: 400 });
      }

      // Optionally update quantity if the plan pack size is different
      // Note: This changes quantity, not the product variant
      // For changing the actual product, cancel-and-redirect is needed
      
      return NextResponse.json({
        success: true,
        message: `Your subscription has been updated to the ${planConfig.name} plan with ${planConfig.frequency.toLowerCase()}.`,
        updatedPlan: planConfig,
        subscription: frequencyResult.data,
      });

    } catch (error) {
      console.error('Loop update exception:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to update subscription',
        details: String(error),
      }, { status: 500 });
    }
  }

  // Cancel and redirect flow (for changing to a different product/protocol)
  const results: {
    shopify?: { success: boolean; error?: string };
    loop?: { success: boolean; error?: string };
  } = {};

  // Step 1: Cancel in Loop (this is the primary source of truth)
  try {
    console.log('Cancelling in Loop for protocol change, subscription ID:', loopSubscriptionId);
    const loopResult = await cancelLoopSubscription(loopSubscriptionId, 'Changing to a different protocol');
    
    if (loopResult.error) {
      console.error('Loop cancel error:', loopResult.error);
      results.loop = { success: false, error: loopResult.error.message };
    } else {
      results.loop = { success: true };
    }
  } catch (error) {
    console.error('Loop cancel exception:', error);
    results.loop = { success: false, error: String(error) };
  }

  // Step 2: Also cancel in Shopify (for sync)
  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    const cancelResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: CANCEL_SUBSCRIPTION_MUTATION,
        variables: {
          subscriptionContractId: subscriptionId,
        },
      }),
    });

    const cancelData = await cancelResponse.json();

    if (cancelData.errors) {
      results.shopify = { success: false, error: cancelData.errors[0]?.message };
    } else {
      const result = cancelData.data?.subscriptionContractCancel;
      if (result?.userErrors?.length > 0) {
        results.shopify = { success: false, error: result.userErrors[0].message };
      } else {
        results.shopify = { success: true };
      }
    }
  } catch (error) {
    results.shopify = { success: false, error: String(error) };
  }

  // Return success if Loop succeeded
  if (results.loop?.success) {
    return NextResponse.json({
      success: true,
      cancelled: true,
      message: `Your subscription has been cancelled. Please select your new protocol from the shop.`,
      redirectUrl: '/shop',
      targetPlan: planConfig,
      details: results,
    });
  }

  return NextResponse.json({
    success: false,
    error: results.loop?.error || 'Failed to cancel subscription',
    details: results,
  }, { status: 400 });
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

