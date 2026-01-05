import { NextRequest, NextResponse } from 'next/server';
import { getCustomerSubscriptions, LoopSubscription } from '@/app/lib/loop';

// GET - Fetch customer subscriptions by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Customer email is required' },
        { status: 400 }
      );
    }

    const result = await getCustomerSubscriptions(email);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ subscriptions: result.data || [] });
  } catch (error) {
    console.error('Get subscriptions error:', error);
    
    // Check if it's a credentials error
    if (error instanceof Error && error.message.includes('not configured')) {
      return NextResponse.json(
        { error: 'Subscription service not configured', subscriptions: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}

