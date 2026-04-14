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
    <div>
      {/* Header — branded asset carrying the title + subtitle text.
          Mobile: full natural square, no crop, no rounded corners.
          Desktop: cropped 16:6 banner with rounded corners. */}
      <h2 className="sr-only">Your Brain, Optimised. What to expect after 30 days.</h2>
      <div className="relative mb-8 w-full overflow-hidden aspect-square lg:aspect-[16/6] lg:rounded-[var(--brand-radius-container)]">
        <Image
          src="/story/YourBrainOptimised.jpg"
          alt="CONKA Flow and Clear bottles. Your Brain, Optimised. What to expect after 30 days."
          fill
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="object-contain object-center lg:object-cover"
          priority={false}
        />
      </div>

      {/* Desktop: two-column layout with image on right */}
      <div className="lg:flex lg:gap-10 lg:items-start">
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

        {/* Lifestyle image -- desktop only */}
        <div className="hidden lg:block lg:w-[450px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div className="relative aspect-square rounded-[var(--brand-radius-card)] overflow-hidden">
            <Image
              src="/lifestyle/SatWoman.jpg"
              alt="Woman holding CONKA Flow and Clear brain shots"
              fill
              sizes="450px"
              className="object-cover"
            />
          </div>
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
