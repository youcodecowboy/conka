import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface OrderLineItem {
  title: string;
  quantity: number;
  image?: {
    url: string;
    altText?: string;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface Order {
  id: string;
  name: string;
  processedAt: string;
  fulfillmentStatus: string;
  financialStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    nodes: OrderLineItem[];
  };
}

interface CustomerOrdersResponse {
  data?: {
    customer?: {
      orders?: {
        nodes: Order[];
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const CUSTOMER_ORDERS_QUERY = `
  query CustomerOrders {
    customer {
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          processedAt
          fulfillmentStatus
          financialStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            nodes {
              title
              quantity
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch customer orders using the Customer Account API
 */
export async function GET(request: NextRequest) {
  const shopId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

  if (!shopId) {
    return NextResponse.json(
      { error: 'Customer Account API not configured', orders: [] },
      { status: 200 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated', orders: [] },
      { status: 401 }
    );
  }

  try {
    const apiUrl = `https://shopify.com/${shopId}/account/customer/api/2025-01/graphql`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        query: CUSTOMER_ORDERS_QUERY,
      }),
    });

    if (!response.ok) {
      console.error('Customer Account API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch orders', orders: [] },
        { status: response.status }
      );
    }

    const data: CustomerOrdersResponse = await response.json();

    if (data.errors && data.errors.length > 0) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: data.errors[0].message, orders: [] },
        { status: 400 }
      );
    }

    const orders = data.data?.customer?.orders?.nodes || [];

    // Transform orders to a simpler format for the frontend
    const transformedOrders = orders.map((order) => ({
      id: order.id,
      orderNumber: order.name.replace('#', ''),
      processedAt: order.processedAt,
      fulfillmentStatus: order.fulfillmentStatus,
      financialStatus: order.financialStatus,
      totalPrice: order.totalPrice,
      lineItems: order.lineItems.nodes.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
      })),
    }));

    return NextResponse.json({ orders: transformedOrders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', orders: [] },
      { status: 500 }
    );
  }
}

