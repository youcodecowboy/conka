"use client";

import { formulas } from "./formulasShowcaseData";
import FormulaPanel from "./FormulaPanel";

export default function FormulasShowcaseDesktop() {
  return (
    <section className="px-16 pt-12 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-left">
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
      </div>
    </section>
  );
}
