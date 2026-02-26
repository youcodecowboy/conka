"use client";

import { whyConkaPoints } from "@/app/lib/whyConkaData";
import { WhyConkaHero } from "./WhyConkaHero";
import { WhyConkaSection } from "./WhyConkaSection";
import { WhyConkaCTA } from "./WhyConkaCTA";

/**
 * Desktop content blocks only (no section/track wrappers).
 * The why-conka page composes sections; this export is for backwards compatibility.
 */
export function WhyConkaDesktop() {
  return (
    <>
      <WhyConkaHero />
      {whyConkaPoints.map((point) => (
        <WhyConkaSection
          key={point.id}
          point={point}
          totalPoints={whyConkaPoints.length}
          variant="desktop"
        />
      ))}
      <WhyConkaCTA />
    </>
  );
}

export default WhyConkaDesktop;
