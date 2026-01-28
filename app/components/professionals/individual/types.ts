import {
  ProtocolId,
  FormulaId,
  ProtocolTier,
  PurchaseType,
} from "@/app/lib/productData";

/**
 * Props for ProtocolSelector component
 */
export interface ProtocolSelectorProps {
  selectedProtocol: ProtocolId | null;
  onSelect: (protocolId: ProtocolId) => void;
}

/**
 * Props for ExpandedProtocolView component
 */
export interface ExpandedProtocolViewProps {
  protocolId: ProtocolId;
  selectedTier: ProtocolTier;
  onTierSelect: (tier: ProtocolTier) => void;
  purchaseType: PurchaseType;
  onPurchaseTypeChange: (type: PurchaseType) => void;
  onAddToCart: () => void;
}

/**
 * Props for FormulaPurchaseCard component
 */
export interface FormulaPurchaseCardProps {
  formulaId: FormulaId;
}
