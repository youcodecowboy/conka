"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import CycleBreakDesktop from "./CycleBreakDesktop";
import CycleBreakMobile from "./CycleBreakMobile";

export default function CycleBreak() {
  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return <CycleBreakMobile />;
  }

  return <CycleBreakDesktop />;
}
