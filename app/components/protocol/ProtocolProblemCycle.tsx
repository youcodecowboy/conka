"use client";

import { useState, useCallback, useEffect, memo } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import {
  protocolProblemCycleSteps,
  type ProblemCycleStep,
} from "@/app/lib/protocolProblemCycleCopy";
import { getProtocolAccent, type ProtocolId } from "@/app/lib/productData";

const RADIUS = 40;
const CENTER = 50;
const CIRCLE_PATH_LENGTH = 2 * Math.PI * RADIUS; // ~251

function nodePosition(i: number) {
  const deg = -90 + i * 72;
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

const NODE_POSITIONS = [0, 1, 2, 3, 4].map(nodePosition);

// Circle path for progress indicator (start at top = first node)
const CIRCLE_PATH =
  "M 50 10 A 40 40 0 1 1 49.99 10";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const TRANSITION_MS = 320;

const PrimaryTile = memo(function PrimaryTile({
  selected,
}: {
  selected: ProblemCycleStep;
}) {
  return (
    <div
      className="p-8 md:p-10 rounded-3xl bg-white text-black transition-shadow duration-300"
      style={{
        boxShadow: "0 0 40px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <p className="premium-section-heading text-2xl md:text-3xl font-bold mb-4 text-black">
        {selected.detailTitle}
      </p>
      <p
        className="text-sm md:text-base text-black/90 leading-relaxed"
        style={{ lineHeight: 1.65 }}
      >
        {selected.shortSummary}
      </p>
    </div>
  );
});

const SecondaryTile = memo(function SecondaryTile({
  selected,
}: {
  selected: ProblemCycleStep;
}) {
  return (
    <div
      className="p-8 md:p-10 rounded-3xl bg-[var(--color-surface)] text-black transition-shadow duration-300"
      style={{
        boxShadow: "0 0 40px rgba(0,0,0,0.05), 0 2px 16px rgba(0,0,0,0.04)",
      }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-wider text-black/70 mb-3"
        style={{ letterSpacing: "0.12em" }}
      >
        The science
      </p>
      <p
        className="text-sm text-black/85 leading-relaxed mb-4"
        style={{ lineHeight: 1.7 }}
      >
        {selected.scientificParagraph}
      </p>
      <div
        className="text-xs text-black/65 pt-4 border-t border-black/10"
        style={{ lineHeight: 1.6 }}
      >
        <span className="font-semibold">{selected.reference.author}</span> (
        {selected.reference.year}).{" "}
        <span className="italic">{selected.reference.journal}</span>.
      </div>
    </div>
  );
});

const DEFAULT_ACCENT = "#14b8a6";

export default function ProtocolProblemCycle({
  protocolId,
}: { protocolId?: ProtocolId } = {}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile(1024);
  const selected = protocolProblemCycleSteps[selectedIndex];
  const accentHex = protocolId ? getProtocolAccent(protocolId) : DEFAULT_ACCENT;

  const go = useCallback((delta: number) => {
    setSelectedIndex((i) => {
      const next = i + delta;
      if (next < 0) return protocolProblemCycleSteps.length - 1;
      if (next >= protocolProblemCycleSteps.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  const ringSize = isMobile ? 420 : 500;
  const nodeSize = isMobile ? 128 : 140;

  const ring = (
    <div
      className="relative w-full"
      style={{
        aspectRatio: "1 / 1",
        transition: `width ${TRANSITION_MS}ms ${EASE}, height ${TRANSITION_MS}ms ${EASE}`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full text-white opacity-25"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="problem-cycle-ring-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="url(#problem-cycle-ring-gradient)"
          strokeWidth="1"
        />
        {/* Progress arc: protocol accent, bold and visible */}
        <path
          d={CIRCLE_PATH}
          fill="none"
          stroke={accentHex}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(selectedIndex / 5) * CIRCLE_PATH_LENGTH} ${CIRCLE_PATH_LENGTH}`}
          pathLength={CIRCLE_PATH_LENGTH}
          style={{
            transition: `stroke-dasharray ${TRANSITION_MS}ms ${EASE}`,
            transform: "translateZ(0)",
            filter: `drop-shadow(0 0 6px ${accentHex})`,
          }}
        />
      </svg>
      {protocolProblemCycleSteps.map((step, i) => (
        <button
          key={step.id}
          type="button"
          onClick={() => setSelectedIndex(i)}
          className={`group absolute flex flex-col items-center justify-center rounded-full border-2 px-3 py-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
            selectedIndex === i
              ? "bg-white text-black border-white shadow-lg hover:shadow-xl"
              : "bg-[#1a1a1a] border-white/40 text-white hover:bg-[#252525] hover:border-white/50 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]"
          }`}
          style={{
            left: `${NODE_POSITIONS[i].x}%`,
            top: `${NODE_POSITIONS[i].y}%`,
            transform: "translate(-50%, -50%)",
            width: nodeSize,
            height: nodeSize,
            willChange: "transform",
          }}
          aria-pressed={selectedIndex === i}
          aria-label={`${step.label}: ${step.nodeSubline}. Step ${i + 1} of 5. Use arrow keys to change.`}
        >
          <span
            className={`inline-flex flex-col items-center transition-transform duration-300 ${
              selectedIndex === i ? "group-hover:scale-[1.02]" : "group-hover:scale-105"
            }`}
          >
            <span
              className="font-semibold leading-tight uppercase tracking-wider"
              style={{
                fontSize: isMobile ? "0.875rem" : "0.9375rem",
                letterSpacing: "0.06em",
              }}
            >
              {step.label}
            </span>
            <span
              className={`mt-1.5 text-xs leading-tight ${
                selectedIndex === i ? "text-black/80" : "text-white/70"
              }`}
              style={{ letterSpacing: "0.02em" }}
            >
              {step.nodeSubline}
            </span>
          </span>
        </button>
      ))}
    </div>
  );

  const detail = (
    <div
      className="flex flex-col gap-5 w-full min-w-0"
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-label={`Step ${selectedIndex + 1}: ${selected.detailTitle}`}
    >
      <div key={selectedIndex} className="flex flex-col gap-5">
        <PrimaryTile selected={selected} />
        <SecondaryTile selected={selected} />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className="flex flex-col items-center gap-16"
        aria-label="Problem cycle"
        role="group"
      >
        {ring}
        {detail}
      </div>
    );
  }

  return (
    <div
      className="flex flex-row items-start gap-20 w-full"
      aria-label="Problem cycle"
      role="group"
    >
      <div className="flex-shrink-0" style={{ width: "40%" }}>
        {ring}
      </div>
      <div className="flex-shrink-0 min-w-0 flex justify-start" style={{ width: "60%" }}>
        {detail}
      </div>
    </div>
  );
}
