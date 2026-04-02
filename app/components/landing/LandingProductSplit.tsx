"use client";

import Image from "next/image";
import LandingCTA from "./LandingCTA";
import {
  PRICE_PER_SHOT_FLOW,
  PRICE_PER_SHOT_CLEAR,
  PRICE_PER_SHOT_BOTH,
} from "@/app/lib/landingPricing";

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

      {/* Two-column product cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* CONKA Flow */}
        <div className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/6">
          {/* Product image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-44 lg:w-28 lg:h-56 overflow-hidden">
              <Image
                src="/formulas/conkaFlow/FlowNoBackground.png"
                alt="CONKA Flow bottle"
                fill
                sizes="(max-width: 1024px) 80px, 112px"
                className="object-contain scale-200"
              />
            </div>
          </div>

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

          {/* Per-shot price */}
          <div className="mt-4 pt-4 border-t border-black/6">
            <p className="text-xs text-black/60">
              From{" "}
              <span className="brand-data text-black">£{PRICE_PER_SHOT_FLOW}</span>
              <span className="brand-data-label text-black/40">/shot</span>
            </p>
          </div>
        </div>

        {/* CONKA Clear */}
        <div className="rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/6">
          {/* Product image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-44 lg:w-28 lg:h-56 overflow-hidden">
              <Image
                src="/formulas/conkaClear/ClearNoBackground.png"
                alt="CONKA Clear bottle"
                fill
                sizes="(max-width: 1024px) 80px, 112px"
                className="object-contain scale-200"
              />
            </div>
          </div>

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

          {/* Per-shot price */}
          <div className="mt-4 pt-4 border-t border-black/6">
            <p className="text-xs text-black/60">
              From{" "}
              <span className="brand-data text-black">£{PRICE_PER_SHOT_CLEAR}</span>
              <span className="brand-data-label text-black/40">/shot</span>
            </p>
          </div>
        </div>
      </div>

      {/* Both value callout + CTA */}
      <div className="mt-6 px-4 py-3 rounded-[var(--brand-radius-interactive)] bg-brand-accent/8">
        <p className="text-sm text-black/80">
          Get both from{" "}
          <span className="brand-data font-semibold text-brand-accent">£{PRICE_PER_SHOT_BOTH}/shot</span>
          <span className="text-black/40"> · </span>
          <span className="text-black/60">the lowest per-shot cost</span>
        </p>
      </div>

      <div className="mt-6 flex justify-start">
        <LandingCTA>Get Both for Less →</LandingCTA>
      </div>
    </div>
  );
}
