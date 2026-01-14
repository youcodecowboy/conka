"use client";

import { useState } from "react";
import Image from "next/image";
import {
  IngredientData,
  CATEGORY_INFO,
  getIngredientsByFormula,
} from "@/app/lib/ingredientsData";
import { FormulaId, FORMULA_COLORS } from "@/app/lib/productData";
import IngredientSelector from "./IngredientSelector";
import IngredientStats from "./IngredientStats";
import IngredientBenefits from "./IngredientBenefits";
import IngredientStudies from "./IngredientStudies";
import { MolecularStructure } from "./MolecularStructure";

interface IngredientsPageDesktopProps {
  activeFormula: FormulaId;
  setActiveFormula: (formula: FormulaId) => void;
}

export default function IngredientsPageDesktop({
  activeFormula,
  setActiveFormula,
}: IngredientsPageDesktopProps) {
  const ingredients = getIngredientsByFormula(activeFormula);
  const [activeIngredientId, setActiveIngredientId] = useState(
    ingredients[0]?.id || "",
  );

  const activeIngredient =
    ingredients.find((ing) => ing.id === activeIngredientId) || ingredients[0];
  const accentColor = FORMULA_COLORS[activeFormula];
  const categoryInfo = activeIngredient
    ? CATEGORY_INFO[activeIngredient.category]
    : null;

  // Reset to first ingredient when formula changes
  const handleFormulaChange = (formula: FormulaId) => {
    setActiveFormula(formula);
    const newIngredients = getIngredientsByFormula(formula);
    setActiveIngredientId(newIngredients[0]?.id || "");
  };

  if (!activeIngredient) return null;

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                The Science Inside
              </h1>
              <p className="font-clinical text-base">
                Explore every ingredient
              </p>
            </div>

            {/* Formula Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => handleFormulaChange("01")}
                className={`px-5 py-2 rounded-full border-2 border-current transition-all flex items-center gap-2 ${
                  activeFormula === "01"
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-transparent hover:bg-current/10"
                }`}
              >
                <span className="w-3 h-3 rounded-sm bg-amber-500" />
                <span className="font-clinical text-sm font-medium">
                  CONKA Flow
                </span>
              </button>
              <button
                onClick={() => handleFormulaChange("02")}
                className={`px-5 py-2 rounded-full border-2 border-current transition-all flex items-center gap-2 ${
                  activeFormula === "02"
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "bg-transparent hover:bg-current/10"
                }`}
              >
                <span className="w-3 h-3 rounded-sm bg-[#AAB9BC]" />
                <span className="font-clinical text-sm font-medium">
                  CONKA Clarity
                </span>
              </button>
            </div>
          </div>

          {/* Ingredient Selector Pills */}
          <IngredientSelector
            ingredients={ingredients}
            activeIngredientId={activeIngredientId}
            onSelect={setActiveIngredientId}
          />
        </div>

        {/* Main Content - Split View */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Image & Quick Info */}
          <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            {/* Ingredient Image */}
            <div className="neo-box overflow-hidden mb-6">
              {/* Percentage Badge - On Top */}
              <div className="p-4 border-b-2 border-current/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-clinical text-xs opacity-70">
                      Formula Percentage
                    </p>
                    <p className="text-3xl font-bold font-clinical">
                      {activeIngredient.percentage}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-white text-xs font-clinical ${categoryInfo?.color}`}
                  >
                    {categoryInfo?.name}
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="relative aspect-square">
                {activeIngredient.image ? (
                  <Image
                    src={activeIngredient.image}
                    alt={activeIngredient.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full placeholder-box flex items-center justify-center">
                    <span className="font-clinical text-sm">
                      [{activeIngredient.name.toUpperCase()} IMAGE]
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Chemical Structure */}
            {activeIngredient.molecularStructure ? (
              <MolecularStructure
                structure={activeIngredient.molecularStructure}
                ingredientName={activeIngredient.name}
              />
            ) : (
              <div className="neo-box p-4">
                <p className="font-clinical text-xs opacity-50 uppercase mb-3">
                  Chemical Structure
                </p>
                <div className="aspect-video placeholder-box">
                  <span className="font-clinical text-xs">
                    [MOLECULAR STRUCTURE]
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Detailed Information */}
          <div className="lg:w-3/5 space-y-8">
            {/* Header Info */}
            <div className="neo-box overflow-hidden">
              <div className="neo-box-inverted p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-1">
                      {activeIngredient.name}
                    </h2>
                    <p className="font-clinical text-base opacity-80">
                      {activeIngredient.scientificName}
                    </p>
                  </div>
                  <div
                    className={`text-5xl font-bold font-clinical ${accentColor.text}`}
                  >
                    {activeIngredient.percentage}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed">
                  {activeIngredient.description}
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Key Statistics
              </h3>
              <IngredientStats
                stats={activeIngredient.keyStats}
                accentColor={accentColor.text}
              />
            </div>

            {/* Mechanism of Action */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                How It Works
              </h3>
              <p className="text-sm leading-relaxed opacity-80">
                {activeIngredient.mechanismOfAction}
              </p>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Key Benefits
              </h3>
              <IngredientBenefits
                benefits={activeIngredient.benefits}
                accentColor={accentColor.text}
              />
            </div>

            {/* Clinical Studies */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Clinical Studies
              </h3>
              <IngredientStudies
                studies={activeIngredient.clinicalStudies}
                accentColor={accentColor.text}
              />
            </div>

            {/* Synergies */}
            <div className="neo-box p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
