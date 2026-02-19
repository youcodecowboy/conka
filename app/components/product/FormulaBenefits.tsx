"use client";

import { useState } from "react";
import { FormulaId, StruggleId } from "@/app/lib/productData";
import BenefitList from "./BenefitList";
import BenefitDetail from "./BenefitDetail";

interface FormulaBenefitsProps {
  formulaId: FormulaId;
}

export default function FormulaBenefits({ formulaId }: FormulaBenefitsProps) {
  const [selectedStruggle, setSelectedStruggle] = useState<StruggleId>("focus");

  return (
    <div>
      {/* Heading block */}
      <div className="text-right mb-10">
        <h2
          className="premium-section-heading text-[var(--color-ink)]"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What you'll actually feel.
        </h2>
        <p className="premium-section-subtitle mt-2 text-[var(--color-ink)]">
          Select a benefit to see the evidence behind it.
        </p>
      </div>

      {/* Two-column grid layout */}
      <div className="grid lg:grid-cols-[38%_1fr] gap-8 items-start">
        {/* Left: Benefit List (sticky on desktop) */}
        <div className="lg:sticky lg:top-8">
          <BenefitList
            formulaId={formulaId}
            selectedStruggle={selectedStruggle}
            onSelect={setSelectedStruggle}
          />
        </div>

        {/* Right: Benefit Detail (updates in-place) */}
        <div aria-live="polite">
          <BenefitDetail formulaId={formulaId} struggleId={selectedStruggle} />
        </div>
      </div>
    </div>
  );
}
