"use client";

import { useState } from "react";
import Navigation from "../../components/navigation";
import IndividualPurchaseHeader from "../../components/professionals/individual/IndividualPurchaseHeader";
import ProtocolListSelector from "../../components/professionals/individual/ProtocolListSelector";
import ProtocolPurchaseCard from "../../components/professionals/individual/ProtocolPurchaseCard";
import ProtocolScheduleCalendar from "../../components/professionals/individual/ProtocolScheduleCalendar";
import IndividualFormulasSection from "../../components/professionals/individual/IndividualFormulasSection";
import ProtocolBenefits from "@/app/components/protocol/ProtocolBenefits";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";
import {
  ProtocolId,
  PurchaseType,
} from "@/app/lib/productData";
import { PROFESSIONAL_PROTOCOL_ORDER } from "@/app/components/professionals/individual/protocolCopy";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId, getFormulaVariantId } from "@/app/lib/shopifyProductMapping";

export default function ProfessionalsIndividualPage() {
  const { addToCart, openCart } = useCart();

  // Protocol: default to first in display order so card is visible
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolId>(
    PROFESSIONAL_PROTOCOL_ORDER[0]
  );
  const [protocolPurchaseType, setProtocolPurchaseType] =
    useState<PurchaseType>("subscription");
  const [protocolQuantity, setProtocolQuantity] = useState(1);

  // Formulas (same pattern as team page)
  const [flowPurchaseType, setFlowPurchaseType] =
    useState<PurchaseType>("subscription");
  const [flowQuantity, setFlowQuantity] = useState(1);
  const [clearPurchaseType, setClearPurchaseType] =
    useState<PurchaseType>("subscription");
  const [clearQuantity, setClearQuantity] = useState(1);

  const handleProtocolSelect = (protocolId: ProtocolId) => {
    setSelectedProtocol(protocolId);
  };

  const handleProtocolAddToCart = async () => {
    const variantData = getProtocolVariantId(
      selectedProtocol,
      "max",
      protocolPurchaseType
    );

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        protocolQuantity,
        variantData.sellingPlanId,
        {
          location: "professional_individual",
          source: "professional_portal",
        }
      );
      openCart();
    }
  };

  const handleFlowAddToCart = async () => {
    const variantData = getFormulaVariantId("01", "28", flowPurchaseType);

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        flowQuantity,
        variantData.sellingPlanId,
        {
          location: "professional_individual",
          source: "professional_portal",
        }
      );
      openCart();
    }
  };

  const handleClearAddToCart = async () => {
    const variantData = getFormulaVariantId("02", "28", clearPurchaseType);

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        clearQuantity,
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

      <IndividualPurchaseHeader />

      {/* Protocol section: vertical list (desktop) / horizontal scroll (mobile) + purchase card */}
      <section className="px-6 md:px-16 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-1">Protocols</h2>
            <p className="font-clinical text-xs md:text-sm opacity-70">
              Mixed plans combining CONKA Flow and CONKA Clear for maximum performance
            </p>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,340px)_1fr] gap-6 md:gap-8">
            {/* Left: protocol list (vertical on desktop, horizontal on mobile) */}
            <div>
              <ProtocolListSelector
                selectedProtocol={selectedProtocol}
                onSelect={handleProtocolSelect}
              />
            </div>

            {/* Right: single protocol purchase card */}
            <div className="min-h-[400px]">
              <ProtocolPurchaseCard
                protocolId={selectedProtocol}
                selectedPurchaseType={protocolPurchaseType}
                quantity={protocolQuantity}
                onPurchaseTypeChange={setProtocolPurchaseType}
                onQuantityChange={setProtocolQuantity}
                onAddToCart={handleProtocolAddToCart}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calendar: recommended schedule (max tier) for selected protocol */}
      <ProtocolScheduleCalendar protocolId={selectedProtocol} />

      {/* Why this protocol works */}
      <ProtocolBenefits protocolId={selectedProtocol} />

      {/* Individual formulas: two TeamFormulaCards */}
      <IndividualFormulasSection
        flowPurchaseType={flowPurchaseType}
        flowQuantity={flowQuantity}
        clearPurchaseType={clearPurchaseType}
        clearQuantity={clearQuantity}
        onFlowPurchaseTypeChange={setFlowPurchaseType}
        onFlowQuantityChange={setFlowQuantity}
        onClearPurchaseTypeChange={setClearPurchaseType}
        onClearQuantityChange={setClearQuantity}
        onFlowAddToCart={handleFlowAddToCart}
        onClearAddToCart={handleClearAddToCart}
      />

      <CaseStudiesDataDriven />
    </div>
  );
}
