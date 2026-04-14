"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { PurchaseType, formulaContent } from "@/app/lib/productData";
import { formulaPricing, protocolPricing } from "@/app/lib/productPricing";
import { getProductAccent, getProductGradient } from "@/app/lib/productColors";
import { getBillingLabel } from "@/app/lib/productHelpers";
import {
  getFormulaImage,
  getProtocolImage,
} from "@/app/lib/productImageConfig";
import type { FormulaId, ProtocolId } from "@/app/lib/productTypes";
import { useCart } from "@/app/context/CartContext";
import {
  getFormulaVariantId,
  getProtocolVariantId,
} from "@/app/lib/shopifyProductMapping";

interface ProductCardProps {
  productType: "flow" | "clear" | "protocol";
  onAddToCart?: () => void;
}

// Fixed Balance protocol id — ProductGrid no longer offers flow-heavy/clear-heavy variants.
const BALANCE_PROTOCOL_ID: ProtocolId = "3";
const BALANCE_PROTOCOL_BEST_FOR =
  "Full-spectrum daily performance — energy, focus, and recovery covered.";

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
      bestFor: ["Post-training recovery", "Afternoon clarity", "Sleep quality"],
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

  // Protocol (Balance only)
  return {
    id: BALANCE_PROTOCOL_ID,
    name: "CONKA Protocol",
    benefitHeadline: "Complete daily performance",
    bodyCopy:
      "Flow and Clear in precise ratios. All-day performance, fully covered.",
    bestFor: [
      "All-day energy & focus",
      "Full recovery & sleep",
      "Optimised for training load",
    ],
    stats: [],
    image: getProtocolImage("3"),
    link: "/protocol/3",
    linkText: "View More Packs →",
    badge: "Most Popular",
  };
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

export default function ProductCard({
  productType,
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
      const variantData = getProtocolVariantId(
        BALANCE_PROTOCOL_ID,
        protocolTier,
        purchaseType,
      );
      if (variantData?.variantId) {
        await addToCart(
          variantData.variantId,
          1,
          variantData.sellingPlanId,
          { location: "product_grid", source: "product_grid" },
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
          { location: "product_grid", source: "product_grid" },
        );
      }
    }
    onAddToCartProp?.();
  }, [isProtocol, product.id, purchaseType, addToCart, onAddToCartProp]);

  // Accent / gradient — Balance for protocol, formula-specific otherwise
  const accentColor = isProtocol
    ? getProductAccent(BALANCE_PROTOCOL_ID)
    : getProductAccent(product.id);
  const buttonGradient = isProtocol
    ? getProductGradient(BALANCE_PROTOCOL_ID)
    : null;

  // Get pricing - all 4-pack on landing grid (customer acquisition)
  let monthlyPrice: string;
  let originalMonthlyPrice: string | null = null;
  let subscriptionBillingLabel: string | null = null;
  const formulaPackSize = "4" as const;

  let subscriptionPrice: string;
  let subscriptionOriginalPrice: string | null = null;
  let oneTimePrice: string;

  if (isProtocol) {
    const subPricing = protocolPricing.standard.subscription.starter;
    const oneTimePricing = protocolPricing.standard["one-time"].starter;
    subscriptionPrice = `£${subPricing.price.toFixed(2)}`;
    subscriptionOriginalPrice = "basePrice" in subPricing ? `£${subPricing.basePrice.toFixed(2)}` : null;
    oneTimePrice = `£${oneTimePricing.price.toFixed(2)}`;

    const pricing = protocolPricing.standard[purchaseType].starter;
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    if (isSubscribe && "basePrice" in pricing) {
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    if (isSubscribe && "billing" in subPricing) {
      subscriptionBillingLabel = getBillingLabel((subPricing as { billing: string }).billing);
    }
  } else {
    const subPricing = formulaPricing.subscription[formulaPackSize];
    const oneTimePricing = formulaPricing["one-time"][formulaPackSize];
    subscriptionPrice = `£${subPricing.price.toFixed(2)}`;
    subscriptionOriginalPrice = `£${subPricing.basePrice.toFixed(2)}`;
    oneTimePrice = `£${oneTimePricing.price.toFixed(2)}`;

    const pricing = formulaPricing[purchaseType][formulaPackSize];
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    if (isSubscribe && "basePrice" in pricing) {
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    if (isSubscribe && "billing" in pricing) {
      subscriptionBillingLabel = getBillingLabel((pricing as { billing: string }).billing);
    }
  }

  // Best for text
  const bestForText = isProtocol ? BALANCE_PROTOCOL_BEST_FOR : product.bestFor;

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
    : "var(--color-ink)";

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
                href={product.link}
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
