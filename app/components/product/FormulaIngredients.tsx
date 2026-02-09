"use client";

import Image from "next/image";
import { FormulaId } from "@/app/lib/productData";

/** Asset paths: [ingredients image, secondary image (taste or essentials)] */
const FORMULA_ASSETS: Record<
  FormulaId,
  [string, string]
> = {
  "01": [
    "/formulas/conkaFlow/FlowIngredients.jpg",
    "/formulas/conkaFlow/FlowTaste.jpg",
  ],
  "02": [
    "/formulas/conkaClear/ClearIngredients.jpg",
    "/formulas/conkaClear/ClearEssentials.jpg",
  ],
};

const ASSET_ALTS: Record<FormulaId, [string, string]> = {
  "01": [
    "CONKA Flow ingredients – 6 high-quality ingredients optimised for impact",
    "CONKA Flow taste – That's what CONKA tastes like",
  ],
  "02": [
    "CONKA Clear ingredients – high-quality ingredients optimised for impact",
    "CONKA Clear essentials – only the essentials, no unexpected extras",
  ],
};

interface FormulaIngredientsProps {
  formulaId: FormulaId;
}

export default function FormulaIngredients({ formulaId }: FormulaIngredientsProps) {
  const [ingredientsSrc, secondarySrc] = FORMULA_ASSETS[formulaId];
  const [ingredientsAlt, secondaryAlt] = ASSET_ALTS[formulaId];

  return (
    <section className="premium-section" aria-labelledby="ingredients-taste-heading">
      <div className="premium-container">
        <div className="mb-8 md:mb-10">
          <h2 id="ingredients-taste-heading" className="premium-heading mb-2">
            Ingredients & Taste
          </h2>
          <p className="premium-annotation">what&apos;s inside</p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 items-center"
          style={{
            gap: "var(--premium-space-l)",
          }}
        >
          <div
            className="relative w-full aspect-square overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-base)" }}
          >
            <Image
              src={ingredientsSrc}
              alt={ingredientsAlt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={false}
            />
          </div>
          <div
            className="relative w-full aspect-square overflow-hidden"
            style={{ borderRadius: "var(--premium-radius-base)" }}
          >
            <Image
              src={secondarySrc}
              alt={secondaryAlt}
              fill
              className="object-contain object-center"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
