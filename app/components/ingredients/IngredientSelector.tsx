"use client";

import { IngredientData, CATEGORY_INFO } from "@/app/lib/ingredientsData";

interface IngredientSelectorProps {
  ingredients: IngredientData[];
  activeIngredientId: string;
  onSelect: (id: string) => void;
}

export default function IngredientSelector({
  ingredients,
  activeIngredientId,
  onSelect,
}: IngredientSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => {
        const isActive = ingredient.id === activeIngredientId;
        const categoryInfo = CATEGORY_INFO[ingredient.category];
        
        return (
          <button
            key={ingredient.id}
            onClick={() => onSelect(ingredient.id)}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full border transition-all premium-body-sm ${
              isActive
                ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                : "border-[var(--color-premium-stroke)] hover:border-[var(--color-ink)]/30 text-[var(--color-ink)]"
            }`}
          >
            {/* Category dot */}
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-current opacity-50" : categoryInfo.color
              }`}
            />
            {/* Ingredient name */}
            <span className="font-medium">
              {ingredient.name}
            </span>
            {/* Percentage badge */}
            <span
              className={isActive ? "opacity-70" : "opacity-50"}
            >
              {ingredient.percentage}
            </span>
          </button>
        );
      })}
    </div>
  );
}

