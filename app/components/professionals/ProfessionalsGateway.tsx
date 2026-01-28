"use client";

import ProfessionalsContext from "./ProfessionalsContext";
import ModeSelectionSection from "./ModeSelectionSection";
import CaseStudiesDataDriven from "@/app/components/CaseStudiesDataDriven";

export default function ProfessionalsGateway() {
  return (
    <>
      <ProfessionalsContext />
      <ModeSelectionSection />
      <CaseStudiesSection />
    </>
  );
}

// Case Studies Section with distilled lead sentence
function CaseStudiesSection() {
  return (
    <section className="px-6 md:px-16 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <p className="font-clinical text-sm md:text-base opacity-80 mb-6 text-center">
          Practitioners and elite athletes using CONKA protocols in performance settings
        </p>
        <CaseStudiesDataDriven />
      </div>
    </section>
  );
}
