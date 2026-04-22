'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';
import { getSubscriptionImage } from '@/app/account/subscriptions/utils';

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

export default function AccountPage() {
  const router = useRouter();
  const { customer, loading, isAuthenticated, logout, checkSession } = useAuth();
  const { subscriptions, fetchSubscriptions, loading: subsLoading } = useSubscriptions();
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
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
      .then((d) => setOrderCount(d.orders?.length ?? 0))
      .catch(() => setOrderCount(0));
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

  const countryToCode: Record<string, string> = {
    'United Kingdom': 'GB', 'United States': 'US', 'Canada': 'CA', 'Australia': 'AU', 'Ireland': 'IE',
  };

  const handleProfileChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const key = field.replace('address.', '');
      setProfileForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
          // Keep territoryCode in sync when country changes
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
        setTimeout(() => { setShowEditProfile(false); }, 1500);
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

  const activeSubscriptions = subscriptions.filter((s: Subscription) => s.status === 'active');
  const nextDelivery = (() => {
    if (!activeSubscriptions.length) return null;
    const dates = activeSubscriptions
      .map((s) => new Date(s.nextBillingDate))
      .filter((d) => !isNaN(d.getTime()));
    if (!dates.length) return null;
    return new Date(Math.min(...dates.map((d) => d.getTime()))).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  })();

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

      <main className="pt-8 pb-16 px-4 lg:pt-10 lg:px-[5vw]">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                Account
              </p>
              <h1 className="text-2xl font-semibold text-black" style={{ letterSpacing: '-0.02em' }}>
                {customer.firstName ? customer.firstName : 'Your account'}
              </h1>
              <p className="text-sm text-black/60 mt-0.5 tabular-nums">
                {orderCount !== null && `${orderCount} order${orderCount !== 1 ? 's' : ''}`}
                {orderCount !== null && activeSubscriptions.length > 0 && ' · '}
                {activeSubscriptions.length > 0 && `${activeSubscriptions.length} active subscription${activeSubscriptions.length !== 1 ? 's' : ''}`}
                {nextDelivery && ` · Next delivery ${nextDelivery}`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-black/12 hover:border-black/40 text-black font-mono text-[10px] uppercase tracking-[0.16em] px-4 py-2 transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* What you can do */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
            What you can do
          </p>
          <p className="text-sm text-black/60 mb-4">
            View orders and manage subscriptions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/account/orders"
              className="flex flex-col bg-white border border-black/12 hover:border-black/40 overflow-hidden transition-colors group"
            >
              <span className="flex h-36 w-full shrink-0 overflow-hidden border-b border-black/8">
                <img
                  src="/lifestyle/HoldingBottle.jpg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </span>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-black" style={{ letterSpacing: '-0.02em' }}>Orders</span>
                  <p className="text-sm text-black/60">View history & track</p>
                </div>
                <span className="shrink-0 text-black/40 group-hover:text-black transition-colors">→</span>
              </div>
            </Link>

            <Link
              href="/account/subscriptions"
              className="flex flex-col bg-white border border-black/12 hover:border-black/40 overflow-hidden transition-colors group"
            >
              {activeSubscriptions.length > 0 && getSubscriptionImage(activeSubscriptions[0]) ? (
                <span className="flex h-36 w-full shrink-0 overflow-hidden border-b border-black/8">
                  <img
                    src={getSubscriptionImage(activeSubscriptions[0])}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : (
                <span className="flex h-36 w-full items-center justify-center bg-[#f5f5f5] text-black/30 border-b border-black/8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="opacity-60">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                </span>
              )}
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-black" style={{ letterSpacing: '-0.02em' }}>Subscriptions</span>
                  <p className="text-sm text-black/60">
                    {subsLoading ? '…' : `${activeSubscriptions.length} active`}
                  </p>
                </div>
                <span className="shrink-0 text-black/40 group-hover:text-black transition-colors">→</span>
              </div>
            </Link>

          </div>

          {/* Subscriptions strip (only if any) */}
          {!subsLoading && activeSubscriptions.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1B2757] text-white p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                {activeSubscriptions.slice(0, 3).map((s: Subscription) => {
                  const img = getSubscriptionImage(s);
                  return img ? (
                    <span key={s.id} className="flex h-10 w-10 shrink-0 overflow-hidden border border-white/20">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </span>
                  ) : null;
                })}
                <p className="text-sm tabular-nums">
                  {activeSubscriptions.length} active subscription{activeSubscriptions.length !== 1 ? 's' : ''}
                  {' — '}
                  {activeSubscriptions.slice(0, 2)
                    .map((s: Subscription) =>
                      s.isMultiLine && s.lines?.length
                        ? `${s.lines.length} products · ${s.lines.map((l) => l.productTitle).join(' + ')}`
                        : s.product.title
                    )
                    .join(', ')}
                  {activeSubscriptions.length > 2 ? ` +${activeSubscriptions.length - 2} more` : ''}
                </p>
              </div>
              <Link
                href="/account/subscriptions"
                className="text-sm font-semibold underline hover:no-underline"
              >
                Manage →
              </Link>
            </div>
          )}

          {/* Your details */}
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
            Your details
          </p>
          <p className="text-sm text-black/60 mb-4">
            Update your name, email, and delivery address.
          </p>
          <div className="bg-white border border-black/12 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-black" style={{ letterSpacing: '-0.02em' }}>Contact & address</h3>
              <button
                type="button"
                onClick={openEditProfile}
                className="text-sm font-semibold text-black underline hover:no-underline"
              >
                Edit
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Name</p>
                <p className="font-medium text-black">
                  {[customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.displayName || '—'}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Email</p>
                <p className="font-medium text-black">{customer.email}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Delivery address</p>
                <p className="font-medium text-black">
                  {customer.defaultAddress?.address1
                    ? [customer.defaultAddress.address1, customer.defaultAddress.city].filter(Boolean).join(', ')
                    : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit profile modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowEditProfile(false)} aria-hidden />
          <div className="relative bg-white border border-black/12 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/8">
              <h3 className="font-semibold text-black" style={{ letterSpacing: '-0.02em' }}>Edit profile</h3>
              <button type="button" onClick={() => setShowEditProfile(false)} className="p-2 hover:bg-[#f5f5f5] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {profileSuccess && (
                <div className="mb-4 p-3 border border-black/12 bg-[#f5f5f5] text-black text-sm">Profile updated.</div>
              )}
              {profileError && (
                <div className="mb-4 p-3 border border-red-200 bg-red-50/50 text-red-700 text-sm">{profileError}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">First name</label>
                  <input type="text" value={profileForm.firstName} onChange={(e) => handleProfileChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Last name</label>
                  <input type="text" value={profileForm.lastName} onChange={(e) => handleProfileChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Email</label>
                  <input type="email" value={customer?.email ?? ''} readOnly className="w-full px-3 py-2 border border-black/12 bg-[#f5f5f5] text-black/50 text-sm cursor-not-allowed" />
                  <p className="text-xs text-black/50 mt-1">Email is managed by Shopify and cannot be changed here.</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Phone</label>
                  <input type="tel" value={profileForm.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" placeholder="Optional" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Address line 1</label>
                  <input type="text" value={profileForm.address.address1} onChange={(e) => handleProfileChange('address.address1', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Address line 2</label>
                  <input type="text" value={profileForm.address.address2} onChange={(e) => handleProfileChange('address.address2', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" placeholder="Optional" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">City</label>
                  <input type="text" value={profileForm.address.city} onChange={(e) => handleProfileChange('address.city', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Postcode</label>
                  <input type="text" value={profileForm.address.zip} onChange={(e) => handleProfileChange('address.zip', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-1">Country</label>
                  <select value={profileForm.address.country} onChange={(e) => handleProfileChange('address.country', e.target.value)} className="w-full px-3 py-2 border border-black/12 bg-white text-black text-sm focus:outline-none focus:border-[#1B2757]">
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
              <button type="button" onClick={() => setShowEditProfile(false)} className="flex-1 py-2.5 text-sm font-semibold border border-black/12 hover:border-black/40 text-black transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleSaveProfile} disabled={profileSaving} className="flex-1 py-2.5 text-sm font-semibold bg-[#1B2757] text-white hover:opacity-90 disabled:opacity-50 transition-opacity">
                {profileSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
