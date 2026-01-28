import { FormulaId, PurchaseType } from "@/app/lib/productData";

/**
 * Props for BulkFormulaCard component
 */
export interface BulkFormulaCardProps {
  formulaId: FormulaId;
  selectedPurchaseType: PurchaseType;
  quantity: number;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}
