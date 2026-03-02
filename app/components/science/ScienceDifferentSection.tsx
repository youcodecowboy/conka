"use client";

import ScienceDifferent from "./ScienceDifferent";

interface ScienceDifferentSectionProps {
  isMobile: boolean;
}

export default function ScienceDifferentSection({
  isMobile,
}: ScienceDifferentSectionProps) {
  return (
    <section
      className="premium-section-luxury premium-bg-bone"
      aria-label="What makes CONKA different"
    >
      <div className="premium-track">
        <ScienceDifferent isMobile={isMobile} />
      </div>
    </section>
  );
}
