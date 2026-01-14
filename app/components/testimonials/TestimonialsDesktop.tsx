"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import TestimonialCard from "./TestimonialCard";
import type { TestimonialsProps } from "./types";

/**
 * Generate grouped dot indicators (5-8 dots)
 * First dot = first testimonial, last dot = last testimonial
 * Middle dots represent groups of testimonials
 */
function generateGroupedDots(total: number, maxDots: number = 7): number[] {
  if (total <= maxDots) {
    // If we have fewer testimonials than max dots, show one dot per testimonial
    return Array.from({ length: total }, (_, i) => i);
  }

  const dots: number[] = [0]; // First dot always represents first testimonial

  // Calculate how many testimonials each middle dot represents
  const middleDotsCount = maxDots - 2; // Exclude first and last
  const testimonialsPerDot = Math.ceil((total - 1) / (middleDotsCount + 1));

  // Generate middle dots
  for (let i = 1; i <= middleDotsCount; i++) {
    const testimonialIndex = Math.min(
      i * testimonialsPerDot,
      total - 1
    );
    if (testimonialIndex > 0 && testimonialIndex < total - 1) {
      dots.push(testimonialIndex);
    }
  }

  // Last dot always represents last testimonial
  if (total > 1) {
    dots.push(total - 1);
  }

  return dots;
}

export default function TestimonialsDesktop({
  testimonials,
  showRating = true,
}: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Generate grouped dots (5-8 dots)
  const dotIndices = useMemo(
    () => generateGroupedDots(testimonials.length, 7),
    [testimonials.length]
  );

  // Calculate card width (including gap)
  const cardWidth = 420; // ~400px card + 20px gap
  const gap = 24; // gap-6

  // Update scroll buttons state and active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Update active index based on scroll position (accounting for centering padding)
      const padding = (clientWidth - cardWidth) / 2;
      const adjustedScroll = scrollLeft + padding;
      const index = Math.round(adjustedScroll / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(0, index), testimonials.length - 1));
    };

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [testimonials.length, cardWidth, gap]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    // Calculate scroll position accounting for centering padding
    const containerWidth = container.clientWidth;
    const padding = (containerWidth - cardWidth) / 2;
    const scrollPosition = index * (cardWidth + gap) - padding;
    container.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container || !canScrollLeft) return;

    const currentScroll = container.scrollLeft;
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container || !canScrollRight) return;

    const newIndex = Math.min(testimonials.length - 1, activeIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Don't just take our word for it
          </h2>
          <p className="font-commentary text-xl opacity-80">
            see what our customers are saying
          </p>
        </div>

        {/* Carousel Container - Relative for arrow positioning and gradients */}
        <div className="relative -mx-6 md:-mx-16">
          {/* Left Arrow - Inverted colors */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-6 md:left-16 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 flex items-center justify-center border-2 border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] transition-all ${
              canScrollLeft
                ? "opacity-100 hover:opacity-90 cursor-pointer"
                : "opacity-30 cursor-not-allowed pointer-events-none"
            }`}
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow - Inverted colors */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-6 md:right-16 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 flex items-center justify-center border-2 border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] transition-all ${
              canScrollRight
                ? "opacity-100 hover:opacity-90 cursor-pointer"
                : "opacity-30 cursor-not-allowed pointer-events-none"
            }`}
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />

          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          {/* Scrollable Cards Container - Wider to show partial cards, no swipe on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              paddingLeft: "calc(50% - 210px)",
              paddingRight: "calc(50% - 210px)",
              touchAction: "pan-y", // Only allow vertical touch scrolling, disable horizontal swipe
              overscrollBehaviorX: "none", // Prevent horizontal overscroll
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 snap-start"
                style={{ width: `${cardWidth}px` }}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  showRating={showRating}
                  isMobile={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicators - Grouped Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {dotIndices.map((testimonialIndex, dotIdx) => {
            // Determine if this dot should be active
            // Active if current index is within the range this dot represents
            let isActive = false;
            if (dotIdx === 0) {
              // First dot: active if we're at the first testimonial
              isActive = activeIndex === 0;
            } else if (dotIdx === dotIndices.length - 1) {
              // Last dot: active if we're at or past the last testimonial index
              isActive = activeIndex >= testimonialIndex;
            } else {
              // Middle dots: active if current index is between previous dot and this dot
              const prevIndex = dotIndices[dotIdx - 1];
              isActive = activeIndex >= prevIndex && activeIndex < testimonialIndex;
            }

            return (
              <button
                key={dotIdx}
                onClick={() => scrollToIndex(testimonialIndex)}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? "bg-[var(--foreground)] opacity-100 scale-125"
                    : "bg-[var(--foreground)] opacity-20 scale-100"
                }`}
                aria-label={`Go to testimonial group ${dotIdx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
