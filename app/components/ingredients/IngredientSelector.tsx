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
            className={`group flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
              isActive
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                : "border-current/20 hover:border-current/50"
            }`}
          >
            {/* Category dot */}
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-current opacity-50" : categoryInfo.color
              }`}
            />
            {/* Ingredient name */}
            <span className="font-clinical text-sm font-medium">
              {ingredient.name}
            </span>
            {/* Percentage badge */}
            <span
              className={`font-clinical text-xs ${
                isActive ? "opacity-70" : "opacity-50"
              }`}
            >
              {ingredient.percentage}
            </span>
          </button>
        );
      })}
    </div>
  );
}

