"use client";

import Link from "next/link";
import type { Order } from "@/app/account/orders/utils";
import {
  ORDER_STEPS,
  formatPrice,
  formatDate,
  formatRelativeTime,
  getOrderProgress,
  getStatusColor,
} from "@/app/account/orders/utils";
import { ContactSupportLink } from "@/app/components/ContactSupportLink";

function OrderStatusIcon({ status }: { status: string }) {
  switch (status?.toLowerCase()) {
    case "fulfilled":
      return (
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
          className="text-green-600"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "paid":
      return (
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
          className="text-green-600"
        >
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "unfulfilled":
    case "in_progress":
      return (
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
          className="text-blue-600"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    default:
      return (
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
          className="text-gray-400"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

export function OrderCard({ order, isExpanded, onToggle }: OrderCardProps) {
  const progress = getOrderProgress(order);
  const firstItemImage = order.lineItems[0]?.image;
  const displayStatus =
    order.fulfillmentStatus || order.financialStatus || "Processing";
  const itemCount = order.lineItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="rounded-[var(--premium-radius-card)] bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-[var(--color-premium-bg-soft)] transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0">
            {firstItemImage?.url ? (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex-shrink-0 overflow-hidden">
                <img
                  src={firstItemImage.url}
                  alt={firstItemImage.altText || "Order item"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex-shrink-0 flex items-center justify-center">
                <OrderStatusIcon status={displayStatus} />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3
                  className="font-semibold text-lg text-[var(--color-ink)]"
                  style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
                >
                  Order #{order.orderNumber}
                </h3>
                <span
                  className={`px-2.5 py-1 rounded-[var(--premium-radius-nested)] text-xs font-semibold ${
                    progress.cancelled
                      ? "bg-red-100 text-red-800"
                      : getStatusColor(displayStatus)
                  }`}
                >
                  {progress.cancelled
                    ? "Cancelled"
                    : displayStatus}
                </span>
              </div>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {formatDate(order.processedAt)} ·{" "}
                {formatRelativeTime(order.processedAt)}
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                {order.lineItems
                  .map((item) => item.title)
                  .slice(0, 2)
                  .join(", ")}
                {order.lineItems.length > 2 &&
                  ` +${order.lineItems.length - 2} more`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <p
                className="font-semibold text-lg text-[var(--color-ink)]"
                style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
              >
                {formatPrice(
                  order.totalPrice.amount,
                  order.totalPrice.currencyCode
                )}
              </p>
              <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            </div>
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
              className={`transition-transform flex-shrink-0 text-[var(--color-ink)] ${isExpanded ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[var(--color-premium-stroke)]">
          <div className="p-6 rounded-b-[var(--premium-radius-card)]" style={{ backgroundColor: "var(--color-neuro-blue-light)" }}>
            <p className="premium-body-sm text-[var(--color-neuro-blue-dark)] uppercase tracking-wide font-semibold mb-4">
              Order Status
            </p>
            {progress.cancelled ? (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-[var(--premium-radius-nested)]">
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
                  className="text-red-600 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>
                  <p className="font-semibold text-sm text-red-800">
                    Order Cancelled
                  </p>
                  {order.cancelReason && (
                    <p className="premium-body-sm text-red-700 mt-0.5">
                      Reason: {order.cancelReason}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute top-3 left-0 right-0 h-0.5 bg-[var(--color-premium-stroke)] mx-[calc(10%)]" />
                <div
                  className="absolute top-3 left-0 h-0.5 bg-green-500 mx-[calc(10%)] transition-all duration-500"
                  style={{
                    width: `calc(${(Math.min(progress.current, 4) / 4) * 80}%)`,
                  }}
                />
                <div className="relative flex items-start justify-between">
                  {ORDER_STEPS.map((step, index) => {
                    const isCompleted = progress.completed.includes(index);
                    const isCurrent = progress.current === index;
                    const isPast = index < progress.current;
                    const isActive = isCompleted || isCurrent;
                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center"
                        style={{ width: "20%" }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 transition-all ${
                            isCompleted || isPast
                              ? "bg-green-500 text-white"
                              : isCurrent
                                ? "bg-green-500 text-white ring-4 ring-green-100"
                                : "bg-[var(--color-premium-stroke)] text-[var(--text-on-light-muted)]"
                          }`}
                        >
                          {isCompleted || isPast ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <p
                          className={`premium-body-sm mt-2 text-center ${
                            isActive
                              ? "text-[var(--color-ink)] font-semibold"
                              : "text-[var(--text-on-light-muted)]"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {order.shippingAddress && (
            <div className="p-6 bg-[var(--color-bone)]">
              <div className="p-4 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
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
                    className="text-[var(--text-on-light-muted)] flex-shrink-0 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm text-[var(--color-ink)] mb-1">
                      Delivery Address
                    </p>
                    <div className="premium-body-sm text-[var(--text-on-light-muted)] space-y-0.5">
                      {order.shippingAddress.address1 && (
                        <p>{order.shippingAddress.address1}</p>
                      )}
                      {order.shippingAddress.address2 && (
                        <p>{order.shippingAddress.address2}</p>
                      )}
                      <p>
                        {[
                          order.shippingAddress.city,
                          order.shippingAddress.province,
                          order.shippingAddress.zip,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                      {order.shippingAddress.country && (
                        <p>{order.shippingAddress.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 pt-0 bg-[var(--color-bone)]">
            <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-4">
              Items
            </p>
            <div className="space-y-3">
              {order.lineItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.image?.url ? (
                      <div className="w-12 h-12 rounded-[var(--premium-radius-nested)] overflow-hidden flex-shrink-0">
                        <img
                          src={item.image.url}
                          alt={item.image.altText || item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)] flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
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
                      <span className="font-semibold text-sm text-[var(--color-ink)] block">
                        {item.title}
                      </span>
                      <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                        {formatPrice(
                          item.price.amount,
                          item.price.currencyCode
                        )}{" "}
                        each
                      </span>
                    </div>
                  </div>
                  <span className="premium-body-sm text-[var(--text-on-light-muted)] flex-shrink-0">
                    × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-premium-stroke)]">
              <p className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-3">
                Order Summary
              </p>
              <div className="space-y-2">
                {order.subtotal && (
                  <div className="flex justify-between premium-body-sm">
                    <span className="text-[var(--text-on-light-muted)]">
                      Subtotal
                    </span>
                    <span className="text-[var(--color-ink)]">
                      {formatPrice(
                        order.subtotal.amount,
                        order.subtotal.currencyCode
                      )}
                    </span>
                  </div>
                )}
                {order.totalShipping &&
                  parseFloat(order.totalShipping.amount) > 0 && (
                    <div className="flex justify-between premium-body-sm">
                      <span className="text-[var(--text-on-light-muted)]">
                        Shipping
                      </span>
                      <span className="text-[var(--color-ink)]">
                        {formatPrice(
                          order.totalShipping.amount,
                          order.totalShipping.currencyCode
                        )}
                      </span>
                    </div>
                  )}
                {order.totalShipping &&
                  parseFloat(order.totalShipping.amount) === 0 && (
                    <div className="flex justify-between premium-body-sm">
                      <span className="text-[var(--text-on-light-muted)]">
                        Shipping
                      </span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  )}
                {order.totalTax && parseFloat(order.totalTax.amount) > 0 && (
                  <div className="flex justify-between premium-body-sm">
                    <span className="text-[var(--text-on-light-muted)]">
                      Tax
                    </span>
                    <span className="text-[var(--color-ink)]">
                      {formatPrice(
                        order.totalTax.amount,
                        order.totalTax.currencyCode
                      )}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-[var(--color-premium-stroke)]">
                  <span className="font-semibold text-[var(--color-ink)]">
                    Total
                  </span>
                  <span
                    className="font-semibold text-xl text-[var(--color-ink)]"
                    style={{
                      letterSpacing: "var(--letter-spacing-premium-title)",
                    }}
                  >
                    {formatPrice(
                      order.totalPrice.amount,
                      order.totalPrice.currencyCode
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-6 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 transition-opacity"
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
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
                Order Again
              </Link>
              <ContactSupportLink
                subject={`Order #${order.orderNumber}`}
                variant="button-outline"
                icon="help"
              >
                Get Help
              </ContactSupportLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
