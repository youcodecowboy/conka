"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/app/components/Navigation";
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
      {isMobile ? (
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

      {/* Footer */}
      <footer className={`px-4 ${isMobile ? "py-8" : "px-16 py-16"} border-t-2 border-current/10`}>
        <div className="max-w-6xl mx-auto">
          <div className={`flex ${isMobile ? "flex-col gap-6" : "flex-row justify-between items-start gap-12"}`}>
            {/* Logo & Nav */}
            <div className="flex flex-col gap-4">
              <a href="/" className="flex items-center hover:opacity-70 transition-all">
                <Image
                  src="/conka.png"
                  alt="Conka logo"
                  width={isMobile ? 90 : 120}
                  height={isMobile ? 30 : 40}
                  className={`${isMobile ? "h-6" : "h-8"} w-auto`}
                />
              </a>
              <nav className="flex flex-wrap items-center gap-2">
                <a href="/" className="font-clinical text-sm hover:opacity-70 transition-all">Home</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/conka-flow" className="font-clinical text-sm hover:opacity-70 transition-all">Conka Flow</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/conka-clarity" className="font-clinical text-sm hover:opacity-70 transition-all">Conka Clarity</a>
                <span className="font-clinical text-sm opacity-30">•</span>
                <a href="/protocol/1" className="font-clinical text-sm hover:opacity-70 transition-all">Protocols</a>
              </nav>
              <p className="font-clinical text-sm opacity-70">
                Patent #GB2620279 • 125 Clinical Trials • £500,000+ in Research
              </p>
              <p className="font-commentary text-sm">built with love ♥</p>
            </div>

            {/* CTA */}
            <div className={`flex flex-col ${isMobile ? "items-start" : "items-end"} gap-4`}>
              <p className="font-commentary text-xl">
                ready to unlock your potential?
              </p>
              <div className="flex gap-3">
                <a
                  href="/conka-flow"
                  className="neo-button-outline px-6 py-3 font-semibold text-sm"
                >
                  Try Conka Flow
                </a>
                <a
                  href="/conka-clarity"
                  className="neo-button px-6 py-3 font-semibold text-sm"
                >
                  Try Conka Clarity
                </a>
              </div>
              <p className="font-clinical text-sm opacity-70">
                100 day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
