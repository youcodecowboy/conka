"use client";

import Image from "next/image";
import { getFormulaImage, getProtocolImage } from "@/app/lib/productImageConfig";
import type { ShopMegaMenuProps } from "./types";

const PRODUCTS = [
  {
    name: "Both (Flow + Clear)",
    description: "The full daily system — morning focus meets afternoon clarity.",
    href: "/protocol/3",
    image: getProtocolImage("3"),
    alt: "CONKA Flow and Clear",
  },
  {
    name: "CONKA Flow",
    description: "Morning focus & energy. Rhodiola, Ashwagandha, Lemon Balm.",
    href: "/conka-flow",
    image: getFormulaImage("01"),
    alt: "CONKA Flow",
  },
  {
    name: "CONKA Clear",
    description: "Afternoon clarity & recovery. Glutathione, Ginkgo, Alpha GPC.",
    href: "/conka-clarity",
    image: getFormulaImage("02"),
    alt: "CONKA Clear",
  },
];

const LEARN_MORE = [
  {
    label: "What is in CONKA Flow and Clear?",
    href: "/ingredients",
  },
  {
    label: "Why CONKA?",
    href: "/why-conka",
  },
  {
    label: "What is the CONKA App?",
    href: "/app",
  },
];

export default function ShopMegaMenu({
  isOpen,
  onClose,
  bannerConfig,
  hideBanner,
  onShopAreaEnter,
  onShopAreaLeave,
}: ShopMegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-[var(--background)] border-b border-[var(--color-premium-stroke)] shadow-lg z-50"
      style={{
        top: bannerConfig && !hideBanner ? "136px" : "80px",
      }}
      onMouseEnter={onShopAreaEnter}
      onMouseLeave={onShopAreaLeave}
    >
      <div className="w-full px-6 md:px-16 py-8">
        <div className="flex gap-12 max-w-[1920px] mx-auto">
          {/* Left sidebar — thin nav column */}
          <div className="w-64 flex-shrink-0 border-r border-[var(--color-premium-stroke)] pr-8">
            <div className="flex flex-col gap-2">
              <p className="px-4 py-3 font-clinical text-sm font-bold">
                Shop by Product
              </p>

              {/* Divider */}
              <div className="border-t border-[var(--color-premium-stroke)] my-2" />

              <p className="font-clinical text-xs uppercase tracking-wide opacity-50 mb-2 px-4">
                Learn More
              </p>
              {LEARN_MORE.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-[var(--brand-radius-interactive)] border border-transparent opacity-60 hover:opacity-100 hover:border-[var(--color-premium-stroke)] hover:bg-current/5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right content — product cards in a row */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <a
                  key={product.href}
                  href={product.href}
                  onClick={onClose}
                  className="group rounded-[var(--brand-radius-container)] border border-black/6 hover:border-black/15 overflow-hidden transition-all"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      sizes="(max-width: 1920px) 25vw, 500px"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-base text-black">
                      {product.name}
                    </p>
                    <p className="font-clinical text-xs text-black/50 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
