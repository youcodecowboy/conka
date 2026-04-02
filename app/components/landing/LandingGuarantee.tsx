"use client";

import Image from "next/image";
import { GUARANTEE_LABEL_FULL } from "@/app/lib/offerConstants";
import LandingCTA from "./LandingCTA";

/**
 * Landing guarantee section.
 *
 * D2C framing: lead with the guarantee (risk reversal), not the app feature.
 * The app is proof the guarantee is credible.
 */
export default function LandingGuarantee() {
  return (
    <div>
      {/* Headline */}
      <div className="mb-10">
        <h2 className="brand-h2 mb-0">
          The only supplement you can measure.<sup className="text-[0.5em] text-black/40 align-super">^^</sup>
        </h2>
      </div>

      {/* Two-col on desktop: copy left, phone right */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Copy */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Guarantee callout pill */}
          <div className="flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-[var(--brand-radius-interactive)] bg-brand-accent/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent shrink-0">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span className="text-sm font-semibold text-brand-accent">
                {GUARANTEE_LABEL_FULL}<sup className="text-[0.5em] opacity-60 align-super">*</sup>
              </span>
            </div>
          </div>

          {/* Explanation */}
          <p className="brand-body mt-6 text-black/60">
            Track your cognitive performance with the CONKA app&apos;s
            FDA-cleared assessment.<sup className="text-[0.5em] text-black/40 align-super">^^</sup> 5,000+ tests completed. If
            you&apos;re not satisfied, full refund.<sup className="text-[0.5em] text-black/40 align-super">*</sup>
          </p>

          {/* CTA + app link */}
          <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
            <LandingCTA className="sm:w-auto">Try Risk-Free →</LandingCTA>
            <a
              href="/app"
              className="text-sm font-medium underline underline-offset-2 text-black/60"
            >
              Learn more about the app
            </a>
          </div>

          {/* Footnote */}
          <p className="mt-4 text-xs text-black/40">
            *First-time customers only. Not satisfied? Full refund, no returns needed.
          </p>
        </div>

        {/* Phone mockup */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <Image
            src="/app/AppConkaRing.png"
            alt="CONKA app showing cognitive performance score of 92"
            width={240}
            height={480}
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
