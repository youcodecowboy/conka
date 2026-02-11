"use client";

import { useState } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import { protocolProblemCycleSteps } from "@/app/lib/protocolProblemCycleCopy";

const RADIUS = 40;
const CENTER = 50;

function nodePosition(i: number) {
  const deg = -90 + i * 72;
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

const NODE_POSITIONS = [0, 1, 2, 3, 4].map(nodePosition);

export default function ProtocolProblemCycle() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile(1024);
  const selected = protocolProblemCycleSteps[selectedIndex];

  const ring = (
    <div className="relative w-[420px] h-[420px] flex-shrink-0">
      <svg
        className="absolute inset-0 w-full h-full text-white opacity-25"
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
        />
      </svg>
      {protocolProblemCycleSteps.map((step, i) => (
        <button
          key={step.id}
          type="button"
          onClick={() => setSelectedIndex(i)}
          className={`absolute flex flex-col items-center justify-center rounded-full border-2 w-[128px] h-[128px] px-2 py-3 transition-colors ${
            selectedIndex === i
              ? "bg-white text-black border-white shadow-lg"
              : "bg-white/5 border-white/35 text-white"
          }`}
          style={{
            left: `${NODE_POSITIONS[i].x}%`,
            top: `${NODE_POSITIONS[i].y}%`,
            transform: "translate(-50%, -50%)",
          }}
          aria-pressed={selectedIndex === i}
          aria-label={`${step.label}: ${step.nodeSubline}`}
        >
          <span className="text-sm font-semibold leading-tight">
            {step.label}
          </span>
          <span
            className={`mt-1 text-xs leading-tight ${
              selectedIndex === i ? "text-black/80" : "text-white/70"
            }`}
          >
            {step.nodeSubline}
          </span>
        </button>
      ))}
    </div>
  );

  const primaryTile = (
    <div className="p-6 md:p-8 rounded-2xl bg-white text-black">
      <p className="text-xl md:text-2xl font-bold mb-3 text-black">
        {selected.detailTitle}
      </p>
      <p className="text-sm md:text-base text-black/90 leading-relaxed">
        {selected.shortSummary}
      </p>
    </div>
  );

  const secondaryTile = (
    <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-surface)] text-black">
      <p className="text-sm font-semibold uppercase tracking-wide text-black/70 mb-3">
        The science
      </p>
      <p className="text-sm text-black/85 leading-relaxed mb-4">
        {selected.scientificParagraph}
      </p>
      <div className="text-xs text-black/65 pt-4 border-t border-black/10">
        <span className="font-semibold">{selected.reference.author}</span> (
        {selected.reference.year}).{" "}
        <span className="italic">{selected.reference.journal}</span>.
      </div>
    </div>
  );

  const detail = (
    <div className="flex flex-col gap-4 w-full">
      {primaryTile}
      {secondaryTile}
    </div>
  );

  if (isMobile) {
    return (
      <div
        className="flex flex-col gap-10 items-center"
        aria-label="Problem cycle"
      >
        {ring}
        {detail}
      </div>
    );
  }

  return (
    <div
      className="flex flex-row gap-12 items-center justify-center"
      aria-label="Problem cycle"
    >
      {ring}
      <div className="flex-1 min-w-0 max-w-xl">{detail}</div>
    </div>
  );
}
