import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// Mutation to resume a paused subscription contract
const RESUME_SUBSCRIPTION_MUTATION = `
  mutation subscriptionContractResume($subscriptionContractId: ID!) {
    subscriptionContractResume(subscriptionContractId: $subscriptionContractId) {
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

  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: RESUME_SUBSCRIPTION_MUTATION,
        variables: {
          subscriptionContractId: subscriptionId,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'Failed to resume subscription', details: data.errors },
        { status: 400 }
      );
    }

    const result = data.data?.subscriptionContractResume;
    
    if (result?.userErrors?.length > 0) {
      return NextResponse.json(
        { error: result.userErrors[0].message, userErrors: result.userErrors },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      contract: result?.contract,
    });
  } catch (error) {
    console.error('Resume subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to resume subscription', details: String(error) },
      { status: 500 }
    );
  }
}

