"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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

// Parse clinical results into stats (with values like +18%, -56%) and text-only items
function parseResults(results: string[]): {
  stats: { value: string; label: string }[];
  textOnly: string[];
} {
  const stats: { value: string; label: string }[] = [];
  const textOnly: string[] = [];

  results.forEach((result) => {
    // Match patterns like "+18%", "-56%", "2x", etc. at start of string
    const statMatch = result.match(/^([+\-]?\d+\.?\d*[%x]?)\s+(.+)$/i);

    if (statMatch) {
      stats.push({
        value: statMatch[1], // e.g. "+18%"
        label: statMatch[2], // e.g. "improvement in memory performance"
      });
    } else {
      textOnly.push(result);
    }
  });

  return { stats, textOnly };
}

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

  const parsedResults = useMemo(() => {
    if (!currentBenefit.clinicalBreakdown) return { stats: [], textOnly: [] };
    return parseResults(currentBenefit.clinicalBreakdown.results);
  }, [currentBenefit.clinicalBreakdown]);

  return (
    <div>
      {/* Heading block */}
      <div className="text-right mb-10">
        <h2
          className="brand-h2 mb-0 text-black"
          style={{ letterSpacing: "-0.01em" }}
        >
          What you'll actually feel.
        </h2>
        <p className="brand-body mt-2 text-black">
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
              border: "1px solid rgba(0,0,0,0.06)",
              background: "white"
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
                        ? "bg-black text-white"
                        : "bg-white border border-[rgba(0,0,0,0.06)] hover:bg-[var(--brand-tint)]"
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
                    <span className={`brand-body font-medium flex-1 ${isActive ? "text-white" : "text-black"}`}>
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
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            {/* Square image */}
            <div className="relative w-full aspect-[2/1] bg-[var(--brand-tint)]">
              <Image
                src={currentBenefit.ingredientAsset.image}
                alt={currentBenefit.ingredientAsset.name}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Label strip */}
            <div
              className="px-4 py-3"
              style={{ background: "white" }}
            >
              <p className="brand-caption font-medium text-black">
                {currentBenefit.ingredientAsset.name}
              </p>
              <p className="brand-caption text-black/60">
                {currentBenefit.ingredientAsset.dosage}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Benefit Detail (updates in-place) */}
        <div aria-live="polite">
          <div
            key={activeBenefit}
            className="brand-card !bg-white p-8 [animation:fadeIn_0.3s_ease]"
          >
            {/* 1. Struggle statement — small, muted, italic */}
            <p className="brand-caption italic text-black/60 mb-2">
              {currentBenefit.struggle}
            </p>

            {/* 2. Outcome headline — large, bold, hero text */}
            <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight text-black">
              {currentBenefit.outcome}
            </h3>

            {/* 3. Mechanism (description) — smaller, more muted */}
            <p className="brand-caption text-black/60 leading-relaxed mb-6">
              {currentBenefit.description}
            </p>

            {/* Stat tiles grid — only render if there are parsed stats */}
            {parsedResults.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {parsedResults.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] p-4"
                    style={{
                      background: "var(--brand-tint)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <p
                      className={`text-3xl font-bold mb-1 ${NEURAL_BLUE.text}`}
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {stat.value}
                    </p>
                    <p className="brand-caption text-black/80 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Radar chart — keep as-is, add explainer line above */}
            <div className="brand-card p-6 rounded-[20px] mb-6" aria-hidden="true">
              <p className="brand-caption text-black/60 uppercase tracking-wider mb-1">
                Performance impact
              </p>
              <p className="brand-caption text-black/80 mb-4">
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
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                {/* Header row */}
                <div
                  className="px-5 py-3 space-y-1"
                  style={{
                    background: "var(--brand-tint)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="brand-caption text-black/60 uppercase tracking-wider">
                      Clinical study
                    </p>
                    <p className="brand-caption text-black/40">
                      {currentBenefit.annotation}
                    </p>
                  </div>
                  <p className="brand-caption text-black/60">
                    {currentBenefit.ingredientAsset.name} • {currentBenefit.ingredientAsset.dosage}
                  </p>
                </div>

                {/* Study details */}
                <div className="px-5 py-4 space-y-2 brand-caption text-black">
                  <p>
                    <span className="text-black/60">Study: </span>
                    <span className="text-black/80">{currentBenefit.clinicalBreakdown.study}</span>
                  </p>
                  <p>
                    <span className="text-black/60">Participants: </span>
                    <span className="text-black/80">{currentBenefit.clinicalBreakdown.participants}</span>
                  </p>
                  <p>
                    <span className="text-black/60">Duration: </span>
                    <span className="text-black/80">{currentBenefit.clinicalBreakdown.duration}</span>
                  </p>
                </div>

                {/* Only render this section if there are text-only results */}
                {parsedResults.textOnly.length > 0 && (
                  <div className="px-5 pb-5 text-black">
                    <p className="brand-caption text-black/60 uppercase tracking-wider mb-3">
                      Additional findings
                    </p>
                    <ul className="space-y-2">
                      {parsedResults.textOnly.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2 brand-caption text-black/80">
                          <span className="text-black/40 shrink-0 mt-0.5">—</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
