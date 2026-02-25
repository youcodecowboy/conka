'use client';

import { useState, useCallback, useEffect } from 'react';
import type { PaymentMethod } from '@/app/types/paymentMethod';

interface TriggerUpdateResult {
  success: boolean;
  message: string;
}

interface UsePaymentMethodsReturn {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  /** First 'safe' payment method, or first method if none safe (e.g. show expired with warning). */
  primaryMethod: PaymentMethod | null;
  triggerUpdateEmail: (paymentMethodId: number) => Promise<TriggerUpdateResult>;
  /** After a successful trigger, disable button until this time (ms). */
  cooldownUntil: number;
  /** Inline message to show after trigger (success or error). */
  updateMessage: string | null;
  /** True while trigger request is in flight. */
  updateLoading: boolean;
  refetch: () => Promise<void>;
}

export function usePaymentMethods(enabled: boolean = true): UsePaymentMethodsReturn {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState(0);

  const fetchPaymentMethods = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/subscriptions/payment-methods', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to fetch payment methods');
        setPaymentMethods([]);
        return;
      }
      setPaymentMethods(data.paymentMethods ?? []);
    } catch (err) {
      console.error('Failed to fetch payment methods:', err);
      setError('Failed to fetch payment methods');
      setPaymentMethods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchPaymentMethods();
    }
  }, [enabled, fetchPaymentMethods]);

  const triggerUpdateEmail = useCallback(async (paymentMethodId: number): Promise<TriggerUpdateResult> => {
    setUpdateMessage(null);
    setUpdateLoading(true);
    try {
      const res = await fetch(
        `/api/auth/subscriptions/payment-methods/${paymentMethodId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const data = await res.json();
      const success = res.ok && !!data.success;
      const message =
        data.message ??
        (data.error ?? 'Something went wrong. Please contact support at support@conka.io.');
      setUpdateMessage(message);
      if (success) {
        setCooldownUntil(Date.now() + 30_000);
        setTimeout(() => setUpdateMessage(null), 8000);
      }
      return { success, message };
    } catch (err) {
      console.error('Failed to trigger payment method update:', err);
      const message = 'Something went wrong. Please contact support at support@conka.io.';
      setUpdateMessage(message);
      return { success: false, message };
    } finally {
      setUpdateLoading(false);
    }
  }, []);

  const primaryMethod =
    paymentMethods.find((m) => m.status === 'safe') ?? paymentMethods[0] ?? null;

  return {
    paymentMethods,
    loading,
    error,
    primaryMethod,
    triggerUpdateEmail,
    cooldownUntil,
    updateMessage,
    updateLoading,
    refetch: fetchPaymentMethods,
  };
}
