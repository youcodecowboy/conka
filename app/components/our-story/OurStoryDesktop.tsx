"use client";

import { storySections } from "@/app/lib/storyData";
import { OurStoryHero } from "./OurStoryHero";
import { StorySection } from "./StorySection";
import { OurStoryCTA } from "./OurStoryCTA";

/**
 * Desktop content blocks only (no section/track wrappers).
 * The our-story page composes sections; this export is for backwards compatibility or alternate layouts.
 */
export function OurStoryDesktop() {
  return (
    <>
      <OurStoryHero />
      {storySections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
          totalSections={storySections.length}
          variant="desktop"
        />
      ))}
      <OurStoryCTA />
    </>
  );
}

export default OurStoryDesktop;
