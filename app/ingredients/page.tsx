"use client";

import { useState } from "react";
import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import IngredientsPageDesktop from "@/app/components/ingredients/IngredientsPageDesktop";
import IngredientsPageMobile from "@/app/components/ingredients/IngredientsPageMobile";
import { FormulaId } from "@/app/lib/productData";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function IngredientsPage() {
  const isMobile = useIsMobile();
  const [activeFormula, setActiveFormula] = useState<FormulaId>("01");

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      {isMobile === undefined ? (
        <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <p className="font-clinical text-sm opacity-50">Loading...</p>
          </div>
        </div>
      ) : isMobile ? (
        <IngredientsPageMobile
          activeFormula={activeFormula}
          setActiveFormula={setActiveFormula}
        />
      ) : (
        <IngredientsPageDesktop
          activeFormula={activeFormula}
          setActiveFormula={setActiveFormula}
        />
      )}

      <Footer />
    </div>
  );
}
