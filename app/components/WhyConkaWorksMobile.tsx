"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const CheckIcon = () => (
  <svg className="w-3 h-3 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PillRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row flex-wrap justify-center gap-1.5" aria-hidden="true">
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-1 rounded-full text-[10px] font-medium border border-[var(--color-premium-stroke)] bg-white text-[var(--text-on-light)] inline-flex items-center gap-1 flex-shrink-0">
    <CheckIcon />
    {children}
  </span>
);

export default function WhyConkaWorksMobile() {
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="premium-section-heading text-[var(--color-bone)] text-2xl">
          Built for Athletes. Verified for Performance.
        </h2>
        <p className="premium-section-subtitle text-[var(--color-bone)] opacity-90 text-sm mt-2">
          Every formula is third-party tested, university-trialled, and manufactured to the highest standards.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 p-4 rounded-2xl bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]">
        <div className="text-center">
          <p className="text-2xl font-bold font-clinical text-[var(--color-ink)]">280+</p>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5 text-[10px]">Substances Tested</p>
        </div>
        <div className="text-center border-l border-r border-[var(--color-premium-stroke)]">
          <p className="text-2xl font-bold font-clinical text-[var(--color-ink)]">2</p>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5 text-[10px]">University Partners</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-clinical text-[var(--color-ink)]">100%</p>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5 text-[10px]">Batch Verified</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Pillar 1 */}
        <div className="premium-card-soft-mobile premium-card-soft-stroke border-t-4 border-t-[#3a9f7e] flex flex-col items-center text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center rounded-xl bg-[var(--color-premium-bg-soft)] flex-shrink-0">
            <Image src="/logos/InformedSportLogo.png" alt="Informed Sport certified" width={80} height={80} className="h-20 w-auto object-contain" />
          </div>
          <h3 className="premium-heading text-lg font-bold mb-2" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>
            Certified Safe for Elite Sport
          </h3>
          <PillRow>
            <Pill>Banned substance tested</Pill>
            <Pill>Heavy metal tested</Pill>
            <Pill>Batch verified</Pill>
          </PillRow>
          <div
            className={`overflow-hidden transition-all duration-300 ${expandedPillar === 0 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            id="pillar-1-content"
          >
            <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mt-3 mb-3 text-left">
              Every batch of CONKA Flow and CONKA Clear is tested by Informed Sport for over 280 banned substances. Trusted by WADA, Olympic committees, and professional sports leagues worldwide. Safe for athletes at every level.
            </p>
            <Link href="https://sport.wetestyoutrust.com/supplement-search/brand/conka" target="_blank" rel="noopener noreferrer" className="premium-body-sm text-[var(--color-ink)] font-medium hover:underline">
              View Certificate →
            </Link>
          </div>
          <button
            onClick={() => setExpandedPillar(expandedPillar === 0 ? null : 0)}
            className="mt-2 premium-body-sm font-medium text-[var(--color-ink)] hover:underline flex items-center gap-1"
            aria-expanded={expandedPillar === 0}
            aria-controls="pillar-1-content"
          >
            {expandedPillar === 0 ? "Show less" : "Learn more"}
            <svg className={`w-4 h-4 transition-transform ${expandedPillar === 0 ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Pillar 2 */}
        <div className="premium-card-soft-mobile premium-card-soft-stroke flex flex-col items-center text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center rounded-xl bg-[var(--color-premium-bg-soft)] text-[var(--color-ink)] flex-shrink-0">
            <GraduationCapIcon className="w-16 h-16" />
          </div>
          <h3 className="premium-heading text-lg font-bold mb-2" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>
            University-Tested, Clinically Dosed
          </h3>
          <PillRow>
            <Pill>Clinical dosing</Pill>
            <Pill>Peer-reviewed</Pill>
            <Pill>University-backed</Pill>
          </PillRow>
          <div
            className={`overflow-hidden transition-all duration-300 ${expandedPillar === 1 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            id="pillar-2-content"
          >
            <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mt-3 mb-3 text-left">
              Formulated in partnership with Durham and Exeter universities. Every ingredient is dosed at clinically effective levels based on peer-reviewed research. Not pixie-dusted—real science, real results.
            </p>
            <Link href="/research" className="premium-body-sm text-[var(--color-ink)] font-medium hover:underline">View Research →</Link>
          </div>
          <button
            onClick={() => setExpandedPillar(expandedPillar === 1 ? null : 1)}
            className="mt-2 premium-body-sm font-medium text-[var(--color-ink)] hover:underline flex items-center gap-1"
            aria-expanded={expandedPillar === 1}
            aria-controls="pillar-2-content"
          >
            {expandedPillar === 1 ? "Show less" : "Learn more"}
            <svg className={`w-4 h-4 transition-transform ${expandedPillar === 1 ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {/* Pillar 3 */}
        <div className="premium-card-soft-mobile premium-card-soft-stroke flex flex-col items-center text-center">
          <div className="mb-3 h-20 w-20 flex items-center justify-center rounded-xl bg-[var(--color-premium-bg-soft)] flex-shrink-0">
            <Image src="/logos/MadeInBritain.png" alt="Made in Britain" width={80} height={40} className="h-20 w-auto object-contain" />
          </div>
          <h3 className="premium-heading text-lg font-bold mb-2" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>
            UK Manufactured to GMP Standards
          </h3>
          <PillRow>
            <Pill>GMP certified</Pill>
            <Pill>Batch tested</Pill>
            <Pill>Made in England</Pill>
          </PillRow>
          <div
            className={`overflow-hidden transition-all duration-300 ${expandedPillar === 2 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            id="pillar-3-content"
          >
            <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mt-3 mb-3 text-left">
              Made in England to Good Manufacturing Practice (GMP) standards. Every batch is tested for purity, potency, and consistency. No cutting corners, no outsourcing—just rigorous British quality control.
            </p>
          </div>
          <button
            onClick={() => setExpandedPillar(expandedPillar === 2 ? null : 2)}
            className="mt-2 premium-body-sm font-medium text-[var(--color-ink)] hover:underline flex items-center gap-1"
            aria-expanded={expandedPillar === 2}
            aria-controls="pillar-3-content"
          >
            {expandedPillar === 2 ? "Show less" : "Learn more"}
            <svg className={`w-4 h-4 transition-transform ${expandedPillar === 2 ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
