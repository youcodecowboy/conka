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
    () =>
      symptomEntries.find((s) => s.id === selectedSymptom)?.entryNode ?? 0,
    [selectedSymptom]
  );

  return (
    <>
      <CycleTrap
        protocolId={protocolId}
        initialNode={entryNodeIndex}
        selectedSymptomId={selectedSymptom}
        onSelectSymptom={setSelectedSymptom}
      />

      <CycleBreak />
      <CycleTransformation />
    </>
  );
}
