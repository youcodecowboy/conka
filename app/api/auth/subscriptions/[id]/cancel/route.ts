import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

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

// Mutation to cancel a subscription contract
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

  // Parse request body for cancellation reason
  let body: { reason?: CancellationReasonKey; comment?: string } = {};
  try {
    body = await request.json();
  } catch {
    // Body is optional for cancellation
  }

  const { reason, comment } = body;

  // Log cancellation reason for analytics (could be saved to database)
  if (reason) {
    console.log('Subscription cancellation:', {
      subscriptionId,
      reason: CANCELLATION_REASONS[reason] || reason,
      comment,
      timestamp: new Date().toISOString(),
    });
  }

  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    const response = await fetch(apiUrl, {
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

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'Failed to cancel subscription', details: data.errors },
        { status: 400 }
      );
    }

    const result = data.data?.subscriptionContractCancel;
    
    if (result?.userErrors?.length > 0) {
      return NextResponse.json(
        { error: result.userErrors[0].message, userErrors: result.userErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      contract: result?.contract,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription', details: String(error) },
      { status: 500 }
    );
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

