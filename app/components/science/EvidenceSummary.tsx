"use client";

import { clinicalEvidenceSummary } from "@/app/lib/scienceData";

interface EvidenceSummaryProps {
  isMobile?: boolean;
}

export default function EvidenceSummary({
  isMobile = false,
}: EvidenceSummaryProps) {
  const evidence = clinicalEvidenceSummary;

  return (
    <section className={`${isMobile ? "px-4 py-8" : "px-16 py-16"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`${isMobile ? "mb-6" : "mb-10"} text-center`}>
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            Clinical Foundation
          </p>
          <h2
            className={`font-bold ${
              isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
            }`}
          >
            Evidence-Based Formulation
          </h2>
          <p
            className={`font-commentary opacity-80 mt-2 max-w-xl mx-auto ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            Every ingredient is validated by peer-reviewed research
          </p>
        </div>

        {/* Evidence Stats */}
        <div className="neo-box-inverted p-6 lg:p-10">
          <div
            className={`grid gap-6 ${
              isMobile ? "grid-cols-2" : "grid-cols-3 lg:grid-cols-6"
            }`}
          >
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold font-clinical">
                {evidence.totalStudies}
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Clinical Studies
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold font-clinical">
                {evidence.totalParticipants.toLocaleString()}+
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Participants
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold font-clinical">
                {evidence.peerReviewed}
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Peer Reviewed
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold font-clinical">16</p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Active Ingredients
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold font-clinical">
                {evidence.researchInvestment}
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Research Investment
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg lg:text-xl font-bold font-clinical">
                {evidence.patentNumber}
              </p>
              <p className="font-clinical text-xs opacity-70 mt-1">
                Patent Number
              </p>
            </div>
          </div>
        </div>

        {/* Research Source Note */}
        <div
          className={`mt-6 ${isMobile ? "px-2" : "max-w-2xl mx-auto"} text-center`}
        >
          <p className="font-clinical text-xs opacity-60 leading-relaxed">
            Research includes CONKA's proprietary studies plus peer-reviewed
            research from leading institutions including Oxford University,
            UCLA, Northumbria University, and others. All citations are PubMed
            indexed with direct links to original publications.
          </p>
        </div>

        {/* PubMed Note */}
        <div
          className={`mt-4 flex ${isMobile ? "flex-col" : "flex-row"} items-center justify-center gap-4 text-center`}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="font-clinical text-sm opacity-70">
              All studies indexed in PubMed
            </span>
          </div>
          <span className="hidden md:inline opacity-30">•</span>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-50"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="font-clinical text-sm opacity-70">
              Full citations available on ingredients page
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/ingredients"
            className="neo-button px-6 py-3 font-bold text-sm"
          >
            Explore All Ingredients
          </a>
          <a
            href="/quiz"
            className="neo-button-outline px-6 py-3 font-bold text-sm"
          >
            Find Your Protocol
          </a>
        </div>
      </div>
    </section>
  );
}
