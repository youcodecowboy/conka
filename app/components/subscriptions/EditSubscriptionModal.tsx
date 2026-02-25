"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getProtocolImage, getFormulaImage } from "@/app/lib/productImageConfig";

type TierType = "starter" | "pro" | "max";
type FormulaId = "01" | "02";
type PackSize = 4 | 8 | 12 | 28;

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

// Individual formulas (for single-formula subscriptions: switch between Flow/Clear at same pack size)
const FORMULAS: { id: FormulaId; name: string; subtitle: string }[] = [
  { id: "01", name: "CONKA Flow", subtitle: "Caffeine-Free Focus" },
  { id: "02", name: "CONKA Clear", subtitle: "Sharp Mind, Clear Head" },
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

// Formula breakdown component — Flow dot = amber accent, Clear dot = teal accent
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
          className={`w-3 h-3 rounded-full ${isSelected ? "bg-white/90" : "bg-amber-500"}`}
        />
        <span className="premium-body-sm">{flowCount}x Flow</span>
      </div>
      <span className={isSelected ? "opacity-50" : "opacity-30"}>+</span>
      <div className="flex items-center gap-1">
        <div
          className={`w-3 h-3 rounded-full ${isSelected ? "bg-white/60" : "bg-teal-500"}`}
        />
        <span className="premium-body-sm">{clarityCount}x Clear</span>
      </div>
      <span
        className={`premium-body-sm ${isSelected ? "opacity-50" : "opacity-40"}`}
      >
        {perDeliveryText}
      </span>
    </div>
  );
};

// Formula pack sizes (single-formula subscriptions: 4, 8, 12, 28)
const FORMULA_PACK_SIZES: PackSize[] = [4, 8, 12, 28];
const FORMULA_PACK_LABELS: Record<PackSize, string> = {
  4: "4 shots",
  8: "8 shots",
  12: "12 shots",
  28: "28 shots",
};

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when user saves a protocol change (Resilience/Precision/Balance/Ultimate + tier) */
  onSave: (
    protocolId: string,
    tier: TierType,
  ) => Promise<{ success: boolean; message?: string; partial?: boolean; multiLine?: boolean }>;
  /** Called when user saves a formula change (Flow/Clear + pack size). Optional until API supports it. */
  onSaveFormula?: (
    formulaId: FormulaId,
    packSize: PackSize,
  ) => Promise<{ success: boolean; message?: string; partial?: boolean; multiLine?: boolean }>;
  /** "protocol" = bundle subscription (can switch Resilience/Precision/Balance); "flow"|"clear" = single formula (can switch Flow/Clear) */
  subscriptionType: "protocol" | "flow" | "clear";
  currentProtocolId?: string;
  currentTier?: TierType;
  /** For formula subscriptions: "01" = Flow, "02" = Clear */
  currentFormulaId?: FormulaId;
  /** For formula subscriptions: 4, 8, 12, or 28 */
  currentPackSize?: PackSize;
  subscriptionName: string;
  /** Optional: subscription contract ID for contact-support email subject */
  subscriptionId?: string;
  nextBillingDate?: string;
  loading?: boolean;
  hasUnfulfilledFirstOrder?: boolean;
}

export function EditSubscriptionModal({
  isOpen,
  onClose,
  onSave,
  onSaveFormula,
  subscriptionType,
  currentProtocolId = "1",
  currentTier = "pro",
  currentFormulaId = "01",
  currentPackSize = 4,
  subscriptionName,
  subscriptionId,
  nextBillingDate,
  loading = false,
  hasUnfulfilledFirstOrder = false,
}: EditSubscriptionModalProps) {
  const isProtocol = subscriptionType === "protocol";

  const [selectedProtocol, setSelectedProtocol] = useState(currentProtocolId);
  const [selectedTier, setSelectedTier] = useState<TierType>(currentTier);
  const [selectedFormulaId, setSelectedFormulaId] = useState<FormulaId>(currentFormulaId);
  const [selectedPackSize, setSelectedPackSize] = useState<PackSize>(currentPackSize);
  const [error, setError] = useState<string | null>(null);
  const [errorPartial, setErrorPartial] = useState(false);
  const [errorMultiLine, setErrorMultiLine] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mobileStep, setMobileStep] = useState<"product" | "tier">("product");

  const initialProtocolRef = useRef(currentProtocolId);
  const initialTierRef = useRef(currentTier);
  const initialFormulaRef = useRef(currentFormulaId);
  const initialPackRef = useRef(currentPackSize);

  useEffect(() => {
    if (isOpen) {
      setSelectedProtocol(currentProtocolId);
      setSelectedTier(currentTier);
      setSelectedFormulaId(currentFormulaId);
      setSelectedPackSize(currentPackSize);
      setError(null);
      setErrorPartial(false);
      setErrorMultiLine(false);
      setMobileStep("product");
      initialProtocolRef.current = currentProtocolId;
      initialTierRef.current = currentTier;
      initialFormulaRef.current = currentFormulaId;
      initialPackRef.current = currentPackSize;
    }
  }, [isOpen, currentProtocolId, currentTier, currentFormulaId, currentPackSize]);

  // Protocols 1,2,3 share same tier options; protocol 4 is Ultimate (pro/max only)
  const availableTiers = getAvailableTiers(isProtocol ? selectedProtocol : "1");
  useEffect(() => {
    if (isProtocol && !availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0]);
    }
  }, [isProtocol, selectedProtocol, availableTiers, selectedTier]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setErrorPartial(false);
    setErrorMultiLine(false);
    try {
      if (isProtocol) {
        const result = await onSave(selectedProtocol, selectedTier);
        if (!result.success) {
          setError(result.message || "Failed to update");
          setErrorPartial(result.partial === true);
          setErrorMultiLine(result.multiLine === true);
        }
      } else if (onSaveFormula) {
        const result = await onSaveFormula(selectedFormulaId, selectedPackSize);
        if (!result.success) {
          setError(result.message || "Failed to update");
          setErrorPartial(result.partial === true);
          setErrorMultiLine(result.multiLine === true);
        }
      } else {
        setError("Formula changes are not yet supported. Contact support.");
        setErrorPartial(false);
        setErrorMultiLine(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setErrorPartial(false);
      setErrorMultiLine(false);
    } finally {
      setSaving(false);
    }
  };

  const hasProtocolChanges =
    isProtocol &&
    (selectedProtocol !== initialProtocolRef.current ||
      selectedTier !== initialTierRef.current);
  const hasFormulaChanges =
    !isProtocol &&
    (selectedFormulaId !== initialFormulaRef.current ||
      selectedPackSize !== initialPackRef.current);
  const hasChanges = hasProtocolChanges || hasFormulaChanges;
  const canSaveFormula = !isProtocol && !!onSaveFormula;

  const formattedNextBilling = nextBillingDate
    ? new Date(nextBillingDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const selectedProtocolData = PROTOCOLS.find((p) => p.id === selectedProtocol);
  const currentTierInfo = getTierInfo(currentProtocolId, currentTier);
  const currentPlanShots = currentTierInfo?.deliveryShots;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal - Desktop */}
      <div className="relative bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-card)] w-full max-w-4xl max-h-[90vh] overflow-hidden hidden md:flex flex-col shadow-xl">
        {/* Header */}
        <div className="border-b border-[var(--color-premium-stroke)] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-ink)]" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>
              Edit Plan
            </h2>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5">
              {subscriptionName}
            </p>
            {currentPlanShots != null && isProtocol && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                Your current plan: {currentPlanShots} shots per delivery
              </p>
            )}
            {!isProtocol && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                Your current: {FORMULAS.find((f) => f.id === currentFormulaId)?.name} · {currentPackSize} shots
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--premium-radius-nested)] hover:bg-[var(--color-premium-stroke)] transition-colors text-[var(--color-ink)]"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Protocol or Formula selector — neuro-blue-light background to separate */}
          <div className="w-2/5 border-r border-[var(--color-neuro-blue-start)] p-6 overflow-y-auto" style={{ backgroundColor: "var(--color-neuro-blue-light)" }}>
            {isProtocol ? (
              <>
                <h3 className="premium-body-sm text-[var(--color-neuro-blue-dark)] uppercase tracking-wide mb-3 font-semibold">
                  Switch protocol
                </h3>
                <p className="premium-body-sm text-[var(--color-neuro-blue-dark)]/80 mb-4">
                  Same pack size, same price. Pick the mix that suits you.
                </p>
                <div className="space-y-3">
                  {PROTOCOLS.filter((p) => p.id !== "4" || selectedTier === "max" || currentProtocolId === "4").map((protocol) => {
                    const isSelected = selectedProtocol === protocol.id;
                    const isCurrent = protocol.id === initialProtocolRef.current;
                    const img = getProtocolImage(protocol.id);
                    return (
                      <button
                        key={protocol.id}
                        type="button"
                        onClick={() => setSelectedProtocol(protocol.id)}
                        className={`w-full text-left rounded-[var(--premium-radius-nested)] border-2 overflow-hidden ${
                          isSelected
                            ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]"
                            : isCurrent
                              ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]"
                              : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]"
                        }`}
                      >
                        <div className="flex gap-4 p-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)]">
                            {img ? (
                              <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon name={protocol.icon} className={`w-8 h-8 ${isSelected ? "text-white" : "text-[var(--color-ink)]"}`} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold">{protocol.name}</span>
                              {protocol.id === "4" && (
                                <span className="text-xs font-semibold text-[var(--color-neuro-blue-dark)]">Different pricing</span>
                              )}
                              {isCurrent && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <p className={`premium-body-sm mt-0.5 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>
                              {protocol.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Callout: single formulas — with product assets */}
                <div className="mt-6 p-4 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)] bg-[var(--color-bone)]">
                  <p className="premium-body-sm font-medium text-[var(--color-ink)] mb-2">
                    Want CONKA Flow only or CONKA Clear only?
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)] flex-shrink-0">
                      {getFormulaImage("01") && <Image src={getFormulaImage("01")} alt="CONKA Flow" width={48} height={48} className="w-full h-full object-cover" />}
                    </div>
                    <div className="w-12 h-12 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)] flex-shrink-0">
                      {getFormulaImage("02") && <Image src={getFormulaImage("02")} alt="CONKA Clear" width={48} height={48} className="w-full h-full object-cover" />}
                    </div>
                  </div>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    Cancel this subscription and start a new one from the shop.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3 className="premium-body-sm text-[var(--color-neuro-blue-dark)] uppercase tracking-wide mb-3 font-semibold">
                  Switch formula
                </h3>
                <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
                  Same pack size. Switch between Flow and Clear.
                </p>
                <div className="space-y-3">
                  {FORMULAS.map((formula) => {
                    const isSelected = selectedFormulaId === formula.id;
                    const isCurrent = formula.id === initialFormulaRef.current;
                    const img = getFormulaImage(formula.id);
                    return (
                      <button
                        key={formula.id}
                        type="button"
                        onClick={() => setSelectedFormulaId(formula.id)}
                        className={`w-full text-left rounded-[var(--premium-radius-nested)] border-2 overflow-hidden ${
                          isSelected
                            ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]"
                            : isCurrent
                              ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]"
                              : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]"
                        }`}
                      >
                        <div className="flex gap-4 p-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)]">
                            {img ? (
                              <Image src={img} alt="" width={80} height={80} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon name="beaker" className={`w-8 h-8 ${isSelected ? "text-white" : "text-[var(--color-ink)]"}`} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{formula.name}</span>
                              {isCurrent && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>
                                  CURRENT
                                </span>
                              )}
                            </div>
                            <p className={`premium-body-sm mt-0.5 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>
                              {formula.subtitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Callout: protocol bundles require new subscription */}
                <div className="mt-6 p-4 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)] bg-[var(--color-bone)]">
                  <p className="premium-body-sm font-medium text-[var(--color-ink)] mb-1">
                    Want a protocol bundle (Resilience, Precision, Balance)?
                  </p>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    Cancel this subscription and start a new one from the shop.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right: Pack size / tier */}
          <div className="flex-1 p-6 overflow-y-auto bg-[var(--color-bone)]">
            {formattedNextBilling && (
              <div className="mb-4 p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)]" style={{ backgroundColor: "var(--color-neuro-blue-light)" }}>
                <div className="flex items-center gap-2 premium-body-sm">
                  <Icon name="calendar" className="w-4 h-4 text-[var(--color-neuro-blue-dark)]" />
                  <span className="text-[var(--color-neuro-blue-dark)]">Next billing:</span>
                  <span className="font-semibold text-[var(--color-neuro-blue-dark)]">{formattedNextBilling}</span>
                </div>
              </div>
            )}

            {isProtocol ? (
              <>
                <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-3">
                  Pack size
                </h3>
                <div className="space-y-3">
                  {availableTiers.map((tier) => {
                    const tierInfo = getTierInfo(selectedProtocol, tier);
                    const formulaBreakdown = getFormulaBreakdown(selectedProtocol, tier);
                    if (!tierInfo || !formulaBreakdown) return null;
                    const isSelected = selectedTier === tier;
                    const isCurrent = tier === initialTierRef.current && selectedProtocol === initialProtocolRef.current;
                    const isUltimate = selectedProtocol === "4";
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`w-full p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                          isSelected
                            ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]"
                            : isCurrent
                              ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]"
                              : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-bold">{tierInfo.deliveryShots} shots per delivery</span>
                              {isCurrent && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>CURRENT</span>
                              )}
                              {tier === "pro" && !isCurrent && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]"}`}>POPULAR</span>
                              )}
                            </div>
                            <p className={`premium-body-sm mt-1 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>
                              {tierInfo.name} · {tierInfo.frequency}
                            </p>
                            <FormulaBreakdown
                              flowCount={formulaBreakdown.flowCount}
                              clarityCount={formulaBreakdown.clarityCount}
                              isSelected={isSelected}
                              isUltimate={isUltimate}
                            />
                            <p className={`premium-body-sm mt-2 ${isSelected ? "opacity-80" : "text-[var(--text-on-light-muted)]"}`}>{tierInfo.billing}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">£{tierInfo.price.toFixed(2)}</div>
                            <div className={`premium-body-sm ${isSelected ? "opacity-80" : "text-[var(--text-on-light-muted)]"}`}>£{tierInfo.pricePerShot.toFixed(2)}/shot</div>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 premium-body-sm">
                            <Icon name="check" className="w-4 h-4" />
                            <span>20% subscription discount applied</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-3">
                  Pack size
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {FORMULA_PACK_SIZES.map((size) => {
                    const isSelected = selectedPackSize === size;
                    const isCurrent = size === initialPackRef.current;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedPackSize(size)}
                        className={`p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                          isSelected
                            ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]"
                            : isCurrent
                              ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)] hover:border-[var(--color-neuro-blue-dark)]"
                              : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)] hover:border-[var(--color-neuro-blue-start)]"
                        }`}
                      >
                        <span className="font-bold">{FORMULA_PACK_LABELS[size]}</span>
                        {isCurrent && (
                          <span className={`block text-xs font-bold mt-1 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>CURRENT</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-premium-stroke)] p-6 bg-[var(--color-bone)]">
          {hasUnfulfilledFirstOrder && hasChanges && (
            <div className="mb-4 p-3 rounded-[var(--premium-radius-nested)] bg-[var(--color-neuro-blue-light)] border border-[var(--color-neuro-blue-start)]">
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
                  className="text-[var(--color-neuro-blue-dark)] flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="premium-body-sm text-[var(--color-neuro-blue-dark)]">
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
            <div className={`mb-4 p-4 rounded-[var(--premium-radius-nested)] border-2 ${
              errorMultiLine ? "border-[var(--color-neuro-blue-dark)]/30 bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]" 
              : errorPartial ? "border-amber-500 bg-amber-50 text-amber-900" 
              : "border-red-300 bg-red-50 text-red-800"
            }`}>
              <p className="font-semibold mb-2">
                {errorMultiLine
                  ? "Multiple products on this subscription"
                  : errorPartial
                    ? "Your plan was partially updated"
                    : "Something went wrong"}
              </p>
              <p className="premium-body-sm mb-4">
                {errorMultiLine
                  ? "Your subscription contains multiple products and needs to be updated manually. Please contact us at support@conka.io and we'll sort it for you quickly."
                  : errorPartial
                    ? "We updated your product and pack size, but we couldn't update your billing schedule. Please contact support so we can fix this for you."
                    : "We couldn't update your plan. Please try again or contact support."}
              </p>
              <a
                href={errorMultiLine
                  ? "mailto:support@conka.io?subject=" + encodeURIComponent("Multi-product subscription change")
                  : `mailto:support@conka.io?subject=${encodeURIComponent(`Subscription support: ${subscriptionName}${subscriptionId ? ` (${subscriptionId})` : ""}`)}`}
                className="inline-flex items-center gap-2 rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-5 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact support
              </a>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`mailto:support@conka.io?subject=${encodeURIComponent(`Subscription support: ${subscriptionName}${subscriptionId ? ` (${subscriptionId})` : ""}`)}`}
                className="premium-body-sm text-[var(--color-neuro-blue-dark)] font-medium hover:underline inline-flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact support
              </a>
              <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                {hasChanges ? (
                  <span className="text-[var(--color-ink)] font-medium">
                    {isProtocol
                      ? `→ ${PROTOCOLS.find((p) => p.id === selectedProtocol)?.name} · ${getTierInfo(selectedProtocol, selectedTier)?.deliveryShots} shots per delivery`
                      : `→ ${FORMULAS.find((f) => f.id === selectedFormulaId)?.name} · ${selectedPackSize} shots`}
                  </span>
                ) : (
                  "No changes"
                )}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="rounded-[var(--premium-radius-interactive)] border border-[var(--color-premium-stroke)] px-6 py-2.5 font-semibold premium-body-sm text-[var(--color-ink)] hover:bg-[var(--color-premium-stroke)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving || loading || (!isProtocol && !onSaveFormula)}
                className="rounded-[var(--premium-radius-interactive)] px-6 py-2.5 font-semibold premium-body-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
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
      <div className="relative bg-[var(--color-bone)] border border-[var(--color-premium-stroke)] rounded-[var(--premium-radius-card)] w-full max-h-[90vh] overflow-hidden flex flex-col md:hidden shadow-xl">
        {/* Header */}
        <div className="border-b border-[var(--color-premium-stroke)] px-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="font-bold text-[var(--color-ink)]" style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}>Edit Plan</h2>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] truncate mt-0.5">
              {subscriptionName}
            </p>
            {isProtocol && currentPlanShots != null && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                Your current plan: {currentPlanShots} shots per delivery
              </p>
            )}
            {!isProtocol && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                Your current: {FORMULAS.find((f) => f.id === currentFormulaId)?.name} · {currentPackSize} shots
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-[var(--premium-radius-nested)] hover:bg-[var(--color-premium-stroke)] text-[var(--color-ink)]">
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Steps */}
        <div className="flex border-b border-[var(--color-premium-stroke)]">
          <button
            type="button"
            onClick={() => setMobileStep("product")}
            className={`flex-1 py-3 premium-body-sm font-semibold ${
              mobileStep === "product" ? "text-[var(--text-on-ink)]" : "text-[var(--color-ink)] bg-[var(--color-bone)]"
            }`}
            style={mobileStep === "product" ? { backgroundColor: "var(--color-neuro-blue-dark)" } : undefined}
          >
            1. {isProtocol ? "Protocol" : "Formula"}
          </button>
          <button
            type="button"
            onClick={() => setMobileStep("tier")}
            className={`flex-1 py-3 premium-body-sm font-semibold border-l border-[var(--color-premium-stroke)] ${
              mobileStep === "tier" ? "text-[var(--text-on-ink)]" : "text-[var(--color-ink)] bg-[var(--color-bone)]"
            }`}
            style={mobileStep === "tier" ? { backgroundColor: "var(--color-neuro-blue-dark)" } : undefined}
          >
            2. Pack size
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {mobileStep === "product" ? (
            <div className="space-y-4">
              {isProtocol ? (
                <>
                  <h3 className="premium-body-sm text-[var(--color-neuro-blue-dark)] uppercase tracking-wide font-semibold mb-2">Switch protocol</h3>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-3">Same pack size, same price.</p>
                  <div className="space-y-2">
                    {PROTOCOLS.filter((p) => p.id !== "4" || selectedTier === "max" || currentProtocolId === "4").map((protocol) => {
                      const isSelected = selectedProtocol === protocol.id;
                      const isCurrent = protocol.id === initialProtocolRef.current;
                      const img = getProtocolImage(protocol.id);
                      return (
                        <button
                          key={protocol.id}
                          type="button"
                          onClick={() => { setSelectedProtocol(protocol.id); setMobileStep("tier"); }}
                          className={`w-full text-left rounded-[var(--premium-radius-nested)] border-2 overflow-hidden ${
                            isSelected ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]" : isCurrent ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)]" : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)]"
                          }`}
                        >
                          <div className="flex gap-3 p-3">
                            <div className="w-16 h-16 flex-shrink-0 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)]">
                              {img ? <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover" /> : <Icon name={protocol.icon} className={`w-6 h-6 m-auto ${isSelected ? "text-white" : "text-[var(--color-ink)]"}`} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">{protocol.name}</span>
                                {isCurrent && <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>CURRENT</span>}
                              </div>
                              <p className={`premium-body-sm mt-0.5 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>{protocol.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)] bg-[var(--color-bone)]">
                    <p className="premium-body-sm font-medium text-[var(--color-ink)] mb-2">Want CONKA Flow only or CONKA Clear only?</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)] flex-shrink-0">
                        {getFormulaImage("01") && <Image src={getFormulaImage("01")} alt="CONKA Flow" width={40} height={40} className="w-full h-full object-cover" />}
                      </div>
                      <div className="w-10 h-10 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)] flex-shrink-0">
                        {getFormulaImage("02") && <Image src={getFormulaImage("02")} alt="CONKA Clear" width={40} height={40} className="w-full h-full object-cover" />}
                      </div>
                    </div>
                    <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5">Cancel this subscription and start a new one from the shop.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="premium-body-sm text-[var(--color-neuro-blue-dark)] uppercase tracking-wide font-semibold mb-2">Switch formula</h3>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-3">Same pack size. Switch between Flow and Clear.</p>
                  <div className="space-y-2">
                    {FORMULAS.map((formula) => {
                      const isSelected = selectedFormulaId === formula.id;
                      const isCurrent = formula.id === initialFormulaRef.current;
                      const img = getFormulaImage(formula.id);
                      return (
                        <button
                          key={formula.id}
                          type="button"
                          onClick={() => { setSelectedFormulaId(formula.id); setMobileStep("tier"); }}
                          className={`w-full text-left rounded-[var(--premium-radius-nested)] border-2 overflow-hidden ${
                            isSelected ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]" : isCurrent ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)]" : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)]"
                          }`}
                        >
                          <div className="flex gap-3 p-3">
                            <div className="w-16 h-16 flex-shrink-0 rounded-[var(--premium-radius-nested)] overflow-hidden bg-[var(--color-premium-stroke)]">
                              {img ? <Image src={img} alt="" width={64} height={64} className="w-full h-full object-cover" /> : <Icon name="beaker" className={`w-6 h-6 m-auto ${isSelected ? "text-white" : "text-[var(--color-ink)]"}`} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm">{formula.name}</span>
                                {isCurrent && <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>CURRENT</span>}
                              </div>
                              <p className={`premium-body-sm mt-0.5 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>{formula.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    <p className="premium-body-sm font-medium text-[var(--color-ink)]">Want a protocol bundle (Resilience, Precision, Balance)?</p>
                    <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5">Cancel this subscription and start a new one from the shop.</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {formattedNextBilling && (
                <div className="p-3 rounded-[var(--premium-radius-nested)] border border-[var(--color-neuro-blue-start)] mb-4" style={{ backgroundColor: "var(--color-neuro-blue-light)" }}>
                  <div className="flex items-center gap-2 premium-body-sm">
                    <span className="text-[var(--color-neuro-blue-dark)]">Next billing:</span>
                    <span className="font-bold text-[var(--color-neuro-blue-dark)]">{formattedNextBilling}</span>
                  </div>
                </div>
              )}

              {isProtocol ? (
                <>
                  <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-2">Pack size</h3>
                  {availableTiers.map((tier) => {
                    const tierInfo = getTierInfo(selectedProtocol, tier);
                    const formulaBreakdown = getFormulaBreakdown(selectedProtocol, tier);
                    if (!tierInfo || !formulaBreakdown) return null;
                    const isSelected = selectedTier === tier;
                    const isCurrent = tier === initialTierRef.current && selectedProtocol === initialProtocolRef.current;
                    const isUltimate = selectedProtocol === "4";
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`w-full p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                          isSelected ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]" : isCurrent ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)]" : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)]"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm">{tierInfo.deliveryShots} shots per delivery</span>
                              {isCurrent && <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-premium-stroke)] text-[var(--color-ink)]"}`}>CURRENT</span>}
                              {tier === "pro" && !isCurrent && <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20" : "bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]"}`}>POPULAR</span>}
                            </div>
                            <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">{tierInfo.name} · {tierInfo.frequency}</p>
                            <FormulaBreakdown flowCount={formulaBreakdown.flowCount} clarityCount={formulaBreakdown.clarityCount} isSelected={isSelected} isUltimate={isUltimate} />
                          </div>
                          <div className="text-right">
                            <div className="font-bold">£{tierInfo.price.toFixed(2)}</div>
                            <div className="premium-body-sm text-[var(--text-on-light-muted)]">£{tierInfo.pricePerShot.toFixed(2)}/shot</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </>
              ) : (
                <>
                  <h3 className="premium-body-sm text-[var(--text-on-light-muted)] uppercase tracking-wide mb-2">Pack size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {FORMULA_PACK_SIZES.map((size) => {
                      const isSelected = selectedPackSize === size;
                      const isCurrent = size === initialPackRef.current;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedPackSize(size)}
                          className={`p-4 text-left rounded-[var(--premium-radius-nested)] border-2 ${
                            isSelected ? "bg-[var(--color-neuro-blue-dark)] text-[var(--text-on-ink)] border-[var(--color-neuro-blue-dark)]" : isCurrent ? "bg-[var(--color-bone)] border-[var(--color-neuro-blue-dark)]" : "bg-[var(--color-bone)] border-[var(--color-premium-stroke)]"
                          }`}
                        >
                          <span className="font-bold">{FORMULA_PACK_LABELS[size]}</span>
                          {isCurrent && <span className={`block text-xs font-bold mt-1 ${isSelected ? "opacity-90" : "text-[var(--text-on-light-muted)]"}`}>CURRENT</span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Footer */}
        <div className="border-t border-[var(--color-premium-stroke)] p-4 bg-[var(--color-bone)]">
          {hasUnfulfilledFirstOrder && hasChanges && (
            <div className="mb-3 p-2 rounded-[var(--premium-radius-nested)] bg-[var(--color-neuro-blue-light)] border border-[var(--color-neuro-blue-start)]">
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
                  className="text-[var(--color-neuro-blue-dark)] flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <p className="premium-body-sm text-[var(--color-neuro-blue-dark)]">
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
            <div className={`mb-3 p-4 rounded-[var(--premium-radius-nested)] border-2 ${
              errorMultiLine ? "border-[var(--color-neuro-blue-dark)]/30 bg-[var(--color-neuro-blue-light)] text-[var(--color-neuro-blue-dark)]"
              : errorPartial ? "border-amber-500 bg-amber-50 text-amber-900" : "border-red-300 bg-red-50 text-red-800"
            }`}>
              <p className="font-semibold mb-2">
                {errorMultiLine ? "Multiple products on this subscription" : errorPartial ? "Your plan was partially updated" : "Something went wrong"}
              </p>
              <p className="premium-body-sm mb-3">
                {errorMultiLine
                  ? "Your subscription contains multiple products and needs to be updated manually. Please contact us at support@conka.io and we'll sort it for you quickly."
                  : errorPartial
                    ? "We updated your product and pack size, but we couldn't update your billing schedule. Please contact support so we can fix this for you."
                    : "We couldn't update your plan. Please try again or contact support."}
              </p>
              <a
                href={errorMultiLine
                  ? "mailto:support@conka.io?subject=" + encodeURIComponent("Multi-product subscription change")
                  : `mailto:support@conka.io?subject=${encodeURIComponent(`Subscription support: ${subscriptionName}${subscriptionId ? ` (${subscriptionId})` : ""}`)}`}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--premium-radius-interactive)] border-2 border-[var(--color-neuro-blue-dark)] bg-[var(--color-neuro-blue-dark)] px-4 py-2.5 premium-body-sm font-semibold text-white hover:opacity-90 transition-opacity w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact support
              </a>
            </div>
          )}
          <a
            href={`mailto:support@conka.io?subject=${encodeURIComponent(`Subscription support: ${subscriptionName}${subscriptionId ? ` (${subscriptionId})` : ""}`)}`}
            className="mb-3 w-full inline-flex items-center justify-center gap-2 rounded-[var(--premium-radius-interactive)] border border-[var(--color-premium-stroke)] py-2.5 premium-body-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-premium-stroke)] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Contact support
          </a>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving || loading || (!isProtocol && !onSaveFormula)}
            className="w-full rounded-[var(--premium-radius-interactive)] py-3 font-semibold premium-body-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
          >
            {saving
              ? "Updating..."
              : hasChanges
                ? isProtocol
                  ? (() => {
                      const t = getTierInfo(selectedProtocol, selectedTier);
                      const name = PROTOCOLS.find((p) => p.id === selectedProtocol)?.name;
                      return t && name ? `Save: ${name} · ${t.deliveryShots} shots per delivery` : "Save changes";
                    })()
                  : `Save: ${FORMULAS.find((f) => f.id === selectedFormulaId)?.name} · ${selectedPackSize} shots`
                : "No changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
