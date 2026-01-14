"use client";

import { useRef, useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import type { TestimonialsProps } from "./types";

export default function TestimonialsDesktop({
  testimonials,
  showRating = true,
}: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

      // Update active index based on scroll position
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, testimonials.length - 1));
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

    const scrollPosition = index * (cardWidth + gap);
    container.scrollTo({
      left: scrollPosition,
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Don't just take our word for it
          </h2>
          <p className="font-commentary text-xl opacity-80">
            see what our customers are saying
          </p>
        </div>

        {/* Carousel Container - Relative for arrow positioning */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 flex items-center justify-center neo-box transition-all ${
              canScrollLeft
                ? "opacity-100 hover:opacity-80 cursor-pointer"
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

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 flex items-center justify-center neo-box transition-all ${
              canScrollRight
                ? "opacity-100 hover:opacity-80 cursor-pointer"
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

          {/* Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4"
            style={{ scrollPaddingLeft: "24px" }}
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

        {/* Scroll Indicators - Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === idx
                  ? "bg-[var(--foreground)] opacity-100 scale-125"
                  : "bg-[var(--foreground)] opacity-20 scale-100"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
