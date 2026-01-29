import { FormulaId, PurchaseType, TeamTier } from "@/app/lib/productData";

/** Info for "next tier" message when quantity is below next threshold */
export interface TeamNextTierInfo {
  boxesToNext: number;
  tierName: string;
  pricePerBoxIncVat: number;
}

/**
 * Props for TeamFormulaCard component.
 * When tier and nextTier are provided, team (B2B) pricing is used; otherwise retail pricing.
 */
export interface TeamFormulaCardProps {
  formulaId: FormulaId;
  selectedPurchaseType: PurchaseType;
  quantity: number;
  tier?: TeamTier;
  nextTier?: TeamNextTierInfo | null;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}
