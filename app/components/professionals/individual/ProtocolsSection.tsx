"use client";

import { ProtocolId } from "@/app/lib/productData";
import ProtocolPurchaseCard from "./ProtocolPurchaseCard";

export default function ProtocolsSection() {
  const protocolIds: ProtocolId[] = ["1", "2", "3", "4"];

  return (
    <section className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Protocols
          </h2>
          <p className="font-clinical text-sm md:text-base opacity-70">
            Select protocols for individual athletes or clients
          </p>
        </div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {protocolIds.map((protocolId) => (
            <ProtocolPurchaseCard key={protocolId} protocolId={protocolId} />
          ))}
        </div>
      </div>
    </section>
  );
}
