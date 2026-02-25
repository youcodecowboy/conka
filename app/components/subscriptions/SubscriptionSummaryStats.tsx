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
    <div className="grid grid-cols-3 gap-4 mb-10">
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {activeCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Active
        </p>
      </div>
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {pausedCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Paused
        </p>
      </div>
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1 opacity-60"
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
