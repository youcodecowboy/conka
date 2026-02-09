"use client";

import { FormulaId, FORMULA_COLORS } from "@/app/lib/productData";
import { whatToExpectByFormula } from "@/app/lib/whatToExpectData";

const FORMULA_GRADIENT: Record<FormulaId, string> = {
  "01": "linear-gradient(90deg, #ffde59 0%, #ff914d 100%)",
  "02": "linear-gradient(90deg, #cdffd8 0%, #94b9ff 100%)",
};

interface WhatToExpectTimelineProps {
  formulaId: FormulaId;
}

export default function WhatToExpectTimeline({ formulaId }: WhatToExpectTimelineProps) {
  const steps = whatToExpectByFormula[formulaId];
  const accentHex = FORMULA_COLORS[formulaId].hex;
  const gradient = FORMULA_GRADIENT[formulaId];

  return (
    <section className="premium-section px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto lg:max-w-[1600px]">
        <header className="text-center mb-8 md:mb-10">
          <h2 className="premium-heading mb-2">What to expect</h2>
          <p className="premium-annotation opacity-70">your transformation timeline</p>
        </header>

        {/* Desktop: rail + 5 cards */}
        <div className="hidden lg:block">
          <div className="relative flex mb-0">
            <span
              className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-[var(--premium-border-color)]"
              aria-hidden
            />
            {steps.map((_, i) => (
              <div key={i} className="flex-1 flex justify-center">
                <span
                  className="relative z-10 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: accentHex }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-3 mt-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-black/10 bg-white p-4 flex flex-col min-h-[200px] text-black transition-[background] duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.background = gradient)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                <p
                  className="premium-data uppercase tracking-wider text-xs font-medium mb-1.5"
                  style={{ color: accentHex }}
                >
                  {step.subheading}
                </p>
                <h3 className="premium-heading text-base md:text-lg leading-snug mb-2">
                  {step.heading}
                </h3>
                <p className="premium-body text-sm leading-relaxed opacity-90">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical list with dot + line */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-black/10 bg-white p-4">
              <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                <span
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: accentHex }}
                  aria-hidden
                />
                {i < steps.length - 1 && (
                  <span
                    className="w-px flex-1 min-h-[12px] mt-2 bg-[var(--premium-border-color)]"
                    aria-hidden
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="premium-data uppercase tracking-wider text-xs font-medium mb-1.5"
                  style={{ color: accentHex }}
                >
                  {step.subheading}
                </p>
                <h3 className="premium-heading text-lg leading-snug mb-2">{step.heading}</h3>
                <p className="premium-body text-sm leading-relaxed opacity-90">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
