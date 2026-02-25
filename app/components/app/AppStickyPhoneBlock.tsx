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

const SCROLL_MULTIPLIER = 0.85;

// ─── Section data ────────────────────────────────────────────────────────────

type SectionData = {
  eyebrow?: string;
  heading: string;
  headingAccent?: string;
  body: string;
  footnote?: string;
  stats?: { value: string; label: string; source?: string }[];
};

const SECTIONS_DATA: SectionData[] = [
  {
    eyebrow: "Not an intelligence test. A processing speed test.",
    heading: "Most cognitive tests get easier with practice.",
    headingAccent: "This one can't.",
    body:
      "The test measures how quickly your brain processes visual information — the same mechanism " +
      "that's first affected by cognitive decline. It uses natural images rather than words, " +
      "numbers, or patterns, so there's no way to learn it or game it. Your score only " +
      "improves if your brain actually improves.",
    footnote: "It does not measure intelligence — only how efficiently your brain processes what it sees.",
    stats: [
      { value: "93%", label: "Sensitivity detecting cognitive impairment", source: "ADePT Study, PMC10533908" },
      { value: "87.5%", label: "Test-retest reliability", source: "ADePT Study, PMC10533908" },
      { value: "14", label: "NHS Trusts in clinical validation trials", source: "HRA validation study, ISRCTN95636074" },
      { value: "2 min", label: "That's all it takes" },
    ],
  },
  {
    heading: "Your score changes every day. Now you'll know why.",
    body:
      "Log what matters — sleep, stress, caffeine, training — and see how it lines up with your cognitive score. " +
      "The app turns that loop into clear cause and effect so you can adjust what's actually moving the needle.",
  },
  {
    heading: "See your brain improve over 30 days.",
    body:
      "Clinical data supports up to 16% improvement in cognitive performance following the " +
      "recommended plan. The graph can't lie — you're either improving or you're not. Pairs with CONKA formulas to show what's working.",
  },
  {
    heading: "See where you rank against 10,000 athletes. Globally.",
    body:
      "Football, F1, rugby, ultra running — the same leaderboard. Press and hold any user to send a challenge. " +
      "Add friends, track trends, and prove it.",
  },
];

const SECTION_TAB_LABELS = ["01 The Test", "02 What You Track", "03 Your Progress", "04 Compete"];

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

// ─── useScrollTrack hook ──────────────────────────────────────────────────────

function useScrollTrack(
  ref: React.RefObject<HTMLDivElement | null>,
  numSections: number,
  disabled: boolean
): { activeIndex: number; sectionProgress: number } {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const track = ref.current;
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
  }, [ref, numSections]);

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disabled, handleScroll]);

  if (disabled) return { activeIndex: 0, sectionProgress: 0 };
  return { activeIndex, sectionProgress };
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  source,
  compact,
}: {
  value: string;
  label: string;
  source?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-[var(--premium-radius-nested)] ${compact ? "p-3" : "p-6"}`}
      style={styles.card}
    >
      <div
        className="font-bold"
        style={compact ? { ...styles.valueGradient, fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" } : styles.valueGradient}
      >
        {value}
      </div>
      <p className={`leading-[1.4] ${compact ? "mt-0.5" : "mt-1"}`} style={{ ...styles.bodySmall, fontSize: compact ? "0.7rem" : undefined }}>
        {label}
      </p>
      {source && (
        <p className={`italic opacity-60 ${compact ? "mt-1 text-[0.55rem]" : "mt-2 text-[0.65rem]"}`} style={{ color: "var(--color-bone)" }}>
          {source}
        </p>
      )}
    </div>
  );
}

// ─── SectionContent (data-driven) ─────────────────────────────────────────────

function SectionContent({ data, compact: compactMode }: { data: SectionData; compact?: boolean }) {
  const headingParts = data.heading.split("<br/>").filter(Boolean);
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      {data.eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 uppercase tracking-widest ${compactMode ? "mb-3 text-[0.65rem]" : "mb-6 text-xs"}`}
          style={styles.eyebrow}
        >
          {data.eyebrow}
        </div>
      )}
      <h2
        className={`max-w-[22ch] font-bold leading-[1.08] text-white ${compactMode ? "mb-3" : "mb-6"}`}
        style={compactMode ? { ...styles.h2, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" } : styles.h2}
      >
        {headingParts.map((line, i) => (
          <span key={i}>
            {line}
            {i < headingParts.length - 1 && <br />}
          </span>
        ))}
        {data.headingAccent && (
          <>
            {" "}
            <span style={styles.gradientText}>{data.headingAccent}</span>
          </>
        )}
      </h2>
      <p
        className={`max-w-[52ch] leading-[1.7] ${compactMode ? "mb-2 text-sm" : "mb-4"}`}
        style={compactMode ? { ...styles.body, fontSize: "0.875rem" } : styles.body}
      >
        {data.body}
      </p>
      {data.footnote && (
        <p className={`max-w-[52ch] italic ${compactMode ? "text-[0.7rem]" : ""}`} style={styles.bodySmall}>
          {data.footnote}
        </p>
      )}
      {data.stats && data.stats.length > 0 && (
        <>
          <div className={`w-full grid grid-cols-2 gap-2 ${compactMode ? "mt-5" : "mt-10 gap-4"}`}>
            {data.stats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} source={s.source} compact={compactMode} />
            ))}
          </div>
          <p className={`max-w-[42ch] italic opacity-60 ${compactMode ? "mt-3 text-[0.6rem]" : "mt-6 text-[0.7rem]"}`} style={{ color: "var(--color-bone)" }}>
            Validated across NHS Memory Clinics. Developed from Cambridge University research. FDA cleared.
          </p>
        </>
      )}
    </div>
  );
}

// ─── PhoneFrame (exported for reuse) ──────────────────────────────────────────

export function PhoneFrame({
  sources,
  activeIndex,
  altLabels,
}: {
  sources: readonly string[];
  activeIndex: number;
  altLabels?: string[];
}) {
  const [scaleReady, setScaleReady] = useState(true);
  const prevActiveRef = useRef(activeIndex);

  useEffect(() => {
    if (prevActiveRef.current === activeIndex) return;
    prevActiveRef.current = activeIndex;
    setScaleReady(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setScaleReady(true));
    });
    return () => cancelAnimationFrame(id);
  }, [activeIndex]);

  const transition = "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";

  return (
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
        className="relative z-[1] overflow-hidden rounded-xl"
        style={{
          width: "clamp(240px, 18vw, 300px)",
          aspectRatio: "9/19",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {sources.map((src, i) => {
          const isActive = i === activeIndex;
          const scale = isActive ? (scaleReady ? 1 : 0.97) : 1.02;
          return (
            <img
              key={src}
              src={src}
              alt={altLabels?.[i] ?? `App screen ${i + 1}`}
              className="absolute inset-0 h-full w-full object-contain object-center"
              style={{
                opacity: isActive ? 1 : 0,
                transform: `scale(${scale})`,
                transition,
              }}
            />
          );
        })}
      </div>
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

// ─── Main component ───────────────────────────────────────────────────────────

export function AppStickyPhoneBlock() {
  const isMobile = useIsMobile(1024);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const numSections = SECTIONS_DATA.length;

  const { activeIndex, sectionProgress } = useScrollTrack(
    scrollTrackRef,
    numSections,
    isMobile === true
  );

  const [contentVisible, setContentVisible] = useState(true);
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;
    setContentVisible(false);
    const t = setTimeout(() => setContentVisible(true), 180);
    return () => clearTimeout(t);
  }, [activeIndex]);

  const trackHeightVh = numSections * SCROLL_MULTIPLIER * 100;
  const overallProgress = numSections > 0 ? ((activeIndex + sectionProgress) / numSections) * 100 : 0;

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const track = scrollTrackRef.current;
      if (!track) return;
      const trackHeight = track.offsetHeight;
      const targetTop = track.offsetTop + sectionIndex * (trackHeight / numSections);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    },
    [numSections]
  );

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
          {SECTIONS_DATA.map((data, i) => (
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
              <SectionContent data={data} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ─── Desktop: scroll track + sticky panel ───────────────────────────────────
  return (
    <div
      ref={scrollTrackRef}
      className="relative w-full"
      style={{ height: `${trackHeightVh}vh` }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden text-white flex flex-col"
        style={{
          height: "100vh",
          background: "var(--color-ink)",
        }}
      >
        <GrainOverlay />

        <div
          className="relative z-[2] flex-1 mx-auto flex items-center gap-8 px-[var(--premium-gutter-mobile)] lg:px-[var(--premium-gutter-desktop)]"
          style={{ maxWidth: "var(--premium-max-width)", width: "100%" }}
        >
          <div className="flex-1 flex flex-col justify-center pr-8">
            <div className="mb-6 flex items-baseline gap-1.5">
              <span className="text-white font-semibold" style={{ fontSize: "1.5rem" }}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>/</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                {String(numSections).padStart(2, "0")}
              </span>
            </div>

            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <SectionContent data={SECTIONS_DATA[activeIndex]} compact={activeIndex === 0} />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center">
            <PhoneFrame
              sources={PHONE_SOURCES}
              activeIndex={activeIndex}
              altLabels={["Cognitive test screen", "Wellness and metrics", "Progress graph", "Leaderboard"]}
            />
          </div>
        </div>

        {/* Bottom progress bar + section tabs */}
        <div className="relative z-[2] w-full px-[var(--premium-gutter-mobile)] lg:px-[var(--premium-gutter-desktop)] pb-6">
          <div className="mx-auto flex flex-col gap-3" style={{ maxWidth: "var(--premium-max-width)" }}>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
              {SECTION_TAB_LABELS.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSection(i)}
                  className="text-left font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
                  style={{
                    fontSize: "0.7rem",
                    color: i === activeIndex ? "white" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              className="h-0.5 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-150 ease-out"
                style={{
                  width: `${overallProgress}%`,
                  background: "var(--gradient-neuro-blue-accent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppStickyPhoneBlock;
