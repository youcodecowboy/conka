"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import type { CrossSellProps } from "./types";
import CrossSellDesktop from "./CrossSellDesktop";
import CrossSellMobile from "./CrossSellMobile";

export default function CrossSell(props: CrossSellProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <CrossSellDesktop {...props} />;
  }

  return isMobile ? (
    <CrossSellMobile {...props} />
  ) : (
    <CrossSellDesktop {...props} />
  );
}
