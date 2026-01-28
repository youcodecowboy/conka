"use client";

import { FormulaId } from "@/app/lib/productData";
import FormulaPurchaseCard from "./FormulaPurchaseCard";

export default function FormulasSection() {
  const formulaIds: FormulaId[] = ["01", "02"];

  return (
    <section className="px-6 md:px-16 py-12 md:py-16 border-t-2 border-current/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Individual Formulas
          </h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Purchase individual formulas separately
          </p>
        </div>

        {/* Formula Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {formulaIds.map((formulaId) => (
            <FormulaPurchaseCard key={formulaId} formulaId={formulaId} />
          ))}
        </div>
      </div>
    </section>
  );
}
