import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch, Customer } from '@/app/lib/shopify';
import { CUSTOMER_QUERY, CUSTOMER_ORDERS } from '@/app/lib/shopifyQueries';

interface CustomerQueryResponse {
  customer: Customer | null;
}

interface CustomerOrdersResponse {
  customer: {
    orders: {
      edges: Array<{
        node: {
          id: string;
          orderNumber: number;
          processedAt: string;
          fulfillmentStatus: string;
          financialStatus: string;
          totalPrice: {
            amount: string;
            currencyCode: string;
          };
          lineItems: {
            edges: Array<{
              node: {
                title: string;
                quantity: number;
              };
            }>;
          };
        };
      }>;
    };
  } | null;
}

// GET - Fetch customer info
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const accessToken = authHeader?.replace('Bearer ', '');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    const response = await shopifyFetch<CustomerQueryResponse>(CUSTOMER_QUERY, {
      customerAccessToken: accessToken,
    });

    if (!response.data?.customer) {
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      );
    }

    return NextResponse.json({ customer: response.data.customer });
  } catch (error) {
    console.error('Get customer error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

// POST - Fetch customer with orders
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, includeOrders } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    // Fetch basic customer info
    const customerResponse = await shopifyFetch<CustomerQueryResponse>(
      CUSTOMER_QUERY,
      {
        customerAccessToken: accessToken,
      }
    );

    if (!customerResponse.data?.customer) {
      return NextResponse.json(
        { error: 'Invalid or expired access token' },
        { status: 401 }
      );
    }

    const result: { customer: Customer; orders?: Array<unknown> } = {
      customer: customerResponse.data.customer,
    };

    // Optionally fetch orders
    if (includeOrders) {
      const ordersResponse = await shopifyFetch<CustomerOrdersResponse>(
        CUSTOMER_ORDERS,
        {
          customerAccessToken: accessToken,
          first: 20,
        }
      );

      if (ordersResponse.data?.customer?.orders) {
        result.orders = ordersResponse.data.customer.orders.edges.map(
          (edge) => edge.node
        );
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Get customer error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

