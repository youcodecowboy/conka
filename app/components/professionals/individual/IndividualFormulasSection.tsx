"use client";

import { TeamFormulaCard } from "@/app/components/professionals/team";
import type { B2BTier } from "@/app/lib/productData";
import type { B2BNextTierInfo } from "@/app/components/professionals/team/types";

interface IndividualFormulasSectionProps {
  flowPurchaseType: "subscription" | "one-time";
  flowQuantity: number;
  clearPurchaseType: "subscription" | "one-time";
  clearQuantity: number;
  onFlowPurchaseTypeChange: (type: "subscription" | "one-time") => void;
  onFlowQuantityChange: (quantity: number) => void;
  onClearPurchaseTypeChange: (type: "subscription" | "one-time") => void;
  onClearQuantityChange: (quantity: number) => void;
  onFlowAddToCart: () => void;
  onClearAddToCart: () => void;
  /** B2B tier from cart total + pending (so formulas show correct volume pricing) */
  flowTier?: B2BTier;
  flowNextTier?: B2BNextTierInfo | null;
  clearTier?: B2BTier;
  clearNextTier?: B2BNextTierInfo | null;
}

export default function IndividualFormulasSection({
  flowPurchaseType,
  flowQuantity,
  clearPurchaseType,
  clearQuantity,
  onFlowPurchaseTypeChange,
  onFlowQuantityChange,
  onClearPurchaseTypeChange,
  onClearQuantityChange,
  onFlowAddToCart,
  onClearAddToCart,
  flowTier,
  flowNextTier,
  clearTier,
  clearNextTier,
}: IndividualFormulasSectionProps) {
  return (
    <section className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Individual formulas
          </h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Purchase individual formulas separately (28 shots per box)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <TeamFormulaCard
            formulaId="01"
            selectedPurchaseType={flowPurchaseType}
            quantity={flowQuantity}
            tier={flowTier}
            nextTier={flowNextTier}
            onPurchaseTypeChange={onFlowPurchaseTypeChange}
            onQuantityChange={onFlowQuantityChange}
            onAddToCart={onFlowAddToCart}
          />
          <TeamFormulaCard
            formulaId="02"
            selectedPurchaseType={clearPurchaseType}
            quantity={clearQuantity}
            tier={clearTier}
            nextTier={clearNextTier}
            onPurchaseTypeChange={onClearPurchaseTypeChange}
            onQuantityChange={onClearQuantityChange}
            onAddToCart={onClearAddToCart}
          />
        </div>
      </div>
    </section>
  );
}
