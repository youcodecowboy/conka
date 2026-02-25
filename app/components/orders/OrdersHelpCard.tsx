export function OrdersHelpCard() {
  return (
    <div className="mt-14 rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] shadow-sm p-8 text-center">
      <h3
        className="font-semibold text-lg text-[var(--color-ink)] mb-2"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Questions about your order?
      </h3>
      <p className="premium-body text-[var(--text-on-light-muted)] mb-6 max-w-[50ch] mx-auto">
        Our team is here to help with tracking, returns, or any other questions.
      </p>
      <a
        href="mailto:support@conka.com"
        className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-6 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 transition-opacity"
      >
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
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Contact support
      </a>
    </div>
  );
}
