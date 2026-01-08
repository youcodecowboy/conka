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

// Fetch from Loop API
async function loopFetch<T>(endpoint: string): Promise<{ data?: T; error?: string; raw?: any }> {
  const token = env.loopApiKey;
  
  if (!token) {
    return { error: 'Loop API not configured' };
  }

  const url = `${LOOP_API_BASE}${endpoint}`;
  console.log(`[Loop API] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': token,
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('[Loop API] Error:', result);
      return { error: result.message || 'Loop API error', raw: result };
    }

    return { data: result.data, raw: result };
  } catch (error) {
    console.error('[Loop API] Fetch error:', error);
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
    
    if (customerResult.error || !customerResult.data || customerResult.data.length === 0) {
      console.log('[Subscriptions] No Loop customer found for email:', userEmail);
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
    
    console.log(`[Subscriptions] Found Loop customer ID: ${loopCustomerId}, active subs: ${loopCustomer.activeSubscriptionsCount}`);

    // Step 2: Get subscriptions for this specific customer using Loop's customer ID filter
    // Loop API supports filtering by customerId
    const subscriptionsResult = await loopFetch<any[]>(`/subscription?customerId=${loopCustomerId}&limit=50`);
    
    if (subscriptionsResult.error) {
      console.error('[Subscriptions] Error fetching subscriptions:', subscriptionsResult.error);
      return NextResponse.json(
        { error: subscriptionsResult.error },
        { status: 500 }
      );
    }

    const customerSubscriptions = subscriptionsResult.data || [];
    console.log(`[Subscriptions] Found ${customerSubscriptions.length} subscriptions for customer ${loopCustomerId}`);

    // Step 3: Transform and filter to active/paused only
    const subscriptions = customerSubscriptions
      .filter((sub: any) => ['ACTIVE', 'PAUSED'].includes(sub.status?.toUpperCase()))
      .map((sub: any) => {
        // Get the first line item for product info
        const firstLine = sub.lines?.[0] || {};
        
        // Build interval from Loop's policy data
        const deliveryPolicy = sub.deliveryPolicy || {};
        const billingPolicy = sub.billingPolicy || {};
        const intervalUnit = (deliveryPolicy.interval || billingPolicy.interval || 'MONTH').toLowerCase();
        const intervalCount = deliveryPolicy.intervalCount || billingPolicy.intervalCount || 1;

        return {
          // Use Loop's subscription ID for API operations
          id: String(sub.id),
          loopId: sub.id,
          shopifyId: sub.shopifyId,
          status: sub.status?.toLowerCase() || 'unknown',
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt,
          nextBillingDate: sub.nextBillingDateEpoch 
            ? new Date(sub.nextBillingDateEpoch * 1000).toISOString() 
            : sub.nextBillingDate || sub.nextOrderDate,
          currencyCode: sub.currencyCode || 'GBP',
          
          // Product info from first line item
          product: {
            id: String(firstLine.productShopifyId || firstLine.productId || ''),
            title: firstLine.productTitle || firstLine.name || 'Subscription',
            variantTitle: firstLine.variantTitle || '',
            variantId: String(firstLine.variantShopifyId || firstLine.variantId || ''),
            quantity: firstLine.quantity || 1,
            image: firstLine.variantImage || firstLine.productImage,
          },
          
          // Price info
          price: {
            amount: String(sub.totalLineItemPrice || sub.totalLineItemDiscountedPrice || firstLine.price || '0'),
            currencyCode: sub.currencyCode || 'GBP',
          },
          
          // Delivery/billing interval
          interval: {
            value: intervalCount,
            unit: intervalUnit === 'day' ? 'day' : intervalUnit === 'week' ? 'week' : 'month',
          },
          
          // All line items for reference
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
        activeCount: loopCustomer.activeSubscriptionsCount,
        pausedCount: loopCustomer.pausedSubscriptionsCount,
        totalFromLoop: customerSubscriptions.length,
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
