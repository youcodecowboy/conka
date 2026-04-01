"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";
import LandingCTA from "./LandingCTA";
import { GUARANTEE_DAYS } from "@/app/lib/offerConstants";

/**
 * Landing page hero.
 *
 * Mobile: social proof pill > image (with power badge) > copy > CTA > avatars (stacked).
 * Desktop: copy left, image right (split).
 */
export default function LandingHero() {
  return (
    <div>
      {/* Social proof pill */}
      <div className="flex justify-start mb-5">
        <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--brand-radius-interactive)] bg-[var(--brand-black)] text-white text-xs lg:text-sm font-semibold">
          <span aria-hidden className="text-yellow-400">★★★★★</span>
          <span>150,000+ bottles sold§</span>
          <span className="text-white/40">·</span>
          <span>4.7/5 rating</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Copy -- below image on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="brand-h1-bold">
            Your brain fades
            <br />
            by 2pm. Why?
          </h1>

          <p
            className="brand-body mt-4"
            style={{ opacity: 0.6 }}
          >
            Coffee masks it. Willpower can&apos;t fix it.
            <br className="hidden lg:inline" />{" "}
            CONKA is a daily 2-shot system with 16 active
            <br className="hidden lg:inline" />{" "}
            ingredients. 150,000+ bottles sold.§
          </p>

          {/* CTA */}
          <div className="mt-8">
            <LandingCTA className="lg:inline-block shadow-lg hover:shadow-xl font-bold lg:text-lg">
              Try Risk-Free for {GUARANTEE_DAYS} Days →
            </LandingCTA>
          </div>

          {/* Customer avatars + review count */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-5">
            {/* Avatar stack */}
            <div className="flex -space-x-2">
              {/* TODO: Avatar colours are hardcoded pastels. Brand system has no
                  avatar/pastel palette defined. Fallback: kept as inline values.
                  Consider adding --brand-avatar-* tokens if pattern recurs. */}
              {[
                { bg: "#e8d5b7", initials: "JM" },
                { bg: "#b7cfe8", initials: "SR" },
                { bg: "#d5e8b7", initials: "AK" },
                { bg: "#e8b7d5", initials: "TW" },
                { bg: "#b7e8d5", initials: "LP" },
              ].map((avatar) => (
                <div
                  key={avatar.initials}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-[var(--brand-black)]/60"
                  style={{ backgroundColor: avatar.bg }}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-[var(--brand-black)]">500+ reviews</span>
              <span className="text-[var(--brand-black)]/40 ml-1">· verified buyers</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start mt-6">
            <HeroTrustBadges />
          </div>
        </div>

        {/* Product image */}
        <div className="relative order-1 lg:order-2 lg:flex-1 w-full">
          <div className="relative overflow-hidden rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)]">
            <Image
              src="/formulas/QuartelySingle.jpg"
              alt="CONKA Flow and Clear daily shots delivered to your door"
              width={1280}
              height={1280}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto object-cover scale-[1.15] lg:scale-100"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              }}
            />

            {/* Power badge */}
            <div
              className="absolute top-3 right-3 lg:top-5 lg:right-5 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg"
              style={{
                backgroundColor: "var(--brand-black)",
                color: "var(--brand-white)",
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
