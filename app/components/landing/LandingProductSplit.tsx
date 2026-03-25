"use client";

import Image from "next/image";

const FUNNEL_URL = "#";

/**
 * Landing product split — "Which is which" section.
 * Shows both bottles, then a two-column split explaining AM vs PM.
 * Builds toward "Both" as the obvious choice.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */
export default function LandingProductSplit() {
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-6">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Your daily system.
        </h2>
        <p
          className="mt-2 text-sm opacity-50"
          style={{ color: "var(--color-ink)" }}
        >
          Two shots. Morning and evening. That&apos;s it.
        </p>
      </div>

      {/* Product image */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-xs">
          <Image
            src="/formulas/BothShots.jpg"
            alt="CONKA Flow (black cap) and CONKA Clear (white cap) bottles side by side"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Two-column split */}
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {/* Flow — Morning */}
        <div
          className="rounded-2xl p-4 lg:p-6"
          style={{
            backgroundColor: "rgba(255, 243, 224, 0.5)",
            border: "1px solid rgba(245, 158, 11, 0.15)",
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">
            ☀️ Morning
          </div>
          <h3
            className="text-base lg:text-lg font-bold mb-1"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Flow
          </h3>
          <p className="text-xs opacity-40 mb-3">Black cap</p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Sustained focus</span>
            </li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Calm energy</span>
            </li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Stress resilience</span>
            </li>
          </ul>

          <p className="text-xs mt-4 opacity-40">
            Tastes like honey + citrus
          </p>
        </div>

        {/* Clear — Evening */}
        <div
          className="rounded-2xl p-4 lg:p-6"
          style={{
            backgroundColor: "rgba(224, 242, 255, 0.5)",
            border: "1px solid rgba(14, 165, 233, 0.15)",
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-2">
            🌙 Evening
          </div>
          <h3
            className="text-base lg:text-lg font-bold mb-1"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Clear
          </h3>
          <p className="text-xs opacity-40 mb-3">White cap</p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Mental clarity</span>
            </li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Recovery</span>
            </li>
            <li className="flex items-start gap-2 text-sm" style={{ color: "var(--color-ink)" }}>
              <span className="opacity-40 mt-0.5">•</span>
              <span>Brain detox</span>
            </li>
          </ul>

          <p className="text-xs mt-4 opacity-40">
            Tastes like fresh lemon
          </p>
        </div>
      </div>

      {/* Bridge text — sell "Both" */}
      <div className="text-center mt-8">
        <p
          className="text-sm lg:text-base font-medium"
          style={{ color: "var(--color-ink)", opacity: 0.7 }}
        >
          Flow generates energy. Clear supports recovery.
          <br />
          Together they compound daily.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-center">
        <a
          href={FUNNEL_URL}
          className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--gradient-neuro-blue-accent)" }}
        >
          Get Started →
        </a>
      </div>
    </div>
  );
}
