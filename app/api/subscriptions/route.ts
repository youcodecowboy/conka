import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, Customer } from '@/app/lib/shopify';
import { CUSTOMER_QUERY } from '@/app/lib/shopifyQueries';
import { getCustomerSubscriptions } from '@/app/lib/loop';

interface CustomerQueryResponse {
  customer: Customer | null;
}

// Helper to verify auth token and get customer email
async function verifyAuthAndGetCustomer(accessToken: string): Promise<Customer | null> {
  try {
    const response = await shopifyFetch<CustomerQueryResponse>(CUSTOMER_QUERY, {
      customerAccessToken: accessToken,
    });
    return response.data?.customer || null;
  } catch {
    return null;
  }
}

// GET - Fetch customer subscriptions (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const authHeader = request.headers.get('authorization');
    const accessToken = authHeader?.replace('Bearer ', '');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the token and get customer info
    const customer = await verifyAuthAndGetCustomer(accessToken);
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      );
    }

    // Use the authenticated customer's email - not from query params
    // This prevents users from querying other users' subscriptions
    const result = await getCustomerSubscriptions(customer.email);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ subscriptions: result.data || [] });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    
    // Check if it's a credentials error
    if (error instanceof Error && error.message.includes('not configured')) {
      return NextResponse.json(
        { error: 'Subscription service not configured', subscriptions: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

