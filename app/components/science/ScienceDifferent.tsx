"use client";

import Image from "next/image";

interface ScienceDifferentProps {
  isMobile?: boolean;
}

const CARDS = [
  {
    title: "Clinical Dosing",
    description:
      'We use the same doses proven effective in clinical trials, not underdosed "proprietary blends" that hide inadequate amounts.',
    descriptionMobile:
      "Same doses proven effective in clinical trials, not underdosed blends.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Bioavailability First",
    description:
      "Black pepper increases curcumin absorption by 2000%. We include synergistic compounds that ensure maximum nutrient delivery.",
    descriptionMobile:
      "Black pepper increases curcumin absorption by 2000%.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Full Transparency",
    description:
      "Every statistic links to its PubMed source. No exaggerated claims, just real science you can verify yourself.",
    descriptionMobile:
      "Every stat links to its PubMed source. Real science you can verify.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ScienceDifferent({
  isMobile = false,
}: ScienceDifferentProps) {
  return (
    <div>
      <div className="mb-8 lg:mb-10">
        <p className="brand-caption uppercase tracking-widest text-black/40 mb-3">
          Our Approach
        </p>
        <h2 className="brand-h2 mb-0 tracking-tight">
          What Makes CONKA Different
        </h2>
      </div>

      {/* Desktop: cards left, lifestyle image right (sticky). Mobile: cards stacked */}
      <div className="lg:flex lg:gap-10 lg:items-start">
        {/* Cards */}
        <div className="flex flex-col gap-4 lg:gap-5 lg:flex-1">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-[var(--brand-radius-card)] bg-white border border-black/6 shadow-sm p-5 lg:p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg text-white flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--brand-accent)" }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm lg:text-base text-black/60 leading-relaxed">
                    {isMobile ? card.descriptionMobile : card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lifestyle image — below cards on mobile, sticky sidebar on desktop */}
        <div className="mt-6 lg:mt-0 lg:w-[400px] lg:flex-shrink-0 lg:sticky lg:top-24">
          <div
            className="relative aspect-square overflow-hidden"
            style={{ borderRadius: "var(--brand-radius-card)" }}
          >
            <Image
              src="/lifestyle/FlowConkaRing.jpg"
              alt="CONKA bottle with cognitive testing app showing a score of 92, alongside headphones and water bottle"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
