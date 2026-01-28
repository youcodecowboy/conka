"use client";

import Image from "next/image";
import { ProtocolId } from "@/app/lib/productData";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import { getProtocolImage } from "@/app/components/navigation/protocolImageConfig";
import { protocolContent } from "@/app/lib/productData";

interface ProtocolSelectorProps {
  selectedProtocol: ProtocolId | null;
  onSelect: (protocolId: ProtocolId) => void;
}

export default function ProtocolSelector({
  selectedProtocol,
  onSelect,
}: ProtocolSelectorProps) {
  const protocolIds: ProtocolId[] = ["1", "2", "3", "4"];

  return (
    <section className="bg-[var(--foreground)] text-[var(--background)] py-4 md:py-6">
      <div className="px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-3 md:mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-1">Protocols</h2>
          <p className="font-clinical text-xs md:text-sm opacity-80">
            Mixed plans combining CONKA Flow and CONKA Clear for maximum performance
          </p>
        </div>

        {/* Protocol Cards - Horizontal Strip */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2">
          {protocolIds.map((protocolId) => {
            const protocol = protocolContent[protocolId];
            const selectorData = protocolSelectorData[protocolId];
            const protocolImage = getProtocolImage(protocolId) || protocol.image;
            const isSelected = selectedProtocol === protocolId;

            return (
              <div
                key={protocolId}
                className="flex-shrink-0 relative"
                style={{ minWidth: "280px", maxWidth: "320px" }}
              >
                {/* Shadow Card (Grey) - Only visible when selected */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gray-200 border-2 border-[var(--background)]/30 rounded-lg translate-x-1 translate-y-1" />
                )}
                
                {/* Main Card */}
                <button
                  onClick={() => onSelect(protocolId)}
                  className={`relative flex items-center gap-3 md:gap-4 border-2 rounded-lg overflow-hidden p-3 md:p-4 transition-all duration-200 w-full ${
                    isSelected
                      ? "bg-[var(--background)] text-[var(--foreground)] border-[var(--background)] opacity-100"
                      : "bg-[var(--background)] text-[var(--foreground)] border-[var(--background)]/30 opacity-60 hover:opacity-100 hover:border-[var(--background)]/50"
                  }`}
                >
                  {/* Protocol Image - Compact */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={protocolImage}
                      alt={selectorData.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Protocol Name - Small */}
                    <p className={`font-primary text-[10px] md:text-xs uppercase tracking-wide mb-1 ${
                      isSelected ? "opacity-60" : "opacity-60"
                    }`}>
                      {protocol.name}
                    </p>

                    {/* Outcome - Benefit Lead Copy */}
                    <h3 className="text-sm md:text-base font-bold leading-tight mb-2">
                      {selectorData.outcome}
                    </h3>

                    {/* CTA Button */}
                    <div
                      className={`mt-auto px-3 py-1.5 rounded-full font-bold text-[10px] md:text-xs inline-flex items-center gap-1.5 border-2 ${
                        isSelected
                          ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                          : "bg-transparent text-[var(--foreground)] border-[var(--foreground)]/30"
                      }`}
                    >
                      {isSelected ? "Selected" : "View"}
                      {!isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
