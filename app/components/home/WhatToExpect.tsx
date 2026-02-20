"use client";

import { useState } from "react";

interface TimelineStage {
  subheading: string;
  heading: string;
  body: string;
}

const timelineFlow: TimelineStage[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Calmer head, sharper focus",
    body: "Lemon balm supports GABA receptors—you'll feel less mental chatter and easier concentration within 30 minutes.",
  },
  {
    subheading: "Week 1-2",
    heading: "Stress becomes manageable",
    body: "Adaptogens like ashwagandha stack daily. You'll feel mornings smoother and stress more under control.",
  },
  {
    subheading: "Month 1",
    heading: "Energy and focus compound",
    body: "Neuroprotection and resilience build—you'll feel steadier energy, clearer thinking, and fewer afternoon dips.",
  },
  {
    subheading: "2+ Months",
    heading: "Sustainable daily strength",
    body: "You're supporting your system for the long run. Focus, resilience, and balance maintained as a habit—not a spike.",
  },
];

const timelineClear: TimelineStage[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Fog lifts, thinking sharpens",
    body: "Glutathione and vitamin C dampen oxidative stress. You'll feel the fog lift and complex tasks get easier from the first use.",
  },
  {
    subheading: "Week 1-2",
    heading: "Antioxidant capacity builds",
    body: "Glutathione and NAC build in your system daily. You'll feel thinking get sharper and mental fatigue lighter.",
  },
  {
    subheading: "Month 1",
    heading: "Cognitive clarity established",
    body: "The antioxidant and nootropic stack compounds. You'll feel mental clarity and focus reliably there—not just a short-lived boost.",
  },
  {
    subheading: "2+ Months",
    heading: "Long-term cognitive support",
    body: "You're supporting clarity and brain health for the long term. Sharp thinking and balance maintained—not a quick fix.",
  },
];

export default function WhatToExpect() {
  const [selectedFormula, setSelectedFormula] = useState<"01" | "02">("01");
  const timeline = selectedFormula === "01" ? timelineFlow : timelineClear;

  return (
    <section
      className="premium-section-luxury premium-bg-bone"
      aria-label="What to Expect with CONKA"
    >
      <div className="premium-track">
        {/* Section Header + Toggle */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="premium-section-heading mb-3">
            What to Expect with CONKA
          </h2>
          <p className="premium-body text-[var(--text-on-light-muted)] mb-6 max-w-2xl mx-auto">
            Real benefits that build over time—not overnight promises.
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedFormula("01")}
              className={`px-6 py-2 rounded-full transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] ${
                selectedFormula === "01"
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-white border border-[var(--color-premium-stroke)] text-[var(--text-on-light)] hover:border-[var(--color-ink)]"
              }`}
            >
              CONKA Flow
            </button>
            <button
              type="button"
              onClick={() => setSelectedFormula("02")}
              className={`px-6 py-2 rounded-full transition-all font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] ${
                selectedFormula === "02"
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-white border border-[var(--color-premium-stroke)] text-[var(--text-on-light)] hover:border-[var(--color-ink)]"
              }`}
            >
              CONKA Clear
            </button>
          </div>
        </div>

        {/* Main 2-column layout: timeline left, visual right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Timeline */}
          <div className="relative">
            {timeline.map((stage, index) => (
              <div
                key={index}
                className="relative flex gap-4 lg:gap-6 pb-8 lg:pb-12 last:pb-0"
              >
                {/* Dot + connecting line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[var(--color-ink)] flex-shrink-0"
                    aria-hidden
                  />
                  <div
                    className="w-0.5 flex-1 min-h-[1rem] bg-[var(--color-premium-stroke)] mt-2"
                    aria-hidden
                  />
                </div>

                {/* Content */}
                <div className="flex-1 -mt-1 min-w-0">
                  <p className="premium-data text-xs uppercase tracking-wider text-[var(--text-on-light-muted)] mb-2">
                    {stage.subheading}
                  </p>
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-[var(--text-on-light)]">
                    {stage.heading}
                  </h3>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed">
                    {stage.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Visual placeholder (desktop: sticky; mobile: below timeline) */}
          <div className="lg:sticky lg:top-24">
            <div
              className="relative aspect-[4/3] lg:aspect-square rounded-[var(--premium-radius-card)] overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]"
              aria-hidden
            >
              <div className="w-full h-full flex items-center justify-center">
                <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                  Product lifestyle image
                </p>
              </div>
            </div>
            <p className="premium-body-sm text-center text-[var(--text-on-light-muted)] mt-4">
              {selectedFormula === "01"
                ? "Morning ritual with CONKA Flow"
                : "Peak performance with CONKA Clear"}
            </p>
          </div>
        </div>

        {/* How to Use — below main grid */}
        <div className="mt-12 premium-card-soft premium-card-soft-stroke p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-4 lg:gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] flex items-center justify-center overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-on-light-muted)]"
                  aria-hidden
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base mb-2 text-[var(--text-on-light)]">
                How to Use
              </h3>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {selectedFormula === "01"
                  ? "Take one 30ml shot of CONKA Flow in the morning with or without food. Best as part of your morning routine for sustained energy throughout the day."
                  : "Take one 30ml shot of CONKA Clear 30-60 minutes before peak performance, or in the evening to support recovery and sleep quality."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
