"use client";

import { type ProtocolId } from "@/app/lib/productData";
import { protocolSynergyCopy } from "@/app/lib/protocolSynergyCopy";
import ProtocolWhySection from "./why/ProtocolWhySection";

interface ProtocolWhyCombinationProps {
  protocolId?: ProtocolId;
}

/**
 * "Why Two Formulas" — headline and Protocol Why v2 flow
 * (recognition → trap → break → transformation).
 */
export default function ProtocolWhyCombination({
  protocolId,
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

      {protocolId ? <ProtocolWhySection protocolId={protocolId} /> : null}
    </>
  );
}
