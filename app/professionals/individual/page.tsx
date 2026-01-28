"use client";

import { useState, useEffect } from "react";
import Navigation from "../../components/navigation";
import ProtocolSelector from "../../components/professionals/individual/ProtocolSelector";
import ExpandedProtocolView from "../../components/professionals/individual/ExpandedProtocolView";
import FormulasSection from "../../components/professionals/individual/FormulasSection";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  protocolContent,
} from "@/app/lib/productData";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";

export default function ProfessionalsIndividualPage() {
  const { addToCart, openCart } = useCart();

  // State management
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolId | null>(
    null
  );
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");

  // Reset tier when protocol changes (Protocol 4 doesn't have starter)
  useEffect(() => {
    if (selectedProtocol === "4" && selectedTier === "starter") {
      setSelectedTier("pro");
    }
  }, [selectedProtocol, selectedTier]);

  // Handle protocol selection
  const handleProtocolSelect = (protocolId: ProtocolId) => {
    // If clicking the same protocol, collapse it
    if (selectedProtocol === protocolId) {
      setSelectedProtocol(null);
    } else {
      setSelectedProtocol(protocolId);
      // Reset tier to default for new protocol
      const protocol = protocolContent[protocolId];
      const defaultTier: ProtocolTier = protocol.availableTiers.includes("pro")
        ? "pro"
        : protocol.availableTiers[0];
      setSelectedTier(defaultTier);
    }
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!selectedProtocol) return;

    const variantData = getProtocolVariantId(
      selectedProtocol,
      selectedTier,
      purchaseType
    );

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        1,
        variantData.sellingPlanId,
        {
          location: "professional_individual",
          source: "professional_portal",
        }
      );
      openCart();
    }
  };

  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* Protocol Selector */}
      <ProtocolSelector
        selectedProtocol={selectedProtocol}
        onSelect={handleProtocolSelect}
      />

      {/* Expanded Protocol View (conditional) */}
      {selectedProtocol && (
        <ExpandedProtocolView
          protocolId={selectedProtocol}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Formulas Section */}
      <FormulasSection />
    </div>
  );
}
