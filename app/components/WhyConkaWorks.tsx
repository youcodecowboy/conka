"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import WhyConkaWorksDesktop from "./WhyConkaWorksDesktop";
import WhyConkaWorksMobile from "./WhyConkaWorksMobile";

/**
 * Why CONKA Works — credibility section (certification, testing, manufacturing).
 * Renders Desktop or Mobile layout per MOBILE_OPTIMIZATION.md:
 * - Desktop (≥768px): full 3-column grid, all content visible
 * - Mobile (<768px): compact single-column tiles, accordion expand/collapse
 */
export default function WhyConkaWorks() {
  const isMobile = useIsMobile(768);

  if (isMobile === undefined) {
    return <WhyConkaWorksDesktop />;
  }

  return isMobile ? <WhyConkaWorksMobile /> : <WhyConkaWorksDesktop />;
}
