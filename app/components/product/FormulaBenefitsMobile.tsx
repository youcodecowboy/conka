"use client";

import { useState } from "react";
import {
  FormulaId,
  StruggleId,
  STRUGGLE_OPTIONS,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";

interface FormulaBenefitsMobileProps {
  formulaId: FormulaId;
}

// Icon components for struggles
const StruggleIcon = ({ icon, className = "" }: { icon: string; className?: string }) => {
  switch (icon) {
    case "moon":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    case "bolt":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "battery-low":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
          <line x1="22" y1="11" x2="22" y2="13" />
          <line x1="6" y1="11" x2="6" y2="13" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
        </svg>
      );
    case "brain":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
          <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
          <path d="M6 18a4 4 0 0 1-1.967-.516" />
          <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
      );
    case "target":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    default:
      return null;
  }
};

export default function FormulaBenefitsMobile({ formulaId }: FormulaBenefitsMobileProps) {
  const [selectedStruggle, setSelectedStruggle] = useState<StruggleId | null>(null);
  const [showClinicalStudy, setShowClinicalStudy] = useState(false);

  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  const currentSolution = selectedStruggle
    ? formula.struggleSolutions[selectedStruggle]
    : null;

  return (
    <section className="premium-section">
      <div className="mb-5 text-center">
        <h2 className="premium-heading mb-1">What do you struggle with?</h2>
        <p className="premium-annotation opacity-70">select your challenge</p>
      </div>

      {/* Struggle Selector - 2x3 Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {STRUGGLE_OPTIONS.map((struggle) => {
          const isSelected = selectedStruggle === struggle.id;
          return (
            <button
              key={struggle.id}
              onClick={() => setSelectedStruggle(isSelected ? null : struggle.id)}
              className={`py-3 px-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                isSelected
                  ? "bg-black text-white"
                  : "border-2 border-black/10 hover:border-black/30"
              }`}
            >
              <StruggleIcon icon={struggle.icon} />
              <span className="font-clinical text-xs">{struggle.label}</span>
            </button>
          );
        })}
      </div>

      {currentSolution && (
        <div className="premium-box overflow-hidden animate-slide-up">
          {/* Solution Header */}
          <div className={`p-4 ${accentColor.bg} text-white`}>
            <div className="flex items-center gap-2 mb-2">
              <StruggleIcon icon={STRUGGLE_OPTIONS.find(s => s.id === selectedStruggle)?.icon || ""} />
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

      {/* Helper text when nothing selected */}
      {!selectedStruggle && (
        <p className="text-center font-clinical text-sm opacity-50 mt-4">
          Tap a challenge above to see how we can help
        </p>
      )}
    </section>
  );
}

