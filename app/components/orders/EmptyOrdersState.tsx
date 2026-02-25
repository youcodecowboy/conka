import Link from "next/link";

export function EmptyOrdersState() {
  return (
    <div className="premium-card-soft premium-card-soft-stroke p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-premium-stroke)] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--text-on-light-muted)]"
        >
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      </div>
      <h2
        className="premium-heading mb-2 text-[var(--color-ink)]"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        No orders yet
      </h2>
      <p className="premium-body text-[var(--text-on-light-muted)] mb-8 max-w-[65ch] mx-auto">
        Once you place an order, you&apos;ll be able to track it here and see
        your complete order history.
      </p>

      <div className="border-t border-[var(--color-premium-stroke)] pt-8 mt-8">
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-4">
          Start Shopping
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <Link
            href="/conka-flow"
            className="premium-card-soft premium-card-soft-stroke p-4 hover:bg-[var(--color-premium-stroke)]/30 transition-colors text-left rounded-[var(--premium-radius-nested)]"
          >
            <div className="w-8 h-8 bg-amber-500/20 rounded-[var(--premium-radius-nested)] mb-3" />
            <p className="font-semibold text-sm text-[var(--color-ink)]">
              CONKA Flow
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              Caffeine-Free Focus
            </p>
          </Link>
          <Link
            href="/conka-clarity"
            className="premium-card-soft premium-card-soft-stroke p-4 hover:bg-[var(--color-premium-stroke)]/30 transition-colors text-left rounded-[var(--premium-radius-nested)]"
          >
            <div className="w-8 h-8 bg-[#AAB9BC]/30 rounded-[var(--premium-radius-nested)] mb-3" />
            <p className="font-semibold text-sm text-[var(--color-ink)]">
              CONKA Clear
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              Peak Performance
            </p>
          </Link>
        </div>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] bg-[var(--color-ink)] px-8 py-3 font-semibold text-white text-sm hover:opacity-90 transition-opacity"
        >
          Find your protocol
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
