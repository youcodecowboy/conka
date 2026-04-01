"use client";

import Image from "next/image";
import { GUARANTEE_LABEL_FULL } from "@/app/lib/offerConstants";
import LandingCTA from "./LandingCTA";

/**
 * Landing guarantee section.
 *
 * Structure (mobile):
 *   1. Headline (plain black)
 *   2. Phone mockup (centred)
 *   3. Guarantee callout
 *   4. Stats
 *   5. Supporting copy
 *   6. CTA
 *
 * Desktop: headline spans full width, then two-col (copy left, phone right).
 *
 * D2C framing: lead with the guarantee (risk reversal), not the app feature.
 * The app is proof the guarantee is credible — "we can measure it, so we
 * can guarantee it." This removes the last objection before purchase.
 */
export default function LandingGuarantee() {
  return (
    <div>
      {/* Headline — full width, plain black, no gradient */}
      <div className="text-center mb-8">
        <h2
          className="premium-section-heading"
          style={{
            letterSpacing: "var(--letter-spacing-premium-title)",
            color: "var(--color-ink)",
          }}
        >
          Results that you can actually see.
        </h2>
      </div>

      {/* Two-col on desktop: copy left, phone right */}
      {/* Mobile: phone then copy, stacked */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Copy — second on mobile, first on desktop */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          {/* Guarantee callout — the hook */}
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{
              backgroundColor: "var(--color-neuro-blue-light)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-ink)", opacity: 0.6, flexShrink: 0 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              {GUARANTEE_LABEL_FULL}*
            </span>
          </div>

          {/* Explanation */}
          <p
            className="mt-6 text-sm lg:text-base leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.6 }}
          >
            Don&apos;t take our word for it. Test your brain and see the
            benefits of CONKA yourself. Track as you build your routine.
          </p>

          {/* CTA + app link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-3">
            <LandingCTA className="sm:w-auto">Try Risk-Free →</LandingCTA>
            <a
              href="/app"
              className="text-sm font-medium underline underline-offset-2"
              style={{ color: "var(--color-ink)", opacity: 0.5 }}
            >
              Learn more about the app
            </a>
          </div>

          {/* Footnote */}
          <p
            className="mt-4 text-xs"
            style={{ color: "var(--color-ink)", opacity: 0.3 }}
          >
            *First-time customers only. Not satisfied? Full refund, no returns needed.
          </p>
        </div>

        {/* Phone mockup — first on mobile, second on desktop */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <Image
            src="/app/AppConkaRing.png"
            alt="CONKA app showing cognitive performance score of 92"
            width={240}
            height={480}
            className="relative z-[1] h-auto rounded-[24px]"
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
