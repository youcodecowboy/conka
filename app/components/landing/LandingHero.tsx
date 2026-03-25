"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

const FUNNEL_URL = "/funnel";

/**
 * Landing page hero.
 *
 * Mobile: banner image → copy → CTA (stacked).
 * Desktop: copy left, image right (split).
 */
export default function LandingHero() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
      {/* Copy — below image on mobile, left on desktop */}
      <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-ink)", opacity: 0.35 }}
        >
          Daily natural brain shots
        </p>

        <h1
          className="font-bold leading-tight mt-3"
          style={{
            fontSize: "clamp(1.75rem, 5.5vw, 3.25rem)",
            letterSpacing: "var(--letter-spacing-premium-title)",
            color: "var(--color-ink)",
          }}
        >
          Morning Energy.
          <br />
          Evening Clarity.
        </h1>

        <p
          className="mt-4"
          style={{
            fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
            lineHeight: "var(--premium-font-body-leading)",
            color: "var(--color-ink)",
            opacity: 0.6,
          }}
        >
          16 natural ingredients. Two shots a day. Clinically dosed.†
        </p>

        <div className="mt-8">
          <a
            href={FUNNEL_URL}
            className="block w-full lg:inline-block lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base lg:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Try CONKA Today →
          </a>
        </div>

        <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 text-sm font-semibold opacity-60">
          <span aria-hidden className="text-yellow-500">★★★★★</span>
          <span>4.7/5 from 500+ verified reviews&#8225;</span>
        </div>

        <div className="flex justify-center lg:justify-start mt-6">
          <HeroTrustBadges />
        </div>
      </div>

      {/* Banner image — on top for mobile, right on desktop */}
      <div className="relative order-1 lg:order-2 lg:flex-1 w-full overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with daily brain shot bottles"
          width={1280}
          height={533}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-auto object-cover scale-[1.15] lg:scale-100"
        />
        <div
          className="absolute top-3 left-3 lg:top-5 lg:left-5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold"
          style={{
            backgroundColor: "var(--color-neuro-blue-light)",
            color: "var(--color-ink)",
          }}
        >
          Over 150,000 bottles sold&#167;
        </div>
      </div>
    </div>
  );
}
