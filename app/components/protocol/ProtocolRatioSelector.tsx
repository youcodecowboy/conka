"use client";

import type { ProtocolId } from "@/app/lib/productData";
import { protocolContent } from "@/app/lib/protocolContent";

const PROTOCOL_IDS: ProtocolId[] = ["1", "2", "3", "4"];

/** Short labels for the ratio selector (Resilience, Precision, Balance, Ultimate) */
function getProtocolShortLabel(id: ProtocolId): string {
  const name = protocolContent[id].name;
  return name.replace(/\s*Protocol\s*$/, "");
}

interface ProtocolRatioSelectorProps {
  value: ProtocolId;
  onChange: (id: ProtocolId) => void;
}

export default function ProtocolRatioSelector({
  value,
  onChange,
}: ProtocolRatioSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 sm:justify-center w-full">
      {PROTOCOL_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
            value === id
              ? "bg-[var(--color-ink)] text-white shadow-md"
              : "bg-white text-[var(--text-on-light-muted)] border-2 border-black/15 hover:bg-black/5 hover:border-black/25"
          }`}
        >
          {getProtocolShortLabel(id)}
        </button>
      ))}
    </div>
  );
}
