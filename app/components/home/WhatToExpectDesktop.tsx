"use client";

import { useState } from "react";
import Image from "next/image";
import {
  timelineFlow,
  timelineClear,
  type TimelineStage,
} from "@/app/lib/whatToExpectLanding";

export default function WhatToExpectDesktop() {
  const [selectedFormula, setSelectedFormula] = useState<"01" | "02">("01");
  const timeline: TimelineStage[] =
    selectedFormula === "01" ? timelineFlow : timelineClear;

  return (
    <div className="[animation:none] [&_*]:!animate-none">
      {/* Section Header + Toggle */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
        <div className="text-left">
          <h2 className="premium-section-heading mb-3">
            What to Expect with CONKA
          </h2>
          <p className="premium-body text-[var(--text-on-light-muted)] max-w-2xl">
            Real benefits that build over time, not overnight promises.
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSelectedFormula("01")}
              className={`flex items-center justify-center w-24 h-24 rounded-[var(--premium-radius-nested)] bg-white border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] transition-all ${
                selectedFormula === "01"
                  ? "border-[var(--color-ink)] opacity-100"
                  : "border-[var(--color-premium-stroke)] opacity-60 hover:opacity-80"
              }`}
              aria-pressed={selectedFormula === "01"}
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
              onClick={() => setSelectedFormula("02")}
              className={`flex items-center justify-center w-24 h-24 rounded-[var(--premium-radius-nested)] bg-white border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] transition-all ${
                selectedFormula === "02"
                  ? "border-[var(--color-ink)] opacity-100"
                  : "border-[var(--color-premium-stroke)] opacity-60 hover:opacity-80"
              }`}
              aria-pressed={selectedFormula === "02"}
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
              {/* Dot + connecting line (neuro blue accent) */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[var(--color-neuro-blue-end)] flex-shrink-0"
                  aria-hidden
                />
                <div
                  className="w-0.5 flex-1 min-h-[1rem] bg-[var(--color-neuro-blue-end)] mt-2"
                  aria-hidden
                />
              </div>

              {/* Content */}
              <div className="flex-1 -mt-1 min-w-0">
                <span
                  className="inline-block premium-data text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-neuro-blue-end)] text-[var(--color-bone)] mb-2"
                  aria-hidden
                >
                  {stage.subheading}
                </span>
                <h3 className="text-lg lg:text-xl font-bold mb-2 text-[var(--text-on-light)]">
                  {stage.heading}
                </h3>
                <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed">
                  {stage.body}
                </p>
              </div>
            </div>
          ))}

          {/* How to Use — under last step, left column */}
          <div className="mt-8 premium-card-soft premium-card-soft-stroke p-6">
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 relative rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)] overflow-hidden flex items-center justify-center p-1">
                <Image
                  src={
                    selectedFormula === "01"
                      ? "/formulas/conkaFlow/FlowNoBackground.png"
                      : "/formulas/conkaClear/ClearNoBackground.png"
                  }
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="80px"
                  aria-hidden
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-2 text-[var(--text-on-light)]">
                  How to Use
                </h3>
                <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
                  {selectedFormula === "01"
                    ? "Take one 30ml shot of CONKA Flow in the morning with or without food. Best as part of your morning routine for sustained energy throughout the day."
                    : "Take one 30ml shot of CONKA Clear 30-60 minutes before peak performance, or in the evening to support recovery and sleep quality."}
                </p>
                <a
                  href={
                    selectedFormula === "01" ? "/conka-flow" : "/conka-clarity"
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--premium-radius-interactive)] font-semibold text-sm bg-[var(--color-ink)] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] transition-opacity"
                >
                  {selectedFormula === "01"
                    ? "View CONKA Flow"
                    : "View CONKA Clear"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual assets (sticky on desktop) */}
        <div className="lg:sticky lg:top-24">
          <div className="space-y-4">
            {/* Main lifestyle image */}
            <div className="relative aspect-[4/3] rounded-[var(--premium-radius-card)] overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]">
              <Image
                src={
                  selectedFormula === "01"
                    ? "/lifestyle/WomanPink.jpg"
                    : "/lifestyle/SatWoman.jpg"
                }
                alt={
                  selectedFormula === "01"
                    ? "Morning routine with CONKA Flow"
                    : "Peak performance with CONKA Clear"
                }
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Two supporting images */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-square rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]">
                <Image
                  src={
                    selectedFormula === "01"
                      ? "/science/NeuronsConnection.jpg"
                      : "/science/OxidativeStress.webp"
                  }
                  alt={
                    selectedFormula === "01"
                      ? "Neural connections and synaptic activity"
                      : "Oxidative stress and cellular protection"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-full overflow-hidden bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]">
                <Image
                  src={
                    selectedFormula === "01"
                      ? "/vibe/water.jpg"
                      : "/vibe/sky.jpg"
                  }
                  alt={selectedFormula === "01" ? "Water flow" : "Clear sky"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          <p className="premium-body-sm text-center text-[var(--text-on-light-muted)] mt-4">
            {selectedFormula === "01"
              ? "CONKA Flow for clean sustained energy"
              : "CONKA Clear for peak performance"}
          </p>
        </div>
      </div>
    </div>
  );
}
