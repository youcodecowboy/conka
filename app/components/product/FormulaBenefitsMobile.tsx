"use client";

import { useState } from "react";
import {
  FormulaId,
  StruggleId,
  STRUGGLE_OPTIONS,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";
import { StruggleIcon } from "./StruggleIcons";

interface FormulaBenefitsMobileProps {
  formulaId: FormulaId;
}

export default function FormulaBenefitsMobile({ formulaId }: FormulaBenefitsMobileProps) {
  const [selectedStruggle, setSelectedStruggle] = useState<StruggleId | null>(null);
  const [showClinicalStudy, setShowClinicalStudy] = useState(false);

  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  const currentSolution = selectedStruggle
    ? formula.struggleSolutions[selectedStruggle]
    : null;

  return (
    <section className="premium-section" aria-labelledby="benefits-mobile-heading">
      <div className="premium-container">
        <div className="text-center premium-stack-m">
          <h2 id="proof-and-science-heading" className="premium-section-heading premium-stack-s">
            Research by benefit
          </h2>
          <p className="premium-annotation opacity-70">Pick a focus to explore the research</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
        {STRUGGLE_OPTIONS.map((struggle) => {
          const isSelected = selectedStruggle === struggle.id;
          return (
            <button
              key={struggle.id}
              onClick={() => setSelectedStruggle(isSelected ? null : struggle.id)}
              className={`py-3 px-2 rounded-[var(--premium-radius-base)] flex flex-col items-center gap-1 transition-all ${
                isSelected
                  ? "bg-black text-white"
                  : "border-2 border-[var(--premium-border-color)] hover:border-black/30"
              }`}
            >
              <StruggleIcon icon={struggle.icon} className="w-[18px] h-[18px]" />
              <span className="premium-data text-xs">{struggle.label}</span>
            </button>
          );
        })}
      </div>

      {currentSolution && (
        <div className="premium-box overflow-hidden animate-slide-up">
          {/* Solution Header */}
          <div className={`p-4 ${accentColor.bg} text-white`}>
            <div className="flex items-center gap-2 mb-2">
              <StruggleIcon icon={STRUGGLE_OPTIONS.find(s => s.id === selectedStruggle)?.icon || ""} className="w-[18px] h-[18px]" />
              <span className="font-clinical text-xs uppercase opacity-80">
                {currentSolution.question}
              </span>
            </div>
            <h3 className="text-lg font-bold">{currentSolution.title}</h3>
          </div>

          {/* Solution Content */}
          <div className="p-4 space-y-4">
            {/* Primary Stat */}
            <div className="flex items-center gap-4">
              <span className={`text-3xl font-bold ${accentColor.text}`}>
                {currentSolution.stat}
              </span>
              <span className="font-clinical text-sm opacity-70">
                {currentSolution.statLabel}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm opacity-80">{currentSolution.description}</p>

            {/* Key Ingredients */}
            <div>
              <p className="font-clinical text-xs uppercase opacity-50 mb-2">Key Ingredients</p>
              <div className="flex flex-wrap gap-2">
                {currentSolution.keyIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-current/10 rounded-full font-clinical text-xs"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Study - Collapsible */}
            <div className="border-t border-current/10 pt-4">
              <button
                onClick={() => setShowClinicalStudy(!showClinicalStudy)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-bold text-sm">View Clinical Research</span>
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
                  className={`transition-transform ${showClinicalStudy ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showClinicalStudy && currentSolution.clinicalStudy && (
                <div className="mt-4 p-3 bg-current/5 rounded-lg space-y-3">
                  <div>
                    <p className="font-bold text-sm">{currentSolution.clinicalStudy.name}</p>
                    <p className="font-clinical text-xs opacity-70">
                      {currentSolution.clinicalStudy.university} • {currentSolution.clinicalStudy.year}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <p className="font-clinical text-xs opacity-50">Participants</p>
                      <p className="font-bold text-sm">{currentSolution.clinicalStudy.participants.total}</p>
                    </div>
                    <div>
                      <p className="font-clinical text-xs opacity-50">Duration</p>
                      <p className="font-bold text-sm">{currentSolution.clinicalStudy.duration}</p>
                    </div>
                  </div>

                  <p className="text-xs opacity-80">{currentSolution.clinicalStudy.conclusion}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

        {!selectedStruggle && (
          <p className="text-center premium-data text-sm opacity-50 mt-4">
            Tap a challenge above to see how we can help
          </p>
        )}
      </div>
    </section>
  );
}

