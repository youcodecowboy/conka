"use client";

import Navigation from "../components/navigation";
import ShopHero from "../components/shop/ShopHero";
import FormulasShowcase from "../components/shop/FormulasShowcase";
import TrialPacks from "../components/TrialPacks";

export default function ShopPage() {
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      {/* ===== SECTION 1: HERO ===== */}
      <section id="shop-hero">
        <ShopHero />
      </section>

      {/* ===== SECTION 2: INDIVIDUAL FORMULAS ===== */}
      <section id="formulas" className="scroll-mt-20">
        <FormulasShowcase />
      </section>

      {/* ===== SECTION 3: TRIAL PACKS ===== */}
      <section id="trial-packs" className="scroll-mt-20">
        <TrialPacks />
      </section>
    </div>
  );
}
