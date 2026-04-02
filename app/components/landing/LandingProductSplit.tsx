"use client";

import Image from "next/image";
import LandingCTA from "./LandingCTA";

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
      <div className="mb-10">
        <h2 className="brand-h2 mb-0">
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
        <div className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/6">
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--brand-radius-interactive)] text-xs font-semibold mb-4"
            style={{ backgroundColor: FLOW_ACCENT_BG, color: FLOW_ACCENT_TEXT }}
          >
            ☀️ Before the day
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-black">
            CONKA Flow
          </h3>

          <p className="text-xs text-black/40 mt-1 mb-5">
            Caffeine-free · Patented formula
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {["Calm focus without caffeine", "KSM-66 Ashwagandha + Lemon Balm", "UK patented formula (GB2629279)"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
                <span className="text-sm text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4 border-t border-black/6">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Honey + citrus
            </p>
          </div>
        </div>

        {/* CONKA Clear */}
        <div className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/6">
          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--brand-radius-interactive)] text-xs font-semibold mb-4"
            style={{ backgroundColor: CLEAR_ACCENT_BG, color: CLEAR_ACCENT_TEXT }}
          >
            🌙 After the day
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-black">
            CONKA Clear
          </h3>

          <p className="text-xs text-black/40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits */}
          <div className="space-y-3">
            {["Vitamin C for psychological function††", "Glutathione + Alpha GPC + NAC", "Evening wind-down ritual"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
                <span className="text-sm text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste */}
          <div className="mt-5 pt-4 border-t border-black/6">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Fresh lemon
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
