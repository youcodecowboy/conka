'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useSubscriptions, Subscription } from '@/app/hooks/useSubscriptions';

// Profile form interface
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
  
  // Profile editing state
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      zip: '',
      country: 'United Kingdom',
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [loading, isAuthenticated, router]);

  // Fetch subscriptions and orders when authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (customer) {
        // Fetch subscriptions (uses cookies for auth now)
        fetchSubscriptions();

        // Fetch order count from Customer Account API
        try {
          const response = await fetch('/api/auth/orders', {
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            setOrderCount(data.orders?.length || 0);
          }
        } catch (err) {
          console.error('Failed to fetch orders:', err);
          setOrderCount(0);
        }
      }
    };

    if (isAuthenticated && customer) {
      fetchData();
    }
  }, [isAuthenticated, customer, fetchSubscriptions]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Open edit profile modal
  const openEditProfile = () => {
    setProfileForm({
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || '',
      phone: '',
      address: {
        address1: '',
        address2: '',
        city: '',
        province: '',
        zip: '',
        country: 'United Kingdom',
      },
    });
    setProfileError(null);
    setProfileSuccess(false);
    setShowEditProfile(true);
  };

  // Handle profile form change
  const handleProfileChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setProfileForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileForm(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileError(null);
    setProfileSuccess(false);

    // Profile updates will be implemented via Customer Account API
    // For now, show a placeholder message
    try {
      const response = await fetch('/api/auth/customer/update', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileForm),
      });

      if (response.ok) {
        setProfileSuccess(true);
        setTimeout(() => {
          setShowEditProfile(false);
          // Refresh the page to show updated data
          router.refresh();
        }, 1500);
      } else {
        const data = await response.json();
        setProfileError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setProfileError('Failed to update profile. Please try again.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Get active subscriptions
  // Now using Shopify's native API which returns accurate data
  const activeSubscriptions = subscriptions.filter((s: Subscription) => 
    s.status === 'active'
  );
  
  // Get next delivery date
  const getNextDeliveryDate = () => {
    if (activeSubscriptions.length === 0) return null;
    const validDates = activeSubscriptions
      .map((s: Subscription) => new Date(s.nextBillingDate))
      .filter(d => !isNaN(d.getTime()));
    if (validDates.length === 0) return null;
    const earliest = new Date(Math.min(...validDates.map(d => d.getTime())));
    return earliest.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div
        className="min-h-screen theme-conka-flow flex items-center justify-center"
        style={{ background: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-current/20 border-t-current rounded-full animate-spin mx-auto mb-4" />
          <p className="font-clinical text-sm opacity-50">Loading account...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated || !customer) {
    return null;
  }

  const nextDelivery = getNextDeliveryDate();

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-24 pb-24 lg:pt-32 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="font-commentary text-lg opacity-70 mb-1">your account</p>
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back
                {customer.firstName && `, ${customer.firstName}`}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="neo-button-outline px-6 py-2 font-semibold text-sm self-start flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Active Subscriptions */}
            <div className="neo-box p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                </div>
              </div>
              <p className="font-clinical text-2xl md:text-3xl font-bold">
                {subsLoading ? '—' : activeSubscriptions.length}
              </p>
              <p className="font-clinical text-xs opacity-50 uppercase tracking-wide">Active Subscriptions</p>
            </div>

            {/* Total Orders */}
            <div className="neo-box p-4 md:p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
              </div>
              <p className="font-clinical text-2xl md:text-3xl font-bold">
                {orderCount === null ? '—' : orderCount}
              </p>
              <p className="font-clinical text-xs opacity-50 uppercase tracking-wide">Total Orders</p>
            </div>

            {/* Next Delivery */}
            <div className="neo-box p-4 md:p-6 col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
              </div>
              <p className="font-clinical text-lg md:text-xl font-bold">
                {subsLoading ? 'Loading...' : nextDelivery || 'No upcoming deliveries'}
              </p>
              <p className="font-clinical text-xs opacity-50 uppercase tracking-wide">Next Delivery</p>
            </div>
          </div>

          {/* Subscription Summary - Only show if active subscriptions */}
          {!subsLoading && activeSubscriptions.length > 0 && (
            <div className="neo-box-inverted p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-bold text-xl mb-2">Your Active Subscriptions</h2>
                  <div className="flex flex-wrap gap-3">
                    {activeSubscriptions.slice(0, 3).map((sub: Subscription) => (
                      <div key={sub.id} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="font-clinical text-sm">{sub.product.title}</span>
                      </div>
                    ))}
                    {activeSubscriptions.length > 3 && (
                      <span className="font-clinical text-sm opacity-70">
                        +{activeSubscriptions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href="/account/subscriptions"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm rounded-full hover:opacity-90 transition-opacity self-start"
                >
                  Manage Subscriptions
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Orders */}
            <Link
              href="/account/orders"
              className="neo-box p-6 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-600"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order History</h3>
                  <p className="font-clinical text-sm opacity-70">
                    {orderCount !== null ? `${orderCount} orders` : 'View all orders'}
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Track deliveries and view past purchases →
              </p>
            </Link>

            {/* Subscriptions */}
            <Link
              href="/account/subscriptions"
              className="neo-box p-6 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Subscriptions</h3>
                  <p className="font-clinical text-sm opacity-70">
                    {activeSubscriptions.length} active
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Pause, skip, modify, or cancel →
              </p>
            </Link>

            {/* Shop */}
            <Link
              href="/quiz"
              className="neo-box p-6 hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Find Your Protocol</h3>
                  <p className="font-clinical text-sm opacity-70">
                    Take the quiz
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Discover your perfect protocol →
              </p>
            </Link>
          </div>

          {/* Account Info */}
          <div className="neo-box p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl">Account Information</h2>
              <button
                onClick={openEditProfile}
                className="neo-button-outline px-4 py-2 text-sm font-semibold flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-current/5 rounded-lg">
                <h3 className="font-clinical text-xs opacity-50 mb-1 uppercase tracking-wide">Full Name</h3>
                <p className="font-bold text-lg">
                  {customer.firstName || customer.lastName
                    ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                    : customer.displayName || 'Not set'}
                </p>
              </div>
              <div className="p-4 bg-current/5 rounded-lg">
                <h3 className="font-clinical text-xs opacity-50 mb-1 uppercase tracking-wide">Email Address</h3>
                <p className="font-bold text-lg">{customer.email}</p>
              </div>
              <div className="p-4 bg-current/5 rounded-lg">
                <h3 className="font-clinical text-xs opacity-50 mb-1 uppercase tracking-wide">Account Type</h3>
                <p className="font-bold text-lg">Passwordless</p>
              </div>
              <div className="p-4 bg-current/5 rounded-lg">
                <h3 className="font-clinical text-xs opacity-50 mb-1 uppercase tracking-wide">Delivery Address</h3>
                <p className="font-bold text-lg">
                  {customer.defaultAddress?.address1 
                    ? `${customer.defaultAddress.address1}${customer.defaultAddress.city ? `, ${customer.defaultAddress.city}` : ''}`
                    : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditProfile(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-2xl">Edit Profile</h3>
                <p className="font-clinical text-sm opacity-50 mt-1">Update your account information</p>
              </div>
              <button
                onClick={() => setShowEditProfile(false)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Success Message */}
              {profileSuccess && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold">Profile updated successfully!</p>
                    <p className="font-clinical text-sm opacity-70">Your changes have been saved.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {profileError && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">
                  <p className="font-bold">{profileError}</p>
                </div>
              )}

              {/* Two Column Layout for larger screens */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Personal & Contact */}
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="neo-box p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <p className="font-bold text-sm">Personal Information</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">First Name</label>
                        <input
                          type="text"
                          value={profileForm.firstName}
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Last Name</label>
                        <input
                          type="text"
                          value={profileForm.lastName}
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="neo-box p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                          <polyline points="22,6 12,13 2,6"/>
                        </svg>
                      </div>
                      <p className="font-bold text-sm">Contact Information</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="+44 7700 900000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Delivery Address */}
                <div>
                  <div className="neo-box p-5 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <p className="font-bold text-sm">Delivery Address</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Address Line 1</label>
                        <input
                          type="text"
                          value={profileForm.address.address1}
                          onChange={(e) => handleProfileChange('address.address1', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Address Line 2 (optional)</label>
                        <input
                          type="text"
                          value={profileForm.address.address2}
                          onChange={(e) => handleProfileChange('address.address2', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Apartment, suite, etc."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">City</label>
                          <input
                            type="text"
                            value={profileForm.address.city}
                            onChange={(e) => handleProfileChange('address.city', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="London"
                          />
                        </div>
                        <div>
                          <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Postcode</label>
                          <input
                            type="text"
                            value={profileForm.address.zip}
                            onChange={(e) => handleProfileChange('address.zip', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="SW1A 1AA"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-clinical text-xs uppercase opacity-50 mb-1.5">Country</label>
                        <select
                          value={profileForm.address.country}
                          onChange={(e) => handleProfileChange('address.country', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-clinical focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
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
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 neo-button-outline py-3.5 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={profileSaving}
                  className="flex-1 neo-button py-3.5 font-semibold text-sm disabled:opacity-50"
                >
                  {profileSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
