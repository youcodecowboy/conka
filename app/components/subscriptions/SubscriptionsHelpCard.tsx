export function SubscriptionsHelpCard() {
  return (
    <div className="mt-14 rounded-[var(--premium-radius-card)] bg-[var(--color-ink)] border border-[var(--color-ink)] p-8 text-center">
      <h3
        className="font-semibold text-lg text-[var(--color-bone)] mb-2"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        Need help?
      </h3>
      <p className="premium-body text-[var(--color-bone)]/80 mb-6 max-w-[50ch] mx-auto">
        We can help with any subscription questions.
      </p>
      <a
        href="mailto:support@conka.io"
        className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-bone)] px-6 py-2.5 premium-body-sm font-semibold text-[var(--color-bone)] hover:bg-[var(--color-bone)]/10 transition-colors"
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
