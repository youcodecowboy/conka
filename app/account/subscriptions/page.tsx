'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';
import { CancellationModal } from '@/app/components/subscriptions/CancellationModal';
import type { SubscriptionInterval } from '@/app/types';

// Subscription tier options - each tier has a fixed package size AND delivery frequency
type SubscriptionTier = 'starter' | 'pro' | 'max';
interface TierOption {
  tier: SubscriptionTier;
  label: string;
  packSize: string;
  frequency: string;
  description: string;
  interval: SubscriptionInterval;
  quantity: number;
}

const TIER_OPTIONS: TierOption[] = [
  { 
    tier: 'starter', 
    label: 'Starter', 
    packSize: '4-pack', 
    frequency: 'Weekly',
    description: 'Gentle introduction for newcomers',
    interval: { value: 1, unit: 'week' },
    quantity: 4,
  },
  { 
    tier: 'pro', 
    label: 'Pro', 
    packSize: '12-pack', 
    frequency: 'Bi-weekly',
    description: 'Balanced protocol for consistent results',
    interval: { value: 2, unit: 'week' },
    quantity: 12,
  },
  { 
    tier: 'max', 
    label: 'Max', 
    packSize: '28-pack', 
    frequency: 'Monthly',
    description: 'Full month coverage for maximum effect',
    interval: { value: 1, unit: 'month' },
    quantity: 28,
  },
];

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
    changePlan,
  } = useSubscriptions();

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<Subscription | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('starter');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch subscriptions when customer is available
  useEffect(() => {
    if (customer) {
      fetchSubscriptions();
    }
  }, [customer, fetchSubscriptions]);

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

  // Get interval key for comparison
  const getIntervalKey = (interval: SubscriptionInterval) => 
    `${interval.value}-${interval.unit}`;

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
    await fetchSubscriptions();
    setActionLoading(null);
  };

  // Handle skip
  const handleSkip = async (subscriptionId: string) => {
    setActionLoading(subscriptionId);
    const success = await skipNextOrder(subscriptionId);
    if (success) {
      // Refresh subscriptions
      await fetchSubscriptions();
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
      await fetchSubscriptions();
    }
    setActionLoading(null);
  };

  // Determine current tier from quantity
  const getTierFromQuantity = (quantity: number): SubscriptionTier => {
    if (quantity >= 28) return 'max';
    if (quantity >= 12) return 'pro';
    return 'starter';
  };

  // Get tier option by tier name
  const getTierOption = (tier: SubscriptionTier): TierOption => {
    return TIER_OPTIONS.find(t => t.tier === tier) || TIER_OPTIONS[0];
  };

  // Open edit modal
  const openEditModal = (subscription: Subscription) => {
    setShowEditModal(subscription);
    setSelectedTier(getTierFromQuantity(subscription.quantity));
  };

  // Handle save edit - directly updates frequency via Loop API
  const handleSaveEdit = async () => {
    if (!showEditModal) return;
    
    // Check if tier actually changed
    const currentTier = getTierFromQuantity(showEditModal.quantity);
    if (selectedTier !== currentTier) {
      setActionLoading(showEditModal.id);
      
      const result = await changePlan(showEditModal.id, selectedTier);
      
      if (result.success) {
        setShowEditModal(null);
        // Show success message (subscription list will refresh automatically)
      }
      
      setActionLoading(null);
    } else {
      // No change needed
      setShowEditModal(null);
    }
  };

  // Handle change plan from cancellation modal
  const handleChangePlanFromModal = async (plan: 'starter' | 'pro' | 'max'): Promise<boolean> => {
    if (!showCancelModal) return false;
    const subscription = subscriptions.find(s => s.id === showCancelModal);
    if (!subscription) return false;
    
    const result = await changePlan(subscription.id, plan, true); // cancelAndRedirect
    if (result.success) {
      if (result.redirectUrl) {
        router.push(result.redirectUrl);
      } else {
        await fetchSubscriptions();
      }
    }
    return result.success;
  };

  // Handle cancel from modal
  const handleCancelFromModal = async (reason: string, comment?: string): Promise<boolean> => {
    if (!showCancelModal) return false;
    const success = await cancelSubscription(showCancelModal, reason);
    if (success) {
      await fetchSubscriptions();
    }
    return success;
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

  // Separate active/paused from cancelled/expired
  // Now using Shopify's native API which returns accurate data
  const activeSubscriptions = subscriptions.filter(
    s => s.status === 'active' || s.status === 'paused'
  );
  const inactiveSubscriptions = subscriptions.filter(
    s => s.status === 'cancelled' || s.status === 'expired'
  );

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-24 pb-24 lg:pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
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
            <div>
              <p className="font-commentary text-lg opacity-70">manage your</p>
              <h1 className="text-3xl font-bold">Subscriptions</h1>
            </div>
          </div>

          {/* Summary Stats */}
          {subscriptions.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-green-600">
                  {activeSubscriptions.filter(s => s.status === 'active').length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">Active</p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-yellow-600">
                  {activeSubscriptions.filter(s => s.status === 'paused').length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">Paused</p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold opacity-50">
                  {inactiveSubscriptions.length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">Past</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="neo-box p-6 text-center mb-6 border-red-200 bg-red-50">
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
                Subscribe to your favorite protocols for automatic deliveries and save money
              </p>
              <Link
                href="/quiz"
                className="neo-button px-8 py-3 font-bold inline-flex items-center gap-2"
              >
                Find Your Protocol
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Subscriptions */}
              {activeSubscriptions.length > 0 && (
                <div>
                  <h2 className="font-clinical text-xs uppercase opacity-50 mb-4">
                    Active & Paused Subscriptions
                  </h2>
                  <div className="space-y-4">
                    {activeSubscriptions.map((subscription) => (
                      <div key={subscription.id} className="neo-box overflow-hidden">
                        {/* Subscription Header */}
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                            <div className="flex gap-4">
                              {/* Product Image */}
                              {subscription.product.image ? (
                                <div className="w-20 h-20 rounded-lg bg-current/5 flex-shrink-0 overflow-hidden">
                                  <img
                                    src={subscription.product.image}
                                    alt={subscription.product.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex-shrink-0 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                                  </svg>
                                </div>
                              )}
                              <div>
                                <h3 className="font-bold text-lg mb-1">
                                  {subscription.product.title}
                                </h3>
                                {subscription.product.variantTitle && (
                                  <p className="font-clinical text-sm opacity-70 mb-1">
                                    {subscription.product.variantTitle}
                                  </p>
                                )}
                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                  <span className="font-clinical">
                                    {formatInterval(subscription.interval)}
                                  </span>
                                  <span className="opacity-30">•</span>
                                  <span className="font-bold">
                                    {formatPrice(
                                      subscription.price.amount,
                                      subscription.price.currencyCode
                                    )}
                                  </span>
                                  <span className="opacity-30">•</span>
                                  <span className="font-clinical opacity-70">
                                    Qty: {subscription.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1.5 rounded-full text-xs font-bold self-start ${getStatusColor(
                                subscription.status
                              )}`}
                            >
                              {subscription.status.charAt(0).toUpperCase() +
                                subscription.status.slice(1)}
                            </span>
                          </div>

                          {/* Next Billing Date */}
                          {subscription.status === 'active' && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                  <line x1="16" y1="2" x2="16" y2="6"/>
                                  <line x1="8" y1="2" x2="8" y2="6"/>
                                  <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                <div>
                                  <p className="font-clinical text-sm text-green-800">
                                    <span className="opacity-70">Next delivery:</span>{' '}
                                    <span className="font-bold">
                                      {formatDate(subscription.nextBillingDate)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {subscription.status === 'paused' && (
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                              <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="10" y1="15" x2="10" y2="9"/>
                                  <line x1="14" y1="15" x2="14" y2="9"/>
                                </svg>
                                <p className="font-clinical text-sm text-yellow-800">
                                  This subscription is paused. Resume to continue deliveries.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            {/* Edit Button */}
                            <button
                              onClick={() => openEditModal(subscription)}
                              className="neo-button-outline px-4 py-2 text-sm font-semibold flex items-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Edit
                            </button>

                            {/* Skip Button */}
                            {subscription.status === 'active' && (
                              <button
                                onClick={() => handleSkip(subscription.id)}
                                disabled={actionLoading === subscription.id}
                                className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
                              >
                                {actionLoading === subscription.id ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                                    Skipping...
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polygon points="5 4 15 12 5 20 5 4"/>
                                      <line x1="19" y1="5" x2="19" y2="19"/>
                                    </svg>
                                    Skip Next
                                  </>
                                )}
                              </button>
                            )}

                            {/* Pause/Resume Button */}
                            <button
                              onClick={() => handleTogglePause(subscription)}
                              disabled={actionLoading === subscription.id}
                              className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
                            >
                              {actionLoading === subscription.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                                  Processing...
                                </>
                              ) : subscription.status === 'paused' ? (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"/>
                                  </svg>
                                  Resume
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="4" width="4" height="16"/>
                                    <rect x="14" y="4" width="4" height="16"/>
                                  </svg>
                                  Pause
                                </>
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Subscriptions */}
              {inactiveSubscriptions.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-clinical text-xs uppercase opacity-50 mb-4">
                    Past Subscriptions
                  </h2>
                  <div className="space-y-3">
                    {inactiveSubscriptions.map((subscription) => (
                      <div key={subscription.id} className="neo-box p-4 opacity-60">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-current/5 flex-shrink-0 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                              </svg>
                            </div>
                            <div>
                              <p className="font-bold text-sm">{subscription.product.title}</p>
                              <p className="font-clinical text-xs opacity-70">
                                {formatInterval(subscription.interval)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                              subscription.status
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 neo-box p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="font-clinical text-sm opacity-70 mb-4">
              Our team is here to help with any subscription questions
            </p>
            <a
              href="mailto:support@conka.com"
              className="neo-button-outline px-6 py-2 font-semibold text-sm inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact Support
            </a>
          </div>
        </div>
      </main>

      {/* Edit Subscription Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowEditModal(null)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="font-bold text-xl mb-2">Change Delivery Frequency</h3>
            <p className="font-clinical text-sm opacity-70 mb-4">
              {showEditModal.product.title}
            </p>

            {/* Info notice */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-6">
              <p className="font-clinical text-xs text-green-800">
                <strong>Good news!</strong> You can change your delivery frequency instantly. Your next delivery date will be updated automatically.
              </p>
            </div>

            {/* Subscription Tier Selection */}
            <div className="mb-6">
              <label className="block font-clinical text-sm mb-3 font-semibold">
                Choose Your Delivery Schedule
              </label>
              <div className="space-y-3">
                {TIER_OPTIONS.map((option) => {
                  const isSelected = selectedTier === option.tier;
                  const isCurrent = showEditModal && getTierFromQuantity(showEditModal.quantity) === option.tier;
                  
                  return (
                    <button
                      key={option.tier}
                      onClick={() => setSelectedTier(option.tier)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{option.label}</span>
                          {isCurrent && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/20' : 'bg-green-100 text-green-700'
                            }`}>
                              Current
                            </span>
                          )}
                        </div>
                        <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                          {option.packSize}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`font-clinical text-sm ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                          {option.description}
                        </span>
                        <span className={`font-clinical text-sm ${isSelected ? 'text-amber-300' : 'text-amber-600'}`}>
                          {option.frequency} delivery
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(null)}
                className="flex-1 neo-button-outline py-3 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={getTierFromQuantity(showEditModal.quantity) === selectedTier || actionLoading === showEditModal.id}
                className="flex-1 neo-button py-3 font-semibold disabled:opacity-50"
              >
                {actionLoading === showEditModal.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal with Retention Flow */}
      <CancellationModal
        isOpen={!!showCancelModal}
        onClose={() => {
          setShowCancelModal(null);
          setCancelReason('');
        }}
        onCancel={handleCancelFromModal}
        onChangePlan={handleChangePlanFromModal}
        subscriptionName={
          subscriptions.find(s => s.id === showCancelModal)?.product.title || 'Subscription'
        }
        currentPlan={
          showCancelModal
            ? getTierFromQuantity(
                subscriptions.find(s => s.id === showCancelModal)?.quantity || 12
              )
            : undefined
        }
      />
    </div>
  );
}
