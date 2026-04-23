interface SubscriptionsPageHeaderProps {
  subtitle: string;
}

export function SubscriptionsPageHeader({ subtitle }: SubscriptionsPageHeaderProps) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Account · Subscriptions
      </p>
      <h1
        id="subscriptions-heading"
        className="text-3xl lg:text-4xl font-semibold text-black mb-2"
        style={{ letterSpacing: "-0.02em" }}
      >
        Subscriptions
      </h1>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
        {subtitle}
      </p>
    </div>
  );
}
