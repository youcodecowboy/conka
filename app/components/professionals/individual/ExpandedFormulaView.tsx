"use client";

import {
  FormulaId,
  PackSize,
  PurchaseType,
} from "@/app/lib/productData";
import {
  ProductHero,
  FormulaBenefits,
  FormulaFAQ,
  HowItWorks,
} from "@/app/components/product";
import FormulaCaseStudies from "@/app/components/FormulaCaseStudies";

interface ExpandedFormulaViewProps {
  formulaId: FormulaId;
  selectedPack: PackSize;
  onPackSelect: (pack: PackSize) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

export default function ExpandedFormulaView({
  formulaId,
  selectedPack,
  onPackSelect,
  purchaseType,
  onPurchaseTypeChange,
  onAddToCart,
}: ExpandedFormulaViewProps) {
  return (
    <div>
      {/* Product Hero Section */}
      <ProductHero
        formulaId={formulaId}
        selectedPack={selectedPack}
        onPackSelect={onPackSelect}
        purchaseType={purchaseType}
        onPurchaseTypeChange={onPurchaseTypeChange}
        onAddToCart={onAddToCart}
      />

      {/* Formula Benefits Section */}
      <FormulaBenefits formulaId={formulaId} />

      {/* FAQ Section */}
      <FormulaFAQ formulaId={formulaId} />

      {/* How It Works Section */}
      <HowItWorks formulaId={formulaId} />

      {/* Case Studies Section */}
      <FormulaCaseStudies formulaId={formulaId} />
    </div>
  );
}
