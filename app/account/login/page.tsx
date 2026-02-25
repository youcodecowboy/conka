'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/navigation';
import { useAuth } from '@/app/context/AuthContext';
import LoginBenefits from '@/app/components/account/LoginBenefits';

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

      <main className="pt-24 pb-24 lg:pt-32">
        {/* Sign-in section: reduced top padding, narrow card */}
        <section
          className="premium-section-luxury premium-bg-bone pt-8 lg:pt-12"
          aria-label="Sign in"
        >
          <div className="premium-track">
            <div className="mx-auto max-w-[28rem]">
              <div className="premium-header-group mb-8 text-left">
                <h1
                  className="premium-section-heading mb-2"
                  style={{ letterSpacing: 'var(--letter-spacing-premium-title)' }}
                >
                  Welcome
                </h1>
                <p className="premium-section-subtitle opacity-80">
                  Sign in to your account
                </p>
              </div>

              <div className="premium-card-soft premium-card-soft-stroke">
                {error && (
                  <div className="mb-6 rounded-[var(--premium-radius-nested)] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <p className="premium-body mb-6 text-center opacity-80" style={{ maxWidth: 'var(--premium-body-max-width)', marginLeft: 'auto', marginRight: 'auto' }}>
                  We&apos;ll send you a secure one-time code to your email address.
                  No password needed.
                </p>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 mb-6"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    'Continue with Email'
                  )}
                </button>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-[var(--color-premium-stroke)]" />
                  <span className="premium-body-sm text-[var(--text-on-light-muted)]">or</span>
                  <div className="flex-1 h-px bg-[var(--color-premium-stroke)]" />
                </div>

                <p className="premium-body text-center text-[var(--text-on-light-muted)]">
                  <Link
                    href="/"
                    className="font-semibold text-[var(--color-ink)] underline hover:opacity-70 transition-opacity"
                  >
                    Continue as guest
                  </Link>{' '}
                  and checkout without an account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section: own section + track, full width grid */}
        <section
          className="premium-section-luxury premium-bg-bone"
          aria-labelledby="login-benefits-heading"
        >
          <div className="premium-track">
            <LoginBenefits />
          </div>
        </section>
      </main>
    </div>
  );
}
