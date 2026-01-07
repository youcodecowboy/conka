import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCustomerSubscriptions } from '@/app/lib/loop';

// Helper to get customer email from ID token cookie
async function getCustomerEmailFromSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const idToken = cookieStore.get('customer_id_token')?.value;
  
  if (!idToken) return null;
  
  try {
    // Decode the ID token to get customer email
    const payload = JSON.parse(
      Buffer.from(idToken.split('.')[1], 'base64').toString()
    );
    return payload.email || null;
  } catch {
    return null;
  }
}

// GET - Fetch customer subscriptions (requires authentication)
export async function GET(request: NextRequest) {
  try {
    // Get customer email from session cookie
    const customerEmail = await getCustomerEmailFromSession();

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Use the authenticated customer's email
    const result = await getCustomerSubscriptions(customerEmail);

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

