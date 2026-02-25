import type { Subscription } from "@/app/hooks/useSubscriptions";
import { formatInterval, getStatusColor } from "@/app/account/subscriptions/utils";

interface PastSubscriptionCardProps {
  subscription: Subscription;
}

export function PastSubscriptionCard({ subscription }: PastSubscriptionCardProps) {
  return (
    <div className="premium-card-soft premium-card-soft-stroke p-5 opacity-75">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex-shrink-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--text-on-light-muted)]"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[var(--color-ink)]">
              {subscription.product.title}
            </p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              {formatInterval(subscription.interval)}
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-[var(--premium-radius-interactive)] premium-body-sm font-semibold flex-shrink-0 ${getStatusColor(
            subscription.status
          )}`}
        >
          {subscription.status}
        </span>
      </div>
    </div>
  );
}
