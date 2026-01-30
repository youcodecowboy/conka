"use client";

import ModeSelectionCard from "./ModeSelectionCard";

export default function ModeSelectionSection() {
  // Individual icon
  const individualIcon = (
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  // Team icon
  const teamIcon = (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  return (
    <section className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Individual: prescribed protocols (Resilience, Precision, etc.) */}
          <ModeSelectionCard
            mode="individual"
            heading="Purchase by protocol"
            description="Choose a prescribed protocol (Resilience, Precision, and more) and get the right mix of CONKA Flow and CONKA Clear for your athletes."
            ctaText="Shop by protocol"
            href="/professionals/individual"
            icon={individualIcon}
            image={{
              src: "/JoshStanton.jpg",
              alt: "Professional practitioner working with athlete",
            }}
          />

          {/* Team: formula quantities, volume pricing */}
          <ModeSelectionCard
            mode="team"
            heading="Team orders"
            description="Order CONKA Flow and CONKA Clear in the quantities you need—volume pricing for teams, clubs, and organisations."
            ctaText="Shop for teams"
            href="/professionals/team"
            icon={teamIcon}
            image={{
              src: "/professionals/Team.webp",
              alt: "Team and club purchasing",
            }}
          />
        </div>
      </div>
    </section>
  );
}
