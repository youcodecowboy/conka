"use client";

import { useRef } from "react";
import Image from "next/image";
import { StoryChapter } from "@/app/lib/storyData";
import { useGSAP, withMotion, revealUp } from "@/app/lib/motion";

/* ============================================================================
 * StorySection — one chapter of /our-story.
 *
 * A full-bleed split band, the Cadence / Gray Matter grammar: the image owns
 * half the viewport edge to edge and top to bottom, and the copy owns the
 * other half. The image side alternates with `imageSide` at lg and above;
 * below that everything stacks image first, then copy, regardless of side.
 * The alternation is a desktop affordance, not a reading order.
 *
 * ARCHITECTURE NOTE — this component owns its own layout, which is the
 * documented exception to the page-orchestrates rule in DESIGN_SYSTEM.md §6.
 * A band whose image must touch the viewport edge cannot sit inside
 * .brand-section's gutters or .brand-track's max-width, so the page gives it
 * a bare <section> carrying only the background and aria-label. The copy side
 * pads itself by --brand-track-inset so its text still lines up with every
 * tracked section on the page. See DESIGN_SYSTEM.md §8.5.
 *
 * Simple DTC (§8.5): solid black heading, no eyebrow, no mono, no radius on
 * the image (it is a bleed, not a card). Motion is one revealUp on entry;
 * SSR carries the final state so reduced-motion and no-JS users see all of it.
 * ========================================================================== */

interface StorySectionProps {
  chapter: StoryChapter;
}

export function StorySection({ chapter }: StorySectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const imageOnLeft = chapter.imageSide === "left";

  useGSAP(
    () => {
      withMotion(() => {
        revealUp("[data-chapter-reveal]", root.current);
      });
    },
    { scope: root },
  );

  /* Outer edge of the copy gets the track inset so it aligns with the rest of
     the page; the inner edge, against the image, gets a plain gutter. */
  const copyPadding = imageOnLeft
    ? "lg:order-2 lg:pl-12 xl:pl-16 lg:pr-[var(--brand-track-inset)]"
    : "lg:order-1 lg:pr-12 xl:pr-16 lg:pl-[var(--brand-track-inset)]";

  return (
    <div
      ref={root}
      className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[34rem]"
    >
      <div
        className={`relative aspect-[4/3] lg:aspect-auto bg-black/5 ${
          imageOnLeft ? "lg:order-1" : "lg:order-2"
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

      <div
        className={`flex flex-col justify-center px-5 py-14 lg:py-20 ${copyPadding}`}
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
