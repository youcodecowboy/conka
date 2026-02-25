import Link from "next/link";

export function OrdersPageHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link
        href="/account"
        className="p-2 rounded-[var(--premium-radius-nested)] hover:bg-[var(--color-premium-stroke)] transition-colors"
        aria-label="Back to account"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </Link>
      <div>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-0.5">
          Your
        </p>
        <h1
          id="orders-heading"
          className="premium-section-heading mb-0"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          Order History
        </h1>
      </div>
    </div>
  );
}
