/**
 * Comprehensive Loop API Debug Endpoint
 * 
 * This endpoint tests the Loop API directly and shows raw responses
 * to help diagnose issues with subscription management.
 * 
 * Usage: GET /api/auth/subscriptions/debug-loop?operation=pause&subscriptionId=123
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Raw fetch to Loop API with full response logging
async function rawLoopFetch(endpoint: string, options: RequestInit = {}) {
  const token = env.loopApiKey;
  
  if (!token) {
    return { error: 'LOOP_API_KEY not configured' };
  }

  const url = `${LOOP_API_BASE}${endpoint}`;
  
  console.log(`[Loop Debug] Request: ${options.method || 'GET'} ${url}`);
  if (options.body) {
    console.log(`[Loop Debug] Body:`, options.body);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': token,
        ...options.headers,
      },
    });

    const responseText = await response.text();
    let responseJson;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      responseJson = null;
    }

    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseJson || responseText,
      url,
    };
  } catch (error) {
    return {
      error: 'Network error',
      message: String(error),
      url,
    };
  }
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('customer_id_token')?.value;
  
  // Parse the ID token to get user email
  let userEmail = '';
  if (idToken) {
    try {
      const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
      userEmail = payload.email || '';
    } catch {
      // Ignore parse errors
    }
  }

  const { searchParams } = new URL(request.url);
  const operation = searchParams.get('operation') || 'info';
  const subscriptionId = searchParams.get('subscriptionId');

  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    userEmail,
    operation,
    config: {
      loopApiConfigured: !!env.loopApiKey,
      loopApiKeyPreview: env.loopApiKey ? `${env.loopApiKey.substring(0, 10)}...` : null,
      baseUrl: LOOP_API_BASE,
    },
  };

  // Step 1: Test basic API connectivity
  results.step1_apiTest = await rawLoopFetch('/subscription?limit=1');

  // Step 2: Find customer by email
  if (userEmail) {
    results.step2_customerLookup = await rawLoopFetch(`/customer?email=${encodeURIComponent(userEmail)}`);
    
    // Extract customer data
    const customerData = results.step2_customerLookup?.body?.data;
    if (customerData && Array.isArray(customerData) && customerData.length > 0) {
      const customerId = customerData[0].id;
      results.loopCustomerId = customerId;
      
      // Step 3: Get subscriptions for this customer
      results.step3_customerSubscriptions = await rawLoopFetch(`/subscription?customerId=${customerId}`);
      
      // Extract subscription IDs for reference
      const subsData = results.step3_customerSubscriptions?.body?.data;
      if (subsData && Array.isArray(subsData)) {
        results.customerSubscriptionIds = subsData.map((s: any) => ({
          loopId: s.id,
          shopifyId: s.shopifyId,
          status: s.status,
          productTitle: s.lines?.[0]?.productTitle || s.productTitle || 'Unknown',
        }));
      }
    }
  }

  // Step 4: If a subscription ID was provided, test operations
  if (subscriptionId) {
    results.providedSubscriptionId = subscriptionId;
    
    // Get subscription details first
    results.step4_getSubscription = await rawLoopFetch(`/subscription/${subscriptionId}`);
    
    // Test specific operations based on parameter
    switch (operation) {
      case 'pause':
        results.step5_operation = await rawLoopFetch(`/subscription/${subscriptionId}/pause`, {
          method: 'POST',
        });
        break;
        
      case 'resume':
        results.step5_operation = await rawLoopFetch(`/subscription/${subscriptionId}/resume`, {
          method: 'POST',
        });
        break;
        
      case 'cancel':
        results.step5_operation = await rawLoopFetch(`/subscription/${subscriptionId}/cancel`, {
          method: 'POST',
          body: JSON.stringify({ cancellationReason: 'Debug test' }),
        });
        break;
        
      case 'skip':
        results.step5_operation = await rawLoopFetch(`/subscription/${subscriptionId}/order/skip`, {
          method: 'POST',
        });
        break;
        
      case 'change-frequency':
        const interval = searchParams.get('interval') || 'WEEK';
        const intervalCount = parseInt(searchParams.get('intervalCount') || '2', 10);
        results.step5_operation = await rawLoopFetch(`/subscription/${subscriptionId}/change-frequency`, {
          method: 'POST',
          body: JSON.stringify({
            billingInterval: interval,
            billingIntervalCount: intervalCount,
            deliveryInterval: interval,
            deliveryIntervalCount: intervalCount,
          }),
        });
        break;
        
      default:
        results.step5_info = 'No operation specified. Add ?operation=pause|resume|cancel|skip|change-frequency';
    }
    
    // Get subscription after operation to see if it changed
    if (operation !== 'info') {
      results.step6_afterOperation = await rawLoopFetch(`/subscription/${subscriptionId}`);
    }
  }

  // Provide helpful notes
  results.notes = {
    howToUse: [
      'GET /api/auth/subscriptions/debug-loop - Basic API test',
      'GET /api/auth/subscriptions/debug-loop?subscriptionId=123&operation=pause - Test pause',
      'GET /api/auth/subscriptions/debug-loop?subscriptionId=123&operation=resume - Test resume',
      'GET /api/auth/subscriptions/debug-loop?subscriptionId=123&operation=skip - Test skip',
      'GET /api/auth/subscriptions/debug-loop?subscriptionId=123&operation=cancel - Test cancel',
      'GET /api/auth/subscriptions/debug-loop?subscriptionId=123&operation=change-frequency&interval=WEEK&intervalCount=2 - Test frequency change',
    ],
    important: 'Use Loop subscription ID (numeric like 3885948), NOT Shopify ID (gid://shopify/...)',
  };

  return NextResponse.json(results, { status: 200 });
}
