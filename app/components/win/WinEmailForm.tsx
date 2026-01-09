"use client";

import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useIsMobile from "@/app/hooks/useIsMobile";

interface WinEmailFormProps {
  contestId: string;
  onSuccess: (email: string) => void;
}

export default function WinEmailForm({
  contestId,
  onSuccess,
}: WinEmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const submitEntry = useMutation(api.winEntries.submitEntry);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      setIsSubmitting(true);

      try {
        // Capture userAgent and referrer for analytics
        const userAgent =
          typeof window !== "undefined"
            ? window.navigator.userAgent
            : undefined;
        const referrer =
          typeof window !== "undefined"
            ? document.referrer || undefined
            : undefined;

        const result = await submitEntry({
          contestId,
          email: email.toLowerCase().trim(),
          userAgent,
          referrer,
        });

        if (result.duplicate) {
          setError("Already submitted, nice try though!");
          setIsSubmitting(false);
        } else if (result.success) {
          onSuccess(email);
        } else {
          setError("Something went wrong. Please try again.");
          setIsSubmitting(false);
        }
      } catch (err) {
        console.error("Failed to submit entry:", err);
        setError("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    },
    [email, contestId, submitEntry, onSuccess],
  );

  return (
    <div className="px-6 md:px-16 py-4 md:py-6">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="neo-box p-6 md:p-8 border-l-4 border-amber-500"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-clinical text-xs uppercase tracking-widest opacity-50 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-current rounded-lg bg-transparent font-clinical text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {error && (
              <div className="p-3 border-2 border-current bg-current/5 rounded-lg">
                <p className="font-clinical text-sm opacity-90">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="neo-button px-8 py-4 font-bold text-lg w-full transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Enter to Win"}
            </button>
            <p className="text-center mt-3">
              <span className="font-clinical text-xs opacity-60">
                Win the Balance Protocol • Experience both formulas
              </span>
            </p>
          </div>
        </form>

        {/* Exploration Links - Mobile Only */}
        {isMobile && (
          <div className="mt-6">
            <div className="flex flex-col gap-2">
              <a
                href="/ingredients"
                className="neo-button-outline px-5 py-2.5 font-semibold text-sm flex items-center gap-2 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                Ingredients
              </a>
              <a
                href="/science"
                className="neo-button-outline px-5 py-2.5 font-semibold text-sm flex items-center gap-2 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                The Science
              </a>
              <a
                href="/our-story"
                className="neo-button-outline px-5 py-2.5 font-semibold text-sm flex items-center gap-2 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Our Story
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
