import { FormulaId, PurchaseType } from "@/app/lib/productData";

/**
 * Props for TeamFormulaCard component
 */
export interface TeamFormulaCardProps {
  formulaId: FormulaId;
  selectedPurchaseType: PurchaseType;
  quantity: number;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}
