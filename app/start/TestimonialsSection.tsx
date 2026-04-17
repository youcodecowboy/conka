"use client";

import LandingTestimonials from "../components/landing/LandingTestimonials";
import LandingCTA from "../components/landing/LandingCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import { CURATED_TESTIMONIALS } from "../lib/customerTestimonials";

export default function TestimonialsSection() {
  return (
    <section
      className="brand-section brand-bg-white"
      aria-label="Customer reviews"
    >
      <div className="brand-track">
        <LandingTestimonials testimonials={CURATED_TESTIMONIALS} />
        <div className="mt-8 flex justify-start">
          <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
        </div>
      </div>
    </section>
  );
}
