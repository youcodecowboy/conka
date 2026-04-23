"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import ConkaCTAButton from "./ConkaCTAButton";
import IngredientsPanel from "./IngredientsPanel";

type ProductId = "flow" | "clear";

interface ProductTile {
  id: ProductId;
  name: string;
  dose: "AM" | "PM";
  window: string;
  tagline: string;
  bottleSrc: string;
  bottleAlt: string;
}

const FLOW_PRODUCT: ProductTile = {
  id: "flow",
  name: "CONKA Flow",
  dose: "AM",
  window: "06:00–10:00",
  tagline: "Calm morning focus.",
  bottleSrc: "/formulas/conkaFlow/FlowNoBackground.png",
  bottleAlt: "CONKA Flow bottle",
};

const CLEAR_PRODUCT: ProductTile = {
  id: "clear",
  name: "CONKA Clear",
  dose: "PM",
  window: "12:00–16:00",
  tagline: "Afternoon reset.",
  bottleSrc: "/formulas/conkaClear/ClearNoBackground.png",
  bottleAlt: "CONKA Clear bottle",
};

function ProductCard({
  tile,
  onOpenIngredients,
}: {
  tile: ProductTile;
  onOpenIngredients: (id: ProductId) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center bg-white border border-black/8 p-5 lg:p-8">
      <div className="self-start mb-4 flex items-baseline gap-2">
        <span className="font-mono text-xs lg:text-sm font-bold uppercase tracking-[0.18em] text-black">
          {tile.dose}
        </span>
        <span className="font-mono text-[9px] lg:text-[10px] uppercase tracking-[0.14em] text-black/35 tabular-nums">
          {tile.window}
        </span>
      </div>

      <div className="relative w-24 h-48 lg:w-44 lg:h-80 mb-4 lg:mb-6">
        <Image
          src={tile.bottleSrc}
          alt={tile.bottleAlt}
          fill
          sizes="(max-width: 1024px) 96px, 176px"
          className="object-contain scale-150"
        />
      </div>

      <p className="text-base lg:text-2xl font-semibold text-black mb-1">
        {tile.name}
      </p>
      <p className="text-xs lg:text-base text-black/55 mb-4 lg:mb-6">
        {tile.tagline}
      </p>

      <div className="mt-auto w-full">
        <ConkaCTAButton compact onClick={() => onOpenIngredients(tile.id)}>
          Ingredients
        </ConkaCTAButton>
      </div>
    </div>
  );
}

export default function LabWhatsInsideMini() {
  const [openProduct, setOpenProduct] = useState<ProductId | null>(null);

  const openIngredients = (product: ProductId) => {
    setOpenProduct(product);
    try {
      track("lab:ingredients_viewed", { product, source: "whats_inside" });
    } catch { /* fail silently */ }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:gap-6">
        <ProductCard tile={FLOW_PRODUCT} onOpenIngredients={openIngredients} />
        <ProductCard tile={CLEAR_PRODUCT} onOpenIngredients={openIngredients} />
      </div>

      <IngredientsPanel
        isOpen={openProduct !== null}
        product={openProduct}
        onClose={() => setOpenProduct(null)}
      />
    </>
  );
}
