'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
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

      <main className="pt-8 pb-24 lg:pt-36 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="font-commentary text-lg opacity-70">
              join the cognitive revolution
            </p>
          </div>

          {/* Registration Card */}
          <div className="neo-box p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Description */}
            <div className="space-y-4">
              <p className="text-center font-clinical text-sm opacity-70">
                Creating an account is simple and secure. Just enter your email
                and we&apos;ll send you a one-time code.
              </p>
              <p className="text-center font-clinical text-sm opacity-70">
                No password to remember. Ever.
              </p>
            </div>

            {/* Get Started Button */}
            <button
              onClick={handleGetStarted}
              disabled={loading}
              className="w-full neo-button py-4 font-bold text-lg disabled:opacity-50"
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

            {/* Already have account */}
            <p className="text-center font-clinical text-sm opacity-60">
              Already have an account? The same button works for both!
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 space-y-3">
            <p className="font-clinical text-sm font-semibold text-center opacity-70">
              What you get with an account:
            </p>
            <ul className="font-clinical text-sm opacity-60 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Track your orders and shipments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Manage your subscriptions easily
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Faster checkout with saved info
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Early access to new products
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
