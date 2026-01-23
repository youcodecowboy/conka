'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';

/**
 * Register Page
 * 
 * With the new Customer Account API, registration is handled automatically
 * during the first login. This page now redirects to the login flow.
 */
export default function RegisterPage() {
  const router = useRouter();
  const { login, loading, error, clearError, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  const handleGetStarted = () => {
    clearError();
    login();
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-24 pb-24 lg:pt-36 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="font-commentary text-lg opacity-70">
              join the cognitive revolution
            </p>
          </div>

          {/* Registration Card */}
          <div className="neo-box p-6 md:p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Description */}
            <div className="text-center mb-6">
              <p className="font-clinical text-sm opacity-70">
                Creating an account is simple and secure. Just enter your email
                and we&apos;ll send you a one-time code.
              </p>
              <p className="font-clinical text-sm opacity-70 mt-2 font-semibold">
                No password to remember. Ever.
              </p>
            </div>

            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="w-full neo-button py-4 font-bold text-lg disabled:opacity-50 mb-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                  Loading...
                </span>
              ) : (
                'Get Started'
              )}
            </button>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Track Orders */}
              <div className="p-4 bg-current/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <p className="font-bold text-sm mb-1">Track Orders</p>
                <p className="font-clinical text-xs opacity-60">Real-time shipment updates</p>
              </div>

              {/* Manage Subscriptions */}
              <div className="p-4 bg-current/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                    <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                  </svg>
                </div>
                <p className="font-bold text-sm mb-1">Subscriptions</p>
                <p className="font-clinical text-xs opacity-60">Pause, skip, or cancel</p>
              </div>

              {/* Faster Checkout */}
              <div className="p-4 bg-current/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <p className="font-bold text-sm mb-1">Fast Checkout</p>
                <p className="font-clinical text-xs opacity-60">Saved payment & address</p>
              </div>

              {/* Exclusive Access */}
              <div className="p-4 bg-current/5 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <p className="font-bold text-sm mb-1">Early Access</p>
                <p className="font-clinical text-xs opacity-60">New products & offers</p>
              </div>
            </div>

            {/* Already have account */}
            <p className="text-center font-clinical text-sm opacity-60 mt-6">
              Already have an account? The same button works for both!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
