"use client";

import { useRef } from "react";
import Image from "next/image";
import { StoryChapter } from "@/app/lib/storyData";
import { useGSAP, withMotion, revealUp } from "@/app/lib/motion";

/* ============================================================================
 * StorySection — one chapter of /our-story.
 *
 * A plain alternating split: image on one side, copy on the other, flipping
 * side by side with `imageSide` at lg and above. Mobile always stacks image
 * first, then copy, regardless of the desktop side. The alternation is a
 * desktop affordance, not a reading order.
 *
 * Simple DTC (DESIGN_SYSTEM.md §8.5): solid black heading, no eyebrow, no
 * mono. The image runs full bleed and square-cornered on mobile, then insets
 * to rounded-md from 768px where the section gutters return. Motion is one
 * revealUp on entry; SSR carries the final state so reduced-motion and no-JS
 * users see everything.
 *
 * Content-only; the page owns the section wrapper, background and track.
 * ========================================================================== */

interface StorySectionProps {
  chapter: StoryChapter;
}

export function StorySection({ chapter }: StorySectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const imageFirstOnDesktop = chapter.imageSide === "left";

  useGSAP(
    () => {
      withMotion(() => {
        revealUp("[data-chapter-reveal]", root.current);
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16"
    >
      {/* Full-bleed and flush to the section top on mobile. -mx-5 cancels the
          1.25rem mobile gutter and -mt-20 cancels the 5rem
          --brand-section-padding-mobile, so the image meets the section edge
          instead of sitting under a band of section background. The bottom
          padding is left alone; only the top is doubling up. Both values are
          hard-coded because .brand-section is unlayered CSS, so a Tailwind
          pt-0/px-0 would lose to it. All of it resets at 768px, where the
          gutters and full section padding return. */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-black/5 -mt-20 -mx-5 w-[calc(100%+2.5rem)] md:mt-0 md:mx-0 md:w-full rounded-none md:rounded-md ${
          imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <Image
          src={chapter.image}
          alt={chapter.imageAlt}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className={imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"}>
        <h2
          data-chapter-reveal
          className="brand-h2 text-black mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          {chapter.heading}
        </h2>
        {/* Static list, never reordered or filtered, so the index is a safe key. */}
        <div data-chapter-reveal className="space-y-4">
          {chapter.paragraphs.map((paragraph, index) => (
            <p key={index} className="brand-body text-black/80">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StorySection;
