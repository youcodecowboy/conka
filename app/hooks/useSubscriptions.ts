'use client';

import { useState, useCallback } from 'react';
import type { Subscription, SubscriptionInterval } from '@/app/types';

// Re-export Subscription type for backwards compatibility
export type { Subscription } from '@/app/types';

interface ChangePlanResult {
  success: boolean;
  requiresConfirmation?: boolean;
  redirectUrl?: string;
  message?: string;
}

interface UseSubscriptionsReturn {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  fetchSubscriptions: () => Promise<void>;
  pauseSubscription: (subscriptionId: string) => Promise<boolean>;
  resumeSubscription: (subscriptionId: string) => Promise<boolean>;
  cancelSubscription: (subscriptionId: string, reason?: string) => Promise<boolean>;
  skipNextOrder: (subscriptionId: string) => Promise<boolean>;
  changePlan: (subscriptionId: string, plan: 'starter' | 'pro' | 'max', cancelAndRedirect?: boolean) => Promise<ChangePlanResult>;
  updateFrequency: (subscriptionId: string, interval: SubscriptionInterval) => Promise<boolean>;
  updateQuantity: (subscriptionId: string, quantity: number) => Promise<boolean>;
}

export function useSubscriptions(): UseSubscriptionsReturn {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscriptions from Shopify's native Subscription API
  // (NOT Loop - Loop's API returns business plans, not customer subscriptions)
  const fetchSubscriptions = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/subscriptions', {
        credentials: 'include', // Include cookies for auth
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to fetch subscriptions');
        setSubscriptions([]);
      } else {
        // Transform Shopify format to our Subscription type
        const transformed = (data.subscriptions || []).map((sub: any) => ({
          id: sub.id,
          customerId: '', // Not provided by Shopify's customer API
          email: '', // Not provided by Shopify's customer API
          status: sub.status as 'active' | 'paused' | 'cancelled' | 'expired',
          nextBillingDate: sub.nextBillingDate || '',
          createdAt: sub.createdAt || '',
          updatedAt: sub.updatedAt || '',
          product: sub.product ? {
            id: sub.product.id || '',
            title: sub.product.title || 'Subscription',
            variantTitle: sub.product.variantId ? `Variant ${sub.product.variantId}` : undefined,
            image: sub.product.image,
          } : {
            id: '',
            title: 'Subscription',
          },
          price: sub.price ? {
            amount: sub.price.amount || '0',
            currencyCode: sub.price.currencyCode || 'GBP',
          } : {
            amount: '0',
            currencyCode: 'GBP',
          },
          quantity: sub.product?.quantity || 1,
          interval: sub.interval || { value: 1, unit: 'month' as const },
        }));
        setSubscriptions(transformed);
      }
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err);
      setError('Failed to fetch subscriptions');
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pause subscription - uses Shopify Customer Account API
  const pauseSubscription = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        // URL encode the subscription ID (contains special characters like gid://...)
        const encodedId = encodeURIComponent(subscriptionId);
        const response = await fetch(`/api/auth/subscriptions/${encodedId}/pause`, {
          method: 'POST',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to pause subscription');
          return false;
        }

        // Update local state
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId
              ? { ...sub, status: 'paused' as const }
              : sub
          )
        );

        return true;
      } catch (err) {
        console.error('Failed to pause subscription:', err);
        setError('Failed to pause subscription');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Resume subscription - uses Shopify Customer Account API
  const resumeSubscription = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const encodedId = encodeURIComponent(subscriptionId);
        const response = await fetch(`/api/auth/subscriptions/${encodedId}/resume`, {
          method: 'POST',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to resume subscription');
          return false;
        }

        // Update local state
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId
              ? { ...sub, status: 'active' as const }
              : sub
          )
        );

        return true;
      } catch (err) {
        console.error('Failed to resume subscription:', err);
        setError('Failed to resume subscription');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Cancel subscription - uses Shopify Customer Account API
  const cancelSubscription = useCallback(
    async (subscriptionId: string, reason?: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const encodedId = encodeURIComponent(subscriptionId);
        const response = await fetch(`/api/auth/subscriptions/${encodedId}/cancel`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to cancel subscription');
          return false;
        }

        // Update local state
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId
              ? { ...sub, status: 'cancelled' as const }
              : sub
          )
        );

        return true;
      } catch (err) {
        console.error('Failed to cancel subscription:', err);
        setError('Failed to cancel subscription');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Skip next order - uses Shopify Customer Account API
  const skipNextOrder = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const encodedId = encodeURIComponent(subscriptionId);
        const response = await fetch(`/api/auth/subscriptions/${encodedId}/skip`, {
          method: 'POST',
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to skip order');
          return false;
        }

        return true;
      } catch (err) {
        console.error('Failed to skip order:', err);
        setError('Failed to skip order');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Change subscription plan (Starter/Pro/Max) - uses Loop API for direct editing
  // For frequency changes: Loop's updateSubscriptionFrequency API
  // For protocol changes: cancel and redirect to shop
  const changePlan = useCallback(
    async (subscriptionId: string, plan: 'starter' | 'pro' | 'max', forceCancel: boolean = false): Promise<ChangePlanResult> => {
      setLoading(true);
      setError(null);

      try {
        const encodedId = encodeURIComponent(subscriptionId);
        const response = await fetch(`/api/auth/subscriptions/${encodedId}/change-plan`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, forceCancel }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || data.message || 'Failed to change plan');
          return { success: false, message: data.error || data.message };
        }

        // If subscription was updated successfully (frequency change)
        if (data.success && data.updatedPlan) {
          // Refresh subscriptions to get updated data
          await fetchSubscriptions();
          return { 
            success: true, 
            message: data.message,
          };
        }

        // If subscription was cancelled and we have a redirect URL
        if (data.cancelled && data.redirectUrl) {
          // Update local state to show cancelled
          setSubscriptions((prev) =>
            prev.map((sub) =>
              sub.id === subscriptionId
                ? { ...sub, status: 'cancelled' as const }
                : sub
            )
          );
          
          return { 
            success: true, 
            redirectUrl: data.redirectUrl,
            message: data.message,
          };
        }

        return { success: true, message: data.message };
      } catch (err) {
        console.error('Failed to change plan:', err);
        setError('Failed to change plan');
        return { success: false, message: 'Failed to change plan' };
      } finally {
        setLoading(false);
      }
    },
    [fetchSubscriptions]
  );

  // Update subscription frequency - uses change plan endpoint
  const updateFrequency = useCallback(
    async (subscriptionId: string, interval: SubscriptionInterval): Promise<boolean> => {
      // Map interval to plan type
      let plan: 'starter' | 'pro' | 'max' = 'pro';
      if (interval.unit === 'week' && interval.value === 1) {
        plan = 'starter';
      } else if (interval.unit === 'week' && interval.value === 2) {
        plan = 'pro';
      } else if (interval.unit === 'month') {
        plan = 'max';
      }
      
      const result = await changePlan(subscriptionId, plan, true);
      return result.success;
    },
    [changePlan]
  );

  // Update subscription quantity - uses change plan endpoint
  const updateQuantity = useCallback(
    async (subscriptionId: string, quantity: number): Promise<boolean> => {
      // Map quantity to plan type
      let plan: 'starter' | 'pro' | 'max' = 'pro';
      if (quantity <= 4) {
        plan = 'starter';
      } else if (quantity <= 12) {
        plan = 'pro';
      } else {
        plan = 'max';
      }
      
      const result = await changePlan(subscriptionId, plan, true);
      return result.success;
    },
    [changePlan]
  );

  return {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    skipNextOrder,
    changePlan,
    updateFrequency,
    updateQuantity,
  };
}
