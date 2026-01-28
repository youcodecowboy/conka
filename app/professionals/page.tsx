"use client";

import Navigation from "../components/navigation";
import ProfessionalsContext from "../components/professionals/ProfessionalsContext";
import ModeSelectionSection from "../components/professionals/ModeSelectionSection";

export default function ProfessionalsPage() {
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <ProfessionalsContext />
      <ModeSelectionSection />
    </div>
  );
}
