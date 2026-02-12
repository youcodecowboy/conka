/**
 * Protocol Problem Cycle — the stress/oxidative/repair/performance loop.
 * Copy for the interactive problem-cycle component in "Why Two Formulas".
 */

export interface ProblemCycleReference {
  author: string;
  year: string;
  journal: string;
}

export interface ProblemCycleStep {
  id: string;
  label: string;
  /** Human-readable title for the expanded detail panel (not the node label). */
  detailTitle: string;
  /** Short phrase shown under the label in the cycle node. */
  nodeSubline: string;
  shortSummary: string;
  scientificParagraph: string;
  reference: ProblemCycleReference;
}

export const protocolProblemCycleSteps: ProblemCycleStep[] = [
  {
    id: "stress",
    label: "Stress ↑",
    detailTitle: "Stress builds",
    nodeSubline: "Pressure builds",
    shortSummary:
      "The body experiences sustained pressure; hormonal and neural stress pathways are activated. This sets the stage for downstream oxidative and repair challenges.",
    scientificParagraph:
      "Chronic or acute stress activates the hypothalamic–pituitary–adrenal (HPA) axis and sympathetic nervous system, elevating cortisol and catecholamines. Prolonged activation can dysregulate inflammatory signalling and increase demand on antioxidant defences, creating conditions that favour oxidative stress accumulation.",
    reference: { author: "McEwen", year: "2007", journal: "Physiol. Rev." },
  },
  {
    id: "oxidative",
    label: "Oxidative Load ↑",
    detailTitle: "Defences get overwhelmed",
    nodeSubline: "Defences overwhelmed",
    shortSummary:
      "Free radicals and reactive oxygen species (ROS) accumulate when stress and metabolic demand outpace the body’s antioxidant capacity. This load can damage lipids, proteins, and DNA.",
    scientificParagraph:
      "Reactive oxygen and nitrogen species are produced during normal metabolism and are amplified by stress, inflammation, and high energy demand. When antioxidant systems (e.g. glutathione, SOD, catalase) are overwhelmed, oxidative stress damages cellular components and can impair mitochondrial function and repair machinery.",
    reference: {
      author: "Sies & Jones",
      year: "2020",
      journal: "Nat. Rev. Mol. Cell Biol.",
    },
  },
  {
    id: "repair",
    label: "Repair ↓",
    detailTitle: "Repair can't keep up",
    nodeSubline: "Recovery can't keep up",
    shortSummary:
      "Cellular repair mechanisms—including DNA repair, autophagy, and protein turnover—become overwhelmed or slowed when oxidative load is high and resources are diverted.",
    scientificParagraph:
      "Oxidative stress can directly inhibit repair enzymes and deplete substrates (e.g. NAD+) required for DNA repair and sirtuin activity. Autophagy and proteostasis may be impaired, leading to accumulation of damaged organelles and proteins and reduced cellular resilience.",
    reference: {
      author: "Vilchez et al.",
      year: "2014",
      journal: "Nature",
    },
  },
  {
    id: "performance",
    label: "Performance ↓",
    detailTitle: "Performance drops",
    nodeSubline: "Output drops",
    shortSummary:
      "Physical, mental, and metabolic output drops when repair capacity is limited. Energy production, cognition, and recovery can all be affected.",
    scientificParagraph:
      "Mitochondrial dysfunction, accumulated cellular damage, and impaired repair reduce ATP production and metabolic efficiency. Cognitive performance, reaction time, and physical output can decline, while perceived effort and recovery time increase—creating a feedback that often amplifies stress.",
    reference: {
      author: "Filler et al.",
      year: "2014",
      journal: "Oxid. Med. Cell. Longev.",
    },
  },
  {
    id: "loop",
    label: "Back to Stress ↑",
    detailTitle: "The cycle repeats",
    nodeSubline: "Cycle repeats",
    shortSummary:
      "Low performance and prolonged recovery increase perceived pressure and can reactivate stress pathways, closing the loop and sustaining the cycle until something interrupts it.",
    scientificParagraph:
      "When performance drops and recovery is slow, demands (work, training, cognitive load) often remain constant or increase, which can re-trigger stress responses. This feedback reinforces the cycle; breaking it typically requires reducing stress load and/or supporting antioxidant and repair capacity.",
    reference: { author: "McEwen", year: "2007", journal: "Physiol. Rev." },
  },
];
