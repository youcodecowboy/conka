"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import {
  sectionHeadings,
  beforeAfterStates,
  transformationMicrocopy,
} from "@/app/lib/protocolWhyCopy";

export default function CycleTransformation() {
  const isMobile = useIsMobile(1024);

  return (
    <section
      className="premium-section"
      aria-label="The outcome"
    >
      <div className="premium-container max-w-6xl mx-auto px-6 md:px-16 pb-24">
        <h2 className="premium-section-heading text-2xl md:text-3xl font-bold text-center mb-8">
          {sectionHeadings.transformation}
        </h2>

        {isMobile ? (
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {beforeAfterStates.map((pair, i) => (
              <div
                key={i}
                className="premium-box p-5 flex flex-col items-center gap-2 text-center"
              >
                <span className="premium-body text-sm opacity-80">
                  {pair.before}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-60"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="premium-body text-sm font-semibold">
                  {pair.after}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-current/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-current/10">
                  <th className="premium-body text-sm font-semibold p-4 opacity-80">
                    Before Protocol
                  </th>
                  <th className="premium-body text-sm font-semibold p-4 opacity-80">
                    After Protocol
                  </th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterStates.map((pair, i) => (
                  <tr
                    key={i}
                    className="border-b border-current/10 last:border-0"
                  >
                    <td className="premium-body text-sm p-4 opacity-90">
                      {pair.before}
                    </td>
                    <td className="premium-body text-sm font-medium p-4">
                      {pair.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="premium-data text-xs text-center opacity-60 mt-6">
          {transformationMicrocopy}
        </p>
      </div>
    </section>
  );
}
