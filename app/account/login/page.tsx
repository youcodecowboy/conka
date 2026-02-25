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

      <main className="pt-24 pb-24 lg:pt-32">
        <section
          className="premium-section-luxury premium-section-reduced-top premium-bg-bone"
          aria-label="Sign in"
        >
          <div className="premium-track">
            <div className="mx-auto max-w-[28rem]">
              {/* Header */}
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

              {/* Login Card */}
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

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: 'orders', title: 'Track Orders', desc: 'Real-time shipment updates', bg: 'bg-amber-100', text: 'text-amber-600' },
                    { icon: 'subscriptions', title: 'Subscriptions', desc: 'Pause, skip, or cancel', bg: 'bg-green-100', text: 'text-green-600' },
                    { icon: 'checkout', title: 'Fast Checkout', desc: 'Saved payment & address', bg: 'bg-blue-100', text: 'text-blue-600' },
                    { icon: 'access', title: 'Early Access', desc: 'New products & offers', bg: 'bg-purple-100', text: 'text-purple-600' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] p-4"
                      style={{ border: '1px solid var(--color-premium-stroke)' }}
                    >
                      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--premium-radius-nested)] ${item.bg}`}>
                        {item.icon === 'orders' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={item.text}>
                            <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                          </svg>
                        )}
                        {item.icon === 'subscriptions' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={item.text}>
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                          </svg>
                        )}
                        {item.icon === 'checkout' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={item.text}>
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                          </svg>
                        )}
                        {item.icon === 'access' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={item.text}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        )}
                      </div>
                      <p className="font-semibold text-[var(--color-ink)] text-sm mb-1">{item.title}</p>
                      <p className="premium-body-sm text-[var(--text-on-light-muted)]">{item.desc}</p>
                    </div>
                  ))}
                </div>

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
      </main>
    </div>
  );
}
