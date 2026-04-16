/**
 * Product image carousel configurations.
 * Single source of truth for all product page slideshows.
 */

export interface ProductImage {
  src: string;
}

/** Carousel image arrays for formula product pages (Flow, Clear) and the Both/Balance offering. */
export const formulaImages: Record<"flow" | "clear" | "both", ProductImage[]> = {
  flow: [
    { src: "/formulas/conkaFlow/FlowBox.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/both/BothHow.jpg" },
    { src: "/formulas/both/BothDailyUse.jpg" },
    { src: "/formulas/both/AppProof.jpg" },
    { src: "/formulas/both/BothClinicallyProven.jpg" },
    { src: "/formulas/both/BothTestimonial.jpg" },
    { src: "/formulas/conkaFlow/FlowNutrition.jpg" },
  ],
  clear: [
    { src: "/formulas/conkaClear/ClearBox.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/both/BothHow.jpg" },
    { src: "/formulas/both/BothDailyUse.jpg" },
    { src: "/formulas/both/AppProof.jpg" },
    { src: "/formulas/both/BothClinicallyProven.jpg" },
    { src: "/formulas/both/BothTestimonial.jpg" },
    { src: "/formulas/conkaClear/ClearNutrition.jpg" },
  ],
  both: [
    { src: "/formulas/BothBox.jpg" },
    { src: "/formulas/both/BothHow.jpg" },
    { src: "/formulas/both/BothDailyUse.jpg" },
    { src: "/formulas/both/AppProof.jpg" },
    { src: "/formulas/conkaFlow/FlowIngredients.jpg" },
    { src: "/formulas/conkaClear/ClearIngredients.jpg" },
    { src: "/formulas/both/BothTestimonial.jpg" },
    { src: "/formulas/conkaFlow/FlowNutrition.jpg" },
    { src: "/formulas/conkaClear/ClearNutrition.jpg" },
  ],
};
