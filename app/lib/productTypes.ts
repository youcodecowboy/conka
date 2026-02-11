/**
 * Shared product type definitions.
 * No imports from other product modules.
 */

export type FormulaId = "01" | "02";
export type PackSize = "4" | "8" | "12" | "28";
export type PurchaseType = "subscription" | "one-time";
export type ProtocolId = "1" | "2" | "3" | "4";
export type ProtocolTier = "starter" | "pro" | "max";

/** B2B volume tier */
export type B2BTier = "starter" | "squad" | "elite";

/** Product gradients: unified system for formulas and protocols */
export type ProductId = FormulaId | ProtocolId;
