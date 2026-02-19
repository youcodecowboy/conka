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
        className={`w-full flex flex-col px-5 transition-colors duration-200 ${
          isOpen ? "py-5" : "py-4"
        }`}
        style={{
          background: isOpen ? "var(--color-neuro-blue-dark)" : "transparent",
          color: isOpen ? "#ffffff" : undefined,
        }}
      >
        {/* Row 1: icon + title + stat inline */}
        <div className="flex items-center gap-2 w-full">
          <StruggleIcon
            icon={struggle.icon}
            className={`w-5 h-5 shrink-0 flex items-center justify-center transition-colors duration-200 ${
              isOpen
                ? "opacity-100 text-white"
                : "opacity-30 text-[var(--color-ink)]"
            }`}
          />
          <span
            className={`flex-1 premium-body text-left transition-colors duration-200 ${
              isOpen
                ? "text-white font-semibold"
                : "text-[var(--color-ink)] font-medium"
            }`}
          >
            {struggle.label}
          </span>
          <span
            className={`text-xl font-extrabold shrink-0 transition-colors duration-200 ${
              isOpen ? "text-[var(--color-bone)]" : "text-[var(--color-ink)]"
            }`}
          >
            {solution.stat}
          </span>
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
              isOpen
                ? "rotate-180 text-[var(--color-bone)] opacity-100"
                : "rotate-0 text-[var(--color-ink)] opacity-30"
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Row 2: struggle text — full width */}
        {solution.struggle && (
          <p
            className={`w-full text-left premium-body-sm mt-1 font-normal transition-colors duration-200 ${
              isOpen
                ? "text-white opacity-60"
                : "opacity-50 text-[var(--color-ink)]"
            }`}
          >
            {solution.struggle}
          </p>
        )}
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
            background: "var(--color-neuro-blue-dark)",
            color: "#ffffff",
            animation: "fadeSlideDown 0.3s ease forwards",
          }}
        >
          {/* 1. Outcome headline — first thing read */}
          <h3
            className="text-lg font-bold leading-tight mb-3"
            style={{ color: "var(--color-bone)" }}
          >
            {solution.outcome}
          </h3>

          {/* 2. Hero stat — large, immediate */}
          <div
            className="font-bold font-clinical mb-4"
            style={{
              fontSize: "clamp(2.8rem, 14vw, 3.8rem)",
              lineHeight: 1,
              letterSpacing: "var(--letter-spacing-premium-title)",
              color: "var(--color-bone)",
            }}
          >
            {solution.stat}
          </div>

          {/* 3. One-line mechanism — muted, capped via line clamp */}
          <p
            className="premium-body-sm leading-relaxed mb-4 line-clamp-3"
            style={{ color: "var(--color-bone)", opacity: 0.65 }}
          >
            {solution.description}
          </p>

          {/* 4. Ingredient pill */}
          {solution.ingredientAsset && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                className="premium-body-sm font-medium"
                style={{ color: "var(--color-bone)", opacity: 0.9 }}
              >
                {solution.ingredientAsset.name}
              </span>
              <span
                className="premium-body-sm"
                style={{ color: "var(--color-bone)", opacity: 0.4 }}
              >
                ·
              </span>
              <span
                className="premium-body-sm"
                style={{ color: "var(--color-bone)", opacity: 0.5 }}
              >
                {solution.ingredientAsset.dosage}
              </span>
            </div>
          )}

          {/* 5. Two-stat strip (replaces radar chart on mobile) */}
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

          {/* 6. Study footnote */}
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
  const [openStruggle, setOpenStruggle] = useState<StruggleId | null>(null);

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
