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
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
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
    console.error('Orders API: SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID not configured');
    return NextResponse.json(
      { error: 'Customer Account API not configured', orders: [] },
      { status: 200 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    console.error('Orders API: No access token in cookies');
    return NextResponse.json(
      { error: 'Not authenticated', orders: [] },
      { status: 401 }
    );
  }

  console.log('Orders API: Access token found, length:', accessToken.length);

  try {
    // Customer Account API endpoint
    const apiUrl = `https://shopify.com/${shopId}/account/customer/api/2024-10/graphql`;
    
    console.log('Orders API: Fetching from', apiUrl);

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

    console.log('Orders API: Response status', response.status, response.statusText);

    // Try to get response body for debugging
    const responseText = await response.text();
    console.log('Orders API: Response body (first 500 chars):', responseText.substring(0, 500));

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status} ${response.statusText}`, orders: [], debug: responseText.substring(0, 200) },
        { status: response.status }
      );
    }

    let data: CustomerOrdersResponse;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Orders API: Failed to parse JSON response');
      return NextResponse.json(
        { error: 'Invalid response from Shopify', orders: [] },
        { status: 500 }
      );
    }

    if (data.errors && data.errors.length > 0) {
      console.error('Orders API: GraphQL errors:', JSON.stringify(data.errors, null, 2));
      return NextResponse.json(
        { error: data.errors[0].message, orders: [], graphqlErrors: data.errors },
        { status: 400 }
      );
    }

    const orders = data.data?.customer?.orders?.nodes || [];
    console.log('Orders API: Found', orders.length, 'orders');

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
    console.error('Orders API: Caught error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', orders: [], errorDetails: String(error) },
      { status: 500 }
    );
  }
}
