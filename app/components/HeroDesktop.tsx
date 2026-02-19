"use client";

import { useState, useEffect, useCallback } from "react";
import HeroBannerCarousel from "./HeroBannerCarousel";
import { HeroTrustBadges, ROTATING_WORDS, FADE_DURATION_MS, ROTATION_INTERVAL_MS } from "./HeroShared";

// Desktop (md and up): two images only
const HERO_BANNER_IMAGES_DESKTOP = [
  { src: "/hero/HeroBannerW.jpg", alt: "Athlete holding CONKA Flow and Clear bottles" },
  { src: "/hero/HeroBanner.jpg", alt: "Athlete holding CONKA Flow and Clear bottles" },
];

export type HeroVariant = "default" | "dark";

export default function HeroDesktop({ variant = "default" }: { variant?: HeroVariant }) {
  const isDark = variant === "dark";
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFading, setWordFading] = useState(false);
  const [wordMounted, setWordMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWordMounted(true), 200);
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
    document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const contentBg = isDark ? "bg-[var(--color-ink)]" : "bg-[var(--color-bone)]";
  const rootBg = isDark ? "bg-[var(--color-ink)]" : "bg-[var(--color-bone)]";
  const textMuted = isDark ? "text-[var(--text-on-ink-muted)]" : "text-[var(--text-on-light-muted)]";
  const textPrimary = isDark ? "text-[var(--text-on-ink)]" : "text-[var(--text-on-light)]";
  const focusRingOffset = isDark ? "focus:ring-offset-[var(--color-ink)]" : "focus:ring-offset-[var(--color-bone)]";

  return (
    <div className={`relative w-full min-h-[85vh] flex flex-col lg:grid lg:grid-cols-[1fr_2fr] overflow-hidden ${rootBg}`}>
      <div
        className={`relative z-10 flex flex-col justify-center md:py-10 lg:max-w-[500px] lg:py-16 px-8 md:px-12 lg:px-16 text-left ${contentBg}`}
      >
        <div className="flex flex-col gap-2 md:gap-[var(--space-text-gap)]">
          <div className={`hidden md:flex flex-nowrap items-center justify-start gap-x-3 shrink-0 text-sm md:text-base font-bold ${textMuted}`}>
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">★★★★★</span> 4.7/5
            </span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">500+ reviews</span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">150,000 bottles sold</span>
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

          <p className={`text-left mb-0 text-lg md:text-xl ${textMuted}`} style={{ lineHeight: "var(--premium-font-body-leading)" }}>
            Science-backed nootropic shots trusted by professional athletes.
          </p>

          <div className="mt-2 md:mt-[var(--premium-space-xl)]">
            <button
              type="button"
              onClick={scrollToProductGrid}
              className={`w-full md:w-[200px] min-h-[48px] md:min-h-[56px] rounded-[var(--premium-radius-interactive)] font-semibold text-white text-base md:text-lg transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-neuro-blue-end)] ${focusRingOffset}`}
              style={{ background: "var(--gradient-neuro-blue-accent)" }}
            >
              Find Your Formula
            </button>
          </div>

          <div className="mt-2 md:mt-[var(--premium-space-l)]">
            <HeroTrustBadges textClass={textMuted} />
          </div>
        </div>
      </div>

      <HeroBannerCarousel images={HERO_BANNER_IMAGES_DESKTOP} isDark={isDark} variant="desktop" />
    </div>
  );
}
