'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { customer, isAuthenticated, loading: authLoading } = useAuth();
  const {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    skipNextOrder,
  } = useSubscriptions();

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch subscriptions when customer is available
  useEffect(() => {
    if (customer?.email) {
      fetchSubscriptions(customer.email);
    }
  }, [customer?.email, fetchSubscriptions]);

  // Format price
  const formatPrice = (amount: string, currencyCode: string = 'GBP') => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format interval
  const formatInterval = (interval: Subscription['interval']) => {
    const unit = interval.value === 1 ? interval.unit : `${interval.unit}s`;
    return `Every ${interval.value} ${unit}`;
  };

  // Get status badge color
  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle pause/resume
  const handleTogglePause = async (subscription: Subscription) => {
    setActionLoading(subscription.id);
    if (subscription.status === 'paused') {
      await resumeSubscription(subscription.id);
    } else {
      await pauseSubscription(subscription.id);
    }
    // Refresh subscriptions
    if (customer?.email) {
      await fetchSubscriptions(customer.email);
    }
    setActionLoading(null);
  };

  // Handle skip
  const handleSkip = async (subscriptionId: string) => {
    setActionLoading(subscriptionId);
    const success = await skipNextOrder(subscriptionId);
    if (success) {
      // Refresh subscriptions
      if (customer?.email) {
        await fetchSubscriptions(customer.email);
      }
    }
    setActionLoading(null);
  };

  // Handle cancel
  const handleCancel = async (subscriptionId: string) => {
    setActionLoading(subscriptionId);
    const success = await cancelSubscription(subscriptionId, cancelReason);
    if (success) {
      setShowCancelModal(null);
      setCancelReason('');
      // Refresh subscriptions
      if (customer?.email) {
        await fetchSubscriptions(customer.email);
      }
    }
    setActionLoading(null);
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div
        className="min-h-screen theme-conka-flow flex items-center justify-center"
        style={{ background: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-current/20 border-t-current rounded-full animate-spin mx-auto mb-4" />
          <p className="font-clinical text-sm opacity-50">
            Loading subscriptions...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-8 pb-24 lg:pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/account"
              className="p-2 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">Subscriptions</h1>
          </div>

          {/* Error State */}
          {error && (
            <div className="neo-box p-6 text-center mb-6">
              <p className="text-red-600 font-clinical">{error}</p>
            </div>
          )}

          {/* Subscriptions List */}
          {subscriptions.length === 0 ? (
            <div className="neo-box p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 opacity-30"
              >
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              <h2 className="font-bold text-xl mb-2">No active subscriptions</h2>
              <p className="font-clinical text-sm opacity-70 mb-6">
                Subscribe to your favorite protocols for automatic deliveries
              </p>
              <Link
                href="/protocol/1"
                className="neo-button px-8 py-3 font-bold inline-block"
              >
                Browse Protocols
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="neo-box p-6">
                  {/* Subscription Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      {subscription.product.image && (
                        <div className="w-16 h-16 rounded-lg bg-current/5 flex-shrink-0 overflow-hidden">
                          <img
                            src={subscription.product.image}
                            alt={subscription.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg">
                          {subscription.product.title}
                        </h3>
                        {subscription.product.variantTitle && (
                          <p className="font-clinical text-sm opacity-70">
                            {subscription.product.variantTitle}
                          </p>
                        )}
                        <p className="font-clinical text-sm mt-1">
                          {formatInterval(subscription.interval)} •{' '}
                          {formatPrice(
                            subscription.price.amount,
                            subscription.price.currencyCode
                          )}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold self-start ${getStatusColor(
                        subscription.status
                      )}`}
                    >
                      {subscription.status.charAt(0).toUpperCase() +
                        subscription.status.slice(1)}
                    </span>
                  </div>

                  {/* Next Billing Date */}
                  {subscription.status === 'active' && (
                    <div className="bg-current/5 rounded-lg p-4 mb-4">
                      <p className="font-clinical text-sm">
                        <span className="opacity-70">Next delivery:</span>{' '}
                        <span className="font-bold">
                          {formatDate(subscription.nextBillingDate)}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {subscription.status !== 'cancelled' &&
                    subscription.status !== 'expired' && (
                      <div className="flex flex-wrap gap-3">
                        {/* Skip Button */}
                        {subscription.status === 'active' && (
                          <button
                            onClick={() => handleSkip(subscription.id)}
                            disabled={actionLoading === subscription.id}
                            className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50"
                          >
                            {actionLoading === subscription.id ? (
                              <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                                Skipping...
                              </span>
                            ) : (
                              'Skip Next Order'
                            )}
                          </button>
                        )}

                        {/* Pause/Resume Button */}
                        <button
                          onClick={() => handleTogglePause(subscription)}
                          disabled={actionLoading === subscription.id}
                          className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50"
                        >
                          {actionLoading === subscription.id ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                              Processing...
                            </span>
                          ) : subscription.status === 'paused' ? (
                            'Resume'
                          ) : (
                            'Pause'
                          )}
                        </button>

                        {/* Cancel Button */}
                        <button
                          onClick={() => setShowCancelModal(subscription.id)}
                          className="text-red-600 hover:text-red-800 px-4 py-2 text-sm font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCancelModal(null)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="font-bold text-xl mb-4">Cancel Subscription?</h3>
            <p className="font-clinical text-sm opacity-70 mb-4">
              Are you sure you want to cancel this subscription? You can always
              resubscribe later.
            </p>

            {/* Optional Reason */}
            <div className="mb-6">
              <label className="block font-clinical text-sm mb-2">
                Reason (optional)
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-clinical text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Tell us why you're cancelling..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(null);
                  setCancelReason('');
                }}
                className="flex-1 neo-button-outline py-3 font-semibold"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => handleCancel(showCancelModal)}
                disabled={actionLoading === showCancelModal}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {actionLoading === showCancelModal ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Cancelling...
                  </span>
                ) : (
                  'Yes, Cancel'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

