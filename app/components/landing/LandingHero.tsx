"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

const FUNNEL_URL = "/funnel";

/**
 * Landing page hero.
 *
 * Mobile: social proof pill → image (with power badge) → copy → CTA → avatars (stacked).
 * Desktop: copy left, image right (split).
 */
export default function LandingHero() {
  return (
    <div>
      {/* Social proof pill — top, centred, before everything */}
      <div className="flex justify-center lg:justify-start mb-5">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-ink)] text-white text-xs lg:text-sm font-semibold">
          <span aria-hidden className="text-yellow-400">★★★★★</span>
          <span>150,000+ bottles sold</span>
          <span className="text-white/40">·</span>
          <span>4.7/5 rating</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Copy — below image on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 5.5vw, 3.25rem)",
              letterSpacing: "var(--letter-spacing-premium-title)",
              color: "var(--color-ink)",
            }}
          >
            Sharp at 9am.
            <br />
            Still sharp at 9pm.
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
            Coffee borrows from tomorrow. CONKA invests in it.
            <br className="hidden lg:inline" />
            Two shots a day. 16 active ingredients.
            <br className="hidden lg:inline" />
            The only supplement that proves it&apos;s working.
          </p>

          {/* CTA — high contrast */}
          <div className="mt-8">
            <a
              href={FUNNEL_URL}
              className="block w-full lg:inline-block lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] font-bold text-base lg:text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: "var(--color-ink)",
                color: "white",
              }}
            >
              Try CONKA Today →
            </a>
          </div>

          {/* Customer avatars + review count */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-5">
            {/* Avatar stack — overlapping circles */}
            <div className="flex -space-x-2">
              {[
                { bg: "#e8d5b7", initials: "JM" },
                { bg: "#b7cfe8", initials: "SR" },
                { bg: "#d5e8b7", initials: "AK" },
                { bg: "#e8b7d5", initials: "TW" },
                { bg: "#b7e8d5", initials: "LP" },
              ].map((avatar) => (
                <div
                  key={avatar.initials}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-[var(--color-ink)]/60"
                  style={{ backgroundColor: avatar.bg }}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-[var(--color-ink)]">500+ reviews</span>
              <span className="text-[var(--color-ink)]/40 ml-1">· verified buyers</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start mt-6">
            <HeroTrustBadges />
          </div>
        </div>

        {/* Product image — on top for mobile, right on desktop */}
        <div className="relative order-1 lg:order-2 lg:flex-1 w-full">
          {/* Image with drop shadow for depth */}
          <div className="relative overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
            <Image
              src="/formulas/QuartelySingle.jpg"
              alt="CONKA Flow and Clear - brain performance shots delivered to your door"
              width={1280}
              height={1280}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto object-cover scale-[1.15] lg:scale-100"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              }}
            />

            {/* Power badge — circular, top-right */}
            <div
              className="absolute top-3 right-3 lg:top-5 lg:right-5 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg"
              style={{
                backgroundColor: "var(--color-ink)",
                color: "white",
              }}
            >
              <span className="text-lg lg:text-xl font-bold leading-none">16</span>
              <span className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-wide leading-tight mt-0.5 px-1">
                Active
                <br />
                Ingredients
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
