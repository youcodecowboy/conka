/* ============================================================================
 * pdpAnchors
 *
 * DOM ids shared between PDP components that have to find each other at
 * runtime rather than through props.
 *
 * They live here rather than on the component that renders them so a consumer
 * does not have to import a whole component module to learn one string, and so
 * the contract is obvious from both ends: renaming the value in one place
 * cannot leave the other side silently querying an id nobody renders.
 * ========================================================================== */

/**
 * The hero's Add to cart button, rendered by ProductBuyPanel and observed by
 * StickyPurchaseFooterMobile, which stays hidden until this has scrolled away
 * so the bar never covers the CTA it exists to stand in for.
 *
 * Only one PDP hero mounts at a time (the pages branch on `useIsMobile`), so
 * this is unique on the page despite both heroes rendering a buy panel.
 */
export const HERO_CTA_ANCHOR_ID = "pdp-hero-cta";
