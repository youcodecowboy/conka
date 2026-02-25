import type { Subscription } from "@/app/hooks/useSubscriptions";

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatInterval(interval: Subscription["interval"]): string {
  const unit = interval.value === 1 ? interval.unit : `${interval.unit}s`;
  return `Every ${interval.value} ${unit}`;
}

export function getStatusColor(status: Subscription["status"]): string {
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
}

export function getProtocolFromSubscription(subscription: Subscription): string {
  const title = subscription.product?.title?.toLowerCase() || "";
  if (title.includes("resilience")) return "1";
  if (title.includes("precision")) return "2";
  if (title.includes("balance")) return "3";
  if (title.includes("ultimate")) return "4";
  return "1";
}

export function getCurrentPlan(
  subscription: Subscription
): "starter" | "pro" | "max" {
  const titleToCheck =
    `${subscription.product?.title || ""} ${subscription.product?.variantTitle || ""}`.toLowerCase();

  if (titleToCheck.includes("starter") || titleToCheck.includes("- 4"))
    return "starter";
  if (
    titleToCheck.includes("max") ||
    titleToCheck.includes("- 28") ||
    titleToCheck.includes("- 56")
  )
    return "max";
  if (titleToCheck.includes("pro") || titleToCheck.includes("- 12"))
    return "pro";

  const { interval } = subscription;
  if (interval.unit === "week" && interval.value === 1) return "starter";
  if (interval.unit === "month" && interval.value === 1) return "max";
  return "pro";
}

const PROTOCOL_INFO: Record<
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

export interface TierDisplayInfo {
  tierName: string;
  frequency: string;
  price: number;
  shots: number;
  pricePerShot: number;
  protocolId: string;
  tier: "starter" | "pro" | "max";
  protocolName: string;
  protocolSubtitle: string;
  protocolDescription: string;
  flowCount: number;
  clarityCount: number;
  isUltimate: boolean;
}

export function getTierDisplayInfo(subscription: Subscription): TierDisplayInfo {
  const protocolId = getProtocolFromSubscription(subscription);
  const tier = getCurrentPlan(subscription);
  const isUltimate = protocolId === "4";

  const tierNames: Record<string, string> = {
    starter: "Starter",
    pro: "Pro",
    max: "Max",
  };
  const frequencyDisplay: Record<string, string> = {
    starter: "Weekly",
    pro: "Bi-Weekly",
    max: "Monthly",
  };
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
  const protocol = PROTOCOL_INFO[protocolId];
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
}
