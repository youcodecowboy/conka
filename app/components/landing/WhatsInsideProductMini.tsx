"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import IngredientsPanel from "./IngredientsPanel";
import IngredientsButton from "./IngredientsButton";

/**
 * Mini Flow + Clear bottle tiles for the merged LandingWhatItDoes section.
 *
 * Image rendering matches LandingProductSplit (small container + scale-150)
 * because the source PNGs are 1000x1000 8-bit colormap (indexed palette).
 * Larger renders with scale-200 visibly upsample. See feature plan Phase D.
 */
export default function WhatsInsideProductMini() {
  const [openProduct, setOpenProduct] = useState<"flow" | "clear" | null>(null);

  const openIngredients = (product: "flow" | "clear") => {
    setOpenProduct(product);
    try {
      track("landing:ingredients_viewed", { product, source: "whats_inside" });
    } catch {
      /* fail silently */
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {/* Flow */}
        <div className="flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-white border border-black/6 p-4 lg:p-6">
          <div className="relative w-20 h-44 lg:w-32 lg:h-64 mb-3">
            <Image
              src="/formulas/conkaFlow/FlowNoBackground.png"
              alt="CONKA Flow bottle"
              fill
              sizes="(max-width: 1024px) 80px, 128px"
              className="object-contain scale-150"
            />
          </div>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
            style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "rgb(180, 83, 9)" }}
          >
            ☀️ Morning
          </span>
          <p className="text-sm lg:text-base font-semibold text-black">CONKA Flow</p>
          <p className="text-[11px] lg:text-xs text-black/40 mt-1 mb-3">
            Lemon Balm · Ashwagandha · +4 more ingredients
          </p>
          <IngredientsButton
            product="flow"
            onClick={() => openIngredients("flow")}
            className="w-full px-3 text-xs mt-auto"
            iconSize={12}
          />
        </div>

        {/* Clear */}
        <div className="flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-white border border-black/6 p-4 lg:p-6">
          <div className="relative w-20 h-44 lg:w-32 lg:h-64 mb-3">
            <Image
              src="/formulas/conkaClear/ClearNoBackground.png"
              alt="CONKA Clear bottle"
              fill
              sizes="(max-width: 1024px) 80px, 128px"
              className="object-contain scale-150"
            />
          </div>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
            style={{ backgroundColor: "rgba(14, 165, 233, 0.1)", color: "rgb(3, 105, 161)" }}
          >
            ☀️ Afternoon
          </span>
          <p className="text-sm lg:text-base font-semibold text-black">CONKA Clear</p>
          <p className="text-[11px] lg:text-xs text-black/40 mt-1 mb-3">
            Glutathione · Alpha GPC · +8 more ingredients
          </p>
          <IngredientsButton
            product="clear"
            onClick={() => openIngredients("clear")}
            className="w-full px-3 text-xs mt-auto"
            iconSize={12}
          />
        </div>
      </div>

      <IngredientsPanel
        isOpen={openProduct !== null}
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </>
  );
}
