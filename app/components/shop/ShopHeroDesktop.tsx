"use client";

import { pathData } from "@/app/components/ProtocolBuilder";
import { FORMULA_COLORS } from "@/app/lib/productData";

export default function ShopHeroDesktop() {
  const protocolIcons = [
    pathData.path1.icon,
    pathData.path2.icon,
    pathData.path3.icon,
    pathData.path4.icon,
  ];

  return (
    <div className="px-6 md:px-16 pt-8 md:pt-24 md:pb-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* ===== Headline ===== */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
          Clarity and Focus You Can Feel
        </h1>

        {/* ===== Subhead ===== */}
        <p className="font-clinical text-base md:text-lg lg:text-xl mb-12 md:mb-16 opacity-70">
          Start with Flow or Clarity, try a small pack, or explore a protocol
          when you're ready.
        </p>
      </div>
    </div>
  );
}
