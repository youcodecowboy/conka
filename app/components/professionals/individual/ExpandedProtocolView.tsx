"use client";

import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
} from "@/app/lib/productData";
import {
  ProtocolHero,
  ProtocolCalendar,
  ProtocolBenefits,
} from "@/app/components/protocol";

interface ExpandedProtocolViewProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ExpandedProtocolView({
  protocolId,
  selectedTier,
  onTierSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ExpandedProtocolViewProps) {
  return (
    <div className="border-t-2 border-current/10">
      {/* Protocol Hero Section */}
      <ProtocolHero
        protocolId={protocolId}
        selectedTier={selectedTier}
        onTierSelect={onTierSelect}
        purchaseType={purchaseType}
        onPurchaseTypeChange={onPurchaseTypeChange}
        onAddToCart={onAddToCart}
      />

      {/* Protocol Calendar Section */}
      <ProtocolCalendar protocolId={protocolId} selectedTier={selectedTier} />

      {/* Protocol Benefits Section */}
      <ProtocolBenefits protocolId={protocolId} />
    </div>
  );
}
