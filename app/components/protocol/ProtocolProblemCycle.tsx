"use client";

import { useState, useMemo } from "react";
import { protocolProblemCycleSteps } from "@/app/lib/protocolProblemCycleCopy";

const STEP_COUNT = 5;
const RADIUS = 30; // % of container — smaller ring
const CENTER = 50;

function getStepPosition(index: number) {
  const angleDeg = -90 + index * (360 / STEP_COUNT);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER + RADIUS * Math.sin(angleRad),
  };
}

export default function ProtocolProblemCycle() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = protocolProblemCycleSteps[selectedIndex];

  const nodePositions = useMemo(
    () => Array.from({ length: STEP_COUNT }, (_, i) => getStepPosition(i)),
    []
  );

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[1fr,1.15fr] gap-10 md:gap-16 items-center"
      aria-label="Problem cycle: stress, oxidative load, repair, performance, loop"
    >
      {/* Ring — left on desktop (sm+), top on mobile */}
      <div className="relative w-full max-w-[280px] mx-auto sm:mx-0 sm:max-w-none aspect-square flex-shrink-0">
        <svg
          className="absolute inset-0 w-full h-full text-white"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="opacity-25"
          />
        </svg>
        {protocolProblemCycleSteps.map((step, index) => {
          const pos = nodePositions[index];
          const isSelected = selectedIndex === index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`absolute flex items-center justify-center rounded-full border-2 transition-all duration-200 w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] md:w-[96px] md:h-[96px] ${
                isSelected
                  ? "bg-white text-black border-white shadow-xl scale-105"
                  : "bg-white/5 border-white/35 text-white hover:border-white/60 hover:bg-white/10"
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-pressed={isSelected}
              aria-label={`${step.label}: ${step.shortSummary.slice(0, 60)}…`}
            >
              <span
                className={`premium-data text-xs sm:text-sm font-semibold leading-tight text-center px-1 ${
                  isSelected ? "text-black" : "text-white"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — right on desktop, below on mobile */}
      <div className="min-h-[240px] sm:min-h-[280px] flex flex-col p-6 md:p-8 rounded-2xl border border-white/15 bg-white/[0.06]">
        <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-4 text-white">
          {selected.label}
        </h3>
        <p className="premium-body text-sm md:text-base text-white/95 leading-relaxed mb-4">
          {selected.shortSummary}
        </p>
        <p className="premium-body text-sm text-white/75 leading-relaxed mb-4">
          {selected.scientificParagraph}
        </p>
        <div className="premium-data text-xs text-white/65 mt-auto pt-4 border-t border-white/15">
          <span className="font-semibold">{selected.reference.author}</span> (
          {selected.reference.year}).{" "}
          <span className="italic">{selected.reference.journal}</span>.
        </div>
      </div>
    </div>
  );
}
