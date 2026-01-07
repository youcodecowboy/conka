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

// Full subscription query with all relevant fields
const FULL_SUBSCRIPTIONS_QUERY = `
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
          lastPaymentStatus
          billingPolicy {
            interval
            intervalCount
          }
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
    
    // Get subscriptions with full details
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({ query: FULL_SUBSCRIPTIONS_QUERY }),
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

    // Transform to our Subscription format
    const subscriptions = subscriptionContracts.map((contract: any) => {
      const firstLine = contract.lines?.nodes?.[0];
      const billingPolicy = contract.billingPolicy || contract.deliveryPolicy;
      
      return {
        id: contract.id,
        status: contract.status?.toLowerCase() || 'unknown',
        createdAt: contract.createdAt,
        updatedAt: contract.updatedAt,
        nextBillingDate: contract.nextBillingDate,
        currencyCode: contract.currencyCode,
        lastPaymentStatus: contract.lastPaymentStatus,
        product: firstLine ? {
          id: firstLine.productId || '',
          title: firstLine.title || firstLine.name || 'Subscription',
          variantId: firstLine.variantId,
          quantity: firstLine.quantity || 1,
          image: firstLine.variantImage?.url,
          imageAlt: firstLine.variantImage?.altText,
        } : null,
        price: firstLine?.currentPrice ? {
          amount: firstLine.currentPrice.amount,
          currencyCode: firstLine.currentPrice.currencyCode,
        } : null,
        interval: billingPolicy ? {
          value: billingPolicy.intervalCount || 1,
          unit: billingPolicy.interval?.toLowerCase() || 'month',
        } : null,
        // Include all line items if there are multiple
        lineItems: contract.lines?.nodes?.map((line: any) => ({
          id: line.id,
          name: line.name || line.title,
          quantity: line.quantity,
          price: line.currentPrice,
          productId: line.productId,
          variantId: line.variantId,
          image: line.variantImage?.url,
        })) || [],
      };
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error('Shopify subscriptions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions', details: String(error) },
      { status: 500 }
    );
  }
}

