"use client";

import { useState, useCallback, useEffect, memo } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import {
  protocolProblemCycleSteps,
  type ProblemCycleStep,
} from "@/app/lib/protocolProblemCycleCopy";
import { getProtocolAccent, getProtocolGradient, type ProtocolId } from "@/app/lib/productData";
import { sectionHeadings, symptomEntries } from "@/app/lib/protocolWhyCopy";

const RADIUS = 40;
const CENTER = 50;
const CIRCLE_PATH_LENGTH = 2 * Math.PI * RADIUS;

function nodePosition(i: number) {
  const deg = -90 + i * 72;
  const rad = (deg * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

const NODE_POSITIONS = [0, 1, 2, 3, 4].map(nodePosition);
const CIRCLE_PATH = "M 50 10 A 40 40 0 1 1 49.99 10";
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const TRANSITION_MS = 320;
const DEFAULT_ACCENT = "#14b8a6";

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

interface CycleTrapProps {
  protocolId?: ProtocolId;
  initialNode?: number;
  selectedSymptomId?: string | null;
  onSelectSymptom?: (symptomId: string) => void;
}

const STEP_COUNT = protocolProblemCycleSteps.length;

export default function CycleTrap({
  protocolId,
  initialNode = 0,
  selectedSymptomId = null,
  onSelectSymptom,
}: CycleTrapProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialNode);
  const isMobile = useIsMobile(1024);
  const selected = protocolProblemCycleSteps[selectedIndex];
  const accentHex = protocolId ? getProtocolAccent(protocolId) : DEFAULT_ACCENT;
  const gradient = protocolId ? getProtocolGradient(protocolId) : { start: "#0d9488", end: DEFAULT_ACCENT };

  useEffect(() => {
    setSelectedIndex(initialNode);
  }, [initialNode]);

  const go = useCallback((delta: number) => {
    setSelectedIndex((i) => {
      const next = i + delta;
      if (next < 0) return STEP_COUNT - 1;
      if (next >= STEP_COUNT) return 0;
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

  const nodeSize = isMobile ? 128 : 140;

  // Carousel: fixed positions, data shifts. Position i shows step (selectedIndex + i) % 5; top (i=0) is active.
  const ring = (
    <div className="relative w-full flex flex-col items-center gap-6">
      <div
        className="relative w-full"
        style={{
          aspectRatio: "1 / 1",
          transition: `width ${TRANSITION_MS}ms ${EASE}, height ${TRANSITION_MS}ms ${EASE}`,
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="trap-cycle-ring-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>
          </defs>
          {/* Track: full circle, subtle */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="url(#trap-cycle-ring-gradient)"
            strokeWidth="1.5"
          />
          {/* Full loop: first half bright accent, second half gradient (repeat lap) */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={accentHex}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${CIRCLE_PATH_LENGTH / 2} ${CIRCLE_PATH_LENGTH / 2}`}
            strokeDashoffset={0}
            pathLength={CIRCLE_PATH_LENGTH}
            style={{
              transform: "translateZ(0)",
              filter: `drop-shadow(0 0 10px ${accentHex})`,
            }}
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={gradient.start}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${CIRCLE_PATH_LENGTH / 2} ${CIRCLE_PATH_LENGTH / 2}`}
            strokeDashoffset={-CIRCLE_PATH_LENGTH / 2}
            pathLength={CIRCLE_PATH_LENGTH}
            style={{ transform: "translateZ(0)", opacity: 0.85 }}
          />
        </svg>
        {[0, 1, 2, 3, 4].map((slotIndex) => {
          const stepIndex = (selectedIndex + slotIndex) % STEP_COUNT;
          const step = protocolProblemCycleSteps[stepIndex];
          const isActive = slotIndex === 0;
          return (
            <button
              key={`${step.id}-${slotIndex}`}
              type="button"
              onClick={() => setSelectedIndex(stepIndex)}
              className={`cycle-node group absolute flex flex-col items-center justify-center rounded-full border-2 px-3 py-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isActive
                  ? "active bg-white text-black border-white shadow-[0_0_32px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] opacity-100"
                  : "bg-[#2a2a2a] border-white/30 text-white/90 hover:bg-[#333] hover:border-white/50 opacity-100"
              }`}
              style={{
                left: `${NODE_POSITIONS[slotIndex].x}%`,
                top: `${NODE_POSITIONS[slotIndex].y}%`,
                transform: "translate(-50%, -50%)",
                width: nodeSize,
                height: nodeSize,
                willChange: "transform",
                ...(isActive ? {} : { filter: "grayscale(0.15)" }),
              }}
              aria-pressed={isActive}
              aria-label={`${step.label}: ${step.nodeSubline}. Step ${stepIndex + 1} of 5.`}
            >
              <span
                className={`inline-flex flex-col items-center transition-transform duration-300 ${
                  isActive ? "group-hover:scale-[1.02]" : "group-hover:scale-105"
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
                    isActive ? "text-black/80" : "text-white/70"
                  }`}
                  style={{ letterSpacing: "0.02em" }}
                >
                  {step.nodeSubline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Left/right toggles underneath the cycle */}
      <div className="flex items-center gap-4 w-full justify-center">
        <button
          type="button"
          onClick={() => go(-1)}
          className="premium-box px-4 py-3 rounded-full hover:bg-current/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white text-black flex items-center gap-2"
          aria-label="Previous stage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="premium-data text-xs font-semibold uppercase tracking-wider">Previous stage</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="premium-box px-4 py-3 rounded-full hover:bg-current/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white text-black flex items-center gap-2"
          aria-label="Next stage"
        >
          <span className="premium-data text-xs font-semibold uppercase tracking-wider">Next stage</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
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

  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen text-white pt-16 md:pt-20 pb-24 md:pb-32 overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at center, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 4%) 70%, hsl(0, 0%, 0%) 100%)",
      }}
      aria-label="The problem cycle"
    >
      {/* Vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-white text-center opacity-90 mb-8">
          {sectionHeadings.trap}
        </h2>

        {/* Recognize yourself - horizontal */}
        {onSelectSymptom != null && (
          <div className="mb-10">
            <h3 className="premium-section-heading text-white font-bold mb-2">
              {sectionHeadings.recognition}
            </h3>
            <p className="premium-data text-xs text-white mt-2 mb-3">
              {sectionHeadings.recognitionSubline}
            </p>
            <div className="flex flex-wrap gap-2">
              {symptomEntries.map((entry) => {
                const isSelected = selectedSymptomId === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectSymptom(entry.id)}
                    className={`px-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white text-left ${
                      isSelected
                        ? "bg-white/15 border-white text-white"
                        : "border-white/30 text-white/90 hover:border-white/50 hover:bg-white/5"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="premium-data text-xs font-medium">
                      {entry.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cycle and explanation - 50:50 */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          <div className="flex-shrink-0 w-full lg:w-1/2 min-w-0">{ring}</div>
          <div className="flex-shrink-0 w-full lg:w-1/2 min-w-0 flex justify-start">
            {detail}
          </div>
        </div>
      </div>
    </section>
  );
}
