"use client";

import { useState } from "react";
import type { FormulaId } from "@/app/lib/productData";
import { formulaContent } from "@/app/lib/formulaContent";
import FormulaIngredients from "./FormulaIngredients";

const FORMULA_IDS: FormulaId[] = ["01", "02"];

export default function FormulaIngredientsWithToggle() {
  const [formulaId, setFormulaId] = useState<FormulaId>("01");

  return (
    <>
      {/* Formula toggle: pills above the ingredients content */}
      <div
        className="flex flex-wrap items-center gap-2 mb-6 md:mb-8"
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
              className={`px-5 py-2.5 font-semibold text-sm transition-all border-2 rounded-[var(--premium-radius-interactive)] ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "bg-transparent text-[var(--foreground)] border-[var(--color-premium-stroke)] hover:border-[var(--foreground)]/40"
              }`}
            >
              {content.name}
            </button>
          );
        })}
      </div>

      <FormulaIngredients formulaId={formulaId} />
    </>
  );
}
