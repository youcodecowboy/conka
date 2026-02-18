"use client";

import Navigation from "../components/navigation";
import ShopHero from "../components/shop/ShopHero";
import FormulasShowcase from "../components/shop/FormulasShowcase";

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
    </div>
  );
}
