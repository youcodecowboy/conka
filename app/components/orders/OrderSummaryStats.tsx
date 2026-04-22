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
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums"
          style={{ letterSpacing: "-0.02em" }}
        >
          {totalCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          Total Orders
        </p>
      </div>
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums"
          style={{ letterSpacing: "-0.02em" }}
        >
          {deliveredCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          Delivered
        </p>
      </div>
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums"
          style={{ letterSpacing: "-0.02em" }}
        >
          {inProgressCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          In Progress
        </p>
      </div>
    </div>
  );
}
