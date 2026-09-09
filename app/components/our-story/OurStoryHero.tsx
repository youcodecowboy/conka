"use client";

import { useRef } from "react";
import Image from "next/image";
import { storyHero } from "@/app/lib/storyData";
import { useGSAP, withMotion, revealUp } from "@/app/lib/motion";

/* ============================================================================
 * OurStoryHero — the opening split of /our-story.
 *
 * Copy left, photo right at lg; stacked copy-then-photo on mobile. The stat
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
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16"
    >
      <div>
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

        <div
          data-hero-reveal
          className="grid grid-cols-3 gap-4 mt-8 lg:mt-10 border-t border-black/12 pt-5"
        >
          {storyHero.stats.map((stat) => (
            <div key={stat.label}>
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

      {/* Square at lg to match the Figma's ~1:1 hero slot (960x945). */}
      <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden rounded-md bg-black/5">
        <Image
          src={storyHero.image}
          alt={storyHero.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </div>
    </div>
  );
}

export default OurStoryHero;
