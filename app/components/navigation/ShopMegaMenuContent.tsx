"use client";

import { formulas } from "@/app/components/shop/formulasShowcaseData";
import FormulaCardCompact from "./FormulaCardCompact";
import ProtocolCard from "./ProtocolCard";
import type { ShopMegaMenuContentProps } from "./types";

export default function ShopMegaMenuContent({
  hoveredSection,
  onNavigate,
}: ShopMegaMenuContentProps) {
  return (
    <div className="flex-1 min-w-0">
      {/* Shop by Protocol - Default/Expanded */}
      {hoveredSection === "protocols" && (
        <div>
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-2">Protocols</h3>
            <p className="font-clinical text-base opacity-70">
              Mixed plans combining CONKA Flow and CONKA Clear for maximum performance
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6 items-stretch">
            {(["1", "2", "3", "4"] as const).map((protocolId) => (
              <ProtocolCard
                key={protocolId}
                protocolId={protocolId}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Shop by Individual Formula - Expanded */}
      {hoveredSection === "formulas" && (
        <div>
          <div className="mb-6">
            <h3 className="font-bold text-xl mb-2">Individual Formulas</h3>
            <p className="font-clinical text-base opacity-70">
              Order CONKA Flow or CONKA Clear separately
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {formulas.map((formula) => (
              <FormulaCardCompact
                key={formula.id}
                formula={formula}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      )}

      {/* Help me Choose - Expanded */}
      {hoveredSection === "quiz" && (
        <div className="grid grid-cols-2 gap-8 min-h-[400px]">
          {/* Left: Quiz Section */}
          <div className="flex items-center pr-8">
            <div className="w-full p-8 bg-[var(--foreground)] text-[var(--background)] rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg text-white">Find Your Protocol</p>
                    <span className="px-2 py-0.5 bg-green-500 text-white font-clinical text-xs font-bold rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="font-clinical text-sm opacity-80 text-white">
                    Take our 2-minute quiz to find your perfect match.
                  </p>
                </div>
              </div>
              <a
                href="/quiz"
                onClick={onNavigate}
                className="block w-full py-3 px-6 bg-[#f59e0b] text-black font-bold text-base rounded-full hover:bg-[#d97706] transition-colors text-center"
              >
                Take the Quiz
              </a>
            </div>
          </div>

          {/* Right: Learn More Section */}
          <div className="flex flex-col justify-center pl-8">
            <h3 className="font-bold text-xl mb-4">Learn more</h3>
            <div className="flex flex-col gap-3">
              <a
                href="/ingredients"
                onClick={onNavigate}
                className="font-clinical text-sm py-2 px-4 border-2 border-current/20 rounded-lg hover:border-current hover:bg-current/5 transition-all"
              >
                What is in CONKA Flow and CONKA Clear?
              </a>
              <a
                href="/why-conka"
                onClick={onNavigate}
                className="font-clinical text-sm py-2 px-4 border-2 border-current/20 rounded-lg hover:border-current hover:bg-current/5 transition-all"
              >
                Why CONKA?
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
