'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, clearError, isAuthenticated } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    // Validate password length
    if (password.length < 5) {
      setLocalError('Password must be at least 5 characters');
      return;
    }

    const success = await register(
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing
    );

    if (success) {
      router.push('/account');
    }
  };

  const displayError = localError || error;

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <Navigation />

      <main className="pt-8 pb-24 lg:pt-24 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="font-commentary text-lg opacity-70">
              join the cognitive revolution
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="neo-box p-6 space-y-5">
            {/* Error Message */}
            {displayError && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
                {displayError}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-clinical text-sm mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="w-full px-4 py-3 border-2 border-current rounded-lg font-clinical text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block font-clinical text-sm mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="w-full px-4 py-3 border-2 border-current rounded-lg font-clinical text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-clinical text-sm mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 border-2 border-current rounded-lg font-clinical text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-clinical text-sm mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={5}
                autoComplete="new-password"
                className="w-full px-4 py-3 border-2 border-current rounded-lg font-clinical text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="••••••••"
              />
              <p className="font-clinical text-xs opacity-50 mt-1">
                Minimum 5 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-clinical text-sm mb-2"
              >
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full px-4 py-3 border-2 border-current rounded-lg font-clinical text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="••••••••"
              />
            </div>

            {/* Marketing Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptsMarketing}
                onChange={(e) => setAcceptsMarketing(e.target.checked)}
                className="mt-1 w-4 h-4 accent-amber-500"
              />
              <span className="font-clinical text-sm opacity-70">
                Keep me updated about new products, protocols, and special
                offers
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full neo-button py-4 font-bold text-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <p className="text-center font-clinical text-sm">
              Already have an account?{' '}
              <Link
                href="/account/login"
                className="font-semibold hover:opacity-70 transition-opacity underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

