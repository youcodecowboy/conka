/**
 * Navigation Image Configuration
 * Images used in navigation menus, shop cards, and other navigation contexts.
 * Hero images are defined separately in protocolHeroConfig.ts and productHeroConfig.ts
 */

// Protocol navigation images (for cards, menus)
export const protocolNavigationImages: Record<string, string> = {
  "1": "/protocols/ResilienceBox.jpg",
  "2": "/protocols/PrecisionPurple.jpg",
  "3": "/protocols/BalanceGreen.jpg",
  "4": "/protocols/UltimatePink.jpg",
};

// Formula navigation images (for cards, menus)
export const formulaNavigationImages: Record<string, string> = {
  "01": "/formulas/ConkaFlowColour.jpg",
  "02": "/formulas/ConkaClearColour.jpg",
};

/**
 * Get the protocol navigation image
 */
export function getProtocolImage(protocolId: string): string {
  return protocolNavigationImages[protocolId] || "";
}

/**
 * Get the formula navigation image
 */
export function getFormulaImage(formulaId: string): string {
  return formulaNavigationImages[formulaId] || "";
}
