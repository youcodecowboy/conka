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
        <div className="mb-4">
          <p className="font-commentary text-lg text-center mb-2">
            enter your email to take part
          </p>
          <p className="font-clinical text-xs opacity-70 text-center mb-4">
            winner notified by email when entries close
          </p>
        </div>
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
              disabled={isSubmitting || !email.trim()}
              className="neo-button px-8 py-4 font-bold text-lg w-full transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Enter the draw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
