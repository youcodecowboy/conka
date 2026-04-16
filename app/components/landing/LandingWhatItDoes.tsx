"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BenefitIconFocus,
  BenefitIconSleep,
  BenefitIconStress,
} from "./icons";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";
import LandingTrustBadges from "./LandingTrustBadges";
import WhatsInsideProductMini from "./WhatsInsideProductMini";
import AmPmConnector from "./AmPmConnector";

interface Ingredient {
  name: string;
  efsaAnchor?: boolean;
}

interface Pillar {
  id: string;
  icon: React.ReactNode;
  heading: string;
  description: React.ReactNode;
  ingredients: Ingredient[];
  studyObservation: React.ReactNode;
  pmid: string;
}

const PILLARS: Pillar[] = [
  {
    id: "mental",
    icon: <BenefitIconFocus />,
    heading: "Mental Performance",
    description:
      "Clinically-studied ingredients for your daily focus and clarity routine. Stay locked in past 2pm instead of reaching for another coffee.",
    ingredients: [
      { name: "Lemon Balm" },
      { name: "Alpha GPC" },
      { name: "Rhodiola" },
    ],
    studyObservation:
      "In one study, participants taking Lemon Balm showed improvements in calmness and alertness (Kennedy et al. 2003)¶",
    pmid: "PMID: 12888775",
  },
  {
    id: "energy",
    icon: <BenefitIconSleep />,
    heading: "Sustained Energy",
    description:
      "All-day mental energy without caffeine, jitters, or crashes. Adaptogens help your body manage the demands of a full day, not just the first few hours.",
    ingredients: [
      { name: "Ashwagandha" },
      { name: "Turmeric" },
      { name: "Vitamin B12", efsaAnchor: true },
    ],
    studyObservation:
      "In one study, participants taking Ashwagandha showed a significant reduction in perceived stress (Chandrasekhar et al. 2012)¶",
    pmid: "PMID: 23439798",
  },
  {
    id: "brain",
    icon: <BenefitIconStress />,
    heading: "Brain Health",
    description: (
      <>
        Long-term investment in your brain, not just a quick fix. Vitamin C
        contributes to the protection of cells from oxidative stress.
        <sup className="text-[0.5em] text-black/40 align-super">††</sup> A
        daily routine built for the years ahead.
      </>
    ),
    ingredients: [
      { name: "Glutathione" },
      { name: "NAC" },
      { name: "Vitamin C", efsaAnchor: true },
    ],
    studyObservation: (
      <>
        Vitamin C contributes to the protection of cells from oxidative stress
        <sup className="text-[0.5em] text-black/40 align-super">††</sup>. In
        one study, participants showed improvements in antioxidant capacity
        (Sinha et al. 2018)¶
      </>
    ),
    pmid: "PMID: 29559699",
  },
];

export default function LandingWhatItDoes() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {/* Title 1 — frames the products */}
      <h2
        className="brand-h1 mb-6"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Two shots. 16 active ingredients.
      </h2>

      {/* AM/PM connector strip above the bottle tiles */}
      <AmPmConnector />

      {/* Bottle visuals */}
      <div className="mb-12">
        <WhatsInsideProductMini />
      </div>

      {/* Lifestyle image + benefit pillars — side by side on desktop */}
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* Left: lifestyle image */}
        <div className="relative overflow-hidden rounded-[var(--brand-radius-card)] aspect-[5/3] lg:aspect-auto mb-8 lg:mb-0 lg:flex-[2] lg:min-h-[500px] lg:sticky lg:top-24 lg:self-start">
          <Image
            src="/lifestyle/CreationOfConka.jpg"
            alt="Two hands passing a CONKA bottle"
            fill
            sizes="(max-width: 1024px) 95vw, 500px"
            className="object-cover"
          />
        </div>

        {/* Right: title + pillar cards */}
        <div className="lg:flex-[3]">
          <h2
            className="brand-h1 mb-6"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Daily habit. Lifelong benefits.
          </h2>

          <div className="grid grid-cols-1 gap-4">
        {PILLARS.map((pillar) => {
          const isOpen = openId === pillar.id;

          return (
            <div
              key={pillar.id}
              className={`rounded-[var(--brand-radius-card)] bg-white p-5 lg:p-6 flex flex-col shadow-sm ${
                isOpen
                  ? "border-l-4 border-l-brand-accent border border-black/6"
                  : "border border-black/6"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl lg:text-3xl font-semibold text-black">
                  {pillar.heading}
                </h3>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/8 text-brand-accent flex-shrink-0 ml-3">
                  {pillar.icon}
                </div>
              </div>

              {/* Body */}
              <p className="text-sm text-black/60 leading-relaxed mb-4">
                {pillar.description}
              </p>

              {/* Tap-to-reveal trigger — pinned to bottom of card */}
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : pillar.id)}
                aria-expanded={isOpen}
                aria-controls={`pillar-evidence-${pillar.id}`}
                className="mt-auto inline-flex items-center justify-between gap-2 min-h-[44px] text-sm font-semibold text-brand-accent text-left cursor-pointer"
              >
                <span>{isOpen ? "Hide details" : "See ingredients & research"}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Reveal panel — ingredient pills + study observation */}
              {isOpen && (
                <div
                  id={`pillar-evidence-${pillar.id}`}
                  className="mt-3 pt-3 border-t border-black/6"
                >
                  {/* Ingredient pills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {pillar.ingredients.map((ingredient) => (
                      <span
                        key={ingredient.name}
                        className="inline-flex items-center gap-1.5 rounded-[var(--brand-radius-interactive)] bg-black/[0.03] border border-black/6 px-3 py-1.5 text-sm"
                      >
                        <span className="font-semibold text-black/80">
                          {ingredient.name}
                        </span>
                        {ingredient.efsaAnchor && (
                          <span className="text-black/30 text-xs">††</span>
                        )}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs leading-relaxed text-black/60">
                    {pillar.studyObservation}
                  </p>
                  <p className="text-xs brand-data-label mt-2 text-black/40">
                    {pillar.pmid}
                  </p>
                </div>
              )}
            </div>
          );
        })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-start">
        <LandingCTA>
          Get Both from &pound;{PRICE_PER_SHOT_BOTH}/shot &rarr;
        </LandingCTA>
      </div>

      {/* Trust badges */}
      <div className="mt-6">
        <LandingTrustBadges />
      </div>
    </div>
  );
}
