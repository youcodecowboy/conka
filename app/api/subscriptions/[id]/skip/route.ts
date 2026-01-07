import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { skipNextOrder, getCustomerSubscriptions } from '@/app/lib/loop';

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
    const result = await getCustomerSubscriptions(customerEmail);
    
    if (result.error || !result.data) {
      return false;
    }
    
    return result.data.some((sub) => sub.id === subscriptionId);
  } catch {
    return false;
  }
}

// POST - Skip next order
export async function POST(
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

    const result = await skipNextOrder(id);

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Skip order error:', error);
    return NextResponse.json(
      { error: 'Failed to skip order' },
      { status: 500 }
    );
  }
}
