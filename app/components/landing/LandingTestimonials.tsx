"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Testimonial } from "@/app/components/testimonials/types";

const CARD_WIDTH_MOBILE = 300;
const CARD_WIDTH_DESKTOP = 340;
const GAP = 16;
const AUTO_ADVANCE_MS = 2500;
const TRANSITION_MS = 600;
const RESUME_DELAY_MS = 6000;
const CHAR_LIMIT = 200;
const SWIPE_THRESHOLD = 50;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-black/10"}
          style={{ fontSize: "1rem" }}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
      aria-label="Verified buyer"
    >
      <circle cx="8" cy="8" r="8" fill="#22c55e" />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
      className="flex-shrink-0 bg-white rounded-[var(--brand-radius-container)] border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden"
      style={{ width: cardWidth }}
    >
      {/* Text content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Name + verified */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-black">
            {testimonial.name}
          </p>
          <VerifiedBadge />
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
        <p className="text-sm text-black leading-relaxed whitespace-pre-line flex-1">
          &ldquo;{displayBody}&rdquo;
          {needsTruncation && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="ml-1 text-brand-accent font-medium"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Lifestyle photo */}
      {testimonial.photo && (
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={testimonial.photo}
            alt={`${testimonial.name} using CONKA`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 300px, 340px"
          />
        </div>
      )}
    </div>
  );
}

export default function LandingTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const totalCards = testimonials.length;
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH_MOBILE);
  const step = cardWidth + GAP;

  // Responsive card width
  useEffect(() => {
    const update = () =>
      setCardWidth(
        window.innerWidth >= 1024 ? CARD_WIDTH_DESKTOP : CARD_WIDTH_MOBILE
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Infinite loop: render 3 copies [clone | real | clone]
  // Real slides live at indices totalCards .. 2*totalCards-1
  const extended = [...testimonials, ...testimonials, ...testimonials];

  const [pos, setPos] = useState(totalCards); // start at first real slide
  const [smooth, setSmooth] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<number>(0);

  const realIndex = ((pos % totalCards) + totalCards) % totalCards;
  const offset = -(pos * step);

  // After a smooth transition ends, snap back to real zone if in clone territory
  const handleTransitionEnd = useCallback(() => {
    if (pos >= totalCards * 2) {
      setSmooth(false);
      setPos(totalCards + (pos % totalCards));
    } else if (pos < totalCards) {
      setSmooth(false);
      setPos(totalCards + (pos % totalCards));
    }
  }, [pos, totalCards]);

  // Re-enable smooth transitions after a snap (needs 2 rAF to let browser apply the jump first)
  useEffect(() => {
    if (!smooth) {
      let id: number;
      id = requestAnimationFrame(() => {
        id = requestAnimationFrame(() => {
          setSmooth(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [smooth]);

  // Stop-start auto-advance
  useEffect(() => {
    if (isPaused || totalCards <= 1) return;
    const interval = setInterval(() => {
      setSmooth(true);
      setPos((p) => p + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, totalCards]);

  const pauseAndScheduleResume = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(
      () => setIsPaused(false),
      RESUME_DELAY_MS
    );
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Dot navigation
  const goToSlide = (targetReal: number) => {
    const currentReal = ((pos % totalCards) + totalCards) % totalCards;
    const diff = targetReal - currentReal;
    setSmooth(true);
    setPos((p) => p + diff);
    pauseAndScheduleResume();
  };

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    pauseAndScheduleResume();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      setSmooth(true);
      setPos((p) => p + (delta > 0 ? 1 : -1));
    }
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
        className="overflow-hidden -mx-4 px-4 lg:mx-0 lg:px-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            gap: GAP,
            transform: `translate3d(${offset}px, 0, 0)`,
            transition: smooth
              ? `transform ${TRANSITION_MS}ms ease`
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((t, i) => (
            <TestimonialCard
              key={`slide-${i}`}
              testimonial={t}
              cardWidth={cardWidth}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-1.5 mt-4"
        role="tablist"
        aria-label="Review navigation"
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === realIndex}
            aria-label={`Review ${i + 1}`}
            onClick={() => goToSlide(i)}
            className="flex items-center justify-center w-6 h-6"
          >
            <span
              className={`block rounded-full transition-all ${
                i === realIndex
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
