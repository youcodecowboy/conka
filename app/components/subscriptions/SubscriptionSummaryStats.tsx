interface SubscriptionSummaryStatsProps {
  activeCount: number;
  pausedCount: number;
  pastCount: number;
}

export function SubscriptionSummaryStats({
  activeCount,
  pausedCount,
  pastCount,
}: SubscriptionSummaryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {activeCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Active
        </p>
      </div>
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {pausedCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Paused
        </p>
      </div>
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5 opacity-60"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {pastCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Past
        </p>
      </div>
    </div>
  );
}
