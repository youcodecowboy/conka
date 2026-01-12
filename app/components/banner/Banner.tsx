"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import type { BannerConfig } from "./types";
import BannerDesktop from "./BannerDesktop";
import BannerMobile from "./BannerMobile";

interface BannerProps {
  /** Banner configuration */
  config: BannerConfig;
}

export default function Banner({ config }: BannerProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // During SSR/hydration when isMobile is undefined, show desktop version
  if (isMobile === undefined) {
    return <BannerDesktop config={config} />;
  }

  // Render mobile or desktop version
  if (isMobile) {
    return <BannerMobile config={config} />;
  }

  return <BannerDesktop config={config} />;
}
