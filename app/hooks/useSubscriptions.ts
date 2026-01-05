'use client';

import { useState, useCallback } from 'react';

export interface Subscription {
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

interface UseSubscriptionsReturn {
  subscriptions: Subscription[];
  loading: boolean;
  error: string | null;
  fetchSubscriptions: (email: string) => Promise<void>;
  pauseSubscription: (subscriptionId: string) => Promise<boolean>;
  resumeSubscription: (subscriptionId: string) => Promise<boolean>;
  cancelSubscription: (subscriptionId: string, reason?: string) => Promise<boolean>;
  skipNextOrder: (subscriptionId: string) => Promise<boolean>;
}

export function useSubscriptions(): UseSubscriptionsReturn {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscriptions by email
  const fetchSubscriptions = useCallback(async (email: string): Promise<void> => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/subscriptions?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to fetch subscriptions');
        setSubscriptions([]);
      } else {
        setSubscriptions(data.subscriptions || []);
      }
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err);
      setError('Failed to fetch subscriptions');
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pause subscription
  const pauseSubscription = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'pause' }),
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

  // Resume subscription
  const resumeSubscription = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'resume' }),
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

  // Cancel subscription
  const cancelSubscription = useCallback(
    async (subscriptionId: string, reason?: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cancel', reason }),
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

  // Skip next order
  const skipNextOrder = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/subscriptions/${subscriptionId}/skip`,
          {
            method: 'POST',
          }
        );

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

  return {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    skipNextOrder,
  };
}

