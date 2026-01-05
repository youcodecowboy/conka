"use client";

import { useState } from "react";
import { sciencePillars } from "@/app/lib/scienceData";
import PillarCard from "./PillarCard";

interface SciencePillarsProps {
  isMobile?: boolean;
}

export default function SciencePillars({ isMobile = false }: SciencePillarsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    sciencePillars[0]?.id || null
  );

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={`${isMobile ? "px-4 py-8" : "px-16 py-16"}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`${isMobile ? "mb-6" : "mb-10"}`}>
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            The Five Pillars
          </p>
          <h2
            className={`font-bold ${
              isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
            }`}
          >
            How Our Formulas Work
          </h2>
          <p
            className={`font-commentary opacity-80 mt-2 ${
              isMobile ? "text-base" : "text-lg"
            }`}
          >
            Five interconnected systems that power cognitive performance
          </p>
        </div>

        {/* Pillar Cards */}
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
    </section>
  );
}

