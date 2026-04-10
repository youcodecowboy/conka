"use client";

import { useState } from "react";

type TimelineProduct = "both" | "flow" | "clear";

interface LandingTimelineStep {
  timeframe: string;
  heading: string;
  body: string;
}

/* ------------------------------------------------------------------ */
/*  Landing-specific timeline data (shorter than PDP versions)         */
/*  3 steps: immediate, 14 days, 30 days. One sentence each.          */
/* ------------------------------------------------------------------ */

const LANDING_TIMELINE: Record<TimelineProduct, LandingTimelineStep[]> = {
  both: [
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
  ],
  flow: [
    {
      timeframe: "Day 1",
      heading: "Calm focus without the fog",
      body: "Lemon balm supports GABA in the brain. Less mental chatter, easier focus within the first half-hour.",
    },
    {
      timeframe: "14 Days",
      heading: "Energy, focus, resilience",
      body: "Adaptogens like ashwagandha and rhodiola stack. Steadier energy through the day, fewer afternoon dips.",
    },
    {
      timeframe: "30 Days",
      heading: "Mind and body in balance",
      body: "Neuroprotection and calm focus from the full stack. Sustained clarity becomes your new normal.",
    },
  ],
  clear: [
    {
      timeframe: "Day 1",
      heading: "Clearer head, less brain fog",
      body: "Glutathione and vitamin C dampen oxidative stress. The fog lifts, complex tasks get easier.",
    },
    {
      timeframe: "14 Days",
      heading: "Noticeable cognitive lift",
      body: "Antioxidant capacity rises daily. Steadier focus, more repeatable mental performance.",
    },
    {
      timeframe: "30 Days",
      heading: "Compound mental clarity",
      body: "The full nootropic and antioxidant stack compounds. Clarity that sticks, not a short-lived boost.",
    },
  ],
};

const PRODUCT_OPTIONS: { key: TimelineProduct; label: string }[] = [
  { key: "both", label: "Both" },
  { key: "flow", label: "Flow" },
  { key: "clear", label: "Clear" },
];

export default function LandingTimeline() {
  const [selected, setSelected] = useState<TimelineProduct>("both");
  const steps = LANDING_TIMELINE[selected];

  return (
    <div>
      {/* Header block -- bold text above faint subtitle */}
      <div className="mb-10">
        <h2
          className="brand-h2 mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Your brain.
        </h2>
        <p className="brand-caption text-black/40 uppercase tracking-widest mb-4">
          what to expect
        </p>
        <h2
          className="brand-h2 mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Optimized.
        </h2>
        <p className="brand-caption text-black/40 uppercase tracking-widest">
          after 30 days
        </p>
      </div>

      {/* Product picker pills */}
      <div className="flex gap-2 mb-8" role="tablist" aria-label="Select product timeline">
        {PRODUCT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={selected === opt.key}
            onClick={() => setSelected(opt.key)}
            className={`px-4 py-2 rounded-[var(--brand-radius-interactive)] text-sm font-semibold transition-colors ${
              selected === opt.key
                ? "bg-brand-accent text-white"
                : "bg-black/[0.04] text-black/60 hover:bg-black/[0.08]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Vertical timeline -- 3 steps */}
      <div className="relative pl-8 lg:pl-10">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] lg:left-[9px] top-2 bottom-2 w-px bg-black/10"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8 lg:gap-10">
          {steps.map((step, i) => (
            <div key={`${selected}-${i}`} className="relative">
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
