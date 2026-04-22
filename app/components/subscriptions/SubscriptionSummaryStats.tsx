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
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums"
          style={{ letterSpacing: "-0.02em" }}
        >
          {activeCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          Active
        </p>
      </div>
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums"
          style={{ letterSpacing: "-0.02em" }}
        >
          {pausedCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          Paused
        </p>
      </div>
      <div className="bg-white border border-black/12 p-4 text-center">
        <p
          className="text-xl font-semibold text-black mb-0.5 tabular-nums opacity-60"
          style={{ letterSpacing: "-0.02em" }}
        >
          {pastCount}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          Past
        </p>
      </div>
    </div>
  );
}
