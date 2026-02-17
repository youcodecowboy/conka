"use client";

import Image from "next/image";
import { protocolPricing } from "@/app/lib/productPricing";
import { formatPrice } from "@/app/lib/productHelpers";
import { getProtocolImage } from "@/app/lib/productImageConfig";
import { getProtocolVariantId } from "@/app/lib/shopifyProductMapping";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function TrialPackStrip() {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Get one-time 4-pack price from protocol pricing (starter tier)
  const trialPrice = protocolPricing.standard["one-time"].starter.price;

  // Balance Protocol (ID: "3") starter tier, one-time purchase
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const variantData = getProtocolVariantId("3", "starter", "one-time");
      if (variantData?.variantId) {
        await addToCart(variantData.variantId, 1, undefined, {
          location: "trial_pack_strip",
          source: "home_page",
        });
      } else {
        console.warn(
          "Variant ID not configured for Balance Protocol starter trial pack",
        );
      }
    } catch (error) {
      console.error("Failed to add trial pack to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section
      id="trial-packs"
      className="premium-section-luxury premium-bg-bone"
      aria-label="Trial Packs"
    >
      <div className="premium-track">
        {/* Header */}
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="premium-section-heading">Not Ready to Commit?</h2>
          <p className="premium-section-subtitle">
            Try the full system first: 2 CONKA Flow + 2 CONKA Clear shots in one
            trial pack.
          </p>
        </div>

        {/* Single Featured Card */}
        <div className="flex justify-center">
          {/* Mobile: Stack image above card */}
          <div className="w-full max-w-[600px] md:hidden flex flex-col">
            {/* Image */}
            <div className="relative w-full aspect-square mb-4">
              <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                <Image
                  src={getProtocolImage("3")}
                  alt="CONKA Balance Protocol Trial Pack"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Trial Pack Badge - Top Right */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-bone)]">
                  Trial Pack
                </div>
              </div>
            </div>
            {/* Card */}
            <div className="premium-card-soft premium-card-soft-stroke" style={{ backgroundColor: 'white' }}>
              <div className="px-6 py-8 flex flex-col">
                {/* Product Name */}
                <div className="mb-1">
                  <p className="premium-body-sm uppercase tracking-widest text-[var(--text-on-light-muted)] mb-2">
                    CONKA Balance Protocol
                  </p>
                </div>

                {/* Product Info Badge */}
                <div className="mb-1">
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

                {/* Headline */}
                <h3
                  className="premium-heading text-2xl font-bold mb-2"
                  style={{
                    letterSpacing: "var(--letter-spacing-premium-title)",
                  }}
                >
                  The complete CONKA experience
                </h3>

                {/* Body */}
                <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
                  2 CONKA Flow + 2 CONKA Clear shots. One of each, morning
                  energy and evening recovery in a single pack. The best way to
                  start.
                </p>

                {/* Benefit Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ Morning energy
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ Evening recovery
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ One complete cycle
                  </span>
                </div>

                {/* Price Block */}
                <div className="mb-4">
                  <p className="premium-heading text-xl font-bold mb-1">
                    {formatPrice(trialPrice)}
                  </p>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    One-time purchase · Subscribe & save 20% from your second
                    order
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-3 rounded-[var(--premium-radius-interactive)] font-semibold text-white bg-[var(--color-ink)] transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet: Image left, card right */}
          <div className="hidden md:flex w-full max-w-[900px] lg:max-w-[1000px] gap-6 lg:gap-8">
            {/* Image - Large square on desktop, scales for tablet */}
            <div className="flex items-center justify-center flex-shrink-0 w-[45%] lg:w-[40%]">
              <div className="relative w-full aspect-square">
                <div className="relative w-full h-full rounded-[var(--premium-radius-card)] overflow-hidden border border-black/10">
                  <Image
                    src={getProtocolImage("3")}
                    alt="CONKA Balance Protocol Trial Pack"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 45vw, 40vw"
                  />
                  {/* Trial Pack Badge - Top Right */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-bone)]">
                    Trial Pack
                  </div>
                </div>
              </div>
            </div>
            {/* Card - Right side */}
            <div className="flex-1 premium-card-soft premium-card-soft-stroke" style={{ backgroundColor: 'white' }}>
              <div className="px-6 py-8 flex flex-col">
                {/* Product Name */}
                <div className="mb-1">
                  <p className="premium-body-sm uppercase tracking-widest text-[var(--text-on-light-muted)] mb-2">
                    CONKA Balance Protocol
                  </p>
                </div>

                {/* Product Info Badge */}
                <div className="mb-1">
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

                {/* Headline */}
                <h3
                  className="premium-heading text-2xl font-bold mb-2"
                  style={{
                    letterSpacing: "var(--letter-spacing-premium-title)",
                  }}
                >
                  The complete CONKA experience
                </h3>

                {/* Body */}
                <p className="premium-body-sm text-[var(--text-on-light-muted)] mb-4">
                  2 CONKA Flow + 2 CONKA Clear shots. One of each, morning
                  energy and evening recovery in a single pack. The best way to
                  start.
                </p>

                {/* Benefit Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ Morning energy
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ Evening recovery
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--color-premium-stroke)] bg-[var(--color-premium-bg-soft)]">
                    ✓ One complete cycle
                  </span>
                </div>

                {/* Price Block */}
                <div className="mb-4">
                  <p className="premium-heading text-xl font-bold mb-1">
                    {formatPrice(trialPrice)}
                  </p>
                  <p className="premium-body-sm text-[var(--text-on-light-muted)]">
                    One-time purchase · Subscribe & save 20% from your second
                    order
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-3 rounded-[var(--premium-radius-interactive)] font-semibold text-white bg-[var(--color-ink)] transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
