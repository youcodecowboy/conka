import Image from "next/image";
import LandingCTA from "./LandingCTA";
import LandingTrustBadges from "./LandingTrustBadges";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";

interface LandingTimelineStep {
  timeframe: string;
  heading: string;
  body: string;
}

const TIMELINE_STEPS: LandingTimelineStep[] = [
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

export default function LandingTimeline() {
  return (
    /* -mt-20 on mobile cancels the brand-section mobile padding-top
       (5rem = 80px) so the banner sits flush with the section top edge.
       Desktop is untouched. */
    <div className="-mt-20 md:mt-0">
      {/* Header — branded asset carrying the title + subtitle text.
          Mobile (<768px): full-bleed (negative margin cancels the
          1.25rem brand-section gutter), aspect-[1/2] matches the
          natural asset dimensions (1125x2250) so no crop, no rounded
          corners.
          Tablet+ (md, 768px+): unchanged — 16:6 banner contained
          within the gutter with rounded corners. */}
      {/* Mobile + tablet: top banner. Desktop (lg+): hidden — the asset
          renders as a tall left sidebar inside the two-column block below. */}
      <h2 className="sr-only">Your Brain, Optimised. What to expect after 30 days.</h2>
      <div className="relative mb-2 -mx-5 w-[calc(100%+2.5rem)] overflow-hidden aspect-[1/2] md:mb-8 md:mx-0 md:w-full md:aspect-[16/6] md:rounded-[var(--brand-radius-container)] lg:hidden">
        <Image
          src="/story/YourBrainOptimised.jpg"
          alt="CONKA Flow and Clear bottles. Your Brain, Optimised. What to expect after 30 days."
          fill
          sizes="(max-width: 1024px) 100vw, 0px"
          className="object-cover object-top md:object-center"
          priority={false}
        />
      </div>

      {/* Desktop: two-column layout — branded asset on left, cards on right */}
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Branded asset — desktop only, left sidebar, full natural 1:2 aspect, sticky */}
        <div className="hidden lg:block lg:w-[420px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative aspect-[1/2] rounded-[var(--brand-radius-card)] overflow-hidden bg-white">
            <Image
              src="/story/YourBrainOptimised.jpg"
              alt="CONKA bottle. Your Brain, Optimised. What to expect after 30 days."
              fill
              sizes="420px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Timeline cards */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:flex-1">
          {TIMELINE_STEPS.map((step, i) => (
            <div
              key={i}
              className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 shadow-sm p-5 lg:p-6"
            >
              {/* Timeframe pill */}
              <span className="inline-block rounded-[var(--brand-radius-interactive)] bg-brand-accent/8 text-brand-accent text-sm font-semibold px-3 py-1 mb-3">
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
      </div>

      {/* Proof point */}
      <p className="brand-caption text-black/40 mt-6 mb-6">
        Based on 5,000+ cognitive tests across 150+ participants
      </p>

      {/* CTA */}
      <div className="flex flex-col items-start gap-2">
        <LandingCTA>Try Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
      </div>

      {/* Trust Badges */}
      <div className="mt-6">
        <LandingTrustBadges />
      </div>
    </div>
  );
}
