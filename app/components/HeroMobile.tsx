"use client";

import { useState, useEffect, useCallback } from "react";
import HeroBannerCarousel from "./HeroBannerCarousel";
import {
  HeroTrustBadges,
  ROTATING_WORDS,
  FADE_DURATION_MS,
  ROTATION_INTERVAL_MS,
} from "./HeroShared";

// Tablet + mobile (below md): three images, mobile hero primary (first)
const HERO_BANNER_IMAGES_MOBILE = [
  { src: "/hero/HeroBannerMobileH.jpg", alt: "Person with CONKA on the go" },
  {
    src: "/hero/HeroBannerW.jpg",
    alt: "Athlete holding CONKA Flow and Clear bottles",
  },
  { src: "/hero/Hero.jpg", alt: "Person holding CONKA Flow and Clear bottles" },
];

export type HeroVariant = "default" | "dark";

export default function HeroMobile({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
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
    document
      .getElementById("product-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const contentBg = isDark ? "bg-[var(--color-ink)]" : "bg-[#f5f5f4]";
  const rootBg = isDark ? "bg-[var(--color-ink)]" : "bg-[#f5f5f4]";
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
      className={`relative w-full min-h-[70vh] flex flex-col overflow-hidden ${rootBg}`}
    >
      {/* Image on top (order-first), content below */}
      <HeroBannerCarousel
        images={HERO_BANNER_IMAGES_MOBILE}
        isDark={isDark}
        variant="mobile"
      />
      <div
        className={`relative z-10 flex flex-col justify-center py-4 pl-6 pr-8 text-left ${contentBg}`}
      >
        <div className="flex flex-col gap-2">
          <div
            className={`flex flex-wrap items-center justify-start gap-x-2 shrink-0 text-sm font-bold ${textMuted}`}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">
                ★★★★★
              </span>
            </span>
            <span className="whitespace-nowrap">Over 100,000 bottles sold</span>
          </div>

          <h1
            className={`font-bold ${textPrimary} leading-tight`}
            style={{
              letterSpacing: "var(--letter-spacing-premium-title)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            <span
              className="block transition-opacity duration-500"
              style={{
                fontSize: "clamp(2.75rem, 7.5vw, 5.25rem)",
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
            <span
              className="block mt-1 whitespace-nowrap"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
            >
              Brain Performance
            </span>
          </h1>

          <p
            className={`text-left mb-0 text-lg ${textMuted}`}
            style={{ lineHeight: "var(--premium-font-body-leading)" }}
          >
            Science-backed brain performance shots. Trusted by high performers.
          </p>

          <div className="mt-2">
            <button
              type="button"
              onClick={scrollToProductGrid}
              className={`w-full min-h-[48px] rounded-[var(--premium-radius-interactive)] font-semibold text-white text-base transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-neuro-blue-end)] ${focusRingOffset}`}
              style={{ background: "var(--gradient-neuro-blue-accent)" }}
            >
              Find Your Formula
            </button>
          </div>

          <div className="mt-2">
            <HeroTrustBadges textClass={textMuted} />
          </div>
        </div>
      </div>
    </div>
  );
}
