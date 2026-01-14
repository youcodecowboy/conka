"use client";

import { useRef, useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import type { TestimonialsProps } from "./types";

export default function TestimonialsMobile({
  testimonials,
  showRating = true,
}: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position to update active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.85; // Card is 85vw
      const gap = 16; // gap-4
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, testimonials.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [testimonials.length]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.85;
    const gap = 16;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-12">
      {/* Header - Left Aligned */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Don't just take our word for it
        </h2>
        <p className="font-commentary text-lg opacity-80">
          see what our customers are saying
        </p>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6"
        style={{ scrollPaddingLeft: "24px" }}
      >
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 snap-start"
            style={{ width: "85vw", maxWidth: "400px" }}
          >
            <TestimonialCard
              testimonial={testimonial}
              showRating={showRating}
              isMobile={true}
            />
          </div>
        ))}
        {/* Spacer for last card */}
        <div className="flex-shrink-0 w-6" />
      </div>

      {/* Scroll Indicators */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {/* Dots */}
        <div className="flex gap-2">
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

        {/* Swipe Hint */}
        <p className="font-commentary text-xs opacity-50 flex items-center gap-1">
          <span>swipe for more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </p>
      </div>
    </section>
  );
}
