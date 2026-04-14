"use client";

import Image from "next/image";
import { GUARANTEE_DAYS } from "@/app/lib/offerConstants";
import LandingCTA from "./LandingCTA";

const BULLETS = [
  "Free UK shipping",
  "Money back guarantee",
  "No return required",
  "Nothing to lose (other than brain fog and burnout)",
];

/**
 * 100-day risk-free trial section.
 *
 * Magic Mind framing: lead with the guarantee promise, support with the
 * refund mechanic. The CONKA app phone mockup stays as visual proof —
 * the cognitive score is the receipt that the guarantee is meaningful.
 */
export default function LandingGuarantee() {
  return (
    <div>
      {/* Headline */}
      <div className="mb-8">
        <h2
          className="brand-h1 mb-0"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {GUARANTEE_DAYS}-Day Risk Free Trial
        </h2>
      </div>

      {/* Two-col on desktop: copy left, phone right */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Copy column */}
        <div className="flex-1 order-2 lg:order-1 w-full">
          <p className="brand-body text-black/70">
            Try CONKA for {GUARANTEE_DAYS} days. If your mental performance
            doesn&apos;t noticeably improve, we&apos;ll refund your purchase
            completely. No return necessary.
            <sup className="text-[0.5em] text-black/40 align-super">*</sup>
          </p>

          {/* Bullets */}
          <ul className="mt-6 space-y-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent shrink-0 mt-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm lg:text-base text-black/80">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <LandingCTA className="sm:w-auto">
              Try it 100% Risk Free Now
            </LandingCTA>
          </div>

          {/* Footnote */}
          <p className="mt-4 text-xs text-black/40">
            *First-time customers only. Contact info@conka.io within{" "}
            {GUARANTEE_DAYS} days of your first order for a full refund.
          </p>
        </div>

        {/* Phone mockup — app is the receipt that the guarantee is credible */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <Image
            src="/app/AppConkaRing.png"
            alt="CONKA app showing cognitive performance score"
            width={240}
            height={480}
            loading="lazy"
            className="relative z-[1] h-auto rounded-[var(--brand-radius-container)]"
            style={{
              width: "clamp(180px, 40vw, 240px)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
