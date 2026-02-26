"use client";

import { storySections } from "@/app/lib/storyData";
import { OurStoryHeroMobile } from "./OurStoryHeroMobile";
import { StorySection } from "./StorySection";
import { OurStoryCTA } from "./OurStoryCTA";

/**
 * Mobile content blocks only (no section/track wrappers).
 * The our-story page composes sections; this export is for backwards compatibility or alternate layouts.
 */
export function OurStoryMobile() {
  return (
    <>
      <OurStoryHeroMobile />
      {storySections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
          totalSections={storySections.length}
          variant="mobile"
        />
      ))}
      <OurStoryCTA />
    </>
  );
}

export default OurStoryMobile;
