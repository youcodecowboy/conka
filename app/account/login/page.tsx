'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, clearError, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
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
            <h1 className="text-3xl font-bold mb-2">Welcome</h1>
            <p className="font-commentary text-lg opacity-70">
              sign in to your account
            </p>
          </div>

          {/* Login Card */}
          <div className="neo-box p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Description */}
            <p className="text-center font-clinical text-sm opacity-70">
              We&apos;ll send you a secure one-time code to your email address.
              No password needed.
            </p>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full neo-button py-4 font-bold text-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                  Loading...
                </span>
              ) : (
                'Continue with Email'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-current opacity-20" />
              <span className="font-clinical text-xs opacity-50">or</span>
              <div className="flex-1 h-px bg-current opacity-20" />
            </div>

            {/* Guest Option */}
            <p className="text-center font-clinical text-sm opacity-70">
              You can also{' '}
              <Link
                href="/"
                className="font-semibold hover:opacity-70 transition-opacity underline"
              >
                continue as guest
              </Link>{' '}
              and checkout without an account.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 space-y-3">
            <p className="font-clinical text-sm font-semibold text-center opacity-70">
              Benefits of an account:
            </p>
            <ul className="font-clinical text-sm opacity-60 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Track your orders and shipments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Manage your subscriptions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">✓</span>
                Faster checkout with saved info
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
