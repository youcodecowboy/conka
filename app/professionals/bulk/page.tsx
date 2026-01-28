"use client";

import { useState } from "react";
import Navigation from "../../components/navigation";
import {
  BulkPurchaseHeader,
  BulkFormulaCard,
  InfoSection,
  BenefitsSection,
  IngredientsSection,
  TasteSection,
} from "../../components/professionals/bulk";
import {
  FormulaId,
  PurchaseType,
} from "@/app/lib/productData";
import { useCart } from "@/app/context/CartContext";
import { getFormulaVariantId } from "@/app/lib/shopifyProductMapping";

export default function ProfessionalsBulkPage() {
  const { addToCart, openCart } = useCart();

  // State for formula selection (mobile toggle)
  const [selectedFormula, setSelectedFormula] = useState<FormulaId>("01");

  // State for CONKA Flow (01)
  const [flowPurchaseType, setFlowPurchaseType] =
    useState<PurchaseType>("subscription");
  const [flowQuantity, setFlowQuantity] = useState(1);

  // State for CONKA Clear (02)
  const [clearPurchaseType, setClearPurchaseType] =
    useState<PurchaseType>("subscription");
  const [clearQuantity, setClearQuantity] = useState(1);

  // Handle Flow add to cart
  const handleFlowAddToCart = async () => {
    const variantData = getFormulaVariantId("01", "28", flowPurchaseType);

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        flowQuantity,
        variantData.sellingPlanId,
        {
          location: "professional_bulk",
          source: "professional_portal",
        }
      );
      openCart();
    }
  };

  // Handle Clear add to cart
  const handleClearAddToCart = async () => {
    const variantData = getFormulaVariantId("02", "28", clearPurchaseType);

    if (variantData?.variantId) {
      await addToCart(
        variantData.variantId,
        clearQuantity,
        variantData.sellingPlanId,
        {
          location: "professional_bulk",
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
      <BulkPurchaseHeader />

      {/* Formula Cards Grid */}
      <section className="px-6 md:px-16 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* CONKA Flow Card */}
            <BulkFormulaCard
              formulaId="01"
              selectedPurchaseType={flowPurchaseType}
              quantity={flowQuantity}
              onPurchaseTypeChange={setFlowPurchaseType}
              onQuantityChange={setFlowQuantity}
              onAddToCart={handleFlowAddToCart}
            />

            {/* CONKA Clear Card */}
            <BulkFormulaCard
              formulaId="02"
              selectedPurchaseType={clearPurchaseType}
              quantity={clearQuantity}
              onPurchaseTypeChange={setClearPurchaseType}
              onQuantityChange={setClearQuantity}
              onAddToCart={handleClearAddToCart}
            />
          </div>
        </div>
      </section>

      {/* Formula Information Sections */}
      {/* Mobile Toggle - Only visible on mobile */}
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
    </div>
  );
}
