"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";

// ─── Constants ───────────────────────────────────────────────────────────────

const GRAIN_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23n)" /></svg>`
  );

const PHONE_SOURCES = [
  "/app/AppConkaRing.png",
  "/app/AppWellness.png",
  "/app/AppTestBreakdown.png",
  "/app/AppLeaderboard.png",
] as const;

// How many "scroll lengths" to devote to each section. Increase to slow the scroll (more scroll per section).
const SCROLL_MULTIPLIER = 1.2;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = {
  eyebrow: {
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "var(--color-bone)",
  },
  h2: {
    fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
    letterSpacing: "-0.035em",
  },
  body: {
    color: "var(--color-bone)",
    fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
  },
  bodySmall: {
    color: "var(--color-bone)",
    fontSize: "0.85rem",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  valueGradient: {
    fontSize: "clamp(2rem, 4vw, 2.75rem)",
    background: "var(--gradient-neuro-blue-accent)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  },
  gradientText: {
    background: "var(--gradient-neuro-blue-accent)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div className="rounded-[var(--premium-radius-nested)] p-6" style={styles.card}>
      <div className="font-bold" style={styles.valueGradient}>
        {value}
      </div>
      <p className="mt-1 leading-[1.4]" style={styles.bodySmall}>
        {label}
      </p>
      {source && (
        <p className="mt-2 text-[0.65rem] italic opacity-60" style={{ color: "var(--color-bone)" }}>
          {source}
        </p>
      )}
    </div>
  );
}

// ─── Section content definitions ─────────────────────────────────────────────

function Section0() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest"
        style={styles.eyebrow}
      >
        Not an intelligence test. A processing speed test.
      </div>
      <h2 className="mb-6 max-w-[22ch] font-bold leading-[1.08] text-white" style={styles.h2}>
        Most cognitive tests get easier with practice.{" "}
        <span style={styles.gradientText}>This one can&apos;t.</span>
      </h2>
      <p className="mb-4 max-w-[52ch] leading-[1.7]" style={styles.body}>
        The test measures how quickly your brain processes visual information — the same mechanism
        that&apos;s first affected by cognitive decline. It uses natural images rather than words,
        numbers, or patterns, so there&apos;s no way to learn it or game it. Your score only
        improves if your brain actually improves.
      </p>
      <p className="max-w-[52ch] italic" style={styles.bodySmall}>
        It does not measure intelligence — only how efficiently your brain processes what it sees.
      </p>
      <div className="mt-10 w-full grid grid-cols-2 gap-4">
        <StatCard value="93%" label="Sensitivity detecting cognitive impairment" source="ADePT Study, PMC10533908" />
        <StatCard value="87.5%" label="Test-retest reliability" source="ADePT Study, PMC10533908" />
        <StatCard value="14" label="NHS Trusts in clinical validation trials" source="HRA validation study, ISRCTN95636074" />
        <StatCard value="2 min" label="That's all it takes" />
      </div>
      <p className="mt-6 max-w-[42ch] italic opacity-60" style={{ fontSize: "0.7rem", color: "var(--color-bone)" }}>
        Validated across NHS Memory Clinics. Developed from Cambridge University research. FDA cleared.
      </p>
    </div>
  );
}

function Section1() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <h2 className="mb-6 max-w-[22ch] font-bold leading-[1.08] text-white" style={styles.h2}>
        Understand what&apos;s affecting your brain today.
      </h2>
      <p className="max-w-[52ch] leading-[1.7]" style={styles.body}>
        Log sleep, caffeine, stress, training load, and hydration. Your score is mapped against
        these inputs so you see the relationship over time. Get personalised, actionable advice
        after every test.
      </p>
    </div>
  );
}

function Section2() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <h2 className="mb-6 max-w-[22ch] font-bold leading-[1.08] text-white" style={styles.h2}>
        See your brain improve over 30 days.
      </h2>
      <p className="max-w-[52ch] leading-[1.7]" style={styles.body}>
        Clinical data supports up to 16% improvement in cognitive performance following the
        recommended plan. The graph can&apos;t lie — you&apos;re either improving or you&apos;re
        not. Pairs with CONKA formulas to show what&apos;s working.
      </p>
    </div>
  );
}

function Section3() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <h2 className="mb-6 max-w-[22ch] font-bold leading-[1.08] text-white" style={styles.h2}>
        Your brain is competitive. Now you can prove it.
      </h2>
      <p className="max-w-[52ch] leading-[1.7]" style={styles.body}>
        Global leaderboard — see how you stack up. Benchmark against professional athletes across
        football, F1, rugby, and ultra running. Add friends, challenge them, nudge them.
      </p>
    </div>
  );
}

const SECTIONS = [Section0, Section1, Section2, Section3];

// ─── Progress dots ────────────────────────────────────────────────────────────

function ProgressDots({
  count,
  active,
  progress,
}: {
  count: number;
  active: number;
  progress: number;
}) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i === active;
        const isPast = i < active;
        return (
          <div
            key={i}
            className="relative rounded-full overflow-hidden transition-all duration-300"
            style={{
              width: isActive ? 4 : 3,
              height: isActive ? 32 : 20,
              backgroundColor: "rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="absolute inset-x-0 bottom-0 rounded-full"
              style={{
                height: isPast ? "100%" : isActive ? `${progress * 100}%` : "0%",
                background: "var(--gradient-neuro-blue-accent)",
                transition: isActive ? "height 0.05s linear" : "height 0.3s ease",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
      style={{
        backgroundImage: `url("${GRAIN_DATA_URI}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

function ScrollChevron() {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      className="animate-bounce"
      aria-hidden
    >
      <path d="M8 0v16M1 9l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AppStickyPhoneBlock() {
  const isMobile = useIsMobile(1024);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);

  const numSections = SECTIONS.length;

  const handleScroll = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight;
    const viewportH = window.innerHeight;

    const scrolled = -rect.top;
    const scrollable = trackHeight - viewportH;

    if (scrolled < 0 || scrollable <= 0) return;
    if (scrolled > scrollable) {
      setActiveIndex(numSections - 1);
      setSectionProgress(1);
      return;
    }

    const t = scrolled / scrollable;
    const rawIndex = t * numSections;
    const newIndex = Math.min(Math.floor(rawIndex), numSections - 1);
    const newProgress = rawIndex - Math.floor(rawIndex);

    setActiveIndex(newIndex);
    setSectionProgress(newProgress);
  }, [numSections]);

  useEffect(() => {
    if (isMobile === true) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll]);

  const prevIndexRef = useRef(activeIndex);
  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;
    setContentVisible(false);
    const t = setTimeout(() => setContentVisible(true), 180);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const ActiveSection = SECTIONS[activeIndex];
  const trackHeightVh = numSections * SCROLL_MULTIPLIER * 100;

  // ─── Mobile: stacked sections ──────────────────────────────────────────────
  if (isMobile === true || isMobile === undefined) {
    return (
      <section
        className="relative w-full overflow-hidden text-white"
        style={{
          background: "var(--color-ink)",
          paddingTop: "var(--space-section-padding)",
          paddingBottom: "var(--space-section-padding)",
          paddingLeft: "var(--premium-gutter-mobile)",
          paddingRight: "var(--premium-gutter-mobile)",
        }}
      >
        <GrainOverlay />
        <div className="relative z-[2] mx-auto w-full max-w-[var(--premium-max-width)] flex flex-col gap-24">
          {SECTIONS.map((Sec, i) => (
            <div key={i} className="flex flex-col gap-8">
              <div className="flex justify-center">
                <div
                  className="relative w-[clamp(200px,60vw,280px)] overflow-hidden rounded-[2rem]"
                  style={{ aspectRatio: "9/19" }}
                >
                  <img
                    src={PHONE_SOURCES[i]}
                    alt={i === 0 ? "Cognitive test screen" : i === 1 ? "Wellness and metrics" : i === 2 ? "Progress graph" : "Leaderboard"}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
              <Sec />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ─── Desktop: scroll track + sticky full-viewport panel ──────────────────────
  return (
    <div
      ref={scrollTrackRef}
      className="relative w-full"
      style={{ height: `${trackHeightVh}vh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden text-white"
        style={{
          height: "100vh",
          background: "var(--color-ink)",
        }}
      >
        <GrainOverlay />

        <div
          className="relative z-[2] h-full mx-auto flex items-center gap-8 px-[var(--premium-gutter-mobile)] lg:px-[var(--premium-gutter-desktop)]"
          style={{ maxWidth: "var(--premium-max-width)" }}
        >
          <div className="flex-1 flex flex-col justify-center pr-8">
            <p
              className="mb-6 text-xs uppercase tracking-[0.2em] font-medium"
              style={{ color: "var(--color-bone)" }}
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(numSections).padStart(2, "0")}
            </p>

            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <ActiveSection />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center gap-6">
            <ProgressDots
              count={numSections}
              active={activeIndex}
              progress={sectionProgress}
            />

            <div className="relative flex justify-center items-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "90%",
                  height: "90%",
                  background: "radial-gradient(circle, rgba(64,88,187,0.3) 0%, transparent 70%)",
                  filter: "blur(56px)",
                }}
              />

              <div
                className="relative z-[1] overflow-hidden rounded-[2rem]"
                style={{
                  width: "clamp(240px, 18vw, 300px)",
                  aspectRatio: "9/19",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >
                {PHONE_SOURCES.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={i === 0 ? "Cognitive test screen" : i === 1 ? "Wellness and metrics" : i === 2 ? "Progress graph" : "Leaderboard"}
                    className="absolute inset-0 h-full w-full object-contain object-center"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: activeIndex === 0 ? 0.5 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        >
          <p className="text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--color-bone)" }}>
            Scroll to explore
          </p>
          <ScrollChevron />
        </div>
      </div>
    </div>
  );
}

export default AppStickyPhoneBlock;
