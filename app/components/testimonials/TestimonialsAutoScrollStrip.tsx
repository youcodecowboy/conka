"use client";

import TestimonialCard from "./TestimonialCard";
import type { TestimonialsProps } from "./types";

const CARD_WIDTH = 312;
const GAP = 24;

/**
 * Auto-scrolling testimonials strip for product hero.
 * Background #f4f6f5, white rounded equal-height cards, no user interaction.
 * Slower scroll on mobile (via CSS media query).
 */
export default function TestimonialsAutoScrollStrip({
  testimonials,
  showRating = true,
}: Pick<TestimonialsProps, "testimonials" | "showRating">) {
  const oneSetWidth = testimonials.length * (CARD_WIDTH + GAP);
  const totalWidth = 2 * oneSetWidth;
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section
      className="w-full py-10 md:py-14 px-4 md:px-6"
      style={{ backgroundColor: "#f4f6f5" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Don&apos;t just take our word for it...
          </h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            See what our customers are saying
          </p>
        </div>

        {/* Non-interactive marquee strip */}
        <div
          className="overflow-hidden w-full pointer-events-none select-none"
          aria-hidden
        >
          <div
            className="testimonials-marquee-strip gap-6"
            style={{ width: `${totalWidth}px` }}
          >
            {duplicated.map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${testimonial.date}-${idx}`}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  showRating={showRating}
                  isMobile={false}
                  variant="productHero"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
