import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { shopifyFetch } from '@/app/lib/shopify';

// Zod schema for profile update validation
const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.object({
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

// GraphQL mutation to update customer
const CUSTOMER_UPDATE = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        email
        firstName
        lastName
        phone
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// GraphQL mutation to update customer address
const CUSTOMER_ADDRESS_CREATE = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
        address1
        address2
        city
        province
        zip
        country
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// GraphQL mutation to update default address
const CUSTOMER_DEFAULT_ADDRESS_UPDATE = `
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

interface CustomerUpdateResponse {
  customerUpdate: {
    customer: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      phone: string | null;
    } | null;
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

interface AddressCreateResponse {
  customerAddressCreate: {
    customerAddress: {
      id: string;
      address1: string;
      address2: string | null;
      city: string;
      province: string | null;
      zip: string;
      country: string;
    } | null;
    customerUserErrors: Array<{
      field: string[];
      message: string;
      code: string;
    }>;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get access token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const accessToken = authHeader.replace('Bearer ', '');

    // Parse and validate request body
    const body = await request.json();
    const validationResult = profileUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, address } = validationResult.data;

    // Update customer profile
    const customerInput: Record<string, string> = {};
    if (firstName !== undefined) customerInput.firstName = firstName;
    if (lastName !== undefined) customerInput.lastName = lastName;
    if (email !== undefined) customerInput.email = email;
    if (phone !== undefined) customerInput.phone = phone;

    if (Object.keys(customerInput).length > 0) {
      const customerResponse = await shopifyFetch<CustomerUpdateResponse>(
        CUSTOMER_UPDATE,
        {
          customerAccessToken: accessToken,
          customer: customerInput,
        }
      );

      const { customerUpdate } = customerResponse.data || {};
      
      if (customerUpdate?.customerUserErrors && customerUpdate.customerUserErrors.length > 0) {
        const error = customerUpdate.customerUserErrors[0];
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }
    }

    // Create/update address if provided
    if (address && (address.address1 || address.city || address.zip)) {
      const addressInput = {
        address1: address.address1 || '',
        address2: address.address2 || '',
        city: address.city || '',
        province: address.province || '',
        zip: address.zip || '',
        country: address.country || 'United Kingdom',
      };

      const addressResponse = await shopifyFetch<AddressCreateResponse>(
        CUSTOMER_ADDRESS_CREATE,
        {
          customerAccessToken: accessToken,
          address: addressInput,
        }
      );

      const { customerAddressCreate } = addressResponse.data || {};
      
      if (customerAddressCreate?.customerUserErrors && customerAddressCreate.customerUserErrors.length > 0) {
        const error = customerAddressCreate.customerUserErrors[0];
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      // Set as default address
      if (customerAddressCreate?.customerAddress?.id) {
        await shopifyFetch(
          CUSTOMER_DEFAULT_ADDRESS_UPDATE,
          {
            customerAccessToken: accessToken,
            addressId: customerAddressCreate.customerAddress.id,
          }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}



