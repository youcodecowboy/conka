import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { cancelSubscription as cancelLoopSubscription } from '@/app/lib/loop';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Extract Loop subscription ID from Shopify contract ID
// e.g., "gid://shopify/SubscriptionContract/126061281654" -> "126061281654"
function extractLoopId(shopifyId: string): string {
  const match = shopifyId.match(/SubscriptionContract\/(\d+)/);
  return match ? match[1] : shopifyId;
}

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

  const loopSubscriptionId = extractLoopId(subscriptionId);
  
  const results: {
    shopify?: { success: boolean; error?: string };
    loop?: { success: boolean; error?: string };
  } = {};

  // Step 1: Cancel in Shopify FIRST (this is the primary source - it's working reliably)
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
      console.error('Shopify GraphQL errors:', data.errors);
      results.shopify = { success: false, error: data.errors[0]?.message };
    } else {
      const result = data.data?.subscriptionContractCancel;
      if (result?.userErrors?.length > 0) {
        results.shopify = { success: false, error: result.userErrors[0].message };
      } else {
        results.shopify = { success: true };
      }
    }
  } catch (error) {
    console.error('Shopify cancel error:', error);
    results.shopify = { success: false, error: String(error) };
  }

  // Step 2: Also try to cancel in Loop (best-effort sync, don't fail if it errors)
  try {
    console.log('Cancelling in Loop (sync), subscription ID:', loopSubscriptionId);
    const loopResult = await cancelLoopSubscription(loopSubscriptionId, reason);
    
    if (loopResult.error) {
      console.error('Loop cancel error (non-blocking):', loopResult.error);
      results.loop = { success: false, error: loopResult.error.message };
    } else {
      results.loop = { success: true };
    }
  } catch (error) {
    console.error('Loop cancel exception (non-blocking):', error);
    results.loop = { success: false, error: String(error) };
  }

  // Return success if Shopify succeeded (Shopify is the source of truth)
  if (results.shopify?.success) {
    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully',
      details: results,
    });
  }

  // If Shopify failed, return error
  return NextResponse.json({
    success: false,
    error: results.shopify?.error || 'Failed to cancel subscription',
    details: results,
  }, { status: 400 });
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

