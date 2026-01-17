"use client";

import Link from "next/link";
import { protocolsArray } from "./protocolSelectorData";
import ProtocolCard from "./ProtocolCard";

export default function ProtocolsGridDesktop() {
  return (
    <section className="px-16 pt-6 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Quiz CTA */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              Choose Your Protocol
            </h2>
            <p className="font-clinical text-sm md:text-base opacity-70">
              Optimised CONKA Flow + CONKA Clear combinations for specific
              mental goals
            </p>
          </div>
          <Link
            href="/quiz"
            className="neo-button-outline px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Not sure? Take the quiz
          </Link>
        </div>

        {/* 2x2 Protocol Grid */}
        <div className="grid grid-cols-2 gap-4">
          {protocolsArray.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-6 text-center">
          <p className="font-commentary text-lg opacity-70">
            All protocols can be combined for full cognitive coverage
          </p>
        </div>
      </div>
    </section>
  );
}
