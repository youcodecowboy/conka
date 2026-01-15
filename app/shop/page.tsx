"use client";

import Navigation from "../components/Navigation";
import ShopHero from "../components/shop/ShopHero";
import ProtocolsGrid from "../components/shop/ProtocolsGrid";
import FormulasShowcase from "../components/shop/FormulasShowcase";
import TrialPacksShop from "../components/shop/TrialPacksShop";

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

      {/* ===== SECTION 2: PROTOCOLS ===== */}
      <section id="protocols" className="scroll-mt-20">
        <ProtocolsGrid />
      </section>

      {/* ===== SECTION 3: INDIVIDUAL FORMULAS ===== */}
      <section id="formulas" className="scroll-mt-20">
        <FormulasShowcase />
      </section>

      {/* ===== SECTION 4: TRIAL PACKS ===== */}
      <section id="trial-packs" className="scroll-mt-20">
        <TrialPacksShop />
      </section>
    </div>
  );
}
