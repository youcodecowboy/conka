/**
 * PUT /api/auth/subscriptions/payment-methods/[id]
 *
 * Triggers Loop to email the customer a secure link to update their payment method.
 * Calls: PUT https://api.loopsubscriptions.com/admin/2023-10/paymentMethod/{id}
 * Header: X-Loop-Token: LOOP_API_KEY
 * Returns: { success: boolean, message: string }
 * Log prefix: [PAYMENT-UPDATE]
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/app/lib/env';

const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: paymentMethodId } = await params;
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

  const id = paymentMethodId?.trim();
  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Payment method ID required' },
      { status: 400 }
    );
  }

  try {
    console.log('[PAYMENT-UPDATE] Triggering', { paymentMethodId: id });
    const res = await fetch(`${LOOP_API_BASE}/paymentMethod/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Loop-Token': loopToken,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[PAYMENT-UPDATE] Loop error', res.status, text);
      return NextResponse.json(
        {
          success: false,
          message: 'Something went wrong. Please contact support at support@conka.io.',
        },
        { status: 502 }
      );
    }

    console.log('[PAYMENT-UPDATE] Success', { paymentMethodId: id });
    return NextResponse.json({
      success: true,
      message:
        "Check your inbox — we've sent a secure link to update your card.",
    });
  } catch (err) {
    console.error('[PAYMENT-UPDATE] Error', err);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Please contact support at support@conka.io.',
      },
      { status: 500 }
    );
  }
}
