"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

/**
 * Landing page hero — banner layout, mobile-first.
 *
 * Structure (mobile, top to bottom):
 *   1. Full-width banner image (edge-to-edge)
 *   2. Headline
 *   3. Subheadline
 *   4. Full-width CTA button
 *   5. Trust cluster (stars + review count)
 *   6. Authority row (Informed Sport + Made in Britain)
 *
 * Desktop: same vertical stack but wider image, centred text block.
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only (no section, no background).
 *
 * TODO: Replace CONKA_39.jpg with a proper hero banner asset (wider aspect ratio).
 * TODO: Add value badge / offer callout once pricing is confirmed.
 * TODO: Update headline + subheadline once copy is finalised with January Brands.
 */
export default function LandingHero() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner image — full track width */}
      <div className="w-full overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with daily brain shot bottles"
          width={1280}
          height={533}
          priority
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Content block — below the banner */}
      <div className="w-full max-w-2xl text-center mt-6 lg:mt-10">
        {/* Headline */}
        <h1
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 5.5vw, 3.25rem)",
            letterSpacing: "var(--letter-spacing-premium-title)",
          }}
        >
          Your daily brain{" "}
          <span
            style={{
              backgroundImage: "var(--gradient-neuro-blue-accent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            performance system
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-3 opacity-70"
          style={{
            fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
            lineHeight: "var(--premium-font-body-leading)",
          }}
        >
          Flow in the morning. Clear in the evening. Take both daily for peak
          cognitive performance.
        </p>

        {/* CTA — full width mobile, auto desktop */}
        <div className="mt-5 lg:mt-6">
          <a
            href="#"
            className="block w-full lg:inline-block lg:w-auto text-center py-3.5 lg:py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Get Started →
          </a>
        </div>

        {/* Trust cluster — stars + review count */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm font-bold opacity-70">
          <span aria-hidden className="text-yellow-500">★★★★★</span>
          <span>4.7/5 from 500+ reviews</span>
        </div>

        {/* Authority row — certification badges */}
        <div className="flex justify-center mt-4">
          <HeroTrustBadges />
        </div>
      </div>
    </div>
  );
}
