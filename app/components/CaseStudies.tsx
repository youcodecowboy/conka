"use client";

import useIsMobile from "../hooks/useIsMobile";
import CaseStudiesDesktop from "./CaseStudiesDesktop";
import CaseStudiesMobile from "./CaseStudiesMobile";

export interface Athlete {
  name: string;
  sport: string;
  achievement: string;
  protocol: string;
  duration: string;
  results: string[];
  quote: string;
}

interface CaseStudiesProps {
  athletes: Athlete[];
}

export default function CaseStudies({ athletes }: CaseStudiesProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Render mobile version on smaller viewports
  if (isMobile) {
    return <CaseStudiesMobile athletes={athletes} />;
  }

  // Render desktop version on larger viewports
  return <CaseStudiesDesktop athletes={athletes} />;
}
