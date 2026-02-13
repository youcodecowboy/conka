"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormulaId } from "@/app/lib/productData";
import { getIngredientsByFormula } from "@/app/lib/ingredientsData";
import type { IngredientData } from "@/app/lib/ingredientsData";

const HEADING_WORD: Record<FormulaId, string> = {
  "01": "adaptogens",
  "02": "nootropics",
};

const SUBHEADING =
  "Crafted using the finest ingredients in nature, we meticulously choose only the highest quality sources, never settling for anything less.";

function getCarouselCaption(ingredient: IngredientData): string {
  const first = ingredient.description.split(". ")[0];
  return first ? `${first}.` : ingredient.description;
}

interface IngredientCardProps {
  ingredient: IngredientData;
}

const CARD_WIDTH = 240;
const GAP = 64;

function IngredientCard({ ingredient }: IngredientCardProps) {
  const caption = getCarouselCaption(ingredient);

  return (
    <figure
      className="flex-shrink-0 w-[200px] sm:w-[240px] snap-start"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Image: vertical pill shape (2 semicircles + short rect), 75% of card width; desktop: hover scale */}
      <div className="relative w-3/4 mx-auto aspect-[2/3] rounded-full overflow-hidden md:transition-transform md:duration-300 md:hover:scale-105">
        {ingredient.image ? (
          <Image
            src={ingredient.image}
            alt={ingredient.name}
            fill
            sizes="240px"
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-current/5 flex items-center justify-center rounded-full">
            <span className="font-clinical text-xs text-center px-2 opacity-60">
              {ingredient.name}
            </span>
          </div>
        )}
      </div>
      <p className="font-bold text-sm mt-4">{ingredient.name}</p>
      <figcaption className="text-sm text-black mt-2 font-normal">
        {caption}
      </figcaption>
    </figure>
  );
}

interface FormulaIngredientsProps {
  formulaId: FormulaId;
}

export default function FormulaIngredients({ formulaId }: FormulaIngredientsProps) {
  const ingredients = getIngredientsByFormula(formulaId);
  const headingWord = HEADING_WORD[formulaId];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    updateScrollState();
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [ingredients.length]);

  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container || !canScrollLeft) return;

    const scrollAmount = CARD_WIDTH + GAP;
    container.scrollTo({
      left: container.scrollLeft - scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container || !canScrollRight) return;

    const scrollAmount = CARD_WIDTH + GAP;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Header: split in half */}
      <div
        id="formula-ingredients-heading"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-12"
      >
        <div>
          <h2
            className="premium-section-heading"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Formulated with naturally beneficial{" "}
            <span className="font-semibold">{headingWord}</span>
          </h2>
        </div>
          <div className="flex flex-col gap-4 justify-center items-end text-right">
            <p className="text-sm md:text-base text-black/80 max-w-lg">
              {SUBHEADING}
            </p>
            <Link
              href="/ingredients"
              className="neo-button px-5 py-2.5 font-semibold text-sm w-fit inline-flex items-center gap-2"
            >
              See all ingredients
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
            {/* Nav toggles – Huel-style, below CTA */}
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-10 h-10 flex items-center justify-center border-2 border-[var(--foreground)] transition-all ${
                  canScrollLeft
                    ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 cursor-pointer"
                    : "bg-transparent text-current/30 cursor-not-allowed pointer-events-none"
                }`}
                aria-label="Previous ingredient"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-10 h-10 flex items-center justify-center border-2 border-[var(--foreground)] transition-all ${
                  canScrollRight
                    ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 cursor-pointer"
                    : "bg-transparent text-current/30 cursor-not-allowed pointer-events-none"
                }`}
                aria-label="Next ingredient"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-12 md:gap-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-2"
        >
          {ingredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    </>
  );
}
