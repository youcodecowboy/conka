"use client";

import ProtocolProblemCycle from "./ProtocolProblemCycle";

/**
 * Self-contained "problem" strip: full-width black section with the
 * interactive cycle. No parent container styling; owns its own layout.
 */
export default function ProtocolProblemSection() {
  return (
    <section
      className="relative left-1/2 -translate-x-1/2 w-screen bg-black text-white py-16 md:py-20 overflow-x-hidden"
      aria-label="The problem cycle"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-white text-center mb-10">
          The problem
        </h2>
        <ProtocolProblemCycle />
      </div>
    </section>
  );
}
