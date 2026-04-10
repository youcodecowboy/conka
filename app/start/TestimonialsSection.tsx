"use client";

import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingCTA from "../components/landing/LandingCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import { getSiteTestimonialsGeneral } from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

/** First 10 curated hero reviews — fixed order, no shuffle. */
const LANDING_TESTIMONIALS: Testimonial[] =
  getSiteTestimonialsGeneral().slice(0, 10);

export default function TestimonialsSection() {
  return (
    <section
      className="brand-section brand-bg-tint"
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
