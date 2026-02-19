"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  PurchaseType,
  formulaContent,
  protocolContent,
} from "@/app/lib/productData";
import { formulaPricing, protocolPricing } from "@/app/lib/productPricing";
import { getProductAccent, getProductGradient } from "@/app/lib/productColors";
import {
  getProtocolTierTotalShots,
  getBillingLabel,
} from "@/app/lib/productHelpers";
import {
  getFormulaImage,
  getProtocolImage,
} from "@/app/lib/productImageConfig";
import type { FormulaId, ProtocolId } from "@/app/lib/productTypes";
import ProtocolVariantSelector, {
  type ProtocolVariant,
} from "./ProtocolVariantSelector";
import { useCart } from "@/app/context/CartContext";
import {
  getFormulaVariantId,
  getProtocolVariantId,
} from "@/app/lib/shopifyProductMapping";

interface ProductCardProps {
  productType: "flow" | "clear" | "protocol";
  protocolVariant?: ProtocolVariant;
  onProtocolVariantChange?: (variant: ProtocolVariant) => void;
  onAddToCart?: () => void;
}

// Protocol variant-specific best for descriptions
const getProtocolBestFor = (variant: ProtocolVariant): string => {
  switch (variant) {
    case "flow-heavy":
      return "Maximum energy and focus for athletes with high training loads.";
    case "balance":
      return "Full-spectrum daily performance — energy, focus, and recovery covered.";
    case "clear-heavy":
      return "Recovery and sleep prioritised for high-intensity training blocks.";
    default:
      return "Full-spectrum daily performance — energy, focus, and recovery covered.";
  }
};

// Calculate protocol savings vs buying Flow + Clear 4-packs separately
const calculateProtocolSavings = (
  purchaseType: PurchaseType,
): number | null => {
  const protocolPrice = protocolPricing.standard[purchaseType].starter.price;
  const formula4Price = formulaPricing[purchaseType]["4"].price;
  const separateTotal = formula4Price + formula4Price; // Flow + Clear
  const savings = separateTotal - protocolPrice;
  return savings > 0 ? savings : null;
};

// Get product data from productData.ts
const getProductData = (productType: "flow" | "clear" | "protocol") => {
  if (productType === "flow") {
    const flow = formulaContent["01"];
    return {
      id: "01" as FormulaId,
      name: flow.name,
      benefitHeadline: "Energy without the crash",
      bodyCopy:
        "Sustained focus for training and work — no caffeine, no crash.",
      bestFor: ["Morning training", "Long workdays", "Clean mental stamina"],
      stats: [
        { value: "-56%", label: "Stress" },
        { value: "+18%", label: "Memory" },
        { value: "+42%", label: "Sleep Quality" },
      ],
      image: getFormulaImage("01"),
      link: "/conka-flow",
      linkText: "View More Packs →",
      badge: null,
    };
  }

  if (productType === "clear") {
    const clear = formulaContent["02"];
    return {
      id: "02" as FormulaId,
      name: clear.name,
      benefitHeadline: "Mental clarity and complete recovery",
      bodyCopy:
        "Sharpen performance when you need it. Support recovery when you're done.",
      bestFor: ["Post-training recovery", "Evening wind-down", "Sleep quality"],
      stats: [
        { value: "+63%", label: "Memory & Attention" },
        { value: "+57%", label: "Brain Blood Flow" },
        { value: "-42%", label: "Anxiety" },
      ],
      image: getFormulaImage("02"),
      link: "/conka-clarity",
      linkText: "View More Packs →",
      badge: null,
    };
  }

  // Protocol - will be updated based on variant
  const protocol = protocolContent["3"];
  return {
    id: "3" as ProtocolId,
    name: "CONKA Protocol",
    benefitHeadline: "Complete daily performance",
    bodyCopy:
      "Flow and Clear in precise ratios. All-day performance, fully covered.",
    bestFor: [
      "All-day energy & focus",
      "Full recovery & sleep",
      "Optimised for training load",
    ],
    stats: [], // No stats for protocol card (it's a combination)
    image: getProtocolImage("3"), // Default, will be overridden by variant
    link: "/protocol/3", // Overridden in render from protocolVariant
    linkText: "View More Packs →",
    badge: "Most Popular",
  };
};

// Get protocol image and gradient based on variant
const getProtocolVariantImage = (variant: ProtocolVariant): string => {
  switch (variant) {
    case "flow-heavy":
      return getProtocolImage("1"); // Resilience Protocol (Flow-heavy)
    case "balance":
      return getProtocolImage("3"); // Balance Protocol
    case "clear-heavy":
      return getProtocolImage("2"); // Precision Protocol (Clear-heavy)
    default:
      return getProtocolImage("3");
  }
};

const getProtocolVariantGradient = (
  variant: ProtocolVariant,
): { start: string; end: string } => {
  switch (variant) {
    case "flow-heavy":
      return getProductGradient("1"); // Resilience: orange to red
    case "balance":
      return getProductGradient("3"); // Balance: green gradient
    case "clear-heavy":
      return getProductGradient("2"); // Precision: pink to purple
    default:
      return getProductGradient("3");
  }
};

// Protocol variant → protocol page path (for View Product link)
const getProtocolLink = (variant: ProtocolVariant): string => {
  switch (variant) {
    case "flow-heavy":
      return "/protocol/1";
    case "clear-heavy":
      return "/protocol/2";
    case "balance":
    default:
      return "/protocol/3";
  }
};

// Export badge info for use in wrapper
export function getProductBadge(
  productType: "flow" | "clear" | "protocol",
): string | null {
  if (productType === "protocol") {
    return "Most Popular";
  }
  return null;
}

// Map ProtocolVariant to Shopify ProtocolId for variant lookup
function protocolVariantToId(v: ProtocolVariant): ProtocolId {
  switch (v) {
    case "flow-heavy":
      return "1";
    case "clear-heavy":
      return "2";
    case "balance":
    default:
      return "3";
  }
}

export default function ProductCard({
  productType,
  protocolVariant = "balance",
  onProtocolVariantChange,
  onAddToCart: onAddToCartProp,
}: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [purchaseType, setPurchaseType] =
    useState<PurchaseType>("subscription");
  const product = getProductData(productType);
  const isProtocol = productType === "protocol";
  const isSubscribe = purchaseType === "subscription";

  const handleAddToCart = useCallback(async () => {
    const packSize = "4" as const;
    const protocolTier = "starter" as const;

    if (isProtocol) {
      const protocolId = protocolVariantToId(protocolVariant);
      const variantData = getProtocolVariantId(
        protocolId,
        protocolTier,
        purchaseType,
      );
      if (variantData?.variantId) {
        await addToCart(
          variantData.variantId,
          1,
          variantData.sellingPlanId,
          { location: "product_grid", source: "direct" },
        );
      }
    } else {
      const formulaId = product.id as FormulaId;
      const variantData = getFormulaVariantId(
        formulaId,
        packSize,
        purchaseType,
      );
      if (variantData?.variantId) {
        await addToCart(
          variantData.variantId,
          1,
          variantData.sellingPlanId,
          { location: "product_grid", source: "direct" },
        );
      }
    }
    onAddToCartProp?.();
  }, [
    isProtocol,
    protocolVariant,
    product.id,
    purchaseType,
    addToCart,
    onAddToCartProp,
  ]);

  // Get accent color/gradient for buttons and badge
  const buttonGradient = isProtocol
    ? getProtocolVariantGradient(protocolVariant)
    : null;
  const accentColor = isProtocol
    ? getProductAccent(
        protocolVariant === "flow-heavy"
          ? "1"
          : protocolVariant === "clear-heavy"
            ? "2"
            : "3",
      )
    : getProductAccent(product.id);

  // Get pricing - all 4-pack on landing grid (customer acquisition)
  let dailyPrice: string;
  let monthlyPrice: string; // Selected option price (for main button)
  let originalDailyPrice: string | null = null;
  let originalMonthlyPrice: string | null = null; // Strikethrough when subscribe selected
  let perShotText: string;
  let savings: number | null = null;
  let subscriptionBillingLabel: string | null = null;
  const formulaPackSize = "4" as const;
  const formulaShotCount = 4;

  // Prices for each option card (always show correct price per option, not selected state)
  let subscriptionPrice: string; // Discounted price for Subscribe option
  let subscriptionOriginalPrice: string | null = null; // Full price strikethrough on Subscribe
  let oneTimePrice: string; // One-time price for One-time option

  if (isProtocol) {
    const subPricing = protocolPricing.standard.subscription.starter;
    const oneTimePricing = protocolPricing.standard["one-time"].starter;
    const totalShots = getProtocolTierTotalShots("3", "starter");
    subscriptionPrice = `£${subPricing.price.toFixed(2)}`;
    subscriptionOriginalPrice = "basePrice" in subPricing ? `£${subPricing.basePrice.toFixed(2)}` : null;
    oneTimePrice = `£${oneTimePricing.price.toFixed(2)}`;

    const pricing = protocolPricing.standard[purchaseType].starter;
    const perShot = pricing.price / totalShots;
    dailyPrice = `£${perShot.toFixed(2)}`;
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    if (isSubscribe && "basePrice" in pricing) {
      originalDailyPrice = `£${(pricing.basePrice / totalShots).toFixed(2)}`;
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    if (isSubscribe && "billing" in subPricing) {
      subscriptionBillingLabel = getBillingLabel((subPricing as { billing: string }).billing);
    }
    perShotText = "4-shot supply (Flow + Clear)";
    savings = calculateProtocolSavings(purchaseType);
  } else {
    const subPricing = formulaPricing.subscription[formulaPackSize];
    const oneTimePricing = formulaPricing["one-time"][formulaPackSize];
    subscriptionPrice = `£${subPricing.price.toFixed(2)}`;
    subscriptionOriginalPrice = `£${subPricing.basePrice.toFixed(2)}`;
    oneTimePrice = `£${oneTimePricing.price.toFixed(2)}`;

    const pricing = formulaPricing[purchaseType][formulaPackSize];
    dailyPrice = `£${pricing.perShot.toFixed(2)}`;
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    if (isSubscribe && "basePrice" in pricing) {
      originalDailyPrice = `£${(pricing.basePrice / formulaShotCount).toFixed(2)}`;
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    if (isSubscribe && "billing" in pricing) {
      subscriptionBillingLabel = getBillingLabel((pricing as { billing: string }).billing);
    }
    perShotText = "4-shot supply";
  }

  // Best for text
  const bestForText = isProtocol
    ? getProtocolBestFor(protocolVariant)
    : product.bestFor;

  // Button background color
  const formulaGradient = !isProtocol ? getProductGradient(product.id) : null;
  const buttonBg = isSubscribe
    ? isProtocol
      ? buttonGradient
        ? `linear-gradient(to right, ${buttonGradient.start}, ${buttonGradient.end})`
        : (accentColor ?? "#000")
      : formulaGradient
        ? `linear-gradient(to right, ${formulaGradient.start}, ${formulaGradient.end})`
        : (accentColor ?? "#111")
    : "var(--color-ink)"; // One-time purchase: use ink/black

  return (
    <div
      className="premium-card-soft premium-card-soft-stroke relative group flex flex-col overflow-hidden text-[var(--text-on-light)]"
      style={{ padding: "1rem", backgroundColor: "white" }}
    >
      {/* Product Info */}
      <div className="flex-1 flex flex-col px-0 pb-0 pt-4">
        {/* Product Name */}
        <div className="mb-1">
          <p className="premium-body-sm uppercase tracking-widest text-[var(--text-on-light-muted)] mb-2">
            {product.name}
          </p>
          <span
            className="inline-block py-1 premium-data text-current/90 text-sm"
            style={{
              paddingLeft: "var(--premium-space-m)",
              paddingRight: "var(--premium-space-m)",
              borderRadius: "var(--premium-radius-interactive)",
              background: "rgba(0,0,0,0.04)",
            }}
          >
            Liquid · 1 shot (30ml) daily · 4-pack
          </span>
        </div>

        {/* Benefit Headline */}
        <h3
          className="premium-heading text-2xl md:text-3xl font-bold mb-2"
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          {product.benefitHeadline}
        </h3>

        {/* Body Copy */}
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-3">
          {product.bodyCopy}
        </p>

        {/* Clinical Stats */}
        {product.stats && product.stats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.stats.map((stat, idx) => (
              <span
                key={idx}
                className="inline-flex items-baseline gap-1 px-2 py-1 rounded-full text-[10px] font-clinical font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]"
              >
                <span style={{ color: accentColor }} className="font-bold">
                  {stat.value}
                </span>
                <span className="text-[var(--text-on-light-muted)]">
                  {stat.label}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Protocol Variant Selector */}
        {isProtocol && onProtocolVariantChange && (
          <div className="mb-5 flex flex-col items-center gap-2">
            <span className="premium-body-sm font-medium text-[var(--text-on-light-muted)]">
              Choose your ratio
            </span>
            <ProtocolVariantSelector
              variant={protocolVariant}
              onVariantChange={onProtocolVariantChange}
            />
          </div>
        )}

        {/* Best For */}
        <div className="mb-4">
          {isProtocol ? (
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              {bestForText}
            </p>
          ) : (
            <ul className="space-y-2">
              {(product.bestFor as string[]).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 premium-body-sm text-[var(--text-on-light-muted)]"
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
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        <div className="mt-auto pt-4 border-t border-[var(--color-premium-stroke)] pb-6 -mx-0 w-full">
          {/* Subscribe / One-time Option Cards */}
          <div className="space-y-2 mb-4 w-full">
            {/* Subscribe Option */}
            <label
              className={`flex items-center justify-between py-3 px-4 rounded-[var(--premium-radius-nested)] cursor-pointer transition-all w-full ${
                isSubscribe
                  ? "border-2 border-black/24 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                  : "border border-black/8"
              }`}
              style={
                !isSubscribe ? { backgroundColor: "var(--color-bone)" } : {}
              }
            >
              <input
                type="radio"
                name={`purchase-${productType}`}
                value="subscription"
                checked={isSubscribe}
                onChange={() => setPurchaseType("subscription")}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-semibold text-[13px] mb-0.5 text-[var(--color-ink)]">
                  Subscribe & Save 20%
                </div>
                <div className="text-[11px] text-[var(--text-on-light-muted)]">
                  Cancel anytime
                  {subscriptionBillingLabel != null
                    ? ` · ${subscriptionBillingLabel}`
                    : ""}
                </div>
              </div>
              <div className="text-right">
                {subscriptionOriginalPrice && (
                  <div className="text-[12px] text-[var(--text-on-light-muted)] line-through mb-0.5">
                    {subscriptionOriginalPrice}
                  </div>
                )}
                <div className="font-semibold text-[13px]">{subscriptionPrice}</div>
              </div>
            </label>

            {/* One-time Option */}
            <label
              className={`flex items-center justify-between py-3 px-4 rounded-[var(--premium-radius-nested)] cursor-pointer transition-all w-full ${
                !isSubscribe
                  ? "border-2 border-black/24 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
                  : "border border-black/8"
              }`}
              style={
                isSubscribe ? { backgroundColor: "var(--color-bone)" } : {}
              }
            >
              <input
                type="radio"
                name={`purchase-${productType}`}
                value="one-time"
                checked={!isSubscribe}
                onChange={() => setPurchaseType("one-time")}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-semibold text-[13px]">
                  One-time purchase
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[13px]">{oneTimePrice}</div>
              </div>
            </label>
          </div>

          {/* CTA Button with Price */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full py-6 rounded-[var(--premium-radius-interactive)] text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3 flex items-center justify-between text-base font-semibold disabled:opacity-70 disabled:pointer-events-none"
            style={{
              background: buttonBg,
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <span>{loading ? "Adding…" : "Add to Cart"}</span>
            <div className="flex items-baseline gap-1.5">
              {isSubscribe && originalMonthlyPrice && (
                <span className="text-[12px] line-through opacity-70">
                  {originalMonthlyPrice}
                </span>
              )}
              <span>{monthlyPrice}</span>
            </div>
          </button>

          {/* View Product link */}
          {product.linkText && (
            <div className="mt-6 flex justify-center">
              <Link
                href={
                  isProtocol ? getProtocolLink(protocolVariant) : product.link
                }
                className="premium-body-sm inline-block text-center px-5 py-2.5 rounded-full border border-gray-200 text-black hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                {product.linkText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
