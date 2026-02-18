"use client";

import Link from "next/link";
import Image from "next/image";

// Graduation cap icon (university / academic)
function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

// Factory / manufacturing icon
function FactoryIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  );
}

export default function WhyConkaWorks() {
  return (
    <>
      {/* Section Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="premium-section-heading">
          Built for Athletes. Verified for Performance.
        </h2>
        <p className="premium-section-subtitle text-[var(--text-on-light-muted)]">
          Every formula is third-party tested, university-trialled, and
          manufactured to the highest standards.
        </p>
      </div>

      {/* Three-Pillar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Pillar 1: Informed Sport Certified */}
        <div className="premium-card-soft premium-card-soft-stroke p-6 md:p-8 flex flex-col items-center text-center min-h-0 md:min-h-[400px]">
          <div className="mb-6 h-24 md:h-32 flex items-center justify-center">
            <Image
              src="/logos/InformedSportLogo.png"
              alt="Informed Sport certified"
              width={128}
              height={128}
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>
          <h3
            className="premium-heading text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Certified Safe for Elite Sport
          </h3>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mb-6">
            Every batch of CONKA Flow and CONKA Clear is tested by Informed
            Sport for over 280 banned substances. Trusted by WADA, Olympic
            committees, and professional sports leagues worldwide. Safe for
            athletes at every level.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Banned substance tested
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Heavy metal tested
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Batch verified
            </span>
          </div>
          <Link
            href="https://sport.wetestyoutrust.com/supplement-search/brand/conka"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-body-sm text-[var(--color-ink)] font-medium hover:underline mt-auto pt-4"
          >
            View Certificate →
          </Link>
        </div>

        {/* Pillar 2: University-Tested Formulation */}
        <div className="premium-card-soft premium-card-soft-stroke p-6 md:p-8 flex flex-col items-center text-center min-h-0 md:min-h-[400px]">
          <div className="mb-6 h-24 md:h-32 flex items-center justify-center rounded-full bg-[var(--color-premium-bg-soft)] p-6 text-[var(--color-ink)]">
            <GraduationCapIcon />
          </div>
          <h3
            className="premium-heading text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            University-Tested, Clinically Dosed
          </h3>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mb-6">
            Formulated in partnership with Durham and Exeter universities. Every
            ingredient is dosed at clinically effective levels based on
            peer-reviewed research. Not pixie-dusted—real science, real results.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Clinical dosing
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Peer-reviewed
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              University-backed
            </span>
          </div>
          <Link
            href="/research"
            className="premium-body-sm text-[var(--color-ink)] font-medium hover:underline mt-auto pt-4"
          >
            View Research →
          </Link>
        </div>

        {/* Pillar 3: Made in UK to GMP Standards */}
        <div className="premium-card-soft premium-card-soft-stroke p-6 md:p-8 flex flex-col items-center text-center min-h-0 md:min-h-[400px]">
          <div className="mb-6 h-24 md:h-32 flex items-center justify-center">
            <Image
              src="/logos/MadeInBritain.png"
              alt="Made in Britain"
              width={128}
              height={64}
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>
          <h3
            className="premium-heading text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            UK Manufactured to GMP Standards
          </h3>
          <p className="premium-body-sm text-[var(--text-on-light-muted)] leading-relaxed mb-6">
            Made in England to Good Manufacturing Practice (GMP) standards.
            Every batch is tested for purity, potency, and consistency. No
            cutting corners, no outsourcing—just rigorous British quality
            control.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              GMP certified
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Batch tested
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] text-[var(--text-on-light)]">
              Made in England
            </span>
          </div>
          <div className="mt-auto pt-4" aria-hidden="true" />
        </div>
      </div>

      {/* Main CTA */}
      <div className="flex justify-center mt-8 md:mt-12">
        <Link
          href="/testing-documentation"
          className="px-8 py-3 rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] text-white font-semibold hover:opacity-90 transition-all"
        >
          View Full Testing Documentation →
        </Link>
      </div>
    </>
  );
}
