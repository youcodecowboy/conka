import type { ProtocolId, FormulaId } from "@/app/lib/productData";

export const VALID_PROTOCOL_IDS: ProtocolId[] = ["1", "2", "3", "4"];

export type CrossSellVariant = "protocol" | "formula";

export interface CrossSellProtocolProps {
  variant: "protocol";
  currentProtocolId: ProtocolId;
}

export interface CrossSellFormulaProps {
  variant: "formula";
  currentFormulaId: FormulaId;
}

export type CrossSellProps = CrossSellProtocolProps | CrossSellFormulaProps;
