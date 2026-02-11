/**
 * Protocol Hero Image Configuration
 * Hero images for protocol product pages.
 */

import { ProtocolId } from "@/app/lib/productData";

export interface ProtocolHeroImage {
  src: string;
}

/**
 * Protocol hero images mapping
 * First image is the primary hero image (e.g., BalanceBox.jpg)
 */
export const protocolHeroImages: Record<ProtocolId, string> = {
  "1": "/protocols/Resilience.jpg", // TODO: Update when ResilienceBox.jpg is available
  "2": "/protocols/Precision.jpg", // TODO: Update when PrecisionBox.jpg is available
  "3": "/protocols/BalanceBox.jpg",
  "4": "/protocols/UltimateBox.jpg",
};

/**
 * Get protocol hero slideshow images: protocol hero image first, then Flow + Clear
 * (ingredients, stats, replaces, reviews).
 */
export function getProtocolHeroImages(protocolId: ProtocolId): ProtocolHeroImage[] {
  const protocolHeroImage = protocolHeroImages[protocolId];

  return [
    { src: protocolHeroImage },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/conkaFlow/FlowStats.jpg" },
    { src: "/formulas/conkaClear/ClearStats.jpg" },
    { src: "/formulas/conkaFlow/FlowReplaces.jpg" },
    { src: "/formulas/conkaClear/ClearReplaces.jpg" },
    { src: "/formulas/conkaFlow/FlowReviews.jpg" },
    { src: "/formulas/conkaClear/ClearReviews.jpg" },
  ];
}
