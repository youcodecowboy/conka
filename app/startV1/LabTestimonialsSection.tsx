"use client";

import LandingTestimonials from "../components/landing/LandingTestimonials";
import LabCTA from "./LabCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import { CURATED_TESTIMONIALS } from "../lib/customerTestimonials";

export default function LabTestimonialsSection() {
  return (
    <section
      className="brand-section brand-bg-white"
      aria-label="Customer reviews"
    >
      <div className="brand-track">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          Verified Reviews
        </p>
        <LandingTestimonials testimonials={CURATED_TESTIMONIALS} />
        <div className="mt-8 flex justify-start">
          <LabCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot</LabCTA>
        </div>
      </div>
    </section>
  );
}
