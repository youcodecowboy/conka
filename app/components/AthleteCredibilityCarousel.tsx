"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export type AthleteSlide = {
  name: string;
  sport: string;
  quote: string;
  image: string;
};

const ATHLETE_SLIDES: AthleteSlide[] = [
  {
    name: "Dan Norton",
    sport: "Rugby Sevens — Olympic Silver Medalist",
    quote:
      "I am finding myself being able to speak clearer and in conversations my words just flow better. I have more calmness.",
    image: "/testimonials/athlete/DanNorton.jpg",
  },
  {
    name: "Josh Stanton",
    sport: "Professional Racing Driver",
    quote:
      "When you are sat in a car you need to be in a calm state, but also you need to be aggressive. Really important to have this clarity of thought. The benefits CONKA gives me and knowing I have this edge is fantastic.",
    image: "/testimonials/athlete/JoshStanton.jpg",
  },
  {
    name: "Chris Billam-Smith",
    sport: "Professional Boxing — WBO Cruiserweight Champion",
    quote:
      "Helps with concentration and mental focus. It was a massive benefit for my last fight which needed a lot of focus against a big puncher.",
    image: "/testimonials/athlete/ChrisBillamSmith.jpg",
  },
  {
    name: "Sienna Charles",
    sport: "Showjumping — GB Senior Team, European Medallist",
    quote:
      "Within a few weeks of taking it I saw huge improvements in energy, my ability to focus and my memory which got me back to competitions.",
    image: "/testimonials/athlete/SiennaCharles.jpg",
  },
  {
    name: "Fraser Dingwall",
    sport: "Rugby Union — England International",
    quote:
      "I have loved using CONKA in my daily routine, especially tailoring which shot I take dependent on my training load, and being able to track progress using the app. Brain health is extremely important in rugby and I am enjoying feeling more focused and energised.",
    image: "/testimonials/athlete/FraserDingwall.jpg",
  },
];

const ROTATE_INTERVAL_MS = 5000;

export default function AthleteCredibilityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = ATHLETE_SLIDES[currentIndex];

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % ATHLETE_SLIDES.length);
    }, ROTATE_INTERVAL_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[0.6fr_0.4fr] gap-8 md:gap-12 items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left column: text (order-first on mobile) */}
      <div className="flex flex-col gap-4 md:gap-6 min-w-0">
        <div key={currentIndex} className="animate-fade-in-scale">
          <h2 className="premium-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-on-light)]">
            {slide.name}
          </h2>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1 opacity-80">
            {slide.sport}
          </p>
          <blockquote className="premium-body mt-4 text-[var(--text-on-light)] leading-relaxed max-w-xl">
            &ldquo;{slide.quote}&rdquo;
          </blockquote>
        </div>
        {/* Live region for screen readers when slide changes */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Showing {slide.name}, {slide.sport}.
        </div>
      </div>

      {/* Right column: image + dots */}
      <div className="flex flex-col gap-4 order-first md:order-none">
        <div className="relative w-full aspect-[4/3] rounded-[var(--premium-radius-card)] overflow-hidden bg-black/5">
          {ATHLETE_SLIDES.map((s, i) => (
            <div
              key={s.image}
              className={`absolute inset-0 transition-opacity duration-300 ${
                i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={s.image}
                alt={`${s.name} in action`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div
          className="flex justify-center gap-2"
          role="tablist"
          aria-label="Athlete testimonials"
        >
          {ATHLETE_SLIDES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-label={`Go to slide, ${s.name}`}
              aria-selected={i === currentIndex}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex
                  ? "w-8 bg-[var(--color-ink)]"
                  : "w-2 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
