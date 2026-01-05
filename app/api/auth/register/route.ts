import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, Customer, CustomerAccessToken } from '@/app/lib/shopify';
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from '@/app/lib/shopifyQueries';

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}

interface CustomerCreateResponse {
  customerCreate: {
    customer: Customer | null;
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
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
    const body: RegisterInput = await request.json();
    const { email, password, firstName, lastName, acceptsMarketing } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 5) {
      return NextResponse.json(
        { error: 'Password must be at least 5 characters' },
        { status: 400 }
      );
    }

    // Create the customer
    const createResponse = await shopifyFetch<CustomerCreateResponse>(
      CUSTOMER_CREATE,
      {
        input: {
          email,
          password,
          firstName: firstName || '',
          lastName: lastName || '',
          acceptsMarketing: acceptsMarketing || false,
        },
      }
    );

    const { customer, customerUserErrors } =
      createResponse.data?.customerCreate || {};

    if (customerUserErrors && customerUserErrors.length > 0) {
      const error = customerUserErrors[0];
      let message = error.message;

      // Handle specific error codes
      if (error.code === 'TAKEN') {
        message = 'An account with this email already exists';
      } else if (error.code === 'TOO_SHORT') {
        message = 'Password must be at least 5 characters';
      }

      return NextResponse.json(
        { error: message },
        { status: 400 }
      );
    }

    if (!customer) {
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    // Auto-login after registration
    const loginResponse = await shopifyFetch<CustomerAccessTokenCreateResponse>(
      CUSTOMER_ACCESS_TOKEN_CREATE,
      {
        input: {
          email,
          password,
        },
      }
    );

    const { customerAccessToken } =
      loginResponse.data?.customerAccessTokenCreate || {};

    return NextResponse.json({
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
      accessToken: customerAccessToken?.accessToken || null,
      expiresAt: customerAccessToken?.expiresAt || null,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register' },
      { status: 500 }
    );
  }
}

