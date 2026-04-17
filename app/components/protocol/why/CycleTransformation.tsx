// TODO: Delete this file when protocol pages are fully removed. No longer imported.
"use client";

import { sectionHeadings, beforeAfterStates } from "@/app/lib/protocolWhyCopy";
import { getProtocolGradient, getGradientTextColor } from "@/app/lib/productData";
import type { ProtocolId } from "@/app/lib/productData";

const DEFAULT_GRADIENT = { start: "#0d9488", end: "#14b8a6" };

interface CycleTransformationProps {
  protocolId?: ProtocolId;
}

export default function CycleTransformation({
  protocolId,
}: CycleTransformationProps = {}) {
  const gradient = protocolId
    ? getProtocolGradient(protocolId)
    : DEFAULT_GRADIENT;
  const gradientTextColor = protocolId
    ? getGradientTextColor(protocolId)
    : "white";
  const rightColStyle = {
    background: `linear-gradient(to right, ${gradient.start}, ${gradient.end})`,
  };
  const textClass = gradientTextColor === "white" ? "text-white" : "text-black";

  return (
    <div className="pt-6 md:pt-8">
      <h2
        className="brand-h2 text-xl md:text-2xl font-bold text-center mb-4 text-black"
        style={{ letterSpacing: "-0.02em" }}
      >
        {sectionHeadings.transformation}
      </h2>

      <div
        className="max-w-2xl mx-auto mt-6 bg-white overflow-hidden text-black"
        style={{ borderRadius: "var(--brand-radius-card)" }}
      >
        <table className="w-full text-center">
            <thead>
              <tr className="border-b border-black/10">
                <th className="brand-body text-sm font-semibold px-4 py-2.5 text-black/60">
                  Before Protocol
                </th>
                <th
                  className={`brand-body text-sm font-semibold px-4 py-2.5 ${textClass}`}
                  style={rightColStyle}
                >
                  After Protocol
                </th>
              </tr>
            </thead>
            <tbody>
              {beforeAfterStates.map((pair, i) => (
                <tr key={i} className="border-b border-black/10 last:border-0">
                  <td className="brand-body text-sm px-4 py-2.5 text-black/60">
                    {pair.before}
                  </td>
                  <td
                    className={`brand-body text-sm font-medium px-4 py-2.5 ${textClass}`}
                    style={rightColStyle}
                  >
                    {pair.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
