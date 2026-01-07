"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { EmailCaptureFormProps, EmailSubmission } from "./types";

/**
 * EmailCaptureForm
 *
 * An inline form for capturing the user's email before starting the cognitive test.
 * This is NOT a modal - it renders directly within the card area.
 * Follows Conka's neo-brutalist design with sharp corners and bold styling.
 */
export default function EmailCaptureForm({
  onSubmit,
  onBack,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [consentError, setConsentError] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus email input when component mounts
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Reset errors
      setEmailError("");
      setConsentError("");

      let hasError = false;

      // Validate email
      if (!email.trim()) {
        setEmailError("Email is required");
        hasError = true;
      } else if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        hasError = true;
      }

      // Validate consent
      if (!consent) {
        setConsentError("You must agree to receive your results");
        hasError = true;
      }

      if (hasError) return;

      // Submit the email
      const submission: EmailSubmission = {
        email: email.trim(),
        consentGiven: consent,
        submittedAt: new Date(),
      };

      onSubmit(submission);
    },
    [email, consent, onSubmit],
  );

  const isFormValid = email.trim() !== "" && validateEmail(email) && consent;

  return (
    <div className="flex flex-col h-full">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity mb-6 self-start"
        type="button"
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
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Before You Begin</h3>
        <p className="font-commentary text-lg">
          we&apos;ll send you a detailed breakdown of your results
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email-capture"
            className="font-clinical text-sm block mb-2"
          >
            Email Address
          </label>
          <input
            ref={emailInputRef}
            type="email"
            id="email-capture"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            className={`w-full border-2 ${
              emailError ? "border-red-500" : "border-current"
            } p-3 text-base bg-transparent focus:outline-none focus:ring-2 focus:ring-current/20`}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1 font-clinical">
              {emailError}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (consentError) setConsentError("");
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 ${
                  consentError ? "border-red-500" : "border-current"
                } flex items-center justify-center transition-all ${
                  consent ? "bg-[var(--foreground)]" : "bg-transparent"
                }`}
              >
                {consent && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--background)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm">
              I agree to receive my cognitive test results via email
            </span>
          </label>
          {consentError && (
            <p className="text-red-500 text-sm mt-1 font-clinical ml-8">
              {consentError}
            </p>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`neo-button px-8 py-4 font-bold text-base w-full transition-opacity ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Continue to Game
        </button>

        {/* Privacy Note */}
        <p className="font-clinical text-xs opacity-50 text-center">
          We respect your privacy. Your email will only be used to send your
          results.
        </p>
      </form>
    </div>
  );
}
