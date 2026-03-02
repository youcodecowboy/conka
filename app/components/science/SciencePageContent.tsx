"use client";

import ScienceHeroSection from "./ScienceHeroSection";
import ScienceQuoteSection from "./ScienceQuoteSection";
import ScienceAdaptogensSection from "./ScienceAdaptogensSection";
import SciencePillarsSection from "./SciencePillarsSection";
import SynergyChartSection from "./SynergyChartSection";
import ScienceDifferentSection from "./ScienceDifferentSection";
import EvidenceSummarySection from "./EvidenceSummarySection";

interface SciencePageContentProps {
  isMobile: boolean;
}

/**
 * Renders the science page as distinct section components. Each section
 * owns its own background colour and track; the page just composes them.
 * Used by the Science page and by the Professionals page when showing science content.
 * Does not include Navigation or Footer.
 */
export default function SciencePageContent({ isMobile }: SciencePageContentProps) {
  return (
    <>
      <ScienceHeroSection isMobile={isMobile} />
      <ScienceQuoteSection isMobile={isMobile} />
      <ScienceAdaptogensSection isMobile={isMobile} />
      <SciencePillarsSection isMobile={isMobile} />
      <SynergyChartSection isMobile={isMobile} />
      <ScienceDifferentSection isMobile={isMobile} />
      <EvidenceSummarySection isMobile={isMobile} />
    </>
  );
}
