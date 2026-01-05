import { NextRequest, NextResponse } from 'next/server';
import {
  getSubscription,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  updateSubscriptionFrequency,
  updateSubscriptionQuantity,
} from '@/app/lib/loop';

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
    const { action, reason, interval, quantity } = body;

    let result;

    switch (action) {
      case 'pause':
        result = await pauseSubscription(id);
        break;

      case 'resume':
        result = await resumeSubscription(id);
        break;

      case 'cancel':
        result = await cancelSubscription(id, reason);
        break;

      case 'updateFrequency':
        if (!interval) {
          return NextResponse.json(
            { error: 'Interval is required for frequency update' },
            { status: 400 }
          );
        }
        result = await updateSubscriptionFrequency(id, interval);
        break;

      case 'updateQuantity':
        if (typeof quantity !== 'number' || quantity < 1) {
          return NextResponse.json(
            { error: 'Valid quantity is required' },
            { status: 400 }
          );
        }
        result = await updateSubscriptionQuantity(id, quantity);
        break;

      default:
        return NextResponse.json(
          { error: `Invalid action: ${action}` },
          { status: 400 }
        );
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

