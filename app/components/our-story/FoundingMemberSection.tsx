"use client";

import { useEffect } from "react";
import FoundingMemberCounter from "@/app/components/FoundingMemberCounter";

export function FoundingMemberSection() {
  // Scroll to section on mount if hash is present
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#founding-members"
    ) {
      const element = document.getElementById("founding-members");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <section id="founding-members" className="px-6 md:px-16 py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Founding Member Program
          </h2>
          <p className="font-commentary text-xl md:text-2xl mb-6 opacity-80">
            join an exclusive community of high performers
          </p>

          {/* Counter Display */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <FoundingMemberCounter
              variant="full"
              size="lg"
              background="light"
            />
            <p className="font-clinical text-sm opacity-70">
              of 1,000 total spots
            </p>
          </div>
        </div>

        {/* Main Content - Three Columns Desktop, Stacked Mobile */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Column 1: Exclusivity & Research */}
          <div className="neo-box p-6 md:p-8">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Exclusive Access
              </h3>
            </div>
            <p className="font-clinical text-sm opacity-80 mb-4 leading-relaxed">
              Early access to research findings, 20% off any subscription for an
              entire year with code FOUNDING1000, and priority support from our
              team.
            </p>
            <div className="pt-4 border-t-2 border-current/10">
              <p className="font-clinical text-xs uppercase opacity-60 mb-2">
                Discount Code
              </p>
              <p className="font-clinical text-sm font-bold mb-2">
                FOUNDING1000
              </p>
              <p className="font-clinical text-xs opacity-70">
                Applies to all subscriptions (protocols & formulas). Not valid
                on trial packs.
              </p>
              <p className="font-clinical text-xs opacity-60 mt-3">
                Orders must be placed before 31 March 2026 to qualify.
              </p>
            </div>
          </div>

          {/* Column 2: Community Benefits */}
          <div className="neo-box p-6 md:p-8">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Private Community
              </h3>
            </div>
            <p className="font-clinical text-sm opacity-80 mb-4 leading-relaxed">
              Join our private WhatsApp group, attend exclusive events, and
              connect directly with founders and fellow members.
            </p>
            <div className="pt-4 border-t-2 border-current/10">
              <p className="font-clinical text-xs uppercase opacity-60 mb-2">
                First Event
              </p>
              <p className="font-clinical text-sm">
                Our first Founding Member event will be in April 2026.
              </p>
            </div>
          </div>

          {/* Column 3: Who's Joining */}
          <div className="neo-box p-6 md:p-8">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Elite Community
              </h3>
            </div>
            <p className="font-clinical text-sm opacity-80 mb-4 leading-relaxed">
              You'll be joining a select group of professional sportsmen,
              Olympians, founders, PhDs, and ambitious individuals committed to
              taking their performance to the next level.
            </p>
            <div className="pt-4 border-t-2 border-current/10">
              <p className="font-clinical text-xs uppercase opacity-60 mb-2">
                Lifetime Perks
              </p>
              <p className="font-clinical text-sm">
                Founding Member badge in app, priority support, and early access
                to new products.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="font-commentary text-lg md:text-xl mb-6 opacity-80">
            This is not a general sale. This is an exclusive opportunity for
            those serious about cognitive performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#protocols"
              className="neo-button px-8 py-3 md:py-4 font-semibold text-base md:text-lg"
            >
              View Protocols
            </a>
            <a
              href="/quiz"
              className="neo-button-outline px-8 py-3 md:py-4 font-semibold text-base md:text-lg"
            >
              Find Your Protocol
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
