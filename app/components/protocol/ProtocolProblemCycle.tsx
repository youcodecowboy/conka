"use client";

import { useState, useMemo } from "react";
import { protocolProblemCycleSteps } from "@/app/lib/protocolProblemCycleCopy";

const STEP_COUNT = 5;
const RADIUS = 42; // % of container for the circle
const CENTER = 50;

function getStepPosition(index: number) {
  const angleDeg = -90 + index * (360 / STEP_COUNT);
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER + RADIUS * Math.sin(angleRad),
  };
}

function StepIcon({ stepId }: { stepId: string }) {
  const iconClass = "w-4 h-4 md:w-5 md:h-5 opacity-70";
  switch (stepId) {
    case "stress":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <path d="M12 8v3l2 2" strokeLinecap="round" />
        </svg>
      );
    case "oxidative":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2c.5 2 .5 4 0 6s-.5 4 0 6" />
          <path d="M12 2c-.5 2-.5 4 0 6s.5 4 0 6" />
          <path d="M4.22 4.22c1.4-1.4 2.8-2.1 4.2-2.1s2.8.7 4.2 2.1" />
          <path d="M19.78 4.22c-1.4-1.4-2.8-2.1-4.2-2.1s-2.8.7-4.2 2.1" />
          <path d="M4.22 19.78c1.4 1.4 2.8 2.1 4.2 2.1s2.8-.7 4.2-2.1" />
          <path d="M19.78 19.78c-1.4 1.4-2.8 2.1-4.2 2.1s-2.8-.7-4.2-2.1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "repair":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "performance":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v10l4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 22V12L8 16" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 12l-6-6-6 6 6 6 6-6z" strokeLinejoin="round" />
        </svg>
      );
    case "loop":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 1l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 23l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    default:
      return null;
  }
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
      className="grid grid-cols-1 md:grid-cols-[1fr,1.1fr] gap-8 md:gap-12 items-start"
      aria-label="Problem cycle: stress, oxidative load, repair, performance, loop"
    >
      {/* Ring — left on desktop, top on mobile */}
      <div className="relative w-full max-w-[320px] mx-auto md:max-w-none aspect-square">
        <svg
          className="absolute inset-0 w-full h-full text-white"
          viewBox="0 0 100 100"
          aria-hidden
        >
          {/* Circular ring (circle, not pentagon) */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className="opacity-30"
          />
        </svg>
        {/* Step nodes */}
        {protocolProblemCycleSteps.map((step, index) => {
          const pos = nodePositions[index];
          const isSelected = selectedIndex === index;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`absolute flex flex-col items-center justify-center gap-0.5 rounded-full border-2 transition-all duration-200 min-w-[56px] min-h-[56px] md:min-w-[64px] md:min-h-[64px] ${
                isSelected
                  ? "bg-white text-black border-white shadow-lg scale-105"
                  : "bg-white/10 border-white/40 text-white hover:border-white/70 hover:bg-white/15"
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-pressed={isSelected}
              aria-label={`${step.label}: ${step.shortSummary.slice(0, 60)}…`}
            >
              <StepIcon stepId={step.id} />
              <span
                className={`premium-data text-[10px] md:text-xs font-semibold leading-tight whitespace-nowrap ${
                  isSelected ? "text-black" : "text-white"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel — right on desktop, below on mobile; light text on dark */}
      <div className="min-h-[260px] md:min-h-[280px] flex flex-col p-6 md:p-8 rounded-xl border border-white/20 bg-white/5">
        <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-3 text-white">
          {selected.label}
        </h3>
        <p className="premium-body text-sm md:text-base text-white/95 leading-relaxed mb-4">
          {selected.shortSummary}
        </p>
        <p className="premium-body text-sm text-white/80 leading-relaxed mb-4">
          {selected.scientificParagraph}
        </p>
        <div className="premium-data text-xs text-white/70 mt-auto pt-2 border-t border-white/20">
          <span className="font-semibold">{selected.reference.author}</span> (
          {selected.reference.year}).{" "}
          <span className="italic">{selected.reference.journal}</span>.
        </div>
      </div>
    </div>
  );
}
