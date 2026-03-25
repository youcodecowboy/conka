"use client";

import Image from "next/image";

const FUNNEL_URL = "#";

/**
 * Landing product split — AM vs PM, makes it instantly clear which is which.
 * Builds toward "Both" as the obvious daily system.
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
          One system. Two shots. Every day.
        </h2>
      </div>

      {/* Product image — rounded corners + shadow */}
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-sm overflow-hidden rounded-[var(--premium-radius-card)] shadow-lg">
          <Image
            src="/formulas/ConkaAmPm.jpg"
            alt="CONKA Flow (morning energy, sun icon) and CONKA Clear (evening clarity, moon icon) side by side"
            width={800}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Two-column split */}
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {/* CONKA Flow — Morning */}
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
          <p className="text-xs opacity-40 mb-3">Black cap · Caffeine-free</p>

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
            Honey + citrus flavour
          </p>
        </div>

        {/* CONKA Clear — Evening */}
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
          <p className="text-xs opacity-40 mb-3">White cap · Nootropic</p>

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
            Fresh lemon flavour
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
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
