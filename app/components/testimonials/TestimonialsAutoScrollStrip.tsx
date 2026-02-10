"use client";

import { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import TestimonialsSubtitle from "./TestimonialsSubtitle";
import useIsMobile from "../../hooks/useIsMobile";
import type { TestimonialsProps } from "./types";

const CARD_WIDTH = 312;
const GAP = 24;

function cardKey(testimonial: { name: string; date: string; headline: string }, idx: number) {
  return `${testimonial.name}-${testimonial.date}-${testimonial.headline}-${idx}`;
}

/**
 * Auto-scrolling testimonials strip for product hero.
 * Full-bleed strip (edge to edge), white section, grey cards.
 * Interactable: hover or expand a card pauses the scroll so user can click "Read more".
 */
export default function TestimonialsAutoScrollStrip({
  testimonials,
  showRating = true,
}: Pick<TestimonialsProps, "testimonials" | "showRating">) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile(1024);

  const oneSetWidth = testimonials.length * (CARD_WIDTH + GAP);
  const totalWidth = 2 * oneSetWidth;
  const duplicated = [...testimonials, ...testimonials];
  // On mobile, ignore hover—touch can set isHovered without mouseLeave, freezing the scroll
  const isPaused = expandedKey != null || (isHovered && isMobile === false);

  return (
    <section className="w-full py-10 md:py-14 overflow-x-hidden" style={{ background: "var(--color-surface)" }}>
      {/* Header: constrained width + padding */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="premium-section-heading mb-2">
            Don&apos;t just take our word for it...
          </h2>
          <div className="flex justify-center">
            <TestimonialsSubtitle />
          </div>
        </div>
      </div>

      {/* Full-bleed strip: edge to edge, interactable, pauses on hover or when a card is expanded */}
      <div
        className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: "100vw" }}
      >
        <div
          className={`testimonials-marquee-strip gap-6 ${isPaused ? "paused" : ""}`}
          style={{ width: `${totalWidth}px` }}
        >
          {duplicated.map((testimonial, idx) => {
            const key = cardKey(testimonial, idx);
            return (
              <div
                key={key}
                className="flex-shrink-0"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  showRating={showRating}
                  isMobile={false}
                  variant="productHero"
                  isExpanded={expandedKey === key}
                  onToggleExpand={() =>
                    setExpandedKey((prev) => (prev === key ? null : key))
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
