/**
 * POST /api/auth/subscriptions/[id]/payment-method
 *
 * Triggers Loop to email the customer a secure link to update their payment method.
 * Uses Loop Admin API with existing LOOP_API_KEY (X-Loop-Token).
 *
 * Body: { paymentMethodId: number }
 * Loop: PUT https://api.loopsubscriptions.com/admin/2023-10/paymentMethod/{paymentMethodId}
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';
import { SUPPORT_EMAIL } from '@/app/lib/supportEmail';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: subscriptionId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('customer_access_token')?.value;

  if (!accessToken) {
    console.log('[PAYMENT-UPDATE] No session cookie');
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const loopToken = env.loopApiKey;
  if (!loopToken) {
    console.error('[PAYMENT-UPDATE] LOOP_API_KEY not configured');
    return NextResponse.json(
      { success: false, message: 'Payment update not configured' },
      { status: 503 }
    );
  }

  let body: { paymentMethodId?: number } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }

  const paymentMethodId = body.paymentMethodId;
  if (typeof paymentMethodId !== 'number' || !Number.isFinite(paymentMethodId)) {
    return NextResponse.json(
      { success: false, message: 'paymentMethodId required' },
      { status: 400 }
    );
  }

  try {
    console.log('[PAYMENT-UPDATE] Triggering update', { subscriptionId, paymentMethodId });
    const res = await fetch(
      `${LOOP_API_BASE}/paymentMethod/${paymentMethodId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Loop-Token': loopToken,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('[PAYMENT-UPDATE] Loop error', res.status, text);
      return NextResponse.json(
        {
          success: false,
          message: `Something went wrong. Please contact support at ${SUPPORT_EMAIL}.`,
        },
        { status: 502 }
      );
    }

    console.log('[PAYMENT-UPDATE] Success', { subscriptionId, paymentMethodId });
    return NextResponse.json({
      success: true,
      message:
        "Check your email — we've sent you a secure link to update your payment details.",
    });
  } catch (err) {
    console.error('[PAYMENT-UPDATE] Error', err);
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Please contact support at ${SUPPORT_EMAIL}.`,
      },
      { status: 500 }
    );
  }
}
