"use client";

import { useState, useEffect } from "react";
import {
    PathType,
    ProtocolTier,
    pathData,
    protocolTiers,
    balancedTiers,
    ultimateTiers,
    pricingData,
    ultimatePricingData,
    PathInfo,
    FORMULA_COLORS,
} from "./ProtocolBuilder";
import { useCart } from "@/app/context/CartContext";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { ProtocolId, PurchaseType } from "@/app/lib/productData";

type AccordionSection = "why" | "included" | "fullMonth";

// Map path keys to protocol IDs for Shopify
const pathToProtocolId: Record<Exclude<PathType, null>, ProtocolId> = {
  path1: "1", // Resilience Protocol
  path2: "2", // Precision Protocol
  path3: "3", // Balance Protocol
  path4: "4", // Ultimate Protocol
};

export default function ProtocolBuilderMobile() {
  const [selectedPath, setSelectedPath] = useState<PathType>(null);
  const [selectedTier, setSelectedTier] = useState<ProtocolTier>("pro");
  const [expandedSections, setExpandedSections] = useState<Record<AccordionSection, boolean>>({
    why: false,
    included: false,
    fullMonth: false,
  });
  const { addToCart, loading } = useCart();

  // Reset tier when selecting path4 (Ultimate) since it doesn't have starter
  useEffect(() => {
    if (selectedPath === "path4" && selectedTier === "starter") {
      setSelectedTier("pro");
    }
  }, [selectedPath, selectedTier]);

  // Handle adding protocol subscription to cart
  const handleAddToCart = async () => {
    if (!selectedPath) return;
    
    const protocolId = pathToProtocolId[selectedPath];
    const purchaseType: PurchaseType = "subscription";
    
    const variantData = getProtocolVariantId(protocolId, selectedTier, purchaseType);
    if (variantData?.variantId) {
      await addToCart(variantData.variantId, 1, variantData.sellingPlanId);
    } else {
      console.warn("Variant ID not configured for:", { protocol: protocolId, tier: selectedTier, type: purchaseType });
    }
  };

  const toggleSection = (section: AccordionSection) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePathSelect = (path: Exclude<PathType, null>) => {
    setSelectedPath(path);
    setExpandedSections({ why: false, included: false, fullMonth: false });
  };

  const handleBack = () => {
    setSelectedPath(null);
  };

  // Generate calendar days for a week or full month
  const generateCalendarDays = (
    tier: ProtocolTier,
    path: PathInfo,
    weeksToShow: number = 1
  ): Array<{ day: number; formula: "01" | "02" | "both" | "rest" }> => {
    const days: Array<{ day: number; formula: "01" | "02" | "both" | "rest" }> = [];

    for (let week = 0; week < weeksToShow; week++) {
      for (let day = 0; day < 7; day++) {
        const dayNum = week * 7 + day + 1;

        if (path.isUltimate) {
          if (tier === "pro") {
            if (day >= 0 && day <= 5) {
              days.push({ day: dayNum, formula: "both" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            days.push({ day: dayNum, formula: "both" });
          }
        } else if (path.isBalanced) {
          if (tier === "starter") {
            if (day === 0 || day === 4) {
              days.push({ day: dayNum, formula: "01" });
            } else if (day === 2 || day === 6) {
              days.push({ day: dayNum, formula: "02" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else if (tier === "pro") {
            if (day === 0 || day === 2 || day === 4) {
              days.push({ day: dayNum, formula: "01" });
            } else if (day === 1 || day === 3 || day === 5) {
              days.push({ day: dayNum, formula: "02" });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            if (day === 0 || day === 2 || day === 4 || day === 6) {
              days.push({ day: dayNum, formula: "01" });
            } else {
              days.push({ day: dayNum, formula: "02" });
            }
          }
        } else {
          const { primaryFormula, secondaryFormula } = path;
          if (tier === "starter") {
            if (day === 0 || day === 2 || day === 4) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else if (day === 6) {
              days.push({ day: dayNum, formula: secondaryFormula! });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else if (tier === "pro") {
            if (day >= 0 && day <= 4) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else if (day === 6) {
              days.push({ day: dayNum, formula: secondaryFormula! });
            } else {
              days.push({ day: dayNum, formula: "rest" });
            }
          } else {
            if (day >= 0 && day <= 5) {
              days.push({ day: dayNum, formula: primaryFormula });
            } else {
              days.push({ day: dayNum, formula: secondaryFormula! });
            }
          }
        }
      }
    }

    return days;
  };

  const getAvailableTiers = (path: PathInfo): ProtocolTier[] => {
    if (path.availableTiers) {
      return path.availableTiers;
    }
    return ["starter", "pro", "max"];
  };

  const getPricing = (path: PathInfo, tier: ProtocolTier) => {
    if (path.isUltimate && (tier === "pro" || tier === "max")) {
      return ultimatePricingData[tier];
    }
    return pricingData[tier];
  };

  const getTierData = (path: PathInfo, tier: ProtocolTier) => {
    if (path.isUltimate && (tier === "pro" || tier === "max")) {
      return ultimateTiers[tier];
    }
    if (path.isBalanced) {
      return balancedTiers[tier];
    }
    return protocolTiers[tier];
  };

  const getShotsPerWeek = (path: PathInfo, tier: ProtocolTier): string => {
    if (path.isUltimate && (tier === "pro" || tier === "max")) {
      const t = ultimateTiers[tier];
      return `${t.conkaFlowCount + t.conkaClarityCount}`;
    }
    if (path.isBalanced) {
      const t = balancedTiers[tier];
      return `${t.conkaFlowCount + t.conkaClarityCount}`;
    }
    const t = protocolTiers[tier];
    return `${t.primaryCount + t.secondaryCount}`;
  };

  // Protocol Selection View
  if (selectedPath === null) {
    return (
      <section className="px-6 py-12">
        <div className="text-left mb-4">
          <h2 className="text-2xl font-bold mb-2">Choose Your Protocol</h2>
          <p className="font-commentary text-base opacity-70">two formulas, four paths</p>
        </div>

        {/* Formula Legend - Above protocol cards */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
            <span className="font-clinical text-xs">Conka Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#AAB9BC] rounded-sm"></div>
            <span className="font-clinical text-xs">Conka Clarity</span>
          </div>
        </div>

        {/* Protocol Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {(["path1", "path2", "path3", "path4"] as const).map((pathKey) => {
            const path = pathData[pathKey];
            return (
              <button
                key={pathKey}
                onClick={() => handlePathSelect(pathKey)}
                className="border-2 border-black/10 rounded-lg p-3 hover:border-black/30 transition-all text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 flex items-center justify-center border border-current rounded-md opacity-70">
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
                      {pathKey === "path1" && (
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      )}
                      {pathKey === "path2" && (
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      )}
                      {pathKey === "path3" && (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </>
                      )}
                      {pathKey === "path4" && (
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      )}
                    </svg>
                  </div>
                  <span className="font-bold text-sm">{path.title}</span>
                </div>
                <p className="font-clinical text-xs opacity-60 line-clamp-2">
                  {path.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  // Expanded Protocol Detail View
  const currentPath = pathData[selectedPath];
  const currentPricing = getPricing(currentPath, selectedTier);
  const availableTiers = getAvailableTiers(currentPath);
  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <section className="px-6 py-6 pb-24">
      {/* Back Button + Path Name */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="p-2 border-2 border-black/10 rounded-lg"
          aria-label="Back to protocols"
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-bold">{currentPath.title}</h2>
          <p className="font-clinical text-xs opacity-60">{currentPath.subtitle}</p>
        </div>
      </div>

      {/* Quick Legend + Price Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-black text-white rounded-lg">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-[8px] font-bold">01</span>
            </div>
            <div className="w-4 h-4 bg-[#AAB9BC] rounded-sm flex items-center justify-center">
              <span className="text-[8px] font-bold">02</span>
            </div>
          </div>
          <span className="font-clinical text-xs opacity-80">
            {getShotsPerWeek(currentPath, selectedTier)} shots/week
          </span>
        </div>
        <div className="text-right">
          <span className="font-bold text-lg">{currentPricing.price}</span>
          <span className="font-clinical text-xs opacity-70 ml-1">
            /{currentPricing.billingCycle.replace("billed ", "")}
          </span>
        </div>
      </div>

      {/* Tier Toggle */}
      <div className="flex gap-2 mb-4">
        {availableTiers.map((tier) => {
          // Get formula counts with names
          let flowCount: number;
          let clarityCount: number;
          
          if (currentPath.isUltimate && (tier === "pro" || tier === "max")) {
            flowCount = ultimateTiers[tier].conkaFlowCount;
            clarityCount = ultimateTiers[tier].conkaClarityCount;
          } else if (currentPath.isBalanced) {
            flowCount = balancedTiers[tier].conkaFlowCount;
            clarityCount = balancedTiers[tier].conkaClarityCount;
          } else {
            // For standard paths, primary/secondary depends on which formula is primary
            const primaryIsFlow = currentPath.primaryFormula === "01";
            if (primaryIsFlow) {
              flowCount = protocolTiers[tier].primaryCount;
              clarityCount = protocolTiers[tier].secondaryCount;
            } else {
              clarityCount = protocolTiers[tier].primaryCount;
              flowCount = protocolTiers[tier].secondaryCount;
            }
          }
          
          return (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`flex-1 py-3 px-2 rounded-lg transition-all ${
                selectedTier === tier
                  ? "bg-black text-white"
                  : "border-2 border-black/10 hover:border-black/30"
              }`}
            >
              <p className="font-clinical text-xs uppercase opacity-70 mb-1">{tier}</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-sm bg-amber-500"></div>
                <span className="font-clinical text-xs">{flowCount}</span>
                <span className="text-xs opacity-50">+</span>
                <div className="w-2 h-2 rounded-sm bg-[#AAB9BC]"></div>
                <span className="font-clinical text-xs">{clarityCount}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 1-Week Calendar Sample */}
      <div className="border-2 border-black/10 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <p className="font-clinical text-xs uppercase opacity-50">Sample Week</p>
          <p className="font-clinical text-xs opacity-50">
            {getTierData(currentPath, selectedTier).description}
          </p>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, idx) => (
            <div
              key={idx}
              className="text-center font-clinical text-xs opacity-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells - 1 Week */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays(selectedTier, currentPath, 1).map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-md flex items-center justify-center text-xs font-clinical ${
                day.formula === "01"
                  ? "bg-amber-500 text-white"
                  : day.formula === "02"
                  ? "bg-[#AAB9BC] text-white"
                  : day.formula === "both"
                  ? "bg-gradient-to-br from-amber-500 to-[#AAB9BC] text-white"
                  : "border border-current opacity-20"
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-2 mb-4">
        {/* Why This Path Works */}
        <div className="border-2 border-black/10 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("why")}
            className="w-full flex items-center justify-between p-3"
          >
            <span className="font-bold text-sm">Why This Path Works</span>
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
              className={`transition-transform ${expandedSections.why ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {expandedSections.why && (
            <div className="px-3 pb-3">
              <p className="font-clinical text-sm opacity-70 mb-3">
                {currentPath.description}
              </p>
              <div className="space-y-2">
                {currentPath.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
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
                      className="text-green-500 flex-shrink-0 mt-0.5"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="font-clinical text-xs">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* What's Included */}
        <div className="border-2 border-black/10 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("included")}
            className="w-full flex items-center justify-between p-3"
          >
            <span className="font-bold text-sm">What&apos;s Included</span>
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
              className={`transition-transform ${expandedSections.included ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {expandedSections.included && (
            <div className="px-3 pb-3 space-y-2">
              {currentPath.isUltimate && (selectedTier === "pro" || selectedTier === "max") ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-amber-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">01</span>
                    </div>
                    <span className="font-clinical text-sm">
                      {ultimateTiers[selectedTier].conkaFlowCount}× Conka Flow per week
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#AAB9BC] rounded-sm flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">02</span>
                    </div>
                    <span className="font-clinical text-sm">
                      {ultimateTiers[selectedTier].conkaClarityCount}× Conka Clarity per week
                    </span>
                  </div>
                </>
              ) : currentPath.isBalanced ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-amber-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">01</span>
                    </div>
                    <span className="font-clinical text-sm">
                      {balancedTiers[selectedTier].conkaFlowCount}× Conka Flow per week
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#AAB9BC] rounded-sm flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">02</span>
                    </div>
                    <span className="font-clinical text-sm">
                      {balancedTiers[selectedTier].conkaClarityCount}× Conka Clarity per week
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 ${FORMULA_COLORS[currentPath.primaryFormula]} rounded-sm flex items-center justify-center`}
                    >
                      <span className="text-white text-[8px] font-bold">
                        {currentPath.primaryFormula}
                      </span>
                    </div>
                    <span className="font-clinical text-sm">
                      {protocolTiers[selectedTier].primaryCount}× Formula{" "}
                      {currentPath.primaryFormula} (daily)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 ${FORMULA_COLORS[currentPath.secondaryFormula!]} rounded-sm flex items-center justify-center`}
                    >
                      <span className="text-white text-[8px] font-bold">
                        {currentPath.secondaryFormula}
                      </span>
                    </div>
                    <span className="font-clinical text-sm">
                      {protocolTiers[selectedTier].secondaryCount}× Formula{" "}
                      {currentPath.secondaryFormula} (weekly)
                    </span>
                  </div>
                </>
              )}
              <p className="font-clinical text-xs opacity-50 mt-2">
                Delivered {currentPricing.billingCycle}
              </p>
            </div>
          )}
        </div>

        {/* Full Month View */}
        <div className="border-2 border-black/10 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("fullMonth")}
            className="w-full flex items-center justify-between p-3"
          >
            <span className="font-bold text-sm">View Full Month</span>
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
              className={`transition-transform ${expandedSections.fullMonth ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {expandedSections.fullMonth && (
            <div className="px-3 pb-3">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-clinical text-[10px] opacity-50"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Full 4-week Calendar */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays(selectedTier, currentPath, 4).map((day, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square rounded-sm flex items-center justify-center text-[10px] font-clinical ${
                      day.formula === "01"
                        ? "bg-amber-500 text-white"
                        : day.formula === "02"
                        ? "bg-[#AAB9BC] text-white"
                        : day.formula === "both"
                        ? "bg-gradient-to-br from-amber-500 to-[#AAB9BC] text-white"
                        : "border border-current opacity-20"
                    }`}
                  >
                    {day.day}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-3 pt-3 border-t border-black/10">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
                  <span className="font-clinical text-[10px]">F01</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-[#AAB9BC] rounded-sm"></div>
                  <span className="font-clinical text-[10px]">F02</span>
                </div>
                {currentPath.isUltimate && (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-[#AAB9BC] rounded-sm"></div>
                    <span className="font-clinical text-[10px]">Both</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Best For Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {currentPath.bestFor.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 border border-current rounded-full font-clinical text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Quick Path Switch */}
      <div className="mb-4">
        <p className="font-clinical text-xs uppercase opacity-50 mb-2">
          Other Protocols
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(["path1", "path2", "path3", "path4"] as const)
            .filter((p) => p !== selectedPath)
            .map((pathKey) => (
              <button
                key={pathKey}
                onClick={() => handlePathSelect(pathKey)}
                className="flex-shrink-0 px-3 py-2 border-2 border-black/10 rounded-lg font-clinical text-xs hover:border-black/30 transition-all"
              >
                {pathData[pathKey].title}
              </button>
            ))}
        </div>
      </div>

      {/* Sticky CTA Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--background)] border-t-2 border-black/10 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">{currentPricing.price}</p>
            <p className="font-clinical text-xs opacity-60">
              {currentPricing.billingCycle}
            </p>
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Subscribe Now"}
          </button>
        </div>
      </div>
    </section>
  );
}

