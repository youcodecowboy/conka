'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { customer, loading, isAuthenticated, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/account/login');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
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

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-8 pb-24 lg:pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Welcome back
                {customer.firstName && `, ${customer.firstName}`}
              </h1>
              <p className="font-clinical text-sm opacity-70">{customer.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="neo-button-outline px-6 py-2 font-semibold text-sm self-start"
            >
              Sign Out
            </button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Orders */}
            <Link
              href="/account/orders"
              className="neo-box p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
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
                    className="text-amber-600"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Orders</h3>
                  <p className="font-clinical text-sm opacity-70">
                    View order history
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Track your orders and view past purchases →
              </p>
            </Link>

            {/* Subscriptions */}
            <Link
              href="/account/subscriptions"
              className="neo-box p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
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
                    className="text-green-600"
                  >
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                    <path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Subscriptions</h3>
                  <p className="font-clinical text-sm opacity-70">
                    Manage your subscriptions
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Pause, skip, or cancel subscriptions →
              </p>
            </Link>

            {/* Shop */}
            <Link
              href="/conka-flow"
              className="neo-box p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
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
                    className="text-blue-600"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Shop</h3>
                  <p className="font-clinical text-sm opacity-70">
                    Continue shopping
                  </p>
                </div>
              </div>
              <p className="font-clinical text-sm opacity-50">
                Explore our products and protocols →
              </p>
            </Link>
          </div>

          {/* Account Info */}
          <div className="neo-box p-6">
            <h2 className="font-bold text-xl mb-4">Account Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-clinical text-sm opacity-50 mb-1">Name</h3>
                <p className="font-bold">
                  {customer.firstName || customer.lastName
                    ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                    : 'Not set'}
                </p>
              </div>
              <div>
                <h3 className="font-clinical text-sm opacity-50 mb-1">Email</h3>
                <p className="font-bold">{customer.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

