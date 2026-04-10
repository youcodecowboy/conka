"use client";

import { useState } from "react";
import Image from "next/image";
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

function ProductMini({ stretch = false }: { stretch?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-3 lg:gap-4 ${stretch ? "h-full" : ""}`}>
      {/* Flow */}
      <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
        <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
          <Image
            src="/formulas/conkaFlow/FlowNoBackground.png"
            alt="CONKA Flow bottle"
            fill
            sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
            className="object-contain scale-200"
          />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
          style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "rgb(180, 83, 9)" }}
        >
          ☀️ Morning
        </span>
        <p className="text-sm lg:text-base font-semibold text-black">CONKA Flow</p>
        <p className="text-[11px] lg:text-xs text-black/40 mt-1">
          Lemon Balm · Ashwagandha · +4 more
        </p>
      </div>

      {/* Clear */}
      <div className={`flex flex-col items-center text-center rounded-[var(--brand-radius-container)] bg-black/[0.02] border border-black/6 p-4 lg:p-6 ${stretch ? "justify-center" : ""}`}>
        <div className={`relative w-16 h-36 mb-3 ${stretch ? "lg:w-28 lg:h-64" : "lg:w-24 lg:h-52"}`}>
          <Image
            src="/formulas/conkaClear/ClearNoBackground.png"
            alt="CONKA Clear bottle"
            fill
            sizes={stretch ? "(max-width: 1024px) 64px, 112px" : "(max-width: 1024px) 64px, 96px"}
            className="object-contain scale-200"
          />
        </div>
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--brand-radius-interactive)] text-[11px] lg:text-xs font-semibold mb-2"
          style={{ backgroundColor: "rgba(14, 165, 233, 0.1)", color: "rgb(3, 105, 161)" }}
        >
          ☀️ Afternoon
        </span>
        <p className="text-sm lg:text-base font-semibold text-black">CONKA Clear</p>
        <p className="text-[11px] lg:text-xs text-black/40 mt-1">
          Glutathione · Alpha GPC · +8 more
        </p>
      </div>
    </div>
  );
}

export default function LandingWhatsInside() {
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2
          className="brand-h1 mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Two shots. 16 active ingredients.
        </h2>
        <p className="brand-caption text-black/50">
          Tap a group to see the research
        </p>
      </div>

      {/* Mobile: product mini above cards */}
      <div className="lg:hidden mb-8">
        <ProductMini />
      </div>

      {/* Desktop: two-column layout with product mini on right */}
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Ingredient groups */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:flex-1">
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

        {/* Desktop: product mini on right, stretches to match cards */}
        <div className="hidden lg:block lg:w-[320px] lg:flex-shrink-0 lg:self-stretch">
          <ProductMini stretch />
        </div>
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
