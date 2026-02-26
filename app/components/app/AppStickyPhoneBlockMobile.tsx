"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import PremiumDotIndicator from "@/app/components/premium/PremiumDotIndicator";
import { PhoneFrame } from "./AppStickyPhoneBlock";
import {
  SECTIONS_DATA,
  SECTION_TAB_LABELS,
  PHONE_SOURCES,
  type SectionData,
} from "./appStickyPhoneBlockData";

const GRAIN_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23n)" /></svg>`
  );

const SWIPE_THRESHOLD_PX = 50;

const styles = {
  eyebrow: {
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "var(--color-bone)",
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
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
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
    <div className="rounded-[var(--premium-radius-nested)] p-3" style={styles.card}>
      <div className="font-bold" style={styles.valueGradient}>
        {value}
      </div>
      <p className="mt-0.5 leading-[1.4] text-[0.7rem]" style={styles.bodySmall}>
        {label}
      </p>
      {source && (
        <p className="mt-1 text-[0.55rem] italic opacity-60" style={{ color: "var(--color-bone)" }}>
          {source}
        </p>
      )}
    </div>
  );
}

/** Section 0 on mobile: headline + one-line teaser + stats + "Read more" for full copy */
function Section0MobileContent({
  data,
  expanded,
  onToggle,
  contentVisible,
}: {
  data: SectionData;
  expanded: boolean;
  onToggle: () => void;
  contentVisible: boolean;
}) {
  const firstSentence = data.body.split(/\.\s+/)[0] + (data.body.includes(". ") ? "." : "");
  return (
    <div
      className="flex flex-col items-start text-left"
      style={{
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      {data.eyebrow && (
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.65rem] uppercase tracking-widest"
          style={styles.eyebrow}
        >
          {data.eyebrow}
        </div>
      )}
      <h2 className="mb-3 max-w-[22ch] font-bold leading-[1.08] text-white" style={{ fontSize: "clamp(1.35rem, 3vw, 1.6rem)", letterSpacing: "-0.035em" }}>
        {data.heading}{" "}
        <span style={styles.gradientText}>{data.headingAccent}</span>
      </h2>
      <p className="mb-4 max-w-[52ch] text-sm leading-[1.6]" style={styles.bodySmall}>
        {firstSentence}
      </p>
      {data.stats && data.stats.length > 0 && (
        <div className="mt-4 w-full grid grid-cols-2 gap-2">
          {data.stats.map((s, i) => (
            <StatCard key={i} value={s.value} label={s.label} source={s.source} />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onToggle}
        className="mt-4 text-left text-sm font-medium underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        style={{ color: "var(--color-bone)" }}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
      {expanded && (
        <div className="mt-4 space-y-3">
          <p className="max-w-[52ch] text-sm leading-[1.7]" style={styles.bodySmall}>
            {data.body}
          </p>
          {data.footnote && (
            <p className="max-w-[52ch] text-[0.7rem] italic" style={styles.bodySmall}>
              {data.footnote}
            </p>
          )}
          <p className="max-w-[42ch] text-[0.6rem] italic opacity-60" style={{ color: "var(--color-bone)" }}>
            Validated across NHS Memory Clinics. Developed from Cambridge University research. FDA cleared.
          </p>
        </div>
      )}
    </div>
  );
}

/** Other sections: simple headline + body, left-aligned */
function SectionContentMobile({
  data,
  contentVisible,
}: {
  data: SectionData;
  contentVisible: boolean;
}) {
  return (
    <div
      className="flex flex-col items-start text-left"
      style={{
        opacity: contentVisible ? 1 : 0,
        transform: contentVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      <h2 className="mb-4 max-w-[22ch] font-bold leading-[1.08] text-white" style={{ fontSize: "clamp(1.35rem, 3vw, 1.6rem)", letterSpacing: "-0.035em" }}>
        {data.heading}
      </h2>
      <p className="max-w-[52ch] text-sm leading-[1.7]" style={styles.bodySmall}>
        {data.body}
      </p>
    </div>
  );
}

export function AppStickyPhoneBlockMobile() {
  const numSections = SECTIONS_DATA.length;
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [section0Expanded, setSection0Expanded] = useState(false);
  const [mobileContentVisible, setMobileContentVisible] = useState(true);
  const mobilePrevIndexRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (mobilePrevIndexRef.current === mobileActiveIndex) return;
    mobilePrevIndexRef.current = mobileActiveIndex;
    setMobileContentVisible(false);
    const t = setTimeout(() => setMobileContentVisible(true), 180);
    return () => clearTimeout(t);
  }, [mobileActiveIndex]);

  const handleSwipeStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleSwipeEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStartXRef.current;
      touchStartXRef.current = null;
      if (start === null) return;
      const end = e.changedTouches[0].clientX;
      const deltaX = end - start;
      if (deltaX < -SWIPE_THRESHOLD_PX) {
        setMobileActiveIndex((i) => Math.min(i + 1, numSections - 1));
      } else if (deltaX > SWIPE_THRESHOLD_PX) {
        setMobileActiveIndex((i) => Math.max(i - 1, 0));
      }
    },
    [numSections]
  );

  const isSection0 = mobileActiveIndex === 0;

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
      <div
        className="relative z-[2] mx-auto w-full max-w-[var(--premium-max-width)] flex flex-col gap-8"
        onTouchStart={handleSwipeStart}
        onTouchEnd={handleSwipeEnd}
        role="region"
        aria-label="Swipe left or right to change section"
      >
        <h2
          className="text-left font-bold text-white"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {SECTION_TAB_LABELS[mobileActiveIndex]}
        </h2>

        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center">
            <PhoneFrame
              sources={PHONE_SOURCES}
              activeIndex={mobileActiveIndex}
              altLabels={["Cognitive test screen", "Wellness and metrics", "Progress graph", "Leaderboard"]}
              size="mobile"
            />
          </div>
          <PremiumDotIndicator
            total={numSections}
            currentIndex={mobileActiveIndex}
            onDotClick={setMobileActiveIndex}
            variant="light-on-dark"
            ariaLabel="App feature sections"
            getDotAriaLabel={(i) => `Section ${i + 1}: ${SECTION_TAB_LABELS[i]}`}
          />
        </div>

        {isSection0 ? (
          <Section0MobileContent
            data={SECTIONS_DATA[0]}
            expanded={section0Expanded}
            onToggle={() => setSection0Expanded((x) => !x)}
            contentVisible={mobileContentVisible}
          />
        ) : (
          <SectionContentMobile
            data={SECTIONS_DATA[mobileActiveIndex]}
            contentVisible={mobileContentVisible}
          />
        )}
      </div>
    </section>
  );
}

export default AppStickyPhoneBlockMobile;
