"use client";

import TestimonialsAutoScrollStrip from "./TestimonialsAutoScrollStrip";
import type { TestimonialsProps } from "./types";

/**
 * Testimonials: auto-scrolling strip (surface bg, white cards).
 * Pauses on hover or when a card is expanded for "Read more".
 */
export default function Testimonials({
  testimonials,
  maxReviews,
  showRating = true,
}: TestimonialsProps) {
  const displayTestimonials = maxReviews
    ? testimonials.slice(0, maxReviews)
    : testimonials;

  return (
    <TestimonialsAutoScrollStrip
      testimonials={displayTestimonials}
      showRating={showRating}
    />
  );
}
