"use client";

import {
  ProtocolId,
  protocolContent,
  formulaContent,
  FORMULA_COLORS,
} from "@/app/lib/productData";

interface ProtocolBenefitsProps {
  protocolId: ProtocolId;
}

export default function ProtocolBenefits({ protocolId }: ProtocolBenefitsProps) {
  const protocol = protocolContent[protocolId];
  const formula01 = formulaContent["01"];
  const formula02 = formulaContent["02"];

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Why This Protocol Works
          </h2>
          <p className="font-commentary text-xl">the science of synergy</p>
        </div>

        {/* Protocol Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {protocol.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="neo-box p-6 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all"
            >
              <div className="flex items-start gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500 flex-shrink-0 mt-1"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="font-medium">{benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Combined Formula Benefits */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Conka Flow Benefits */}
          <div className="neo-box overflow-hidden">
            <div className={`${FORMULA_COLORS["01"].bg} p-4 text-white`}>
              <h3 className="text-xl font-bold">Conka Flow Benefits</h3>
              <p className="font-clinical text-sm opacity-80">Energy & Resilience</p>
            </div>
            <div className="p-6 space-y-4">
              {formula01.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className={`text-2xl font-bold font-clinical ${FORMULA_COLORS["01"].text}`}>
                    {benefit.stat}
                  </span>
                  <div>
                    <p className="font-bold">{benefit.title}</p>
                    <p className="font-clinical text-xs opacity-70">
                      {benefit.annotation}
                    </p>
                  </div>
                </div>
              ))}
              <a
                href="/conka-flow"
                className="inline-flex items-center gap-2 font-clinical text-sm hover:opacity-70 transition-all mt-4"
              >
                Learn more about Conka Flow
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Conka Clarity Benefits */}
          <div className="neo-box overflow-hidden">
            <div className={`${FORMULA_COLORS["02"].bg} p-4 text-white`}>
              <h3 className="text-xl font-bold">Conka Clarity Benefits</h3>
              <p className="font-clinical text-sm opacity-80">Clarity & Performance</p>
            </div>
            <div className="p-6 space-y-4">
              {formula02.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className={`text-2xl font-bold font-clinical ${FORMULA_COLORS["02"].text}`}>
                    {benefit.stat}
                  </span>
                  <div>
                    <p className="font-bold">{benefit.title}</p>
                    <p className="font-clinical text-xs opacity-70">
                      {benefit.annotation}
                    </p>
                  </div>
                </div>
              ))}
              <a
                href="/conka-clarity"
                className="inline-flex items-center gap-2 font-clinical text-sm hover:opacity-70 transition-all mt-4"
              >
                Learn more about Conka Clarity
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Synergy Explanation */}
        <div className="mt-16 neo-box p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">The Power of Combination</h3>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            When taken as part of a protocol, Conka Flow and Conka Clarity work
            together synergistically. Conka Flow&apos;s adaptogens build your daily
            foundation while Conka Clarity&apos;s nootropics enhance peak performance
            when you need it most.
          </p>
        </div>
      </div>
    </section>
  );
}

