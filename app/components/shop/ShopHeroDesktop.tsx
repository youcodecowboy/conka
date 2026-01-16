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
    <div className="px-6 md:px-16 py-16 md:py-24">
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

        {/* ===== Visual Flow Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16 max-w-4xl mx-auto">
          {/* Block 1: Primary Action → Flow/Clarity */}

          <div
            onClick={() => {
              document
                .getElementById("formulas")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left flex flex-col items-center cursor-pointer"
          >
            <h3 className="font-bold text-xl md:text-2xl mb-2">
              Start with Flow or Clarity
            </h3>
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center font-clinical text-xs font-bold border-2"
                  style={{
                    backgroundColor: FORMULA_COLORS["01"].hex,
                    color: "white",
                    borderColor: FORMULA_COLORS["01"].hex,
                  }}
                >
                  01
                </div>
                <div
                  className="w-12 h-16 md:w-14 md:h-20 rounded-md flex items-center justify-center font-clinical text-xs font-bold border-2"
                  style={{
                    backgroundColor: FORMULA_COLORS["02"].hex,
                    color: "white",
                    borderColor: FORMULA_COLORS["02"].hex,
                  }}
                >
                  02
                </div>
              </div>
              <div className="flex items-center gap-2">
                {["4", "8", "12"].map((size) => (
                  <div
                    key={size}
                    className="w-8 h-8 md:w-10 md:h-10 border-2 border-current rounded-md flex items-center justify-center font-clinical text-xs opacity-60 group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] group-hover:opacity-100 transition-colors"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <p className="font-clinical text-sm md:text-base opacity-80 text-center">
              Order Flow or Clarity individually, or try small packs first.
            </p>
          </div>

          {/* Block 2: Secondary Action → Protocols */}

          <a
            href="#protocols"
            className="neo-box p-6 md:p-8 hover:shadow-[8px_8px_0px_0px_var(--foreground)] transition-all duration-200 group text-left flex flex-col items-center"
          >
            <h3 className="font-bold text-xl md:text-2xl mb-2">
              Explore Proven Protocols
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {protocolIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="p-3 border-2 border-current rounded-md flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-colors"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8">{icon}</div>
                </div>
              ))}
            </div>
            <p className="font-clinical text-sm md:text-base opacity-80 text-center">
              Designed for specific mental goals — focus, memory, clarity.
            </p>
          </a>
        </div>

        {/* ===== Trust / Proof Microline ===== */}
        <p className="font-clinical text-xs md:text-sm text-center opacity-70">
          250+ clinical studies • Patent-protected formulas • Used by athletes
          worldwide
        </p>
      </div>
    </div>
  );
}
