"use client";

import { IngredientStat } from "@/app/lib/ingredientsData";

interface IngredientStatsProps {
  stats: IngredientStat[];
  accentColor?: string;
  /** When true, use subtle background (e.g. inside a section card) */
  nested?: boolean;
}

export default function IngredientStats({ stats, accentColor = "text-current", nested = false }: IngredientStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`p-4 text-center ${
            nested
              ? "rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)]/15"
              : "rounded-[var(--premium-radius-card)] bg-white"
          }`}
        >
          <p className={`text-3xl lg:text-4xl font-bold font-clinical ${accentColor}`}>
            {stat.value}
          </p>
          <p className="font-medium premium-body-sm mt-1 text-[var(--color-ink)]">{stat.label}</p>
          <p className="premium-body-sm opacity-50 mt-1">{stat.source}</p>
        </div>
      ))}
    </div>
  );
}

