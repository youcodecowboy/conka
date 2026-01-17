"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import ShopHeroDesktop from "./ShopHeroDesktop";
import ShopHeroMobile from "./ShopHeroMobile";

export default function ShopHero() {
  const isMobile = useIsMobile(1024); // lg breakpoint

  if (isMobile === undefined) {
    // SSR/initial render - return desktop to avoid layout shift
    return <ShopHeroDesktop />;
  }

  if (isMobile) {
    return <ShopHeroMobile />;
  }

  return <ShopHeroDesktop />;
}
