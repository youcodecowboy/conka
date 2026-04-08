"use client";

import LandingCTA from "./LandingCTA";
import { useInView } from "@/app/hooks/useInView";
import { useCountUp } from "@/app/hooks/useCountUp";
import {
  PRICE_PER_DAY_BOTH,
  PRICE_PER_SHOT_BOTH,
  COFFEE_PRICE_PER_DAY,
  CONKA_INGREDIENTS_COUNT,
  MONTHLY_SAVINGS_VS_COFFEE,
} from "@/app/lib/landingPricing";

const COFFEE_ATTRIBUTES = [
  "Caffeine-based stimulant",
  "Tolerance builds over time",
  "Can disrupt sleep",
];

const CONKA_ATTRIBUTES = [
  "Caffeine-free, no crash",
  "UK patented formula",
  "Informed Sport Certified",
];

export default function LandingValueComparison() {
  const [ref, isInView] = useInView();

  // Number counter refs -- animate from 0 when section enters viewport
  const coffeePriceRef = useCountUp(parseFloat(COFFEE_PRICE_PER_DAY), isInView, {
    decimals: 2,
    prefix: "£",
  });
  const conkaPriceRef = useCountUp(parseFloat(PRICE_PER_DAY_BOTH), isInView, {
    decimals: 2,
    prefix: "£",
  });
  const ingredientsRef = useCountUp(parseInt(CONKA_INGREDIENTS_COUNT), isInView, {
    decimals: 0,
  });
  const savingsRef = useCountUp(parseInt(MONTHLY_SAVINGS_VS_COFFEE), isInView, {
    decimals: 0,
    prefix: "~£",
  });

  return (
    <div ref={ref}>
      {/* Heading */}
      <div className="mb-10">
        <h2 className="brand-h2 mb-0">Less than your daily coffee.</h2>
        <p className="mt-2 text-black/60">
          {CONKA_INGREDIENTS_COUNT} active ingredients for the price of a latte.
        </p>
      </div>

      {/* Comparison card */}
      <div className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 overflow-hidden">
        {/* Mobile: stacked | Desktop: side-by-side */}
        <div className="flex flex-col lg:flex-row">
          {/* Coffee side */}
          <div className="flex-1 p-5 lg:p-8">
            <div className="flex items-center gap-2 mb-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-black/60"
                aria-hidden
              >
                <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
              <span className="text-sm font-semibold text-black/60 uppercase tracking-wide">
                Your daily coffee
              </span>
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline gap-1">
                <span
                  ref={coffeePriceRef}
                  className="brand-data text-2xl lg:text-3xl text-black"
                >
                  £{COFFEE_PRICE_PER_DAY}
                </span>
                <span className="brand-data-label text-black/40">/day</span>
              </div>
              <p className="text-xs text-black/40 mt-1">UK average</p>
            </div>

            {/* Ingredients */}
            <div className="mb-5">
              <span className="brand-data text-lg text-black">1</span>
              <span className="text-sm text-black/60 ml-1.5">
                ingredient (caffeine)
              </span>
            </div>

            {/* Attributes */}
            <div className="space-y-2.5">
              {COFFEE_ATTRIBUTES.map((attr, i) => (
                <div
                  key={attr}
                  className="flex items-center gap-2.5"
>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-black/30"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="text-sm text-black/60">{attr}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider -- horizontal on mobile, vertical on desktop */}
          <div className="relative">
            {/* Mobile divider */}
            <div className="lg:hidden flex items-center px-5">
              <div className="flex-1 h-px bg-black/8" />
              <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-semibold">
                vs
              </span>
              <div className="flex-1 h-px bg-black/8" />
            </div>
            {/* Desktop divider */}
            <div className="hidden lg:block">
              <div className="w-px h-full bg-black/8" />
            </div>
          </div>

          {/* CONKA side */}
          <div className="flex-1 p-5 lg:p-8 bg-brand-accent/[0.02]">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded-full bg-brand-accent/15 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-accent" />
              </div>
              <span className="text-sm font-semibold text-black uppercase tracking-wide">
                CONKA (Both)
              </span>
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline gap-1">
                <span
                  ref={conkaPriceRef}
                  className="brand-data text-2xl lg:text-3xl text-brand-accent"
                >
                  £{PRICE_PER_DAY_BOTH}
                </span>
                <span className="brand-data-label text-black/40">/day</span>
              </div>
              <p className="text-xs text-black/40 mt-1">
                Monthly subscription (<span className="brand-data-label">£{PRICE_PER_SHOT_BOTH}</span>/shot)
              </p>
            </div>

            {/* Ingredients */}
            <div className="mb-5">
              <span
                ref={ingredientsRef}
                className="brand-data text-lg text-brand-accent"
              >
                {CONKA_INGREDIENTS_COUNT}
              </span>
              <span className="text-sm text-black/60 ml-1.5">
                active ingredients
              </span>
            </div>

            {/* Attributes */}
            <div className="space-y-2.5">
              {CONKA_ATTRIBUTES.map((attr, i) => (
                <div
                  key={attr}
                  className="flex items-center gap-2.5"
>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-brand-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm text-black/80">{attr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Savings callout -- standalone strip below card */}
      <div className="mt-4 px-5 py-3 rounded-[var(--brand-radius-interactive)] bg-brand-accent/8 text-center lg:text-left">
        <span className="text-sm font-semibold text-brand-accent">
          Save{" "}
          <span ref={savingsRef}>~£{MONTHLY_SAVINGS_VS_COFFEE}</span>
          /month vs coffee
        </span>
        <span className="text-sm text-black/60 ml-1.5">
          · 2 shots, {CONKA_INGREDIENTS_COUNT} ingredients, no crash
        </span>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-start">
        <LandingCTA>Get Both from £{PRICE_PER_SHOT_BOTH}/shot →</LandingCTA>
      </div>
    </div>
  );
}
