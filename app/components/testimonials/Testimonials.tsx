"use client";

import useIsMobile from "../../hooks/useIsMobile";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import type { TestimonialsProps } from "./types";

/**
 * Testimonials component orchestrator
 * Conditionally renders mobile or desktop version based on viewport size
 */
export default function Testimonials({
  testimonials,
  maxReviews,
  showRating = true,
}: TestimonialsProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Limit testimonials if maxReviews is specified
  const displayTestimonials = maxReviews
    ? testimonials.slice(0, maxReviews)
    : testimonials;

  // Render mobile version on smaller viewports
  if (isMobile) {
    return (
      <TestimonialsMobile
        testimonials={displayTestimonials}
        showRating={showRating}
      />
    );
  }

  // Render desktop version on larger viewports
  return (
    <TestimonialsDesktop
      testimonials={displayTestimonials}
      showRating={showRating}
    />
  );
}
