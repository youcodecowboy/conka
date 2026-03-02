"use client";

import ScienceQuote from "./ScienceQuote";

interface ScienceQuoteSectionProps {
  isMobile: boolean;
}

export default function ScienceQuoteSection({ isMobile }: ScienceQuoteSectionProps) {
  return (
    <section
      className="premium-section-luxury"
      style={{ backgroundColor: "var(--color-neuro-blue-light)" }}
      aria-label="Research philosophy"
    >
      <div className="premium-track">
        <ScienceQuote isMobile={isMobile} />
      </div>
    </section>
  );
}
