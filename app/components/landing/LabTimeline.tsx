"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ConkaCTAButton from "./ConkaCTAButton";
import LabTrustBadges from "./LabTrustBadges";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";

/* ============================================================================
 * LabTimeline
 *
 * "Expected outcomes" timeline — 3 steps (24h / 2w / 30d). Each step is a
 * timeframe pill sitting on a vertical rail, with a compact card of bullet
 * outcomes beneath it. As the user scrolls through the section:
 *
 *   - The rail fills from 0 → 1 based on scroll position.
 *   - Every step at or before the viewport-centre step is "lit" (full
 *     opacity + pill stays navy). Later steps dim. Cumulative reveal —
 *     once you've reached step 2, step 1 stays illuminated too.
 *
 * Rail is visible on mobile + desktop. On desktop a sticky lifestyle asset
 * fills the right column.
 *
 * Perf: dynamic-imported at call sites, so JS stays off the initial bundle.
 * Observer + rAF-throttled scroll listener only run after hydration. Motion
 * is compositor-only (opacity, transform). Reduced-motion respected via
 * Tailwind motion-safe:*.
 * ========================================================================== */

interface TimelineStep {
  timeframe: string;
  title: string;
  outcome: string;
  bullets: string[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    timeframe: "24 hours",
    title: "Focus without the noise",
    outcome: "Focus stabilisation",
    bullets: [
      "Sharper focus, no jitters",
      "No afternoon fog",
      "Mental chatter quiets",
    ],
  },
  {
    timeframe: "14 days",
    title: "All-day momentum",
    outcome: "Momentum",
    bullets: [
      "Mornings feel sharper",
      "Afternoons hold",
      "Stress rolls off, not up",
    ],
  },
  {
    timeframe: "30 days",
    title: "Your new normal",
    outcome: "Baseline reset",
    bullets: [
      "Decisions come faster",
      "Thinking flows, problems feel simpler",
      "Your everyday, not a good day",
    ],
  },
];

export default function LabTimeline({
  hideCTA = false,
  ctaHref,
  ctaLabel,
}: {
  hideCTA?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
} = {}) {
  const listRef = useRef<HTMLOListElement>(null);
  const pillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [railOffsetPx, setRailOffsetPx] = useState(0);
  const [railTotalPx, setRailTotalPx] = useState(0);
  const [railFillPx, setRailFillPx] = useState(0);

  // Single scroll-driven update: derives both the active step and the rail
  // fill from pill positions. The rail spans first-pill-centre to
  // last-pill-centre; fill grows linearly between adjacent pills as the
  // viewport centre moves through them. rAF-throttled.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;
    const compute = () => {
      rafId = null;
      const list = listRef.current;
      const pills = pillRefs.current.filter(
        (p): p is HTMLSpanElement => p !== null,
      );
      if (!list || pills.length === 0) return;

      const listRect = list.getBoundingClientRect();
      const pillCenters = pills.map((p) => {
        const r = p.getBoundingClientRect();
        return r.top - listRect.top + r.height / 2;
      });

      const firstY = pillCenters[0];
      const lastY = pillCenters[pillCenters.length - 1];
      const totalSpan = Math.max(0, lastY - firstY);
      const vCenterRelToList = window.innerHeight / 2 - listRect.top;

      // Active = last pill the viewport centre has reached
      let active = 0;
      for (let i = 0; i < pillCenters.length; i++) {
        if (vCenterRelToList >= pillCenters[i]) active = i;
      }

      // Fill: 0 at firstY, totalSpan at lastY; linear interpolation between
      // adjacent pills so the fill always reaches the active checkpoint.
      let fillPx = 0;
      if (vCenterRelToList >= lastY) {
        fillPx = totalSpan;
      } else if (vCenterRelToList > firstY) {
        for (let i = 0; i < pillCenters.length - 1; i++) {
          if (
            vCenterRelToList >= pillCenters[i] &&
            vCenterRelToList <= pillCenters[i + 1]
          ) {
            const t =
              (vCenterRelToList - pillCenters[i]) /
              (pillCenters[i + 1] - pillCenters[i]);
            const segStart = pillCenters[i] - firstY;
            const segEnd = pillCenters[i + 1] - firstY;
            fillPx = segStart + (segEnd - segStart) * t;
            break;
          }
        }
      }

      setActiveIndex(active);
      setRailOffsetPx(firstY);
      setRailTotalPx(totalSpan);
      setRailFillPx(fillPx);
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div>
      {/* Mobile/tablet banner — full-bleed lifestyle asset */}
      <div className="relative -mt-20 md:mt-0 -mx-5 w-[calc(100%+2.5rem)] mb-6 overflow-hidden aspect-[4/3] md:mb-8 md:aspect-[16/9] lg:hidden">
        <Image
          src="/lifestyle/FlowConkaRing.jpg"
          alt="CONKA Flow bottle beside a phone showing a CONKA cognitive score of 92"
          fill
          sizes="(max-width: 1024px) 100vw, 0px"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Trio header */}
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Expected Outcomes · Timeline
      </p>
      <h2
        className="brand-h1 mb-2"
        style={{ letterSpacing: "-0.02em" }}
      >
        Your Brain, Optimised.
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-8">
        What to expect when taking CONKA
      </p>

      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Timeline cards + progress rail (visible on every viewport) */}
        <div className="relative lg:flex-1">
          {/* Rail base — bookended by first-pill-centre and last-pill-centre */}
          <div
            className="absolute left-3 w-px bg-black/10"
            style={{ top: `${railOffsetPx}px`, height: `${railTotalPx}px` }}
            aria-hidden
          />
          {/* Rail fill — grows from 0 → totalSpan as scroll passes pills */}
          <div
            className="absolute left-3 w-px bg-[#1B2757]"
            style={{ top: `${railOffsetPx}px`, height: `${railFillPx}px` }}
            aria-hidden
          />

          <ol ref={listRef} className="relative flex flex-col gap-8 lg:gap-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const isPassed = idx <= activeIndex;
              return (
                <li
                  key={step.timeframe}
                  aria-current={idx === activeIndex ? "step" : undefined}
                  className={`relative motion-safe:transition-opacity motion-safe:duration-300 ${
                    isPassed ? "opacity-100" : "opacity-55"
                  }`}
                >
                  {/* Pill on the rail — checkpoint node */}
                  <div className="mb-3">
                    <span
                      ref={(el) => {
                        pillRefs.current[idx] = el;
                      }}
                      className={`lab-clip-tr inline-block font-mono text-[11px] font-bold uppercase tracking-[0.16em] leading-none tabular-nums px-3 py-1.5 motion-safe:transition-colors motion-safe:duration-300 ${
                        isPassed
                          ? "bg-[#1B2757] text-white"
                          : "bg-white text-black/60 border border-black/20"
                      }`}
                    >
                      {step.timeframe}
                    </span>
                  </div>

                  {/* Card — indented to clear the rail */}
                  <div className="ml-8 bg-white border border-black/12 p-4 lg:p-5">
                    <h3 className="text-lg lg:text-xl font-semibold text-black mb-3 leading-snug">
                      {step.title}
                    </h3>

                    <ul className="flex flex-col gap-2 mb-1">
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-black/70 leading-relaxed"
                        >
                          <span
                            className="font-mono text-black/30 shrink-0"
                            aria-hidden
                          >
                            —
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Spec footer row */}
                    <div className="mt-4 pt-3 border-t border-black/8 flex items-center justify-between gap-3">
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-black/55">
                        Outcome · {step.outcome}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 tabular-nums">
                        N=150+
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop sidebar image with figure plate */}
        <div className="hidden lg:block lg:w-[450px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative aspect-square border border-black/12 overflow-hidden bg-[#f5f5f5]">
            <Image
              src="/lifestyle/FlowConkaRing.jpg"
              alt="CONKA Flow bottle beside a phone showing a CONKA cognitive score of 92"
              fill
              sizes="450px"
              className="object-cover"
            />
            <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums">
              Fig. 03 · Daily Use
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white bg-black/55 px-2 py-1 tabular-nums">
              CONKA Flow · Score 92
            </span>
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30 mt-6 mb-6 tabular-nums">
        Based on 5,000+ cognitive tests across 150+ participants
      </p>

      {!hideCTA && (
        <>
          <div className="flex flex-col items-start gap-2">
            <ConkaCTAButton href={ctaHref} meta={null}>
              {ctaLabel ?? `Try Both from £${PRICE_PER_SHOT_BOTH}/shot`}
            </ConkaCTAButton>
          </div>
          <div className="mt-6">
            <LabTrustBadges />
          </div>
        </>
      )}
    </div>
  );
}
