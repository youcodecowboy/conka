"use client";

import { useState } from "react";
import { GUARANTEE_LABEL } from "@/app/lib/offerConstants";

const FUNNEL_URL = "/funnel";

const BENEFITS = [
  {
    id: "focus",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Sharper Focus",
    subtitle: "Stay locked in for longer",
    ingredient: "Lemon Balm Extract · 300mg",
    studyObservation: "In one study, participants taking Lemon Balm showed improvements in calmness and alertness (Kennedy et al. 2003)¶",
    study: "Kennedy et al. 2003",
    pmid: "PMID: 12888775",
  },
  {
    id: "sleep",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Sleep Quality",
    subtitle: "Wake up ready for the day",
    ingredient: "KSM-66® Ashwagandha · 600mg",
    studyObservation: "In one study, participants taking KSM-66 Ashwagandha reported improvements in sleep quality (Salve et al. 2019)¶",
    study: "Salve et al. 2019",
    pmid: "PMID: 32021735",
  },
  {
    id: "stress",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Stress Resilience",
    subtitle: "Pressure doesn't rattle you",
    ingredient: "KSM-66® Ashwagandha · 600mg",
    studyObservation: "In one study, participants taking KSM-66 Ashwagandha showed a reduction in perceived stress (Chandrasekhar et al. 2012)¶",
    study: "Chandrasekhar et al. 2012",
    pmid: "PMID: 23439798",
  },
  {
    id: "brain-fog",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Clearer Thinking",
    subtitle: "Better decision making, all day",
    ingredient: "Reduced Glutathione · 250mg",
    studyObservation: "Vitamin C contributes to normal psychological function†† - CONKA Clear provides Vitamin C alongside Glutathione (Sinha et al. 2018)¶",
    study: "Sinha et al. 2018",
    pmid: "PMID: 29559699",
  },
];

const TRUST_BADGES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-3" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Free UK Shipping",
    subtitle: "On subscriptions",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Informed Sport",
    subtitle: "Certified",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Every Batch Tested",
    subtitle: "UK lab verified",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    title: "Cancel Anytime",
    subtitle: GUARANTEE_LABEL,
  },
];

export default function LandingBenefits() {
  const [tappedId, setTappedId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h2
          className="premium-section-heading text-white"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          What it feels like to stay sharp.
        </h2>
        <p className="text-sm text-white opacity-70 mt-2">
          Tap a benefit to see the research.
        </p>
      </div>

      {/* 2x2 Benefit Grid — tappable */}
      <div className="grid grid-cols-2 gap-3 lg:gap-5">
        {BENEFITS.map((benefit) => {
          const isOpen = tappedId === benefit.id;

          return (
            <button
              key={benefit.id}
              type="button"
              onClick={() => setTappedId(isOpen ? null : benefit.id)}
              className="flex flex-col items-center text-center p-4 lg:p-8 rounded-2xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "white",
                border: isOpen
                  ? "2px solid var(--color-ink)"
                  : "1px solid var(--color-premium-stroke)",
              }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-3"
                style={{
                  backgroundColor: "var(--color-neuro-blue-light)",
                  color: "var(--color-ink)",
                }}
              >
                {benefit.icon}
              </div>

              <h3
                className="text-sm lg:text-base font-semibold mt-1.5"
                style={{ color: "var(--color-ink)" }}
              >
                {benefit.title}
              </h3>

              <p
                className="text-xs lg:text-sm mt-1 leading-snug"
                style={{ color: "var(--color-ink)", opacity: 0.5 }}
              >
                {benefit.subtitle}
              </p>

              {/* Science detail — shown on tap */}
              {isOpen && (
                <div
                  className="w-full mt-3 pt-3 text-left"
                  style={{ borderTop: "1px solid var(--color-premium-stroke)" }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-ink)", opacity: 0.6 }}
                  >
                    {benefit.studyObservation}
                  </p>
                  <p
                    className="text-xs font-semibold mt-2"
                    style={{ color: "var(--color-ink)", opacity: 0.7 }}
                  >
                    {benefit.ingredient}
                  </p>
                  <p
                    className="text-xs font-mono mt-1"
                    style={{ color: "var(--color-ink)", opacity: 0.3 }}
                  >
                    {benefit.pmid}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 lg:max-w-3xl lg:mx-auto">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2.5 px-3 py-3 lg:flex-col lg:text-center lg:gap-1.5"
          >
            <span className="text-white opacity-50">
              {badge.icon}
            </span>
            <div>
              <p className="text-xs font-semibold leading-tight text-white">
                {badge.title}
              </p>
              <p className="text-xs leading-tight text-white opacity-50">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <a
          href={FUNNEL_URL}
          className="block w-full lg:w-auto text-center py-4 px-14 rounded-[var(--premium-radius-interactive)] font-semibold text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: "white", color: "var(--color-ink)" }}
        >
          See Your Options →
        </a>
      </div>
    </div>
  );
}
