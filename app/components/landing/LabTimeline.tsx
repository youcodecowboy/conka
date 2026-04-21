import Image from "next/image";
import ConkaCTAButton from "./ConkaCTAButton";
import LabTrustBadges from "./LabTrustBadges";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";

interface TimelineStep {
  code: string;
  timeframe: string;
  outcome: string;
  heading: string;
  body: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    code: "T+1D",
    timeframe: "Day 1",
    outcome: "Focus stabilisation",
    heading: "Focus without the noise",
    body: "Sharp, steady focus that lasts for hours. No jitters, no crash. Mental chatter quiets. The afternoon fog never arrives.",
  },
  {
    code: "T+14D",
    timeframe: "14 Days",
    outcome: "Momentum",
    heading: "All-day momentum",
    body: "Mornings feel sharper. Afternoons hold. Stress rolls off instead of building up. The dips that used to derail your day stop showing up.",
  },
  {
    code: "T+30D",
    timeframe: "30 Days",
    outcome: "Baseline reset",
    heading: "Your new normal",
    body: "Decisions come faster, problems feel simpler, thinking flows. Not a good day. Your everyday.",
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
  return (
    <div>
      {/* Mobile/tablet banner — full-bleed lifestyle asset, pulled up to flush with prior section */}
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

      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Expected Outcomes
      </p>
      <h2
        className="brand-h1 mb-2"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Your Brain, Optimised.
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-8">
        What to expect when taking CONKA
      </p>

      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Timeline cards */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:flex-1">
          {TIMELINE_STEPS.map((step) => (
            <div
              key={step.code}
              className="bg-white border border-black/12 p-5 lg:p-6"
            >
              {/* Timeframe chamfered tag */}
              <div className="mb-3 inline-flex">
                <span className="lab-clip-tr inline-flex items-center gap-2 bg-[#1B2757] text-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] leading-none tabular-nums">
                  <span>{step.code}</span>
                  <span className="text-white/60">·</span>
                  <span className="text-white/80">{step.timeframe}</span>
                </span>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold text-black mb-1">
                {step.heading}
              </h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-prose">
                {step.body}
              </p>

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
          ))}
        </div>

        {/* Desktop sidebar image */}
        <div className="hidden lg:block lg:w-[450px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/lifestyle/FlowConkaRing.jpg"
              alt="CONKA Flow bottle beside a phone showing a CONKA cognitive score of 92"
              fill
              sizes="450px"
              className="object-cover"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-3 left-3 w-[20%] h-[20%] border-t-[6px] border-l-[6px] border-white"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 right-3 w-[20%] h-[20%] border-b-[6px] border-r-[6px] border-white"
            />
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30 mt-6 mb-6 tabular-nums">
        Based on 5,000+ cognitive tests across 150+ participants
      </p>

      {!hideCTA && (
        <>
          <div className="flex flex-col items-start gap-2">
            <ConkaCTAButton href={ctaHref}>
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
