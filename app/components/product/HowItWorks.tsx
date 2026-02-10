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
    <section
      className="premium-section bg-black text-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="premium-container">
        <header className="text-center mb-12">
          <h2
            id="how-it-works-heading"
            className="premium-section-heading text-white mb-2"
          >
            How {formula.name} Works
          </h2>
          <p className="premium-annotation text-white/70">
            simple, effective, proven
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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
                  <h3 className="premium-heading text-white mb-1 text-lg">
                    {step.title}
                  </h3>
                  <p className="premium-body text-white">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: asset - mobile: no crop, scale down, square; desktop: cover */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={assetSrc}
              alt={`${formula.name} – How it works`}
              fill
              className="object-contain md:object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
