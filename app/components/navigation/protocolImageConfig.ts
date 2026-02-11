/**
 * Protocol & Formula Image Configuration
 * 
 * Set USE_COLOR_IMAGES to true to use color variant images
 * Set to false to use default images
 * 
 * This only affects the shop mega menu (desktop and mobile)
 */
export const USE_COLOR_IMAGES = true;

// Protocol image mappings
export const protocolImageMap: Record<
  string,
  { default: string; color: string }
> = {
  "1": {
    default: "/CONKA_15.jpg",
    color: "/protocols/ResilienceColour.jpg",
  },
  "2": {
    default: "/protocols/Precision.jpg",
    color: "/protocols/PrecisionColor.jpg",
  },
  "3": {
    default: "/CONKA_16.jpg",
    color: "/protocols/BalanceColour.jpg",
  },
  "4": {
    default: "/protocols/Ultimate.jpg",
    color: "/protocols/UltimateBox.jpg",
  },
  // "4": {
  //   default: "/protocols/Ultimate.jpg",
  //   color: "/protocols/UltimateColour.jpg",
  // },
};

// Formula image mappings
export const formulaImageMap: Record<
  string,
  { default: string; color: string }
> = {
  "01": {
    default: "/CONKA_51.jpg",
    color: "/formulas/ConkaFlowColour.jpg",
  },
  "02": {
    default: "/CONKA_52.jpg",
    color: "/formulas/ConkaClearColour.jpg",
  },
};

/**
 * Get the protocol image based on current configuration
 */
export function getProtocolImage(protocolId: string): string {
  const mapping = protocolImageMap[protocolId];
  if (!mapping) {
    // Fallback to default if mapping not found
    return "";
  }
  return USE_COLOR_IMAGES ? mapping.color : mapping.default;
}

/** Slideshow image shape for protocol hero */
export interface ProtocolSlideshowImage {
  src: string;
}

/**
 * Get protocol hero slideshow images: protocol image first, then Flow + Clear
 * (ingredients, stats, replaces, reviews).
 */
export function getProtocolSlideshowImages(
  protocolId: string,
  protocolImageFallback: string
): ProtocolSlideshowImage[] {
  const protocolSrc = getProtocolImage(protocolId) || protocolImageFallback;
  return [
    { src: protocolSrc },
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

/**
 * Get the formula image based on current configuration
 */
export function getFormulaImage(formulaId: string): string {
  const mapping = formulaImageMap[formulaId];
  if (!mapping) {
    // Fallback to default if mapping not found
    return "";
  }
  return USE_COLOR_IMAGES ? mapping.color : mapping.default;
}
