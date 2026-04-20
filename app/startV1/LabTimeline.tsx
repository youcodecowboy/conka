import Image from "next/image";
import LabCTA from "./LabCTA";
import LandingTrustBadges from "../components/landing/LandingTrustBadges";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";

interface TimelineStep {
  timeframe: string;
  heading: string;
  body: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    timeframe: "Day 1",
    heading: "Focus without the noise",
    body: "Sharp, steady focus that lasts for hours. No jitters, no crash. Mental chatter quiets. The afternoon fog never arrives.",
  },
  {
    timeframe: "14 Days",
    heading: "All-day momentum",
    body: "Mornings feel sharper. Afternoons hold. Stress rolls off instead of building up. The dips that used to derail your day stop showing up.",
  },
  {
    timeframe: "30 Days",
    heading: "Your new normal",
    body: "Decisions come faster, problems feel simpler, thinking flows. Not a good day. Your everyday.",
  },
];

export default function LabTimeline({ hideCTA = false }: { hideCTA?: boolean } = {}) {
  return (
    <div className="-mt-20 md:mt-0">
      <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Expected Outcomes
      </p>
      <h2 className="sr-only lg:not-sr-only brand-h1 lg:mb-2">
        Your Brain, Optimised.
      </h2>
      <p className="hidden lg:block brand-caption text-black/50 mb-8">
        What to expect after 30 days
      </p>

      {/* Mobile/tablet banner */}
      <div className="relative mb-2 -mx-5 w-[calc(100%+2.5rem)] overflow-hidden aspect-[1/1.9] md:mb-8 md:mx-0 md:w-full md:aspect-[16/6] md:rounded-none lg:hidden">
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
          {TIMELINE_STEPS.map((step, i) => (
            <div
              key={i}
              className="rounded-[var(--brand-radius-card)] bg-white border border-black/8 p-5 lg:p-6"
            >
              <span className="inline-block font-mono text-xs uppercase tracking-[0.15em] text-black/50 border border-black/15 px-3 py-1 mb-3 rounded-[var(--brand-radius-interactive)]">
                {step.timeframe}
              </span>
              <h3 className="text-xl lg:text-2xl font-semibold text-black mb-1">
                {step.heading}
              </h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-prose">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop sidebar image */}
        <div className="hidden lg:block lg:w-[450px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative aspect-square rounded-[var(--brand-radius-card)] overflow-hidden">
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

      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30 mt-6 mb-6">
        Based on 5,000+ cognitive tests across 150+ participants
      </p>

      {!hideCTA && (
        <>
          <div className="flex flex-col items-start gap-2">
            <LabCTA>Try Both from £{PRICE_PER_SHOT_BOTH}/shot →</LabCTA>
          </div>
          <div className="mt-6">
            <LandingTrustBadges />
          </div>
        </>
      )}
    </div>
  );
}
