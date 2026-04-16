import type { ReactNode } from "react";

export interface ProductGridCopyProps {
  exclude?: ("flow" | "clear" | "protocol")[];
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
    CONKA Flow for morning energy and focus. CONKA Clear for afternoon clarity and recovery. Take both or choose one.
  </>
);
const CROSS_SELL_TITLE = "Explore Other Products";

function isCrossSell(props?: ProductGridCopyProps): boolean {
  return (props?.exclude?.length ?? 0) > 0;
}

/**
 * Returns section title and subtitle for ProductGrid. Use when rendering the section header in ProductGrid, ProductGridTablet, and ProductGridMobile.
 */
export function getProductGridCopy(props?: ProductGridCopyProps): ProductGridCopy {
  const crossSell = isCrossSell(props);
  return {
    title: crossSell ? CROSS_SELL_TITLE : LANDING_TITLE,
    subtitleNode: LANDING_SUBTITLE,
  };
}
