"use client";

import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";
import { protocolContent } from "@/app/lib/productData";
import {
  getProfessionalProtocolsOrdered,
  type ProfessionalProtocolCopy,
} from "./protocolCopy";

interface ProtocolListSelectorProps {
  selectedProtocol: ProtocolId | null;
  onSelect: (protocolId: ProtocolId) => void;
}

function ProtocolOption({
  protocol,
  isSelected,
  onSelect,
  variant,
}: {
  protocol: ProfessionalProtocolCopy;
  isSelected: boolean;
  onSelect: () => void;
  variant: "desktop" | "mobile";
}) {
  const protocolImage =
    getProtocolImage(protocol.id) || protocolContent[protocol.id]?.image || "";

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className={`flex-shrink-0 flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all duration-200 text-left min-w-[160px] max-w-[180px] ${
          isSelected
            ? "bg-gray-200 text-[var(--foreground)] border-gray-300"
            : "bg-[var(--background)] text-[var(--foreground)] border-black/10 hover:border-black/20"
        }`}
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          {protocolImage && (
            <Image
              src={protocolImage}
              alt={protocol.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          )}
        </div>
        <span className="font-bold text-sm leading-tight text-center line-clamp-2">
          {protocol.name}
        </span>
        <span className="font-clinical text-xs opacity-80 text-center line-clamp-2">
          {protocol.tagline}
        </span>
      </button>
    );
  }

  // Desktop: vertical row with image, name, tagline, bullets
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-start gap-4 rounded-lg border-2 p-4 transition-all duration-200 text-left ${
        isSelected
          ? "bg-gray-200 text-[var(--foreground)] border-gray-300"
          : "bg-[var(--background)] text-[var(--foreground)] border-black/10 hover:border-black/20"
      }`}
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        {protocolImage && (
          <Image
            src={protocolImage}
            alt={protocol.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base mb-1">{protocol.name}</h3>
        <p className="font-clinical text-sm opacity-90 mb-2">{protocol.tagline}</p>
        <ul className="font-clinical text-xs opacity-80 space-y-0.5">
          {protocol.bullets.map((bullet, i) => (
            <li key={i}>• {bullet}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export default function ProtocolListSelector({
  selectedProtocol,
  onSelect,
}: ProtocolListSelectorProps) {
  const protocols = getProfessionalProtocolsOrdered();

  return (
    <>
      {/* Desktop: vertical list */}
      <div className="hidden md:flex flex-col gap-3">
        {protocols.map((protocol) => (
          <ProtocolOption
            key={protocol.id}
            protocol={protocol}
            isSelected={selectedProtocol === protocol.id}
            onSelect={() => onSelect(protocol.id)}
            variant="desktop"
          />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {protocols.map((protocol) => (
          <ProtocolOption
            key={protocol.id}
            protocol={protocol}
            isSelected={selectedProtocol === protocol.id}
            onSelect={() => onSelect(protocol.id)}
            variant="mobile"
          />
        ))}
      </div>
    </>
  );
}
