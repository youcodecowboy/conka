/**
 * Subtitle for testimonials section: "Over 500 reviews" + 5 stars.
 * Used across all pages (single site-wide review pool).
 */
export default function TestimonialsSubtitle() {
  return (
    <p className="font-primary text-sm md:text-base opacity-70 flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#f59e0b"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span>
          500+ 5-star reviews from athletes, professionals, and high performers
        </span>
      </span>
    </p>
  );
}
