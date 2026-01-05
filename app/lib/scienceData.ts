// ===== SCIENCE PAGE DATA =====
// Defines the 5 scientific pillars of Conka's cognitive performance formulas

export interface PillarStat {
  value: string;
  label: string;
  ingredient: string;
  pmid: string;
}

export interface PillarIngredient {
  name: string;
  formula: "01" | "02" | "both";
  role: string;
}

export interface SciencePillar {
  id: string;
  name: string;
  tagline: string;
  icon: "shield" | "brain" | "sparkles" | "heart" | "clock";
  color: string;
  description: string;
  mechanism: string;
  keyStats: PillarStat[];
  ingredients: PillarIngredient[];
  forFormula: "01" | "02" | "both";
}

export const sciencePillars: SciencePillar[] = [
  {
    id: "adaptogens",
    name: "Adaptogens & Stress Resilience",
    tagline: "Build your body's natural defense against stress",
    icon: "shield",
    color: "bg-emerald-500",
    description:
      "Adaptogens are a class of natural compounds that help your body adapt to stress by modulating the hypothalamic-pituitary-adrenal (HPA) axis. Unlike stimulants, adaptogens work by normalizing cortisol levels and supporting a balanced stress response, helping you stay calm under pressure without the crash.",
    mechanism:
      "Adaptogens regulate the production and release of stress hormones, particularly cortisol. They interact with the HPA axis and the sympathoadrenal system to maintain homeostasis during physical and mental stress. This results in improved stress tolerance, reduced fatigue, and enhanced mental clarity.",
    keyStats: [
      {
        value: "-56%",
        label: "Stress Score Reduction",
        ingredient: "Ashwagandha",
        pmid: "23439798",
      },
      {
        value: "-28%",
        label: "Serum Cortisol",
        ingredient: "Ashwagandha",
        pmid: "23439798",
      },
      {
        value: "+42%",
        label: "Sleep Quality",
        ingredient: "Ashwagandha",
        pmid: "32021735",
      },
      {
        value: "-28%",
        label: "Burnout Score",
        ingredient: "Rhodiola rosea",
        pmid: "19016404",
      },
    ],
    ingredients: [
      {
        name: "Ashwagandha",
        formula: "01",
        role: "Primary adaptogen for cortisol modulation",
      },
      {
        name: "Rhodiola rosea",
        formula: "01",
        role: "Anti-fatigue and mental performance",
      },
      {
        name: "Lemon Balm",
        formula: "01",
        role: "Calming without sedation",
      },
    ],
    forFormula: "01",
  },
  {
    id: "neurotransmitters",
    name: "Neurotransmitter Support",
    tagline: "Optimize your brain's chemical messengers",
    icon: "brain",
    color: "bg-purple-500",
    description:
      "Your brain communicates through neurotransmitters—chemical messengers that control everything from focus to mood. Acetylcholine drives memory and learning, dopamine fuels motivation and reward, and serotonin regulates mood and wellbeing. Our formulas provide the building blocks and cofactors needed for optimal neurotransmitter synthesis.",
    mechanism:
      "Choline precursors like Alpha GPC cross the blood-brain barrier to directly increase acetylcholine synthesis. Phospholipids maintain neuronal membrane integrity for efficient signal transmission. Supporting ingredients modulate dopamine and serotonin pathways for balanced mood and motivation.",
    keyStats: [
      {
        value: "+22%",
        label: "Cognitive Function (ADAS-Cog)",
        ingredient: "Alpha GPC",
        pmid: "12882463",
      },
      {
        value: "+18%",
        label: "Memory Performance",
        ingredient: "Lemon Balm",
        pmid: "12888775",
      },
      {
        value: "+15%",
        label: "Processing Speed",
        ingredient: "Ginkgo Biloba",
        pmid: "19395013",
      },
      {
        value: "+12%",
        label: "Verbal Memory",
        ingredient: "Lecithin",
        pmid: "22071706",
      },
    ],
    ingredients: [
      {
        name: "Alpha GPC",
        formula: "02",
        role: "Most bioavailable choline source for acetylcholine",
      },
      {
        name: "Lecithin",
        formula: "02",
        role: "Phospholipids for membrane health",
      },
      {
        name: "Lemon Balm",
        formula: "01",
        role: "Acetylcholine receptor modulation",
      },
      {
        name: "Ginkgo Biloba",
        formula: "02",
        role: "Neurotransmitter pathway support",
      },
    ],
    forFormula: "both",
  },
  {
    id: "antioxidants",
    name: "Antioxidant Defense & Brain Detox",
    tagline: "Protect your neurons from oxidative damage",
    icon: "sparkles",
    color: "bg-red-500",
    description:
      "Your brain consumes 20% of your body's oxygen, making it highly susceptible to oxidative stress. Free radicals and reactive oxygen species damage neurons over time, contributing to cognitive decline and neurodegeneration. Our antioxidant stack neutralizes these threats while supporting the brain's natural detoxification systems.",
    mechanism:
      "Glutathione is the body's master antioxidant, directly neutralizing free radicals and regenerating other antioxidants like vitamin C and E. NAC serves as the precursor to glutathione synthesis. Alpha Lipoic Acid is unique in being both water and fat-soluble, reaching every compartment of brain cells.",
    keyStats: [
      {
        value: "+40%",
        label: "Blood Glutathione",
        ingredient: "Glutathione",
        pmid: "29559699",
      },
      {
        value: "-35%",
        label: "Mental Fatigue",
        ingredient: "Acetyl-L-Carnitine",
        pmid: "18937015",
      },
      {
        value: "+22%",
        label: "Cognitive Function",
        ingredient: "N-Acetyl Cysteine",
        pmid: "18436195",
      },
      {
        value: "-22%",
        label: "Anxiety Score",
        ingredient: "Vitamin C",
        pmid: "26327060",
      },
    ],
    ingredients: [
      {
        name: "Glutathione",
        formula: "02",
        role: "Master antioxidant and detoxifier",
      },
      {
        name: "N-Acetyl Cysteine",
        formula: "02",
        role: "Glutathione precursor, glutamate modulator",
      },
      {
        name: "Vitamin C",
        formula: "02",
        role: "Antioxidant recycler and neurotransmitter cofactor",
      },
      {
        name: "Alpha Lipoic Acid",
        formula: "02",
        role: "Universal antioxidant, mitochondrial support",
      },
    ],
    forFormula: "02",
  },
  {
    id: "circulation",
    name: "Cerebral Circulation & Energy",
    tagline: "Fuel your brain with optimal blood flow",
    icon: "heart",
    color: "bg-blue-500",
    description:
      "Your brain needs constant oxygen and glucose delivery to function optimally. Cerebral circulation determines how efficiently nutrients reach neurons and how effectively metabolic waste is cleared. Enhanced blood flow translates directly to better cognitive performance, sharper focus, and sustained mental energy.",
    mechanism:
      "Ginkgo biloba and bilberry anthocyanins improve microcirculation by strengthening capillary walls and reducing platelet aggregation. Acetyl-L-Carnitine optimizes mitochondrial function, helping neurons produce ATP from fatty acids. This dual approach ensures both delivery of nutrients and cellular energy production.",
    keyStats: [
      {
        value: "+16%",
        label: "Cognition Score",
        ingredient: "Ginkgo Biloba",
        pmid: "22628390",
      },
      {
        value: "+24%",
        label: "Cognitive Function",
        ingredient: "Acetyl-L-Carnitine",
        pmid: "18937015",
      },
      {
        value: "+8%",
        label: "Gait Speed",
        ingredient: "Bilberry",
        pmid: "25660920",
      },
      {
        value: "+17%",
        label: "Physical Fitness",
        ingredient: "Rhodiola rosea",
        pmid: "10839209",
      },
    ],
    ingredients: [
      {
        name: "Ginkgo Biloba",
        formula: "02",
        role: "Cerebral blood flow enhancement",
      },
      {
        name: "Bilberry",
        formula: "01",
        role: "Microcirculation and visual clarity",
      },
      {
        name: "Acetyl-L-Carnitine",
        formula: "02",
        role: "Mitochondrial energy production",
      },
      {
        name: "Rhodiola rosea",
        formula: "01",
        role: "Anti-fatigue and oxygen utilization",
      },
    ],
    forFormula: "both",
  },
  {
    id: "neuroprotection",
    name: "Neuroprotection & Longevity",
    tagline: "Invest in your cognitive future",
    icon: "clock",
    color: "bg-amber-500",
    description:
      "Brain health isn't just about today's performance—it's about protecting your cognitive abilities for decades to come. Neuroprotection involves reducing inflammation, supporting neuroplasticity, preventing brain atrophy, and promoting the growth of new neural connections through BDNF (brain-derived neurotrophic factor).",
    mechanism:
      "Curcumin crosses the blood-brain barrier to reduce neuroinflammation and increase BDNF production. B-vitamins lower homocysteine levels—a key risk factor for brain atrophy. Together with the antioxidant network, these compounds create a comprehensive defense against age-related cognitive decline.",
    keyStats: [
      {
        value: "-86%",
        label: "Brain Atrophy Rate",
        ingredient: "Vitamin B12 + B-vitamins",
        pmid: "23690582",
      },
      {
        value: "+63%",
        label: "Memory (SRT)",
        ingredient: "Turmeric/Curcumin",
        pmid: "29246725",
      },
      {
        value: "+96%",
        label: "Attention Improvement",
        ingredient: "Turmeric/Curcumin",
        pmid: "29246725",
      },
      {
        value: "-65%",
        label: "Disease Progression",
        ingredient: "Alpha Lipoic Acid",
        pmid: "17982897",
      },
    ],
    ingredients: [
      {
        name: "Turmeric/Curcumin",
        formula: "01",
        role: "Anti-inflammatory, BDNF enhancement",
      },
      {
        name: "Vitamin B12",
        formula: "02",
        role: "Myelin protection, homocysteine reduction",
      },
      {
        name: "Black Pepper",
        formula: "01",
        role: "2000% increased curcumin bioavailability",
      },
      {
        name: "Glutathione",
        formula: "02",
        role: "Long-term antioxidant protection",
      },
    ],
    forFormula: "both",
  },
];

// Clinical evidence summary stats
export const clinicalEvidenceSummary = {
  totalStudies: 32,
  totalParticipants: 6000,
  peerReviewed: 32,
  averageDuration: "8-12 weeks",
  patentNumber: "GB2620279",
  researchInvestment: "£500,000+",
};

// Radar chart data for formula comparison
export interface FormulaStrength {
  pillar: string;
  flow: number;
  clarity: number;
  combined: number;
}

export const formulaStrengths: FormulaStrength[] = [
  { pillar: "Stress Resilience", flow: 95, clarity: 40, combined: 100 },
  { pillar: "Neurotransmitters", flow: 60, clarity: 90, combined: 100 },
  { pillar: "Antioxidants", flow: 50, clarity: 95, combined: 100 },
  { pillar: "Circulation", flow: 70, clarity: 85, combined: 100 },
  { pillar: "Neuroprotection", flow: 85, clarity: 80, combined: 100 },
];

// Headline stats for hero section
export const headlineStats = [
  {
    value: "32",
    label: "Clinical Studies",
    suffix: "",
  },
  {
    value: "6,000",
    label: "Research Participants",
    suffix: "+",
  },
  {
    value: "16",
    label: "Active Ingredients",
    suffix: "",
  },
  {
    value: "2000",
    label: "Bioavailability Increase",
    suffix: "%",
  },
];

// Helper function to get pillar by ID
export function getPillarById(id: string): SciencePillar | undefined {
  return sciencePillars.find((p) => p.id === id);
}

// Helper to get pillars for a specific formula
export function getPillarsForFormula(formula: "01" | "02"): SciencePillar[] {
  return sciencePillars.filter(
    (p) => p.forFormula === formula || p.forFormula === "both"
  );
}

