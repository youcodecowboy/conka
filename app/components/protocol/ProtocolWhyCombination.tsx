"use client";

import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import ProtocolProblemSection from "./ProtocolProblemSection";
import ProtocolSolutionSection from "./ProtocolSolutionSection";

interface ProtocolWhyCombinationProps {
  protocolId?: string;
}

/**
 * "Why Two Formulas" — headline and two explicit sections.
 * No stacked layout: problem and solution are separate components.
 */
export default function ProtocolWhyCombination({
  protocolId: _protocolId,
}: ProtocolWhyCombinationProps) {
  const copy = protocolSynergyCopy;

  return (
    <>
      <section
        className="premium-section"
        aria-labelledby="why-two-formulas-heading"
      >
        <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-10">
          <div className="text-center">
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
        </div>
      </section>

      <ProtocolProblemSection />

      <ProtocolSolutionSection />
    </>
  );
}
