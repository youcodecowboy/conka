"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const ROTATING_WORDS = ["sharper", "longer", "deeper", "better", "smarter"];
const ROTATION_INTERVAL_MS = 3000;
const FADE_DURATION_MS = 500;

// Hero banner carousel images - HeroBannerW.jpg is primary (first)
const HERO_BANNER_IMAGES = [
  { src: "/hero/HeroBannerW.jpg", alt: "Athlete holding CONKA Flow and Clear bottles" },
  { src: "/hero/HeroBanner.jpg", alt: "Athlete holding CONKA Flow and Clear bottles" },
];

const HERO_CAROUSEL_AUTO_PLAY_INTERVAL = 8000; // 8 seconds - slow and premium
const HERO_CAROUSEL_FADE_DURATION = 600; // Smooth crossfade

function HeroBannerCarousel({ isDark }: { isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play: slow rotation, pauses on hover
  useEffect(() => {
    if (isHovered || HERO_BANNER_IMAGES.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_BANNER_IMAGES.length);
    }, HERO_CAROUSEL_AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + HERO_BANNER_IMAGES.length) % HERO_BANNER_IMAGES.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % HERO_BANNER_IMAGES.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    // Reset auto-play timer when manually navigating
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  }, []);

  return (
    <div
      className="relative order-first lg:order-none w-full min-h-[35vh] md:min-h-[45vh] lg:min-h-0 lg:h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop only: left-to-right gradient — bone (default) or ink (dark) → transparent */}
      {/* Must be above images (z-[3]) but below pagination dots (z-[10]) */}
      <div
        className="hidden lg:block absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to right, var(--color-ink) 0%, rgba(17, 17, 17, 0.9) 10%, rgba(17, 17, 17, 0.35) 18%, transparent 28%)"
            : "linear-gradient(to right, var(--color-bone) 0%, rgba(249, 249, 249, 0.75) 10%, rgba(249, 249, 249, 0.2) 20%, transparent 30%)",
        }}
      />
      {/* Mobile + tablet: dark variant gets a subtle bottom-up ink gradient; default no overlay */}
      {isDark && (
        <div
          className="absolute inset-0 z-[3] pointer-events-none lg:hidden"
          style={{
            background:
              "linear-gradient(to top, var(--color-ink) 0%, rgba(17, 17, 17, 0.6) 25%, transparent 55%)",
          }}
        />
      )}

      {/* Mobile: Carousel with crossfade — absolute inset-0 so it fills parent (parent has min-h); avoids h-full resolving to 0 */}
      <div className="absolute inset-0 md:hidden">
        {HERO_BANNER_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity ${
              index === currentIndex ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
            }`}
            aria-hidden={index !== currentIndex}
            style={{
              transitionDuration: `${HERO_CAROUSEL_FADE_DURATION}ms`,
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 100vw, 66.67vw"
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </div>
        ))}

        {/* Pagination dots — mobile: same styling as desktop */}
        {HERO_BANNER_IMAGES.length > 1 && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)",
            }}
            role="tablist"
            aria-label="Hero banner navigation"
          >
            {HERO_BANNER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70 ${
                  index === currentIndex
                    ? "w-2.5 h-2.5 bg-white shadow-sm"
                    : "w-2 h-2 bg-white/50 active:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1} of ${HERO_BANNER_IMAGES.length}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Carousel with crossfade — absolute inset-0 so it fills parent on lg */}
      <div className="hidden md:block absolute inset-0">
        {HERO_BANNER_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity ${
              index === currentIndex ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
            }`}
            aria-hidden={index !== currentIndex}
            style={{
              transitionDuration: `${HERO_CAROUSEL_FADE_DURATION}ms`,
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1023px) 100vw, 66.67vw"
              className="object-cover object-right"
            />
          </div>
        ))}

        {/* Pagination dots — positioned bottom-center for better visibility and premium feel */}
        {HERO_BANNER_IMAGES.length > 1 && (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(8px)",
            }}
            role="tablist"
            aria-label="Hero banner navigation"
          >
            {HERO_BANNER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70 ${
                  index === currentIndex
                    ? "w-2.5 h-2.5 bg-white shadow-sm"
                    : "w-2 h-2 bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1} of ${HERO_BANNER_IMAGES.length}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeroTrustBadges({
  textClass = "text-[var(--text-on-light-muted)]",
}: {
  textClass?: string;
}) {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-x-5 gap-y-3 justify-start text-sm md:text-base font-bold">
      <span
        className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}
      >
        <Image
          src="/logos/InformedSportLogo.png"
          alt="Informed Sport certified"
          width={240}
          height={240}
          className="h-16 w-auto md:h-20 object-contain"
          aria-hidden
        />
        <span className="sr-only">Informed Sport Certified</span>
      </span>
      <span
        className={`flex items-center gap-2 ${textClass} md:whitespace-nowrap md:shrink-0`}
      >
        <Image
          src="/logos/MadeInBritain.png"
          alt="Made in Britain"
          width={360}
          height={180}
          className="h-14 w-auto md:h-16 object-contain"
          aria-hidden
        />
        <span className="sr-only">Made in Britain</span>
      </span>
    </div>
  );
}

type HeroVariant = "default" | "dark";

export default function Hero({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
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
      className={`relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col lg:grid lg:grid-cols-[1fr_2fr] overflow-hidden ${rootBg}`}
    >
      {/* Left: content column */}
      <div
        className={`relative z-10 flex flex-col justify-center py-4 px-8 md:px-12 md:py-10 lg:max-w-[500px] lg:py-16 lg:px-16 text-left ${contentBg}`}
      >
        <div className="flex flex-col gap-2 md:gap-[var(--space-text-gap)]">
          {/* Social proof — mobile: simplified; tablet + desktop: full line */}
          <div
            className={`flex flex-wrap items-center justify-start gap-x-2 shrink-0 md:hidden text-sm md:text-base font-bold ${textMuted}`}
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <span aria-hidden className="text-yellow-500">
                ★★★★★
              </span>
            </span>
            <span className="whitespace-nowrap">Over 100,000 bottles sold</span>
          </div>
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

      {/* Right: hero image carousel — overlay: light (default) or dark (ink) left-to-right on desktop only */}
      <HeroBannerCarousel isDark={isDark} />
    </div>
  );
}
