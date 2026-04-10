interface LandingTimelineStep {
  timeframe: string;
  heading: string;
  body: string;
}

const TIMELINE_STEPS: LandingTimelineStep[] = [
  {
    timeframe: "Day 1",
    heading: "Calm focus meets clear thinking",
    body: "Flow quiets mental chatter. Clear lifts the fog. Two shots, two systems working together from the first day.",
  },
  {
    timeframe: "14 Days",
    heading: "The full-day difference",
    body: "Adaptogens and antioxidants stack daily. Mornings feel sharper, afternoons hold steadier, fewer dips.",
  },
  {
    timeframe: "30 Days",
    heading: "Your new baseline",
    body: "Focus and clarity compound into your default state. Not a good day -- your everyday.",
  },
];

export default function LandingTimeline() {
  return (
    <div>
      {/* Header block -- bold text with tight subtitle beneath */}
      <div className="mb-10">
        <h2
          className="brand-h2 mb-0"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Your brain.
        </h2>
        <p className="brand-caption text-black/40 uppercase tracking-widest mb-3">
          what to expect
        </p>
        <h2
          className="brand-h2 mb-0"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Optimized.
        </h2>
        <p className="brand-caption text-black/40 uppercase tracking-widest">
          after 30 days
        </p>
      </div>

      {/* Vertical timeline -- 3 steps */}
      <div className="relative pl-8 lg:pl-10">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] lg:left-[9px] top-2 bottom-2 w-px bg-black/10"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 lg:gap-10">
          {TIMELINE_STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Step dot */}
              <div
                className={`absolute -left-8 lg:-left-10 top-1 w-[15px] h-[15px] lg:w-[19px] lg:h-[19px] rounded-full border-2 ${
                  i === 0
                    ? "bg-brand-accent border-brand-accent"
                    : "bg-white border-black/20"
                }`}
                aria-hidden="true"
              />

              {/* Step content */}
              <p className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-1">
                {step.timeframe}
              </p>
              <h3 className="text-base font-semibold text-black mb-1">
                {step.heading}
              </h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-prose">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
