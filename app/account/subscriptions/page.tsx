"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/app/components/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useSubscriptions, Subscription } from "@/app/hooks/useSubscriptions";
import { CancellationModal } from "@/app/components/subscriptions/CancellationModal";
import { EditSubscriptionModal } from "@/app/components/subscriptions/EditSubscriptionModal";
import type { SubscriptionInterval } from "@/app/types";

// Subscription tier type (used for cancellation modal)
type SubscriptionTier = "starter" | "pro" | "max";

export default function SubscriptionsPage() {
  const router = useRouter();
  const { customer, isAuthenticated, loading: authLoading } = useAuth();
  const {
    subscriptions,
    loading,
    error,
    fetchSubscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
    changePlan,
  } = useSubscriptions();

  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showEditModal, setShowEditModal] = useState<Subscription | null>(null);
  const [successMessage, setSuccessMessage] = useState<{
    subscriptionId: string;
    message: string;
  } | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/account/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch subscriptions when customer is available
  useEffect(() => {
    if (customer) {
      fetchSubscriptions();
    }
  }, [customer, fetchSubscriptions]);

  // Format price
  const formatPrice = (amount: string, currencyCode: string = "GBP") => {
    const num = parseFloat(amount);
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currencyCode,
    }).format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format interval
  const formatInterval = (interval: Subscription["interval"]) => {
    const unit = interval.value === 1 ? interval.unit : `${interval.unit}s`;
    return `Every ${interval.value} ${unit}`;
  };

  // Get interval key for comparison
  const getIntervalKey = (interval: SubscriptionInterval) =>
    `${interval.value}-${interval.unit}`;

  // Get status badge color
  const getStatusColor = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle pause/resume
  const handleTogglePause = async (subscription: Subscription) => {
    setActionLoading(subscription.id);
    if (subscription.status === "paused") {
      await resumeSubscription(subscription.id);
    } else {
      await pauseSubscription(subscription.id);
    }
    // Refresh subscriptions
    await fetchSubscriptions();
    setActionLoading(null);
  };

  // Handle cancel
  const handleCancel = async (subscriptionId: string) => {
    setActionLoading(subscriptionId);
    const success = await cancelSubscription(subscriptionId, cancelReason);
    if (success) {
      setShowCancelModal(null);
      setCancelReason("");
      // Refresh subscriptions
      await fetchSubscriptions();
    }
    setActionLoading(null);
  };

  // Legacy: Determine tier from quantity (used by cancellation modal)
  const getTierFromQuantity = (quantity: number): SubscriptionTier => {
    if (quantity >= 28) return "max";
    if (quantity >= 12) return "pro";
    return "starter";
  };

  // Handle cancel from modal
  const handleCancelFromModal = async (
    reason: string,
    comment?: string,
  ): Promise<boolean> => {
    if (!showCancelModal) return false;
    const success = await cancelSubscription(showCancelModal, reason);
    if (success) {
      await fetchSubscriptions();
    }
    return success;
  };

  // Handle edit/change plan (called from EditSubscriptionModal)
  const handleChangePlan = async (
    protocolId: string,
    plan: "starter" | "pro" | "max",
  ): Promise<{ success: boolean; message?: string }> => {
    if (!showEditModal)
      return { success: false, message: "No subscription selected" };
    const subscriptionId = showEditModal.id;
    setActionLoading(subscriptionId);
    const result = await changePlan(subscriptionId, plan, protocolId);
    setActionLoading(null);

    if (result.success) {
      // Close modal and show success message on the card
      setShowEditModal(null);
      setSuccessMessage({
        subscriptionId,
        message: "Plan updated successfully!",
      });
      // Refresh subscriptions to show new data
      await fetchSubscriptions();
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }

    return result;
  };

  // Get protocol ID from subscription (based on product title)
  const getProtocolFromSubscription = (subscription: Subscription): string => {
    const title = subscription.product?.title?.toLowerCase() || "";
    if (title.includes("resilience")) return "1";
    if (title.includes("precision")) return "2";
    if (title.includes("balance")) return "3";
    if (title.includes("ultimate")) return "4";
    return "1"; // Default to Resilience
  };

  // Get current plan from subscription - parse from product/variant title first, fallback to interval
  const getCurrentPlan = (
    subscription: Subscription,
  ): "starter" | "pro" | "max" => {
    // First, try to parse from product title or variant title (more reliable after Loop updates)
    const titleToCheck =
      `${subscription.product?.title || ""} ${subscription.product?.variantTitle || ""}`.toLowerCase();

    if (titleToCheck.includes("starter") || titleToCheck.includes("- 4")) {
      return "starter";
    }
    if (
      titleToCheck.includes("max") ||
      titleToCheck.includes("- 28") ||
      titleToCheck.includes("- 56")
    ) {
      return "max";
    }
    if (titleToCheck.includes("pro") || titleToCheck.includes("- 12")) {
      return "pro";
    }

    // Fallback to interval-based detection
    const { interval } = subscription;
    if (interval.unit === "week" && interval.value === 1) return "starter";
    if (interval.unit === "month" && interval.value === 1) return "max";
    return "pro"; // Default: bi-weekly (14 days)
  };

  // Protocol descriptions and formula breakdowns
  const protocolInfo: Record<
    string,
    {
      name: string;
      subtitle: string;
      description: string;
      tiers: Record<string, { flowCount: number; clarityCount: number }>;
    }
  > = {
    "1": {
      name: "Resilience",
      subtitle: "Build Resilience, Stay Sharp",
      description:
        "Daily adaptogen support with stress management. Flow-heavy for recovery and stress resilience.",
      tiers: {
        starter: { flowCount: 3, clarityCount: 1 },
        pro: { flowCount: 5, clarityCount: 1 },
        max: { flowCount: 6, clarityCount: 1 },
      },
    },
    "2": {
      name: "Precision",
      subtitle: "Peak Cognition, Zero Burnout",
      description:
        "Sustained mental clarity for demanding work. Clarity-heavy for cognitive enhancement.",
      tiers: {
        starter: { flowCount: 1, clarityCount: 3 },
        pro: { flowCount: 1, clarityCount: 5 },
        max: { flowCount: 1, clarityCount: 6 },
      },
    },
    "3": {
      name: "Balance",
      subtitle: "The Best of Both Worlds",
      description:
        "Comprehensive support with both formulas. Equal mix for all-round cognitive support.",
      tiers: {
        starter: { flowCount: 2, clarityCount: 2 },
        pro: { flowCount: 3, clarityCount: 3 },
        max: { flowCount: 4, clarityCount: 3 },
      },
    },
    "4": {
      name: "Ultimate",
      subtitle: "Maximum Power, Every Day",
      description:
        "Peak performance with daily dual-formula stack. Both formulas every single day.",
      tiers: {
        pro: { flowCount: 14, clarityCount: 14 },
        max: { flowCount: 28, clarityCount: 28 },
      },
    },
  };

  // Get tier display info based on protocol and plan
  const getTierDisplayInfo = (subscription: Subscription) => {
    const protocolId = getProtocolFromSubscription(subscription);
    const tier = getCurrentPlan(subscription);
    const isUltimate = protocolId === "4";

    // Tier names
    const tierNames: Record<string, string> = {
      starter: "Starter",
      pro: "Pro",
      max: "Max",
    };

    // Frequency display
    const frequencyDisplay: Record<string, string> = {
      starter: "Weekly",
      pro: "Bi-Weekly",
      max: "Monthly",
    };

    // Pricing (subscription prices with 20% discount)
    const standardPricing: Record<
      string,
      { price: number; shots: number; pricePerShot: number }
    > = {
      starter: { price: 11.99, shots: 4, pricePerShot: 3.0 },
      pro: { price: 31.99, shots: 12, pricePerShot: 2.67 },
      max: { price: 63.99, shots: 28, pricePerShot: 2.29 },
    };

    const ultimatePricing: Record<
      string,
      { price: number; shots: number; pricePerShot: number }
    > = {
      pro: { price: 63.99, shots: 28, pricePerShot: 2.29 },
      max: { price: 115.99, shots: 56, pricePerShot: 2.07 },
    };

    const pricing = isUltimate ? ultimatePricing : standardPricing;
    const tierPricing = pricing[tier] || standardPricing.pro;

    // Get formula breakdown
    const protocol = protocolInfo[protocolId];
    const formulaBreakdown = protocol?.tiers[tier] || {
      flowCount: 0,
      clarityCount: 0,
    };

    return {
      tierName: tierNames[tier],
      frequency: frequencyDisplay[tier],
      price: tierPricing.price,
      shots: tierPricing.shots,
      pricePerShot: tierPricing.pricePerShot,
      protocolId,
      tier,
      protocolName: protocol?.name || "Protocol",
      protocolSubtitle: protocol?.subtitle || "",
      protocolDescription: protocol?.description || "",
      flowCount: formulaBreakdown.flowCount,
      clarityCount: formulaBreakdown.clarityCount,
      isUltimate,
    };
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div
        className="min-h-screen theme-conka-flow flex items-center justify-center"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-current/20 border-t-current rounded-full animate-spin mx-auto mb-4" />
          <p className="font-clinical text-sm opacity-50">
            Loading subscriptions...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Separate active/paused from cancelled/expired
  // Now using Shopify's native API which returns accurate data
  const activeSubscriptions = subscriptions.filter(
    (s) => s.status === "active" || s.status === "paused",
  );
  const inactiveSubscriptions = subscriptions.filter(
    (s) => s.status === "cancelled" || s.status === "expired",
  );

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <main className="pt-24 pb-24 lg:pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/account"
              className="p-2 hover:opacity-70 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <div>
              <p className="font-commentary text-lg opacity-70">manage your</p>
              <h1 className="text-3xl font-bold">Subscriptions</h1>
            </div>
          </div>

          {/* Summary Stats */}
          {subscriptions.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-green-600">
                  {
                    activeSubscriptions.filter((s) => s.status === "active")
                      .length
                  }
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">
                  Active
                </p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold text-yellow-600">
                  {
                    activeSubscriptions.filter((s) => s.status === "paused")
                      .length
                  }
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">
                  Paused
                </p>
              </div>
              <div className="neo-box p-4 text-center">
                <p className="font-clinical text-2xl font-bold opacity-50">
                  {inactiveSubscriptions.length}
                </p>
                <p className="font-clinical text-xs opacity-50 uppercase">
                  Past
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="neo-box p-6 text-center mb-6 border-red-200 bg-red-50">
              <p className="text-red-600 font-clinical">{error}</p>
            </div>
          )}

          {/* Subscriptions List */}
          {subscriptions.length === 0 ? (
            <div className="neo-box p-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 opacity-30"
              >
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              <h2 className="font-bold text-xl mb-2">
                No active subscriptions
              </h2>
              <p className="font-clinical text-sm opacity-70 mb-6">
                Subscribe to your favorite protocols for automatic deliveries
                and save money
              </p>
              <Link
                href="/quiz"
                className="neo-button px-8 py-3 font-bold inline-flex items-center gap-2"
              >
                Find Your Protocol
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Subscriptions */}
              {activeSubscriptions.length > 0 && (
                <div>
                  <h2 className="font-clinical text-xs uppercase opacity-50 mb-4">
                    Active & Paused Subscriptions
                  </h2>
                  <div className="space-y-4">
                    {activeSubscriptions.map((subscription) => (
                      <div
                        key={subscription.id}
                        className="neo-box overflow-hidden"
                      >
                        {/* Subscription Header */}
                        <div className="p-6">
                          {(() => {
                            const info = getTierDisplayInfo(subscription);
                            return (
                              <>
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                  <div className="flex gap-4">
                                    {/* Product Image */}
                                    {subscription.product.image ? (
                                      <div className="w-20 h-20 rounded-lg bg-current/5 flex-shrink-0 overflow-hidden">
                                        <img
                                          src={subscription.product.image}
                                          alt={subscription.product.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex-shrink-0 flex items-center justify-center">
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
                                          className="text-amber-600"
                                        >
                                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                          <path d="M22 12A10 10 0 0 0 12 2v10z" />
                                        </svg>
                                      </div>
                                    )}
                                    <div>
                                      <h3 className="font-bold text-lg mb-1">
                                        {subscription.product.title}
                                      </h3>
                                      {/* Tier Badge & Subtitle */}
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 bg-gray-100 text-xs font-bold">
                                          {info.tierName}
                                        </span>
                                        <span className="font-clinical text-xs opacity-60">
                                          {info.protocolSubtitle}
                                        </span>
                                      </div>
                                      <p className="text-xs opacity-50 mb-2 max-w-md">
                                        {info.protocolDescription}
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold self-start ${getStatusColor(
                                      subscription.status,
                                    )}`}
                                  >
                                    {subscription.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      subscription.status.slice(1)}
                                  </span>
                                </div>

                                {/* Subscription Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                                  {/* Frequency */}
                                  <div>
                                    <p className="font-clinical text-xs uppercase opacity-40 mb-1">
                                      Delivery
                                    </p>
                                    <p className="font-bold text-sm">
                                      {info.frequency}
                                    </p>
                                  </div>
                                  {/* Price */}
                                  <div>
                                    <p className="font-clinical text-xs uppercase opacity-40 mb-1">
                                      Price
                                    </p>
                                    <p className="font-bold text-sm">
                                      £{info.price.toFixed(2)}
                                    </p>
                                  </div>
                                  {/* Shots */}
                                  <div>
                                    <p className="font-clinical text-xs uppercase opacity-40 mb-1">
                                      Shots
                                    </p>
                                    <p className="font-bold text-sm">
                                      {info.shots} per delivery
                                    </p>
                                  </div>
                                  {/* Price Per Shot */}
                                  <div>
                                    <p className="font-clinical text-xs uppercase opacity-40 mb-1">
                                      Per Shot
                                    </p>
                                    <p className="font-bold text-sm">
                                      £{info.pricePerShot.toFixed(2)}
                                    </p>
                                  </div>
                                </div>

                                {/* Formula Breakdown */}
                                <div className="flex items-center gap-4 mb-4 p-3 border-2 border-dashed border-gray-200 rounded-lg">
                                  <p className="font-clinical text-xs uppercase opacity-40">
                                    Formula Mix
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                                      <span className="font-clinical text-sm">
                                        {info.flowCount}x Flow
                                      </span>
                                    </div>
                                    <span className="opacity-30">+</span>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-3 h-3 rounded-full bg-[#AAB9BC]" />
                                      <span className="font-clinical text-sm">
                                        {info.clarityCount}x Clear
                                      </span>
                                    </div>
                                  </div>
                                  <span className="font-clinical text-xs opacity-40 ml-auto">
                                    {info.isUltimate ? "per delivery" : "/week"}
                                  </span>
                                </div>
                              </>
                            );
                          })()}

                          {/* Success Message */}
                          {successMessage?.subscriptionId ===
                            subscription.id && (
                            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 mb-4 animate-pulse">
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
                                  className="text-green-600"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                  <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <p className="font-bold text-sm text-green-800">
                                  {successMessage.message}
                                </p>
                                <button
                                  onClick={() => setSuccessMessage(null)}
                                  className="ml-auto text-green-600 hover:text-green-800"
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

                          {/* Next Billing Date */}
                          {subscription.status === "active" &&
                            !successMessage?.subscriptionId && (
                              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
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
                                    className="text-green-600"
                                  >
                                    <rect
                                      x="3"
                                      y="4"
                                      width="18"
                                      height="18"
                                      rx="2"
                                      ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                  <div>
                                    <p className="font-clinical text-sm text-green-800">
                                      <span className="opacity-70">
                                        Next delivery:
                                      </span>{" "}
                                      <span className="font-bold">
                                        {formatDate(
                                          subscription.nextBillingDate,
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                          {subscription.status === "paused" && (
                            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
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
                                  className="text-yellow-600"
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="10" y1="15" x2="10" y2="9" />
                                  <line x1="14" y1="15" x2="14" y2="9" />
                                </svg>
                                <p className="font-clinical text-sm text-yellow-800">
                                  This subscription is paused. Resume to
                                  continue deliveries.
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Unfulfilled Order Warning */}
                          {subscription.hasUnfulfilledOrder &&
                            subscription.status === "active" && (
                              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
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
                                    className="text-blue-600 flex-shrink-0 mt-0.5"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4" />
                                    <path d="M12 8h.01" />
                                  </svg>
                                  <div>
                                    <p className="font-clinical text-sm text-blue-800 font-medium mb-1">
                                      {subscription.unfulfilledOrdersCount ===
                                        1 ||
                                      !subscription.unfulfilledOrdersCount
                                        ? "You have an order being prepared"
                                        : `You have ${subscription.unfulfilledOrdersCount} orders being prepared`}
                                    </p>
                                    <p className="font-clinical text-xs text-blue-700">
                                      Any plan changes will take effect on your
                                      next delivery. If you need to adjust a
                                      pending order, please{" "}
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

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3">
                            {/* Edit Button */}
                            <button
                              onClick={() => setShowEditModal(subscription)}
                              disabled={actionLoading === subscription.id}
                              className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
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

                            {/* Pause/Resume Button */}
                            <button
                              onClick={() => handleTogglePause(subscription)}
                              disabled={actionLoading === subscription.id}
                              className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
                            >
                              {actionLoading === subscription.id ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
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

                            {/* Cancel Button - styled consistently */}
                            <button
                              onClick={() =>
                                setShowCancelModal(subscription.id)
                              }
                              disabled={actionLoading === subscription.id}
                              className="neo-button-outline px-4 py-2 text-sm font-semibold disabled:opacity-50 flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50"
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
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Subscriptions */}
              {inactiveSubscriptions.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-clinical text-xs uppercase opacity-50 mb-4">
                    Past Subscriptions
                  </h2>
                  <div className="space-y-3">
                    {inactiveSubscriptions.map((subscription) => (
                      <div
                        key={subscription.id}
                        className="neo-box p-4 opacity-60"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-current/5 flex-shrink-0 flex items-center justify-center">
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
                                className="opacity-50"
                              >
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                                <path d="M22 12A10 10 0 0 0 12 2v10z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-bold text-sm">
                                {subscription.product.title}
                              </p>
                              <p className="font-clinical text-xs opacity-70">
                                {formatInterval(subscription.interval)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                              subscription.status,
                            )}`}
                          >
                            {subscription.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 neo-box p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="font-clinical text-sm opacity-70 mb-4">
              Our team is here to help with any subscription questions
            </p>
            <a
              href="mailto:support@conka.com"
              className="neo-button-outline px-6 py-2 font-semibold text-sm inline-flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
              Contact Support
            </a>
          </div>
        </div>
      </main>

      {/* Cancel Confirmation Modal with Retention Flow */}
      <CancellationModal
        isOpen={!!showCancelModal}
        onClose={() => {
          setShowCancelModal(null);
          setCancelReason("");
        }}
        onCancel={handleCancelFromModal}
        subscriptionName={
          subscriptions.find((s) => s.id === showCancelModal)?.product.title ||
          "Subscription"
        }
        currentPlan={
          showCancelModal
            ? getTierFromQuantity(
                subscriptions.find((s) => s.id === showCancelModal)?.quantity ||
                  12,
              )
            : undefined
        }
      />

      {/* Edit Subscription Modal */}
      <EditSubscriptionModal
        isOpen={!!showEditModal}
        onClose={() => setShowEditModal(null)}
        onSave={handleChangePlan}
        subscriptionName={showEditModal?.product.title || "Subscription"}
        currentProtocolId={
          showEditModal ? getProtocolFromSubscription(showEditModal) : "1"
        }
        currentTier={showEditModal ? getCurrentPlan(showEditModal) : "pro"}
        nextBillingDate={showEditModal?.nextBillingDate}
        loading={actionLoading === showEditModal?.id}
        hasUnfulfilledFirstOrder={showEditModal?.hasUnfulfilledOrder ?? false}
      />
    </div>
  );
}
