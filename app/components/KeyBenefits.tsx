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
  image?: string; // Image path
  focalPoint?: { x: number; y: number }; // Focal point for image centering (0-100)
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface KeyBenefitsProps {
  benefits: Benefit[];
}

export default function KeyBenefits({ benefits }: KeyBenefitsProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Render mobile version on smaller viewports
  if (isMobile) {
    return <KeyBenefitsMobile benefits={benefits} />;
  }

  // Render desktop version on larger viewports
  return <KeyBenefitsDesktop benefits={benefits} />;
}
