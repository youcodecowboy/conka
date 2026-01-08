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
async function loopFetch<T>(endpoint: string): Promise<{ data?: T; error?: string }> {
  const token = env.loopApiKey;
  
  if (!token) {
    return { error: 'Loop API not configured' };
  }

  try {
    const response = await fetch(`${LOOP_API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': token,
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      return { error: result.message || 'Loop API error' };
    }

    return { data: result.data };
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

  try {
    // Step 1: Find customer in Loop by email
    const customerResult = await loopFetch<any[]>(`/customer?email=${encodeURIComponent(userEmail)}`);
    
    if (customerResult.error || !customerResult.data || customerResult.data.length === 0) {
      // No Loop customer found - return empty subscriptions
      return NextResponse.json({ 
        subscriptions: [],
        debug: { 
          email: userEmail, 
          message: 'No Loop customer found for this email' 
        }
      });
    }

    const loopCustomerId = customerResult.data[0].id;

    // Step 2: Get subscriptions for this customer from Loop
    const subscriptionsResult = await loopFetch<any[]>(`/subscription?customerId=${loopCustomerId}`);
    
    if (subscriptionsResult.error) {
      return NextResponse.json(
        { error: subscriptionsResult.error },
        { status: 500 }
      );
    }

    const loopSubscriptions = subscriptionsResult.data || [];

    // Step 3: Transform Loop subscriptions to our frontend format
    // Filter to only show active and paused subscriptions (not cancelled/expired)
    const subscriptions = loopSubscriptions
      .filter((sub: any) => ['ACTIVE', 'PAUSED'].includes(sub.status?.toUpperCase()))
      .map((sub: any) => {
        // Get the first line item for product info
        const firstLine = sub.lines?.[0] || {};
        
        // Build interval from Loop's data
        const intervalUnit = (sub.deliveryInterval || sub.billingInterval || 'MONTH').toLowerCase();
        const intervalCount = sub.deliveryIntervalCount || sub.billingIntervalCount || 1;

        return {
          // IMPORTANT: Use Loop's subscription ID (numeric), not Shopify's
          id: String(sub.id),
          loopId: sub.id, // Keep numeric version too
          shopifyId: sub.shopifyId, // For reference
          status: sub.status?.toLowerCase() || 'unknown',
          createdAt: sub.createdAt,
          updatedAt: sub.updatedAt,
          nextBillingDate: sub.nextBillingDate || sub.nextOrderDate,
          currencyCode: sub.currencyCode || 'GBP',
          
          // Product info from first line item
          product: {
            id: firstLine.productId || firstLine.shopifyProductId || '',
            title: firstLine.productTitle || sub.productTitle || 'Subscription',
            variantTitle: firstLine.variantTitle || '',
            variantId: firstLine.variantId || firstLine.shopifyVariantId || '',
            quantity: firstLine.quantity || 1,
            image: firstLine.productImage || firstLine.variantImage,
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
            productId: line.productId || line.shopifyProductId,
            variantId: line.variantId || line.shopifyVariantId,
            title: line.productTitle,
            variantTitle: line.variantTitle,
            quantity: line.quantity,
            price: line.price,
            image: line.productImage || line.variantImage,
          })),
        };
      });

    return NextResponse.json({ 
      subscriptions,
      debug: {
        email: userEmail,
        loopCustomerId,
        totalFound: loopSubscriptions.length,
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
