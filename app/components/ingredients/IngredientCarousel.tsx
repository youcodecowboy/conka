"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { IngredientData, CATEGORY_INFO } from "@/app/lib/ingredientsData";

interface IngredientCarouselProps {
  ingredients: IngredientData[];
  activeIngredientId: string;
  onSelect: (id: string) => void;
}

export default function IngredientCarousel({
  ingredients,
  activeIngredientId,
  onSelect,
}: IngredientCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Scroll to active ingredient when it changes
  useEffect(() => {
    const activeElement = itemRefs.current.get(activeIngredientId);
    if (activeElement && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft =
        activeElement.offsetLeft -
        container.offsetWidth / 2 +
        activeElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeIngredientId]);

  return (
    <div className="relative">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-2 -mx-4"
      >
        {ingredients.map((ingredient) => {
          const isActive = ingredient.id === activeIngredientId;
          const categoryInfo = CATEGORY_INFO[ingredient.category];

          return (
            <button
              key={ingredient.id}
              ref={(el) => {
                if (el) itemRefs.current.set(ingredient.id, el);
              }}
              onClick={() => onSelect(ingredient.id)}
              className={`flex-shrink-0 w-32 transition-all ${
                isActive ? "scale-105" : "opacity-70"
              }`}
            >
              <div
                className={`rounded-[var(--premium-radius-card)] bg-white border border-[var(--color-premium-stroke)] overflow-hidden p-0 transition-colors ${
                  isActive
                    ? "ring-2 ring-[var(--color-ink)]"
                    : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-square">
                  {ingredient.image ? (
                    <Image
                      src={ingredient.image}
                      alt={ingredient.name}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-premium-stroke)]/20 rounded-b-[var(--premium-radius-card)]">
                      <span className="font-clinical text-[8px] text-center px-1 text-[var(--color-ink)] opacity-60">
                        [{ingredient.name.toUpperCase()}]
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2 text-[var(--color-ink)]">
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${categoryInfo.color}`}
                    />
                    <span className="premium-body-sm opacity-60 truncate">
                      {categoryInfo.name}
                    </span>
                  </div>
                  <p className="font-bold text-xs truncate">
                    {ingredient.name}
                  </p>
                  <p className="premium-body-sm font-medium">
                    {ingredient.percentage}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Hint */}
      <p className="premium-body-sm text-center mt-2 opacity-60">
        swipe to explore
      </p>
    </div>
  );
}
