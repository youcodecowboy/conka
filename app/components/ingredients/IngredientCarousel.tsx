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
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

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
                className={`neo-box overflow-hidden ${
                  isActive
                    ? "border-2 border-[var(--foreground)]"
                    : "border border-current/30"
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
                    <div className="w-full h-full placeholder-box bg-current/5 flex items-center justify-center">
                      <span className="font-clinical text-[8px] text-center px-1">
                        [{ingredient.name.toUpperCase()}]
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${categoryInfo.color}`}
                    />
                    <span className="font-clinical text-[10px] opacity-60 truncate">
                      {categoryInfo.name}
                    </span>
                  </div>
                  <p className="font-bold text-xs truncate">
                    {ingredient.name}
                  </p>
                  <p className="font-clinical text-sm font-medium">
                    {ingredient.percentage}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Hint */}
      <p className="font-commentary text-md text-center mt-2 ">
        swipe to explore
      </p>
    </div>
  );
}
