import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Plan configurations - maps plan names to their settings
// These should match the selling plans configured in Shopify/Loop
export const PLAN_CONFIGURATIONS = {
  starter: {
    name: 'Starter',
    description: 'Gentle introduction for newcomers',
    packSize: 4,
    interval: 'WEEK',
    intervalCount: 1,
    frequency: 'Weekly delivery',
  },
  pro: {
    name: 'Pro',
    description: 'Balanced protocol for consistent results',
    packSize: 12,
    interval: 'WEEK',
    intervalCount: 2,
    frequency: 'Bi-weekly delivery',
  },
  max: {
    name: 'Max',
    description: 'Full month coverage for maximum effect',
    packSize: 28,
    interval: 'MONTH',
    intervalCount: 1,
    frequency: 'Monthly delivery',
  },
} as const;

export type PlanType = keyof typeof PLAN_CONFIGURATIONS;

// Mutation to update subscription contract delivery/billing policy
// Note: This may need adjustment based on actual schema introspection
const UPDATE_SUBSCRIPTION_MUTATION = `
  mutation subscriptionContractUpdate($contractId: ID!, $input: SubscriptionContractInput!) {
    subscriptionContractUpdate(contractId: $contractId, input: $input) {
      contract {
        id
        status
        deliveryPolicy {
          interval
          intervalCount {
            count
          }
        }
        billingPolicy {
          interval
          intervalCount {
            count
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Alternative: Update line item quantity
const UPDATE_LINE_QUANTITY_MUTATION = `
  mutation subscriptionContractLineUpdate($contractId: ID!, $lineId: ID!, $input: SubscriptionLineUpdateInput!) {
    subscriptionContractLineUpdate(contractId: $contractId, lineId: $lineId, input: $input) {
      contract {
        id
        lines(first: 10) {
          nodes {
            id
            quantity
          }
        }
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

  const { plan, lineId } = body as { plan?: PlanType; lineId?: string };

  if (!plan || !PLAN_CONFIGURATIONS[plan]) {
    return NextResponse.json(
      { error: 'Invalid plan. Must be one of: starter, pro, max' },
      { status: 400 }
    );
  }

  const planConfig = PLAN_CONFIGURATIONS[plan];
  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    // First, try to update the contract's delivery/billing policy
    const updateResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: UPDATE_SUBSCRIPTION_MUTATION,
        variables: {
          contractId: subscriptionId,
          input: {
            deliveryPolicy: {
              interval: planConfig.interval,
              intervalCount: planConfig.intervalCount,
            },
            billingPolicy: {
              interval: planConfig.interval,
              intervalCount: planConfig.intervalCount,
            },
          },
        },
      }),
    });

    const updateData = await updateResponse.json();

    // Check for GraphQL errors (schema mismatch, etc.)
    if (updateData.errors) {
      console.error('GraphQL errors on contract update:', updateData.errors);
      
      // If contract update fails, try updating line quantity if lineId provided
      if (lineId) {
        const lineResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken,
          },
          body: JSON.stringify({
            query: UPDATE_LINE_QUANTITY_MUTATION,
            variables: {
              contractId: subscriptionId,
              lineId: lineId,
              input: {
                quantity: planConfig.packSize,
              },
            },
          }),
        });

        const lineData = await lineResponse.json();
        
        if (lineData.errors) {
          return NextResponse.json({
            error: 'Failed to change plan',
            details: updateData.errors,
            lineErrors: lineData.errors,
            message: 'Plan changes may require contacting support or using the customer portal.',
          }, { status: 400 });
        }

        const lineResult = lineData.data?.subscriptionContractLineUpdate;
        if (lineResult?.userErrors?.length > 0) {
          return NextResponse.json({
            error: lineResult.userErrors[0].message,
            userErrors: lineResult.userErrors,
          }, { status: 400 });
        }

        return NextResponse.json({
          success: true,
          message: `Plan changed to ${planConfig.name}`,
          contract: lineResult?.contract,
        });
      }

      return NextResponse.json({
        error: 'Failed to change plan',
        details: updateData.errors,
        message: 'Plan changes may require contacting support or using the customer portal.',
      }, { status: 400 });
    }

    const result = updateData.data?.subscriptionContractUpdate;
    
    if (result?.userErrors?.length > 0) {
      return NextResponse.json({
        error: result.userErrors[0].message,
        userErrors: result.userErrors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Plan changed to ${planConfig.name}`,
      contract: result?.contract,
      plan: planConfig,
    });
  } catch (error) {
    console.error('Change plan error:', error);
    return NextResponse.json({
      error: 'Failed to change plan',
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

