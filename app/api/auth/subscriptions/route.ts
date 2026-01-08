/**
 * Subscriptions API Route
 * 
 * FETCH: Uses Shopify's Customer Account API (works correctly, returns only user's subscriptions)
 * MUTATIONS: Will use Loop API (pause, resume, cancel, skip, edit)
 * 
 * The Shopify Customer Account API is the reliable source for fetching the logged-in user's subscriptions.
 * Loop API's customerId filter doesn't work properly - it returns all store subscriptions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Query Shopify Customer Account API for subscriptions
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

    // Transform Shopify subscriptions to our format
    // Filter to only active and paused subscriptions
    const subscriptions = shopifySubscriptions
      .filter((sub: any) => ['ACTIVE', 'PAUSED'].includes(sub.status?.toUpperCase()))
      .map((sub: any) => {
        const firstLine = sub.lines?.nodes?.[0] || {};
        const billingPolicy = sub.billingPolicy || {};
        const deliveryPolicy = sub.deliveryPolicy || {};
        
        // Get interval info - prefer delivery policy
        const interval = deliveryPolicy.interval || billingPolicy.interval || 'MONTH';
        const intervalCount = deliveryPolicy.intervalCount?.count || billingPolicy.intervalCount?.count || 1;

        // Extract the numeric Shopify ID from the GID
        // Format: gid://shopify/SubscriptionContract/126077600118 -> 126077600118
        const shopifyNumericId = sub.id.split('/').pop();

        return {
          // Use the Shopify GID as the primary ID
          id: sub.id,
          shopifyId: sub.id,
          shopifyNumericId, // For Loop API lookups
          status: sub.status?.toLowerCase() || 'unknown',
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt,
          nextBillingDate: sub.nextBillingDate,
          currencyCode: sub.currencyCode || 'GBP',
          lastPaymentStatus: sub.lastPaymentStatus,
          
          // Product info from first line item
          product: {
            id: firstLine.id || '',
            title: firstLine.title || firstLine.name || 'Subscription',
            variantTitle: '',
            quantity: firstLine.quantity || 1,
            image: firstLine.variantImage?.url,
          },
          
          // Price info
          price: {
            amount: firstLine.currentPrice?.amount || '0',
            currencyCode: firstLine.currentPrice?.currencyCode || sub.currencyCode || 'GBP',
          },
          
          // Delivery/billing interval
          interval: {
            value: intervalCount,
            unit: interval.toLowerCase(),
          },
          
          // All line items
          lineItems: (sub.lines?.nodes || []).map((line: any) => ({
            id: line.id,
            title: line.title || line.name,
            quantity: line.quantity,
            price: line.currentPrice?.amount,
            image: line.variantImage?.url,
          })),
        };
      });

    return NextResponse.json({ 
      subscriptions,
      debug: {
        source: 'shopify-customer-account-api',
        totalFromShopify: shopifySubscriptions.length,
        activeAndPaused: subscriptions.length,
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
