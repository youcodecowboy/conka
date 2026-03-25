"use client";

import { useState } from "react";
import { Benefit } from "../KeyBenefits";

/**
 * Landing page benefits — mobile-first, conversion-optimised.
 *
 * Follows Purdy & Figg "Minimalist Premium" pattern:
 *   Collapsed: [Icon] [Title] .............. [Stat] [Chevron]
 *   Expanded:  Outcome headline → Hero stat → Mechanism → Proof box
 *
 * No radar chart. No struggle text in collapsed view.
 * Science data relegated to a muted "Proof Box" at the bottom.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only.
 */

interface LandingBenefitsProps {
  benefits: Benefit[];
}

function AccordionRow({
  benefit,
  isOpen,
  isLast,
  onTap,
}: {
  benefit: Benefit;
  isOpen: boolean;
  isLast: boolean;
  onTap: () => void;
}) {
  return (
    <div>
      {/* ---- Collapsed header ---- */}
      <button
        onClick={onTap}
        aria-expanded={isOpen}
        aria-controls={`lp-benefit-${benefit.id}`}
        className="w-full flex flex-col gap-1 px-5 py-4 text-left"
      >
        {/* Row 1: Icon + Title + Stat + Chevron */}
        <div className="flex items-center gap-3 w-full">
          {/* Icon */}
          {benefit.icon && (
            <span
              className="w-5 h-5 shrink-0 flex items-center justify-center"
              style={{
                color: "var(--color-ink)",
                opacity: isOpen ? 1 : 0.35,
              }}
            >
              {benefit.icon}
            </span>
          )}

          {/* Title */}
          <span
            className="flex-1 text-base"
            style={{
              fontWeight: isOpen ? 600 : 500,
              color: "var(--color-ink)",
            }}
          >
            {benefit.title}
          </span>

          {/* Stat */}
          <span
            className="text-lg font-bold shrink-0"
            style={{ color: "var(--color-ink)" }}
          >
            {benefit.stat}
          </span>

          {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--color-ink)",
            opacity: isOpen ? 0.7 : 0.25,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        </div>

        {/* Row 2: Outcome snippet — makes it feel real */}
        {benefit.outcome && (
          <p
            className="text-sm pl-8 leading-snug line-clamp-1"
            style={{ color: "var(--color-ink)", opacity: 0.45 }}
          >
            {benefit.outcome.split(".")[0]}.
          </p>
        )}
      </button>

      {/* ---- Expanded panel ---- */}
      <div
        id={`lp-benefit-${benefit.id}`}
        role="region"
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "600px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-5 pb-6">
          {/* Outcome — large, bold, the thing they'll feel */}
          <p
            className="font-bold leading-snug"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 1.35rem)",
              color: "var(--color-ink)",
            }}
          >
            {benefit.outcome}
          </p>

          {/* Hero stat — massive, immediate proof */}
          <div
            className="font-bold mt-3"
            style={{
              fontSize: "clamp(3rem, 15vw, 4.5rem)",
              lineHeight: 1,
              letterSpacing: "var(--letter-spacing-premium-title)",
              backgroundImage: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {benefit.stat}
          </div>

          {/* Mechanism — how it works, one-liner */}
          <p
            className="text-sm mt-3 leading-relaxed"
            style={{ color: "var(--color-ink)", opacity: 0.6 }}
          >
            {benefit.description}
          </p>

          {/* Proof box — science layer, visually separated */}
          {(benefit.clinicalBreakdown || benefit.ingredientAsset) && (
            <div
              className="mt-4 p-4 rounded-xl"
              style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
            >
              {/* Ingredient pill */}
              {benefit.ingredientAsset && (
                <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                  <span>{benefit.ingredientAsset.name}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{benefit.ingredientAsset.dosage}</span>
                </div>
              )}

              {/* Study reference */}
              {benefit.clinicalBreakdown && (
                <p
                  className="text-xs mt-2 leading-relaxed"
                  style={{ color: "var(--color-ink)", opacity: 0.45 }}
                >
                  {benefit.clinicalBreakdown.study} ·{" "}
                  {benefit.clinicalBreakdown.participants} ·{" "}
                  {benefit.clinicalBreakdown.duration}
                </p>
              )}

              {/* PMID */}
              {benefit.annotation && (
                <p
                  className="text-xs mt-1 font-mono"
                  style={{ color: "var(--color-ink)", opacity: 0.3 }}
                >
                  {benefit.annotation}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      {!isLast && (
        <div
          className="mx-5"
          style={{
            height: "1px",
            background: "var(--color-ink)",
            opacity: 0.08,
          }}
        />
      )}
    </div>
  );
}

export default function LandingBenefits({ benefits }: LandingBenefitsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2
          className="premium-section-heading"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What you&apos;ll actually feel.
        </h2>
        <p className="premium-body-sm mt-2 opacity-50">
          Tap a benefit to see the proof.
        </p>
      </div>

      {/* Accordion */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "white",
          border: "1px solid var(--color-premium-stroke)",
        }}
      >
        {benefits.map((benefit, i) => (
          <AccordionRow
            key={benefit.id}
            benefit={benefit}
            isOpen={openIndex === i}
            isLast={i === benefits.length - 1}
            onTap={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
