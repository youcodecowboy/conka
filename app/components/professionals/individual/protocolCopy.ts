import type { ProtocolId } from "@/app/lib/productData";

/**
 * Practitioner-only protocol copy for the individual portal.
 * Display order: Resilience → Balanced → Precision → Ultimate.
 * Do not use for site-wide protocol content (protocolContent / protocolSelectorData).
 */
export interface ProfessionalProtocolCopy {
  id: ProtocolId;
  name: string;
  tagline: string;
  bullets: string[];
}

/** Display order for individual portal: 1, 3, 2, 4 */
export const PROFESSIONAL_PROTOCOL_ORDER: ProtocolId[] = ["1", "3", "2", "4"];

export const professionalProtocolCopy: Record<
  ProtocolId,
  ProfessionalProtocolCopy
> = {
  "1": {
    id: "1",
    name: "Resilience Protocol",
    tagline: "Sustained mental output under stress.",
    bullets: ["High volume", "High pressure", "Repeat days"],
  },
  "2": {
    id: "2",
    name: "Precision Protocol",
    tagline: "Restore cognitive clarity",
    bullets: ["Cognitive drop-off", "Travel", "Post impact"],
  },
  "3": {
    id: "3",
    name: "Balanced Protocol",
    tagline: "Daily brain support",
    bullets: [
      "In-season maintenance",
      "Mixed demands",
      "Burnout prevention",
    ],
  },
  "4": {
    id: "4",
    name: "Ultimate Protocol",
    tagline: "Full spectrum support",
    bullets: [
      "Elite volume",
      "High stakes",
      "Minimal margin for error",
    ],
  },
};

/** Ordered list for rendering (Resilience → Balanced → Precision → Ultimate). */
export function getProfessionalProtocolsOrdered(): ProfessionalProtocolCopy[] {
  return PROFESSIONAL_PROTOCOL_ORDER.map((id) => professionalProtocolCopy[id]);
}
