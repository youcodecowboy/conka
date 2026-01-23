"use client";

import ShopMegaMenuContent from "./ShopMegaMenuContent";
import type { ShopMegaMenuProps, HoveredSection } from "./types";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-[var(--background)] border-b-2 border-current shadow-lg z-50"
      style={{
        top: bannerConfig && !hideBanner ? "136px" : "80px",
      }}
      onMouseEnter={onShopAreaEnter}
      onMouseLeave={onShopAreaLeave}
    >
      <div className="w-full px-6 md:px-16 py-8">
        <div className="flex gap-12 max-w-[1920px] mx-auto">
          {/* Left Side: Section Headers Stacked Vertically */}
          <div className="w-64 flex-shrink-0 border-r-2 border-current pr-8 pl-0">
            <div className="flex flex-col gap-4">
              <button
                onMouseEnter={() => setHoveredSection("protocols")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                  hoveredSection === "protocols"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                }`}
              >
                Shop by Protocol
              </button>
              <button
                onMouseEnter={() => setHoveredSection("formulas")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                  hoveredSection === "formulas"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                }`}
              >
                Shop by Individual Formula
              </button>
              <button
                onMouseEnter={() => setHoveredSection("quiz")}
                className={`px-4 py-3 text-left font-clinical text-sm font-bold transition-all rounded-lg border-2 ${
                  hoveredSection === "quiz"
                    ? "border-current bg-current/5"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-current/30"
                }`}
              >
                Help me Choose
              </button>
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
