"use client";

import Link from "next/link";
import {
  formulaContent,
  formulaPricing,
  FORMULA_COLORS,
  FormulaId,
} from "@/app/lib/productData";

// Build formulas array from formulaContent
const formulas = (["01", "02"] as FormulaId[]).map((id) => {
  const content = formulaContent[id];
  const colors = FORMULA_COLORS[id];

  // Get first 3 benefits as stats
  const stats = content.benefits.slice(0, 3).map((benefit) => ({
    label: benefit.title,
    value: benefit.stat,
    source: benefit.annotation,
  }));

  // Get first 3 key points
  const keyPoints = content.keyPoints.slice(0, 3);

  return {
    id,
    name: content.name,
    subtitle: content.tagline,
    description:
      id === "01"
        ? "Daily adaptogen support with Ashwagandha and Rhodiola builds stress resilience and recovery. Perfect for sustained focus without the crash."
        : "Cognitive enhancers like Alpha GPC and Ginkgo build your neurological foundation. Designed for when you need peak performance.",
    accentColor: colors.hex,
    bgColor: colors.bg,
    borderColor: `border-[${colors.hex}]`,
    stats,
    keyPoints,
    startingPrice: `From £${formulaPricing["one-time"]["4"].price}`,
    href: id === "01" ? "/conka-flow" : "/conka-clarity",
  };
});

export default function FormulasShowcase() {
  return (
    <div className="px-6 md:px-16 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Left aligned on mobile */}
        <div className="mb-8 md:mb-12 text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Individual Formulas
          </h2>
          <p className="font-commentary text-lg md:text-xl">
            build your own stack
          </p>
        </div>

        {/* Formulas Grid */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {formulas.map((formula) => (
            <div
              key={formula.id}
              className="neo-box p-4 md:p-8 flex-1 border-l-4"
              style={{ borderLeftColor: formula.accentColor }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 ${formula.bgColor} text-white rounded-md flex items-center justify-center`}
                >
                  <span className="font-clinical text-sm font-bold">
                    {formula.id}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {formula.name}
                  </h3>
                  <p className="font-commentary text-lg opacity-80">
                    {formula.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base mb-6 opacity-80">{formula.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                {formula.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: formula.accentColor }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-clinical text-[10px] md:text-xs opacity-70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Points */}
              <ul className="space-y-2 mb-6 md:mb-8">
                {formula.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 font-clinical text-xs md:text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: formula.accentColor }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t-2 border-current border-opacity-10">
                <span className="font-clinical text-xs opacity-70">
                  {formula.startingPrice}
                </span>
                <Link
                  href={formula.href}
                  className="neo-button px-4 md:px-6 py-2 md:py-3 rounded-lg lg:rounded-full font-bold text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Shop {formula.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-6 md:mt-8 text-center">
          <p className="font-commentary text-base md:text-lg opacity-70">
            both formulas work together synergistically
          </p>
        </div>
      </div>
    </div>
  );
}
