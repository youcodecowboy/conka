/**
 * Resume Subscription API Route
 * 
 * Uses Loop Admin API as the source of truth.
 * Loop will automatically sync changes to Shopify.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: subscriptionId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  if (!subscriptionId) {
    return NextResponse.json(
      { error: 'Subscription ID is required' },
      { status: 400 }
    );
  }

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    return NextResponse.json(
      { error: 'Loop API not configured' },
      { status: 500 }
    );
  }

  // The subscription ID should already be Loop's numeric ID
  // (from our updated subscriptions listing)
  const loopSubscriptionId = subscriptionId;

  console.log(`[Resume] Resuming subscription ${loopSubscriptionId} via Loop API`);

  try {
    const response = await fetch(`${LOOP_API_BASE}/subscription/${loopSubscriptionId}/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': loopToken,
      },
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { rawResponse: responseText };
    }

    console.log(`[Resume] Loop API response:`, { status: response.status, data });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: data.message || 'Failed to resume subscription in Loop',
        loopResponse: data,
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription resumed successfully',
      subscription: data.data || data,
    });

  } catch (error) {
    console.error('[Resume] Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to resume subscription',
      details: String(error),
    }, { status: 500 });
  }
}
