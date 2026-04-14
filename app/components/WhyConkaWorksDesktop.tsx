"use client";

import Link from "next/link";
import Image from "next/image";

const CheckIcon = () => (
  <svg
    className="w-3 h-3 text-emerald-600 flex-shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WhyConkaWorksDesktop() {
  return (
    <>
      <div className="mb-10">
        <h2 className="brand-h2 mb-0 text-black">
          Certified for Performance.
        </h2>
        <p className="brand-body mt-2 text-black/60">
          Every formula is third-party tested, university-trialled, and
          manufactured to the highest standards.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 md:mb-12 p-6 rounded-2xl bg-white border border-[rgba(0,0,0,0.06)]">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold font-clinical text-black">
            280+
          </p>
          <p className="brand-caption text-black/60 mt-1">
            Substances Tested
          </p>
        </div>
        <div className="text-center border-l border-r border-[rgba(0,0,0,0.06)]">
          <p className="text-3xl md:text-4xl font-bold font-clinical text-black">
            2
          </p>
          <p className="brand-caption text-black/60 mt-1">
            University Partners
          </p>
        </div>
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold font-clinical text-black">
            100%
          </p>
          <p className="brand-caption text-black/60 mt-1">
            Batch Verified
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Pillar 1 */}
        <div className="brand-card border-t-4 border-t-[#3a9f7e] p-6 md:p-8 flex flex-col md:min-h-[400px]">
          <div className="mb-6 h-24 md:h-32 flex items-center justify-center rounded-2xl bg-[var(--brand-tint)] p-8">
            <Image
              src="/logos/InformedSportLogo.png"
              alt="Informed Sport certified"
              width={128}
              height={128}
              loading="lazy"
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>
          <h3
            className="brand-h3 text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "-0.01em" }}
          >
            Certified Safe for Elite Sport
          </h3>
          <p className="brand-caption text-black/60 leading-relaxed mb-6">
            Every batch of CONKA Flow and CONKA Clear is tested by Informed
            Sport for over 280 banned substances. Trusted by WADA, Olympic
            committees, and professional sports leagues worldwide. Safe for
            athletes at every level.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Banned substance tested
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Heavy metal tested
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Batch verified
            </span>
          </div>
          <Link
            href="https://sport.wetestyoutrust.com/supplement-search/brand/conka"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-caption text-black font-medium hover:underline mt-auto pt-4"
          >
            View Certificate →
          </Link>
        </div>

        {/* Pillar 2 */}
        <div className="brand-card p-6 md:p-8 flex flex-col md:min-h-[400px]">
          <div className="mb-6 flex flex-col items-center justify-center gap-3 rounded-2xl bg-[var(--brand-tint)] p-6">
            <div className="h-12 w-36 overflow-hidden flex items-center justify-center rounded-lg [&>img]:object-cover [&>img]:object-center">
              <Image
                src="/logos/UniversityOfDurham.png"
                alt="Durham University"
                width={144}
                height={48}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="h-12 w-36 overflow-hidden flex items-center justify-center rounded-lg [&>img]:object-cover [&>img]:object-center">
              <Image
                src="/logos/UniversityOfExeter.png"
                alt="University of Exeter"
                width={144}
                height={48}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <h3
            className="brand-h3 text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "-0.01em" }}
          >
            University-Tested, Clinically Dosed
          </h3>
          <p className="brand-caption text-black/60 leading-relaxed mb-6">
            Formulated in partnership with Durham and Exeter universities. Every
            ingredient is dosed at clinically effective levels based on
            peer-reviewed research. Not pixie-dusted—real science, real results.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Clinical dosing
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Peer-reviewed
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> University-backed
            </span>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="brand-card p-6 md:p-8 flex flex-col md:min-h-[400px]">
          <div className="mb-6 h-24 md:h-32 flex items-center justify-center rounded-2xl bg-[var(--brand-tint)] p-8">
            <Image
              src="/logos/MadeInBritain.png"
              alt="Made in Britain"
              width={128}
              height={64}
              loading="lazy"
              className="h-24 md:h-32 w-auto object-contain"
            />
          </div>
          <h3
            className="brand-h3 text-xl md:text-2xl font-bold mb-4"
            style={{ letterSpacing: "-0.01em" }}
          >
            UK Manufactured to GMP Standards
          </h3>
          <p className="brand-caption text-black/60 leading-relaxed mb-6">
            Made in England to Good Manufacturing Practice (GMP) standards.
            Every batch is tested for purity, potency, and consistency. No
            cutting corners, no outsourcing—just rigorous British quality
            control.
          </p>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> GMP certified
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Batch tested
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(0,0,0,0.06)] bg-white text-black flex items-center gap-1.5">
              <CheckIcon /> Made in England
            </span>
          </div>
          <div className="mt-auto pt-4" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
