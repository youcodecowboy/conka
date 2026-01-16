"use client";

import { formulas } from "./formulasShowcaseData";
import FormulaPanel from "./FormulaPanel";

export default function FormulasShowcaseDesktop() {
  return (
    <section className="px-16 pt-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <p className="font-commentary text-lg opacity-80 mb-3">
            Most first-time customers start here
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            Individual Formulas
          </h2>
          <p className="font-clinical text-lg md:text-xl opacity-70">
            Start simple. Feel the difference.
          </p>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-2 gap-12">
          {formulas.map((formula) => (
            <FormulaPanel key={formula.id} formula={formula} />
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-12 text-center">
          <p className="font-commentary text-lg opacity-70">
            both formulas work together synergistically
          </p>
        </div>
      </div>
    </section>
  );
}
