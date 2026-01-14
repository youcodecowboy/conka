"use client";

import { useState, useEffect, useRef } from "react";

type TierType = "starter" | "pro" | "max";

// Protocol data with actual product info and formula breakdowns
const PROTOCOLS = [
  {
    id: "1",
    name: "Resilience",
    subtitle: "Build Resilience, Stay Sharp",
    description: "Daily adaptogen support with stress management",
    icon: "shield",
    color: "amber",
    tiers: {
      starter: { flowCount: 3, clarityCount: 1, totalShots: 4 },
      pro: { flowCount: 5, clarityCount: 1, totalShots: 6 },
      max: { flowCount: 6, clarityCount: 1, totalShots: 7 },
    },
  },
  {
    id: "2",
    name: "Precision",
    subtitle: "Peak Cognition, Zero Burnout",
    description: "Sustained mental clarity for demanding work",
    icon: "bolt",
    color: "teal",
    tiers: {
      starter: { flowCount: 1, clarityCount: 3, totalShots: 4 },
      pro: { flowCount: 1, clarityCount: 5, totalShots: 6 },
      max: { flowCount: 1, clarityCount: 6, totalShots: 7 },
    },
  },
  {
    id: "3",
    name: "Balance",
    subtitle: "The Best of Both Worlds",
    description: "Comprehensive support with both formulas",
    icon: "balance",
    color: "mixed",
    tiers: {
      starter: { flowCount: 2, clarityCount: 2, totalShots: 4 },
      pro: { flowCount: 3, clarityCount: 3, totalShots: 6 },
      max: { flowCount: 4, clarityCount: 3, totalShots: 7 },
    },
  },
  {
    id: "4",
    name: "Ultimate",
    subtitle: "Maximum Power, Every Day",
    description: "Peak performance with daily dual-formula stack",
    icon: "crown",
    color: "purple",
    tiers: {
      pro: { flowCount: 14, clarityCount: 14, totalShots: 28 }, // Per delivery (bi-weekly)
      max: { flowCount: 28, clarityCount: 28, totalShots: 56 }, // Per delivery (monthly)
    },
  },
];

// Individual formulas (shown but not swappable from protocols)
const FORMULAS = [
  {
    id: "flow",
    name: "CONKA Flow",
    subtitle: "Caffeine-Free Focus",
    description: "Adaptogen blend for stress resilience & recovery",
    color: "amber",
  },
  {
    id: "clarity",
    name: "CONKA Clarity",
    subtitle: "Sharp Mind, Clear Head",
    description: "Nootropic blend for mental clarity & focus",
    color: "teal",
  },
];

// Tier pricing and delivery info
interface TierInfo {
  name: string;
  frequency: string;
  price: number;
  pricePerShot: number;
  billing: string;
  deliveryShots: number;
}

// Standard Protocols (1, 2, 3)
const STANDARD_TIERS: Record<TierType, TierInfo> = {
  starter: {
    name: "Starter",
    frequency: "Weekly",
    deliveryShots: 4,
    price: 11.99,
    pricePerShot: 3.0,
    billing: "Billed weekly",
  },
  pro: {
    name: "Pro",
    frequency: "Bi-Weekly",
    deliveryShots: 12,
    price: 31.99,
    pricePerShot: 2.67,
    billing: "Billed every 2 weeks",
  },
  max: {
    name: "Max",
    frequency: "Monthly",
    deliveryShots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: "Billed monthly",
  },
};

// Ultimate Protocol (4) - different pricing and delivery
const ULTIMATE_TIERS: Partial<Record<TierType, TierInfo>> = {
  pro: {
    name: "Pro",
    frequency: "Bi-Weekly",
    deliveryShots: 28,
    price: 63.99,
    pricePerShot: 2.29,
    billing: "Billed every 2 weeks",
  },
  max: {
    name: "Max",
    frequency: "Monthly",
    deliveryShots: 56,
    price: 115.99,
    pricePerShot: 2.07,
    billing: "Billed monthly",
  },
};

// Helper to get tier info based on protocol
const getTierInfo = (
  protocolId: string,
  tier: TierType,
): TierInfo | undefined => {
  if (protocolId === "4") {
    return ULTIMATE_TIERS[tier];
  }
  return STANDARD_TIERS[tier];
};

// Helper to get available tiers for a protocol
const getAvailableTiers = (protocolId: string): TierType[] => {
  if (protocolId === "4") return ["pro", "max"];
  return ["starter", "pro", "max"];
};

// Helper to get formula breakdown for a protocol tier
const getFormulaBreakdown = (protocolId: string, tier: TierType) => {
  const protocol = PROTOCOLS.find((p) => p.id === protocolId);
  if (!protocol) return null;
  return protocol.tiers[tier as keyof typeof protocol.tiers];
};

// Icons component
const Icon = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  switch (name) {
    case "shield":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "bolt":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "balance":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v18" />
          <path d="M5 8l7-2 7 2" />
          <circle cx="5" cy="11" r="3" />
          <circle cx="19" cy="11" r="3" />
        </svg>
      );
    case "crown":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <path d="M4 21h16" />
        </svg>
      );
    case "beaker":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 3h15" />
          <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
          <path d="M6 14h12" />
        </svg>
      );
    case "check":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case "close":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );
    case "calendar":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "lock":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "droplet":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    default:
      return null;
  }
};

// Formula breakdown component
const FormulaBreakdown = ({
  flowCount,
  clarityCount,
  isSelected,
  isUltimate = false,
}: {
  flowCount: number;
  clarityCount: number;
  isSelected: boolean;
  isUltimate?: boolean;
}) => {
  const perDeliveryText = isUltimate ? " per delivery" : "/week";
  return (
    <div
      className={`flex items-center gap-3 mt-2 ${isSelected ? "opacity-90" : "opacity-60"}`}
    >
      <div className="flex items-center gap-1">
        <div
          className={`w-3 h-3 rounded-full ${isSelected ? "bg-amber-400" : "bg-amber-500"}`}
        />
        <span className="font-clinical text-xs">{flowCount}x Flow</span>
      </div>
      <span className={isSelected ? "opacity-50" : "opacity-30"}>+</span>
      <div className="flex items-center gap-1">
        <div
          className={`w-3 h-3 rounded-full ${isSelected ? "bg-[#AAB9BC]" : "bg-[#AAB9BC]"}`}
        />
        <span className="font-clinical text-xs">{clarityCount}x Clarity</span>
      </div>
      <span
        className={`font-clinical text-xs ${isSelected ? "opacity-50" : "opacity-40"}`}
      >
        {perDeliveryText}
      </span>
    </div>
  );
};

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    protocolId: string,
    tier: TierType,
  ) => Promise<{ success: boolean; message?: string }>;
  currentProtocolId?: string;
  currentTier?: TierType;
  subscriptionName: string;
  nextBillingDate?: string;
  loading?: boolean;
  hasUnfulfilledFirstOrder?: boolean;
}

export function EditSubscriptionModal({
  isOpen,
  onClose,
  onSave,
  currentProtocolId = "1",
  currentTier = "pro",
  subscriptionName,
  nextBillingDate,
  loading = false,
  hasUnfulfilledFirstOrder = false,
}: EditSubscriptionModalProps) {
  const [selectedProtocol, setSelectedProtocol] = useState(currentProtocolId);
  const [selectedTier, setSelectedTier] = useState<TierType>(currentTier);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mobileStep, setMobileStep] = useState<"product" | "tier">("product");

  // Track initial values to show "Current" badge
  const initialProtocolRef = useRef(currentProtocolId);
  const initialTierRef = useRef(currentTier);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProtocol(currentProtocolId);
      setSelectedTier(currentTier);
      setError(null);
      setMobileStep("product");
      initialProtocolRef.current = currentProtocolId;
      initialTierRef.current = currentTier;
    }
  }, [isOpen, currentProtocolId, currentTier]);

  // Get available tiers for selected protocol
  const availableTiers = getAvailableTiers(selectedProtocol);

  // Adjust tier if not available
  useEffect(() => {
    if (!availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0]);
    }
  }, [selectedProtocol, availableTiers, selectedTier]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const result = await onSave(selectedProtocol, selectedTier);
      if (!result.success) {
        setError(result.message || "Failed to update subscription");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Check if anything changed
  const isProtocolChanged = selectedProtocol !== initialProtocolRef.current;
  const isTierChanged = selectedTier !== initialTierRef.current;
  const hasChanges = isProtocolChanged || isTierChanged;

  // Format next billing date
  const formattedNextBilling = nextBillingDate
    ? new Date(nextBillingDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  // Get selected protocol data
  const selectedProtocolData = PROTOCOLS.find((p) => p.id === selectedProtocol);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal - Desktop */}
      <div className="relative bg-white neo-box w-full max-w-4xl max-h-[90vh] overflow-hidden hidden md:flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-current px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Edit Plan</h2>
            <p className="font-clinical text-sm opacity-60">
              {subscriptionName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Column - Protocol Selection */}
          <div className="w-1/2 border-r-2 border-current p-6 overflow-y-auto">
            {/* Protocols Section */}
            <div className="mb-6">
              <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">
                Protocols
              </h3>
              <div className="space-y-2">
                {PROTOCOLS.map((protocol) => {
                  const isSelected = selectedProtocol === protocol.id;
                  const isCurrent = protocol.id === initialProtocolRef.current;
                  return (
                    <button
                      key={protocol.id}
                      onClick={() => setSelectedProtocol(protocol.id)}
                      className={`w-full p-4 text-left transition-all ${
                        isSelected
                          ? "neo-box-inverted"
                          : "neo-box hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-white/20" : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            name={protocol.icon}
                            className={`w-5 h-5 ${isSelected ? "text-white" : ""}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold">{protocol.name}</span>
                            {isCurrent && (
                              <span
                                className={`text-xs font-bold px-2 py-0.5 ${
                                  isSelected ? "bg-white/20" : "bg-gray-200"
                                }`}
                              >
                                CURRENT
                              </span>
                            )}
                          </div>
                          <div
                            className={`font-clinical text-xs ${isSelected ? "opacity-70" : "opacity-50"}`}
                          >
                            {protocol.subtitle}
                          </div>
                          <div
                            className={`text-xs mt-1 ${isSelected ? "opacity-60" : "opacity-40"}`}
                          >
                            {protocol.description}
                          </div>
                        </div>
                        {isSelected && (
                          <Icon
                            name="check"
                            className="w-5 h-5 flex-shrink-0 mt-1"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-200 my-6" />

            {/* Individual Formulas Section - Not swappable */}
            <div>
              <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">
                Individual Formulas
              </h3>
              <p className="text-xs font-clinical opacity-50 mb-3">
                Switching to individual formulas requires a new subscription
              </p>
              <div className="space-y-2 opacity-60">
                {FORMULAS.map((formula) => (
                  <div
                    key={formula.id}
                    className="w-full p-4 text-left neo-box bg-gray-50 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          formula.color === "amber"
                            ? "bg-amber-100"
                            : "bg-[#AAB9BC]/20"
                        }`}
                      >
                        <Icon
                          name="beaker"
                          className={`w-5 h-5 ${
                            formula.color === "amber"
                              ? "text-amber-600"
                              : "text-[#AAB9BC]"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{formula.name}</span>
                          <Icon name="lock" className="w-3 h-3 opacity-50" />
                        </div>
                        <div className="font-clinical text-xs opacity-50">
                          {formula.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tier Selection */}
          <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
            {/* Protocol Summary */}
            {selectedProtocolData && (
              <div className="mb-4 p-4 bg-white neo-box">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name={selectedProtocolData.icon} className="w-5 h-5" />
                  <span className="font-bold">
                    {selectedProtocolData.name} Protocol
                  </span>
                </div>
                <p className="text-xs opacity-60">
                  {selectedProtocolData.description}
                </p>
              </div>
            )}

            <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-3">
              Select Frequency
            </h3>

            {/* Next Billing Info */}
            {formattedNextBilling && (
              <div className="mb-4 p-3 bg-white neo-box">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="calendar" className="w-4 h-4 opacity-50" />
                  <span className="font-clinical opacity-70">
                    Next billing:
                  </span>
                  <span className="font-bold">{formattedNextBilling}</span>
                </div>
              </div>
            )}

            {/* Protocol Tiers */}
            <div className="space-y-3">
              {availableTiers.map((tier) => {
                const tierInfo = getTierInfo(selectedProtocol, tier);
                const formulaBreakdown = getFormulaBreakdown(
                  selectedProtocol,
                  tier,
                );
                if (!tierInfo || !formulaBreakdown) return null;

                const isSelected = selectedTier === tier;
                const isCurrent =
                  tier === initialTierRef.current &&
                  selectedProtocol === initialProtocolRef.current;
                const isUltimate = selectedProtocol === "4";

                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-4 text-left transition-all ${
                      isSelected
                        ? "neo-box-inverted"
                        : "neo-box bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold">{tierInfo.name}</span>
                          {isCurrent && (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected ? "bg-white/20" : "bg-gray-200"
                              }`}
                            >
                              CURRENT
                            </span>
                          )}
                          {tier === "pro" && !isCurrent && (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected
                                  ? "bg-white/20"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              POPULAR
                            </span>
                          )}
                          {tier === "max" && !isCurrent && (
                            <span
                              className={`text-xs font-bold px-2 py-0.5 ${
                                isSelected
                                  ? "bg-white/20"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              BEST VALUE
                            </span>
                          )}
                        </div>
                        <div
                          className={`font-clinical text-sm mt-1 ${isSelected ? "opacity-80" : "opacity-60"}`}
                        >
                          {tierInfo.frequency} · {tierInfo.deliveryShots} shots
                          per delivery
                        </div>

                        {/* Formula Breakdown */}
                        <FormulaBreakdown
                          flowCount={formulaBreakdown.flowCount}
                          clarityCount={formulaBreakdown.clarityCount}
                          isSelected={isSelected}
                          isUltimate={isUltimate}
                        />

                        <div
                          className={`font-clinical text-xs mt-2 ${isSelected ? "opacity-60" : "opacity-40"}`}
                        >
                          {tierInfo.billing}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          £{tierInfo.price.toFixed(2)}
                        </div>
                        <div
                          className={`font-clinical text-xs ${isSelected ? "opacity-70" : "opacity-50"}`}
                        >
                          £{tierInfo.pricePerShot.toFixed(2)}/shot
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className={`mt-3 pt-3 border-t flex items-center gap-2 text-sm ${
                          isSelected ? "border-white/20" : "border-gray-200"
                        }`}
                      >
                        <Icon name="check" className="w-4 h-4" />
                        <span className="font-clinical">
                          20% subscription discount applied
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-current p-6">
          {/* Warning for unfulfilled first order */}
          {hasUnfulfilledFirstOrder && hasChanges && (
            <div className="mb-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
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
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="font-clinical text-xs text-blue-800">
                  This change will take effect on your{" "}
                  <strong>next delivery</strong>. Your first order is already
                  being prepared. Need to adjust it?{" "}
                  <a
                    href="mailto:support@conka.io"
                    className="underline font-medium"
                  >
                    Contact support
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-clinical">
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="font-clinical text-sm opacity-60">
              {hasChanges ? (
                <span className="text-green-700 font-medium">
                  → {PROTOCOLS.find((p) => p.id === selectedProtocol)?.name} ·{" "}
                  {getTierInfo(selectedProtocol, selectedTier)?.name}
                </span>
              ) : (
                "No changes"
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="neo-button-outline px-6 py-2.5 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving || loading}
                className="neo-button px-6 py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Mobile */}
      <div className="relative bg-white neo-box w-full max-h-[90vh] overflow-hidden flex flex-col md:hidden">
        {/* Header */}
        <div className="border-b-2 border-current px-4 py-3 flex items-center justify-between">
          <div>
            <h2 className="font-bold">Edit Plan</h2>
            <p className="font-clinical text-xs opacity-60 truncate">
              {subscriptionName}
            </p>
          </div>
          <button onClick={onClose} className="p-2">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Steps */}
        <div className="flex border-b-2 border-current">
          <button
            onClick={() => setMobileStep("product")}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mobileStep === "product" ? "bg-black text-white" : ""
            }`}
          >
            1. Protocol
          </button>
          <button
            onClick={() => setMobileStep("tier")}
            className={`flex-1 py-3 text-sm font-semibold border-l-2 border-current transition-colors ${
              mobileStep === "tier" ? "bg-black text-white" : ""
            }`}
          >
            2. Frequency
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {mobileStep === "product" ? (
            <div className="space-y-4">
              {/* Protocols */}
              <div>
                <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-2">
                  Protocols
                </h3>
                <div className="space-y-2">
                  {PROTOCOLS.map((protocol) => {
                    const isSelected = selectedProtocol === protocol.id;
                    const isCurrent =
                      protocol.id === initialProtocolRef.current;
                    return (
                      <button
                        key={protocol.id}
                        onClick={() => {
                          setSelectedProtocol(protocol.id);
                          setMobileStep("tier");
                        }}
                        className={`w-full p-3 text-left transition-all ${
                          isSelected ? "neo-box-inverted" : "neo-box"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={protocol.icon} className="w-5 h-5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">
                                {protocol.name}
                              </span>
                              {isCurrent && (
                                <span
                                  className={`text-xs font-bold px-1.5 py-0.5 ${
                                    isSelected ? "bg-white/20" : "bg-gray-200"
                                  }`}
                                >
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <div className="font-clinical text-xs opacity-60">
                              {protocol.subtitle}
                            </div>
                          </div>
                          {isSelected && (
                            <Icon name="check" className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-gray-200 my-4" />

              {/* Formulas - Locked */}
              <div className="opacity-60">
                <h3 className="font-clinical text-xs uppercase tracking-wider opacity-50 mb-2">
                  Individual Formulas
                </h3>
                <p className="text-xs font-clinical opacity-50 mb-2">
                  Requires new subscription
                </p>
                <div className="space-y-2">
                  {FORMULAS.map((formula) => (
                    <div
                      key={formula.id}
                      className="w-full p-3 text-left neo-box bg-gray-50 cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3">
                        <Icon name="beaker" className="w-5 h-5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">
                              {formula.name}
                            </span>
                            <Icon name="lock" className="w-3 h-3 opacity-50" />
                          </div>
                          <div className="font-clinical text-xs opacity-60">
                            {formula.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Selected Protocol Summary */}
              {selectedProtocolData && (
                <div className="p-3 bg-gray-100 neo-box mb-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={selectedProtocolData.icon}
                      className="w-4 h-4"
                    />
                    <span className="font-bold text-sm">
                      {selectedProtocolData.name}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 mt-1">
                    {selectedProtocolData.subtitle}
                  </p>
                </div>
              )}

              {/* Next Billing */}
              {formattedNextBilling && (
                <div className="p-3 bg-white neo-box mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-clinical opacity-70">
                      Next billing:
                    </span>
                    <span className="font-bold">{formattedNextBilling}</span>
                  </div>
                </div>
              )}

              {/* Protocol Tiers */}
              {availableTiers.map((tier) => {
                const tierInfo = getTierInfo(selectedProtocol, tier);
                const formulaBreakdown = getFormulaBreakdown(
                  selectedProtocol,
                  tier,
                );
                if (!tierInfo || !formulaBreakdown) return null;

                const isSelected = selectedTier === tier;
                const isCurrent =
                  tier === initialTierRef.current &&
                  selectedProtocol === initialProtocolRef.current;
                const isUltimate = selectedProtocol === "4";

                return (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-4 text-left transition-all ${
                      isSelected ? "neo-box-inverted" : "neo-box bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold">{tierInfo.name}</span>
                          {isCurrent && (
                            <span
                              className={`text-xs font-bold px-1.5 py-0.5 ${
                                isSelected ? "bg-white/20" : "bg-gray-200"
                              }`}
                            >
                              CURRENT
                            </span>
                          )}
                          {tier === "pro" && !isCurrent && (
                            <span
                              className={`text-xs font-bold px-1.5 py-0.5 ${
                                isSelected
                                  ? "bg-white/20"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              POPULAR
                            </span>
                          )}
                        </div>
                        <div className="font-clinical text-xs opacity-70 mt-1">
                          {tierInfo.frequency} · {tierInfo.deliveryShots} shots
                        </div>
                        <FormulaBreakdown
                          flowCount={formulaBreakdown.flowCount}
                          clarityCount={formulaBreakdown.clarityCount}
                          isSelected={isSelected}
                          isUltimate={isUltimate}
                        />
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          £{tierInfo.price.toFixed(2)}
                        </div>
                        <div className="font-clinical text-xs opacity-60">
                          £{tierInfo.pricePerShot.toFixed(2)}/shot
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="border-t-2 border-current p-4">
          {/* Warning for unfulfilled first order */}
          {hasUnfulfilledFirstOrder && hasChanges && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
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
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="font-clinical text-xs text-blue-800">
                  Changes apply to your <strong>next delivery</strong>.
                  <a href="mailto:support@conka.io" className="underline ml-1">
                    Contact support
                  </a>{" "}
                  to adjust your first order.
                </p>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving || loading}
            className="w-full neo-button py-3 font-semibold disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : hasChanges
                ? `Save: ${PROTOCOLS.find((p) => p.id === selectedProtocol)?.name} · ${getTierInfo(selectedProtocol, selectedTier)?.name}`
                : "No changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
