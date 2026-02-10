/**
 * TypeScript interfaces for Testimonials component
 */

export type ProductType = "flow" | "clarity" | "protocol";

export interface Testimonial {
  name: string;
  country?: string; // optional; Loox has no country
  rating: number; // 1-5
  date: string; // ISO date string
  headline: string;
  body: string;
  photo?: string;
  /** When set, card can show product name or icon */
  productType?: ProductType;
  productLabel?: string; // e.g. "CONKA Flow", "CONKA Clear"
}

export interface TestimonialsProps {
  /** Array of testimonial objects to display */
  testimonials: Testimonial[];
  /** Maximum number of testimonials to show (default: all) */
  maxReviews?: number;
  /** Whether to show rating stars (default: true) */
  showRating?: boolean;
  /** When true, render auto-scrolling strip only (no arrows/dots/swipe) */
  autoScrollOnly?: boolean;
}

export interface TestimonialCardProps {
  /** Testimonial data */
  testimonial: Testimonial;
  /** Whether to show rating stars */
  showRating?: boolean;
  /** Whether this is mobile view (affects padding) */
  isMobile?: boolean;
  /** When "productHero", card uses grey bg, rounded corners, fixed min-height for equal-height strip */
  variant?: "default" | "productHero";
  /** When variant is productHero and strip is interactable: controlled expanded state */
  isExpanded?: boolean;
  /** When variant is productHero and strip is interactable: called when user toggles Read more/less */
  onToggleExpand?: () => void;
}
