"use client";

import Image from "next/image";
import {
  FormulaId,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";

const FORMULA_ASSETS: Record<FormulaId, string> = {
  "01": "/formulas/conkaFlow/FlowTaste.jpg",
  "02": "/formulas/conkaClear/ClearTaste.jpg",
};

const STEPS: Record<
  FormulaId,
  Array<{ number: string; title: string; description: string }>
> = {
  "01": [
    {
      number: "01",
      title: "Choose Your Pack",
      description:
        "Select between 4, 12, or 28 shots based on your usage needs.",
    },
    {
      number: "02",
      title: "Take Daily",
      description:
        "Best taken in the morning with or without food. Perfect as a coffee replacement for sustained energy throughout the day.",
    },
    {
      number: "03",
      title: "Feel the Difference",
      description:
        "Consistent use unlocks calmer focus, better resilience, and the clarity you deserve.",
    },
  ],
  "02": [
    {
      number: "01",
      title: "Choose Your Pack",
      description:
        "Select between 4, 12, or 28 shots based on your usage needs.",
    },
    {
      number: "02",
      title: "Take Daily",
      description:
        "Best taken 30-60 minutes before you need peak performance, or in the evening to support decision-making and recovery.",
    },
    {
      number: "03",
      title: "Feel the Difference",
      description:
        "Consistent use unlocks sharper focus, lasting mental clarity, and the performance edge you deserve.",
    },
  ],
};

interface HowItWorksProps {
  formulaId: FormulaId;
}

export default function HowItWorks({ formulaId }: HowItWorksProps) {
  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];
  const steps = STEPS[formulaId];
  const assetSrc = FORMULA_ASSETS[formulaId];

  return (
    <>
      <header className="text-center mb-12 text-[var(--text-on-light)]">
        <h2
          id="how-it-works-heading"
          className="premium-section-heading mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          How {formula.name} Works
        </h2>
        <p className="premium-annotation opacity-90">
          simple, effective, proven
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start text-[var(--text-on-light)]">
          {/* Left: vertical 3-step section */}
          <div className="flex flex-col gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div
                  className={`w-14 h-14 shrink-0 ${accentColor.bg} text-white rounded-full flex items-center justify-center`}
                >
                  <span className="font-clinical text-lg font-bold">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="premium-heading mb-1 text-lg">
                    {step.title}
                  </h3>
                  <p className="premium-body opacity-90">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: assets — mobile/tablet: single square; desktop (lg): sticky column with primary + 2 placeholders (WhatToExpectDesktop-style) */}
          {/* Mobile/tablet: single square image */}
          <div
            className="relative w-full aspect-square overflow-hidden lg:hidden"
            style={{ borderRadius: "var(--premium-radius-card)" }}
          >
            <Image
              src={assetSrc}
              alt={`${formula.name} – How it works`}
              fill
              className="object-contain md:object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Desktop (lg): sticky column — primary rectangular + 2 placeholders */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <div className="space-y-4">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--premium-radius-card)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
              >
                <Image
                  src={assetSrc}
                  alt={`${formula.name} – How it works`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={false}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div
                  className="relative aspect-square overflow-hidden rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
                  aria-hidden
                />
                <div
                  className="relative aspect-square overflow-hidden rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
