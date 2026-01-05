import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { shopifyFetch, Customer, CustomerAccessToken } from '@/app/lib/shopify';
import { CUSTOMER_CREATE, CUSTOMER_ACCESS_TOKEN_CREATE } from '@/app/lib/shopifyQueries';

// Zod schema for registration validation
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  acceptsMarketing: z.boolean().optional(),
});

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
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, acceptsMarketing } = validationResult.data;

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

