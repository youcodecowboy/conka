"use client";

import EvidenceSummary from "./EvidenceSummary";

interface EvidenceSummarySectionProps {
  isMobile: boolean;
}

export default function EvidenceSummarySection({
  isMobile,
}: EvidenceSummarySectionProps) {
  return (
    <section
      className="premium-section-luxury premium-bg-ink text-white"
      aria-label="Evidence-based formulation"
    >
      <div className="premium-track">
        <EvidenceSummary isMobile={isMobile} />
      </div>
    </section>
  );
}
