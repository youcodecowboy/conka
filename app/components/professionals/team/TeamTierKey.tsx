"use client";

import {
  TEAM_TIER_BANDS,
  TEAM_PRICE_DISPLAY_INC_VAT,
  formatPrice,
} from "@/app/lib/productData";
import type { TeamTier } from "@/app/lib/productData";

const TIER_ORDER: TeamTier[] = ["starter", "squad", "elite"];
const RRP_28 = 79.99;

function quantityRange(tier: TeamTier): string {
  const { min, max } = TEAM_TIER_BANDS[tier];
  if (max === Infinity) return `${min}+ boxes`;
  return `${min}–${max} boxes`;
}

function savingsPercent(tier: TeamTier): number {
  const price = TEAM_PRICE_DISPLAY_INC_VAT["one-time"][tier];
  return Math.round(((RRP_28 - price) / RRP_28) * 100);
}

export default function TeamTierKey() {
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
            const price = TEAM_PRICE_DISPLAY_INC_VAT["one-time"][tier];
            const save = savingsPercent(tier);
            return (
              <div
                key={tier}
                className="rounded-lg border border-black/10 bg-black/[0.02] p-4 flex flex-col"
              >
                <span className="font-clinical text-sm font-semibold text-[var(--foreground)]">
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
                  per box inc. VAT · vs RRP {formatPrice(RRP_28)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
