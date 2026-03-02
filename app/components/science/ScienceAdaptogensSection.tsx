"use client";

import ScienceAdaptogens from "./ScienceAdaptogens";

interface ScienceAdaptogensSectionProps {
  isMobile: boolean;
}

export default function ScienceAdaptogensSection({
  isMobile,
}: ScienceAdaptogensSectionProps) {
  return (
    <section
      className="premium-section-luxury premium-bg-bone"
      aria-label="What are adaptogens"
    >
      <div className="premium-track">
        <ScienceAdaptogens isMobile={isMobile} />
      </div>
    </section>
  );
}
