"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

const FUNNEL_URL = "#";

/**
 * Landing page hero — banner layout, mobile-first.
 *
 * Structure (mobile):
 *   1. Full-width banner image (slightly zoomed) + bottle count badge
 *   2. Headline — black text
 *   3. Subheadline
 *   4. CTA button (standard gradient)
 *   5. Trust cluster directly under CTA
 *   6. Authority row (Informed Sport + Made in Britain)
 */
export default function LandingHero() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner image — zoomed ~15%, with bottle count badge */}
      <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with daily brain shot bottles"
          width={1280}
          height={533}
          priority
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="w-full h-auto object-cover scale-[1.15]"
        />
        {/* Bottle count badge */}
        <div
          className="absolute top-3 left-3 lg:top-5 lg:left-5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "var(--color-ink)",
            backdropFilter: "blur(8px)",
          }}
        >
          56 shots · 2 boxes
        </div>
      </div>

      {/* Content block */}
      <div className="w-full max-w-2xl text-center mt-8 lg:mt-12">
        {/* Headline */}
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

        {/* CTA — standard gradient button */}
        <div className="mt-8 lg:mt-10">
          <a
            href={FUNNEL_URL}
            className="block w-full lg:inline-block lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base lg:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Get Started →
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
