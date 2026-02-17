"use client";

import Image from "next/image";
import Link from "next/link";
import { PurchaseType, formulaContent, protocolContent } from "@/app/lib/productData";
import { formulaPricing, protocolPricing } from "@/app/lib/productPricing";
import { getProductAccent, getProductGradient } from "@/app/lib/productColors";
import type { FormulaId, ProtocolId } from "@/app/lib/productTypes";
import ProtocolVariantSelector, {
  type ProtocolVariant,
} from "./ProtocolVariantSelector";

interface ProductCardProps {
  productType: "flow" | "clear" | "protocol";
  purchaseType: PurchaseType;
  protocolVariant?: ProtocolVariant;
  onProtocolVariantChange?: (variant: ProtocolVariant) => void;
  onAddToCart?: () => void;
}

// Protocol variant-specific best for descriptions
const getProtocolBestFor = (variant: ProtocolVariant): string => {
  const flowContent = formulaContent["01"];
  const clearContent = formulaContent["02"];
  const protocolContentData = protocolContent["3"];

  switch (variant) {
    case "flow-heavy":
      return "Athletes with high training loads needing maximum energy and focus";
    case "balance":
      return protocolContentData.description;
    case "clear-heavy":
      return "High-intensity athletes prioritising recovery and sleep quality";
    default:
      return protocolContentData.description;
  }
};

// Get product data from productData.ts
const getProductData = (productType: "flow" | "clear" | "protocol") => {
  if (productType === "flow") {
    const flow = formulaContent["01"];
    return {
      id: "01" as FormulaId,
      name: flow.name,
      formulaLabel: "Formula 01 — Energy & Focus",
      benefitHeadline: "Energy without the crash",
      bodyCopy:
        "Sustained focus for training and work. Adaptogenic and nootropic compounds that build mental stamina without caffeine crashes.",
      bestFor: [
        "Morning training & long workdays",
        "Sustained energy & mental stamina",
        "Focus without caffeine",
      ],
      image: "/products/flow-bottle.png",
      link: "/formula/01",
      linkText: "View all sizes →",
      badge: null,
    };
  }

  if (productType === "clear") {
    const clear = formulaContent["02"];
    return {
      id: "02" as FormulaId,
      name: clear.name,
      formulaLabel: "Formula 02 — Recovery & Sleep",
      benefitHeadline: "Deeper recovery, better sleep",
      bodyCopy:
        "Wind down and recharge properly. Nootropic compounds that support cognitive recovery and sleep quality so you wake up ready to go again.",
      bestFor: [
        "Post-training recovery",
        "Evening wind-down routine",
        "Sleep quality & morning readiness",
      ],
      image: "/products/clear-bottle.png",
      link: "/formula/02",
      linkText: "View all sizes →",
      badge: null,
    };
  }

  // Protocol
  const protocol = protocolContent["3"];
  return {
    id: "3" as ProtocolId,
    name: "CONKA Protocol",
    formulaLabel: "Complete Performance System",
    benefitHeadline: "Complete daily performance",
    bodyCopy:
      "Morning energy, sustained focus, evening recovery. Flow and Clear working together in precise ratios for all-day performance.",
    bestFor: null, // Will be determined by variant
    image: "/products/protocol-bottles.png",
    link: "/protocol/3",
    linkText: "View all protocols →",
    badge: "Most Popular",
  };
};

export default function ProductCard({
  productType,
  purchaseType,
  protocolVariant = "balance",
  onProtocolVariantChange,
  onAddToCart,
}: ProductCardProps) {
  const product = getProductData(productType);
  const isProtocol = productType === "protocol";
  const isSubscribe = purchaseType === "subscription";

  // Get accent color for buttons
  const accentColor =
    productType === "protocol"
      ? "#3a9f7e" // Balance Protocol accent
      : getProductAccent(product.id);

  // Get pricing
  let priceDisplay: string;
  let originalPrice: string | null = null;
  let perShotText: string;

  if (isProtocol) {
    const pricing = protocolPricing.standard[purchaseType].starter;
    const price = pricing.price;
    // Calculate per day (starter tier = 4 shots per week = ~0.57 shots per day)
    // For simplicity, show total price divided by 28 days
    const perDay = (price / 28).toFixed(2);
    priceDisplay = `£${perDay}`;
    if (isSubscribe && "basePrice" in pricing) {
      const originalPerDay = (pricing.basePrice / 28).toFixed(2);
      originalPrice = `£${originalPerDay}`;
    }
    perShotText = "28-shot supply (Flow + Clear)";
  } else {
    const pricing = formulaPricing[purchaseType]["28"];
    const perShot = pricing.perShot;
    priceDisplay = `£${perShot.toFixed(2)}`;
    if (isSubscribe && "basePrice" in pricing) {
      const originalPerShot = (pricing.basePrice / 28).toFixed(2);
      originalPrice = `£${originalPerShot}`;
    }
    perShotText = `28-shot supply`;
  }

  // CTA text based on purchase type
  const ctaText = isSubscribe ? "Subscribe & Save" : "Buy Once";

  // Best for text
  const bestForText = isProtocol
    ? getProtocolBestFor(protocolVariant)
    : product.bestFor;

  return (
    <div className="premium-card-soft premium-card-soft-stroke relative group transition-transform duration-300 hover:-translate-y-1 flex flex-col">
      {/* Most Popular Badge */}
      {product.badge && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white z-10"
          style={{ backgroundColor: accentColor }}
        >
          {product.badge}
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-square mb-4 rounded-[var(--premium-radius-nested)] overflow-hidden bg-black/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        {/* Formula Label */}
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-1">
          {product.formulaLabel}
        </p>

        {/* Product Name */}
        <h3 className="premium-heading text-xl md:text-2xl font-bold mb-2">
          {product.name}
        </h3>

        {/* Benefit Headline */}
        <p className="premium-body font-semibold mb-2">{product.benefitHeadline}</p>

        {/* Body Copy */}
        <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
          {product.bodyCopy}
        </p>

        {/* Protocol Variant Selector */}
        {isProtocol && onProtocolVariantChange && (
          <ProtocolVariantSelector
            variant={protocolVariant}
            onVariantChange={onProtocolVariantChange}
          />
        )}

        {/* Best For */}
        <div className="mb-4">
          {isProtocol ? (
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">
              {bestForText}
            </p>
          ) : (
            <ul className="space-y-2">
              {(bestForText as string[]).map((item, idx) => (
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

        {/* Pricing */}
        <div className="mt-auto pt-4 border-t border-black/10">
          <div className="mb-2">
            {isSubscribe && originalPrice ? (
              <div className="flex items-baseline gap-2">
                <span className="premium-heading text-xl font-bold">
                  {priceDisplay}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)] line-through">
                  {originalPrice}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                  /day
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="premium-heading text-xl font-bold">
                  {priceDisplay}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                  /day
                </span>
              </div>
            )}
            <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
              {perShotText}
            </p>
            {isSubscribe && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1">
                Cancel anytime
              </p>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onAddToCart}
            className="w-full py-3 rounded-[var(--premium-radius-interactive)] font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3"
            style={{
              background:
                productType === "protocol"
                  ? `linear-gradient(to right, ${getProductGradient(product.id).start}, ${getProductGradient(product.id).end})`
                  : accentColor,
            }}
          >
            {ctaText}
          </button>

          {/* View All Link */}
          <Link
            href={product.link}
            className="premium-body-sm text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light)] transition-colors text-center block"
          >
            {product.linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
