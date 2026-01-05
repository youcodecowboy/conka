import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/app/lib/shopify';
import { CUSTOMER_ACCESS_TOKEN_DELETE } from '@/app/lib/shopifyQueries';

interface LogoutInput {
  accessToken: string;
}

interface CustomerAccessTokenDeleteResponse {
  customerAccessTokenDelete: {
    deletedAccessToken: string | null;
    deletedCustomerAccessTokenId: string | null;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LogoutInput = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const response = await shopifyFetch<CustomerAccessTokenDeleteResponse>(
      CUSTOMER_ACCESS_TOKEN_DELETE,
      {
        customerAccessToken: accessToken,
      }
    );

    const { userErrors } = response.data?.customerAccessTokenDelete || {};

    if (userErrors && userErrors.length > 0) {
      // Even if there's an error, we'll consider the logout successful
      // since the client should clear the token anyway
      console.warn('Logout warning:', userErrors[0].message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    // Return success anyway - client should clear token
    return NextResponse.json({ success: true });
  }
}

