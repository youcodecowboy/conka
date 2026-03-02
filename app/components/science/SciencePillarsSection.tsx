"use client";

import SciencePillars from "./SciencePillars";

interface SciencePillarsSectionProps {
  isMobile: boolean;
}

export default function SciencePillarsSection({
  isMobile,
}: SciencePillarsSectionProps) {
  return (
    <section
      className="premium-section-luxury text-white"
      style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
      aria-label="The five pillars"
    >
      <div className="premium-track">
        <SciencePillars isMobile={isMobile} />
      </div>
    </section>
  );
}
