"use client";

import useIsMobile from "../../hooks/useIsMobile";
import TestimonialsAutoScrollStrip from "./TestimonialsAutoScrollStrip";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import type { TestimonialsProps } from "./types";

/**
 * Testimonials component orchestrator
 * When autoScrollOnly: renders non-interactive auto-scrolling strip (surface bg, white cards).
 * Otherwise: conditional mobile/desktop with arrows, dots, swipe.
 */
export default function Testimonials({
  testimonials,
  maxReviews,
  showRating = true,
  autoScrollOnly = false,
}: TestimonialsProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Limit testimonials if maxReviews is specified
  const displayTestimonials = maxReviews
    ? testimonials.slice(0, maxReviews)
    : testimonials;

  if (autoScrollOnly) {
    return (
      <TestimonialsAutoScrollStrip
        testimonials={displayTestimonials}
        showRating={showRating}
      />
    );
  }

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
