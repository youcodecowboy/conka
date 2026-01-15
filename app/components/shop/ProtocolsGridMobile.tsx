"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ProtocolId } from "@/app/lib/productData";
import ProtocolSelector from "./ProtocolSelector";
import ProtocolActivePanel from "./ProtocolActivePanel";
import { DEFAULT_PROTOCOL_ID } from "./protocolSelectorData";

export default function ProtocolsGridMobile() {
  const [activeProtocolId, setActiveProtocolId] =
    useState<ProtocolId>(DEFAULT_PROTOCOL_ID);

  const handleProtocolSelect = useCallback((id: ProtocolId) => {
    setActiveProtocolId(id);
  }, []);

  return (
    <div className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6">
          <div className="text-left mb-4">
            <h2 className="text-2xl font-bold mb-1">Choose Your Protocol</h2>
            <p className="font-clinical text-sm opacity-70">
              Pre-optimised CONKA Flow + CONKA Clarity ratios for different
              mental demands
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

        {/* Protocol Selector (Scrollable) */}
        <div className="mb-6">
          <ProtocolSelector
            activeProtocolId={activeProtocolId}
            onSelect={handleProtocolSelect}
            isMobile={true}
          />
        </div>

        {/* Active Panel (Stacked) */}
        <ProtocolActivePanel protocolId={activeProtocolId} isMobile={true} />
      </div>
    </div>
  );
}
