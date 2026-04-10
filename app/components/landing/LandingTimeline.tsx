"use client";

import { useState } from "react";
import type { WhatToExpectStep } from "@/app/lib/whatToExpectData";
import {
  whatToExpectStepsBoth,
  whatToExpectStepsFlow,
  whatToExpectStepsClear,
} from "@/app/lib/whatToExpectData";

type TimelineProduct = "both" | "flow" | "clear";

const PRODUCT_OPTIONS: { key: TimelineProduct; label: string }[] = [
  { key: "both", label: "Both" },
  { key: "flow", label: "Flow" },
  { key: "clear", label: "Clear" },
];

const TIMELINE_DATA: Record<TimelineProduct, WhatToExpectStep[]> = {
  both: whatToExpectStepsBoth,
  flow: whatToExpectStepsFlow,
  clear: whatToExpectStepsClear,
};

export default function LandingTimeline() {
  const [selected, setSelected] = useState<TimelineProduct>("both");
  const steps = TIMELINE_DATA[selected];

  return (
    <div>
      {/* Header block -- Magic Mind-inspired two-line headline */}
      <div className="mb-10">
        <p className="brand-caption text-black/40 uppercase tracking-widest mb-1">
          what to expect
        </p>
        <h2
          className="brand-h2 mb-1"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Your brain.
        </h2>
        <p className="brand-caption text-black/40 uppercase tracking-widest mb-1">
          after 30 days
        </p>
        <h2
          className="brand-h2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Optimized.
        </h2>
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

      {/* Vertical timeline */}
      <div className="relative pl-8 lg:pl-10">
        {/* Vertical line */}
        <div
          className="absolute left-[7px] lg:left-[9px] top-2 bottom-2 w-px bg-black/10"
          aria-hidden
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
                aria-hidden
              />

              {/* Step content */}
              <p className="text-xs font-semibold text-black/40 uppercase tracking-wider mb-1">
                {step.subheading}
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
