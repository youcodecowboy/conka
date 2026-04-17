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
      <div className="mb-8 lg:mb-10">
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-3">
          The Evidence
        </p>
        <h2 className="brand-h2 mb-0 tracking-tight">
          Research-backed. University-validated. Patented.
        </h2>
      </div>

      {/* Narrative paragraph */}
      <p
        className="brand-body text-lg lg:text-xl text-black/80 mb-8 lg:mb-10"
        style={{ maxWidth: "var(--brand-body-max-width)" }}
      >
        {evidence.totalStudies} peer-reviewed clinical studies.{" "}
        {evidence.totalParticipants.toLocaleString()}+ participants. Over{" "}
        {evidence.researchInvestment} invested in research with Durham and
        Cambridge universities. The result: UK Patent {evidence.patentNumber} and
        formulas that actually work.
      </p>

      {/* Research partnerships */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {researchPartnerships.map((partnership) => (
          <div
            key={partnership.institution}
            className="brand-card-bordered p-5 lg:p-6"
          >
            <p className="font-semibold text-base mb-1">
              {partnership.institution}
            </p>
            <p className="brand-caption text-black/60">{partnership.focus}</p>
          </div>
        ))}
      </div>

      {/* Research team */}
      <div className="mb-8 lg:mb-10">
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-4">
          Research Team
        </p>
        <div className="space-y-3">
          {researchTeam.map((researcher) => (
            <div
              key={researcher.name}
              className="flex items-baseline gap-2 lg:gap-3"
            >
              <span className="font-semibold text-sm whitespace-nowrap">
                {researcher.title} {researcher.name}
              </span>
              <span className="brand-caption text-black/40 hidden lg:inline">
                {researcher.affiliation}
              </span>
              <span className="brand-caption text-black/40 hidden lg:inline">
                &bull;
              </span>
              <span className="brand-caption text-black/60">
                {researcher.contribution}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Credential pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        <span className="brand-caption px-3 py-1.5 rounded-full border border-black/10 text-black/60">
          Patent #{evidence.patentNumber}
        </span>
        <span className="brand-caption px-3 py-1.5 rounded-full border border-black/10 text-black/60">
          PubMed Indexed Studies
        </span>
        <span className="brand-caption px-3 py-1.5 rounded-full border border-black/10 text-black/60">
          All citations verifiable
        </span>
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
