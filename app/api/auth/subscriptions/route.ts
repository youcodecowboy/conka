/**
 * Subscriptions API Route
 * 
 * HYBRID APPROACH:
 * 1. Use Shopify's Customer Account API to identify which subscriptions belong to the customer
 * 2. Fetch detailed/current data from Loop API for each subscription
 * 
 * This ensures:
 * - Correct customer-subscription association (from Shopify)
 * - Accurate current state (from Loop - the source of truth)
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

// Loop API helper
async function fetchFromLoop(subscriptionId: string): Promise<any> {
  const loopToken = env.loopApiKey;
  if (!loopToken) {
    console.error('[Subscriptions] Loop API key not configured');
    return null;
  }

  try {
    // Use shopify-{id} format for Loop API
    const loopId = `shopify-${subscriptionId}`;
    const response = await fetch(
      `https://api.loopsubscriptions.com/admin/2023-10/subscription/${loopId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Loop-Token': loopToken,
        },
      }
    );

    if (!response.ok) {
      console.error(`[Subscriptions] Loop API error for ${loopId}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error(`[Subscriptions] Loop fetch error for ${subscriptionId}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Step 1: Query Shopify Customer Account API for subscription IDs
  // This correctly returns ONLY the logged-in customer's subscriptions
  const query = `
    query {
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
              intervalCount {
                count
              }
            }
            deliveryPolicy {
              interval
              intervalCount {
                count
              }
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
                variantImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(env.customerAccountApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('[Subscriptions] Shopify API errors:', result.errors);
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions', details: result.errors },
        { status: 500 }
      );
    }

    const shopifySubscriptions = result.data?.customer?.subscriptionContracts?.nodes || [];
    
    console.log(`[Subscriptions] Found ${shopifySubscriptions.length} subscriptions from Shopify`);

    // Step 2: For each subscription, fetch current state from Loop
    const subscriptions = await Promise.all(
      shopifySubscriptions
        .filter((sub: any) => ['ACTIVE', 'PAUSED'].includes(sub.status?.toUpperCase()))
        .map(async (sub: any) => {
          // Extract the numeric Shopify ID from the GID
          // Format: gid://shopify/SubscriptionContract/126077600118 -> 126077600118
          const shopifyNumericId = sub.id.split('/').pop();
          
          // Fetch current state from Loop
          const loopData = await fetchFromLoop(shopifyNumericId);
          
          // Use Shopify data as base, but prefer Loop data for product info
          const shopifyFirstLine = sub.lines?.nodes?.[0] || {};
          const shopifyBillingPolicy = sub.billingPolicy || {};
          const shopifyDeliveryPolicy = sub.deliveryPolicy || {};
          
          // Get interval info from Shopify (fallback)
          const shopifyInterval = shopifyDeliveryPolicy.interval || shopifyBillingPolicy.interval || 'MONTH';
          const shopifyIntervalCount = shopifyDeliveryPolicy.intervalCount?.count || shopifyBillingPolicy.intervalCount?.count || 1;

          // If Loop data is available, use it for accurate product/variant info
          if (loopData) {
            const loopLine = loopData.lines?.[0] || {};
            const loopBillingPolicy = loopData.billingPolicy || {};
            const loopDeliveryPolicy = loopData.deliveryPolicy || {};
            
            // Determine interval from Loop data
            // Loop uses 'interval' not 'intervalUnit'
            const loopInterval = loopDeliveryPolicy.interval || loopBillingPolicy.interval || shopifyInterval;
            const loopIntervalCount = loopDeliveryPolicy.intervalCount || loopBillingPolicy.intervalCount || shopifyIntervalCount;
            
            console.log(`[Subscriptions] Loop data for ${shopifyNumericId}:`, {
              status: loopData.status,
              productTitle: loopLine.productTitle,
              variantTitle: loopLine.variantTitle,
              interval: loopInterval,
              intervalCount: loopIntervalCount,
            });

            // Check if there's an unfulfilled first order
            // If completedOrdersCount is 0 and there's an origin order, the first order hasn't been fulfilled yet
            const completedOrdersCount = loopData.completedOrdersCount || 0;
            const hasOriginOrder = !!loopData.originOrderShopifyId;
            const hasUnfulfilledFirstOrder = hasOriginOrder && completedOrdersCount === 0;

            return {
              id: sub.id,
              shopifyId: sub.id,
              shopifyNumericId,
              loopId: loopData.id,
              status: (loopData.status || sub.status)?.toLowerCase() || 'unknown',
              createdAt: loopData.createdAt || sub.createdAt,
              updatedAt: loopData.updatedAt || sub.updatedAt,
              nextBillingDate: loopData.nextBillingDate || sub.nextBillingDate,
              currencyCode: loopData.currencyCode || sub.currencyCode || 'GBP',
              lastPaymentStatus: sub.lastPaymentStatus,
              
              // Fulfillment info for warning display
              completedOrdersCount,
              hasUnfulfilledFirstOrder,
              originOrderId: loopData.originOrderShopifyId,
              
              // Product info from Loop (more accurate after edits)
              product: {
                id: loopLine.id || shopifyFirstLine.id || '',
                // Use Loop's full product name (includes variant) or fall back to product title
                // Loop provides 'name' which is "Product - Variant" format
                title: loopLine.name || loopLine.productTitle || shopifyFirstLine.title || shopifyFirstLine.name || 'Subscription',
                variantTitle: loopLine.variantTitle || '',
                quantity: loopLine.quantity || shopifyFirstLine.quantity || 1,
                image: loopLine.variantImage || loopLine.image || shopifyFirstLine.variantImage?.url,
              },
              
              // Price info from Loop
              price: {
                amount: loopLine.price || loopLine.currentPrice || shopifyFirstLine.currentPrice?.amount || '0',
                currencyCode: loopData.currencyCode || shopifyFirstLine.currentPrice?.currencyCode || sub.currencyCode || 'GBP',
              },
              
              // Delivery/billing interval from Loop
              interval: {
                value: loopIntervalCount,
                unit: (loopInterval || 'month').toLowerCase(),
              },
              
              // All line items from Loop
              lineItems: (loopData.lines || []).map((line: any) => ({
                id: line.id,
                title: line.productTitle || line.variantTitle,
                variantTitle: line.variantTitle,
                quantity: line.quantity,
                price: line.price || line.currentPrice,
                image: line.image,
              })),
              
              // Flag indicating data source
              dataSource: 'loop',
            };
          }
          
          // Fallback to Shopify data if Loop fetch failed
          console.log(`[Subscriptions] Using Shopify fallback for ${shopifyNumericId}`);
          
          return {
            id: sub.id,
            shopifyId: sub.id,
            shopifyNumericId,
            status: sub.status?.toLowerCase() || 'unknown',
            createdAt: sub.createdAt,
            updatedAt: sub.updatedAt,
            nextBillingDate: sub.nextBillingDate,
            currencyCode: sub.currencyCode || 'GBP',
            lastPaymentStatus: sub.lastPaymentStatus,
            
            // Without Loop data, we can't determine fulfillment status
            // Default to false (don't show warning) when falling back
            completedOrdersCount: null,
            hasUnfulfilledFirstOrder: false,
            originOrderId: null,
            
            // Product info from Shopify
            product: {
              id: shopifyFirstLine.id || '',
              title: shopifyFirstLine.title || shopifyFirstLine.name || 'Subscription',
              variantTitle: '',
              quantity: shopifyFirstLine.quantity || 1,
              image: shopifyFirstLine.variantImage?.url,
            },
            
            // Price info
            price: {
              amount: shopifyFirstLine.currentPrice?.amount || '0',
              currencyCode: shopifyFirstLine.currentPrice?.currencyCode || sub.currencyCode || 'GBP',
            },
            
            // Delivery/billing interval
            interval: {
              value: shopifyIntervalCount,
              unit: shopifyInterval.toLowerCase(),
            },
            
            // All line items
            lineItems: (sub.lines?.nodes || []).map((line: any) => ({
              id: line.id,
              title: line.title || line.name,
              quantity: line.quantity,
              price: line.currentPrice?.amount,
              image: line.variantImage?.url,
            })),
            
            // Flag indicating data source
            dataSource: 'shopify-fallback',
          };
        })
    );

    return NextResponse.json({ 
      subscriptions,
      debug: {
        source: 'hybrid-shopify-loop',
        totalFromShopify: shopifySubscriptions.length,
        activeAndPaused: subscriptions.length,
        loopDataCount: subscriptions.filter((s: any) => s.dataSource === 'loop').length,
        shopifyFallbackCount: subscriptions.filter((s: any) => s.dataSource === 'shopify-fallback').length,
      }
    });

  } catch (error) {
    console.error('[Subscriptions] Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions', details: String(error) },
      { status: 500 }
    );
  }
}
