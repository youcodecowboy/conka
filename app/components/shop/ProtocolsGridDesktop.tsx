"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ProtocolId } from "@/app/lib/productData";
import ProtocolSelector from "./ProtocolSelector";
import ProtocolActivePanel from "./ProtocolActivePanel";
import { DEFAULT_PROTOCOL_ID } from "./protocolSelectorData";

export default function ProtocolsGridDesktop() {
  const [activeProtocolId, setActiveProtocolId] =
    useState<ProtocolId>(DEFAULT_PROTOCOL_ID);

  const handleProtocolSelect = useCallback((id: ProtocolId) => {
    setActiveProtocolId(id);
  }, []);

  return (
    <div className="px-6 md:px-16 py-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Quiz CTA */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Choose Your Protocol
            </h2>
            <p className="font-clinical text-base md:text-lg opacity-70">
              Four pre-optimised Flow + Clarity ratios for different mental
              demands
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

        {/* Protocol Selector */}
        <div className="mb-8">
          <ProtocolSelector
            activeProtocolId={activeProtocolId}
            onSelect={handleProtocolSelect}
            isMobile={false}
          />
        </div>

        {/* Active Panel */}
        <ProtocolActivePanel protocolId={activeProtocolId} isMobile={false} />
      </div>
    </div>
  );
}
