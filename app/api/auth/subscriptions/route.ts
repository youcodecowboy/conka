import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SHOPIFY_SHOP_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID;

// GraphQL query for customer subscription contracts from Shopify's native API
const CUSTOMER_SUBSCRIPTIONS_QUERY = `
  query CustomerSubscriptions {
    customer {
      subscriptionContracts(first: 50) {
        nodes {
          id
          status
          createdAt
          updatedAt
          nextBillingDate
          currencyCode
          deliveryPolicy {
            interval
            intervalCount
          }
          lines(first: 10) {
            nodes {
              id
              name
              title
              quantity
              currentPrice {
                amount
                currencyCode
              }
              productId
              variantId
              variantImage {
                url
                altText
              }
            }
          }
          customerPaymentMethod {
            id
          }
          deliveryMethod {
            ... on SubscriptionDeliveryMethodShipping {
              address {
                address1
                city
                province
                country
                zip
              }
            }
          }
        }
      }
    }
  }
`;

// Simpler query to start with - just get basic info
const SIMPLE_SUBSCRIPTIONS_QUERY = `
  query CustomerSubscriptions {
    customer {
      subscriptionContracts(first: 50) {
        nodes {
          id
          status
          createdAt
          nextBillingDate
        }
      }
    }
  }
`;

// Introspect the SubscriptionContract type to see available fields
const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __type(name: "SubscriptionContract") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  if (!SHOPIFY_SHOP_ID) {
    return NextResponse.json(
      { error: 'Shop ID not configured' },
      { status: 500 }
    );
  }

  const apiUrl = `https://shopify.com/${SHOPIFY_SHOP_ID}/account/customer/api/2024-10/graphql`;

  try {
    // First, let's introspect to see what fields are available
    const introspectionResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({ query: INTROSPECTION_QUERY }),
    });
    
    const introspectionData = await introspectionResponse.json();
    
    // Now try to get subscriptions with a simple query first
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({ query: SIMPLE_SUBSCRIPTIONS_QUERY }),
    });

    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({
        error: 'GraphQL errors',
        errors: data.errors,
        introspection: introspectionData,
      }, { status: 400 });
    }

    const subscriptionContracts = data.data?.customer?.subscriptionContracts?.nodes || [];

    // Transform to our format
    const subscriptions = subscriptionContracts.map((contract: any) => ({
      id: contract.id,
      status: contract.status?.toLowerCase() || 'unknown',
      createdAt: contract.createdAt,
      nextBillingDate: contract.nextBillingDate,
      // Add more fields as we discover the schema
    }));

    return NextResponse.json({
      subscriptions,
      debug: {
        rawCount: subscriptionContracts.length,
        introspection: introspectionData?.data?.__type?.fields?.map((f: any) => f.name) || [],
        raw: subscriptionContracts.length > 0 ? subscriptionContracts[0] : null,
      }
    });
  } catch (error) {
    console.error('Shopify subscriptions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions', details: String(error) },
      { status: 500 }
    );
  }
}

