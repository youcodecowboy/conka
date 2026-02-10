"use client";

import { useState, useRef, useEffect } from "react";
import { FormulaId, formulaContent, StruggleId } from "@/app/lib/productData";
import StruggleSelector from "./StruggleSelector";
import SolutionSlide from "./SolutionSlide";
import ClinicalStudyCard from "./ClinicalStudyCard";

interface FormulaBenefitsProps {
  formulaId: FormulaId;
}

export default function FormulaBenefits({ formulaId }: FormulaBenefitsProps) {
  const formula = formulaContent[formulaId];
  const [selectedStruggle, setSelectedStruggle] = useState<StruggleId | null>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  // Scroll to solution when struggle is selected
  useEffect(() => {
    if (selectedStruggle && solutionRef.current) {
      setTimeout(() => {
        solutionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedStruggle]);

  const handleSelectStruggle = (struggle: StruggleId | null) => {
    setSelectedStruggle(struggle);
  };

  // Get the current solution's clinical study if a struggle is selected
  const currentStudy = selectedStruggle
    ? formula.struggleSolutions[selectedStruggle].clinicalStudy
    : null;

  return (
    <>
      <StruggleSelector
        formulaId={formulaId}
        selectedStruggle={selectedStruggle}
        onSelectStruggle={handleSelectStruggle}
      />

      {/* Solution Slide - Shows when a struggle is selected */}
      {selectedStruggle && (
        <div ref={solutionRef}>
          <SolutionSlide formulaId={formulaId} struggleId={selectedStruggle} />
        </div>
      )}

      {/* Clinical Study Details - only when a struggle is selected */}
      {selectedStruggle && currentStudy && (
        <div className="premium-section">
          <div className="premium-container">
            <div className="text-center mb-10">
              <h2 className="premium-heading mb-2">
                Clinical Study Details
              </h2>
              <p className="premium-annotation opacity-70">
                the research behind this solution
              </p>
            </div>
            <ClinicalStudyCard study={currentStudy} formulaId={formulaId} />
          </div>
        </div>
      )}
    </>
  );
}
