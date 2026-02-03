"use client";

import { useState, useCallback } from "react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setNewsletterError(null);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newsletterEmail)) {
        setNewsletterError("Please enter a valid email address");
        return;
      }
      setNewsletterStatus("loading");
      try {
        const res = await fetch("/api/klaviyo/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: newsletterEmail.toLowerCase().trim(),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (data.success) {
          setNewsletterStatus("success");
          setNewsletterEmail("");
        } else {
          setNewsletterStatus("error");
          setNewsletterError(
            data.error ||
              data.reason ||
              "Something went wrong. Please try again.",
          );
        }
      } catch {
        setNewsletterStatus("error");
        setNewsletterError("Something went wrong. Please try again.");
      }
    },
    [newsletterEmail],
  );

  return (
    <footer
      className="bg-black text-white px-6 md:px-16 py-12 md:py-16 border-t-2 border-white/10"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        {/* Row 1: Logo (left) + Newsletter (right) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 pb-10 md:pb-12">
          <a
            href="/"
            className="flex items-center hover:opacity-70 transition-all w-fit shrink-0"
            aria-label="CONKA home"
          >
            <img
              src="/conka.png"
              alt="CONKA logo"
              className="h-14 md:h-16 w-auto invert"
            />
          </a>
          <div className="flex-1 lg:max-w-xl w-full">
            <p className="font-clinical text-sm md:text-base font-medium mb-1">
              Never miss out
            </p>
            <p className="font-commentary text-sm text-white/80 mb-4">
              —sign up for newsletters from CONKA. Tips, research and offers.
              No spam.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value);
                  setNewsletterError(null);
                }}
                placeholder="Email address"
                className="flex-1 min-h-[48px] md:min-h-[52px] px-4 py-3 border-2 border-white/30 rounded-lg bg-white/5 text-white placeholder:text-white/50 font-clinical text-base focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
                disabled={newsletterStatus === "loading"}
                required
                aria-invalid={!!newsletterError}
                aria-describedby={
                  newsletterError
                    ? "footer-email-error"
                    : newsletterStatus === "success"
                      ? "footer-email-success"
                      : undefined
                }
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="bg-white text-black border-2 border-white px-6 py-3 font-semibold text-sm min-h-[48px] md:min-h-[52px] rounded-full shrink-0 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterStatus === "loading" ? "Submitting..." : "Submit"}
              </button>
            </form>
            {newsletterError && (
              <p
                id="footer-email-error"
                className="font-clinical text-xs opacity-90 mt-2"
                role="alert"
              >
                {newsletterError}
              </p>
            )}
            {newsletterStatus === "success" && (
              <p
                id="footer-email-success"
                className="font-commentary text-sm opacity-90 mt-2"
                role="status"
                aria-live="polite"
              >
                You&apos;re in.
              </p>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
          <nav aria-label="Discover" className="flex flex-col gap-3">
            <h3 className="font-clinical text-xs uppercase tracking-widest opacity-70">
              Discover
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/science"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  The Science
                </a>
              </li>
              <li>
                <a
                  href="/ingredients"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Ingredients
                </a>
              </li>
              <li>
                <a
                  href="/case-studies"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/app"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  The CONKA App
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Shop" className="flex flex-col gap-3">
            <h3 className="font-clinical text-xs uppercase tracking-widest opacity-70">
              Shop
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/conka-flow"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  CONKA Flow
                </a>
              </li>
              <li>
                <a
                  href="/conka-clarity"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  CONKA Clarity
                </a>
              </li>
              <li>
                <a
                  href="/quiz"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Take the Quiz
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Company" className="flex flex-col gap-3">
            <h3 className="font-clinical text-xs uppercase tracking-widest opacity-70">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/our-story"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/why-conka"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Why CONKA
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Support and legal" className="flex flex-col gap-3">
            <h3 className="font-clinical text-xs uppercase tracking-widest opacity-70">
              Support
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="/conkaapp-privacy-policy"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/account"
                  className="font-clinical text-sm hover:opacity-70 transition-all"
                >
                  Account
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
