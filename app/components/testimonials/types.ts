/**
 * TypeScript interfaces for Testimonials component
 */

export interface Testimonial {
  name: string;
  country: string;
  rating: number; // 1-5
  date: string; // ISO date string
  headline: string;
  body: string;
  photo?: string; // For future implementation
}

export interface TestimonialsProps {
  /** Array of testimonial objects to display */
  testimonials: Testimonial[];
  /** Maximum number of testimonials to show (default: all) */
  maxReviews?: number;
  /** Whether to show rating stars (default: true) */
  showRating?: boolean;
}

export interface TestimonialCardProps {
  /** Testimonial data */
  testimonial: Testimonial;
  /** Whether to show rating stars */
  showRating?: boolean;
  /** Whether this is mobile view (affects padding) */
  isMobile?: boolean;
}
