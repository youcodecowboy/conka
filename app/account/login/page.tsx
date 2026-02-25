'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, clearError, isAuthenticated } = useAuth();

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
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-ink)]">
      <Navigation />

      <main className="pt-24 pb-24 px-4 lg:px-[5vw]">
        <div className="mx-auto max-w-[28rem]">
          <h1
            className="text-2xl font-bold mb-1"
            style={{ letterSpacing: 'var(--letter-spacing-premium-title)' }}
          >
            Account
          </h1>
          <p className="text-[var(--text-on-light-muted)] text-sm mb-6">
            Sign in to view orders, manage subscriptions, and update your details.
          </p>

          <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] p-6">
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <p className="text-[var(--text-on-light-muted)] text-sm mb-4">
              We&apos;ll send a one-time code to your email. No password.
            </p>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] py-3.5 font-semibold text-white text-sm hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Loading...
                </span>
              ) : (
                'Continue with Email'
              )}
            </button>

            <p className="mt-4 text-center text-[var(--text-on-light-muted)] text-sm">
              <Link href="/" className="font-medium text-[var(--color-ink)] underline hover:opacity-70">
                Continue as guest
              </Link>{' '}
              to checkout without an account.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
