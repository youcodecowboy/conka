"use client";

import { useState } from "react";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";
import LandingTrustBadges from "./LandingTrustBadges";
import {
  BenefitIconFocus,
  BenefitIconSleep,
  BenefitIconStress,
} from "./icons";

interface Ingredient {
  name: string;
  dosage?: string;
  efsaAnchor?: boolean;
}

interface IngredientGroup {
  id: string;
  icon: React.ReactNode;
  heading: string;
  subtitle: string;
  ingredients: Ingredient[];
  studyObservation: string;
  study: string;
  pmid: string;
}

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    id: "focus",
    icon: <BenefitIconFocus />,
    heading: "Focus & Clarity",
    subtitle: "Sharpen focus and stay locked in",
    ingredients: [
      { name: "Lemon Balm", dosage: "300mg" },
      { name: "Alpha GPC" },
      { name: "Rhodiola" },
    ],
    studyObservation:
      "In one study, participants taking Lemon Balm showed improvements in calmness and alertness (Kennedy et al. 2003)\u00B6",
    study: "Kennedy et al. 2003",
    pmid: "PMID: 12888775",
  },
  {
    id: "energy",
    icon: <BenefitIconSleep />,
    heading: "Energy & Resilience",
    subtitle: "All-day energy without the crash",
    ingredients: [
      { name: "Ashwagandha", dosage: "600mg" },
      { name: "Turmeric" },
      { name: "Vitamin B12", efsaAnchor: true },
    ],
    studyObservation:
      "In one study, participants taking Ashwagandha showed a significant reduction in perceived stress (Chandrasekhar et al. 2012)\u00B6",
    study: "Chandrasekhar et al. 2012",
    pmid: "PMID: 23439798",
  },
  {
    id: "protection",
    icon: <BenefitIconStress />,
    heading: "Protection & Recovery",
    subtitle: "Invest in your brain for the long run",
    ingredients: [
      { name: "Glutathione", dosage: "250mg" },
      { name: "NAC" },
      { name: "Vitamin C", efsaAnchor: true },
    ],
    studyObservation:
      "Vitamin C contributes to the protection of cells from oxidative stress\u2020\u2020. In one study, participants showed improvements in antioxidant capacity (Sinha et al. 2018)\u00B6",
    study: "Sinha et al. 2018",
    pmid: "PMID: 29559699",
  },
];

export default function LandingWhatsInside() {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          16 active ingredients. Two shots. One system.
        </h2>
        <p className="brand-caption text-black/50">
          Tap a group to see the research
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:gap-5">
        {INGREDIENT_GROUPS.map((group) => {
          const isOpen = openGroupId === group.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setOpenGroupId(isOpen ? null : group.id)}
              aria-expanded={isOpen}
              className={`flex flex-col items-start text-left w-full rounded-[var(--brand-radius-card)] bg-white shadow-sm transition-colors duration-200 cursor-pointer p-5 lg:p-6 ${
                isOpen
                  ? "border-l-4 border-l-brand-accent border border-black/6"
                  : "border border-black/6"
              }`}
            >
              {/* Icon + heading row */}
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-accent/8 text-brand-accent flex-shrink-0">
                  {group.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl lg:text-2xl font-semibold text-black mb-1">
                    {group.heading}
                  </h3>
                  <p className="text-sm text-black/60 mb-3">
                    {group.subtitle}
                  </p>

                  {/* Ingredient pills */}
                  <div className="flex flex-wrap gap-2">
                    {group.ingredients.map((ingredient) => (
                      <span
                        key={ingredient.name}
                        className="inline-flex items-center gap-1.5 rounded-[var(--brand-radius-interactive)] bg-black/[0.03] border border-black/6 px-3 py-1.5 text-sm"
                      >
                        <span className="font-semibold text-black/80">
                          {ingredient.name}
                        </span>
                        {ingredient.dosage && (
                          <span className="brand-data-label text-black/40">
                            {ingredient.dosage}
                          </span>
                        )}
                        {ingredient.efsaAnchor && (
                          <span className="text-black/30 text-xs">††</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand chevron */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-brand-accent mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Study detail -- shown on tap */}
              <div
                className="w-full overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="mt-4 pt-4 text-left border-t border-black/6 ml-16">
                  <p className="text-xs leading-relaxed text-black/60">
                    {group.studyObservation}
                  </p>
                  <p className="text-xs brand-data-label mt-2 text-black/40">
                    {group.pmid}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-start">
        <LandingCTA>
          Get Both from &pound;{PRICE_PER_SHOT_BOTH}/shot &rarr;
        </LandingCTA>
      </div>

      {/* Trust Badges */}
      <div className="mt-6">
        <LandingTrustBadges />
      </div>
    </div>
  );
}
