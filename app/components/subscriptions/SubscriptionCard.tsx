import type { Subscription } from "@/app/hooks/useSubscriptions";
import type { TierDisplayInfo } from "@/app/account/subscriptions/utils";
import { formatDate, getStatusColor, getProtocolFromSubscription } from "@/app/account/subscriptions/utils";
import { getProtocolImage } from "@/app/lib/productImageConfig";

interface SubscriptionCardProps {
  subscription: Subscription;
  tierInfo: TierDisplayInfo;
  successMessage: string | null;
  isActionLoading: boolean;
  onEdit: () => void;
  onTogglePause: () => void;
  onCancel: () => void;
  onDismissSuccess: () => void;
}

export function SubscriptionCard({
  subscription,
  tierInfo: info,
  successMessage,
  isActionLoading,
  onEdit,
  onTogglePause,
  onCancel,
  onDismissSuccess,
}: SubscriptionCardProps) {
  const isMultiLine = subscription.isMultiLine ?? (subscription.lines?.length ?? 0) > 1;
  const lines = subscription.lines?.length ? subscription.lines : [{
    id: subscription.product?.id || '0',
    productTitle: subscription.product?.title || 'Subscription',
    variantTitle: subscription.product?.variantTitle ?? '',
    price: subscription.price?.amount ?? '0',
    quantity: subscription.quantity ?? 1,
  }];
  const productImage = subscription.product.image || getProtocolImage(getProtocolFromSubscription(subscription)) || "";
  return (
    <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm p-6 md:p-8 space-y-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex gap-5 min-w-0">
            {productImage ? (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex-shrink-0 overflow-hidden">
                <img
                  src={productImage}
                  alt={subscription.product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex-shrink-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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
            )}
            <div className="min-w-0">
              {isMultiLine ? (
                <>
                  <h3
                    className="font-semibold text-lg text-[var(--color-ink)] mb-2"
                    style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
                  >
                    {lines.length} products
                  </h3>
                  <ul className="space-y-2">
                    {lines.map((line, idx) => (
                      <li key={line.id ?? idx} className="premium-body-sm flex items-baseline justify-between gap-2">
                        <span className="text-[var(--color-ink)]">
                          {line.productTitle}{line.variantTitle ? ` · ${line.variantTitle}` : ''}
                        </span>
                        <span className="text-[var(--text-on-light-muted)] shrink-0">
                          £{typeof line.price === 'number' ? line.price.toFixed(2) : line.price} × {line.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h3
                    className="font-semibold text-lg text-[var(--color-ink)] mb-1.5"
                    style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
                  >
                    {subscription.product.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-1 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] premium-body-sm font-medium text-[var(--color-ink)]">
                      {info.tierName}
                    </span>
                    <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                      {info.protocolSubtitle}
                    </span>
                  </div>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)] max-w-[50ch]">
                    {info.protocolDescription}
                  </p>
                </>
              )}
            </div>
          </div>
          <span
            className={`px-3 py-1.5 rounded-[var(--premium-radius-interactive)] premium-body-sm font-semibold flex-shrink-0 ${getStatusColor(
              subscription.status
            )}`}
          >
            {subscription.status.charAt(0).toUpperCase() +
              subscription.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-bg-soft)] border border-[var(--color-premium-stroke)]">
          <div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">
              Delivery
            </p>
            <p className="font-semibold text-[var(--color-ink)]">
              {info.frequency}
            </p>
          </div>
          <div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">
              Price
            </p>
            <p className="font-semibold text-[var(--color-ink)]">
              £{info.price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">
              Shots
            </p>
            <p className="font-semibold text-[var(--color-ink)]">
              {info.shots} per delivery
            </p>
          </div>
          <div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-1">
              Per shot
            </p>
            <p className="font-semibold text-[var(--color-ink)]">
              £{info.pricePerShot.toFixed(2)}
            </p>
          </div>
        </div>

        {!isMultiLine && (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
          <span className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide">
            Formula mix
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="premium-body-sm text-[var(--color-ink)]">
                {info.flowCount}× Flow
              </span>
            </div>
            <span className="text-[var(--text-on-light-muted)]">+</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500" />
              <span className="premium-body-sm text-[var(--color-ink)]">
                {info.clarityCount}× Clarity
              </span>
            </div>
          </div>
          <span className="premium-body-sm text-[var(--text-on-light-muted)] ml-auto">
            {info.isUltimate ? "per delivery" : "per week"}
          </span>
        </div>
        )}

      </div>

      {successMessage && (
        <div className="rounded-[var(--premium-radius-nested)] border border-green-300 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 flex-shrink-0"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="premium-body-sm font-medium text-green-800 flex-1">
              {successMessage}
            </p>
            <button
              onClick={onDismissSuccess}
              className="text-green-600 hover:text-green-800 p-1"
              aria-label="Dismiss"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {subscription.status === "active" && !successMessage && (
        <div className="rounded-[var(--premium-radius-nested)] border border-green-200 bg-green-50/80 p-4">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 flex-shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="premium-body-sm text-green-800">
              <span className="text-green-700">Next delivery:</span>{" "}
              <span className="font-semibold">
                {formatDate(subscription.nextBillingDate)}
              </span>
            </p>
          </div>
        </div>
      )}

      {subscription.status === "paused" && (
        <div className="rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)] p-4">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-ink)] flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="10" y1="15" x2="10" y2="9" />
              <line x1="14" y1="15" x2="14" y2="9" />
            </svg>
            <p className="premium-body-sm text-[var(--color-ink)]">
              This subscription is paused. Resume to continue deliveries.
            </p>
          </div>
        </div>
      )}

      {subscription.hasUnfulfilledOrder && subscription.status === "active" && (
        <div className="rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-light)] bg-[var(--color-neuro-blue-light)]/30 p-4">
          <div className="flex items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-neuro-blue-dark)] flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <div className="min-w-0">
              <p className="premium-body-sm font-medium text-[var(--color-neuro-blue-dark)] mb-1">
                {subscription.unfulfilledOrdersCount === 1 ||
                !subscription.unfulfilledOrdersCount
                  ? "You have an order being prepared"
                  : `You have ${subscription.unfulfilledOrdersCount} orders being prepared`}
              </p>
              <p className="premium-body-sm text-blue-700">
                Any plan changes will apply to your next delivery. To change a
                pending order,{" "}
                <a
                  href="mailto:support@conka.io"
                  className="underline font-medium"
                >
                  contact support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {isMultiLine ? (
          <a
            href={`mailto:support@conka.io?subject=${encodeURIComponent(`Multi-product subscription: ${subscription.id}`)}&body=${encodeURIComponent(`Hi, I'd like to change my subscription plan. Subscription ID: ${subscription.id}`)}`}
            className="rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-5 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 flex items-center gap-2 transition-opacity no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
            Contact support to change plan
          </a>
        ) : (
        <button
          onClick={onEdit}
          disabled={isActionLoading}
          className="rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-5 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        )}
        <button
          onClick={onTogglePause}
          disabled={isActionLoading}
          className="rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-ink)]/40 bg-[var(--color-bone)] px-5 py-2.5 premium-body-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-premium-stroke)] hover:border-[var(--color-ink)]/50 disabled:opacity-50 flex items-center gap-2 transition-colors"
        >
          {isActionLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[var(--color-ink)]/20 border-t-[var(--color-ink)] rounded-full animate-spin" />
              Processing...
            </>
          ) : subscription.status === "paused" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Resume
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </>
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={isActionLoading}
          className="rounded-[var(--premium-radius-interactive)] border-2 border-red-400 bg-transparent px-5 py-2.5 premium-body-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 flex items-center gap-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          Cancel
        </button>
      </div>
    </div>
  );
}
