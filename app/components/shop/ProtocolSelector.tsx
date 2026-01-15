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
    [onSelect]
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
        className={`flex-shrink-0 neo-box p-3 md:p-4 transition-all duration-200 group ${
          isActive
            ? "bg-[var(--foreground)] text-[var(--background)] shadow-[4px_4px_0px_0px_var(--foreground)]"
            : "hover:shadow-[4px_4px_0px_0px_var(--foreground)]"
        } ${isMobile ? "min-w-[140px] min-h-[48px]" : "flex-1"}`}
        aria-pressed={isActive}
        aria-label={`Select ${protocol.name}`}
        title={`${protocol.flowPercentage}% Flow / ${protocol.clarityPercentage}% Clarity`}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
              isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
            }`}
          >
            {icon && (
              <div className="w-6 h-6 [&>svg]:w-6 [&>svg]:h-6">
                {icon}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 text-left">
            <p
              className={`font-bold text-sm truncate ${
                isActive ? "" : "group-hover:opacity-100"
              }`}
            >
              {protocol.outcome}
            </p>
            <p className="font-clinical text-[10px] opacity-60 truncate">
              {protocol.name}
            </p>
          </div>

          {/* Mini Ratio Wheel */}
          <div className="flex-shrink-0">
            <ProtocolRatioWheel
              flowPercentage={protocol.flowPercentage}
              clarityPercentage={protocol.clarityPercentage}
              size="small"
              isUltimate={protocol.isUltimate}
              animate={false}
            />
          </div>
        </div>

        {/* Premium badge for Ultimate */}
        {protocol.isPremium && (
          <div
            className={`mt-2 font-clinical text-[9px] uppercase tracking-wider ${
              isActive ? "opacity-80" : "opacity-50"
            }`}
          >
            Most Advanced
          </div>
        )}
      </button>
    );
  };

  if (isMobile) {
    return (
      <div className="relative">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 py-2 -mx-2"
        >
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
