"use client";

import { useRef } from "react";
import Image from "next/image";
import { storyHero } from "@/app/lib/storyData";
import { useGSAP, withMotion, revealUp } from "@/app/lib/motion";

/* ============================================================================
 * OurStoryHero — the opening split of /our-story.
 *
 * Copy left, photo right at lg. On mobile the photo leads instead, full bleed
 * and flush under the nav, which is how Gray Matter and Cadence open. The stat
 * row is real markup, not the flattened strip in the Figma, so the numbers
 * stay selectable, translatable and legible at 390px.
 *
 * Simple DTC (DESIGN_SYSTEM.md §8.5): no eyebrow, no mono, solid black type.
 * Motion is one revealUp; SSR carries the final state.
 *
 * Content-only; the page owns the section wrapper, background and track.
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
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16"
    >
      {/* Copy leads in the DOM so the h1 comes before the image for screen
          readers and crawlers; `order` flips it visually on mobile only. */}
      <div className="order-2 lg:order-1">
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

      {/* Mobile: full-bleed and flush under the nav, the Gray Matter / Cadence
          opening. The bleed cancels the 1.25rem mobile gutter and the -mt-4
          cancels brand-hero-first's 1rem top padding (both are unlayered CSS,
          so a Tailwind pt-0 would not win). Gutters return at 768px, so the
          reset is md:, not lg:. Square at lg matches the Figma's 960x945 slot. */}
      <div className="order-1 lg:order-2 relative aspect-square overflow-hidden bg-black/5 -mt-4 -mx-5 w-[calc(100%+2.5rem)] md:mt-0 md:mx-0 md:w-full rounded-none md:rounded-md">
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
