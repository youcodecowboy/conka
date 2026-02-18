"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const ROTATING_WORDS = ["sharper", "longer", "deeper", "better", "smarter"];
const ROTATION_INTERVAL_MS = 3000;
const FADE_DURATION_MS = 500;

function HeroTrustBadges({
  textClass = "text-[var(--text-on-light-muted)]",
}: {
  textClass?: string;
}) {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-x-5 gap-y-2 justify-start text-sm md:text-base font-bold">
      <span className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}>
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="18"
            height="18"
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
      <span className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}>
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="18"
            height="18"
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
      <span className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}>
        <span className="inline-flex shrink-0" aria-hidden>
          <svg
            width="18"
            height="18"
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

type HeroVariant = "default" | "dark";

export default function Hero({ variant = "default" }: { variant?: HeroVariant }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFading, setWordFading] = useState(false);
  const [wordMounted, setWordMounted] = useState(false);
  const isDark = variant === "dark";

  // Slight delay for dynamic word to appear after initial content
  useEffect(() => {
    const timer = setTimeout(() => {
      setWordMounted(true);
    }, 200); // 200ms delay - subtle but noticeable
    return () => clearTimeout(timer);
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

  const contentBg = isDark
    ? "bg-[var(--color-ink)]"
    : "bg-[#f5f5f4] md:bg-[var(--color-bone)]";
  const rootBg = isDark
    ? "bg-[var(--color-ink)]"
    : "bg-[#f5f5f4] md:bg-[var(--color-bone)]";
  const textMuted = isDark
    ? "text-[var(--text-on-ink-muted)]"
    : "text-[var(--text-on-light-muted)]";
  const textPrimary = isDark
    ? "text-[var(--text-on-ink)]"
    : "text-[var(--text-on-light)]";
  const focusRingOffset = isDark
    ? "focus:ring-offset-[var(--color-ink)]"
    : "focus:ring-offset-[var(--color-bone)]";

  return (
    <div
      className={`relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col md:grid md:grid-cols-[1fr_2fr] overflow-hidden ${rootBg}`}
    >
      {/* Left: content column */}
      <div
        className={`relative z-10 flex flex-col justify-center py-4 px-8 md:py-16 md:px-16 md:max-w-[500px] text-left ${contentBg}`}
      >
        <div className="flex flex-col gap-2 md:gap-[var(--space-text-gap)]">
          {/* Social proof — mobile: simplified; desktop: full line */}
          <div
            className={`flex flex-wrap items-center justify-start gap-x-2 shrink-0 md:hidden text-sm md:text-base font-bold ${textMuted}`}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">★★★★★</span>
            </span>
            <span className="whitespace-nowrap">Over 100,000 bottles sold</span>
          </div>
          <div
            className={`hidden md:flex flex-nowrap items-center justify-start gap-x-3 shrink-0 text-sm md:text-base font-bold ${textMuted}`}
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
            className={`font-bold ${textPrimary} leading-tight md:whitespace-nowrap`}
            style={{
              letterSpacing: "var(--letter-spacing-premium-title)",
              fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            Choose to perform{" "}
            <span
              className="inline-block min-w-[4ch] transition-opacity duration-500"
              style={{
                opacity: wordMounted && !wordFading ? 1 : 0,
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
            className={`text-left mb-0 text-lg md:text-xl ${textMuted}`}
            style={{
              lineHeight: "var(--premium-font-body-leading)",
            }}
          >
            Science-backed nootropic shots trusted by professional athletes.
          </p>

          <div className="mt-2 md:mt-[var(--premium-space-xl)]">
            <button
              type="button"
              onClick={scrollToProductGrid}
              className={`w-full md:w-[200px] min-h-[48px] md:min-h-[56px] rounded-[var(--premium-radius-interactive)] font-semibold text-white text-base md:text-lg transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-neuro-blue-end)] ${focusRingOffset}`}
              style={{
                background: "var(--gradient-neuro-blue-accent)",
              }}
            >
              Find Your Formula
            </button>
          </div>

          <div className="mt-2 md:mt-[var(--premium-space-l)]">
            <HeroTrustBadges textClass={textMuted} />
          </div>
        </div>
      </div>

      {/* Right: hero image — overlay: light (default) or dark (ink) left-to-right on desktop */}
      <div className="relative order-first md:order-none w-full min-h-[35vh] md:min-h-0 md:h-full">
        {/* Desktop only: left-to-right gradient — bone (default) or ink (dark) → transparent */}
        <div
          className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to right, var(--color-ink) 0%, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0.35) 18%, transparent 28%)"
              : "linear-gradient(to right, var(--color-bone) 0%, rgba(249, 249, 249, 0.75) 10%, rgba(249, 249, 249, 0.2) 20%, transparent 30%)",
          }}
        />
        {/* Mobile: dark variant gets a subtle bottom-up ink gradient so content area reads; default no overlay */}
        {isDark && (
          <div
            className="absolute inset-0 z-[1] pointer-events-none md:hidden"
            style={{
              background:
                "linear-gradient(to top, var(--color-ink) 0%, rgba(17, 17, 17, 0.6) 25%, transparent 55%)",
            }}
          />
        )}
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
