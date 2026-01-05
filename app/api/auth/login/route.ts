import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { shopifyFetch, CustomerAccessToken } from '@/app/lib/shopify';
import { CUSTOMER_ACCESS_TOKEN_CREATE } from '@/app/lib/shopifyQueries';

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

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
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

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

