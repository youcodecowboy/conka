"use client";

import { useState } from "react";
import useIsMobile from "../hooks/useIsMobile";
import IngredientsDesktop from "./IngredientsDesktop";
import IngredientsMobile from "./IngredientsMobile";

// Formula content data for ingredients section
const formulaContent = {
  "01": {
    name: "CONKA Flow",
    tagline: "Caffeine-Free Focus",
    patent: "Patented: GB2629279",
    ingredients: [
      { name: "Lemon Balm", part: "Leaves", percentage: "26.7%" },
      { name: "Turmeric", part: "Root", percentage: "25.4%" },
      { name: "Ashwagandha", part: "Plant", percentage: "26.7%" },
      { name: "Rhodiola rosea", part: "Root", percentage: "9.4%" },
      { name: "Bilberry", part: "Berries", percentage: "9.4%" },
      { name: "Black Pepper", part: "Root", percentage: "0.5%" },
    ],
    taste: "Citrus",
  },
  "02": {
    name: "CONKA Clear",
    tagline: "Peak Performance Boost",
    ingredients: [
      { name: "Vitamin C", part: "", percentage: "50.46%" },
      { name: "Alpha GPC", part: "Seeds", percentage: "16.11%" },
      { name: "Glutathione", part: "Amino acid", percentage: "10.07%" },
      { name: "N-Acetyl Cysteine", part: "Amino acid", percentage: "10.07%" },
      { name: "Acetyl-L-Carnitine", part: "Amino acid", percentage: "5.04%" },
      { name: "Ginkgo Biloba", part: "Leaves", percentage: "3.02%" },
      { name: "Lecithin", part: "Seeds", percentage: "1.51%" },
      {
        name: "Lemon essential oil",
        part: "natural flavouring",
        percentage: "0.60%",
      },
      {
        name: "Alpha Lipoic Acid (ALA)",
        part: "Fatty acid",
        percentage: "0.20%",
      },
      {
        name: "Vitamin B12",
        part: "(bacterial fermentation)",
        percentage: "0.03%",
      },
    ],
    taste: "Lemons",
  },
};

export default function Ingredients() {
  const isMobile = useIsMobile(1024); // lg breakpoint
  const [activeFormula, setActiveFormula] = useState<"01" | "02">("01");

  // Render mobile version on smaller viewports
  if (isMobile) {
    return (
      <IngredientsMobile
        activeFormula={activeFormula}
        setActiveFormula={setActiveFormula}
        formulaContent={formulaContent}
      />
    );
  }

  // Render desktop version on larger viewports
  return (
    <IngredientsDesktop
      activeFormula={activeFormula}
      setActiveFormula={setActiveFormula}
      formulaContent={formulaContent}
    />
  );
}
