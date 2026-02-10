"use client";

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
  const firstSentence = ingredient.description.split(". ")[0];
  if (firstSentence) return `${firstSentence}.`;
  if (ingredient.benefits?.[0]?.description) {
    return ingredient.benefits[0].description;
  }
  return "";
}

interface IngredientCardProps {
  ingredient: IngredientData;
}

function IngredientCard({ ingredient }: IngredientCardProps) {
  const caption = getCarouselCaption(ingredient);

  return (
    <div
      className="flex-shrink-0 w-[180px] sm:w-[200px] snap-start"
      style={{ scrollSnapAlign: "start" }}
    >
      <div
        className="overflow-hidden rounded-lg"
        style={{ borderRadius: "var(--premium-radius-base)" }}
      >
        {/* Oblong image container */}
        <div className="relative w-full aspect-[4/3]">
          {ingredient.image ? (
            <Image
              src={ingredient.image}
              alt={ingredient.name}
              fill
              sizes="200px"
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full bg-current/5 flex items-center justify-center"
              style={{ borderRadius: "var(--premium-radius-base)" }}
            >
              <span className="font-clinical text-xs text-center px-2 opacity-60">
                {ingredient.name}
              </span>
            </div>
          )}
        </div>
        {/* Name and caption */}
        <div className="pt-2">
          <p className="font-bold text-sm">{ingredient.name}</p>
          <p className="font-clinical text-xs opacity-70 line-clamp-2 mt-0.5">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FormulaIngredientsProps {
  formulaId: FormulaId;
}

export default function FormulaIngredients({ formulaId }: FormulaIngredientsProps) {
  const ingredients = getIngredientsByFormula(formulaId);
  const headingWord = HEADING_WORD[formulaId];

  return (
    <section
      className="premium-section"
      aria-labelledby="formula-ingredients-heading"
    >
      <div className="premium-container">
        <div className="mb-6 md:mb-8">
          <h2
            id="formula-ingredients-heading"
            className="premium-heading mb-2"
          >
            Formulated with naturally beneficial {headingWord}
          </h2>
          <p className="premium-annotation opacity-80 mb-4">
            {SUBHEADING}
          </p>
          <Link
            href="/ingredients"
            className="inline-flex items-center gap-1 font-semibold text-sm underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            See all ingredients
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:-mx-6 md:px-6 pb-2"
          role="list"
        >
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} role="listitem">
              <IngredientCard ingredient={ingredient} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
