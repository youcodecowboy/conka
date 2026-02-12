"use client";

import {
  sectionHeadings,
  beforeAfterStates,
  transformationMicrocopy,
} from "@/app/lib/protocolWhyCopy";
import { getProtocolAccent } from "@/app/lib/productData";
import type { ProtocolId } from "@/app/lib/productData";

const DEFAULT_ACCENT = "#14b8a6";

interface CycleTransformationProps {
  protocolId?: ProtocolId;
}

export default function CycleTransformation({
  protocolId,
}: CycleTransformationProps = {}) {
  const accentHex = protocolId ? getProtocolAccent(protocolId) : DEFAULT_ACCENT;

  return (
    <section
      className="bg-black text-white pt-0 pb-8 md:pb-10 px-6 md:px-12 lg:px-20"
      aria-label="The outcome"
    >
      <div className="w-full max-w-full mx-auto">
        <h2 className="premium-section-heading text-xl md:text-2xl font-bold text-center text-white mb-4">
          {sectionHeadings.transformation}
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10">
                <th className="premium-body text-sm font-semibold px-4 py-2.5 text-black/60">
                  Before Protocol
                </th>
                <th className="premium-body text-sm font-semibold px-4 py-2.5 text-white" style={{ backgroundColor: accentHex }}>
                  After Protocol
                </th>
              </tr>
            </thead>
            <tbody>
              {beforeAfterStates.map((pair, i) => (
                <tr
                  key={i}
                  className="border-b border-black/10 last:border-0"
                >
                  <td className="premium-body text-sm px-4 py-2.5 text-black/60">
                    {pair.before}
                  </td>
                  <td className="premium-body text-sm font-medium px-4 py-2.5 text-white" style={{ backgroundColor: accentHex }}>
                    {pair.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="premium-data text-xs text-center text-white/50 mt-4">
          {transformationMicrocopy}
        </p>
      </div>
    </section>
  );
}
