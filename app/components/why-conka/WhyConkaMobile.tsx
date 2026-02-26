"use client";

import { whyConkaPoints } from "@/app/lib/whyConkaData";
import { WhyConkaHeroMobile } from "./WhyConkaHeroMobile";
import { WhyConkaSection } from "./WhyConkaSection";
import { WhyConkaCTA } from "./WhyConkaCTA";

/**
 * Mobile content blocks only (no section/track wrappers).
 * The why-conka page composes sections; this export is for backwards compatibility.
 */
export function WhyConkaMobile() {
  return (
    <>
      <WhyConkaHeroMobile />
      {whyConkaPoints.map((point) => (
        <WhyConkaSection
          key={point.id}
          point={point}
          totalPoints={whyConkaPoints.length}
          variant="mobile"
        />
      ))}
      <WhyConkaCTA />
    </>
  );
}

export default WhyConkaMobile;
