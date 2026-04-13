"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import IngredientsPanel from "./IngredientsPanel";
import IngredientsButton from "./IngredientsButton";

interface WhatsInsideProductMiniProps {
  stretch?: boolean;
}

export default function WhatsInsideProductMini({
  stretch = false,
}: WhatsInsideProductMiniProps) {
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
      <div className={`grid grid-cols-2 gap-3 lg:gap-4 ${stretch ? "h-full" : ""}`}>
        {/* Flow */}
        <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
          <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
            <Image
              src="/formulas/conkaFlow/FlowNoBackground.png"
              alt="CONKA Flow bottle"
              fill
              sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
              className="object-contain scale-200"
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
            className="w-full px-3 text-xs"
            iconSize={12}
          />
        </div>

        {/* Clear */}
        <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
          <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
            <Image
              src="/formulas/conkaClear/ClearNoBackground.png"
              alt="CONKA Clear bottle"
              fill
              sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
              className="object-contain scale-200"
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
            className="w-full px-3 text-xs"
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
