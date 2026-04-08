"use client";

import { useState } from "react";
import Image from "next/image";
import FormulaToggle from "@/app/components/FormulaToggle";
import {
  timelineFlow,
  timelineClear,
  type TimelineStage,
} from "@/app/lib/whatToExpectLanding";

interface WhatToExpectDesktopProps {
  /** When set (PDP), show single product only and hide the toggle. */
  productId?: "01" | "02";
}

export default function WhatToExpectDesktop({ productId }: WhatToExpectDesktopProps) {
  const [toggleFormula, setToggleFormula] = useState<"01" | "02">("01");
  const selectedFormula = productId ?? toggleFormula;
  const timeline: TimelineStage[] =
    selectedFormula === "01" ? timelineFlow : timelineClear;
  const showToggle = productId == null;

  return (
    <div className="[animation:none] [&_*]:!animate-none">
      {/* Section Header (+ Toggle only when landing) */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
        <div className="text-left">
          <h2 className="brand-h2 mb-0 mb-3">
            What to Expect with CONKA
          </h2>
          <p className="brand-body text-black/60 max-w-2xl">
            Real benefits that build over time, not overnight promises.
          </p>
        </div>

        {showToggle && (
          <FormulaToggle
            value={selectedFormula}
            onChange={setToggleFormula}
            ariaLabel="What to expect timeline formula"
          />
        )}
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
                  className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[var(--brand-accent)] flex-shrink-0"
                  aria-hidden
                />
                <div
                  className="w-0.5 flex-1 min-h-[1rem] bg-[var(--brand-accent)] mt-2"
                  aria-hidden
                />
              </div>

              {/* Content */}
              <div className="flex-1 -mt-1 min-w-0">
                <span
                  className="inline-block brand-data text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--brand-accent)] text-white mb-2"
                  aria-hidden
                >
                  {stage.subheading}
                </span>
                <h3 className="text-lg lg:text-xl font-bold mb-2 text-black">
                  {stage.heading}
                </h3>
                <p className="brand-caption text-black/60 leading-relaxed">
                  {stage.body}
                </p>
              </div>
            </div>
          ))}

          {/* How to Use — under last step, left column */}
          <div className="mt-8 brand-card p-6">
            <div className="flex items-start gap-4 lg:gap-6">
              <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 relative rounded-[var(--brand-radius-container)] bg-[var(--brand-tint)] border border-[rgba(0,0,0,0.06)] overflow-hidden flex items-center justify-center p-1">
                <Image
                  src={
                    selectedFormula === "01"
                      ? "/formulas/conkaFlow/FlowNoBackground.png"
                      : "/formulas/conkaClear/ClearNoBackground.png"
                  }
                  alt=""
                  fill
                  loading="lazy"
                  className="object-contain object-center"
                  sizes="80px"
                  aria-hidden
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-2 text-black">
                  How to Use
                </h3>
                <p
                  className={
                    showToggle
                      ? "brand-caption text-black/60 mb-4"
                      : "brand-caption text-black/60"
                  }
                >
                  {selectedFormula === "01"
                    ? "Take one 30ml shot of CONKA Flow in the morning with or without food. Best as part of your morning routine for sustained energy throughout the day."
                    : "Take one 30ml shot of CONKA Clear 30-60 minutes before peak performance, or in the afternoon to support recovery and sleep quality."}
                </p>
                {showToggle && (
                  <a
                    href={
                      selectedFormula === "01"
                        ? "/conka-flow"
                        : "/conka-clarity"
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--brand-radius-interactive)] font-semibold text-sm bg-black text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-opacity"
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
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual assets (sticky on desktop) */}
        <div className="lg:sticky lg:top-24">
          <div className="space-y-4">
            {/* Main lifestyle image */}
            <div className="relative aspect-[4/3] rounded-[var(--brand-radius-card)] overflow-hidden bg-[var(--brand-tint)] border border-[rgba(0,0,0,0.06)]">
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
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Two supporting images */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative aspect-square rounded-[var(--brand-radius-container)] overflow-hidden bg-[var(--brand-tint)] border border-[rgba(0,0,0,0.06)]">
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
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative aspect-square rounded-full overflow-hidden bg-[var(--brand-tint)] border border-[rgba(0,0,0,0.06)]">
                <Image
                  src={
                    selectedFormula === "01"
                      ? "/vibe/water.jpg"
                      : "/vibe/sky.jpg"
                  }
                  alt={selectedFormula === "01" ? "Water flow" : "Clear sky"}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>

          <p className="brand-caption text-center text-black/60 mt-4">
            {selectedFormula === "01"
              ? "CONKA Flow for clean sustained energy"
              : "CONKA Clear for peak performance"}
          </p>
        </div>
      </div>
    </div>
  );
}
