"use client";

import { useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics/react";
import IngredientsPanel from "./IngredientsPanel";

type ProductId = "flow" | "clear";

interface ProductTile {
  id: ProductId;
  name: string;
  dose: "AM" | "PM";
  window: string;
  bottleSrc: string;
  bottleAlt: string;
}

interface InfoTile {
  id: `${ProductId}-info`;
  productId: ProductId;
  dose: "AM" | "PM";
  window: string;
  spec: { label: string; value: string }[];
}

const FLOW_PRODUCT: ProductTile = {
  id: "flow",
  name: "CONKA Flow",
  dose: "AM",
  window: "06:00–10:00",
  bottleSrc: "/formulas/conkaFlow/FlowNoBackground.png",
  bottleAlt: "CONKA Flow bottle",
};

const CLEAR_PRODUCT: ProductTile = {
  id: "clear",
  name: "CONKA Clear",
  dose: "PM",
  window: "12:00–16:00",
  bottleSrc: "/formulas/conkaClear/ClearNoBackground.png",
  bottleAlt: "CONKA Clear bottle",
};

const FLOW_INFO: InfoTile = {
  id: "flow-info",
  productId: "flow",
  dose: "AM",
  window: "06:00–10:00",
  spec: [
    { label: "ONSET", value: "20 MIN" },
    { label: "DURATION", value: "4–5 HR" },
    { label: "KEY ACTIVES", value: "LEMON BALM · RHODIOLA · ASHWAGANDHA" },
    { label: "USE CASE", value: "CALM MORNING FOCUS" },
  ],
};

const CLEAR_INFO: InfoTile = {
  id: "clear-info",
  productId: "clear",
  dose: "PM",
  window: "12:00–16:00",
  spec: [
    { label: "ONSET", value: "20 MIN" },
    { label: "DURATION", value: "4–5 HR" },
    { label: "KEY ACTIVES", value: "ALPHA-GPC · ALCAR · GINKGO" },
    { label: "USE CASE", value: "AFTERNOON RESET" },
  ],
};

function ProductCard({
  tile,
  onOpenIngredients,
}: {
  tile: ProductTile;
  onOpenIngredients: (id: ProductId) => void;
}) {
  return (
    <div className="flex flex-col items-center text-center bg-white border border-black/8 p-4 lg:p-6">
      <div className="self-start mb-3 flex items-baseline gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-black">
          {tile.dose}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 tabular-nums">
          {tile.window}
        </span>
      </div>

      <div className="relative w-20 h-40 lg:w-28 lg:h-52 mb-3">
        <Image
          src={tile.bottleSrc}
          alt={tile.bottleAlt}
          fill
          sizes="(max-width: 1024px) 80px, 112px"
          className="object-contain scale-150"
        />
      </div>

      <p className="text-sm lg:text-base font-semibold text-black mb-3">
        {tile.name}
      </p>

      <button
        type="button"
        onClick={() => onOpenIngredients(tile.id)}
        className="lab-clip-tr mt-auto w-full px-3 py-2.5 bg-[#1B2757] text-white font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
      >
        Ingredients
      </button>
    </div>
  );
}

function InfoCard({ tile }: { tile: InfoTile }) {
  return (
    <div className="lab-asset-frame bg-white text-black p-4 lg:p-6 flex flex-col">
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/45 mb-4">
        {tile.dose} · {tile.window} · SPEC
      </p>

      <div className="flex-1 flex flex-col justify-center gap-3">
        {tile.spec.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-0.5 border-l-2 border-black/25 pl-3"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/45">
              {row.label}
            </p>
            <p className="font-mono text-[10px] lg:text-xs font-bold uppercase tracking-[0.1em] text-black leading-tight">
              {row.value}
            </p>
          </div>
        ))}
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
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {/* Row 1 — Flow: product | info */}
        <ProductCard tile={FLOW_PRODUCT} onOpenIngredients={openIngredients} />
        <InfoCard tile={FLOW_INFO} />

        {/* Row 2 — Clear: info | product  (mirrored, so products bookend) */}
        <InfoCard tile={CLEAR_INFO} />
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
