"use client";

import { FormulaId } from "@/app/lib/productData";

interface ProtocolBenefitsMobileProps {
  formulaId: FormulaId;
}

// Combined benefits data
const combinedBenefits = {
  stats: [
    { label: "Greater Effect", value: "2.3x", description: "when formulas are combined" },
    { label: "Faster Results", value: "47%", description: "quicker onset of benefits" },
    { label: "Sustained Impact", value: "8+ hrs", description: "longer-lasting cognitive support" },
  ],
};

// Protocol summaries
const protocols = [
  {
    id: "1",
    name: "Protocol 1",
    tagline: "Focus First",
    description: "Conka Flow daily, Conka Clarity weekly for sustained clarity",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    id: "2",
    name: "Protocol 2",
    tagline: "Energy First",
    description: "Conka Clarity daily, Conka Flow weekly for peak performance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    id: "3",
    name: "Protocol 3",
    tagline: "Balanced",
    description: "Both formulas in perfect harmony, alternating daily",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
  },
  {
    id: "4",
    name: "Protocol 4",
    tagline: "Ultimate",
    description: "Both formulas daily for maximum cognitive enhancement",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
  },
];

export default function ProtocolBenefitsMobile({ formulaId }: ProtocolBenefitsMobileProps) {
  const otherFormula = formulaId === "01" ? "02" : "01";

  return (
    <section className="py-8">
      {/* Image Carousel - Edge to Edge */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4">
          {/* Placeholder Image 1 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-black/5 to-black/10 border-2 border-black/10 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[PRODUCT LIFESTYLE]</p>
            </div>
          </div>
          {/* Placeholder Image 2 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-[#AAB9BC]/20 to-[#AAB9BC]/30 border-2 border-[#AAB9BC]/30 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[BOTH FORMULAS]</p>
            </div>
          </div>
          {/* Placeholder Image 3 */}
          <div className="flex-shrink-0 w-64 h-40 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/20 border-2 border-amber-500/20 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-30">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p className="font-clinical text-xs opacity-40">[IN ACTION]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-6 px-4">
        <p className="font-clinical text-xs uppercase tracking-wider opacity-60 mb-1">
          Maximize Your Results
        </p>
        <h2 className="text-2xl font-bold mb-2">Double Your Benefits</h2>
        <p className="font-commentary text-base opacity-70">
          Formula {formulaId} works great alone, but combining it with Formula {otherFormula} unlocks even more
        </p>
      </div>

      {/* Standalone vs Combined */}
      <div className="mb-6 px-4">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 p-3 rounded-lg border-2 border-black/10 bg-black/5">
            <p className="font-clinical text-xs uppercase opacity-50 mb-1">Alone</p>
            <p className="font-bold text-lg">Effective</p>
            <p className="font-commentary text-sm opacity-70">targeted support</p>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </div>
          <div className="flex-1 p-3 rounded-lg border-2 border-black bg-black text-white">
            <p className="font-clinical text-xs uppercase opacity-70 mb-1">Combined</p>
            <p className="font-bold text-lg">Powerful</p>
            <p className="font-commentary text-sm opacity-70">synergistic effects</p>
          </div>
        </div>
      </div>

      {/* Combined Results Stats */}
      <div className="mb-6 px-4">
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3 text-center">
          Combined Results
        </p>
        <div className="grid grid-cols-3 gap-2">
          {combinedBenefits.stats.map((stat, idx) => (
            <div key={idx} className="text-center p-3 rounded-lg border border-black/10">
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="font-clinical text-xs opacity-60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Grid */}
      <div className="mb-4 px-4">
        <p className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3 text-center">
          Choose Your Protocol
        </p>
        <div className="grid grid-cols-2 gap-2">
          {protocols.map((protocol) => (
            <a
              key={protocol.id}
              href={`/protocol/${protocol.id}`}
              className="block p-3 rounded-lg border-2 border-black/10 hover:border-black hover:bg-black/5 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="opacity-70">{protocol.icon}</div>
                <div>
                  <p className="font-bold text-sm">{protocol.name}</p>
                  <p className="font-clinical text-xs opacity-60">{protocol.tagline}</p>
                </div>
              </div>
              <p className="font-commentary text-xs opacity-70 line-clamp-2">
                {protocol.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Other Formula Link */}
      <div className="mt-6 px-4">
        <a
          href={`/formula-${otherFormula}`}
          className="flex items-center justify-between w-full p-4 rounded-lg border-2 border-black/10 hover:border-black transition-all"
        >
          <div>
            <p className="font-bold text-sm">Explore Formula {otherFormula}</p>
            <p className="font-commentary text-xs opacity-70">see the other half of the equation</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
            <path d="M5 12h14"/>
            <path d="M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

