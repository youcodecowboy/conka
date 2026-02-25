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
    <div className="grid grid-cols-3 gap-4 mb-10">
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {totalCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Total Orders
        </p>
      </div>
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {deliveredCount}
        </p>
        <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
          Delivered
        </p>
      </div>
      <div className="premium-card-soft premium-card-soft-stroke p-6 text-center">
        <p
          className="text-2xl font-semibold text-[var(--color-ink)] mb-1"
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
