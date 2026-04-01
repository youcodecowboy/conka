"use client";

import Image from "next/image";
import LandingCTA from "./LandingCTA";

/* Product accent colours — semantic names for Flow (warm) and Clear (cool) */
const FLOW_ACCENT = "rgb(245, 158, 11)";
const FLOW_ACCENT_BG = "rgba(245, 158, 11, 0.1)";
const FLOW_ACCENT_TEXT = "rgb(180, 83, 9)";
const CLEAR_ACCENT = "rgb(14, 165, 233)";
const CLEAR_ACCENT_BG = "rgba(14, 165, 233, 0.1)";
const CLEAR_ACCENT_TEXT = "rgb(3, 105, 161)";

export default function LandingProductSplit() {
  return (
    <div>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Two shots. 24 hours covered.
        </h2>
      </div>

      {/* Product image — rounded + shadow */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-sm overflow-hidden rounded-[var(--premium-radius-card)] shadow-lg">
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
          className="rounded-2xl lg:rounded-[var(--premium-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "white",
            border: "1px solid var(--color-premium-stroke)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: FLOW_ACCENT_BG, color: FLOW_ACCENT_TEXT }}
          >
            ☀️ Before the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Flow
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Caffeine-free · Patented formula
          </p>

          {/* Benefits — outcome-led */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Calm focus without caffeine</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>KSM-66 Ashwagandha + Lemon Balm</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>UK patented formula (GB2629279)</span>
            </div>
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--color-premium-stroke)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Honey + citrus
            </p>
          </div>
        </div>

        {/* CONKA Clear */}
        <div
          className="rounded-2xl lg:rounded-[var(--premium-radius-card)] p-4 lg:p-8"
          style={{
            backgroundColor: "white",
            border: "1px solid var(--color-premium-stroke)",
          }}
        >
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: CLEAR_ACCENT_BG, color: CLEAR_ACCENT_TEXT }}
          >
            🌙 After the day
          </div>

          <h3
            className="text-lg lg:text-xl font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            CONKA Clear
          </h3>

          <p className="text-xs opacity-40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits — outcome-led */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Vitamin C for psychological function††</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Glutathione + Alpha GPC + NAC</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
              <span className="text-sm" style={{ color: "var(--color-ink)" }}>Evening wind-down ritual</span>
            </div>
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--color-premium-stroke)" }}>
            <p className="text-xs opacity-50">
              <span className="font-medium opacity-80">Taste:</span> Fresh lemon
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <LandingCTA>Get Both for Less →</LandingCTA>
      </div>
    </div>
  );
}
