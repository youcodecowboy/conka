"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IngredientData,
  CATEGORY_INFO,
  getIngredientsByFormula,
} from "@/app/lib/ingredientsData";
import { FormulaId, FORMULA_COLORS } from "@/app/lib/productData";
import IngredientCarousel from "./IngredientCarousel";
import IngredientStats from "./IngredientStats";
import IngredientBenefits from "./IngredientBenefits";
import IngredientStudies from "./IngredientStudies";

interface IngredientsPageMobileProps {
  activeFormula: FormulaId;
  setActiveFormula: (formula: FormulaId) => void;
}

export default function IngredientsPageMobile({
  activeFormula,
  setActiveFormula,
}: IngredientsPageMobileProps) {
  const ingredients = getIngredientsByFormula(activeFormula);
  const [activeIngredientId, setActiveIngredientId] = useState(ingredients[0]?.id || "");

  const activeIngredient = ingredients.find((ing) => ing.id === activeIngredientId) || ingredients[0];
  const accentColor = FORMULA_COLORS[activeFormula];
  const categoryInfo = activeIngredient ? CATEGORY_INFO[activeIngredient.category] : null;

  // Reset to first ingredient when formula changes
  const handleFormulaChange = (formula: FormulaId) => {
    setActiveFormula(formula);
    const newIngredients = getIngredientsByFormula(formula);
    setActiveIngredientId(newIngredients[0]?.id || "");
  };

  if (!activeIngredient) return null;

  return (
    <div className="min-h-screen pt-6 pb-8">
      {/* Header */}
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold mb-1">The Science Inside</h1>
        <p className="font-commentary text-base opacity-70">explore every ingredient</p>
      </div>

      {/* Formula Toggle */}
      <div className="px-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleFormulaChange("01")}
            className={`flex-1 py-2 px-3 rounded-full font-clinical text-sm transition-all flex items-center justify-center gap-2 ${
              activeFormula === "01"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "border-2 border-current/20 hover:border-current/40"
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-sm ${activeFormula === "01" ? "bg-amber-500" : "bg-amber-500"}`} />
            Conka Flow
          </button>
          <button
            onClick={() => handleFormulaChange("02")}
            className={`flex-1 py-2 px-3 rounded-full font-clinical text-sm transition-all flex items-center justify-center gap-2 ${
              activeFormula === "02"
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "border-2 border-current/20 hover:border-current/40"
            }`}
          >
            <span className={`w-2.5 h-2.5 rounded-sm bg-[#AAB9BC]`} />
            Conka Clarity
          </button>
        </div>
      </div>

      {/* Ingredient Carousel */}
      <div className="mb-6">
        <IngredientCarousel
          ingredients={ingredients}
          activeIngredientId={activeIngredientId}
          onSelect={setActiveIngredientId}
        />
      </div>

      {/* Active Ingredient Content */}
      <div className="px-4 space-y-6">
        {/* Main Card */}
        <div className="neo-box overflow-hidden">
          {/* Header */}
          <div className="neo-box-inverted p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-white text-xs font-clinical ${categoryInfo?.color}`}>
                    {categoryInfo?.name}
                  </span>
                </div>
                <h2 className="text-xl font-bold">{activeIngredient.name}</h2>
                <p className="font-clinical text-xs opacity-70">{activeIngredient.scientificName}</p>
              </div>
              <div className="text-right">
                <p className="font-clinical text-xs opacity-70">of formula</p>
                <p className={`text-2xl font-bold font-clinical`}>{activeIngredient.percentage}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-video">
            {activeIngredient.image ? (
              <Image
                src={activeIngredient.image}
                alt={activeIngredient.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full placeholder-box flex items-center justify-center">
                <span className="font-clinical text-sm">[{activeIngredient.name.toUpperCase()} IMAGE]</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="p-4 border-t-2 border-current/10">
            <p className="text-sm leading-relaxed">{activeIngredient.description}</p>
          </div>
        </div>

        {/* Key Stats */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Key Statistics
          </h3>
          <IngredientStats stats={activeIngredient.keyStats} accentColor={accentColor.text} />
        </div>

        {/* How It Works */}
        <div className="neo-box p-4">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            How It Works
          </h3>
          <p className="text-sm opacity-80 leading-relaxed">{activeIngredient.mechanismOfAction}</p>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Key Benefits
          </h3>
          <IngredientBenefits benefits={activeIngredient.benefits} accentColor={accentColor.text} />
        </div>

        {/* Clinical Studies */}
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Clinical Studies
          </h3>
          <IngredientStudies studies={activeIngredient.clinicalStudies} accentColor={accentColor.text} />
        </div>

        {/* Synergies */}
        <div className="neo-box p-4">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Works Well With
          </h3>
          <div className="flex flex-wrap gap-2">
            {activeIngredient.synergies.map((synergy, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full border-2 border-current/20 font-clinical text-xs"
              >
                {synergy}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="text-center py-4">
          <p className="font-commentary text-sm opacity-50">
            scroll up and swipe to explore more ingredients
          </p>
        </div>
      </div>
    </div>
  );
}

