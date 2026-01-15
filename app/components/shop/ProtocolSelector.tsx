"use client";

import { useRef, useEffect, useCallback } from "react";
import { ProtocolId } from "@/app/lib/productData";
import { pathData, PathType } from "@/app/components/ProtocolBuilder";
import ProtocolRatioWheel from "./ProtocolRatioWheel";
import { protocolsArray, ProtocolSelectorData } from "./protocolSelectorData";

interface ProtocolSelectorProps {
  activeProtocolId: ProtocolId;
  onSelect: (id: ProtocolId) => void;
  isMobile?: boolean;
}

// Map protocol IDs to path keys for icons
const protocolToPath: Record<ProtocolId, Exclude<PathType, null>> = {
  "1": "path1",
  "2": "path2",
  "3": "path3",
  "4": "path4",
};

export default function ProtocolSelector({
  activeProtocolId,
  onSelect,
  isMobile = false,
}: ProtocolSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Scroll to active protocol on mobile
  useEffect(() => {
    if (!isMobile) return;

    const activeElement = itemRefs.current.get(activeProtocolId);
    if (activeElement && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft =
        activeElement.offsetLeft -
        container.offsetWidth / 2 +
        activeElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeProtocolId, isMobile]);

  const handleSelect = useCallback(
    (id: ProtocolId) => {
      onSelect(id);
    },
    [onSelect],
  );

  const renderProtocolPill = (protocol: ProtocolSelectorData) => {
    const isActive = protocol.id === activeProtocolId;
    const pathKey = protocolToPath[protocol.id];
    const icon = pathData[pathKey]?.icon;

    return (
      <button
        key={protocol.id}
        ref={(el) => {
          if (el) itemRefs.current.set(protocol.id, el);
        }}
        onClick={() => handleSelect(protocol.id)}
        className={`flex-shrink-0 p-3 md:p-4 transition-all duration-200 group ${
          isActive
            ? "neo-box-inverted shadow-[4px_4px_0px_0px_var(--foreground)]"
            : "neo-box hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
        } ${isMobile ? "w-[180px] min-h-[48px]" : "flex-1"}`}
        aria-pressed={isActive}
        aria-label={`Select ${protocol.name}`}
        title={`${protocol.flowPercentage}% Flow / ${protocol.clarityPercentage}% Clarity`}
      >
        <div
          className={`flex items-center gap-2 ${isMobile ? "flex-col text-center" : "gap-3"}`}
        >
          {/* Content - prioritize text */}
          <div
            className={`flex-1 min-w-0 ${isMobile ? "text-center w-full order-1" : "text-left"}`}
          >
            <p
              className="font-bold text-sm leading-tight"
              style={{ wordBreak: "break-word" }}
            >
              {protocol.outcome}
            </p>
            <p
              className={`font-clinical text-[10px] leading-tight mt-0.5 ${
                isActive ? "opacity-80" : "opacity-60"
              }`}
              style={{ wordBreak: "break-word" }}
            >
              {protocol.name}
            </p>
          </div>

          {/* Ratio Wheel with Icon inside */}
          <div className={`flex-shrink-0 ${isMobile ? "order-2" : ""}`}>
            <ProtocolRatioWheel
              flowPercentage={protocol.flowPercentage}
              clarityPercentage={protocol.clarityPercentage}
              size={isMobile ? "xsmall" : "small"}
              isUltimate={protocol.isUltimate}
              animate={false}
              icon={icon}
            />
          </div>
        </div>
      </button>
    );
  };

  if (isMobile) {
    return (
      <div className="relative">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-2 -mx-2 relative"
        >
          {/* Gradient Fades - aligned with scrollable content edges (accounting for px-2 padding) */}
          <div className="absolute left-2 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-2 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

          {protocolsArray.map(renderProtocolPill)}
        </div>

        {/* Scroll Hint */}
        <p className="font-commentary text-sm text-center mt-2 opacity-60">
          swipe to compare
        </p>
      </div>
    );
  }

  // Desktop: Horizontal row
  return (
    <div className="grid grid-cols-4 gap-4">
      {protocolsArray.map(renderProtocolPill)}
    </div>
  );
}
