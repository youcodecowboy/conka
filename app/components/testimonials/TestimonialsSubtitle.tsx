/**
 * Subtitle for testimonials section: "Over 500 reviews" + 5 stars.
 * Used across all pages (single site-wide review pool).
 */
export default function TestimonialsSubtitle() {
  return (
    <p className="font-primary text-sm md:text-base opacity-70 flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        <span>
          500+ reviews from athletes, professionals, and high performers
        </span>
      </span>
    </p>
  );
}
