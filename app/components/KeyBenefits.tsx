"use client";

import useIsMobile from "../hooks/useIsMobile";
import KeyBenefitsDesktop from "./KeyBenefitsDesktop";
import KeyBenefitsMobile from "./KeyBenefitsMobile";

export interface Benefit {
  id: string;
  title: string;
  icon?: React.ReactNode; // SVG icon component
  stat: string;
  annotation: string;
  description: string;
  clinicalBreakdown?: {
    study: string;
    participants: string;
    duration: string;
    results: string[];
  };
}

interface KeyBenefitsProps {
  benefits: Benefit[];
}

export default function KeyBenefits({ benefits }: KeyBenefitsProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Own text color so section/body defaults don't cascade into mixed-context areas (e.g. selected tile).
  const contentClass = "text-[var(--color-ink)]";

  // Render mobile version on smaller viewports
  if (isMobile) {
    return (
      <div className={contentClass}>
        <KeyBenefitsMobile benefits={benefits} />
      </div>
    );
  }

  // Render desktop version on larger viewports
  return (
    <div className={contentClass}>
      <KeyBenefitsDesktop benefits={benefits} />
    </div>
  );
}
