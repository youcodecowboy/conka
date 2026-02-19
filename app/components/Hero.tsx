"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export type HeroVariant = "default" | "dark";

/**
 * Hero wrapper: uses lg breakpoint (1024px) to render HeroMobile or HeroDesktop.
 * Desktop = two banner images; mobile/tablet = three images with HeroBannerMobileH as primary.
 */
export default function Hero({ variant = "default" }: { variant?: HeroVariant }) {
  const isMobile = useIsMobile(1024);

  if (isMobile === true) {
    return <HeroMobile variant={variant} />;
  }
  if (isMobile === false) {
    return <HeroDesktop variant={variant} />;
  }

  // SSR / hydration: render desktop layout by default (avoids layout shift)
  return <HeroDesktop variant={variant} />;
}
