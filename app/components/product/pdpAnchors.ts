/* DOM ids shared between PDP components that find each other at runtime rather
 * than through props. Kept out of the components that render them so a consumer
 * does not import a whole component module to learn one string. */

/**
 * The hero's Add to cart button, rendered by ProductBuyPanel and watched by
 * StickyPurchaseFooterMobile. Unique on the page: only one hero mounts at a
 * time, since the pages branch on `useIsMobile`.
 */
export const HERO_CTA_ANCHOR_ID = "pdp-hero-cta";
