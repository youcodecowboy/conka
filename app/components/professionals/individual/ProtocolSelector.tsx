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
    <section className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Protocols</h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Select a protocol to view details
          </p>
        </div>

        {/* Protocol Thumbnails - Horizontal Row */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {protocolIds.map((protocolId) => {
            const protocol = protocolContent[protocolId];
            const selectorData = protocolSelectorData[protocolId];
            const protocolImage = getProtocolImage(protocolId) || protocol.image;
            const isSelected = selectedProtocol === protocolId;

            return (
              <button
                key={protocolId}
                onClick={() => onSelect(protocolId)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 transition-all duration-200 ${
                  isSelected
                    ? "scale-105 opacity-100"
                    : "scale-100 opacity-60 hover:opacity-80 hover:scale-[1.02]"
                }`}
              >
                {/* Protocol Image Thumbnail */}
                <div
                  className={`relative w-24 md:w-32 aspect-[5/2.2] rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected
                      ? "border-current"
                      : "border-transparent hover:border-current/30"
                  }`}
                >
                  <Image
                    src={protocolImage}
                    alt={selectorData.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>

                {/* Protocol Name */}
                <p className="font-clinical text-xs text-center max-w-[96px] md:max-w-[128px]">
                  {selectorData.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
