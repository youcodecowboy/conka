"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ROTATING_WORDS = ["sharper", "longer", "deeper", "better", "smarter"];
const ROTATION_INTERVAL_MS = 3000;
const FADE_DURATION_MS = 500;

function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2 justify-start text-[0.7rem] md:text-[var(--premium-font-data-size)]">
      <span className="flex items-center gap-1.5 text-[var(--text-on-light-muted)]">
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </span>
        Informed Sport Certified
      </span>
      <span className="flex items-center gap-1.5 text-[var(--text-on-light-muted)]">
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="4" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M2 8v8" strokeWidth="0.5" />
            <path d="M22 8v8" strokeWidth="0.5" />
            <path d="M12 10v4" />
            <path d="M9 12h6" />
          </svg>
        </span>
        Made in UK
      </span>
      <span className="flex items-center gap-1.5 text-[var(--text-on-light-muted)]">
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </span>
        100-Day Guarantee
      </span>
    </div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFading, setWordFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setWordFading(true);
      timeoutId = setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setWordFading(false);
      }, FADE_DURATION_MS);
    }, ROTATION_INTERVAL_MS);
    return () => {
      clearInterval(id);
      clearTimeout(timeoutId!);
    };
  }, []);

  const scrollToProductGrid = useCallback(() => {
    document
      .getElementById("product-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col md:grid md:grid-cols-[1fr_2fr] overflow-hidden bg-[#f5f5f4] md:bg-[var(--color-bone)]">
      {/* Left: content column - light white on mobile, bone on desktop */}
      <div
        className="relative z-10 flex flex-col justify-center py-4 px-8 md:py-16 md:px-16 md:max-w-[500px] text-left transition-opacity duration-500 bg-[#f5f5f4] md:bg-[var(--color-bone)]"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <div className="flex flex-col gap-2 md:gap-[var(--space-text-gap)]">
          {/* Social proof — mobile: simplified; desktop: full line */}
          <div
            className="flex flex-wrap items-center justify-start gap-x-2 text-[var(--text-on-light-muted)] shrink-0 md:hidden"
            style={{ fontSize: "var(--premium-font-data-size)" }}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">★★★★★</span>
            </span>
            <span className="whitespace-nowrap">Over 100,000 bottles sold</span>
          </div>
          <div
            className="hidden md:flex flex-nowrap items-center justify-start gap-x-3 text-[var(--text-on-light-muted)] shrink-0"
            style={{ fontSize: "var(--premium-font-data-size)" }}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">★★★★★</span> 4.9/5
            </span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">500+ reviews</span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">100,000 bottles sold</span>
          </div>

          <h1
            className="font-bold text-[var(--text-on-light)] leading-tight md:whitespace-nowrap"
            style={{
              letterSpacing: "var(--letter-spacing-premium-title)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Choose to perform{" "}
            <span
              className="inline-block min-w-[4ch] transition-opacity duration-500"
              style={{
                opacity: wordFading ? 0 : 1,
                backgroundImage: "var(--gradient-neuro-blue-accent)",
                backgroundSize: "100% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
              aria-live="polite"
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <p
            className="text-left text-[var(--text-on-light-muted)] mb-0"
            style={{
              fontSize: "var(--text-body-premium)",
              lineHeight: "var(--premium-font-body-leading)",
            }}
          >
            Science-backed nootropic shots trusted by professional athletes.
          </p>

          <div className="mt-2 md:mt-[var(--premium-space-xl)]">
            <button
              type="button"
              onClick={scrollToProductGrid}
              className="w-full md:w-[200px] min-h-[48px] md:min-h-[56px] rounded-[var(--premium-radius-interactive)] font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-neuro-blue-end)] focus:ring-offset-[var(--color-bone)]"
              style={{
                background: "var(--gradient-neuro-blue-accent)",
                fontSize: "var(--premium-font-body-size)",
              }}
            >
              Find Your Formula
            </button>
          </div>

          <div className="mt-2 md:mt-[var(--premium-space-l)]">
            <HeroTrustBadges />
          </div>
        </div>
      </div>

      {/* Right: hero image — mobile: no overlay; desktop: left-to-right overlay */}
      <div className="relative order-first md:order-none w-full min-h-[35vh] md:min-h-0 md:h-full">
        {/* Desktop only: left-to-right gradient (bone → transparent) */}
        <div
          className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--color-bone) 0%, rgba(249, 249, 249, 0.7) 18%, rgba(249, 249, 249, 0.25) 32%, transparent 45%)",
          }}
        />
        <Image
          src="/hero/Hero.jpg"
          alt="Athlete holding CONKA Flow and Clear bottles"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 66.67vw"
          className="object-cover md:hidden"
          style={{ objectPosition: "center 45%" }}
        />
        <Image
          src="/hero/HeroBanner.jpg"
          alt="Athlete holding CONKA Flow and Clear bottles"
          fill
          priority
          sizes="66.67vw"
          className="hidden md:block object-cover object-right"
        />
      </div>
    </div>
  );
}
