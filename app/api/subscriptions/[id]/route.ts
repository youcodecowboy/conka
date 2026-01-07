import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  getSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  updateSubscriptionFrequency,
  updateSubscriptionQuantity,
  getCustomerSubscriptions,
} from '@/app/lib/loop';

// Helper to get customer email from ID token cookie
async function getCustomerEmailFromSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('customer_id_token')?.value;
  
  if (!idToken) return null;
  
  try {
    const payload = JSON.parse(
      Buffer.from(idToken.split('.')[1], 'base64').toString()
    );
    return payload.email || null;
  } catch {
    return null;
  }
}

// Verify the user owns the subscription
async function verifySubscriptionOwnership(
  subscriptionId: string,
  customerEmail: string
): Promise<boolean> {
  try {
    // Get all subscriptions for this customer
    const result = await getCustomerSubscriptions(customerEmail);
    
    if (result.error || !result.data) {
      return false;
    }
    
    // Check if the subscription ID is in the customer's subscriptions
    return result.data.some((sub) => sub.id === subscriptionId);
  } catch {
    return false;
  }
}

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
    // Verify authentication
    const customerEmail = await getCustomerEmailFromSession();
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Verify ownership
    const isOwner = await verifySubscriptionOwnership(id, customerEmail);
    if (!isOwner) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

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
    // Verify authentication
    const customerEmail = await getCustomerEmailFromSession();
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Verify ownership
    const isOwner = await verifySubscriptionOwnership(id, customerEmail);
    if (!isOwner) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

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
