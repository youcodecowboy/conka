// TODO: Delete this file when protocol pages are fully removed. No longer imported.
"use client";

import { useState, useCallback, useEffect, memo, startTransition } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import {
  protocolProblemCycleSteps,
  type ProblemCycleStep,
} from "@/app/lib/protocolProblemCycleCopy";
import {
  getProtocolAccent,
  getProtocolGradient,
  type ProtocolId,
} from "@/app/lib/productData";
import { sectionHeadings, symptomEntries } from "@/app/lib/protocolWhyCopy";

const RADIUS = 32;
const CENTER = 50;
const CIRCLE_PATH_LENGTH = 2 * Math.PI * RADIUS;
const STEP_COUNT = protocolProblemCycleSteps.length;
const STEP_ANGLE = 360 / STEP_COUNT;
const DEFAULT_ACCENT = "#14b8a6";

function calcNodePos(index: number, rotationAngle: number) {
  const baseAngle = (index / STEP_COUNT) * 360 - 90;
  const angle = ((baseAngle + rotationAngle) % 360 + 360) % 360;
  const radian = (angle * Math.PI) / 180;
  const x = CENTER + RADIUS * Math.cos(radian);
  const y = CENTER + RADIUS * Math.sin(radian);
  const zIndex = Math.round(50 + 50 * Math.sin(radian));
  return { x, y, zIndex };
}

function snapToTop(index: number): number {
  return ((90 - (index / STEP_COUNT) * 360) % 360 + 360) % 360;
}

const PrimaryTile = memo(function PrimaryTile({
  selected,
}: {
  selected: ProblemCycleStep;
}) {
  return (
    <div
      className="p-8 md:p-10 rounded-3xl bg-white text-black transition-shadow duration-300"
      style={{ boxShadow: "0 0 40px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <p className="brand-h2 text-2xl md:text-3xl font-bold mb-4 text-black">
        {selected.detailTitle}
      </p>
      <p className="text-sm md:text-base text-black/90 leading-relaxed" style={{ lineHeight: 1.65 }}>
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
      className="p-8 md:p-10 rounded-3xl bg-[var(--brand-surface)] text-black transition-shadow duration-300"
      style={{ boxShadow: "0 0 40px rgba(0,0,0,0.05), 0 2px 16px rgba(0,0,0,0.04)" }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-wider text-black/70 mb-3"
        style={{ letterSpacing: "0.12em" }}
      >
        The science
      </p>
      <p className="text-sm text-black/85 leading-relaxed mb-4" style={{ lineHeight: 1.7 }}>
        {selected.scientificParagraph}
      </p>
      <div className="text-xs text-black/65 pt-4 border-t border-black/10" style={{ lineHeight: 1.6 }}>
        <span className="font-semibold">{selected.reference.author}</span> ({selected.reference.year}).{" "}
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

export default function CycleTrap({
  protocolId,
  initialNode = 0,
  selectedSymptomId = null,
  onSelectSymptom,
}: CycleTrapProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(
    protocolProblemCycleSteps[Math.min(initialNode, STEP_COUNT - 1)].id
  );
  const [rotationAngle, setRotationAngle] = useState(() => snapToTop(initialNode));
  const [autoRotate, setAutoRotate] = useState(true);
  const [scienceExpanded, setScienceExpanded] = useState(false);
  const isMobile = useIsMobile(1024);

  const accentHex = protocolId ? getProtocolAccent(protocolId) : DEFAULT_ACCENT;
  const gradient = protocolId
    ? getProtocolGradient(protocolId)
    : { start: "#0d9488", end: DEFAULT_ACCENT };

  const activeStep = protocolProblemCycleSteps.find((s) => s.id === activeNodeId)
    ?? protocolProblemCycleSteps[0];

  // ── Auto-rotation ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(id);
  }, [autoRotate]);

  // ── Sync initialNode prop ──────────────────────────────────────────────────
  useEffect(() => {
    startTransition(() => {
      setRotationAngle(snapToTop(initialNode));
      setActiveNodeId(protocolProblemCycleSteps[Math.min(initialNode, STEP_COUNT - 1)].id);
      setAutoRotate(true);
    });
  }, [initialNode]);

  // ── Symptom pill → snap ring + highlight entry node ───────────────────────
  useEffect(() => {
    if (selectedSymptomId == null) return;
    const entry = symptomEntries.find((e) => e.id === selectedSymptomId);
    if (!entry) return;
    startTransition(() => {
      setRotationAngle(snapToTop(entry.entryNode));
      setActiveNodeId(protocolProblemCycleSteps[entry.entryNode].id);
    });
  }, [selectedSymptomId]);

  // ── Close science accordion when selection changes ─────────────────────────
  useEffect(() => {
    startTransition(() => setScienceExpanded(false));
  }, [activeNodeId]);

  // ── Keyboard ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setRotationAngle((prev) => (prev - STEP_ANGLE + 360) % 360);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setRotationAngle((prev) => (prev + STEP_ANGLE) % 360);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNodeClick = useCallback((step: ProblemCycleStep) => {
    setActiveNodeId(step.id);
  }, []);

  const nodeSize = isMobile ? 108 : 132;
  const hubSize = isMobile ? 44 : 56;

  const ring = (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
      {/* SVG track */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id="trap-cycle-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
          </linearGradient>
        </defs>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="url(#trap-cycle-ring-gradient)" strokeWidth="0.8" />
        <circle
          cx={CENTER} cy={CENTER} r={RADIUS} fill="none"
          stroke={accentHex} strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray={`${CIRCLE_PATH_LENGTH / 2} ${CIRCLE_PATH_LENGTH / 2}`}
          strokeDashoffset={0} pathLength={CIRCLE_PATH_LENGTH}
          style={{ opacity: 0.55 }}
        />
        <circle
          cx={CENTER} cy={CENTER} r={RADIUS} fill="none"
          stroke={gradient.start} strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray={`${CIRCLE_PATH_LENGTH / 2} ${CIRCLE_PATH_LENGTH / 2}`}
          strokeDashoffset={-CIRCLE_PATH_LENGTH / 2} pathLength={CIRCLE_PATH_LENGTH}
          style={{ opacity: 0.35 }}
        />
      </svg>

      {/* Center hub */}
      <div
        className="absolute rounded-full z-10 flex items-center justify-center"
        style={{
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: hubSize, height: hubSize,
          background: `linear-gradient(135deg, ${gradient.start}, ${gradient.end})`,
        }}
      >
        <div
          className="absolute rounded-full animate-ping"
          style={{ inset: -8, backgroundColor: accentHex, opacity: 0.12, animationDelay: "0.6s", animationDuration: "2s" }}
        />
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: accentHex, opacity: 0.22, animationDuration: "2s" }}
        />
        <div className="relative w-3.5 h-3.5 rounded-full bg-white/85 z-10" />
      </div>

      {/* Nodes */}
      {protocolProblemCycleSteps.map((step, index) => {
        const isActive = activeNodeId === step.id;
        const pos = calcNodePos(index, rotationAngle);

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => handleNodeClick(step)}
            className="cycle-node group absolute flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-black)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand-tint)]"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.18 : 1})`,
              width: nodeSize,
              height: nodeSize,
              zIndex: isActive ? 100 : pos.zIndex,
              willChange: "transform",
              backgroundColor: isActive ? "white" : "rgba(255,255,255,0.92)",
              borderColor: isActive ? "var(--brand-black)" : "rgba(0,0,0,0.18)",
              boxShadow: isActive
                ? `0 0 0 3px ${accentHex}33, 0 8px 28px rgba(0,0,0,0.14)`
                : "0 2px 8px rgba(0,0,0,0.06)",
              padding: "0.75rem",
            }}
            aria-pressed={isActive}
            aria-label={`${step.label}: ${step.nodeSubline}. Step ${index + 1} of 5.`}
          >
            <span className="inline-flex flex-col items-center gap-1">
              <span
                className="font-semibold leading-tight uppercase tracking-wider text-center"
                style={{
                  fontSize: isMobile ? "0.6875rem" : "0.8125rem",
                  letterSpacing: "0.06em",
                  color: isActive ? "var(--brand-black)" : "rgba(0,0,0,0.7)",
                }}
              >
                {step.label}
              </span>
              {!isMobile && (
                <span
                  className="text-[0.6875rem] leading-tight text-center"
                  style={{
                    letterSpacing: "0.02em",
                    color: isActive ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
                  }}
                >
                  {step.nodeSubline}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );

  const detail = (
    <div
      className="flex flex-col gap-5 w-full min-w-0"
      aria-live="polite"
      aria-atomic="true"
      role="region"
      aria-label={activeStep.detailTitle}
    >
      <div key={activeNodeId} className="flex flex-col gap-5" style={{ animation: "fadeSlideUp 240ms ease-out" }}>
        <PrimaryTile selected={activeStep} />
        {isMobile ? (
          <div className="rounded-3xl bg-[var(--brand-surface)] overflow-hidden border border-black/10">
            <button
              type="button"
              onClick={() => setScienceExpanded((e) => !e)}
              className="w-full p-4 text-left flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-black)]/50"
              aria-expanded={scienceExpanded}
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-black/70" style={{ letterSpacing: "0.12em" }}>
                The science
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`flex-shrink-0 transition-transform ${scienceExpanded ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {scienceExpanded && (
              <div className="px-4 pb-4 pt-0 border-t border-black/10">
                <p className="text-sm text-black/85 leading-relaxed mb-4 pt-4" style={{ lineHeight: 1.7 }}>
                  {activeStep.scientificParagraph}
                </p>
                <div className="text-xs text-black/65 pt-4 border-t border-black/10" style={{ lineHeight: 1.6 }}>
                  <span className="font-semibold">{activeStep.reference.author}</span>{" "}
                  ({activeStep.reference.year}).{" "}
                  <span className="italic">{activeStep.reference.journal}</span>.
                </div>
              </div>
            )}
          </div>
        ) : (
          <SecondaryTile selected={activeStep} />
        )}
      </div>
    </div>
  );

  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen text-[var(--brand-black)] pt-16 md:pt-20 pb-12 md:pb-16 overflow-x-hidden"
      style={{ backgroundColor: "var(--brand-tint)" }}
      aria-label="The problem cycle"
    >
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <h2
          className="brand-h2 text-2xl md:text-3xl font-bold text-[var(--brand-black)] text-left mb-8"
          style={{ letterSpacing: "-0.02em" }}
        >
          You&rsquo;re stuck in a cycle
        </h2>

        {/* Symptom pills */}
        {onSelectSymptom != null && (
          <div className={`mb-10 ${isMobile ? "pt-4" : ""}`}>
            <p className="brand-data text-xs text-[var(--brand-black)] mt-2 mb-3">
              {sectionHeadings.recognitionSubline}
            </p>
            <div className="flex flex-wrap gap-2 min-w-0 max-w-full">
              {symptomEntries.map((entry) => {
                const isSelected = selectedSymptomId === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => onSelectSymptom(entry.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-black)] text-left min-w-0 shrink-0 ${
                      isSelected
                        ? "bg-[var(--brand-black)] border-[var(--brand-black)] text-white"
                        : "bg-white border-black/20 text-black/70 hover:bg-white/90 hover:border-black/40"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span className="brand-data text-xs font-medium">{entry.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 50:50 split — ring left, detail right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
          <div className="flex-shrink-0 w-full lg:w-1/2 min-w-0">{ring}</div>
          <div className="flex-shrink-0 w-full lg:w-1/2 min-w-0 flex flex-col justify-center">
            {detail}
          </div>
        </div>
      </div>
    </section>
  );
}
