import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { resumeSubscription as resumeLoopSubscription } from '@/app/lib/loop';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Extract Loop subscription ID from Shopify contract ID
function extractLoopId(shopifyId: string): string {
  const match = shopifyId.match(/SubscriptionContract\/(\d+)/);
  return match ? match[1] : shopifyId;
}

// Mutation to activate (resume) a paused subscription contract
// Note: Shopify uses "activate" not "resume" for this operation
const ACTIVATE_SUBSCRIPTION_MUTATION = `
  mutation subscriptionContractActivate($subscriptionContractId: ID!) {
    subscriptionContractActivate(subscriptionContractId: $subscriptionContractId) {
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

  const loopSubscriptionId = extractLoopId(subscriptionId);
  
  const results: {
    shopify?: { success: boolean; error?: string };
    loop?: { success: boolean; error?: string };
  } = {};

  // Step 1: Resume in Shopify FIRST (this is the primary source - it's working reliably)
  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: ACTIVATE_SUBSCRIPTION_MUTATION,
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
      const result = data.data?.subscriptionContractActivate;
      if (result?.userErrors?.length > 0) {
        results.shopify = { success: false, error: result.userErrors[0].message };
      } else {
        results.shopify = { success: true };
      }
    }
  } catch (error) {
    console.error('Shopify resume error:', error);
    results.shopify = { success: false, error: String(error) };
  }

  // Step 2: Also try to resume in Loop (best-effort sync, don't fail if it errors)
  try {
    console.log('Resuming in Loop (sync), subscription ID:', loopSubscriptionId);
    const loopResult = await resumeLoopSubscription(loopSubscriptionId);
    
    if (loopResult.error) {
      console.error('Loop resume error (non-blocking):', loopResult.error);
      results.loop = { success: false, error: loopResult.error.message };
    } else {
      results.loop = { success: true };
    }
  } catch (error) {
    console.error('Loop resume exception (non-blocking):', error);
    results.loop = { success: false, error: String(error) };
  }

  // Return success if Shopify succeeded (Shopify is the source of truth)
  if (results.shopify?.success) {
    return NextResponse.json({
      success: true,
      message: 'Subscription resumed successfully',
      details: results,
    });
  }

  // If Shopify failed, return error
  return NextResponse.json({
    success: false,
    error: results.shopify?.error || 'Failed to resume subscription',
    details: results,
  }, { status: 400 });
}

