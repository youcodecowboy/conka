"use client";

import { useState } from "react";
import { Benefit } from "./KeyBenefits";

interface KeyBenefitsMobileProps {
  benefits: Benefit[];
}

interface AccordionRowProps {
  benefit: Benefit;
  isOpen: boolean;
  isLast: boolean;
  onTap: () => void;
}

function AccordionRow({ benefit, isOpen, isLast, onTap }: AccordionRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTap();
    }
  };

  const breakdown = benefit.clinicalBreakdown;

  return (
    <div>
      {/* Collapsed header (always visible, tappable) */}
      <button
        onClick={onTap}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`benefit-panel-${benefit.id}`}
        className={`w-full flex items-center gap-3 px-5 transition-colors duration-200 ${
          isOpen ? "py-5" : "py-4"
        }`}
        style={{
          background: isOpen ? "var(--color-neuro-blue-dark)" : "transparent",
          color: isOpen ? "#ffffff" : undefined,
        }}
      >
        {/* Icon */}
        {benefit.icon && (
          <span
            className={`w-5 h-5 shrink-0 flex items-center justify-center transition-colors duration-200 ${
              isOpen ? "opacity-100 text-white" : "opacity-30 text-[var(--color-ink)]"
            }`}
          >
            {benefit.icon}
          </span>
        )}

        {/* Benefit title */}
        <span
          className={`premium-body flex-1 text-left transition-colors duration-200 ${
            isOpen
              ? "text-white font-semibold"
              : "text-[var(--color-ink)] font-medium"
          }`}
        >
          {benefit.title}
        </span>

        {/* Spacer */}
        <span className="flex-1 min-w-2" />

        {/* Stat — always visible, strongest visual element */}
        <span
          className={`text-xl font-extrabold mr-3 transition-colors duration-200 ${
            isOpen ? "text-[var(--color-bone)]" : "text-[var(--color-ink)]"
          }`}
        >
          {benefit.stat}
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
            isOpen
              ? "rotate-180 text-[var(--color-bone)] opacity-100"
              : "rotate-0 text-[var(--color-ink)] opacity-30"
          }`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Expanded panel — explicit light text on dark (no inherited colour) */}
      {isOpen && (
        <div
          id={`benefit-panel-${benefit.id}`}
          role="region"
          aria-live="polite"
          key={benefit.id}
          className="px-5 pb-6"
          style={{
            background: "var(--color-neuro-blue-dark)",
            color: "#ffffff",
            animation: "fadeSlideDown 0.3s ease forwards",
          }}
        >
          {/* 1. Annotation (question equivalent) */}
          <p
            className="premium-body-sm uppercase tracking-wider mb-2"
            style={{ color: "var(--color-bone)" }}
          >
            {benefit.annotation}
          </p>

          {/* 2. Hero Stat (ONLY occurrence) */}
          <div className="flex items-start gap-2 mb-6">
            <span
              className="font-bold text-[var(--color-bone)]"
              style={{
                fontSize: "clamp(3rem, 12vw, 4rem)",
                letterSpacing: "var(--letter-spacing-premium-title)",
                lineHeight: 1,
              }}
            >
              {benefit.stat}
            </span>
          </div>

          {/* 3. Outcome headline */}
          <h3
            className="text-xl font-bold mb-2 leading-tight"
            style={{ color: "var(--color-bone)" }}
          >
            {benefit.outcome}
          </h3>

          {/* 4. Mechanism description */}
          <p
            className="premium-body-sm opacity-70 leading-relaxed mb-6"
            style={{ color: "var(--color-bone)" }}
          >
            {benefit.description}
          </p>

          {/* 5. Evidence strip (supporting proof, no stat repetition) */}
          {breakdown && breakdown.results.length >= 2 && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {breakdown.results.slice(0, 2).map((result, idx) => (
                <div
                  key={idx}
                  className="rounded-[20px] px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p
                    className="text-sm leading-tight opacity-80"
                    style={{ color: "var(--color-bone)" }}
                  >
                    {result}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 6. Study footnote */}
          {breakdown && (
            <p
              className="premium-body-sm mt-4"
              style={{ color: "var(--color-bone)", opacity: 0.35 }}
            >
              {breakdown.study}
              {" · "}
              <a
                href="#"
                className="underline opacity-80"
                style={{ color: "var(--color-bone)" }}
              >
                Read the full study →
              </a>
            </p>
          )}
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

export default function KeyBenefitsMobile({
  benefits,
}: KeyBenefitsMobileProps) {
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);

  const handleTap = (idx: number) => {
    // Toggle: if clicking the open one, close it; otherwise open the clicked one
    setOpenBenefit(idx === openBenefit ? null : idx);
  };

  return (
    <div>
      {/* Heading block */}
      <div className="text-right mb-8 text-[var(--color-ink)]">
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

      {/* Accordion list */}
      <div
        className="overflow-hidden -mx-5 md:-mx-[5vw]"
        style={{
          border: "1px solid var(--color-premium-stroke)",
          background: "var(--color-bone)",
        }}
      >
        {benefits.map((benefit, index) => (
          <AccordionRow
            key={benefit.id}
            benefit={benefit}
            isOpen={openBenefit === index}
            isLast={index === benefits.length - 1}
            onTap={() => handleTap(index)}
          />
        ))}
      </div>
    </div>
  );
}
