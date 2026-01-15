"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import ProtocolsGridDesktop from "./ProtocolsGridDesktop";
import ProtocolsGridMobile from "./ProtocolsGridMobile";

export default function ProtocolsGrid() {
  const isMobile = useIsMobile(1024); // lg breakpoint

  if (isMobile === undefined) {
    // SSR/initial render - return desktop to avoid layout shift
    return <ProtocolsGridDesktop />;
  }

  if (isMobile) {
    return <ProtocolsGridMobile />;
  }

  return <ProtocolsGridDesktop />;
}
