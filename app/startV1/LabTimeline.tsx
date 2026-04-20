import Image from "next/image";
import LabCTA from "./LabCTA";
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
}: {
  hideCTA?: boolean;
} = {}) {
  return (
    <div className="-mt-20 md:mt-0">
      <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Expected Outcomes
      </p>
      <h2 className="sr-only lg:not-sr-only brand-h1 lg:mb-2">
        Your Brain, Optimised.
      </h2>
      <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums mb-8">
        Protocol window: T+0 to T+30D · N=150+ participants
      </p>

      {/* Mobile/tablet banner — wrapped in lab-asset-frame for clinical framing */}
      <div className="lab-asset-frame relative mb-6 -mx-5 w-[calc(100%+2.5rem)] overflow-hidden aspect-[1/1.9] md:mb-10 md:mx-4 md:w-[calc(100%-2rem)] md:aspect-[16/6] lg:hidden">
        <Image
          src="/story/YourBrainOptimised.jpg"
          alt="CONKA Flow and Clear bottles. Your Brain, Optimised. What to expect after 30 days."
          fill
          sizes="(max-width: 1024px) 100vw, 0px"
          className="object-cover object-top md:object-center"
          priority={false}
        />
      </div>

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
          <div className="relative aspect-square overflow-hidden lab-asset-frame">
            <Image
              src="/lifestyle/ConkaAtWorkDesk.jpg"
              alt="CONKA bottle on a work desk beside a keyboard"
              fill
              sizes="450px"
              className="object-cover"
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
            <LabCTA>Try Both from £{PRICE_PER_SHOT_BOTH}/shot</LabCTA>
          </div>
          <div className="mt-6">
            <LabTrustBadges />
          </div>
        </>
      )}
    </div>
  );
}
