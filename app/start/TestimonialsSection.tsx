"use client";

import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingCTA from "../components/landing/LandingCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import { getSiteTestimonialsGeneral } from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

/**
 * Landing-page-only headline overrides. The Loox-imported headlines
 * are the customer's own opening sentence (often long, repetitive, or
 * mid-thought). On the landing carousel we want short, scannable,
 * varied summary titles. Body text is unchanged.
 */
const LANDING_HEADLINE_OVERRIDES: Record<string, string> = {
  "Tom B.": "Sharper training, no crash",
  "Issy G.": "Focused by day, recovered by night",
  "Dan N.": "Words just flow",
  "Will G.": "Real energy gains",
  "Aditya P.": "Built for crunch time",
  "Giovanni": "An edge on the pitch",
  "Ed C.": "Nothing else like it",
  "Sienna": "Easy daily upgrade",
  "Tanya": "A noticeable shift",
  "Imran S.": "Worth looking out for",
};

/** First 10 curated hero reviews — fixed order, no shuffle. Headlines overridden for landing. */
const LANDING_TESTIMONIALS: Testimonial[] = getSiteTestimonialsGeneral()
  .slice(0, 10)
  .map((t) => ({
    ...t,
    headline: LANDING_HEADLINE_OVERRIDES[t.name] ?? t.headline,
  }));

export default function TestimonialsSection() {
  return (
    <section
      className="brand-section brand-bg-white"
      aria-label="Customer reviews"
    >
      <div className="brand-track">
        <LandingTestimonials testimonials={LANDING_TESTIMONIALS} />
        <div className="mt-8 flex justify-start">
          <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
        </div>
      </div>
    </section>
  );
}
