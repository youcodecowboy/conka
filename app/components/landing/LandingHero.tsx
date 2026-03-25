"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

/**
 * Landing page hero — banner layout, mobile-first.
 *
 * Structure (mobile):
 *   1. Full-width banner image (slightly zoomed for impact)
 *   2. Headline — black text, no gradient
 *   3. Subheadline
 *   4. CTA button — white bg, gradient border (3px), rounded pill
 *   5. Trust cluster directly under CTA
 *   6. Authority row (Informed Sport + Made in Britain)
 */
export default function LandingHero() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner image — zoomed ~15% via scale, cropped by overflow hidden */}
      <div className="w-full overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with daily brain shot bottles"
          width={1280}
          height={533}
          priority
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="w-full h-auto object-cover scale-[1.15]"
        />
      </div>

      {/* Content block */}
      <div className="w-full max-w-2xl text-center mt-8 lg:mt-12">
        {/* Headline — plain black */}
        <h1
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 5.5vw, 3.25rem)",
            letterSpacing: "var(--letter-spacing-premium-title)",
            color: "var(--color-ink)",
          }}
        >
          Morning Energy.
          <br />
          Afternoon Clarity.
        </h1>

        {/* Subheadline */}
        <p
          className="mt-4 lg:mt-5"
          style={{
            fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
            lineHeight: "var(--premium-font-body-leading)",
            color: "var(--color-ink)",
            opacity: 0.6,
          }}
        >
          Flow for focus. Clear for recovery. Take both daily.
        </p>

        {/* CTA — gradient border pill: outer div = gradient bg, inner = white */}
        <div className="mt-8 lg:mt-10 flex justify-center">
          <a
            href="#"
            className="relative block w-full lg:w-auto rounded-full p-[3px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            <span
              className="block w-full text-center py-4 px-14 rounded-full font-semibold text-base lg:text-lg"
              style={{ background: "white", color: "#0e6eb8" }}
            >
              Get Started →
            </span>
          </a>
        </div>

        {/* Trust cluster — tight to CTA */}
        <div className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold opacity-60">
          <span aria-hidden className="text-yellow-500">★★★★★</span>
          <span>4.7/5 from 500+ verified reviews</span>
        </div>

        {/* Authority row */}
        <div className="flex justify-center mt-8">
          <HeroTrustBadges />
        </div>
      </div>
    </div>
  );
}
