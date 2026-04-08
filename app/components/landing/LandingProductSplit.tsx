"use client";

import Image from "next/image";
import LandingCTA from "./LandingCTA";
import { useInView } from "@/app/hooks/useInView";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";

const FLOW_ACCENT = "var(--brand-flow-accent)";
const FLOW_ACCENT_BG = "rgba(245, 158, 11, 0.1)";
const FLOW_ACCENT_TEXT = "rgb(180, 83, 9)";
const CLEAR_ACCENT = "var(--brand-clear-accent)";
const CLEAR_ACCENT_BG = "rgba(14, 165, 233, 0.1)";
const CLEAR_ACCENT_TEXT = "rgb(3, 105, 161)";

export default function LandingProductSplit() {
  const [ref, isInView] = useInView();
  const revealed = isInView ? "revealed" : "";

  return (
    <div ref={ref}>
      {/* Heading */}
      <div className={`reveal ${revealed} mb-10`}>
        <h2 className="brand-h2 mb-0">
          Two shots. 24 hours covered.
        </h2>
      </div>

      {/* AM/PM connector strip */}
      <div className={`reveal ${revealed} flex items-center gap-3 mb-4 text-xs text-black/40 font-medium`}>
        <span aria-hidden>☀️</span>
        <span className="uppercase tracking-wide">Morning</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(217, 119, 6, 0.3), rgba(3, 105, 161, 0.3))" }} />
        <span className="uppercase tracking-wide">Afternoon</span>
        <span aria-hidden>🌙</span>
      </div>

      {/* Two-column product cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* CONKA Flow */}
        <div className={`reveal ${revealed} flex flex-col rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/12 shadow-sm transition-all duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md active:scale-[0.99]`} data-stagger="1">
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
            ☀️ Take in the morning
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-black">
            CONKA Flow
          </h3>

          <p className="text-xs text-black/40 mt-1 mb-5">
            Caffeine-free · Patented formula
          </p>

          {/* Benefits -- flex-1 so this area stretches to align with sibling card */}
          <div className="flex-1 space-y-3">
            {["Calm focus without caffeine", "Ashwagandha + Lemon Balm", "UK patented formula (GB2629279)"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: FLOW_ACCENT }} />
                <span className="text-sm text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste -- mt-auto pushes to bottom, aligned across cards */}
          <div className="mt-5 pt-4 border-t border-black/8">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Honey + citrus
            </p>
          </div>

        </div>

        {/* CONKA Clear */}
        <div className={`reveal ${revealed} flex flex-col rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/12 shadow-sm transition-all duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md active:scale-[0.99]`} data-stagger="2">
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
            🌙 Take in the afternoon
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-black">
            CONKA Clear
          </h3>

          <p className="text-xs text-black/40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits -- flex-1 so this area stretches to align with sibling card */}
          <div className="flex-1 space-y-3">
            {["Vitamin C for psychological function††", "Glutathione + Alpha GPC + NAC", "Evening wind-down ritual"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
                <span className="text-sm text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Taste -- mt-auto pushes to bottom, aligned across cards */}
          <div className="mt-5 pt-4 border-t border-black/8">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Fresh lemon
            </p>
          </div>

        </div>
      </div>

      {/* Bridge connector + CTA */}
      <div className={`reveal ${revealed} flex flex-col items-center`} data-stagger="3">
        <div className="w-px h-8 bg-brand-accent/20" />
      </div>
      <div className={`reveal ${revealed} flex justify-start`} data-stagger="4">
        <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
      </div>
    </div>
  );
}
