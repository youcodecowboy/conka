"use client";

import Link from "next/link";
import { protocolsArray } from "./protocolSelectorData";
import ProtocolCardMobile from "./ProtocolCardMobile";

export default function ProtocolsGridMobile() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="px-6 mb-6">
          <div className="text-left mb-4">
            <h2 className="text-2xl font-bold mb-1">Choose Your Protocol</h2>
            <p className="font-clinical text-sm opacity-70">
              Optimised Flow + Clarity combinations for specific mental goals
            </p>
          </div>
          <Link
            href="/quiz"
            className="neo-button-outline px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 w-full hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
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

        {/* Horizontal Scroll Carousel */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Left padding spacer */}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />

          {/* Protocol Cards */}
          {protocolsArray.map((protocol, idx) => (
            <div
              key={protocol.id}
              className="w-[82.5%] flex-shrink-0 snap-center"
            >
              <ProtocolCardMobile protocol={protocol} isFirst={idx === 0} />
            </div>
          ))}

          {/* Right padding spacer */}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>

        {/* Scroll Hint / Indicator Dots */}
        <div className="flex justify-center gap-2 mt-4 px-6">
          {protocolsArray.map((protocol) => (
            <div
              key={protocol.id}
              className="w-2 h-2 rounded-full bg-current opacity-20"
            />
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-6 text-center px-6">
          <p className="font-commentary text-sm opacity-70">
            All protocols can be combined for full cognitive coverage
          </p>
        </div>
      </div>
    </div>
  );
}
