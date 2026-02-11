"use client";

import { type ProtocolId } from "@/app/lib/productData";
import ProtocolProblemCycle from "./ProtocolProblemCycle";

interface ProtocolProblemSectionProps {
  protocolId?: ProtocolId;
}

/**
 * Self-contained "problem" strip: full-width black section with the
 * interactive cycle. No parent container styling; owns its own layout.
 */
export default function ProtocolProblemSection({
  protocolId,
}: ProtocolProblemSectionProps = {}) {
  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen text-white pt-16 md:pt-20 pb-24 md:pb-32 overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 50%), #000",
      }}
      aria-label="The problem cycle"
    >
      <div className="w-[80%] mx-auto px-6 md:px-16">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-white text-center">
          The problem
        </h2>
        <div className="mt-20 md:mt-24 w-full" aria-hidden>
          <ProtocolProblemCycle protocolId={protocolId} />
        </div>
      </div>
    </section>
  );
}
