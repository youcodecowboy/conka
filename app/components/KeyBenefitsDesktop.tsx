"use client";

import { useState, useMemo } from "react";
import RadarChart from "./RadarChart";
import { Benefit } from "./KeyBenefits";

interface KeyBenefitsDesktopProps {
  benefits: Benefit[];
}

// Neural blue accent color (similar to CONKA Clarity)
const NEURAL_BLUE = {
  text: "text-[#94b9ff]",
  hex: "#94b9ff",
};

export default function KeyBenefitsDesktop({
  benefits,
}: KeyBenefitsDesktopProps) {
  const [activeBenefit, setActiveBenefit] = useState(0);

  const currentBenefit = benefits[activeBenefit];

  const handleSelect = (idx: number) => {
    if (idx !== activeBenefit) setActiveBenefit(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(idx);
    }
  };

  // Generate chart data showing baseline vs improved performance
  const chartData = useMemo(() => {
    // Extract percentage from stat (e.g., "+22.1%" -> 22.1)
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    const improvementValue = statMatch ? parseFloat(statMatch[1]) : 0;

    // Baseline human performance (all dimensions start at ~12%)
    const baseline = 12;

    // Map benefit IDs to their primary category
    const benefitCategoryMap: { [key: string]: string } = {
      focus: "Focus",
      sleep: "Energy", // Sleep improves Energy/Recovery
      "brain-fog": "Clarity", // Brain fog relates to Clarity
      stress: "Recovery", // Stress resilience relates to Recovery
      memory: "Memory",
    };

    const primaryCategory =
      benefitCategoryMap[currentBenefit.id] || "Performance";

    // Create categories with the primary category getting full improvement,
    // and others getting smaller improvements
    const categories = [
      {
        category: "Focus",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Focus"
            ? improvementValue
            : improvementValue * 0.3),
      },
      {
        category: "Memory",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Memory"
            ? improvementValue
            : improvementValue * 0.3),
      },
      {
        category: "Energy",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Energy"
            ? improvementValue
            : improvementValue * 0.3),
      },
      {
        category: "Clarity",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Clarity"
            ? improvementValue
            : improvementValue * 0.3),
      },
      {
        category: "Recovery",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Recovery"
            ? improvementValue
            : improvementValue * 0.3),
      },
      {
        category: "Performance",
        baseline: baseline,
        improved:
          baseline +
          (primaryCategory === "Performance"
            ? improvementValue
            : improvementValue * 0.4),
      },
    ];

    return categories;
  }, [currentBenefit.stat, currentBenefit.id]);

  const mainStatValue = useMemo(() => {
    const statMatch = currentBenefit.stat.match(/(\d+\.?\d*)/);
    return statMatch ? parseFloat(statMatch[1]) : 0;
  }, [currentBenefit.stat]);

  return (
    <div>
      {/* Heading block */}
      <div className="text-center mb-10">
        <h2
          className="premium-section-heading text-[var(--color-ink)]"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What you'll actually feel.
        </h2>
        <p className="premium-section-subtitle mt-2 text-[var(--color-ink)]">
          Select a benefit to see the evidence behind it.
        </p>
      </div>

      {/* Two-column grid layout */}
      <div className="grid lg:grid-cols-[38%_1fr] gap-8 items-start">
        {/* Left: Benefit List (sticky on desktop) */}
        <div className="lg:sticky lg:top-8">
          <div
            className="rounded-[40px] overflow-hidden"
            style={{ 
              border: "1px solid var(--color-premium-stroke)",
              background: "var(--color-bone)"
            }}
          >
            <div style={{ padding: "2em" }} className="space-y-2">
              {benefits.map((benefit, idx) => {
                const isActive = idx === activeBenefit;
                return (
                  <button
                    key={benefit.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => handleSelect(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`
                      flex items-center gap-3 px-4 py-3.5 rounded-[20px] cursor-pointer 
                      transition-all duration-200 w-full text-left
                      ${isActive
                        ? "bg-[var(--color-ink)] text-white"
                        : "bg-white border border-[var(--color-premium-stroke)] hover:bg-[var(--color-premium-bg-soft)]"
                      }
                    `}
                  >
                    {/* Icon */}
                    {benefit.icon && (
                      <div className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "opacity-60"}`}>
                        {benefit.icon}
                      </div>
                    )}

                    {/* Benefit title */}
                    <span className={`premium-body font-medium flex-1 ${isActive ? "text-white" : "text-[var(--color-ink)]"}`}>
                      {benefit.title}
                    </span>

                    {/* Spacer */}
                    <span className="flex-1" />

                    {/* Stat */}
                    <span className={`font-bold ${isActive ? "text-white" : NEURAL_BLUE.text}`}>
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
                      className={`shrink-0 transition-opacity duration-200 ${
                        isActive ? "text-white opacity-90" : "opacity-30"
                      }`}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingredient asset card — updates with active benefit */}
          <div
            key={`ingredient-${activeBenefit}`}
            className="mt-4 rounded-[24px] overflow-hidden [animation:fadeIn_0.3s_ease]"
            style={{ border: "1px solid var(--color-premium-stroke)" }}
          >
            {/* Square image */}
            <div className="relative w-full aspect-[2/1] bg-[var(--color-premium-bg-soft)]">
              <img
                src={currentBenefit.ingredientAsset.image}
                alt={currentBenefit.ingredientAsset.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Label strip */}
            <div
              className="px-4 py-3"
              style={{ background: "var(--color-bone)" }}
            >
              <p className="premium-body-sm font-medium text-[var(--color-ink)]">
                {currentBenefit.ingredientAsset.name}
              </p>
              <p className="premium-body-sm opacity-50 text-[var(--color-ink)]">
                {currentBenefit.ingredientAsset.dosage}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Benefit Detail (updates in-place) */}
        <div aria-live="polite">
          <div
            key={activeBenefit}
            className="premium-card-soft !bg-white p-8 [animation:fadeIn_0.3s_ease]"
          >
            {/* 1. Struggle statement — small, muted, italic */}
            <p className="premium-body-sm italic opacity-50 mb-2 text-[var(--color-ink)]">
              {currentBenefit.struggle}
            </p>

            {/* 2. Outcome headline — large, bold, hero text */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-[var(--color-ink)]">
              {currentBenefit.outcome}
            </h3>

            {/* 3. Stat + annotation — moved down, slightly smaller than before */}
            <div className="flex items-baseline gap-3 mb-4">
              <span
                className={`text-4xl lg:text-5xl font-bold tracking-tight ${NEURAL_BLUE.text}`}
                style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
              >
                {currentBenefit.stat}
              </span>
              <span className="premium-body-sm opacity-60 text-[var(--color-ink)]">
                {currentBenefit.annotation}
              </span>
            </div>

            {/* 4. Mechanism (description) — smaller, more muted */}
            <p className="premium-body-sm opacity-60 leading-relaxed mb-6 text-[var(--color-ink)]">
              {currentBenefit.description}
            </p>

            {/* 5. Radar chart — keep as-is, add explainer line above */}
            <div className="premium-card-soft p-6 rounded-[20px] mb-6" aria-hidden="true">
              <p className="premium-body-sm opacity-50 uppercase tracking-wider mb-1 text-[var(--color-ink)]">
                Performance impact
              </p>
              <p className="premium-body-sm opacity-70 mb-4 text-[var(--color-ink)]">
                How this benefit impacts your overall cognitive performance
              </p>
              <div className="w-full max-w-[360px] mx-auto">
                <RadarChart
                  data={chartData}
                  mainValue={mainStatValue}
                  accentColor={NEURAL_BLUE.hex}
                />
              </div>
            </div>

            {/* 6. Clinical breakdown — keep entirely as-is */}
            {currentBenefit.clinicalBreakdown && (
              <div
                className="rounded-[20px] overflow-hidden mb-2"
                style={{ border: "1px solid var(--color-premium-stroke)" }}
              >
                {/* Header row */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: "var(--color-premium-bg-soft)",
                    borderBottom: "1px solid var(--color-premium-stroke)",
                  }}
                >
                  <p className="premium-body-sm uppercase tracking-wider opacity-50 text-[var(--color-ink)]">
                    Clinical study
                  </p>
                  <p className="premium-body-sm opacity-40 text-[var(--color-ink)]">
                    vs. baseline human performance
                  </p>
                </div>

                {/* Study details */}
                <div className="px-5 py-4 space-y-2 premium-body-sm text-[var(--color-ink)]">
                  <p>
                    <span className="opacity-50">Study: </span>
                    <span className="opacity-80">{currentBenefit.clinicalBreakdown.study}</span>
                  </p>
                  <p>
                    <span className="opacity-50">Participants: </span>
                    <span className="opacity-80">{currentBenefit.clinicalBreakdown.participants}</span>
                  </p>
                  <p>
                    <span className="opacity-50">Duration: </span>
                    <span className="opacity-80">{currentBenefit.clinicalBreakdown.duration}</span>
                  </p>
                </div>

                {/* Results */}
                <div className="px-5 pb-5 text-[var(--color-ink)]">
                  <p className="premium-body-sm opacity-50 uppercase tracking-wider mb-3">
                    Key results
                  </p>
                  <ul className="space-y-2">
                    {currentBenefit.clinicalBreakdown.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-2 premium-body-sm opacity-80">
                        <span className="opacity-40 shrink-0 mt-0.5">—</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
