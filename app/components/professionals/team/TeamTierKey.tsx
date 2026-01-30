"use client";

import {
  B2B_TIER_BANDS,
  b2bFormulaPricing,
  formatPrice,
  getB2BTier,
} from "@/app/lib/productData";
import type { B2BTier } from "@/app/lib/productData";

const TIER_ORDER: B2BTier[] = ["starter", "squad", "elite"];
const RRP_28 = 79.99;
// 26 bricks = entrance to Elite; aligns with Starter (1–10), Squad (11–25), Elite (26+)
const NUM_BRICKS = 26;
const STARTER_BRICKS = 10;   // 1–10
const SQUAD_BRICKS = 15;     // 11–25
const ELITE_BRICKS = 1;      // 26

function tierLabel(tier: B2BTier): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

function quantityRange(tier: B2BTier): string {
  const { min, max } = B2B_TIER_BANDS[tier];
  if (max === Infinity) return `${min}+ boxes`;
  return `${min}–${max} boxes`;
}

function savingsPercent(tier: B2BTier): number {
  const price = b2bFormulaPricing.subscription[tier].price;
  return Math.round(((RRP_28 - price) / RRP_28) * 100);
}

interface TeamTierKeyProps {
  /** Total B2B boxes currently in cart; scale fills this many bricks. Default 0. */
  totalBoxes?: number;
}

export default function TeamTierKey({ totalBoxes = 0 }: TeamTierKeyProps) {
  const currentTier = getB2BTier(totalBoxes);
  const filledCount = Math.min(totalBoxes, NUM_BRICKS);
  const caption =
    totalBoxes === 0
      ? "0 boxes in cart"
      : totalBoxes >= NUM_BRICKS
        ? `26+ boxes in cart · ${tierLabel(currentTier)}`
        : `${totalBoxes} box${totalBoxes === 1 ? "" : "es"} in cart · ${tierLabel(currentTier)}`;

  return (
    <section
      className="px-6 md:px-16 py-5 md:py-6"
      aria-label="Volume pricing by quantity"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-clinical text-xs uppercase tracking-wide opacity-70 mb-4">
          Price per box by quantity
        </h2>
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {TIER_ORDER.map((tier) => {
            const price = b2bFormulaPricing.subscription[tier].price;
            const save = savingsPercent(tier);
            return (
              <div
                key={tier}
                className="rounded-lg border border-black/10 bg-black/[0.02] p-4 flex flex-col"
              >
                <span className="font-clinical text-xs uppercase tracking-wide opacity-70">
                  Tier: {tierLabel(tier)}
                </span>
                <span className="font-clinical text-sm font-semibold text-[var(--foreground)] mt-1">
                  {quantityRange(tier)}
                </span>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-xl font-bold tabular-nums">
                    {formatPrice(price)}
                  </span>
                  <span
                    className="font-clinical text-2xl font-bold tabular-nums"
                    style={{ color: "#059669" }}
                  >
                    Save {save}%
                  </span>
                </div>
                <span className="font-clinical text-xs opacity-70 mt-1">
                  per box ex. VAT · vs RRP {formatPrice(RRP_28)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Your volume: one bar of 26 bricks (Starter 10 | Squad 15 | Elite 1), below tier explanation */}
        <div className="mt-6">
          <h2 className="font-clinical text-xs uppercase tracking-wide opacity-70 mb-2">
            Your volume
          </h2>
          <p className="font-clinical text-sm text-[var(--foreground)] mb-2">
            {caption}
          </p>
          <div
            className="grid gap-0.5 mt-0"
            style={{ gridTemplateColumns: `repeat(${NUM_BRICKS}, minmax(0, 1fr))` }}
            role="img"
            aria-label={`${totalBoxes} boxes in cart`}
          >
            {Array.from({ length: NUM_BRICKS }, (_, i) => (
              <div
                key={i}
                className={`rounded-sm transition-colors bg-gray-300 dark:bg-gray-600 min-w-0 ${
                  i < filledCount ? "!bg-emerald-600" : ""
                }`}
                style={{ aspectRatio: "4/3" }}
              />
            ))}
          </div>
          <div
            className="grid mt-1 font-clinical text-[10px] opacity-60"
            style={{ gridTemplateColumns: `${STARTER_BRICKS}fr ${SQUAD_BRICKS}fr ${ELITE_BRICKS}fr` }}
          >
            <span>Starter</span>
            <span>Squad</span>
            <span>26+ Elite</span>
          </div>
        </div>
      </div>
    </section>
  );
}
