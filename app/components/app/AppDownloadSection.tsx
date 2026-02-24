"use client";

import { AppInstallButtons } from "@/app/components/AppInstallButtons";

export function AppDownloadSection() {
  return (
    <section
      className="w-full px-[var(--premium-gutter-mobile)] py-[var(--space-section-padding)] text-center md:px-[var(--premium-gutter-desktop)]"
      style={{
        background: "var(--color-bone)",
        color: "var(--color-ink)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[var(--premium-max-width)] flex-col items-center">
        <h2
          className="mb-8 max-w-[20ch] font-bold leading-tight"
          style={{
            color: "var(--color-ink)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            letterSpacing: "var(--letter-spacing-premium-title)",
          }}
        >
          Start measuring your brain today. It&apos;s free.
        </h2>

        <AppInstallButtons inverted={true} className="mb-8" />

        <p
          className="max-w-[36ch] text-center opacity-70"
          style={{
            color: "var(--color-ink)",
            fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
            lineHeight: 1.5,
          }}
        >
          Free to use. No subscription required to access core features.
        </p>
      </div>
    </section>
  );
}

export default AppDownloadSection;
