"use client";

import ScienceHero from "./ScienceHero";

interface ScienceHeroSectionProps {
  isMobile: boolean;
}

export default function ScienceHeroSection({ isMobile }: ScienceHeroSectionProps) {
  return (
    <section
      className="premium-section-luxury premium-hero-first premium-section-reduced-bottom premium-bg-bone"
      aria-label="Science hero"
    >
      <div className="premium-track">
        <ScienceHero isMobile={isMobile} />
      </div>
    </section>
  );
}
