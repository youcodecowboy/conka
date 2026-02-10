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

/** Resolve chemical structure image URL: local asset if set, else PubChem PNG from molecularStructure. */
function getStructureImageUrl(ingredient: IngredientData): string | null {
  if (ingredient.structureImage) return ingredient.structureImage;
  if (ingredient.molecularStructure) {
    return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${ingredient.molecularStructure.pubchemCid}/PNG`;
  }
  return null;
}

interface IngredientCardProps {
  ingredient: IngredientData;
}

const CARD_WIDTH = 240;
const GAP = 64;

function IngredientCard({ ingredient }: IngredientCardProps) {
  const caption = getCarouselCaption(ingredient);
  const structureImageUrl = getStructureImageUrl(ingredient);
  const hasStructure = !!structureImageUrl;

  return (
    <figure
      className="flex-shrink-0 w-[200px] sm:w-[240px] snap-start"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Image: vertical pill shape; hover shows chemical structure when available */}
      <div className="group relative w-3/4 mx-auto aspect-[2/3] rounded-full overflow-hidden md:transition-transform md:duration-300 md:hover:scale-105">
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
        {/* Hover overlay: chemical structure (from structureImage or PubChem via molecularStructure) */}
        {hasStructure && (
          <div
            className="absolute inset-0 rounded-full bg-[var(--background)]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2"
            aria-hidden
          >
            {ingredient.molecularStructure?.activeCompound && (
              <span className="font-clinical text-[10px] uppercase tracking-wider text-black/60 mb-1">
                {ingredient.molecularStructure.activeCompound}
              </span>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={structureImageUrl}
              alt=""
              className="max-w-full max-h-full w-auto h-auto object-contain rounded"
              loading="lazy"
              crossOrigin="anonymous"
            />
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
    <section
      className="w-full py-12 md:py-16 overflow-x-hidden"
      style={{ background: "var(--color-surface)" }}
      aria-labelledby="formula-ingredients-heading"
    >
      {/* Header: constrained, split in half */}
      <div className="max-w-[79.2rem] mx-auto px-4 md:px-6 lg:px-8">
        <div
          id="formula-ingredients-heading"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-12"
        >
          <div>
            <h2 className="premium-section-heading">
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
      </div>

      {/* Carousel: constrained width, clipped edges */}
      <div className="max-w-[79.2rem] mx-auto px-4 md:px-6 lg:px-8 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-12 md:gap-16 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth py-2"
          >
            {ingredients.map((ingredient) => (
              <IngredientCard key={ingredient.id} ingredient={ingredient} />
            ))}
          </div>
      </div>
    </section>
  );
}
