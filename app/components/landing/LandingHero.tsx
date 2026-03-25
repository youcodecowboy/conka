"use client";

import Image from "next/image";
import { HeroTrustBadges } from "../HeroShared";

const FUNNEL_URL = "#";

export default function LandingHero() {
  return (
    <div className="flex flex-col items-center">
      {/* Banner image — zoomed on mobile, contained on desktop */}
      <div className="relative w-full lg:max-w-3xl overflow-hidden rounded-2xl lg:rounded-[var(--premium-radius-card)]">
        <Image
          src="/CONKA_39.jpg"
          alt="CONKA Flow and Clear — two boxes with daily brain shot bottles"
          width={1280}
          height={533}
          priority
          sizes="(max-width: 1024px) 100vw, 768px"
          className="w-full h-auto object-cover scale-[1.15] lg:scale-100"
        />
        <div
          className="absolute top-3 left-3 lg:top-5 lg:left-5 px-3 py-1.5 rounded-full text-xs lg:text-sm font-semibold"
          style={{
            backgroundColor: "var(--color-neuro-blue-light)",
            color: "var(--color-ink)",
          }}
        >
          Over 150,000 bottles sold
        </div>
      </div>

      <div className="w-full max-w-2xl text-center mt-8 lg:mt-12">
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
          16 natural ingredients. Two daily shots. Clinically dosed.
        </p>

        <div className="mt-8 lg:mt-10">
          <a
            href={FUNNEL_URL}
            className="block w-full lg:inline-block lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] text-white font-semibold text-base lg:text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--gradient-neuro-blue-accent)" }}
          >
            Get Started →
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold opacity-60">
          <span aria-hidden className="text-yellow-500">★★★★★</span>
          <span>4.7/5 from 500+ verified reviews</span>
        </div>

        <div className="flex justify-center mt-8">
          <HeroTrustBadges />
        </div>
      </div>
    </div>
  );
}
