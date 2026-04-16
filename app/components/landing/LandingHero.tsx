"use client";

import { useState } from "react";
import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";
import LandingCTA from "./LandingCTA";
/* ------------------------------------------------------------------ */
/*  A/B TEST CONFIG                                                    */
/*  Change the active index to swap headline per campaign.             */
/*  Only one is rendered on the live site.                             */
/* ------------------------------------------------------------------ */

/** Headline variants for A/B testing. */
const HEADLINES = [
  /* 0 — proof-led, differentiator (current) */
  "The only brain supplement\nyou can measure.",
  /* 1 — pain-led, direct, urgency */
  "Your brain fades by 2pm.\nFix it.",
  /* 2 — identity-led, aspirational */
  "For people who refuse\nto fade by 2pm.",
  /* 3 — counterintuitive question */
  "What if your supplement\ncould prove it works?",
] as const;

const ACTIVE_HEADLINE_INDEX = 0;

/* ------------------------------------------------------------------ */
/*  Avatar data — photos at /public/avatars/, fallback to initials     */
/* ------------------------------------------------------------------ */

const AVATARS = [
  { src: "/avatars/1.jpg", initials: "JM", bg: "#e8d5b7" },
  { src: "/avatars/2.jpg", initials: "SR", bg: "#b7cfe8" },
  { src: "/avatars/3.jpg", initials: "AK", bg: "#d5e8b7" },
  { src: "/avatars/4.jpg", initials: "TW", bg: "#e8b7d5" },
  { src: "/avatars/5.jpg", initials: "LP", bg: "#b7e8d5" },
];

/**
 * Landing page hero — renders immediately, no mount-based animation.
 *
 * Mobile: social proof pill > image > copy > CTA > avatars (stacked).
 * Desktop: copy left, image right (split).
 *
 * Hero is paid-traffic landing content; readable and tappable on first paint.
 * Below-fold sections use scroll-triggered fades (Reveal) which don't affect LCP.
 */
export default function LandingHero() {
  const [failedAvatars, setFailedAvatars] = useState<Set<number>>(new Set());

  const handleAvatarError = (index: number) => {
    setFailedAvatars((prev) => new Set(prev).add(index));
  };

  return (
    <div>
      {/* Social proof pill — centered on mobile, left-aligned on desktop */}
      <div className="flex justify-center lg:justify-start mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[var(--brand-accent)]/10 text-[var(--brand-accent)]">
          150,000+ bottles sold
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
        {/* Copy — below image on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:flex-1 text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="brand-h1-bold mb-0 whitespace-pre-line">
            {HEADLINES[ACTIVE_HEADLINE_INDEX]}
          </h1>

          <p className="brand-body mt-4 text-black/60">
            Your brain fades by 2pm. Coffee masks it.
            <br className="hidden lg:inline" />{" "}
            Willpower can&apos;t fix it. A 2-shot system built for
            <br className="hidden lg:inline" />{" "}
            people who don&apos;t leave their performance to chance.
          </p>

          {/* CTA — safe-area padding prevents mobile URL bar overlap */}
          <div className="mt-8 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:pb-0">
            <LandingCTA className="lg:inline-block shadow-lg hover:shadow-xl font-bold lg:text-lg">
              Try CONKA
            </LandingCTA>
          </div>

          {/* Customer avatars + review count */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-3">
            <div className="flex -space-x-2">
              {AVATARS.map((avatar, i) => (
                <div
                  key={avatar.initials}
                  className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0"
                >
                  {failedAvatars.has(i) ? (
                    <div
                      className="w-full h-full flex items-center justify-center text-[10px] font-bold text-black/60"
                      style={{ backgroundColor: avatar.bg }}
                    >
                      {avatar.initials}
                    </div>
                  ) : (
                    <Image
                      src={avatar.src}
                      alt={`${avatar.initials}, verified buyer`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleAvatarError(i)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold text-black">500+ reviews</span>
              <span className="text-black/40 ml-1">· verified buyers</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start mt-3">
            <HeroTrustBadges />
          </div>
        </div>

        {/* Product image — constrained height, square source cropped */}
        <div
          className="relative order-1 lg:order-2 lg:flex-[1.5] w-full"
        >
          <div className="relative overflow-hidden rounded-[var(--brand-radius-container)] lg:rounded-[var(--brand-radius-card)] aspect-[5/3]">
            <Image
              src="/hero/ShotsHero.jpg"
              alt="CONKA Flow and Clear daily brain performance shots"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 95vw, 60vw"
              className="object-cover object-[center_55%] lg:object-center"
            />
          </div>
          {/* Star rating — plain text below image */}
          <p className="text-center lg:text-left text-sm text-black/60 mt-3">
            <span aria-hidden className="text-yellow-400">★★★★★</span>{" "}
            <span className="font-medium">4.7/5</span> from 500+ reviews
          </p>
        </div>
      </div>
    </div>
  );
}
