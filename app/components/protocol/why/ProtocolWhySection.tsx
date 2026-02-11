"use client";

import { useState, useMemo } from "react";
import { type ProtocolId } from "@/app/lib/productData";
import CycleRecognition from "./CycleRecognition";
import CycleTrap from "./CycleTrap";
import CycleBreak from "./CycleBreak";
import CycleTransformation from "./CycleTransformation";
import { transitionLine, symptomEntries } from "@/app/lib/protocolWhyCopy";

interface ProtocolWhySectionProps {
  protocolId?: ProtocolId;
}

export default function ProtocolWhySection({
  protocolId,
}: ProtocolWhySectionProps = {}) {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const entryNodeIndex = useMemo(
    () =>
      symptomEntries.find((s) => s.id === selectedSymptom)?.entryNode ?? 0,
    [selectedSymptom]
  );

  return (
    <>
      <CycleRecognition
        selectedSymptomId={selectedSymptom}
        onSelect={setSelectedSymptom}
      />
      <CycleTrap protocolId={protocolId} initialNode={entryNodeIndex} />

      {/* Transition: dark → light */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: "160px",
          background:
            "linear-gradient(to bottom, hsl(0, 0%, 4%) 0%, hsl(0, 0%, 98%) 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
          }}
        />
        <p className="relative premium-body text-sm md:text-base font-medium opacity-70 text-center px-4">
          {transitionLine}
        </p>
      </div>

      <CycleBreak />
      <CycleTransformation />
    </>
  );
}
