import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, CustomerAccessToken } from '@/app/lib/shopify';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/app/lib/shopifyQueries';

interface LoginInput {
  email: string;
  password: string;
}

interface CustomerAccessTokenCreateResponse {
  customerAccessTokenCreate: {
    customerAccessToken: CustomerAccessToken | null;
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginInput = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const response = await shopifyFetch<CustomerAccessTokenCreateResponse>(
      CUSTOMER_ACCESS_TOKEN_CREATE,
      {
        input: {
          email,
          password,
        },
      }
    );

    const { customerAccessToken, customerUserErrors } =
      response.data?.customerAccessTokenCreate || {};

    if (customerUserErrors && customerUserErrors.length > 0) {
      // Handle specific error codes
      const error = customerUserErrors[0];
      let message = error.message;
      
      if (error.code === 'UNIDENTIFIED_CUSTOMER') {
        message = 'Invalid email or password';
      }

      return NextResponse.json(
        { error: message },
        { status: 401 }
      );
    }

    if (!customerAccessToken) {
      return NextResponse.json(
        { error: 'Failed to create access token' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      accessToken: customerAccessToken.accessToken,
      expiresAt: customerAccessToken.expiresAt,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}

