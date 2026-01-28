"use client";

import Navigation from "../components/navigation";
import ProfessionalsGateway from "../components/professionals/ProfessionalsGateway";

export default function ProfessionalsPage() {
  return (
    <div
      className="min-h-screen theme-conka-flow lg:pt-20"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <ProfessionalsGateway />
    </div>
  );
}
