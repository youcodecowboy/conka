"use client";

import Image from "next/image";
import LandingCTA from "./LandingCTA";

/* Product accent colours — use brand tokens where available.
   TODO: Flow/Clear accent tints (BG, TEXT) not in brand-base.css.
   The base accents are defined as --brand-flow-accent and --brand-clear-accent
   but the tinted variants (10% bg, darker text) remain hardcoded here.
   Fallback: kept as component constants until a tint system is established. */
const FLOW_ACCENT = "var(--brand-flow-accent)";
const FLOW_ACCENT_BG = "rgba(245, 158, 11, 0.1)";
const FLOW_ACCENT_TEXT = "rgb(180, 83, 9)";
const CLEAR_ACCENT = "var(--brand-clear-accent)";
const CLEAR_ACCENT_BG = "rgba(14, 165, 233, 0.1)";
const CLEAR_ACCENT_TEXT = "rgb(3, 105, 161)";

export default function LandingProductSplit() {
  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h2 className="brand-h2">
          Two shots. 24 hours covered.
        </h2>
      </div>

      {/* Product image */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-sm overflow-hidden rounded-[var(--brand-radius-card)] shadow-lg">
          <Image
            src="/formulas/ConkaAmPm.jpg"
            alt="CONKA Flow (morning energy) and CONKA Clear (evening clarity) side by side"
            width={800}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Two-column product cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* CONKA Flow */}
        <div
          className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "var(--brand-white)",
            border: "1px solid var(--brand-divider-subtle)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--brand-radius-interactive)] text-xs font-semibold mb-4"
            style={{ backgroundColor: FLOW_ACCENT_BG, color: FLOW_ACCENT_TEXT }}
          >
            ☀️ Before the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--brand-black)" }}
          >
            CONKA Flow
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Caffeine-free · Patented formula
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {["Calm focus without caffeine", "KSM-66 Ashwagandha + Lemon Balm", "UK patented formula (GB2629279)"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
                <span className="text-sm" style={{ color: "var(--brand-black)" }}>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--brand-divider-subtle)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Honey + citrus
            </p>
          </div>
        </div>

        {/* CONKA Clear */}
        <div
          className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "var(--brand-white)",
            border: "1px solid var(--brand-divider-subtle)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--brand-radius-interactive)] text-xs font-semibold mb-4"
            style={{ backgroundColor: CLEAR_ACCENT_BG, color: CLEAR_ACCENT_TEXT }}
          >
            🌙 After the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--brand-black)" }}
          >
            CONKA Clear
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {["Vitamin C for psychological function††", "Glutathione + Alpha GPC + NAC", "Evening wind-down ritual"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
                <span className="text-sm" style={{ color: "var(--brand-black)" }}>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--brand-divider-subtle)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Fresh lemon
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-start">
        <LandingCTA>Get Both for Less →</LandingCTA>
      </div>
    </div>
  );
}
