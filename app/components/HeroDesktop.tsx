"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  HeroTrustBadges,
  ROTATING_WORDS,
  FADE_DURATION_MS,
  ROTATION_INTERVAL_MS,
} from "./HeroShared";

export type HeroVariant = "default" | "dark";

export default function HeroDesktop({
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

  const contentBg = isDark ? "bg-[var(--color-ink)]" : "bg-[var(--color-bone)]";
  const rootBg = isDark ? "bg-[var(--color-ink)]" : "bg-[var(--color-bone)]";
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
      className={`relative w-full min-h-[85vh] flex flex-col lg:grid lg:grid-cols-[1fr_2fr] overflow-hidden ${rootBg}`}
    >
      <div
        className={`relative z-10 flex flex-col justify-center md:py-10 lg:max-w-[500px] lg:py-16 pl-6 pr-8 md:pl-10 md:pr-12 lg:pl-12 lg:pr-16 text-left ${contentBg}`}
      >
        <div className="flex flex-col gap-2 md:gap-[var(--space-text-gap)]">
          <div
            className={`hidden md:flex flex-nowrap items-center justify-start gap-x-3 shrink-0 text-sm md:text-base font-bold ${textMuted}`}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">
                ★★★★★
              </span>{" "}
              4.7/5
            </span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">500+ reviews</span>
            <span aria-hidden>|</span>
            <span className="whitespace-nowrap">150,000 bottles sold</span>
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
                lineHeight: 1,
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
              className="block mt-0 whitespace-nowrap"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
            >
              Brain Performance
            </span>
          </h1>

          <p
            className={`text-left mb-0 text-lg md:text-xl ${textMuted}`}
            style={{ lineHeight: "var(--premium-font-body-leading)" }}
          >
            Science-backed brain performance shots. Trusted by high performers.
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

      {/* Single product image (replaces carousel) */}
      <div className="relative w-full order-none lg:h-full min-h-0">
        {/* Left-edge gradient so text panel blends into image */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to right, var(--color-ink) 0%, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0.35) 18%, transparent 28%)"
              : "linear-gradient(to right, var(--color-bone) 0%, rgba(249, 249, 249, 0.75) 10%, rgba(249, 249, 249, 0.2) 20%, transparent 30%)",
          }}
        />
        <Image
          src="/formulas/QuartelySingle.jpg"
          alt="CONKA Flow and Clear daily brain performance shots"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 66.67vw"
          className="object-cover object-right"
        />
      </div>
    </div>
  );
}
