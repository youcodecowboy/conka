/**
 * Loop Subscriptions API Client
 * 
 * Loop Subscriptions is a third-party subscription management service
 * that integrates with Shopify.
 * 
 * API Documentation: https://loop-subscriptions.readme.io/
 */

// Loop API base URL
const LOOP_API_BASE = 'https://api.loopsubscriptions.com/v1';

// Types for Loop Subscriptions
export interface LoopSubscription {
  id: string;
  customerId: string;
  email: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  nextBillingDate: string;
  createdAt: string;
  updatedAt: string;
  product: {
    id: string;
    title: string;
    variantTitle?: string;
    image?: string;
  };
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  interval: {
    value: number;
    unit: 'day' | 'week' | 'month' | 'year';
  };
}

export interface LoopError {
  code: string;
  message: string;
}

interface LoopApiResponse<T> {
  data?: T;
  error?: LoopError;
}

// Get API credentials from environment
function getCredentials(): { token: string } {
  const token = process.env.LOOP_API_KEY;

  if (!token) {
    throw new Error('Loop API credentials not configured');
  }

  return { token };
}

// Make authenticated request to Loop API
export async function loopFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<LoopApiResponse<T>> {
  const { token } = getCredentials();

  const url = `${LOOP_API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: {
          code: data.code || 'UNKNOWN_ERROR',
          message: data.message || 'An error occurred',
        },
      };
    }

    return { data };
  } catch (error) {
    console.error('Loop API error:', error);
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: 'Failed to connect to Loop API',
      },
    };
  }
}

// Get subscriptions by customer email
export async function getCustomerSubscriptions(
  email: string
): Promise<LoopApiResponse<LoopSubscription[]>> {
  return loopFetch<LoopSubscription[]>(
    `/subscriptions?customer_email=${encodeURIComponent(email)}`
  );
}

// Get single subscription by ID
export async function getSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}`);
}

// Pause a subscription
export async function pauseSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}/pause`, {
    method: 'POST',
  });
}

// Resume a subscription
export async function resumeSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}/resume`, {
    method: 'POST',
  });
}

// Cancel a subscription
export async function cancelSubscription(
  subscriptionId: string,
  reason?: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
}

// Skip next order
export async function skipNextOrder(
  subscriptionId: string
): Promise<LoopApiResponse<{ skippedDate: string }>> {
  return loopFetch<{ skippedDate: string }>(
    `/subscriptions/${subscriptionId}/skip`,
    {
      method: 'POST',
    }
  );
}

// Update subscription frequency
export async function updateSubscriptionFrequency(
  subscriptionId: string,
  interval: { value: number; unit: 'day' | 'week' | 'month' | 'year' }
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}`, {
    method: 'PATCH',
    body: JSON.stringify({ interval }),
  });
}

// Update subscription quantity
export async function updateSubscriptionQuantity(
  subscriptionId: string,
  quantity: number
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscriptions/${subscriptionId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}

