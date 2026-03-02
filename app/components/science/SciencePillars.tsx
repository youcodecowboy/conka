"use client";

import { useState } from "react";
import { sciencePillars } from "@/app/lib/scienceData";
import PillarCard from "./PillarCard";

interface SciencePillarsProps {
  isMobile?: boolean;
}

export default function SciencePillars({ isMobile = false }: SciencePillarsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    sciencePillars[0]?.id || null,
  );

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div>
        <p className="premium-body-sm uppercase tracking-widest opacity-50 mb-2">
          The Five Pillars
        </p>
        <h2
          className={`premium-section-heading font-bold ${
            isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
          }`}
          style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
        >
          How Our Formulas Work
        </h2>
        <p
          className={`premium-section-subtitle opacity-80 mt-2 ${
            isMobile ? "text-base" : "text-lg"
          }`}
        >
          Five interconnected systems that power cognitive performance
        </p>
      </div>

      <div className="space-y-4">
        {sciencePillars.map((pillar) => (
          <PillarCard
            key={pillar.id}
            pillar={pillar}
            isExpanded={expandedId === pillar.id}
            onToggle={() => handleToggle(pillar.id)}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}
