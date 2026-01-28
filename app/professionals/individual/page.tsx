"use client";

import { useState, useEffect } from "react";
import Navigation from "../../components/navigation";
import IndividualPurchaseHeader from "../../components/professionals/individual/IndividualPurchaseHeader";
import ProtocolSelector from "../../components/professionals/individual/ProtocolSelector";
import ExpandedProtocolView from "../../components/professionals/individual/ExpandedProtocolView";
import FormulaSelector from "../../components/professionals/individual/FormulaSelector";
import ExpandedFormulaView from "../../components/professionals/individual/ExpandedFormulaView";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";
import {
  ProtocolId,
  ProtocolTier,
  PurchaseType,
  FormulaId,
  PackSize,
  protocolContent,
} from "@/app/lib/productData";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId, getFormulaVariantId } from "@/app/lib/shopifyProductMapping";

export default function ProfessionalsIndividualPage() {
  const { addToCart, openCart } = useCart();

  // Protocol state management
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolId | null>(
    null
  );
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  
  // Formula state management
  const [selectedFormula, setSelectedFormula] = useState<FormulaId | null>(
    null
  );
  const [selectedPack, setSelectedPack] = useState<PackSize>("12");
  
  // Shared purchase type
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

  // Handle formula selection
  const handleFormulaSelect = (formulaId: FormulaId) => {
    // If clicking the same formula, collapse it
    if (selectedFormula === formulaId) {
      setSelectedFormula(null);
    } else {
      setSelectedFormula(formulaId);
    }
  };

  // Handle protocol add to cart
  const handleProtocolAddToCart = async () => {
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

  // Handle formula add to cart
  const handleFormulaAddToCart = async () => {
    if (!selectedFormula) return;

    const variantData = getFormulaVariantId(
      selectedFormula,
      selectedPack,
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

      {/* Header Section */}
      <IndividualPurchaseHeader />

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
          onAddToCart={handleProtocolAddToCart}
        />
      )}

      {/* Formula Selector */}
      <FormulaSelector
        selectedFormula={selectedFormula}
        onSelect={handleFormulaSelect}
      />

      {/* Expanded Formula View (conditional) */}
      {selectedFormula && (
        <ExpandedFormulaView
          formulaId={selectedFormula}
          selectedPack={selectedPack}
          onPackSelect={setSelectedPack}
          purchaseType={purchaseType}
          onPurchaseTypeChange={setPurchaseType}
          onAddToCart={handleFormulaAddToCart}
        />
      )}

      {/* Case Studies Section - Always Visible */}
      <CaseStudiesDataDriven />
    </div>
  );
}
