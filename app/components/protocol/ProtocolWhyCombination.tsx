"use client";

import { useState } from "react";
import Image from "next/image";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import ProtocolProblemCycle from "./ProtocolProblemCycle";

interface ProtocolWhyCombinationProps {
  protocolId?: string; // Optional for future protocol-specific variations
}

export default function ProtocolWhyCombination({
  protocolId: _protocolId,
}: ProtocolWhyCombinationProps) {
  const [referencesExpanded, setReferencesExpanded] = useState(false);
  const [diagramError, setDiagramError] = useState(false);
  const copy = protocolSynergyCopy;

  return (
    <section
      className="premium-section"
      aria-labelledby="why-two-formulas-heading"
    >
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 py-24">
        {/* Headline */}
        <div className="text-center mb-10">
          <h2
            id="why-two-formulas-heading"
            className="premium-section-heading text-3xl md:text-4xl font-bold mb-3"
          >
            {copy.framing.headline}
          </h2>
          <p className="premium-annotation text-xl md:text-2xl opacity-80">
            {copy.framing.subheadline}
          </p>
        </div>

        {/* Problem cycle — black strip: circle left, expanded detail right */}
        <section
          className="w-full bg-black text-white py-16 md:py-20 -mx-6 md:-mx-16 px-6 md:px-16 mb-16"
          aria-label="The problem cycle"
        >
          <div className="max-w-6xl mx-auto">
            <p className="premium-annotation text-lg text-white/80 text-center mb-10">
              The problem
            </p>
            <ProtocolProblemCycle />
          </div>
        </section>

        {/* Protocol solution — custom diagram */}
        <p className="premium-annotation text-lg opacity-70 text-center mb-8">
          The protocol solution
        </p>
        {/* Custom diagram */}
        <div className="relative w-full max-w-4xl mx-auto mb-12 aspect-[2/1] md:aspect-[3/1] min-h-[200px] md:min-h-[280px]">
          {copy.diagramImagePath && !diagramError ? (
            <Image
              src={copy.diagramImagePath}
              alt="Flow reduces pressure, Clear strengthens repair—together they create a system"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority={false}
              onError={() => setDiagramError(true)}
            />
          ) : (
            <div
              className="w-full h-full rounded-xl bg-[var(--color-surface)] flex items-center justify-center"
              aria-hidden
            >
              <p className="premium-data text-sm opacity-50 text-center px-4">
                Add FlowClearSynergyDiagram.png to public/protocols/
              </p>
            </div>
          )}
        </div>

        {/* Short paragraph */}
        <p className="premium-body text-lg max-w-2xl mx-auto text-center opacity-80 leading-relaxed mb-12">
          {copy.framing.introParagraph}
        </p>

        {/* Outcome bullets (3–4 only) */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mb-16 max-w-2xl mx-auto">
          {copy.outcomeTranslation.map((outcome, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 justify-center sm:justify-start"
            >
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
                className="flex-shrink-0 text-current opacity-60"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="premium-body text-sm font-medium">{outcome}</span>
            </div>
          ))}
        </div>

        {/* References accordion */}
        <div className="premium-box overflow-hidden max-w-xl mx-auto">
          <button
            onClick={() => setReferencesExpanded(!referencesExpanded)}
            className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-current/5 transition-colors"
            aria-expanded={referencesExpanded}
            aria-controls="scientific-references-list"
          >
            <span className="premium-section-heading text-lg font-bold">
              View Scientific References
            </span>
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
              className={`flex-shrink-0 transition-transform ${
                referencesExpanded ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {referencesExpanded && (
            <div
              id="scientific-references-list"
              className="px-6 pb-6 space-y-3"
            >
              {copy.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="premium-data text-sm opacity-80 border-b border-current/10 pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-semibold">{ref.author}</span> ({ref.year}
                  ). <span className="italic">{ref.journal}</span>.
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
