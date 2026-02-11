"use client";

import { useState } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import { protocolProblemCycleSteps } from "@/app/lib/protocolProblemCycleCopy";

const RADIUS = 40;
const CENTER = 50;

function nodePosition(i: number) {
  const deg = -90 + i * 72;
  const rad = (deg * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
}

const NODE_POSITIONS = [0, 1, 2, 3, 4].map(nodePosition);

export default function ProtocolProblemCycle() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile(1024);
  const selected = protocolProblemCycleSteps[selectedIndex];

  const ring = (
    <div className="relative w-[320px] h-[320px] flex-shrink-0">
      <svg
        className="absolute inset-0 w-full h-full text-white opacity-25"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {protocolProblemCycleSteps.map((step, i) => (
        <button
          key={step.id}
          type="button"
          onClick={() => setSelectedIndex(i)}
          className={`absolute flex items-center justify-center rounded-full border-2 w-[100px] h-[100px] text-xs font-semibold transition-colors ${
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
          aria-label={step.label}
        >
          {step.label}
        </button>
      ))}
    </div>
  );

  const detail = (
    <div className="h-[320px] flex flex-col p-6 md:p-8 rounded-2xl border border-white/15 bg-white/[0.06]">
      <h3 className="premium-section-heading text-xl md:text-2xl font-bold mb-3 text-white flex-shrink-0">
        {selected.label}
      </h3>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <p className="premium-body text-sm md:text-base text-white/95 leading-relaxed mb-3">
          {selected.shortSummary}
        </p>
        <p className="premium-body text-sm text-white/75 leading-relaxed mb-3">
          {selected.scientificParagraph}
        </p>
      </div>
      <div className="premium-data text-xs text-white/65 pt-4 border-t border-white/15 flex-shrink-0">
        <span className="font-semibold">{selected.reference.author}</span> ({selected.reference.year}).{" "}
        <span className="italic">{selected.reference.journal}</span>.
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-10 items-center" aria-label="Problem cycle">
        {ring}
        {detail}
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-12 items-center justify-center" aria-label="Problem cycle">
      {ring}
      <div className="flex-1 min-w-0 max-w-xl">{detail}</div>
    </div>
  );
}
