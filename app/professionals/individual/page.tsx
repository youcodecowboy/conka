"use client";

import { useState } from "react";
import Navigation from "../../components/navigation";
import IndividualPurchaseHeader from "../../components/professionals/individual/IndividualPurchaseHeader";
import ProtocolListSelector from "../../components/professionals/individual/ProtocolListSelector";
import ProtocolPurchaseCard from "../../components/professionals/individual/ProtocolPurchaseCard";
import ProtocolScheduleCalendar from "../../components/professionals/individual/ProtocolScheduleCalendar";
import IndividualFormulasSection from "../../components/professionals/individual/IndividualFormulasSection";
import {
  InfoSection,
  BenefitsSection,
  IngredientsSection,
  TasteSection,
  TeamTierKey,
} from "@/app/components/professionals/team";
import ProtocolBenefits from "@/app/components/protocol/ProtocolBenefits";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";
import {
  ProtocolId,
  PurchaseType,
  FormulaId,
  getB2BTier,
  getB2BNextTierInfo,
} from "@/app/lib/productData";
import { PROFESSIONAL_PROTOCOL_ORDER } from "@/app/components/professionals/individual/protocolCopy";
import { useCart } from "@/app/context/CartContext";
import { getB2BFormulaVariantId, getB2BProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { getB2BTotalBoxes, getB2BPendingBoxes } from "@/app/lib/b2bCartTier";

export default function ProfessionalsIndividualPage() {
  const { addToCart, openCart, getCartItems } = useCart();

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

  // Formula info sections (mobile toggle between Flow / Clear)
  const [selectedFormula, setSelectedFormula] = useState<FormulaId>("01");

  // B2B uses one cart-wide tier (Starter/Squad/Elite) based on total B2B boxes.
  // We compute tier per product so each card can show: "if you add this, your tier will be X"
  // and the correct price/next-tier message. Flow vs Clear often match because they share
  // the same box bands; they differ only when pending quantities differ (e.g. 1 Flow vs 3 Clear).
  const lines = getCartItems();
  const flowTotalBoxes =
    getB2BTotalBoxes(lines) + getB2BPendingBoxes("formula", "01", flowQuantity);
  const clearTotalBoxes =
    getB2BTotalBoxes(lines) + getB2BPendingBoxes("formula", "02", clearQuantity);
  const protocolTotalBoxes =
    getB2BTotalBoxes(lines) +
    getB2BPendingBoxes("protocol", selectedProtocol, protocolQuantity);
  const flowTier = getB2BTier(flowTotalBoxes);
  const clearTier = getB2BTier(clearTotalBoxes);
  const protocolTier = getB2BTier(protocolTotalBoxes);
  const flowNextTier = getB2BNextTierInfo(flowTotalBoxes);
  const clearNextTier = getB2BNextTierInfo(clearTotalBoxes);
  const protocolNextTier = getB2BNextTierInfo(protocolTotalBoxes);

  const handleProtocolSelect = (protocolId: ProtocolId) => {
    setSelectedProtocol(protocolId);
  };

  const handleProtocolAddToCart = async () => {
    const lines = getCartItems();
    const totalBoxes =
      getB2BTotalBoxes(lines) +
      getB2BPendingBoxes("protocol", selectedProtocol, protocolQuantity);
    const tier = getB2BTier(totalBoxes);
    const variantData = getB2BProtocolVariantId(
      selectedProtocol,
      tier,
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
    const lines = getCartItems();
    const totalBoxes =
      getB2BTotalBoxes(lines) + getB2BPendingBoxes("formula", "01", flowQuantity);
    const tier = getB2BTier(totalBoxes);
    const variantData = getB2BFormulaVariantId("01", tier, flowPurchaseType);
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
    const lines = getCartItems();
    const totalBoxes =
      getB2BTotalBoxes(lines) + getB2BPendingBoxes("formula", "02", clearQuantity);
    const tier = getB2BTier(totalBoxes);
    const variantData = getB2BFormulaVariantId("02", tier, clearPurchaseType);
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

      {/* Protocol section: tier key, then vertical list (desktop) / horizontal scroll (mobile) + purchase card */}
      <section className="px-6 md:px-16 py-6 md:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-1">Protocols</h2>
            <p className="font-clinical text-xs md:text-sm opacity-70">
              Mixed plans combining CONKA Flow and CONKA Clear for maximum performance
            </p>
          </div>

          <TeamTierKey totalBoxes={getB2BTotalBoxes(lines)} />

          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,340px)_1fr] gap-6 md:gap-8 mt-6 md:mt-8">
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
                tier={protocolTier}
                nextTier={protocolNextTier}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calendar: recommended schedule (max tier) for selected protocol */}
      <ProtocolScheduleCalendar protocolId={selectedProtocol} />

      {/* Why this protocol works */}
      <ProtocolBenefits protocolId={selectedProtocol} />

      {/* Individual formulas: two TeamFormulaCards (B2B tier from cart total) */}
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
        flowTier={flowTier}
        flowNextTier={flowNextTier}
        clearTier={clearTier}
        clearNextTier={clearNextTier}
      />

      {/* Formula info sections (same as team: Info, Benefits, Ingredients, Taste) */}
      <div className="md:hidden px-6 md:px-16 pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFormula("01")}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                selectedFormula === "01"
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
              }`}
            >
              <span className="font-clinical text-sm font-medium">
                CONKA Flow
              </span>
            </button>
            <button
              onClick={() => setSelectedFormula("02")}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                selectedFormula === "02"
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "bg-transparent border-[var(--foreground)]/30 text-[var(--foreground)] hover:border-[var(--foreground)]/50"
              }`}
            >
              <span className="font-clinical text-sm font-medium">
                CONKA Clear
              </span>
            </button>
          </div>
        </div>
      </div>

      <InfoSection selectedFormula={selectedFormula} />
      <BenefitsSection selectedFormula={selectedFormula} />
      <IngredientsSection selectedFormula={selectedFormula} />
      <TasteSection selectedFormula={selectedFormula} />

      <CaseStudiesDataDriven />
    </div>
  );
}
