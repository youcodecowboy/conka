"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

/**
 * Landing page hero — product-focused, mobile-first.
 *
 * Mobile: image on top, copy + CTA below. Tight vertical spacing.
 * Desktop: two-column (image left, copy right).
 *
 * Page wraps this in premium-section-luxury + premium-track.
 * Component is content-only (no section, no background, no padding).
 */
export default function LandingHero() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
      {/* Trust proof — compact, left-aligned on mobile */}
      <div className="w-full lg:hidden">
        <div className="flex items-center gap-2 text-sm font-bold opacity-70">
          <span aria-hidden className="text-yellow-500">★★★★★</span>
          <span>150,000+ bottles sold</span>
        </div>
      </div>

      {/* Product image */}
      <div className="w-full lg:w-1/2">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with brain shot bottles"
          width={800}
          height={533}
          priority
          className="w-full h-auto rounded-2xl lg:rounded-[var(--premium-radius-card)]"
        />
      </div>

      {/* Copy */}
      <div className="w-full lg:w-1/2 text-left">
        {/* Trust proof — desktop only (mobile is above image) */}
        <div className="hidden lg:flex items-center gap-3 mb-4 text-sm font-bold opacity-70">
          <span className="flex items-center gap-1">
            <span aria-hidden className="text-yellow-500">★★★★★</span>
            4.7/5
          </span>
          <span aria-hidden>·</span>
          <span>500+ reviews</span>
          <span aria-hidden>·</span>
          <span>150,000+ bottles sold</span>
        </div>

        <h1
          className="font-bold leading-tight"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
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

        <p
          className="text-base lg:text-lg mt-3 opacity-70"
          style={{ lineHeight: "var(--premium-font-body-leading)" }}
        >
          Flow in the morning. Clear in the evening. Take both daily for peak
          cognitive performance.
        </p>

        {/* CTA — full width on mobile */}
        <div className="mt-5">
          <a
            href="#"
            className="block w-full lg:inline-block lg:w-auto text-center py-3 lg:py-4 px-12 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Get Started →
          </a>
        </div>

        {/* Certification badges — below CTA */}
        <div className="mt-4">
          <HeroTrustBadges />
        </div>
      </div>
    </div>
  );
}
