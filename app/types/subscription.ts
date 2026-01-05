/**
 * Shared Subscription Types
 * 
 * These types are used by both the Loop API client and the frontend hooks.
 */

export interface Subscription {
  id: string;
  customerId: string;
  email: string;
  status: SubscriptionStatus;
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
  interval: SubscriptionInterval;
}

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

export interface SubscriptionInterval {
  value: number;
  unit: 'day' | 'week' | 'month' | 'year';
}

export interface SubscriptionError {
  code: string;
  message: string;
}

export interface SubscriptionApiResponse<T> {
  data?: T;
  error?: SubscriptionError;
}

