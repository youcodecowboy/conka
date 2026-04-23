'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/app/components/navigation';
import { AccountSubNav } from '@/app/components/account/AccountSubNav';
import { NextDeliveryHero } from '@/app/components/account/NextDeliveryHero';
import { HairlineSpecStrip } from '@/app/components/account/HairlineSpecStrip';
import ConkaCTAButton from '@/app/components/landing/ConkaCTAButton';
import { ContactSupportLink } from '@/app/components/ContactSupportLink';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';
import { getSubscriptionImage } from '@/app/account/subscriptions/utils';
import { RescheduleModal } from '@/app/components/subscriptions/RescheduleModal';
import { PlaceOrderModal } from '@/app/components/subscriptions/PlaceOrderModal';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    province: string;
    zoneCode: string;
    zip: string;
    country: string;
    territoryCode: string;
  };
}

interface OrderSummary {
  id: string;
  processedAt: string;
}

const countryToCode: Record<string, string> = {
  'United Kingdom': 'GB',
  'United States': 'US',
  Canada: 'CA',
  Australia: 'AU',
  Ireland: 'IE',
};

export default function AccountPage() {
  const router = useRouter();
  const { customer, loading, isAuthenticated, logout, checkSession } = useAuth();
  const {
    subscriptions,
    fetchSubscriptions,
    loading: subsLoading,
    skipNextOrder,
    placeOrderNow,
    rescheduleSubscription,
  } = useSubscriptions();

  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState<Subscription | null>(null);
  const [showPlaceOrderModal, setShowPlaceOrderModal] = useState<Subscription | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    address: { address1: '', address2: '', city: '', province: '', zoneCode: '', zip: '', country: 'United Kingdom', territoryCode: 'GB' },
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/account/login');
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !customer) return;
    fetchSubscriptions();
    fetch('/api/auth/orders', { credentials: 'include' })
      .then((r) => r.ok ? r.json() : { orders: [] })
      .then((d) => setOrders(d.orders || []))
      .catch(() => setOrders([]));
  }, [isAuthenticated, customer, fetchSubscriptions]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const openEditProfile = () => {
    setProfileForm({
      firstName: customer?.firstName ?? '',
      lastName: customer?.lastName ?? '',
      phone: customer?.phone ?? '',
      address: {
        address1: customer?.defaultAddress?.address1 ?? '',
        address2: customer?.defaultAddress?.address2 ?? '',
        city: customer?.defaultAddress?.city ?? '',
        province: customer?.defaultAddress?.province ?? '',
        zoneCode: customer?.defaultAddress?.zoneCode ?? '',
        zip: customer?.defaultAddress?.zip ?? '',
        country: customer?.defaultAddress?.country ?? 'United Kingdom',
        territoryCode: customer?.defaultAddress?.territoryCode ?? 'GB',
      },
    });
    setProfileError(null);
    setProfileSuccess(false);
    setShowEditProfile(true);
  };

  const handleProfileChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const key = field.replace('address.', '');
      setProfileForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
          ...(key === 'country' ? { territoryCode: countryToCode[value] || value } : {}),
        },
      }));
    } else {
      setProfileForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileError(null);
    setProfileSuccess(false);
    try {
      const res = await fetch('/api/auth/customer/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        setProfileSuccess(true);
        await checkSession();
        setTimeout(() => setShowEditProfile(false), 1500);
      } else {
        const d = await res.json();
        setProfileError(d.error || 'Failed to update profile');
      }
    } catch {
      setProfileError('Failed to update profile. Please try again.');
    } finally {
      setProfileSaving(false);
    }
  };

  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active');
  const nextSub = activeSubscriptions
    .slice()
    .sort(
      (a, b) =>
        new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime()
    )[0];
  const otherActive = nextSub
    ? activeSubscriptions.filter((s) => s.id !== nextSub.id)
    : [];

  const nextDeliveryShort = nextSub
    ? new Date(nextSub.nextBillingDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : 'None';
  const memberSince =
    orders.length > 0
      ? new Date(orders[orders.length - 1].processedAt).toLocaleDateString('en-GB', {
          month: 'short',
          year: 'numeric',
        })
      : 'New';

  const greeting = customer?.firstName ? customer.firstName : 'Your account';
  const nextDeliveryLong = nextSub
    ? new Date(nextSub.nextBillingDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;
  const headerSub = [
    `${orders.length} order${orders.length !== 1 ? 's' : ''}`,
    activeSubscriptions.length > 0
      ? `${activeSubscriptions.length} active subscription${activeSubscriptions.length !== 1 ? 's' : ''}`
      : null,
    nextDeliveryLong ? `next delivery ${nextDeliveryLong}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const handleSkipNext = async () => {
    if (!nextSub) return;
    setActionLoading(nextSub.id);
    await skipNextOrder(nextSub.id);
    await fetchSubscriptions();
    setActionLoading(null);
  };

  const handleRescheduleFromModal = async (newDateEpoch: number): Promise<boolean> => {
    if (!showRescheduleModal) return false;
    setActionLoading(showRescheduleModal.id);
    const success = await rescheduleSubscription(showRescheduleModal.id, newDateEpoch);
    if (success) await fetchSubscriptions();
    setActionLoading(null);
    return success;
  };

  const handlePlaceOrderFromModal = async (): Promise<boolean> => {
    if (!showPlaceOrderModal) return false;
    setActionLoading(showPlaceOrderModal.id);
    const success = await placeOrderNow(showPlaceOrderModal.id);
    if (success) await fetchSubscriptions();
    setActionLoading(null);
    return success;
  };

  if (loading) {
    return (
      <div className="brand-clinical min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border border-black/15 border-t-black/50 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-black/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !customer) return null;

  return (
    <div className="brand-clinical min-h-screen bg-white text-black">
      <Navigation />
      <AccountSubNav />

      <main className="pt-3 pb-24 lg:pt-4">
        <section
          className="brand-section brand-bg-white"
          aria-labelledby="overview-heading"
        >
          <div className="brand-track">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
                  Account · Overview
                </p>
                <h1
                  id="overview-heading"
                  className="text-3xl lg:text-4xl font-semibold text-black mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {greeting}
                </h1>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
                  {headerSub}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-black/12 hover:border-black/40 text-black font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 transition-colors min-h-[44px]"
              >
                Sign out
              </button>
            </div>

            {/* Spec strip */}
            <div className="mb-8">
              <HairlineSpecStrip
                items={[
                  { label: 'Active subs', value: activeSubscriptions.length },
                  { label: 'Next delivery', value: nextDeliveryShort },
                  { label: 'Orders placed', value: orders.length },
                  { label: 'Member since', value: memberSince },
                ]}
              />
            </div>

            {/* Hero */}
            <div className="mb-8">
              {subsLoading && subscriptions.length === 0 ? (
                <div className="bg-white border border-black/12 h-[360px] flex items-center justify-center">
                  <div className="w-8 h-8 border border-black/15 border-t-black/50 rounded-full animate-spin" />
                </div>
              ) : nextSub ? (
                <NextDeliveryHero
                  subscription={nextSub}
                  onSkipNext={handleSkipNext}
                  onReschedule={() => setShowRescheduleModal(nextSub)}
                  onPlaceOrder={() => setShowPlaceOrderModal(nextSub)}
                  isActionLoading={actionLoading === nextSub.id}
                />
              ) : (
                <EmptyHeroCard />
              )}
            </div>

            {/* Other active subscriptions */}
            {otherActive.length > 0 && (
              <div className="mb-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-3">
                  Other subscriptions · {otherActive.length}
                </p>
                <div className="bg-white border border-black/12">
                  {otherActive.map((sub, idx) => {
                    const img = getSubscriptionImage(sub);
                    const date = new Date(sub.nextBillingDate).toLocaleDateString(
                      'en-GB',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    );
                    const label =
                      sub.isMultiLine && sub.lines?.length
                        ? sub.lines.map((l) => l.productTitle).join(' + ')
                        : sub.product.title;
                    return (
                      <Link
                        key={sub.id}
                        href="/account/subscriptions"
                        className={`flex items-center gap-4 p-4 hover:bg-black/[0.02] transition-colors ${
                          idx < otherActive.length - 1 ? 'border-b border-black/8' : ''
                        }`}
                      >
                        {img ? (
                          <span className="relative w-12 h-12 shrink-0 overflow-hidden bg-[#f5f5f5]">
                            <Image
                              src={img}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </span>
                        ) : null}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-black truncate">
                            {label}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55 tabular-nums mt-0.5">
                            Next · {date}
                          </p>
                        </div>
                        <span
                          className="text-black/40 font-mono shrink-0"
                          aria-hidden
                        >
                          →
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Your details (compact) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
                  Your details
                </p>
                <button
                  type="button"
                  onClick={openEditProfile}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1B2757] hover:underline min-h-[44px] px-2"
                >
                  Edit
                </button>
              </div>
              <div className="bg-white border border-black/12 p-5 lg:p-6 grid gap-4 sm:grid-cols-2 text-sm">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Name
                  </p>
                  <p className="font-medium text-black">
                    {[customer.firstName, customer.lastName].filter(Boolean).join(' ') ||
                      customer.displayName ||
                      'Not set'}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Email
                  </p>
                  <p className="font-medium text-black truncate">{customer.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Delivery address
                  </p>
                  <p className="font-medium text-black">
                    {customer.defaultAddress?.address1
                      ? [
                          customer.defaultAddress.address1,
                          customer.defaultAddress.city,
                        ]
                          .filter(Boolean)
                          .join(', ')
                      : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Help card */}
            <div className="bg-white border border-black/12 p-5 lg:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
                Need a hand
              </p>
              <h3
                className="text-xl lg:text-2xl font-semibold text-black mb-2"
                style={{ letterSpacing: '-0.02em' }}
              >
                We can help with any subscription question.
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-6">
                Support · same day reply · UK team
              </p>
              <ContactSupportLink
                variant="inline"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#1B2757]"
                icon={false}
              >
                Email support ↗
              </ContactSupportLink>
            </div>
          </div>
        </section>
      </main>

      {/* Reschedule + place order modals */}
      <RescheduleModal
        isOpen={!!showRescheduleModal}
        onClose={() => setShowRescheduleModal(null)}
        onReschedule={handleRescheduleFromModal}
        subscriptionName={showRescheduleModal?.product.title || 'Subscription'}
        currentNextBillingDate={showRescheduleModal?.nextBillingDate}
        hasUnfulfilledOrder={showRescheduleModal?.hasUnfulfilledOrder}
        interval={showRescheduleModal?.interval}
      />

      <PlaceOrderModal
        isOpen={!!showPlaceOrderModal}
        onClose={() => setShowPlaceOrderModal(null)}
        onPlaceOrder={handlePlaceOrderFromModal}
        subscriptionName={showPlaceOrderModal?.product.title || 'Subscription'}
      />

      {/* Edit profile modal (kept inline; will move to /account/details in Phase 3) */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowEditProfile(false)}
            aria-hidden
          />
          <div className="relative bg-white border border-black/12 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
              <h3
                className="font-semibold text-black"
                style={{ letterSpacing: '-0.02em' }}
              >
                Edit profile
              </h3>
              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="p-2 hover:bg-[#f5f5f5] transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {profileSuccess && (
                <div className="mb-4 p-3 border border-black/12 bg-[#f5f5f5] text-black text-sm">
                  Profile updated.
                </div>
              )}
              {profileError && (
                <div className="mb-4 p-3 border border-red-200 bg-red-50/50 text-red-700 text-sm">
                  {profileError}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    value={profileForm.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={profileForm.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customer?.email ?? ''}
                    readOnly
                    className="w-full px-3 py-2 border border-black/12 bg-[#f5f5f5] text-black/50 text-sm cursor-not-allowed"
                  />
                  <p className="text-xs text-black/50 mt-1">
                    Email is managed by Shopify and cannot be changed here.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                    placeholder="Optional"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Address line 1
                  </label>
                  <input
                    type="text"
                    value={profileForm.address.address1}
                    onChange={(e) => handleProfileChange('address.address1', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Address line 2
                  </label>
                  <input
                    type="text"
                    value={profileForm.address.address2}
                    onChange={(e) => handleProfileChange('address.address2', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={profileForm.address.city}
                    onChange={(e) => handleProfileChange('address.city', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    value={profileForm.address.zip}
                    onChange={(e) => handleProfileChange('address.zip', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">
                    Country
                  </label>
                  <select
                    value={profileForm.address.country}
                    onChange={(e) => handleProfileChange('address.country', e.target.value)}
                    className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-black/8 flex gap-2">
              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-2.5 text-sm font-semibold border border-black/12 hover:border-black/40 text-black transition-colors min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={profileSaving}
                className="flex-1 py-2.5 text-sm font-semibold bg-[#1B2757] text-white hover:opacity-90 disabled:opacity-50 transition-opacity min-h-[44px]"
              >
                {profileSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyHeroCard() {
  return (
    <div className="bg-white border border-black/12 p-6 lg:p-10 flex flex-col items-start gap-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
        No active subscription
      </p>
      <h2
        className="text-2xl lg:text-3xl font-semibold text-black"
        style={{ letterSpacing: '-0.02em' }}
      >
        Start a protocol to see your next delivery here.
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
        100-day guarantee · Free UK shipping · Cancel anytime
      </p>
      <ConkaCTAButton href="/funnel" meta="// start your protocol">
        Start now
      </ConkaCTAButton>
    </div>
  );
}
