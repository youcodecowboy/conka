interface OrderSummaryStatsProps {
  totalCount: number;
  deliveredCount: number;
  inProgressCount: number;
}

export function OrderSummaryStats({
  totalCount,
  deliveredCount,
  inProgressCount,
}: OrderSummaryStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {totalCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Total Orders
        </p>
      </div>
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {deliveredCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Delivered
        </p>
      </div>
      <div className="rounded-[var(--premium-radius-card)] border border-[var(--color-premium-stroke)] bg-[var(--color-bone)] p-4 text-center shadow-sm">
        <p
          className="text-xl font-semibold text-[var(--color-ink)] mb-0.5"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {inProgressCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          In Progress
        </p>
      </div>
    </div>
  );
}
