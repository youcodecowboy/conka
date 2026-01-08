/**
 * Subscriptions API Route
 * 
 * Fetches customer subscriptions from Loop (the source of truth).
 * Uses Shopify OAuth for authentication (to identify the user by email),
 * then queries Loop Admin API for their subscriptions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Fetch from Loop API with full response logging
async function loopFetch<T>(endpoint: string): Promise<{ data?: T; error?: string; rawResponse?: any }> {
  const token = env.loopApiKey;
  
  if (!token) {
    return { error: 'Loop API not configured' };
  }

  const url = `${LOOP_API_BASE}${endpoint}`;
  console.log(`[Subscriptions] Loop API request: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': token,
      },
    });

    const result = await response.json();
    console.log(`[Subscriptions] Loop API response status: ${response.status}`);
    
    if (!response.ok) {
      return { error: result.message || 'Loop API error', rawResponse: result };
    }

    return { data: result.data, rawResponse: result };
  } catch (error) {
    console.error('Loop fetch error:', error);
    return { error: 'Failed to connect to Loop API' };
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('customer_id_token')?.value;
  const accessToken = cookieStore.get('customer_access_token')?.value;

  // Check authentication
  if (!accessToken || !idToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  // Parse the ID token to get user email
  let userEmail = '';
  try {
    const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
    userEmail = payload.email || '';
  } catch {
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }

  if (!userEmail) {
    return NextResponse.json(
      { error: 'Could not determine user email' },
      { status: 400 }
    );
  }

  console.log(`[Subscriptions] Looking up subscriptions for email: ${userEmail}`);

  try {
    // Step 1: Find customer in Loop by email
    const customerResult = await loopFetch<any[]>(`/customer?email=${encodeURIComponent(userEmail)}`);
    
    console.log(`[Subscriptions] Customer lookup result:`, JSON.stringify(customerResult.data?.[0] || 'none'));
    
    if (customerResult.error || !customerResult.data || customerResult.data.length === 0) {
      // No Loop customer found - return empty subscriptions
      return NextResponse.json({ 
        subscriptions: [],
        debug: { 
          email: userEmail, 
          message: 'No Loop customer found for this email',
          customerLookupError: customerResult.error,
        }
      });
    }

    const loopCustomer = customerResult.data[0];
    const loopCustomerId = loopCustomer.id;
    const shopifyCustomerId = loopCustomer.shopifyId;

    console.log(`[Subscriptions] Found Loop customer: ${loopCustomerId}, Shopify ID: ${shopifyCustomerId}`);

    // Step 2: Get ALL subscriptions and filter by customer on our side
    // The Loop API customerId filter doesn't seem to work reliably
    // So we fetch more and filter to ensure accuracy
    const subscriptionsResult = await loopFetch<any[]>(`/subscription?limit=100`);
    
    if (subscriptionsResult.error) {
      return NextResponse.json(
        { error: subscriptionsResult.error },
        { status: 500 }
      );
    }

    const allSubscriptions = subscriptionsResult.data || [];
    console.log(`[Subscriptions] Total subscriptions from Loop: ${allSubscriptions.length}`);

    // Step 3: Filter subscriptions to only this customer's
    // Loop subscriptions have a nested customer object with id and shopifyId
    const customerSubscriptions = allSubscriptions.filter((sub: any) => {
      const subCustomerId = sub.customer?.id;
      const subShopifyCustomerId = sub.customer?.shopifyId;
      
      // Match by either Loop customer ID or Shopify customer ID
      return subCustomerId === loopCustomerId || 
             subShopifyCustomerId === shopifyCustomerId ||
             subCustomerId === shopifyCustomerId; // Sometimes they store shopifyId in the id field
    });

    console.log(`[Subscriptions] Customer's subscriptions: ${customerSubscriptions.length}`);

    // Step 4: Transform and filter to active/paused only
    const subscriptions = customerSubscriptions
      .filter((sub: any) => ['ACTIVE', 'PAUSED'].includes(sub.status?.toUpperCase()))
      .map((sub: any) => {
        // Get the first line item for product info
        const firstLine = sub.lines?.[0] || {};
        
        // Build interval from Loop's data - check both policy objects and direct fields
        const deliveryPolicy = sub.deliveryPolicy || {};
        const billingPolicy = sub.billingPolicy || {};
        const intervalUnit = (deliveryPolicy.interval || billingPolicy.interval || sub.deliveryInterval || 'MONTH').toLowerCase();
        const intervalCount = deliveryPolicy.intervalCount || billingPolicy.intervalCount || sub.deliveryIntervalCount || 1;

        return {
          // IMPORTANT: Use Loop's subscription ID (numeric), not Shopify's
          id: String(sub.id),
          loopId: sub.id,
          shopifyId: sub.shopifyId,
          status: sub.status?.toLowerCase() || 'unknown',
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt,
          nextBillingDate: sub.nextBillingDate || sub.nextOrderDate,
          currencyCode: sub.currencyCode || 'GBP',
          
          // Product info from first line item
          product: {
            id: firstLine.productShopifyId || firstLine.productId || '',
            title: firstLine.productTitle || firstLine.name || 'Subscription',
            variantTitle: firstLine.variantTitle || '',
            variantId: firstLine.variantShopifyId || firstLine.variantId || '',
            quantity: firstLine.quantity || 1,
            image: firstLine.variantImage || firstLine.productImage,
          },
          
          // Price info
          price: {
            amount: String(sub.totalLineItemPrice || firstLine.price || '0'),
            currencyCode: sub.currencyCode || 'GBP',
          },
          
          // Delivery/billing interval
          interval: {
            value: intervalCount,
            unit: intervalUnit,
          },
          
          // All line items
          lineItems: (sub.lines || []).map((line: any) => ({
            id: line.id,
            productId: line.productShopifyId || line.productId,
            variantId: line.variantShopifyId || line.variantId,
            title: line.productTitle || line.name,
            variantTitle: line.variantTitle,
            quantity: line.quantity,
            price: line.price,
            image: line.variantImage || line.productImage,
          })),
        };
      });

    return NextResponse.json({ 
      subscriptions,
      debug: {
        email: userEmail,
        loopCustomerId,
        shopifyCustomerId,
        totalInLoop: allSubscriptions.length,
        customerSubscriptions: customerSubscriptions.length,
        activeAndPaused: subscriptions.length,
      }
    });

  } catch (error) {
    console.error('Subscriptions fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions', details: String(error) },
      { status: 500 }
    );
  }
}
