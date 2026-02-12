"use client";

import { useState, useMemo } from "react";
import { type ProtocolId } from "@/app/lib/productData";
import CycleTrap from "./CycleTrap";
import CycleBreak from "./CycleBreak";
import CycleTransformation from "./CycleTransformation";
import { symptomEntries } from "@/app/lib/protocolWhyCopy";

interface ProtocolWhySectionProps {
  protocolId?: ProtocolId;
}

export default function ProtocolWhySection({
  protocolId,
}: ProtocolWhySectionProps = {}) {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const entryNodeIndex = useMemo(
    () => symptomEntries.find((s) => s.id === selectedSymptom)?.entryNode ?? 0,
    [selectedSymptom],
  );

  return (
    <>
      <CycleTrap
        protocolId={protocolId}
        initialNode={entryNodeIndex}
        selectedSymptomId={selectedSymptom}
        onSelectSymptom={setSelectedSymptom}
      />

      {/* Header strip — full width */}
      <div className="w-full bg-surface py-8">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12">
          <h2 className="premium-section-heading text-2xl md:text-3xl font-bold mb-3">
            But there's a way out.
          </h2>
          <h3 className="premium-section-heading text-xl md:text-2xl font-bold">
            Together: Break the Cycle
          </h3>
        </div>
      </div>

      <CycleBreak />
      <CycleTransformation protocolId={protocolId} />
    </>
  );
}
