"use client";

import { useRef } from "react";
import Image from "next/image";
import { storyHero } from "@/app/lib/storyData";
import { useGSAP, withMotion, revealUp } from "@/app/lib/motion";

/* ============================================================================
 * OurStoryHero — the opening split of /our-story.
 *
 * The same full-bleed split band as StorySection, matching the Figma's
 * 960/960 hero: copy owns the left half, the photo owns the right half edge
 * to edge and top to bottom. On mobile the photo leads instead, flush under
 * the nav, with the copy beneath it.
 *
 * ARCHITECTURE NOTE — this component owns its own layout, the documented
 * exception to the page-orchestrates rule in DESIGN_SYSTEM.md §6. See the
 * longer note in StorySection.tsx and DESIGN_SYSTEM.md §8.5.
 *
 * The stat row is real markup, not the flattened strip in the Figma, so the
 * numbers stay selectable, translatable and legible at 390px.
 * ========================================================================== */

export function OurStoryHero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      withMotion(() => {
        revealUp("[data-hero-reveal]", root.current);
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[38rem]"
    >
      {/* Copy leads in the DOM so the h1 comes before the image for screen
          readers and crawlers; `order` flips it visually on mobile only. */}
      <div className="order-2 lg:order-1 flex flex-col justify-center px-5 py-14 lg:py-20 lg:pl-[var(--brand-track-inset)] lg:pr-12 xl:pr-16">
        <h1
          data-hero-reveal
          className="brand-h1 text-black mb-5"
          style={{ letterSpacing: "-0.02em" }}
        >
          {storyHero.heading}
        </h1>
        <p data-hero-reveal className="brand-body text-black/80">
          {storyHero.body}
        </p>

        {/* Centred per column: three uneven left-aligned blocks read as ragged
            at 390px, where the labels wrap to different line counts. */}
        <div
          data-hero-reveal
          className="grid grid-cols-3 gap-4 mt-8 lg:mt-10 border-t border-black/12 pt-5"
        >
          {storyHero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span
                className="block text-black font-bold text-lg sm:text-xl leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {stat.value}
              </span>
              <span className="block text-xs text-black/60 mt-1 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="order-1 lg:order-2 relative aspect-square lg:aspect-auto bg-black/5">
        <Image
          src={storyHero.image}
          alt={storyHero.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default OurStoryHero;
