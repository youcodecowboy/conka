"use client";

import Image from "next/image";
import Link from "next/link";
import { PurchaseType, formulaContent, protocolContent } from "@/app/lib/productData";
import { formulaPricing, protocolPricing } from "@/app/lib/productPricing";
import { getProductAccent, getProductGradient } from "@/app/lib/productColors";
import { getProtocolTierTotalShots } from "@/app/lib/productHelpers";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
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

// Calculate protocol savings vs buying Flow + Clear separately
// TODO: Create helper function in productHelpers.ts to calculate this properly
const calculateProtocolSavings = (
  purchaseType: PurchaseType,
): number | null => {
  // Protocol max tier (28 shots) pricing
  const protocolPrice = protocolPricing.standard[purchaseType].max.price;
  
  // Two 28-shot formulas (Flow + Clear) - both use same pricing
  const formula28Price = formulaPricing[purchaseType]["28"].price;
  
  const separateTotal = formula28Price + formula28Price; // Flow + Clear
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
      bodyCopy: "Sustained focus for training and work — no caffeine, no crash.",
      bestFor: [
        "Morning training",
        "Long workdays",
        "Clean mental stamina",
      ],
      image: getFormulaImage("01"),
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
      benefitHeadline: "Deeper recovery, better sleep",
      bodyCopy: "Wind down and recharge properly. Wake up ready to perform again.",
      bestFor: [
        "Post-training recovery",
        "Evening wind-down",
        "Sleep quality",
      ],
      image: getFormulaImage("02"),
      link: "/formula/02",
      linkText: "View all sizes →",
      badge: null,
    };
  }

  // Protocol - will be updated based on variant
  const protocol = protocolContent["3"];
  return {
    id: "3" as ProtocolId,
    name: "CONKA Protocol",
    benefitHeadline: "Complete daily performance",
    bodyCopy: "Flow and Clear in precise ratios. All-day performance, fully covered.",
    bestFor: [
      "All-day energy & focus",
      "Full recovery & sleep",
      "Optimised for training load",
    ],
    image: getProtocolImage("3"), // Default, will be overridden by variant
    link: "/protocol/3",
    linkText: "View all protocols →",
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

const getProtocolVariantGradient = (variant: ProtocolVariant): { start: string; end: string } => {
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

  // Get protocol image based on variant
  const protocolImage = isProtocol
    ? getProtocolVariantImage(protocolVariant)
    : product.image;

  // Get accent color/gradient for buttons and badge
  const buttonGradient = isProtocol
    ? getProtocolVariantGradient(protocolVariant)
    : null;
  const accentColor = isProtocol
    ? getProductAccent(protocolVariant === "flow-heavy" ? "1" : protocolVariant === "clear-heavy" ? "2" : "3")
    : getProductAccent(product.id);

  // Get pricing - use max tier (28 shots) for protocol
  let dailyPrice: string;
  let monthlyPrice: string;
  let originalDailyPrice: string | null = null;
  let originalMonthlyPrice: string | null = null;
  let perShotText: string;
  let savings: number | null = null;

  if (isProtocol) {
    // Protocol: Use max tier (28 shots)
    const pricing = protocolPricing.standard[purchaseType].max;
    const totalShots = getProtocolTierTotalShots("3", "max"); // 28 shots
    const perShot = pricing.price / totalShots;
    dailyPrice = `£${perShot.toFixed(2)}`;
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    
    if (isSubscribe && "basePrice" in pricing) {
      const originalPerShot = pricing.basePrice / totalShots;
      originalDailyPrice = `£${originalPerShot.toFixed(2)}`;
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    
    perShotText = "28-shot supply (Flow + Clear)";
    savings = calculateProtocolSavings(purchaseType);
  } else {
    // Formula: Use 28-pack
    const pricing = formulaPricing[purchaseType]["28"];
    dailyPrice = `£${pricing.perShot.toFixed(2)}`;
    monthlyPrice = `£${pricing.price.toFixed(2)}`;
    
    if (isSubscribe && "basePrice" in pricing) {
      const originalPerShot = pricing.basePrice / 28;
      originalDailyPrice = `£${originalPerShot.toFixed(2)}`;
      originalMonthlyPrice = `£${pricing.basePrice.toFixed(2)}`;
    }
    
    perShotText = "28-shot supply";
  }

  // CTA text based on purchase type
  const ctaText = isSubscribe ? "Subscribe & Save 20%" : "Add to Cart";

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
          style={{ backgroundColor: accentColor || "#3a9f7e" }}
        >
          {product.badge}
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-square mb-4 rounded-t-[var(--premium-radius-nested)] overflow-hidden bg-black/5">
        <Image
          key={isProtocol ? protocolVariant : product.id}
          src={protocolImage}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
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

        {/* Pricing */}
        <div className="mt-auto pt-4 border-t border-black/10">
          <div className="mb-2">
            {/* Daily Price */}
            {isSubscribe && originalDailyPrice ? (
              <div className="flex items-baseline gap-2 mb-1">
                <span className="premium-heading text-xl font-bold">
                  {dailyPrice}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)] line-through">
                  {originalDailyPrice}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                  /day
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-2 mb-1">
                <span className="premium-heading text-xl font-bold">
                  {dailyPrice}
                </span>
                <span className="premium-body-sm text-[var(--text-on-light-muted)]">
                  /day
                </span>
              </div>
            )}
            
            {/* Monthly Total */}
            {isSubscribe && originalMonthlyPrice ? (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] opacity-70">
                <span className="line-through">{originalMonthlyPrice}</span>{" "}
                <span>{monthlyPrice}</span>/month
              </p>
            ) : (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] opacity-70">
                {monthlyPrice}/month
              </p>
            )}
            
            {/* Pack Size */}
            <p className="premium-body-sm text-[var(--text-on-light-muted)] opacity-60 mt-1 text-xs">
              {perShotText}
            </p>
            
            {/* Protocol Savings */}
            {isProtocol && savings !== null && savings > 0 && (
              <p className="premium-body-sm mt-2" style={{ color: "#3a9f7e" }}>
                Save £{savings.toFixed(2)} vs buying separately
              </p>
            )}
            
            {isSubscribe && (
              <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-1 opacity-70 text-xs">
                Cancel anytime
              </p>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={onAddToCart}
            className="w-full py-3 rounded-[var(--premium-radius-interactive)] font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3"
            style={{
              background: buttonGradient
                ? `linear-gradient(to right, ${buttonGradient.start}, ${buttonGradient.end})`
                : (accentColor ?? "#000"),
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
