import Link from "next/link";

export function SubscriptionsPageHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link
        href="/account"
        className="p-2 hover:bg-[#f5f5f5] transition-colors"
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
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </Link>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
          Manage your
        </p>
        <h1
          id="subscriptions-heading"
          className="text-3xl font-semibold text-black mb-0"
          style={{ letterSpacing: "-0.02em" }}
        >
          Subscriptions
        </h1>
      </div>
    </div>
  );
}
