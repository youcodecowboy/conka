import type { ReactNode } from "react";
import type { ProtocolVariant } from "./ProtocolVariantSelector";

export interface ProductGridCopyProps {
  exclude?: ("flow" | "clear" | "protocol")[];
  disabledProtocolVariants?: ProtocolVariant[];
}

export interface ProductGridCopy {
  title: string;
  subtitleNode: ReactNode | null;
}

const LANDING_TITLE = "Find Your Formula";
const LANDING_SUBTITLE: ReactNode = (
  <>
    <span className="font-bold">Two formulas, one system.</span>
    <br />
    CONKA Flow for daytime energy and focus. CONKA Clear for clarity and recovery. Use separately or combine as a Protocol.
  </>
);
const CROSS_SELL_TITLE = "Explore Other Products";

function isCrossSell(props?: ProductGridCopyProps): boolean {
  if (!props) return false;
  const hasExclude = (props.exclude?.length ?? 0) > 0;
  const hasDisabledVariants = (props.disabledProtocolVariants?.length ?? 0) > 0;
  return hasExclude || hasDisabledVariants;
}

/**
 * Returns section title and subtitle for ProductGrid. Use when rendering the section header in ProductGrid, ProductGridTablet, and ProductGridMobile.
 */
export function getProductGridCopy(props?: ProductGridCopyProps): ProductGridCopy {
  const crossSell = isCrossSell(props);
  return {
    title: crossSell ? CROSS_SELL_TITLE : LANDING_TITLE,
    subtitleNode: crossSell ? null : LANDING_SUBTITLE,
  };
}
