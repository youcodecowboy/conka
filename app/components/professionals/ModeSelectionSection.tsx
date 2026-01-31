"use client";

import ModeSelectionCard from "./ModeSelectionCard";

export default function ModeSelectionSection() {
  // Protocols icon (clipboard / plan)
  const protocolsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-80 md:w-8 md:h-8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );

  // Individual formulas icon (bottle / single product)
  const formulasIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-80 md:w-8 md:h-8"
    >
      <path d="M8 2h8v4l4 2v12H4V8l4-2V2z" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="16" y2="14" />
    </svg>
  );

  return (
    <section className="px-6 md:px-16 py-6 md:py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Protocols: prescribed plans (Resilience, Precision, etc.) */}
          <ModeSelectionCard
            mode="protocol"
            heading="Shop protocols"
            description="Choose a prescribed protocol (Resilience, Precision, and more) and get the right mix of CONKA Flow and CONKA Clear for your athletes."
            ctaText="Shop protocols"
            href="/professionals/protocol"
            icon={protocolsIcon}
            image={{
              src: "/JoshStanton.jpg",
              alt: "Professional practitioner working with athlete",
            }}
          />

          {/* Individual formulas: Flow and Clear by quantity */}
          <ModeSelectionCard
            mode="formulas"
            heading="Shop individual formulas"
            description="Order CONKA Flow and CONKA Clear in the quantities you need for teams, clubs, and organisations."
            ctaText="Shop individual formulas"
            href="/professionals/formulas"
            icon={formulasIcon}
            image={{
              src: "/professionals/Team.webp",
              alt: "Individual formulas – Flow and Clear",
            }}
          />
        </div>
      </div>
    </section>
  );
}
