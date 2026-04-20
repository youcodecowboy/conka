"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import IngredientsPanel from "../components/landing/IngredientsPanel";
import IngredientsButton from "../components/landing/IngredientsButton";

const PRODUCTS = [
  {
    id: "flow" as const,
    name: "CONKA Flow",
    sub: "Calm focus without caffeine.",
    dose: "AM",
    time: "07:00",
    src: "/formulas/conkaFlow/FlowNoBackground.png",
    alt: "CONKA Flow bottle",
  },
  {
    id: "clear" as const,
    name: "CONKA Clear",
    sub: "Afternoon clarity ritual.",
    dose: "PM",
    time: "14:00",
    src: "/formulas/conkaClear/ClearNoBackground.png",
    alt: "CONKA Clear bottle",
  },
];

export default function LabWhatsInsideMini() {
  const [openProduct, setOpenProduct] = useState<"flow" | "clear" | null>(null);

  const openIngredients = (product: "flow" | "clear") => {
    setOpenProduct(product);
    try {
      track("lab:ingredients_viewed", { product, source: "whats_inside" });
    } catch { /* fail silently */ }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="flex flex-col items-center text-center bg-white border border-black/8 p-4 lg:p-6"
          >
            {/* Dose label — clinical, no emoji, no color */}
            <div className="self-start mb-3 flex items-baseline gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black">
                {p.dose}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/35">
                {p.time}
              </span>
            </div>

            {/* Bottle image */}
            <div className="relative w-20 h-44 lg:w-32 lg:h-64 mb-3">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 80px, 128px"
                className="object-contain scale-150"
              />
            </div>

            <p className="text-sm lg:text-base font-semibold text-black">
              {p.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-black/45 mt-1 mb-3 leading-snug max-w-[16ch]">
              {p.sub}
            </p>

            {/* Ingredients button — bg matches tint section background */}
            <IngredientsButton
              product={p.id}
              onClick={() => openIngredients(p.id)}
              className="w-full px-3 text-xs mt-auto font-mono uppercase tracking-[0.08em] bg-[var(--brand-tint)]"
              iconSize={12}
            />
          </div>
        ))}
      </div>

      <IngredientsPanel
        isOpen={openProduct !== null}
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </>
  );
}
