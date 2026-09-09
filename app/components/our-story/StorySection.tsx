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
 * first, then copy, regardless of the desktop side — the alternation is a
 * desktop affordance, not a reading order.
 *
 * Simple DTC (DESIGN_SYSTEM.md §8.5): rounded-md image container, solid black
 * heading, no eyebrow, no mono. Motion is one revealUp on entry; SSR carries
 * the final state so reduced-motion and no-JS users see everything.
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
      <div
        className={
          imageFirstOnDesktop ? "lg:order-1" : "lg:order-2"
        }
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-black/5">
          <Image
            src={chapter.image}
            alt={chapter.imageAlt}
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div
        className={
          imageFirstOnDesktop ? "lg:order-2" : "lg:order-1"
        }
      >
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
