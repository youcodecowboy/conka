"use client";

import Navigation from "../../components/navigation";
import IndividualPurchasePage from "../../components/professionals/individual/IndividualPurchasePage";

export default function ProfessionalsIndividualPage() {
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <IndividualPurchasePage />
    </div>
  );
}
