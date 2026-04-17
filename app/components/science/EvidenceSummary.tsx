"use client";

import Link from "next/link";
import {
  clinicalEvidenceSummary,
  researchTeam,
  researchPartnerships,
} from "@/app/lib/scienceData";

interface EvidenceSummaryProps {
  isMobile?: boolean;
}

export default function EvidenceSummary({
  isMobile = false,
}: EvidenceSummaryProps) {
  const evidence = clinicalEvidenceSummary;

  return (
    <div>
      {/* Header */}
      <div className="mb-10 lg:mb-12">
        <p className="brand-caption uppercase tracking-widest text-black mb-3">
          The Evidence
        </p>
        <h2 className="brand-h2 mb-0 tracking-tight">
          Research-backed. University-validated. Patented.
        </h2>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-10">
        <div className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6">
          <p className="text-3xl lg:text-4xl font-bold font-clinical">
            {evidence.totalStudies}
          </p>
          <p className="brand-caption mt-1">Peer-reviewed studies</p>
        </div>
        <div className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6">
          <p className="text-3xl lg:text-4xl font-bold font-clinical">
            {evidence.totalParticipants.toLocaleString()}+
          </p>
          <p className="brand-caption mt-1">Research participants</p>
        </div>
        <div className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6">
          <p className="text-3xl lg:text-4xl font-bold font-clinical">
            {evidence.researchInvestment}
          </p>
          <p className="brand-caption mt-1">Research investment</p>
        </div>
        <div className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6">
          <p className="text-lg lg:text-xl font-bold font-clinical">
            {evidence.patentNumber}
          </p>
          <p className="brand-caption mt-1">UK Patent</p>
        </div>
      </div>

      {/* Research partners + team — two columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-8 lg:mb-10">
        {/* University partnerships */}
        {researchPartnerships.map((partnership) => (
          <div
            key={partnership.institution}
            className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6"
          >
            <p className="brand-caption uppercase tracking-widest text-black mb-2">
              University Partner
            </p>
            <p className="font-semibold text-base">
              {partnership.institution}
            </p>
            <p className="brand-caption mt-0.5">{partnership.focus}</p>
          </div>
        ))}

        {/* Research team */}
        {researchTeam.map((researcher) => (
          <div
            key={researcher.name}
            className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 p-5 lg:p-6"
          >
            <p className="brand-caption uppercase tracking-widest text-black mb-2">
              Researcher
            </p>
            <p className="font-semibold text-base">
              {researcher.title} {researcher.name}
            </p>
            <p className="brand-caption mt-0.5">
              {researcher.contribution}
            </p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/ingredients"
          className="px-6 py-3 font-semibold text-sm text-white hover:opacity-90 transition-opacity text-center"
          style={{
            borderRadius: "var(--brand-radius-interactive)",
            backgroundColor: "var(--brand-accent)",
          }}
        >
          Explore All Ingredients
        </Link>
        <Link
          href="/conka-flow"
          className="px-6 py-3 font-semibold text-sm border hover:opacity-80 transition-opacity text-center"
          style={{
            borderRadius: "var(--brand-radius-interactive)",
            color: "var(--brand-accent)",
            borderColor: "rgba(64, 88, 187, 0.3)",
          }}
        >
          Try CONKA
        </Link>
      </div>
    </div>
  );
}
