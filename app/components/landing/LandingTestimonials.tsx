"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Testimonial } from "@/app/components/testimonials/types";

const CARD_WIDTH_MOBILE = 300;
const CARD_WIDTH_DESKTOP = 340;
const GAP = 16;
const AUTO_ADVANCE_MS = 4000;
const RESUME_DELAY_MS = 5000;
const CHAR_LIMIT = 200;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-black/10"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  cardWidth,
}: {
  testimonial: Testimonial;
  cardWidth: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = testimonial.body.length > CHAR_LIMIT;
  const displayBody =
    expanded || !needsTruncation
      ? testimonial.body
      : `${testimonial.body.slice(0, CHAR_LIMIT)}...`;

  return (
    <div
      className="flex-shrink-0 snap-center bg-white rounded-[var(--brand-radius-container)] border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-3"
      style={{ width: cardWidth }}
    >
      {/* Header: photo/initial + name + product */}
      <div className="flex items-center gap-3">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[var(--brand-bg-tint)] flex items-center justify-center text-sm font-bold text-black/40 flex-shrink-0">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-black truncate">
            {testimonial.name}
          </p>
          {testimonial.productLabel && (
            <p className="text-xs text-black/40">{testimonial.productLabel}</p>
          )}
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={testimonial.rating} />

      {/* Headline */}
      {testimonial.headline && (
        <p className="text-sm font-semibold text-black leading-snug">
          {testimonial.headline}
        </p>
      )}

      {/* Body */}
      <p className="text-sm text-black/60 leading-relaxed flex-1">
        {displayBody}
        {needsTruncation && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-brand-accent font-medium"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function LandingTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_MOBILE);

  // Responsive card width
  useEffect(() => {
    const update = () =>
      setCardWidth(window.innerWidth >= 1024 ? CARD_WIDTH_DESKTOP : CARD_WIDTH_MOBILE);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalCards = testimonials.length;
  const step = cardWidth + GAP;

  // Track scroll position to update dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / step);
      setActiveIndex(Math.min(index, totalCards - 1));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [step, totalCards]);

  // Auto-advance
  useEffect(() => {
    if (isPaused || totalCards <= 1) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const nextIndex = activeIndex + 1;
      if (nextIndex >= totalCards) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex, step, totalCards]);

  const pauseAndScheduleResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY_MS);
  }, []);

  // Cleanup resume timer
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({ left: index * step, behavior: "smooth" });
    pauseAndScheduleResume();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="brand-h2 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Real people. Real results.
        </h2>
        <p className="brand-body text-black/60">
          500+ verified reviews from athletes, founders, and professionals.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
        onTouchStart={pauseAndScheduleResume}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name + i} testimonial={t} cardWidth={cardWidth} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Review navigation">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Review ${i + 1}`}
            onClick={() => scrollToIndex(i)}
            className="flex items-center justify-center w-6 h-6"
          >
            <span
              className={`block rounded-full transition-all ${
                i === activeIndex
                  ? "bg-black/60 w-4 h-2"
                  : "bg-black/15 hover:bg-black/30 w-2 h-2"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
