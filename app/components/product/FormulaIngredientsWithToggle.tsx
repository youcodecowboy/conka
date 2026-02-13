"use client";

import { useState } from "react";
import Image from "next/image";
import type { FormulaId } from "@/app/lib/productData";
import { formulaContent } from "@/app/lib/formulaContent";
import FormulaIngredients from "./FormulaIngredients";

const FORMULA_IDS: FormulaId[] = ["01", "02"];

const FORMULA_IMAGE: Record<FormulaId, string> = {
  "01": "/CONKA_01.jpg", // CONKA Flow
  "02": "/CONKA_06.jpg", // CONKA Clear
};

export default function FormulaIngredientsWithToggle() {
  const [formulaId, setFormulaId] = useState<FormulaId>("01");

  return (
    <>
      {/* Formula toggle: desktop = white tile (square image + text), mobile = text-only buttons */}
      <div
        className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8"
        role="tablist"
        aria-label="Select formula"
      >
        {FORMULA_IDS.map((id) => {
          const content = formulaContent[id];
          const isActive = formulaId === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="formula-ingredients-heading"
              id={`formula-tab-${id}`}
              onClick={() => setFormulaId(id)}
              className={
                [
                  "transition-all border-2 rounded-lg",
                  "inline-flex items-center justify-center px-5 py-2.5 font-semibold text-sm",
                  "md:flex-col md:items-stretch md:p-0 md:bg-white md:rounded-xl md:overflow-hidden md:text-[var(--foreground)]",
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] md:bg-white md:border-[var(--foreground)]"
                    : "bg-transparent text-[var(--foreground)] border-[var(--color-premium-stroke)] hover:border-[var(--foreground)]/40 md:border-[var(--color-premium-stroke)] md:hover:border-black/30",
                ].join(" ")
              }
            >
              {/* Desktop: zoomed square image, crop evenly from center */}
              <span className="hidden md:block relative w-20 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={FORMULA_IMAGE[id]}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover object-center scale-150"
                />
              </span>
              {/* Label: under image on desktop, inline on mobile */}
              <span className="md:px-3 md:py-2.5 md:text-center md:text-sm">
                {content.name}
              </span>
            </button>
          );
        })}
      </div>

      <FormulaIngredients formulaId={formulaId} />
    </>
  );
}
