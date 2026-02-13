"use client";

import { useRouter } from "next/navigation";
import ShopMegaMenuContent from "./ShopMegaMenuContent";
import type { ShopMegaMenuProps } from "./types";

export default function ShopMegaMenu({
  isOpen,
  onClose,
  hoveredSection,
  setHoveredSection,
  bannerConfig,
  hideBanner,
  onShopAreaEnter,
  onShopAreaLeave,
}: ShopMegaMenuProps) {
  const router = useRouter();

  if (!isOpen) return null;

  // Temporarily commented out for deployment feedback
  // const handleProfessionalsClick = () => {
  //   router.push("/professionals");
  //   onClose();
  // };

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
          {/* Left Side: Section Headers Stacked Vertically */}
          <div className="w-64 flex-shrink-0 border-r border-[var(--color-premium-stroke)] pr-8 pl-0">
            <div className="flex flex-col gap-4">
              <button
                onMouseEnter={() => setHoveredSection("protocols")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-[var(--premium-radius-nested)] border ${
                  hoveredSection === "protocols"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-[var(--color-premium-stroke)]"
                }`}
              >
                Shop by Protocol
              </button>
              <button
                onMouseEnter={() => setHoveredSection("formulas")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-[var(--premium-radius-nested)] border ${
                  hoveredSection === "formulas"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-[var(--color-premium-stroke)]"
                }`}
              >
                Shop by Individual Formula
              </button>
              <button
                onMouseEnter={() => setHoveredSection("quiz")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-[var(--premium-radius-nested)] border ${
                  hoveredSection === "quiz"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-[var(--color-premium-stroke)]"
                }`}
              >
                Help me Choose
              </button>
              {/* Temporarily commented out for deployment feedback */}
              {/* <button
                onMouseEnter={() => setHoveredSection("professionals")}
                onClick={handleProfessionalsClick}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 w-full ${
                  hoveredSection === "professionals"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                }`}
              >
                For Professionals
              </button> */}
            </div>
          </div>

          {/* Right Side: Dynamic Content Area */}
          <ShopMegaMenuContent
            hoveredSection={hoveredSection}
            onNavigate={onClose}
          />
        </div>
      </div>
    </div>
  );
}
