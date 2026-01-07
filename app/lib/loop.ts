/**
 * Loop Subscriptions API Client
 * 
 * Loop Subscriptions is a third-party subscription management service
 * that integrates with Shopify.
 * 
 * API Documentation: https://developer.loopwork.co/reference/api-reference
 */

import type { 
  Subscription, 
  SubscriptionError, 
  SubscriptionApiResponse,
  SubscriptionInterval,
} from '@/app/types';

// Loop Admin API base URL (2023-10 version)
const LOOP_API_BASE = 'https://api.loopsubscriptions.com/admin/2023-10';

// Re-export types for backwards compatibility
export type LoopSubscription = Subscription;
export type LoopError = SubscriptionError;
type LoopApiResponse<T> = SubscriptionApiResponse<T>;

import { env } from './env';

// Get API credentials from environment
function getCredentials(): { token: string } {
  const token = env.loopApiKey;

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
        'X-Loop-Token': token,  // Loop uses X-Loop-Token header, not Bearer
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

    // Loop API wraps responses in a data field
    return { data: data.data || data };
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

// Get all subscriptions (paginated)
// https://developer.loopwork.co/reference/read-all-subscriptions
export async function getAllSubscriptions(
  page: number = 1,
  limit: number = 50
): Promise<LoopApiResponse<LoopSubscription[]>> {
  return loopFetch<LoopSubscription[]>(
    `/subscription?page=${page}&limit=${limit}`
  );
}

// Get subscriptions by customer email
// Note: Loop's Admin API uses customer ID, not email directly
// We need to first get the customer by email, then get their subscriptions
export async function getCustomerSubscriptions(
  email: string
): Promise<LoopApiResponse<LoopSubscription[]>> {
  try {
    // Get customer by email - Loop returns an array of customers
    const customerResult = await loopFetch<Array<{ id: number }>>(
      `/customer?email=${encodeURIComponent(email)}`
    );
    
    if (customerResult.error || !customerResult.data) {
      return { data: [] }; // No customer found, return empty
    }
    
    // Loop returns an array, get the first matching customer
    const customers = Array.isArray(customerResult.data) 
      ? customerResult.data 
      : [customerResult.data];
    
    if (customers.length === 0) {
      return { data: [] };
    }
    
    const customerId = customers[0].id;
    
    // Then get subscriptions for that customer
    return loopFetch<LoopSubscription[]>(
      `/subscription?customerId=${customerId}`
    );
  } catch (error) {
    console.error('getCustomerSubscriptions error:', error);
    return { data: [] };
  }
}

// Get single subscription by ID
// https://developer.loopwork.co/reference/read-subscription-details
export async function getSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscription/${subscriptionId}`);
}

// Pause a subscription
// https://developer.loopwork.co/reference/pause-subscription
export async function pauseSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscription/${subscriptionId}/pause`, {
    method: 'POST',
  });
}

// Resume a subscription
// https://developer.loopwork.co/reference/resume-subscription
export async function resumeSubscription(
  subscriptionId: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscription/${subscriptionId}/resume`, {
    method: 'POST',
  });
}

// Cancel a subscription
// https://developer.loopwork.co/reference/cancel-subscription
export async function cancelSubscription(
  subscriptionId: string,
  reason?: string
): Promise<LoopApiResponse<LoopSubscription>> {
  return loopFetch<LoopSubscription>(`/subscription/${subscriptionId}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ 
      cancellationReason: reason,
    }),
  });
}

// Skip next order
// https://developer.loopwork.co/reference/skip-next-order
export async function skipNextOrder(
  subscriptionId: string
): Promise<LoopApiResponse<{ success: boolean }>> {
  return loopFetch<{ success: boolean }>(
    `/subscription/${subscriptionId}/order/skip`,
    {
      method: 'POST',
    }
  );
}

// Update subscription frequency (change billing/delivery interval)
// https://developer.loopwork.co/reference/update-frequency
// Note: Changing frequency may require using the "change-frequency" endpoint
export async function updateSubscriptionFrequency(
  subscriptionId: string,
  interval: SubscriptionInterval
): Promise<LoopApiResponse<LoopSubscription>> {
  // Map our interval format to Loop's expected format
  const intervalUnit = interval.unit.toUpperCase(); // Loop uses WEEK, MONTH, etc.
  
  return loopFetch<LoopSubscription>(`/subscription/${subscriptionId}/change-frequency`, {
    method: 'POST',
    body: JSON.stringify({ 
      billingInterval: intervalUnit,
      billingIntervalCount: interval.value,
      deliveryInterval: intervalUnit,
      deliveryIntervalCount: interval.value,
    }),
  });
}

// Update subscription line item quantity
// https://developer.loopwork.co/reference/update-line-item-quantity
// Note: Quantity changes happen on line items, not on the subscription directly
export async function updateSubscriptionQuantity(
  subscriptionId: string,
  quantity: number
): Promise<LoopApiResponse<LoopSubscription>> {
  // First, get the subscription to find the line item ID
  const subResult = await getSubscription(subscriptionId);
  
  if (subResult.error || !subResult.data) {
    return {
      error: {
        code: 'SUBSCRIPTION_NOT_FOUND',
        message: 'Could not find subscription to update quantity',
      },
    };
  }
  
  // Get the first line item (most subscriptions have one main product)
  const lines = (subResult.data as any).lines;
  if (!lines || lines.length === 0) {
    return {
      error: {
        code: 'NO_LINE_ITEMS',
        message: 'Subscription has no line items to update',
      },
    };
  }
  
  const lineId = lines[0].id;
  
  // Update the line item quantity
  return loopFetch<LoopSubscription>(`/line/${lineId}/update-quantity`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  });
}

// Swap a product variant in a subscription
// This replaces an existing line item with a new variant
export async function swapSubscriptionProduct(
  subscriptionId: string,
  newVariantId: string,
  quantity?: number
): Promise<LoopApiResponse<LoopSubscription>> {
  // First, get the subscription to find the line item ID
  const subResult = await getSubscription(subscriptionId);
  
  if (subResult.error || !subResult.data) {
    return {
      error: {
        code: 'SUBSCRIPTION_NOT_FOUND',
        message: 'Could not find subscription to swap product',
      },
    };
  }
  
  // Get the first line item (most subscriptions have one main product)
  const lines = (subResult.data as any).lines;
  if (!lines || lines.length === 0) {
    return {
      error: {
        code: 'NO_LINE_ITEMS',
        message: 'Subscription has no line items to swap',
      },
    };
  }
  
  const lineId = lines[0].id;
  const currentQuantity = lines[0].quantity || 1;
  
  // Swap the product using Loop's swap endpoint
  // Note: The exact endpoint may vary - common patterns are:
  // POST /line/{lineId}/swap
  // POST /subscription/{id}/swap-product
  return loopFetch<LoopSubscription>(`/line/${lineId}/swap`, {
    method: 'POST',
    body: JSON.stringify({ 
      variantId: newVariantId,
      quantity: quantity || currentQuantity,
    }),
  });
}

// Update both frequency and quantity in one call (for plan changes)
export async function updateSubscriptionPlan(
  subscriptionId: string,
  options: {
    interval?: SubscriptionInterval;
    quantity?: number;
    variantId?: string;
  }
): Promise<LoopApiResponse<LoopSubscription>> {
  const results: { frequency?: boolean; quantity?: boolean; variant?: boolean } = {};
  let lastError: LoopError | undefined;

  // Update frequency if provided
  if (options.interval) {
    const freqResult = await updateSubscriptionFrequency(subscriptionId, options.interval);
    if (freqResult.error) {
      lastError = freqResult.error;
    } else {
      results.frequency = true;
    }
  }

  // Update quantity if provided
  if (options.quantity) {
    const qtyResult = await updateSubscriptionQuantity(subscriptionId, options.quantity);
    if (qtyResult.error) {
      lastError = qtyResult.error;
    } else {
      results.quantity = true;
    }
  }

  // Swap variant if provided
  if (options.variantId) {
    const swapResult = await swapSubscriptionProduct(subscriptionId, options.variantId, options.quantity);
    if (swapResult.error) {
      lastError = swapResult.error;
    } else {
      results.variant = true;
    }
  }

  // Return the updated subscription
  const finalResult = await getSubscription(subscriptionId);
  
  if (lastError && !results.frequency && !results.quantity && !results.variant) {
    return { error: lastError };
  }

  return finalResult;
}

