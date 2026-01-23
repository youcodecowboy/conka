"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { AppHeroDesktop } from "./AppHeroDesktop";
import { AppHeroMobile } from "./AppHeroMobile";

export function AppHero() {
  const isMobile = useIsMobile();

  // Show loading state during SSR/hydration
  if (isMobile === undefined) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="h-12 bg-white/10 rounded mb-6 animate-pulse" />
          <div className="h-6 bg-white/10 rounded mb-8 max-w-2xl mx-auto animate-pulse" />
        </div>
        <div className="relative w-full aspect-[9/16] bg-white/10 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return isMobile ? <AppHeroMobile /> : <AppHeroDesktop />;
}

export default AppHero;
