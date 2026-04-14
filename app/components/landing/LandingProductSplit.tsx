// TODO: Orphaned as of 2026-04-14 (SCRUM-877) — no longer mounted on /start.
// Kept on disk in case the AM/PM product split returns. Safe to delete if
// not revived within the next phase or two.
"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import LandingCTA from "./LandingCTA";
import IngredientsPanel from "./IngredientsPanel";
import IngredientsButton from "./IngredientsButton";
import AmPmConnector from "./AmPmConnector";
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
  const [openProduct, setOpenProduct] = useState<"flow" | "clear" | null>(null);

  const openIngredients = (product: "flow" | "clear") => {
    setOpenProduct(product);
    try {
      track("landing:ingredients_viewed", { product, source: "product_split" });
    } catch {
      /* fail silently */
    }
  };

  return (
    <div ref={ref}>
      {/* Heading */}
      <div className={`reveal ${revealed} mb-10`}>
        <h2 className="brand-h1 mb-0">
          Two shots. 24 hours covered.
        </h2>
      </div>

      {/* AM/PM connector strip */}
      <AmPmConnector />

      {/* Two-column product cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        {/* CONKA Flow */}
        <div className={`reveal ${revealed} flex flex-col rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/12 shadow-sm transition-all duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md active:scale-[0.99]`} data-stagger="1">

          {/* Product image — small container + scale keeps render crisp (source PNG is 1000x1000 8-bit colormap) */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-44 lg:w-32 lg:h-64">
              <Image
                src="/formulas/conkaFlow/FlowNoBackground.png"
                alt="CONKA Flow bottle"
                fill
                sizes="(max-width: 1024px) 80px, 128px"
                className="object-contain scale-150"
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

          {/* Ingredients CTA */}
          <IngredientsButton
            product="flow"
            onClick={() => openIngredients("flow")}
            className="mt-5 px-4 text-xs lg:text-sm"
          />

          {/* Taste -- mt-auto pushes to bottom, aligned across cards */}
          <div className="mt-4 pt-4 border-t border-black/8">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Honey + citrus
            </p>
          </div>

        </div>

        {/* CONKA Clear */}
        <div className={`reveal ${revealed} flex flex-col rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] p-4 lg:p-8 bg-white border border-black/12 shadow-sm transition-all duration-200 lg:hover:-translate-y-0.5 lg:hover:shadow-md active:scale-[0.99]`} data-stagger="2">
          {/* Product image — small container + scale keeps render crisp (source PNG is 1000x1000 8-bit colormap) */}
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-44 lg:w-32 lg:h-64">
              <Image
                src="/formulas/conkaClear/ClearNoBackground.png"
                alt="CONKA Clear bottle"
                fill
                sizes="(max-width: 1024px) 80px, 128px"
                className="object-contain scale-150"
              />
            </div>
          </div>

          {/* Time badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--brand-radius-interactive)] text-xs font-semibold mb-4"
            style={{ backgroundColor: CLEAR_ACCENT_BG, color: CLEAR_ACCENT_TEXT }}
          >
            ☀️ Take in the afternoon
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-black">
            CONKA Clear
          </h3>

          <p className="text-xs text-black/40 mt-1 mb-5">
            Nootropic · Antioxidant blend
          </p>

          {/* Benefits -- flex-1 so this area stretches to align with sibling card */}
          <div className="flex-1 space-y-3">
            {["Vitamin C for psychological function††", "Glutathione + Alpha GPC + NAC", "Afternoon clarity ritual"].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: CLEAR_ACCENT }} />
                <span className="text-sm text-black/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Ingredients CTA */}
          <IngredientsButton
            product="clear"
            onClick={() => openIngredients("clear")}
            className="mt-5 px-4 text-xs lg:text-sm"
          />

          {/* Taste -- mt-auto pushes to bottom, aligned across cards */}
          <div className="mt-4 pt-4 border-t border-black/8">
            <p className="text-xs text-black/60">
              <span className="font-medium text-black/80">Taste:</span> Fresh lemon
            </p>
          </div>

        </div>
      </div>

      {/* Bridge connector + CTA */}
      <div className="flex flex-col items-center">
        <div className="w-px h-8 bg-brand-accent/20" />
      </div>
      <div className="flex justify-start">
        <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
      </div>

      <IngredientsPanel
        isOpen={openProduct !== null}
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </div>
  );
}
