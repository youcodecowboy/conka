/**
 * Protocol Hero Image Configuration
 * Hero images for protocol product pages.
 */

import { ProtocolId, formulaImages } from "@/app/lib/productData";

export interface ProtocolHeroImage {
  src: string;
}

/**
 * Protocol hero images mapping
 * First image is the primary hero image (e.g., BalanceBox.jpg)
 */
export const protocolHeroImages: Record<ProtocolId, string> = {
  "1": "/protocols/ResilienceBox.jpg",
  "2": "/protocols/PrecisionBox.jpg",
  "3": "/protocols/BalanceBox.jpg",
  "4": "/protocols/UltimateBox.jpg",
};

/**
 * Get protocol hero slideshow images: protocol box image first, then the shared
 * "both" carousel assets (skipping the BothBox.jpg which is slot 0 in formulaImages.both).
 */
export function getProtocolHeroImages(protocolId: ProtocolId): ProtocolHeroImage[] {
  const protocolHeroImage = protocolHeroImages[protocolId];

  return [
    { src: protocolHeroImage },
    ...formulaImages.both.slice(1),
  ];
}
