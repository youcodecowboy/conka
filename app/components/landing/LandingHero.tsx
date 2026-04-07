"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";
import LandingCTA from "./LandingCTA";
import { GUARANTEE_DAYS } from "@/app/lib/offerConstants";
import { PRICE_PER_DAY_BOTH } from "@/app/lib/landingPricing";

/**
 * Landing page hero with mount-based entrance animation.
 *
 * Mobile: social proof pill > image (with power badge) > copy > CTA > avatars (stacked).
 * Desktop: copy left, image right (split).
 *
 * Animation: staggered fade-up on mount. GPU-composited (transform + opacity only).
 */
export default function LandingHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: show content next microtask (near-instant, no animation frame wait)
    // Normal: wait one frame so the initial invisible state is painted before transitioning
    const trigger = reducedMotion
      ? (fn: () => void) => queueMicrotask(fn)
      : requestAnimationFrame;
    trigger(() => setMounted(true));
  }, []);

  const cls = (base: string, variant: string = "reveal") =>
    `${variant} ${mounted ? "revealed" : ""} ${base}`;

  return (
    <div>
      {/* Social proof pill -- sits close to headline, not nav */}
      <div
        className={cls("hero-delay-0 flex justify-start mb-4", "reveal-fade")}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-[var(--brand-radius-interactive)] bg-black text-white text-xs lg:text-sm font-semibold">
          <span aria-hidden className="text-yellow-400">★★★★★</span>
          <span>150,000+ bottles sold<sup className="text-[0.6em] text-white/30 align-super">§</sup></span>
          <span className="text-white/40">·</span>
          <span>4.7/5 rating</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Copy -- below image on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
          <div
            className={cls("hero-delay-1", "reveal")}
          >
            <h1 className="brand-h1-bold mb-0">
              Your brain fades
              <br />
              by 2pm. Why?
            </h1>
          </div>

          <div
            className={cls("hero-delay-2", "reveal")}
          >
            <p className="brand-body mt-4 text-black/60">
              Coffee masks it. Willpower can&apos;t fix it.
              <br className="hidden lg:inline" />{" "}
              CONKA is a daily 2-shot system with 16 active
              <br className="hidden lg:inline" />{" "}
              ingredients, from{" "}
              <span className="brand-data text-black">£{PRICE_PER_DAY_BOTH}/day</span>.{" "}
              150,000+ bottles sold.<sup className="text-[0.5em] text-black/40 align-super">§</sup>
            </p>
          </div>

          {/* CTA */}
          <div
            className={cls("hero-delay-3 mt-8", "reveal")}
          >
            <LandingCTA className="lg:inline-block shadow-lg hover:shadow-xl font-bold lg:text-lg">
              Try Risk-Free for {GUARANTEE_DAYS} Days →
            </LandingCTA>
          </div>

          {/* Customer avatars + review count */}
          <div
            className={cls("hero-delay-4 flex items-center justify-center lg:justify-start gap-3 mt-5", "reveal-fade")}
          >
            {/* Avatar stack */}
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
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-black/60"
                  style={{ backgroundColor: avatar.bg }}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-black">500+ reviews</span>
              <span className="text-black/40 ml-1">· verified buyers</span>
            </div>
          </div>

          <div
            className={cls("hero-delay-5 flex justify-center lg:justify-start mt-6", "reveal-fade")}
          >
            <HeroTrustBadges />
          </div>
        </div>

        {/* Product image */}
        <div
          className={cls("hero-delay-2 relative order-1 lg:order-2 lg:flex-1 w-full", "reveal-scale")}
        >
          <div className="relative overflow-hidden rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)]">
            <Image
              src="/formulas/QuartelySingle.jpg"
              alt="CONKA Flow and Clear daily shots delivered to your door"
              width={1280}
              height={1280}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto object-cover"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              }}
            />

            {/* Power badge */}
            <div className="absolute top-3 right-3 lg:top-5 lg:right-5 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg bg-black text-white">
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
