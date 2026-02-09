"use client";

import { FormulaId, FORMULA_COLORS } from "@/app/lib/productData";
import { whatToExpectByFormula } from "@/app/lib/whatToExpectData";

interface WhatToExpectTimelineProps {
  formulaId: FormulaId;
}

export default function WhatToExpectTimeline({ formulaId }: WhatToExpectTimelineProps) {
  const steps = whatToExpectByFormula[formulaId];
  const accentHex = FORMULA_COLORS[formulaId].hex;
  const lineColor = "var(--premium-border-color)";

  return (
    <section className="premium-section">
      <div className="premium-container">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="premium-heading mb-2">What to expect</h2>
          <p className="premium-annotation opacity-70">
            your transformation timeline
          </p>
        </div>

        {/* Desktop (lg): horizontal timeline rail with connecting line + dots, then cards in a row */}
        <div className="hidden lg:block">
          {/* Rail: line runs through dot centers */}
          <div className="relative flex mb-6">
            <span
              className="absolute top-1/2 left-[10%] right-[10%] h-0.5 -translate-y-1/2"
              style={{ backgroundColor: lineColor }}
              aria-hidden
            />
            {steps.map((_, index) => (
              <div key={index} className="flex-1 flex justify-center">
                <span
                  className="relative z-10 w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentHex }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="min-w-0">
                <p className="premium-data uppercase tracking-wider text-xs opacity-80 mb-1.5">
                  {step.subheading}
                </p>
                <h3 className="premium-heading text-lg md:text-xl mb-3 leading-snug">
                  {step.heading}
                </h3>
                <p className="premium-body text-sm md:text-base opacity-90 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & tablet: single column with vertical line connecting all dots */}
        <div className="lg:hidden relative pl-5">
          {/* Vertical line behind dots */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ backgroundColor: lineColor }}
            aria-hidden
          />
          {steps.map((step, index) => (
            <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
              <span
                className="relative z-10 w-4 h-4 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: accentHex }}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <p className="premium-data uppercase tracking-wider text-xs opacity-80 mb-1.5">
                  {step.subheading}
                </p>
                <h3 className="premium-heading text-lg md:text-xl mb-3 leading-snug">
                  {step.heading}
                </h3>
                <p className="premium-body text-sm md:text-base opacity-90 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
