"use client";

import Link from "next/link";
import Image from "next/image";
import {
  formulaContent,
  formulaPricing,
  FORMULA_COLORS,
  FormulaId,
} from "@/app/lib/productData";

// Product images mapping
const formulaImages: Record<
  FormulaId,
  { src: string; alt: string; focalX: number; focalY: number }
> = {
  "01": {
    src: "/CONKA_01.jpg",
    alt: "CONKA Flow bottle - Caffeine-Free Focus",
    focalX: 50,
    focalY: 50,
  },
  "02": {
    src: "/CONKA_06.jpg",
    alt: "CONKA Clarity bottle - Peak Performance Boost",
    focalX: 50,
    focalY: 50,
  },
};

// Build formulas array from formulaContent
const formulas = (["01", "02"] as FormulaId[]).map((id) => {
  const content = formulaContent[id];
  const colors = FORMULA_COLORS[id];

  // Get top 3 benefits as stats
  const stats = content.benefits.slice(0, 3).map((benefit) => ({
    label: benefit.title,
    value: benefit.stat,
    source: benefit.annotation,
    description: benefit.description,
  }));

  // Get first 3 key points
  const keyPoints = content.keyPoints.slice(0, 3);

  return {
    id,
    name: content.name,
    subtitle: content.tagline,
    description: content.subheadline, // Use subheadline from productData
    headline: content.headline, // Keep headline for reference
    accentColor: colors.hex,
    bgColor: colors.bg,
    stats,
    keyPoints,
    startingPrice: `From £${formulaPricing["one-time"]["4"].price.toFixed(2)}`,
    href: id === "01" ? "/conka-flow" : "/conka-clarity",
    image: formulaImages[id],
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

        {/* Formulas Grid - Split Screen Layout */}
        <div className="space-y-12 md:space-y-16">
          {formulas.map((formula) => (
            <div
              key={formula.id}
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
            >
              {/* Image Section - Left on desktop, top on mobile */}
              <div className="w-full lg:w-2/5">
                <Link
                  href={formula.href}
                  className="block relative w-full aspect-[3/4] lg:aspect-[2/3] rounded-lg overflow-hidden hover:opacity-90 transition-opacity neo-box"
                >
                  <Image
                    src={formula.image.src}
                    alt={formula.image.alt}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
                    }}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={formula.id === "01"}
                  />
                </Link>
              </div>

              {/* Content Section - Right on desktop, bottom on mobile */}
              <div className="w-full lg:w-3/5 flex flex-col">
                <div className="neo-box p-6 md:p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 ${formula.bgColor} text-white rounded-md flex items-center justify-center flex-shrink-0`}
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
                  <p className="text-base md:text-lg mb-6 opacity-80">
                    {formula.description}
                  </p>

                  {/* Key Benefits - Cleaner 2-column layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {formula.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-baseline gap-2 mb-1">
                          <p
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: formula.accentColor }}
                          >
                            {stat.value}
                          </p>
                        </div>
                        <p className="font-clinical text-sm font-semibold mb-1">
                          {stat.label}
                        </p>
                        <p className="font-clinical text-xs opacity-70">
                          {stat.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Points */}
                  <ul className="space-y-3 mb-6 md:mb-8">
                    {formula.keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 font-clinical text-sm md:text-base"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t-2 border-current border-opacity-10 mt-auto">
                    <span className="font-clinical text-sm opacity-70">
                      {formula.startingPrice}
                    </span>
                    <Link
                      href={formula.href}
                      className="neo-button px-6 md:px-8 py-3 rounded-lg lg:rounded-full font-bold text-sm md:text-base inline-flex items-center gap-2 w-full sm:w-auto justify-center hover:shadow-[4px_4px_0px_0px_var(--foreground)] transition-all"
                    >
                      Shop {formula.name}
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
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
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
