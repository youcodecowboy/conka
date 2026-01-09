"use client";

import { useState } from "react";
import Navigation from "@/app/components/Navigation";
import { WinPageDesktop, WinPageMobile } from "@/app/components/win";
import useIsMobile from "@/app/hooks/useIsMobile";

const CONTEST_ID = "win_protocol3_09012026";
const DEADLINE = "2026-01-16T17:00:00Z";

export default function WinPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSuccess = (email: string) => {
    setSubmittedEmail(email);
    setEmailSubmitted(true);
  };

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <main className="pb-12">
        {isMobile === undefined ? (
          <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <p className="font-clinical text-sm opacity-50">Loading...</p>
            </div>
          </div>
        ) : isMobile ? (
          <WinPageMobile
            contestId={CONTEST_ID}
            deadline={DEADLINE}
            emailSubmitted={emailSubmitted}
            submittedEmail={submittedEmail}
            onSuccess={handleSuccess}
          />
        ) : (
          <WinPageDesktop
            contestId={CONTEST_ID}
            deadline={DEADLINE}
            emailSubmitted={emailSubmitted}
            submittedEmail={submittedEmail}
            onSuccess={handleSuccess}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t-2 border-current border-opacity-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left Side */}
            <div className="flex flex-col gap-4">
              <a
                href="/"
                className="flex items-center hover:opacity-70 transition-all"
              >
                <img src="/conka.png" alt="Conka logo" className="h-6 w-auto" />
              </a>

              {/* Mini Nav */}
              <nav className="flex flex-wrap items-center gap-2">
                <a
                  href="/science"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  The Science
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/ingredients"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Ingredients
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/case-studies"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Results
                </a>
                <span className="font-clinical text-xs opacity-30">•</span>
                <a
                  href="/our-story"
                  className="font-clinical text-xs hover:opacity-70 transition-all"
                >
                  Our Story
                </a>
              </nav>

              <p className="font-commentary text-xs opacity-60">
                built with love ♥
              </p>
            </div>

            {/* Right Side - CTAs */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="flex gap-3">
                <a
                  href="/quiz"
                  className="neo-button-outline px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Find Your Protocol
                </a>
                <a
                  href="#protocols"
                  className="neo-button px-5 py-2 font-semibold text-sm flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Buy Conka
                </a>
              </div>
              <p className="font-clinical text-xs opacity-50">
                100-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
