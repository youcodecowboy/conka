import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  updateSubscriptionFrequency,
  updateSubscriptionQuantity,
} from '@/app/lib/loop';

// Zod schemas for subscription operations
const subscriptionActionSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('pause'),
  }),
  z.object({
    action: z.literal('resume'),
  }),
  z.object({
    action: z.literal('cancel'),
    reason: z.string().optional(),
  }),
  z.object({
    action: z.literal('updateFrequency'),
    interval: z.object({
      value: z.number().int().positive(),
      unit: z.enum(['day', 'week', 'month', 'year']),
    }),
  }),
  z.object({
    action: z.literal('updateQuantity'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
  }),
]);

// GET - Fetch single subscription
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await getSubscription(id);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ subscription: result.data });
  } catch (error) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    );
  }
}

// PATCH - Update subscription (pause, resume, cancel, update frequency/quantity)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate input with Zod
    const validationResult = subscriptionActionSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;
    let result;

    switch (validatedData.action) {
      case 'pause':
        result = await pauseSubscription(id);
        break;

      case 'resume':
        result = await resumeSubscription(id);
        break;

      case 'cancel':
        result = await cancelSubscription(id, validatedData.reason);
        break;

      case 'updateFrequency':
        result = await updateSubscriptionFrequency(id, validatedData.interval);
        break;

      case 'updateQuantity':
        result = await updateSubscriptionQuantity(id, validatedData.quantity);
        break;
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ subscription: result.data });
  } catch (error) {
    console.error('Update subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

