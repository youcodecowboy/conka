"use client";

import Image from "next/image";

export type FormulaId = "01" | "02";

interface FormulaToggleProps {
  /** Currently selected formula. */
  value: FormulaId;
  /** Called when the user selects a formula. */
  onChange: (formula: FormulaId) => void;
  /** Optional class name for the wrapper. */
  className?: string;
  /** Accessible label for the toggle group. */
  ariaLabel?: string;
}

export default function FormulaToggle({
  value,
  onChange,
  className = "",
  ariaLabel = "Choose formula",
}: FormulaToggleProps) {
  return (
    <div
      className={`flex gap-3 flex-shrink-0 ${className}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => onChange("01")}
          className={`flex items-center justify-center w-24 h-24 rounded-[var(--premium-radius-nested)] bg-white border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] transition-all ${
            value === "01"
              ? "border-[var(--color-ink)] opacity-100"
              : "border-[var(--color-premium-stroke)] opacity-60 hover:opacity-80"
          }`}
          aria-pressed={value === "01"}
        >
          <span className="relative w-14 h-16 flex-shrink-0">
            <Image
              src="/formulas/conkaFlow/FlowNoBackground.png"
              alt=""
              fill
              className="object-contain object-center scale-110"
              sizes="56px"
              aria-hidden
            />
          </span>
        </button>
        <span className="mt-1.5 text-xs font-semibold text-center text-[var(--text-on-light)]">
          CONKA Flow
        </span>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => onChange("02")}
          className={`flex items-center justify-center w-24 h-24 rounded-[var(--premium-radius-nested)] bg-white border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] transition-all ${
            value === "02"
              ? "border-[var(--color-ink)] opacity-100"
              : "border-[var(--color-premium-stroke)] opacity-60 hover:opacity-80"
          }`}
          aria-pressed={value === "02"}
        >
          <span className="relative w-14 h-16 flex-shrink-0">
            <Image
              src="/formulas/conkaClear/ClearNoBackground.png"
              alt=""
              fill
              className="object-contain object-center scale-110"
              sizes="56px"
              aria-hidden
            />
          </span>
        </button>
        <span className="mt-1.5 text-xs font-semibold text-center text-[var(--text-on-light)]">
          CONKA Clear
        </span>
      </div>
    </div>
  );
}
