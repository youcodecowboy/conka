"use client";

import ConkaCTAButton from "./ConkaCTAButton";
import LabTrustBadges from "./LabTrustBadges";
import { useInView } from "@/app/hooks/useInView";
import { useCountUp } from "@/app/hooks/useCountUp";
import {
  PRICE_PER_DAY_BOTH,
  PRICE_PER_SHOT_BOTH,
  COFFEE_PRICE_PER_DAY,
  CONKA_INGREDIENTS_COUNT,
  MONTHLY_SAVINGS_VS_COFFEE,
} from "@/app/lib/landingPricing";

/* ============================================================================
 * LandingValueComparison
 *
 * "Cost per active ingredient" reframe of the coffee comparison.
 *
 * Two lab-asset-frame cards carry the argument:
 *
 *   [1] RATIO DOSSIER — 25× hero glyph with transparent math rows showing
 *       the derivation (coffee £5.00 ÷ 1 = £5.00/active vs
 *       CONKA £3.22 ÷ 16 = £0.20/active).
 *
 *   [2] TIME-IN-EFFECT CHART — 06:00–18:00 axis with coffee's peak band +
 *       diagonal-hash crash tail against Flow (06–10) and Clear (12–16)
 *       navy bands. The visual argument is the empty afternoon where
 *       coffee has quit and CONKA is still covering.
 *
 * Savings callout kept but demoted to a tertiary footer — framed as
 * "also cheaper" rather than as the thesis.
 * ========================================================================== */

const RANGE_START = 6;
const RANGE_END = 18;
const RANGE = RANGE_END - RANGE_START;
const HOUR_MARKS = [6, 8, 10, 12, 14, 16, 18];

// Calculated from constants: 5.00 / (3.22 / 16) = 24.84 → rounded to 25
const RATIO = 25;
const CONKA_COST_PER_ACTIVE = "£0.20";
const COFFEE_COST_PER_ACTIVE = `£${COFFEE_PRICE_PER_DAY}`;

function pct(hour: number): string {
  return `${((hour - RANGE_START) / RANGE) * 100}%`;
}

export default function LandingValueComparison() {
  const [ref, isInView] = useInView();
  const ratioRef = useCountUp(RATIO, isInView, { decimals: 0, suffix: "×" });

  return (
    <div ref={ref}>
      {/* Eyebrow */}
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Cost Analysis · Per-Ingredient Delta
      </p>

      {/* Heading */}
      <div className="mb-10">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Same cost. 25× the actives.
        </h2>
        <p className="mt-2 text-black/60 max-w-prose">
          CONKA delivers {CONKA_INGREDIENTS_COUNT} researched ingredients for
          £{PRICE_PER_DAY_BOTH}/day. Your coffee delivers 1 stimulant for £
          {COFFEE_PRICE_PER_DAY}.
        </p>
      </div>

      {/* ==================================================================
          CARD 1 — RATIO DOSSIER
          Oversized 25× glyph + transparent math rows showing derivation.
         ================================================================== */}
      <div className="lab-asset-frame bg-white p-5 lg:p-8 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-10">
          {/* Hero ratio */}
          <div className="flex items-baseline gap-3 lg:gap-4 pb-6 lg:pb-0 lg:pr-10 lg:border-r border-b lg:border-b-0 border-black/8 mb-6 lg:mb-0 lg:flex-shrink-0">
            <span
              ref={ratioRef}
              className="font-mono text-[4.5rem] lg:text-[7rem] font-bold tabular-nums text-black leading-[0.9]"
            >
              25×
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-black/55 leading-tight">
              More actives
              <br />
              per £ spent
            </span>
          </div>

          {/* Math rows */}
          <div className="flex-1 flex flex-col gap-3 lg:justify-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40 mb-1 tabular-nums">
              Fig. 01 · Cost per active
            </p>
            <MathRow
              label="Coffee"
              price={`£${COFFEE_PRICE_PER_DAY}`}
              divisor="1"
              unitCost={COFFEE_COST_PER_ACTIVE}
              tone="muted"
            />
            <div className="h-px bg-black/8" />
            <MathRow
              label="CONKA (Both)"
              price={`£${PRICE_PER_DAY_BOTH}`}
              divisor={CONKA_INGREDIENTS_COUNT}
              unitCost={CONKA_COST_PER_ACTIVE}
              tone="active"
            />
          </div>
        </div>
      </div>

      {/* ==================================================================
          CARD 2 — TIME-IN-EFFECT CHART
          Horizontal bands across a 06:00–18:00 axis.
         ================================================================== */}
      <div className="lab-asset-frame bg-white p-5 lg:p-8 mb-5">
        {/* Chart header */}
        <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-black/8">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/50 mb-1.5 tabular-nums">
              Fig. 02 · Time in effect
            </p>
            <h3 className="text-lg lg:text-xl font-semibold text-black leading-snug">
              Who&apos;s covering you, hour by hour.
            </h3>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/40 tabular-nums shrink-0 leading-tight text-right pt-1">
            06:00
            <br />
            — 18:00
          </span>
        </div>

        {/* Hour axis labels */}
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.08em] text-black/40 tabular-nums mb-1.5">
          {HOUR_MARKS.map((h) => (
            <span key={h}>{String(h).padStart(2, "0")}</span>
          ))}
        </div>

        {/* Hairline axis + tick marks */}
        <div className="relative h-px bg-black/15 mb-5">
          {HOUR_MARKS.map((h, i) => (
            <span
              key={h}
              className="absolute top-0 w-px h-1.5 bg-black/25"
              style={{ left: `${(i / (HOUR_MARKS.length - 1)) * 100}%` }}
              aria-hidden
            />
          ))}
        </div>

        {/* Series */}
        <ChartRow
          label="Coffee"
          caption="1 active · peak 08–11 · crash 11–14"
          tone="coffee"
          bands={[
            { start: 8, end: 11, kind: "peak" },
            { start: 11, end: 14, kind: "crash" },
          ]}
        />
        <ChartRow
          label="CONKA Flow"
          caption="Morning focus · 06:00 — 12:00"
          tone="conka"
          bands={[{ start: 6, end: 12, kind: "peak" }]}
        />
        <ChartRow
          label="CONKA Clear"
          caption="Afternoon reset · 12:00 — 18:00"
          tone="conka"
          bands={[{ start: 12, end: 18, kind: "peak" }]}
          isLast
        />

        {/* Legend + source */}
        <div className="mt-6 pt-4 border-t border-black/8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-wrap">
            <LegendSwatch tone="peak" label="Caffeine peak" />
            <LegendSwatch tone="crash" label="Crash" />
            <LegendSwatch tone="conka" label="CONKA coverage" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 tabular-nums">
            Caffeine half-life ~5h
          </span>
        </div>
      </div>

      {/* Savings strip — demoted tertiary footer */}
      <div className="lab-clip-tr px-5 py-3 bg-black text-white text-left mb-8 inline-flex items-baseline gap-2 flex-wrap">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
          Also
        </span>
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.1em] tabular-nums">
          ~£{MONTHLY_SAVINGS_VS_COFFEE}/month cheaper than daily coffee
        </span>
      </div>

      <div className="flex justify-start">
        <ConkaCTAButton>Get Both from £{PRICE_PER_SHOT_BOTH}/shot</ConkaCTAButton>
      </div>
      <div className="mt-6">
        <LabTrustBadges />
      </div>
    </div>
  );
}

/* ============================ sub-components ============================== */

function MathRow({
  label,
  price,
  divisor,
  unitCost,
  tone,
}: {
  label: string;
  price: string;
  divisor: string;
  unitCost: string;
  tone: "muted" | "active";
}) {
  const labelColor = tone === "active" ? "text-[#1B2757]" : "text-black/55";
  const priceColor = tone === "active" ? "text-black" : "text-black/55";
  const unitColor =
    tone === "active"
      ? "font-bold text-black"
      : "font-bold text-black/55";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-baseline gap-2 sm:gap-4 lg:gap-5">
      <span
        className={`font-mono text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.14em] truncate ${labelColor}`}
      >
        {label}
      </span>
      <span
        className={`font-mono text-sm lg:text-base font-bold tabular-nums ${priceColor}`}
      >
        {price}
      </span>
      <span className="font-mono text-[10px] lg:text-xs uppercase tracking-[0.1em] tabular-nums text-black/35">
        ÷ {divisor}
      </span>
      <span
        className={`font-mono text-sm lg:text-base tabular-nums ${unitColor}`}
      >
        = {unitCost}
      </span>
    </div>
  );
}

function ChartRow({
  label,
  caption,
  tone,
  bands,
  isLast = false,
}: {
  label: string;
  caption: string;
  tone: "coffee" | "conka";
  bands: Array<{ start: number; end: number; kind: "peak" | "crash" }>;
  isLast?: boolean;
}) {
  const labelColor = tone === "conka" ? "text-[#1B2757]" : "text-black/75";
  return (
    <div className={isLast ? "" : "mb-4"}>
      <div className="flex justify-between items-baseline mb-1.5 gap-3">
        <span
          className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${labelColor}`}
        >
          {label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/40 tabular-nums truncate">
          {caption}
        </span>
      </div>
      <div
        className="relative h-6 bg-black/[0.03]"
        role="img"
        aria-label={`${label} — ${caption}`}
      >
        {bands.map((b, i) => {
          const left = pct(b.start);
          const width = `${((b.end - b.start) / RANGE) * 100}%`;
          const style: React.CSSProperties =
            b.kind === "crash"
              ? {
                  left,
                  width,
                  backgroundColor: "rgba(0,0,0,0.04)",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(0,0,0,0.22) 0 3px, transparent 3px 7px)",
                }
              : {
                  left,
                  width,
                  backgroundColor: tone === "coffee" ? "#000" : "#1B2757",
                };
          return (
            <div
              key={i}
              className="absolute top-0 bottom-0"
              style={style}
              aria-hidden
            />
          );
        })}
      </div>
    </div>
  );
}

function LegendSwatch({
  tone,
  label,
}: {
  tone: "peak" | "crash" | "conka";
  label: string;
}) {
  const style: React.CSSProperties =
    tone === "conka"
      ? { backgroundColor: "#1B2757" }
      : tone === "peak"
        ? { backgroundColor: "#000" }
        : {
            backgroundColor: "rgba(0,0,0,0.04)",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.35) 0 3px, transparent 3px 7px)",
          };
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block w-5 h-2 border border-black/15"
        style={style}
        aria-hidden
      />
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/55">
        {label}
      </span>
    </span>
  );
}
