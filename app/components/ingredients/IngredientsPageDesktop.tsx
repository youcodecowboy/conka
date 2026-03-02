"use client";

import { useState } from "react";
import Image from "next/image";
import FormulaToggle from "@/app/components/FormulaToggle";
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
    <div className="space-y-12">
      {/* Header Section */}
      <div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="premium-section-heading text-[var(--color-ink)] mb-2">
              The Science Inside
            </h1>
            <p className="premium-body-sm opacity-80">
              Explore every ingredient
            </p>
          </div>

          <FormulaToggle
            value={activeFormula}
            onChange={handleFormulaChange}
            ariaLabel="Ingredients formula"
          />
        </div>

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
          {/* Ingredient Image - bone, no border */}
          <div
            className="overflow-hidden mb-6 rounded-[var(--premium-radius-card)] bg-white"
          >
            <div className="p-4 border-b border-[var(--color-premium-stroke)]/30 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="premium-body-sm opacity-70">
                    Formula Percentage
                  </p>
                  <p className="text-3xl font-bold font-clinical text-[var(--color-ink)]">
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
                <div className="w-full h-full flex items-center justify-center bg-[var(--color-premium-stroke)]/30 rounded-b-[var(--premium-radius-card)]">
                  <span className="font-clinical text-sm text-[var(--color-ink)] opacity-60">
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
            <div className="rounded-[var(--premium-radius-card)] bg-white">
              <p className="premium-body-sm opacity-50 uppercase mb-3">
                Chemical Structure
              </p>
              <div className="aspect-video rounded-[var(--premium-radius-nested)] bg-[var(--color-premium-stroke)]/20 flex items-center justify-center">
                <span className="premium-body-sm opacity-60">
                  [MOLECULAR STRUCTURE]
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Detailed Information */}
        <div className="lg:w-3/5 space-y-8">
          {/* Header Info - no card wrapper, minimal padding */}
          <div className="overflow-hidden rounded-[var(--premium-radius-card)]">
            <div
              className="p-4 text-white"
              style={{ backgroundColor: "var(--color-neuro-blue-dark)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold mb-0.5">
                    {activeIngredient.name}
                  </h2>
                  <p className="premium-body-sm opacity-80">
                    {activeIngredient.scientificName}
                  </p>
                </div>
                <div
                  className={`text-5xl font-bold font-clinical shrink-0 ${accentColor.text}`}
                >
                  {activeIngredient.percentage}
                </div>
              </div>
            </div>
            <p className="premium-body text-[var(--color-ink)] leading-relaxed pt-4">
              {activeIngredient.description}
            </p>
          </div>

          {/* Key Stats */}
          <div>
            <h3 className="premium-heading text-[var(--color-ink)] mb-4 flex items-center gap-2">
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

          {/* Mechanism of Action - bone, no border */}
          <div className="rounded-[var(--premium-radius-card)] bg-white p-6">
            <h3 className="premium-heading text-[var(--color-ink)] mb-3 flex items-center gap-2">
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
            <p className="premium-body-sm text-[var(--color-ink)] opacity-80 leading-relaxed">
              {activeIngredient.mechanismOfAction}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="premium-heading text-[var(--color-ink)] mb-4 flex items-center gap-2">
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
            <h3 className="premium-heading text-[var(--color-ink)] mb-4 flex items-center gap-2">
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

          {/* Synergies - bone, no border */}
          <div className="rounded-[var(--premium-radius-card)] bg-white p-6">
            <h3 className="font-bold text-[var(--color-ink)] mb-3 flex items-center gap-2">
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
                  className="px-3 py-1 rounded-full bg-[var(--color-premium-stroke)]/30 premium-body-sm text-[var(--color-ink)]"
                >
                  {synergy}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
