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
  
  /** All line items (from Loop). Empty or single item for most subscriptions. */
  lines?: SubscriptionLine[];
  /** True when the subscription has more than one product line. */
  isMultiLine?: boolean;

  /** Loop payment method id (for triggering update email). */
  paymentMethodId?: number | null;
  /** Payment method details from Loop (card brand, last 4, expiry, status). */
  paymentMethod?: {
    id: number;
    brand: string | null;
    lastDigits: string | null;
    expiryMonth: number | null;
    expiryYear: number | null;
    type: string | null;
    status: string | null;
  } | null;
  
  // Fulfillment tracking
  completedOrdersCount?: number | null;
  totalOrdersPlaced?: number | null;
  pendingOrdersCount?: number | null;
  hasUnfulfilledOrder?: boolean;
  unfulfilledOrdersCount?: number;
  originOrderId?: number | null;
}

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'expired';

export interface SubscriptionLine {
  id: number | string;
  productTitle: string;
  variantTitle: string;
  price: string | number;
  quantity: number;
  variantShopifyId?: number;
}

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



