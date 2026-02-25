'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';
import { getProtocolFromSubscription } from '@/app/account/subscriptions/utils';
import { getProtocolImage } from '@/app/lib/productImageConfig';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    province: string;
    zip: string;
    country: string;
  };
}

export default function AccountPage() {
  const router = useRouter();
  const { customer, loading, isAuthenticated, logout } = useAuth();
  const { subscriptions, fetchSubscriptions, loading: subsLoading } = useSubscriptions();
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: { address1: '', address2: '', city: '', province: '', zip: '', country: 'United Kingdom' },
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
      email: customer?.email ?? '',
      phone: '',
      address: { address1: '', address2: '', city: '', province: '', zip: '', country: 'United Kingdom' },
    });
    setProfileError(null);
    setProfileSuccess(false);
    setShowEditProfile(true);
  };

  const handleProfileChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const key = field.replace('address.', '');
      setProfileForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
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
        setTimeout(() => { setShowEditProfile(false); router.refresh(); }, 1500);
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
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-ink)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[var(--text-on-light-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !customer) return null;

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Navigation />

      <main className="pt-8 pb-16 px-4 lg:pt-10 lg:px-[5vw]">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold" style={{ letterSpacing: 'var(--letter-spacing-premium-title)' }}>
                Account{customer.firstName ? ` · ${customer.firstName}` : ''}
              </h1>
              <p className="text-sm text-[var(--text-on-light-muted)] mt-0.5">
                {orderCount !== null && `${orderCount} order${orderCount !== 1 ? 's' : ''}`}
                {orderCount !== null && activeSubscriptions.length > 0 && ' · '}
                {activeSubscriptions.length > 0 && `${activeSubscriptions.length} active subscription${activeSubscriptions.length !== 1 ? 's' : ''}`}
                {nextDelivery && ` · Next delivery ${nextDelivery}`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm font-semibold text-[var(--color-ink)] border border-[var(--color-ink)]/30 rounded-[var(--premium-radius-interactive)] px-4 py-2 hover:bg-[var(--color-ink)]/5"
            >
              Sign out
            </button>
          </div>

          {/* What you can do */}
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-on-light-muted)] mb-3">
            What you can do
          </h2>
          <p className="text-sm text-[var(--text-on-light-muted)] mb-4">
            View orders, manage subscriptions, or find your protocol.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link
              href="/account/orders"
              className="flex flex-col rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm overflow-hidden hover:border-[var(--color-neuro-blue-light)] transition-colors group"
            >
              <span className="flex h-28 w-full items-center justify-center bg-[var(--color-premium-stroke)]/40 text-[var(--color-ink)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </span>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[var(--color-ink)]">Orders</span>
                  <p className="text-sm text-[var(--text-on-light-muted)]">View history & track</p>
                </div>
                <span className="shrink-0 text-[var(--text-on-light-muted)] group-hover:text-[var(--color-ink)]">→</span>
              </div>
            </Link>

            <Link
              href="/account/subscriptions"
              className="flex flex-col rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm overflow-hidden hover:border-[var(--color-neuro-blue-light)] transition-colors group"
            >
              {activeSubscriptions.length > 0 && getProtocolImage(getProtocolFromSubscription(activeSubscriptions[0])) ? (
                <span className="flex h-28 w-full shrink-0 overflow-hidden bg-[var(--color-premium-stroke)]/30">
                  <img
                    src={getProtocolImage(getProtocolFromSubscription(activeSubscriptions[0]))}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : (
                <span className="flex h-28 w-full items-center justify-center bg-[var(--color-premium-stroke)]/40 text-[var(--color-ink)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                </span>
              )}
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[var(--color-ink)]">Subscriptions</span>
                  <p className="text-sm text-[var(--text-on-light-muted)]">
                    {subsLoading ? '…' : `${activeSubscriptions.length} active`}
                  </p>
                </div>
                <span className="shrink-0 text-[var(--text-on-light-muted)] group-hover:text-[var(--color-ink)]">→</span>
              </div>
            </Link>

            <Link
              href="/quiz"
              className="flex flex-col rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm overflow-hidden hover:border-[var(--color-neuro-blue-light)] transition-colors group"
            >
              <span className="flex h-28 w-full items-center justify-center bg-[var(--color-ink)]/10 text-[var(--color-ink)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </span>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[var(--color-ink)]">Find your protocol</span>
                  <p className="text-sm text-[var(--text-on-light-muted)]">Take the quiz</p>
                </div>
                <span className="shrink-0 text-[var(--text-on-light-muted)] group-hover:text-[var(--color-ink)]">→</span>
              </div>
            </Link>
          </div>

          {/* Subscriptions strip (only if any) */}
          {!subsLoading && activeSubscriptions.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--premium-radius-card)] bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] p-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                {activeSubscriptions.slice(0, 3).map((s: Subscription) => {
                  const img = getProtocolImage(getProtocolFromSubscription(s));
                  return img ? (
                    <span key={s.id} className="flex h-10 w-10 shrink-0 overflow-hidden rounded-[var(--premium-radius-nested)] border border-white/20">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </span>
                  ) : null;
                })}
                <p className="text-sm">
                  {activeSubscriptions.length} active subscription{activeSubscriptions.length !== 1 ? 's' : ''}
                  {' — '}
                  {activeSubscriptions.slice(0, 2).map((s: Subscription) => s.product.title).join(', ')}
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
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-on-light-muted)] mb-3">
            Your details
          </h2>
          <p className="text-sm text-[var(--text-on-light-muted)] mb-4">
            Update your name, email, and delivery address.
          </p>
          <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--color-ink)]">Contact & address</h3>
              <button
                type="button"
                onClick={openEditProfile}
                className="text-sm font-semibold text-[var(--color-ink)] underline hover:no-underline"
              >
                Edit
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-[var(--text-on-light-muted)] text-xs uppercase tracking-wide">Name</p>
                <p className="font-medium text-[var(--color-ink)]">
                  {[customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.displayName || '—'}
                </p>
              </div>
              <div>
                <p className="text-[var(--text-on-light-muted)] text-xs uppercase tracking-wide">Email</p>
                <p className="font-medium text-[var(--color-ink)]">{customer.email}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[var(--text-on-light-muted)] text-xs uppercase tracking-wide">Delivery address</p>
                <p className="font-medium text-[var(--color-ink)]">
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
          <div className="relative bg-[var(--color-bone)] rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-premium-stroke)]">
              <h3 className="font-bold text-lg text-[var(--color-ink)]" style={{ letterSpacing: 'var(--letter-spacing-premium-title)' }}>Edit profile</h3>
              <button type="button" onClick={() => setShowEditProfile(false)} className="p-2 rounded-[var(--premium-radius-nested)] hover:bg-[var(--color-premium-stroke)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {profileSuccess && (
                <div className="mb-4 p-3 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] text-[var(--color-ink)] premium-body-sm">Profile updated.</div>
              )}
              {profileError && (
                <div className="mb-4 p-3 rounded-[var(--premium-radius-nested)] border border-red-200 bg-red-50 text-red-700 premium-body-sm">{profileError}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">First name</label>
                  <input type="text" value={profileForm.firstName} onChange={(e) => handleProfileChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Last name</label>
                  <input type="text" value={profileForm.lastName} onChange={(e) => handleProfileChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Email</label>
                  <input type="email" value={profileForm.email} onChange={(e) => handleProfileChange('email', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Phone</label>
                  <input type="tel" value={profileForm.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" placeholder="Optional" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Address line 1</label>
                  <input type="text" value={profileForm.address.address1} onChange={(e) => handleProfileChange('address.address1', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Address line 2</label>
                  <input type="text" value={profileForm.address.address2} onChange={(e) => handleProfileChange('address.address2', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">City</label>
                  <input type="text" value={profileForm.address.city} onChange={(e) => handleProfileChange('address.city', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Postcode</label>
                  <input type="text" value={profileForm.address.zip} onChange={(e) => handleProfileChange('address.zip', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">Country</label>
                  <select value={profileForm.address.country} onChange={(e) => handleProfileChange('address.country', e.target.value)} className="w-full px-3 py-2 border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] premium-body-sm">
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[var(--color-premium-stroke)] flex gap-3">
              <button type="button" onClick={() => setShowEditProfile(false)} className="flex-1 py-2.5 premium-body-sm font-semibold border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-interactive)] text-[var(--color-ink)] hover:bg-[var(--color-premium-stroke)] transition-colors">
                Cancel
              </button>
              <button type="button" onClick={handleSaveProfile} disabled={profileSaving} className="flex-1 py-2.5 premium-body-sm font-semibold bg-[var(--color-ink)] text-white rounded-[var(--premium-radius-interactive)] hover:opacity-90 disabled:opacity-50">
                {profileSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
