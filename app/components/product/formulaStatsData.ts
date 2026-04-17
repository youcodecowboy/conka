import type { FormulaId, PackSize } from "@/app/lib/productData";

/**
 * Curated stats per formula -- 3 compliant stats only.
 *
 * Flow:
 *  - Sleep quality: observational ingredient-level research (¶)
 *  - Memory: observational ingredient-level research (¶)
 *  - Tiredness/fatigue: EFSA Vitamin C claim (††)
 *
 * Clear:
 *  - Memory: observational ingredient-level research (¶)
 *  - Fatigue resistance: ties to EFSA tiredness/fatigue claim (††)
 *  - Cerebral blood flow: observational ingredient-level research (¶)
 *
 * Dropped: stress scores, anxiety ratings (RED -- mood/stress claims
 * not authorised for any CONKA ingredient per CLAIMS_COMPLIANCE.md)
 */
export const CURATED_STATS: Record<
  FormulaId,
  Array<{ stat: string; label: string; anchor: string }>
> = {
  "01": [
    {
      stat: "+42%",
      label: "improvement in sleep quality",
      anchor: "¶",
    },
    {
      stat: "+18%",
      label: "improvement in memory performance",
      anchor: "¶",
    },
    {
      stat: "Reduces",
      label: "tiredness and fatigue",
      anchor: "††",
    },
  ],
  "02": [
    {
      stat: "+63%",
      label: "improvement in memory performance",
      anchor: "¶",
    },
    {
      stat: "+30%",
      label: "improvement in fatigue resistance",
      anchor: "¶",
    },
    {
      stat: "+57%",
      label: "increase in cerebral blood flow",
      anchor: "¶",
    },
  ],
};

/** What the customer receives, in plain language */
export function getDeliveryDescription(pack: PackSize): string {
  switch (pack) {
    case "4":
      return "4 shots delivered every week";
    case "8":
      return "8 shots delivered every 2 weeks";
    case "12":
      return "12 shots delivered every 2 weeks";
    case "28":
      return "28 shots delivered every month";
  }
}
