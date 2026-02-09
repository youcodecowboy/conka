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

      {/* Clinical Study Details Section */}
      <div className="premium-section">
        <div className="premium-container">
          <div className="text-center mb-10">
            <h2 className="premium-heading mb-2">
              Clinical Study Details
            </h2>
            <p className="premium-annotation opacity-70">
              {selectedStruggle
                ? "the research behind this solution"
                : "select a challenge above to see related research"}
            </p>
          </div>

          {currentStudy ? (
            <ClinicalStudyCard study={currentStudy} formulaId={formulaId} />
          ) : (
            <div className="premium-box overflow-hidden">
              <div className="p-6 border-b-2 bg-black/5 border-black/10">
                <h3 className="premium-heading text-xl">Research Overview</h3>
                <p className="premium-annotation text-sm opacity-70 mt-1">
                  our commitment to science-backed formulations
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-black/10">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    </div>
                    <p className="font-clinical text-3xl font-bold">125</p>
                    <p className="font-clinical text-xs opacity-70">Clinical Trials</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-black/10">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <p className="font-clinical text-3xl font-bold">£500k+</p>
                    <p className="font-clinical text-xs opacity-70">Research Investment</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-black/10">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <p className="font-clinical text-3xl font-bold">2,500+</p>
                    <p className="font-clinical text-xs opacity-70">Participants</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-black/10">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <p className="font-clinical text-3xl font-bold">GB2620279</p>
                    <p className="font-clinical text-xs opacity-70">Patent Number</p>
                  </div>
                </div>

                {/* Prompt to select */}
                <div className="p-6 rounded-lg text-center bg-black/5">
                  <svg
                    className="w-8 h-8 mx-auto mb-3 opacity-40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <p className="font-commentary text-base opacity-60">
                    Select a challenge above to explore detailed clinical research
                    <br />
                    specific to that area of improvement
                  </p>
                </div>

                {/* Universities Footer */}
                <div className="mt-8 pt-6 border-t border-current border-opacity-10">
                  <p className="font-clinical text-xs uppercase opacity-50 text-center mb-4">
                    Research Partners
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 opacity-60">
                    <span className="font-clinical text-sm">University of Exeter</span>
                    <span className="font-clinical text-sm">•</span>
                    <span className="font-clinical text-sm">Oxford Brookes</span>
                    <span className="font-clinical text-sm">•</span>
                    <span className="font-clinical text-sm">Imperial College London</span>
                    <span className="font-clinical text-sm">•</span>
                    <span className="font-clinical text-sm">UCL</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
