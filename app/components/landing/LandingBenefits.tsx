"use client";

import { useState } from "react";
import { GUARANTEE_LABEL } from "@/app/lib/offerConstants";
import { PRICE_PER_SHOT_BOTH } from "@/app/lib/landingPricing";
import LandingCTA from "./LandingCTA";
import {
  BenefitIconFocus,
  BenefitIconSleep,
  BenefitIconStress,
  BenefitIconThinking,
  TrustIconShipping,
  TrustIconInformedSport,
  TrustIconBatchTested,
  TrustIconCancel,
} from "./icons";

const BENEFITS = [
  {
    id: "focus",
    icon: <BenefitIconFocus />,
    title: "Stay locked in past 2pm",
    ingredient: "Lemon Balm Extract \u00B7 300mg",
    studyObservation: "In one study, participants taking Lemon Balm showed improvements in calmness and alertness (Kennedy et al. 2003)\u00B6",
    study: "Kennedy et al. 2003",
    pmid: "PMID: 12888775",
  },
  {
    id: "sleep",
    icon: <BenefitIconSleep />,
    title: "Wake up ready, not catching up",
    ingredient: "Ashwagandha \u00B7 600mg",
    studyObservation: "In one study, participants taking Ashwagandha reported improvements in sleep quality (Salve et al. 2019)\u00B6",
    study: "Salve et al. 2019",
    pmid: "PMID: 32021735",
  },
  {
    id: "stress",
    icon: <BenefitIconStress />,
    title: "Pressure that used to rattle you, doesn\u2019t",
    ingredient: "Glutathione \u00B7 250mg",
    studyObservation: "In one study, participants taking Ashwagandha showed a reduction in perceived stress (Chandrasekhar et al. 2012)\u00B6",
    study: "Chandrasekhar et al. 2012",
    pmid: "PMID: 23439798",
  },
  {
    id: "brain-fog",
    icon: <BenefitIconThinking />,
    title: "Sharp calls at 4pm, not just 9am",
    ingredient: "Vitamin C + B Vitamins",
    studyObservation: "Vitamin C contributes to normal psychological function\u2020\u2020 - CONKA Clear provides Vitamin C alongside Glutathione (Sinha et al. 2018)\u00B6",
    study: "Sinha et al. 2018",
    pmid: "PMID: 29559699",
  },
];

const TRUST_BADGES = [
  {
    icon: <TrustIconShipping />,
    title: "Free UK Shipping",
    subtitle: "On subscriptions",
  },
  {
    icon: <TrustIconInformedSport />,
    title: "Informed Sport",
    subtitle: "Certified",
  },
  {
    icon: <TrustIconBatchTested />,
    title: "Every Batch Tested",
    subtitle: "UK lab verified",
  },
  {
    icon: <TrustIconCancel />,
    title: "Cancel Anytime",
    subtitle: GUARANTEE_LABEL,
  },
];

export default function LandingBenefits() {
  const [tappedId, setTappedId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-10">
        <h2 className="brand-h2 mb-0">
          What&apos;s working inside every shot.
        </h2>
        <p className="text-sm text-black/60 mt-2">
          Tap a benefit to see the research.
        </p>
      </div>

      {/* 2x2 Benefit Grid */}
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {BENEFITS.map((benefit) => {
          const isOpen = tappedId === benefit.id;

          return (
            <button
              key={benefit.id}
              type="button"
              onClick={() => setTappedId(isOpen ? null : benefit.id)}
              aria-expanded={isOpen}
              className={`flex flex-col items-start text-left p-4 lg:p-6 rounded-[var(--brand-radius-card)] bg-white shadow-sm transition-colors duration-200 cursor-pointer ${
                isOpen ? "border-l-4 border-l-brand-accent border border-black/6" : "border border-black/6"
              }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-3 bg-brand-accent/8 text-brand-accent">
                {benefit.icon}
              </div>

              {/* Benefit title */}
              <h3 className="text-sm lg:text-base font-semibold text-black leading-snug">
                {benefit.title}
              </h3>

              {/* Ingredient + dosage */}
              <p className="text-xs lg:text-sm mt-1.5 leading-snug text-black/60">
                <span className="brand-data-label">{benefit.ingredient}</span>
              </p>

              {/* Expand affordance */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className="text-xs font-medium text-brand-accent">
                  See the research
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-brand-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                <div className="mt-3 pt-3 text-left border-t border-black/6">
                  <p className="text-xs leading-relaxed text-black/60">
                    {benefit.studyObservation}
                  </p>
                  <p className="text-xs brand-data-label mt-2 text-black/40">
                    {benefit.pmid}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-[var(--brand-radius-interactive)] bg-black/[0.03] border border-black/6"
          >
            <span className="text-brand-accent/60 shrink-0">
              {badge.icon}
            </span>
            <div>
              <p className="text-xs font-semibold leading-tight text-black/80">
                {badge.title}
              </p>
              <p className="text-xs leading-tight text-black/50">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-start">
        <LandingCTA>Get Both from &pound;{PRICE_PER_SHOT_BOTH}/shot &rarr;</LandingCTA>
      </div>
    </div>
  );
}
