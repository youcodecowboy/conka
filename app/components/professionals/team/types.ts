import { FormulaId, PurchaseType, B2BTier } from "@/app/lib/productData";

/** Info for "next tier" message when quantity is below next threshold */
export interface B2BNextTierInfo {
  boxesToNext: number;
  tierName: string;
  pricePerBoxExVat: number;
}

/**
 * Props for TeamFormulaCard component.
 * When tier and nextTier are provided, B2B pricing is used; otherwise retail pricing.
 */
export interface TeamFormulaCardProps {
  formulaId: FormulaId;
  selectedPurchaseType: PurchaseType;
  quantity: number;
  tier?: B2BTier;
  nextTier?: B2BNextTierInfo | null;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}
