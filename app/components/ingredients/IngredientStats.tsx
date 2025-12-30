"use client";

import { IngredientStat } from "@/app/lib/ingredientsData";

interface IngredientStatsProps {
  stats: IngredientStat[];
  accentColor?: string;
}

export default function IngredientStats({ stats, accentColor = "text-current" }: IngredientStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="neo-box p-4 text-center"
        >
          <p className={`text-3xl lg:text-4xl font-bold font-clinical ${accentColor}`}>
            {stat.value}
          </p>
          <p className="font-medium text-sm mt-1">{stat.label}</p>
          <p className="font-clinical text-xs opacity-50 mt-1">{stat.source}</p>
        </div>
      ))}
    </div>
  );
}

