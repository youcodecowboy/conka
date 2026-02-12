/**
 * Product Hero Image Configuration
 * Hero images for individual formula product pages.
 */

import { FormulaId } from "@/app/lib/productData";

export interface ProductHeroImage {
  src: string;
}

/**
 * Get formula hero slideshow images: formula image first, then formula-specific assets
 * (ingredients, stats, replaces, reviews).
 */
export function getProductHeroImages(formulaId: FormulaId): ProductHeroImage[] {
  const basePath = formulaId === "01" ? "/formulas/conkaFlow" : "/formulas/conkaClear";
  const prefix = formulaId === "01" ? "Flow" : "Clear";

  return [
    { src: `${basePath}/${prefix}Box.jpg` },
    { src: `${basePath}/${prefix}Ingredients.jpg` },
    { src: `${basePath}/${prefix}Stats.jpg` },
    { src: `${basePath}/${prefix}Replaces.jpg` },
    { src: `${basePath}/${prefix}Reviews.jpg` },
  ];
}
