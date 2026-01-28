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

  // Bulk/Team icon
  const bulkIcon = (
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
          {/* Individual Mode Card */}
          <ModeSelectionCard
            mode="individual"
            heading="Purchase for an Individual"
            description="For practitioners working directly with athletes or clients"
            ctaText="Shop for an Individual"
            href="/professionals/individual"
            icon={individualIcon}
          />

          {/* Bulk Mode Card */}
          <ModeSelectionCard
            mode="bulk"
            heading="Bulk / Team Orders"
            description="For teams, clubs, and organisations purchasing in volume"
            ctaText="Shop for Teams"
            href="/professionals/bulk"
            icon={bulkIcon}
          />
        </div>
      </div>
    </section>
  );
}
