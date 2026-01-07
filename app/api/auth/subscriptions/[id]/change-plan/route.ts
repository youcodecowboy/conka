import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Plan configurations - maps plan names to their settings
// These should match the selling plans configured in Shopify/Loop
// Update these product/variant IDs to match your actual Shopify products
export const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter',
    description: 'Gentle introduction for newcomers',
    packSize: 4,
    interval: 'WEEK',
    intervalCount: 1,
    frequency: 'Weekly delivery',
    // TODO: Update with actual Shopify product/variant IDs for the starter plan
    productHandle: 'conka-precision-starter',
    variantId: null as string | null, // Will be looked up or configured
  },
  pro: {
    name: 'Pro',
    description: 'Balanced protocol for consistent results',
    packSize: 12,
    interval: 'WEEK',
    intervalCount: 2,
    frequency: 'Bi-weekly delivery',
    productHandle: 'conka-precision-pro',
    variantId: null as string | null,
  },
  max: {
    name: 'Max',
    description: 'Full month coverage for maximum effect',
    packSize: 28,
    interval: 'MONTH',
    intervalCount: 1,
    frequency: 'Monthly delivery',
    productHandle: 'conka-precision-max',
    variantId: null as string | null,
  },
} as const;

export type PlanType = keyof typeof PLAN_CONFIGURATIONS;

// Cancel subscription mutation
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

  const { plan, cancelAndRedirect } = body as { 
    plan?: PlanType; 
    cancelAndRedirect?: boolean;
  };

  if (!plan || !PLAN_CONFIGURATIONS[plan]) {
    return NextResponse.json(
      { error: 'Invalid plan. Must be one of: starter, pro, max' },
      { status: 400 }
    );
  }

  const planConfig = PLAN_CONFIGURATIONS[plan];

  // If cancelAndRedirect is true, cancel the subscription and return checkout URL
  if (cancelAndRedirect) {
    const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

    try {
      // Step 1: Cancel the current subscription
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
        console.error('GraphQL errors on cancel:', cancelData.errors);
        return NextResponse.json({
          success: false,
          error: 'Failed to cancel subscription',
          details: cancelData.errors,
        }, { status: 400 });
      }

      const result = cancelData.data?.subscriptionContractCancel;
      
      if (result?.userErrors?.length > 0) {
        return NextResponse.json({
          success: false,
          error: result.userErrors[0].message,
          userErrors: result.userErrors,
        }, { status: 400 });
      }

      // Step 2: Return success with redirect URL to the shop page
      // The user will select their new subscription plan from the product page
      return NextResponse.json({
        success: true,
        cancelled: true,
        message: `Your subscription has been cancelled. Redirecting to select your new ${planConfig.name} plan...`,
        redirectUrl: '/shop', // Redirect to shop to select new subscription
        targetPlan: planConfig,
      });

    } catch (error) {
      console.error('Change plan error:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to process plan change',
        details: String(error),
      }, { status: 500 });
    }
  }

  // Default response: explain the process and ask for confirmation
  return NextResponse.json({
    success: true,
    requiresConfirmation: true,
    message: `To switch to the ${planConfig.name} plan, we'll cancel your current subscription and redirect you to checkout with the new plan.`,
    warning: 'Your current subscription will be cancelled immediately.',
    targetPlan: planConfig,
    action: 'confirm_change',
  });
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

