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

type StruggleSolution = (typeof formulaContent)[FormulaId]["struggleSolutions"][StruggleId];

interface AccordionRowProps {
  struggle: (typeof STRUGGLE_OPTIONS)[number];
  formulaId: FormulaId;
  solution: StruggleSolution;
  accentColor: (typeof FORMULA_COLORS)[FormulaId];
  isOpen: boolean;
  isLast: boolean;
  onTap: () => void;
}

function AccordionRow({
  struggle,
  solution,
  accentColor,
  isOpen,
  isLast,
  onTap,
}: AccordionRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTap();
    }
  };

  return (
    <div>
      {/* Collapsed header (always visible, tappable) */}
      <button
        onClick={onTap}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`benefit-panel-${struggle.id}`}
        className="w-full flex items-center gap-3 px-5 py-4 transition-colors duration-200"
        style={{
          background: isOpen ? "var(--color-ink)" : "transparent",
          minHeight: "44px",
        }}
      >
        {/* Icon */}
        <StruggleIcon
          icon={struggle.icon}
          className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
            isOpen ? accentColor.text : "opacity-50"
          }`}
        />

        {/* Benefit name */}
        <span
          className={`premium-body font-medium transition-colors duration-200 ${
            isOpen ? "text-[var(--color-bone)]" : "text-[var(--color-ink)]"
          }`}
        >
          {struggle.label}
        </span>

        {/* Spacer */}
        <span className="flex-1" />

        {/* Stat — always visible, never hidden */}
        <span
          className={`text-base font-bold mr-3 transition-colors duration-200 ${
            isOpen ? accentColor.text : accentColor.text
          }`}
        >
          {solution.stat}
        </span>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-180 text-[var(--color-bone)]" : "rotate-0 text-[var(--color-ink)]"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded panel */}
      {isOpen && (
        <div
          id={`benefit-panel-${struggle.id}`}
          role="region"
          aria-live="polite"
          key={struggle.id}
          className="px-5 pb-6"
          style={{
            background: "var(--color-ink)",
            animation: "fadeSlideDown 0.3s ease forwards",
          }}
        >
          {/* 1. Struggle question */}
          <p
            className="premium-body-sm uppercase tracking-wider mb-3"
            style={{ color: "var(--color-bone)" }}
          >
            {solution.question}
          </p>

          {/* 2. Big stat + label */}
          <div className="flex items-start gap-2 mb-4">
            <span
              className={`font-bold ${accentColor.text}`}
              style={{
                fontSize: "clamp(3rem, 12vw, 4rem)",
                letterSpacing: "var(--letter-spacing-premium-title)",
                lineHeight: 1,
              }}
            >
              {solution.stat}
            </span>
            <span
              className="premium-body-sm"
              style={{ color: "var(--color-bone)" }}
            >
              {solution.statLabel}
            </span>
          </div>

          {/* 3. Outcome description */}
          <p
            className="premium-body leading-relaxed mb-5"
            style={{ color: "var(--color-bone)" }}
          >
            {solution.description}
          </p>

          {/* 4. Two-stat strip (replaces radar chart on mobile) */}
          {solution.clinicalStudy.results.length >= 2 && (
            <div className="grid grid-cols-2 gap-3 mb-5">
              {solution.clinicalStudy.results.slice(0, 2).map((result, idx) => (
                <div
                  key={idx}
                  className="rounded-[20px] px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p className={`text-2xl font-bold mb-0.5 ${accentColor.text}`}>
                    {result.value}
                  </p>
                  <p
                    className="premium-body-sm leading-tight"
                    style={{ color: "var(--color-bone)" }}
                  >
                    {result.metric}
                  </p>
                  <p
                    className="premium-body-sm mt-1"
                    style={{ color: "var(--color-bone)" }}
                  >
                    {result.pValue}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 5. Study footnote */}
          <p
            className="premium-body-sm"
            style={{ color: "var(--color-bone)" }}
          >
            {solution.clinicalStudy.name} — {solution.clinicalStudy.university},{" "}
            {solution.clinicalStudy.year}
          </p>
        </div>
      )}

      {/* Divider between rows (omit on last row) */}
      {!isLast && (
        <div
          style={{
            height: "1px",
            background: "var(--color-premium-stroke)",
          }}
        />
      )}
    </div>
  );
}

export default function FormulaBenefitsMobile({ formulaId }: FormulaBenefitsMobileProps) {
  const [openStruggle, setOpenStruggle] = useState<StruggleId | null>("focus");

  const formula = formulaContent[formulaId];
  const accentColor = FORMULA_COLORS[formulaId];

  const handleTap = (id: StruggleId) => {
    // Toggle: if clicking the open one, close it; otherwise open the clicked one
    setOpenStruggle(id === openStruggle ? null : id);
  };

  return (
    <div>
      {/* Heading block */}
      <div className="text-left md:text-center mb-8">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What you'll actually feel.
        </h2>
        <p className="premium-section-subtitle mt-2">
          Tap a benefit to see the evidence behind it.
        </p>
      </div>

      {/* Accordion list - breaks out of gutter, full width */}
      <div
        className="overflow-hidden -mx-5 md:-mx-[5vw]"
        style={{
          border: "1px solid var(--color-premium-stroke)",
        }}
      >
        {STRUGGLE_OPTIONS.map((struggle, index) => (
          <AccordionRow
            key={struggle.id}
            struggle={struggle}
            formulaId={formulaId}
            solution={formula.struggleSolutions[struggle.id]}
            accentColor={accentColor}
            isOpen={openStruggle === struggle.id}
            isLast={index === STRUGGLE_OPTIONS.length - 1}
            onTap={() => handleTap(struggle.id)}
          />
        ))}
      </div>
    </div>
  );
}
