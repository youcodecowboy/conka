"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LandingCTA from "../components/landing/LandingCTA";
import { PRICE_PER_SHOT_BOTH } from "../lib/landingPricing";
import {
  getSiteTestimonialsGeneral,
  shuffleTestimonials,
} from "../lib/testimonialsFilter";
import type { Testimonial } from "../components/testimonials/types";

const Testimonials = dynamic(
  () => import("../components/testimonials/Testimonials"),
  { loading: () => <div className="h-[450px]" /> },
);

export default function TestimonialsSection() {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    Testimonial[]
  >([]);

  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(getSiteTestimonialsGeneral()));
  }, []);

  if (shuffledTestimonials.length === 0) return null;

  return (
    <section
      className="brand-section brand-bg-tint"
      aria-label="Customer reviews"
    >
      <div className="brand-track">
        <Testimonials testimonials={shuffledTestimonials} autoScrollOnly />
        <div className="mt-8 flex justify-start">
          <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
        </div>
      </div>
    </section>
  );
}
