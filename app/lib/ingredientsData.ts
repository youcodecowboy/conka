// ===== INGREDIENT DATA =====

import { FormulaId } from "./productData";

export type IngredientCategory = "adaptogen" | "nootropic" | "vitamin" | "amino-acid" | "antioxidant" | "mineral" | "essential-oil";

export interface IngredientStat {
  value: string;
  label: string;
  source: string;
}

export interface IngredientBenefit {
  title: string;
  description: string;
  icon: string; // Icon identifier
}

export interface ClinicalStudyData {
  title: string;
  university: string;
  year: number;
  participants: number;
  duration: string;
  keyFinding: string;
  pValue: string;
  chartData?: Array<{ label: string; baseline: number; result: number }>;
}

export interface IngredientData {
  id: string;
  name: string;
  scientificName: string;
  category: IngredientCategory;
  formula: FormulaId;
  percentage: string;
  percentageValue: number;
  description: string;
  mechanismOfAction: string;
  keyStats: IngredientStat[];
  benefits: IngredientBenefit[];
  clinicalStudies: ClinicalStudyData[];
  safetyProfile: string;
  synergies: string[];
}

// ===== CONKA FLOW INGREDIENTS (Formula 01) =====

export const flowIngredients: IngredientData[] = [
  {
    id: "lemon-balm",
    name: "Lemon Balm",
    scientificName: "Melissa officinalis",
    category: "adaptogen",
    formula: "01",
    percentage: "26.7%",
    percentageValue: 26.7,
    description: "Lemon Balm is a calming herb from the mint family that has been used for centuries to reduce anxiety, promote relaxation, and improve cognitive function. It works primarily through GABAergic mechanisms without causing sedation.",
    mechanismOfAction: "Inhibits GABA-transaminase, increasing GABA availability in the brain. Also contains rosmarinic acid which provides antioxidant and anti-inflammatory effects. Modulates muscarinic and nicotinic acetylcholine receptors to enhance memory.",
    keyStats: [
      { value: "+18%", label: "Calmness Score", source: "University of Northumbria, 2014" },
      { value: "-42%", label: "Anxiety Reduction", source: "Phytomedicine Journal, 2019" },
      { value: "+15%", label: "Memory Accuracy", source: "Nutrients Journal, 2020" },
      { value: "300mg", label: "Optimal Daily Dose", source: "Clinical Consensus" },
    ],
    benefits: [
      {
        title: "Reduces Anxiety",
        description: "Promotes calm focus without sedation through natural GABA enhancement",
        icon: "heart",
      },
      {
        title: "Improves Memory",
        description: "Enhances acetylcholine function for better memory formation and recall",
        icon: "brain",
      },
      {
        title: "Supports Sleep",
        description: "Helps regulate sleep-wake cycles without morning grogginess",
        icon: "moon",
      },
      {
        title: "Antioxidant Protection",
        description: "High rosmarinic acid content protects neurons from oxidative stress",
        icon: "shield",
      },
    ],
    clinicalStudies: [
      {
        title: "Acute Effects of Melissa officinalis on Cognition and Mood",
        university: "University of Northumbria",
        year: 2014,
        participants: 20,
        duration: "Single dose",
        keyFinding: "Significant improvement in calmness and memory performance at 300mg dose",
        pValue: "P<0.05",
        chartData: [
          { label: "Calmness", baseline: 50, result: 68 },
          { label: "Memory", baseline: 50, result: 65 },
          { label: "Alertness", baseline: 50, result: 58 },
        ],
      },
      {
        title: "Anxiolytic Effects of Lemon Balm Extract",
        university: "Tehran University of Medical Sciences",
        year: 2019,
        participants: 80,
        duration: "8 weeks",
        keyFinding: "42% reduction in anxiety symptoms compared to placebo",
        pValue: "P<0.01",
        chartData: [
          { label: "Week 0", baseline: 100, result: 100 },
          { label: "Week 4", baseline: 95, result: 72 },
          { label: "Week 8", baseline: 92, result: 58 },
        ],
      },
    ],
    safetyProfile: "Generally recognized as safe (GRAS). No significant adverse effects reported at recommended doses. May interact with sedative medications.",
    synergies: ["Ashwagandha", "Rhodiola rosea", "Turmeric"],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "antioxidant",
    formula: "01",
    percentage: "25.4%",
    percentageValue: 25.4,
    description: "Turmeric contains curcumin, one of nature's most powerful anti-inflammatory and antioxidant compounds. It crosses the blood-brain barrier to provide neuroprotection and enhance cognitive function.",
    mechanismOfAction: "Curcumin inhibits NF-κB pathway, reducing neuroinflammation. Increases BDNF (brain-derived neurotrophic factor) levels. Chelates heavy metals and provides antioxidant protection. Enhanced by piperine (black pepper) for 2000% better absorption.",
    keyStats: [
      { value: "+28%", label: "BDNF Increase", source: "Journal of Psychopharmacology, 2015" },
      { value: "-65%", label: "Inflammatory Markers", source: "Annals of Indian Academy of Neurology, 2008" },
      { value: "+19%", label: "Working Memory", source: "American Journal of Geriatric Psychiatry, 2018" },
      { value: "500mg", label: "Effective Dose", source: "Clinical Studies Meta-Analysis" },
    ],
    benefits: [
      {
        title: "Brain Protection",
        description: "Powerful antioxidant that protects neurons from oxidative damage",
        icon: "shield",
      },
      {
        title: "Reduces Inflammation",
        description: "Lowers neuroinflammation linked to cognitive decline",
        icon: "activity",
      },
      {
        title: "Enhances Neuroplasticity",
        description: "Increases BDNF for better learning and memory formation",
        icon: "zap",
      },
      {
        title: "Mood Support",
        description: "Modulates serotonin and dopamine for emotional balance",
        icon: "smile",
      },
    ],
    clinicalStudies: [
      {
        title: "Curcumin Effects on Cognition in Healthy Adults",
        university: "UCLA Longevity Center",
        year: 2018,
        participants: 40,
        duration: "18 months",
        keyFinding: "28% improvement in memory and 19% improvement in attention",
        pValue: "P<0.01",
        chartData: [
          { label: "Memory", baseline: 50, result: 64 },
          { label: "Attention", baseline: 50, result: 59 },
          { label: "Mood", baseline: 50, result: 58 },
        ],
      },
      {
        title: "Anti-inflammatory Effects of Curcumin on Brain Function",
        university: "Swinburne University",
        year: 2021,
        participants: 96,
        duration: "12 weeks",
        keyFinding: "Significant reduction in mental fatigue and improved sustained attention",
        pValue: "P<0.05",
        chartData: [
          { label: "Mental Fatigue", baseline: 70, result: 42 },
          { label: "Attention", baseline: 50, result: 62 },
          { label: "Alertness", baseline: 50, result: 58 },
        ],
      },
    ],
    safetyProfile: "GRAS status. Well-tolerated at doses up to 8g daily. May interact with blood thinners. Enhanced absorption with piperine included in formula.",
    synergies: ["Black Pepper", "Ashwagandha", "Bilberry"],
  },
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "adaptogen",
    formula: "01",
    percentage: "26.7%",
    percentageValue: 26.7,
    description: "Ashwagandha is a premier adaptogenic herb used in Ayurvedic medicine for over 3,000 years. It helps the body resist physical and mental stress while improving energy, focus, and sleep quality.",
    mechanismOfAction: "Contains withanolides that modulate cortisol levels and the HPA axis. Mimics GABA activity for calming effects. Enhances thyroid function and increases testosterone in men. Reduces oxidative stress through SOD and catalase activation.",
    keyStats: [
      { value: "-27%", label: "Cortisol Reduction", source: "Indian Journal of Psychological Medicine, 2012" },
      { value: "+18%", label: "Endurance Increase", source: "Journal of Ayurveda, 2015" },
      { value: "+14%", label: "Testosterone (Men)", source: "Fertility and Sterility, 2010" },
      { value: "600mg", label: "Clinical Dose", source: "Standardized KSM-66 Extract" },
    ],
    benefits: [
      {
        title: "Stress Reduction",
        description: "Significantly lowers cortisol and perceived stress levels",
        icon: "heart-pulse",
      },
      {
        title: "Better Sleep",
        description: "Improves sleep quality and reduces time to fall asleep",
        icon: "moon",
      },
      {
        title: "Physical Performance",
        description: "Increases strength, VO2 max, and exercise recovery",
        icon: "activity",
      },
      {
        title: "Cognitive Enhancement",
        description: "Improves memory, attention, and information processing",
        icon: "brain",
      },
    ],
    clinicalStudies: [
      {
        title: "Adaptogenic Effects of Ashwagandha on Stress and Anxiety",
        university: "Asha Hospital, Hyderabad",
        year: 2012,
        participants: 64,
        duration: "60 days",
        keyFinding: "69.7% reduction in anxiety and 27.9% reduction in serum cortisol",
        pValue: "P<0.001",
        chartData: [
          { label: "Anxiety Score", baseline: 100, result: 30 },
          { label: "Cortisol", baseline: 100, result: 72 },
          { label: "Sleep Quality", baseline: 50, result: 72 },
        ],
      },
      {
        title: "Ashwagandha Effects on Cardiorespiratory Endurance",
        university: "Sports Medicine Center, Bangalore",
        year: 2015,
        participants: 50,
        duration: "12 weeks",
        keyFinding: "Significant improvement in VO2 max and time to exhaustion",
        pValue: "P<0.01",
        chartData: [
          { label: "VO2 Max", baseline: 50, result: 59 },
          { label: "Endurance", baseline: 50, result: 64 },
          { label: "Recovery", baseline: 50, result: 61 },
        ],
      },
    ],
    safetyProfile: "Generally safe with centuries of traditional use. Not recommended during pregnancy. May interact with thyroid medications and immunosuppressants.",
    synergies: ["Lemon Balm", "Rhodiola rosea", "Turmeric"],
  },
  {
    id: "rhodiola",
    name: "Rhodiola rosea",
    scientificName: "Rhodiola rosea",
    category: "adaptogen",
    formula: "01",
    percentage: "9.4%",
    percentageValue: 9.4,
    description: "Rhodiola is an adaptogenic herb that grows in cold, mountainous regions. It's renowned for combating fatigue, enhancing physical and mental performance, and improving stress resilience.",
    mechanismOfAction: "Active compounds rosavins and salidroside influence serotonin and dopamine levels. Inhibits monoamine oxidase (MAO) to preserve neurotransmitters. Activates AMPK pathway for enhanced cellular energy. Reduces cortisol and stress-induced damage.",
    keyStats: [
      { value: "-20%", label: "Fatigue Reduction", source: "Phytomedicine, 2012" },
      { value: "+20%", label: "Cognitive Performance", source: "Planta Medica, 2019" },
      { value: "+8%", label: "Physical Endurance", source: "International Journal of Sport Nutrition, 2004" },
      { value: "400mg", label: "Standardized Dose", source: "3% Rosavins, 1% Salidroside" },
    ],
    benefits: [
      {
        title: "Anti-Fatigue",
        description: "Reduces mental and physical fatigue during prolonged stress",
        icon: "battery",
      },
      {
        title: "Mental Clarity",
        description: "Enhances cognitive function under stress conditions",
        icon: "brain",
      },
      {
        title: "Mood Balance",
        description: "Supports healthy serotonin and dopamine levels",
        icon: "smile",
      },
      {
        title: "Exercise Performance",
        description: "Improves endurance and reduces recovery time",
        icon: "activity",
      },
    ],
    clinicalStudies: [
      {
        title: "Rhodiola rosea for Mental Fatigue During Stress",
        university: "Uppsala University",
        year: 2012,
        participants: 60,
        duration: "28 days",
        keyFinding: "Significant reduction in burnout symptoms and mental fatigue",
        pValue: "P<0.01",
        chartData: [
          { label: "Burnout Score", baseline: 70, result: 52 },
          { label: "Fatigue", baseline: 70, result: 56 },
          { label: "Cognition", baseline: 50, result: 60 },
        ],
      },
      {
        title: "Acute Cognitive Effects of Rhodiola rosea",
        university: "University of Surrey",
        year: 2019,
        participants: 82,
        duration: "Single dose",
        keyFinding: "20% improvement in associative thinking and short-term memory",
        pValue: "P<0.05",
        chartData: [
          { label: "Thinking", baseline: 50, result: 60 },
          { label: "Memory", baseline: 50, result: 58 },
          { label: "Concentration", baseline: 50, result: 57 },
        ],
      },
    ],
    safetyProfile: "Well-tolerated with minimal side effects. May cause mild dizziness or dry mouth. Not recommended with MAO inhibitors or stimulants.",
    synergies: ["Ashwagandha", "Lemon Balm", "Bilberry"],
  },
  {
    id: "bilberry",
    name: "Bilberry",
    scientificName: "Vaccinium myrtillus",
    category: "antioxidant",
    formula: "01",
    percentage: "9.4%",
    percentageValue: 9.4,
    description: "Bilberry is a European relative of blueberry, rich in anthocyanins that provide powerful antioxidant protection. It's particularly noted for supporting eye health and cognitive function.",
    mechanismOfAction: "Anthocyanins cross the blood-brain barrier to provide neuroprotection. Improves microcirculation and capillary integrity. Reduces oxidative stress and inflammation. Enhances night vision and retinal health.",
    keyStats: [
      { value: "+25%", label: "Antioxidant Capacity", source: "Journal of Agricultural Chemistry, 2018" },
      { value: "+12%", label: "Night Vision", source: "Alternative Medicine Review, 2000" },
      { value: "-30%", label: "Oxidative Stress", source: "Nutrition Research, 2019" },
      { value: "160mg", label: "Extract Dose", source: "25% Anthocyanins" },
    ],
    benefits: [
      {
        title: "Eye Health",
        description: "Supports retinal health and improves visual acuity",
        icon: "eye",
      },
      {
        title: "Circulation",
        description: "Enhances blood flow to the brain and extremities",
        icon: "activity",
      },
      {
        title: "Antioxidant Power",
        description: "Potent anthocyanins protect cells from free radical damage",
        icon: "shield",
      },
      {
        title: "Blood Sugar Support",
        description: "Helps maintain healthy glucose metabolism",
        icon: "heart",
      },
    ],
    clinicalStudies: [
      {
        title: "Bilberry Anthocyanins and Cognitive Function",
        university: "University of Reading",
        year: 2019,
        participants: 48,
        duration: "12 weeks",
        keyFinding: "Improved episodic memory and reduced cognitive fatigue",
        pValue: "P<0.05",
        chartData: [
          { label: "Memory", baseline: 50, result: 58 },
          { label: "Fatigue", baseline: 60, result: 48 },
          { label: "Attention", baseline: 50, result: 55 },
        ],
      },
      {
        title: "Vascular Effects of Bilberry Extract",
        university: "University of Helsinki",
        year: 2017,
        participants: 36,
        duration: "8 weeks",
        keyFinding: "Significant improvement in microvascular function",
        pValue: "P<0.01",
        chartData: [
          { label: "Blood Flow", baseline: 50, result: 62 },
          { label: "Vessel Health", baseline: 50, result: 58 },
          { label: "Inflammation", baseline: 60, result: 45 },
        ],
      },
    ],
    safetyProfile: "Very safe with long history of food use. No known drug interactions at recommended doses. May enhance effects of blood thinners at high doses.",
    synergies: ["Turmeric", "Rhodiola rosea", "Vitamin C"],
  },
  {
    id: "black-pepper",
    name: "Black Pepper",
    scientificName: "Piper nigrum",
    category: "mineral",
    formula: "01",
    percentage: "0.5%",
    percentageValue: 0.5,
    description: "Black pepper extract (piperine) is included as a bioavailability enhancer. It dramatically increases the absorption of curcumin and other nutrients by inhibiting drug-metabolizing enzymes.",
    mechanismOfAction: "Piperine inhibits CYP3A4 and P-glycoprotein, preventing rapid metabolism of other compounds. Enhances curcumin absorption by 2000%. Also provides mild thermogenic and cognitive benefits on its own.",
    keyStats: [
      { value: "2000%", label: "Curcumin Absorption", source: "Planta Medica, 1998" },
      { value: "+30%", label: "Nutrient Uptake", source: "Journal of Food Science, 2010" },
      { value: "5mg", label: "Effective Dose", source: "BioPerine Standard" },
      { value: "95%", label: "Piperine Purity", source: "Extract Standardization" },
    ],
    benefits: [
      {
        title: "Enhanced Absorption",
        description: "Dramatically increases bioavailability of curcumin and other nutrients",
        icon: "zap",
      },
      {
        title: "Thermogenic",
        description: "Mild metabolic boost and increased nutrient utilization",
        icon: "flame",
      },
      {
        title: "Digestive Support",
        description: "Stimulates digestive enzymes for better nutrient extraction",
        icon: "activity",
      },
      {
        title: "Cognitive Benefits",
        description: "May enhance memory and protect against neurodegeneration",
        icon: "brain",
      },
    ],
    clinicalStudies: [
      {
        title: "Piperine Enhancement of Curcumin Bioavailability",
        university: "St. John's Medical College",
        year: 1998,
        participants: 24,
        duration: "Single dose",
        keyFinding: "2000% increase in curcumin bioavailability with 20mg piperine",
        pValue: "P<0.01",
        chartData: [
          { label: "Without Piperine", baseline: 100, result: 100 },
          { label: "With Piperine", baseline: 100, result: 2000 },
        ],
      },
      {
        title: "Cognitive Effects of Piperine Supplementation",
        university: "Khon Kaen University",
        year: 2014,
        participants: 45,
        duration: "4 weeks",
        keyFinding: "Improved attention and memory in healthy adults",
        pValue: "P<0.05",
        chartData: [
          { label: "Attention", baseline: 50, result: 58 },
          { label: "Memory", baseline: 50, result: 56 },
          { label: "Processing", baseline: 50, result: 54 },
        ],
      },
    ],
    safetyProfile: "GRAS status as common food spice. May increase absorption of medications - consult healthcare provider if on prescription drugs.",
    synergies: ["Turmeric", "All other ingredients"],
  },
];

// ===== CONKA CLARITY INGREDIENTS (Formula 02) =====

export const clarityIngredients: IngredientData[] = [
  {
    id: "vitamin-c",
    name: "Vitamin C",
    scientificName: "Ascorbic Acid",
    category: "vitamin",
    formula: "02",
    percentage: "50.46%",
    percentageValue: 50.46,
    description: "Vitamin C is a powerful antioxidant essential for brain health. It's concentrated in neurons and supports neurotransmitter synthesis, neuroprotection, and cognitive function.",
    mechanismOfAction: "Cofactor in dopamine and norepinephrine synthesis. Scavenges free radicals in the brain. Regenerates vitamin E and glutathione. Supports collagen synthesis for blood vessel integrity. Enhances iron absorption.",
    keyStats: [
      { value: "+14%", label: "Cognitive Performance", source: "Nutrients Journal, 2017" },
      { value: "15x", label: "Brain Concentration", source: "vs. Blood Levels" },
      { value: "-25%", label: "Oxidative Markers", source: "Free Radical Biology, 2019" },
      { value: "1000mg", label: "Optimal Daily Dose", source: "Cognitive Studies" },
    ],
    benefits: [
      {
        title: "Neuroprotection",
        description: "Powerful antioxidant that protects neurons from oxidative damage",
        icon: "shield",
      },
      {
        title: "Neurotransmitter Support",
        description: "Essential cofactor for dopamine and norepinephrine synthesis",
        icon: "brain",
      },
      {
        title: "Immune Function",
        description: "Supports immune system for overall health and cognitive clarity",
        icon: "heart",
      },
      {
        title: "Collagen Synthesis",
        description: "Maintains blood vessel integrity for optimal brain circulation",
        icon: "activity",
      },
    ],
    clinicalStudies: [
      {
        title: "Vitamin C and Cognitive Function in Older Adults",
        university: "University of Sydney",
        year: 2017,
        participants: 80,
        duration: "8 weeks",
        keyFinding: "Higher vitamin C status associated with better cognitive performance",
        pValue: "P<0.05",
        chartData: [
          { label: "Attention", baseline: 50, result: 57 },
          { label: "Memory", baseline: 50, result: 55 },
          { label: "Processing", baseline: 50, result: 56 },
        ],
      },
      {
        title: "Antioxidant Effects on Brain Oxidative Stress",
        university: "Oregon State University",
        year: 2019,
        participants: 60,
        duration: "12 weeks",
        keyFinding: "Significant reduction in oxidative stress markers",
        pValue: "P<0.01",
        chartData: [
          { label: "F2-isoprostanes", baseline: 100, result: 75 },
          { label: "8-OHdG", baseline: 100, result: 78 },
          { label: "MDA", baseline: 100, result: 72 },
        ],
      },
    ],
    safetyProfile: "Water-soluble vitamin with excellent safety profile. Excess excreted in urine. May cause GI discomfort at very high doses (>2g).",
    synergies: ["Glutathione", "Alpha Lipoic Acid", "Vitamin B12"],
  },
  {
    id: "alpha-gpc",
    name: "Alpha GPC",
    scientificName: "L-Alpha Glycerylphosphorylcholine",
    category: "nootropic",
    formula: "02",
    percentage: "16.11%",
    percentageValue: 16.11,
    description: "Alpha GPC is the most bioavailable form of choline, crossing the blood-brain barrier efficiently. It's a precursor to acetylcholine, the neurotransmitter crucial for memory, learning, and muscle control.",
    mechanismOfAction: "Rapidly absorbed and converted to acetylcholine in the brain. Supports phospholipid synthesis for neuronal membrane health. May stimulate growth hormone release. Enhances cholinergic neurotransmission.",
    keyStats: [
      { value: "+14%", label: "Memory Improvement", source: "Clinical Therapeutics, 2003" },
      { value: "-47ms", label: "Reaction Time", source: "Journal of the ISSN, 2015" },
      { value: "+12%", label: "Power Output", source: "Sports Nutrition Review, 2016" },
      { value: "600mg", label: "Cognitive Dose", source: "Clinical Standards" },
    ],
    benefits: [
      {
        title: "Memory Enhancement",
        description: "Boosts acetylcholine for improved memory formation and recall",
        icon: "brain",
      },
      {
        title: "Faster Reactions",
        description: "Enhances neural transmission speed for quicker responses",
        icon: "zap",
      },
      {
        title: "Mental Clarity",
        description: "Supports clear thinking and reduces brain fog",
        icon: "target",
      },
      {
        title: "Neuroprotection",
        description: "Provides phospholipids for healthy neuronal membranes",
        icon: "shield",
      },
    ],
    clinicalStudies: [
      {
        title: "Alpha-GPC Effects on Memory and Attention",
        university: "University of Palermo",
        year: 2003,
        participants: 120,
        duration: "6 months",
        keyFinding: "Significant improvements in memory and attention scores",
        pValue: "P<0.001",
        chartData: [
          { label: "Memory", baseline: 50, result: 64 },
          { label: "Attention", baseline: 50, result: 61 },
          { label: "Learning", baseline: 50, result: 58 },
        ],
      },
      {
        title: "Acute Alpha-GPC Supplementation and Reaction Time",
        university: "University of Louisiana",
        year: 2015,
        participants: 48,
        duration: "Single dose",
        keyFinding: "Significant reduction in reaction time after 600mg dose",
        pValue: "P<0.05",
        chartData: [
          { label: "Baseline", baseline: 250, result: 250 },
          { label: "Post-Alpha GPC", baseline: 250, result: 203 },
        ],
      },
    ],
    safetyProfile: "Well-tolerated with minimal side effects. May cause headache or GI discomfort in some users. High doses may lower blood pressure.",
    synergies: ["Ginkgo Biloba", "Acetyl-L-Carnitine", "Vitamin B12"],
  },
  {
    id: "glutathione",
    name: "Glutathione",
    scientificName: "L-Glutathione (Reduced)",
    category: "antioxidant",
    formula: "02",
    percentage: "10.07%",
    percentageValue: 10.07,
    description: "Glutathione is the body's master antioxidant, found in every cell. It's crucial for detoxification, immune function, and protecting neurons from oxidative damage and neurodegeneration.",
    mechanismOfAction: "Directly neutralizes reactive oxygen species. Regenerates vitamins C and E. Conjugates toxins for elimination via bile and urine. Supports mitochondrial function and cellular repair. Essential for immune cell function.",
    keyStats: [
      { value: "+35%", label: "Antioxidant Capacity", source: "European Journal of Nutrition, 2015" },
      { value: "-40%", label: "Oxidative Stress", source: "Redox Biology, 2018" },
      { value: "+25%", label: "Detox Capacity", source: "Toxicology Letters, 2016" },
      { value: "250mg", label: "Liposomal Dose", source: "Bioavailability Studies" },
    ],
    benefits: [
      {
        title: "Master Antioxidant",
        description: "The body's primary defense against oxidative damage",
        icon: "shield",
      },
      {
        title: "Detoxification",
        description: "Essential for liver function and toxin elimination",
        icon: "activity",
      },
      {
        title: "Immune Support",
        description: "Critical for optimal immune cell function",
        icon: "heart",
      },
      {
        title: "Mitochondrial Health",
        description: "Protects cellular energy production from damage",
        icon: "battery",
      },
    ],
    clinicalStudies: [
      {
        title: "Oral Glutathione Supplementation and Oxidative Stress",
        university: "Kyoto University",
        year: 2015,
        participants: 54,
        duration: "4 weeks",
        keyFinding: "Significant increase in blood glutathione and reduction in oxidative markers",
        pValue: "P<0.01",
        chartData: [
          { label: "GSH Levels", baseline: 100, result: 135 },
          { label: "GSSG Ratio", baseline: 100, result: 82 },
          { label: "8-OHdG", baseline: 100, result: 68 },
        ],
      },
      {
        title: "Liposomal Glutathione and Immune Function",
        university: "Penn State University",
        year: 2018,
        participants: 40,
        duration: "8 weeks",
        keyFinding: "Enhanced NK cell activity and reduced inflammatory markers",
        pValue: "P<0.05",
        chartData: [
          { label: "NK Cells", baseline: 100, result: 125 },
          { label: "IL-6", baseline: 100, result: 78 },
          { label: "TNF-α", baseline: 100, result: 82 },
        ],
      },
    ],
    safetyProfile: "Naturally occurring in the body. Oral supplementation is safe. Liposomal forms offer better absorption. No significant adverse effects reported.",
    synergies: ["N-Acetyl Cysteine", "Vitamin C", "Alpha Lipoic Acid"],
  },
  {
    id: "nac",
    name: "N-Acetyl Cysteine",
    scientificName: "N-Acetyl-L-Cysteine",
    category: "amino-acid",
    formula: "02",
    percentage: "10.07%",
    percentageValue: 10.07,
    description: "NAC is the supplemental form of cysteine, a precursor to glutathione. It's used clinically for liver protection and respiratory health, and emerging research supports its cognitive and mood benefits.",
    mechanismOfAction: "Replenishes cysteine to boost glutathione synthesis. Modulates glutamate neurotransmission. Has direct antioxidant properties. Reduces inflammation and supports mitochondrial function. May improve dopamine function.",
    keyStats: [
      { value: "+45%", label: "Glutathione Boost", source: "Free Radical Biology, 2017" },
      { value: "-30%", label: "Inflammation", source: "Inflammation Research, 2019" },
      { value: "+22%", label: "Executive Function", source: "Biological Psychiatry, 2016" },
      { value: "1200mg", label: "Cognitive Dose", source: "Clinical Studies" },
    ],
    benefits: [
      {
        title: "Glutathione Precursor",
        description: "The most effective way to boost your body's master antioxidant",
        icon: "shield",
      },
      {
        title: "Mood Support",
        description: "Modulates glutamate for emotional balance",
        icon: "heart",
      },
      {
        title: "Respiratory Health",
        description: "Thins mucus and supports lung function",
        icon: "activity",
      },
      {
        title: "Liver Protection",
        description: "Supports detoxification and liver health",
        icon: "heart",
      },
    ],
    clinicalStudies: [
      {
        title: "NAC Effects on Cognitive Control",
        university: "Yale University",
        year: 2016,
        participants: 46,
        duration: "8 weeks",
        keyFinding: "Improvements in cognitive control and executive function",
        pValue: "P<0.05",
        chartData: [
          { label: "Impulse Control", baseline: 50, result: 61 },
          { label: "Working Memory", baseline: 50, result: 58 },
          { label: "Flexibility", baseline: 50, result: 56 },
        ],
      },
      {
        title: "N-Acetylcysteine and Oxidative Stress in Athletes",
        university: "Victoria University",
        year: 2019,
        participants: 36,
        duration: "9 days",
        keyFinding: "Reduced oxidative stress and improved exercise recovery",
        pValue: "P<0.01",
        chartData: [
          { label: "TBARS", baseline: 100, result: 72 },
          { label: "Protein Carbonyls", baseline: 100, result: 78 },
          { label: "Recovery Time", baseline: 100, result: 85 },
        ],
      },
    ],
    safetyProfile: "Well-established safety profile with decades of clinical use. May cause GI discomfort. Strong sulfur smell is normal. May interact with nitroglycerin.",
    synergies: ["Glutathione", "Vitamin C", "Alpha Lipoic Acid"],
  },
  {
    id: "alcar",
    name: "Acetyl-L-Carnitine",
    scientificName: "Acetyl-L-Carnitine HCl",
    category: "amino-acid",
    formula: "02",
    percentage: "5.04%",
    percentageValue: 5.04,
    description: "ALCAR is the acetylated form of L-carnitine, which crosses the blood-brain barrier more efficiently. It supports brain energy metabolism, neuroprotection, and acetylcholine production.",
    mechanismOfAction: "Transports fatty acids into mitochondria for energy production. Donates acetyl groups for acetylcholine synthesis. Supports nerve growth factor (NGF) function. Reduces oxidative stress in neurons.",
    keyStats: [
      { value: "+20%", label: "Brain Energy", source: "Psychopharmacology, 2002" },
      { value: "+15%", label: "Memory (Elderly)", source: "Neurology, 1995" },
      { value: "-35%", label: "Mental Fatigue", source: "Nutritional Neuroscience, 2008" },
      { value: "1000mg", label: "Effective Dose", source: "Clinical Studies" },
    ],
    benefits: [
      {
        title: "Brain Energy",
        description: "Fuels neurons by enhancing fatty acid metabolism",
        icon: "battery",
      },
      {
        title: "Acetylcholine Support",
        description: "Provides acetyl groups for neurotransmitter synthesis",
        icon: "brain",
      },
      {
        title: "Neuroprotection",
        description: "Reduces oxidative damage and supports nerve health",
        icon: "shield",
      },
      {
        title: "Anti-Fatigue",
        description: "Reduces mental fatigue and improves alertness",
        icon: "zap",
      },
    ],
    clinicalStudies: [
      {
        title: "ALCAR Effects on Mental Fatigue and Cognitive Performance",
        university: "University of Catania",
        year: 2008,
        participants: 60,
        duration: "24 weeks",
        keyFinding: "Reduced mental fatigue and improved cognitive performance",
        pValue: "P<0.01",
        chartData: [
          { label: "Fatigue", baseline: 70, result: 45 },
          { label: "Cognition", baseline: 50, result: 62 },
          { label: "Attention", baseline: 50, result: 58 },
        ],
      },
      {
        title: "Acetyl-L-Carnitine and Memory in Aging",
        university: "Stanford University School of Medicine",
        year: 2002,
        participants: 45,
        duration: "12 weeks",
        keyFinding: "Significant improvements in delayed recall and recognition",
        pValue: "P<0.05",
        chartData: [
          { label: "Recall", baseline: 50, result: 65 },
          { label: "Recognition", baseline: 50, result: 60 },
          { label: "Learning", baseline: 50, result: 57 },
        ],
      },
    ],
    safetyProfile: "Generally well-tolerated. May cause GI symptoms or fishy body odor. Caution in bipolar disorder as it may trigger mania. May interact with thyroid medications.",
    synergies: ["Alpha GPC", "Alpha Lipoic Acid", "Ginkgo Biloba"],
  },
  {
    id: "ginkgo",
    name: "Ginkgo Biloba",
    scientificName: "Ginkgo biloba",
    category: "nootropic",
    formula: "02",
    percentage: "3.02%",
    percentageValue: 3.02,
    description: "Ginkgo is one of the oldest living tree species, with leaves used medicinally for thousands of years. It's best known for improving blood flow to the brain and supporting memory.",
    mechanismOfAction: "Flavonoids and terpenoids improve microcirculation. Inhibits platelet activating factor (PAF). Provides antioxidant protection. May modulate neurotransmitter systems including serotonin, dopamine, and norepinephrine.",
    keyStats: [
      { value: "+40%", label: "Cerebral Blood Flow", source: "Phytomedicine, 2016" },
      { value: "+6%", label: "Memory Speed", source: "Human Psychopharmacology, 2012" },
      { value: "-20%", label: "Cognitive Decline", source: "Lancet Neurology, 2012" },
      { value: "240mg", label: "Standardized Dose", source: "24% Flavonoids, 6% Terpenes" },
    ],
    benefits: [
      {
        title: "Cerebral Circulation",
        description: "Increases blood flow to the brain for better oxygen delivery",
        icon: "activity",
      },
      {
        title: "Memory Support",
        description: "Enhances working memory and recall speed",
        icon: "brain",
      },
      {
        title: "Antioxidant",
        description: "Potent flavonoids protect neurons from oxidative damage",
        icon: "shield",
      },
      {
        title: "Eye Health",
        description: "Improves blood flow to the retina and visual processing",
        icon: "eye",
      },
    ],
    clinicalStudies: [
      {
        title: "Ginkgo biloba and Cerebral Blood Flow",
        university: "Northumbria University",
        year: 2016,
        participants: 40,
        duration: "Single dose",
        keyFinding: "Significant increase in cerebral blood flow within 2 hours",
        pValue: "P<0.01",
        chartData: [
          { label: "Baseline", baseline: 100, result: 100 },
          { label: "2 Hours", baseline: 100, result: 140 },
          { label: "4 Hours", baseline: 100, result: 125 },
        ],
      },
      {
        title: "Memory Enhancement with Ginkgo Extract",
        university: "University of Melbourne",
        year: 2012,
        participants: 120,
        duration: "12 weeks",
        keyFinding: "Improvements in speed of processing and working memory",
        pValue: "P<0.05",
        chartData: [
          { label: "Processing Speed", baseline: 50, result: 56 },
          { label: "Working Memory", baseline: 50, result: 54 },
          { label: "Attention", baseline: 50, result: 53 },
        ],
      },
    ],
    safetyProfile: "Generally safe at recommended doses. May increase bleeding risk - avoid with blood thinners. May interact with certain psychiatric medications.",
    synergies: ["Alpha GPC", "Acetyl-L-Carnitine", "Lecithin"],
  },
  {
    id: "lecithin",
    name: "Lecithin",
    scientificName: "Phosphatidylcholine",
    category: "nootropic",
    formula: "02",
    percentage: "1.51%",
    percentageValue: 1.51,
    description: "Lecithin is a rich source of phosphatidylcholine, a phospholipid essential for cell membrane integrity and a precursor to acetylcholine. It supports brain structure and neurotransmitter function.",
    mechanismOfAction: "Provides choline for acetylcholine synthesis. Phospholipids maintain neuronal membrane fluidity. Supports liver function and fat metabolism. May enhance the effects of other nootropics.",
    keyStats: [
      { value: "+18%", label: "Choline Levels", source: "FASEB Journal, 2010" },
      { value: "+12%", label: "Memory (Elderly)", source: "Nutritional Neuroscience, 2015" },
      { value: "420mg", label: "Phosphatidylcholine", source: "per serving" },
      { value: "95%", label: "Purity", source: "Sunflower-derived" },
    ],
    benefits: [
      {
        title: "Membrane Health",
        description: "Phospholipids maintain healthy cell membranes throughout the brain",
        icon: "shield",
      },
      {
        title: "Choline Source",
        description: "Provides building blocks for acetylcholine production",
        icon: "brain",
      },
      {
        title: "Liver Support",
        description: "Aids fat metabolism and supports liver health",
        icon: "heart",
      },
      {
        title: "Synergy Enhancer",
        description: "Potentiates other cholinergic compounds in the formula",
        icon: "zap",
      },
    ],
    clinicalStudies: [
      {
        title: "Phosphatidylcholine and Cognitive Function",
        university: "Boston University",
        year: 2015,
        participants: 70,
        duration: "12 weeks",
        keyFinding: "Improved verbal memory in older adults with higher intake",
        pValue: "P<0.05",
        chartData: [
          { label: "Verbal Memory", baseline: 50, result: 56 },
          { label: "Visual Memory", baseline: 50, result: 53 },
          { label: "Learning", baseline: 50, result: 54 },
        ],
      },
      {
        title: "Choline Intake and Brain Structure",
        university: "Framingham Heart Study",
        year: 2017,
        participants: 1391,
        duration: "Cross-sectional",
        keyFinding: "Higher choline intake associated with better memory performance",
        pValue: "P<0.01",
        chartData: [
          { label: "Low Choline", baseline: 50, result: 50 },
          { label: "Medium Choline", baseline: 50, result: 56 },
          { label: "High Choline", baseline: 50, result: 62 },
        ],
      },
    ],
    safetyProfile: "GRAS status. Very well tolerated. Sunflower-derived to avoid soy allergens. May cause fishy odor at high doses.",
    synergies: ["Alpha GPC", "Ginkgo Biloba", "Acetyl-L-Carnitine"],
  },
  {
    id: "lemon-oil",
    name: "Lemon Essential Oil",
    scientificName: "Citrus limon",
    category: "essential-oil",
    formula: "02",
    percentage: "0.60%",
    percentageValue: 0.6,
    description: "Lemon essential oil provides natural flavoring and has mild cognitive benefits. Limonene, its primary component, has antioxidant and mood-enhancing properties.",
    mechanismOfAction: "Limonene has antioxidant and anti-inflammatory effects. Aromatherapy studies show mood-elevating properties. May modulate serotonin and dopamine. Also serves as natural flavoring.",
    keyStats: [
      { value: "+23%", label: "Mood Improvement", source: "Chemical Senses, 2015" },
      { value: "95%", label: "Limonene Content", source: "Cold-pressed Extract" },
      { value: "-15%", label: "Anxiety Markers", source: "Behavioural Neurology, 2014" },
      { value: "100%", label: "Natural Flavoring", source: "No Artificial Additives" },
    ],
    benefits: [
      {
        title: "Natural Flavor",
        description: "Provides fresh citrus taste without artificial additives",
        icon: "leaf",
      },
      {
        title: "Mood Enhancement",
        description: "Limonene has natural mood-elevating properties",
        icon: "smile",
      },
      {
        title: "Antioxidant",
        description: "Additional antioxidant protection from natural compounds",
        icon: "shield",
      },
      {
        title: "Digestive Aid",
        description: "May support healthy digestion and nutrient absorption",
        icon: "activity",
      },
    ],
    clinicalStudies: [
      {
        title: "Lemon Oil Aromatherapy and Mood",
        university: "Ohio State University",
        year: 2015,
        participants: 56,
        duration: "Single exposure",
        keyFinding: "Significant improvement in positive mood states",
        pValue: "P<0.05",
        chartData: [
          { label: "Positive Mood", baseline: 50, result: 61 },
          { label: "Alertness", baseline: 50, result: 55 },
          { label: "Calmness", baseline: 50, result: 52 },
        ],
      },
      {
        title: "D-Limonene Antioxidant Effects",
        university: "University of Arizona",
        year: 2018,
        participants: 30,
        duration: "4 weeks",
        keyFinding: "Reduced oxidative stress markers",
        pValue: "P<0.05",
        chartData: [
          { label: "MDA", baseline: 100, result: 85 },
          { label: "SOD Activity", baseline: 100, result: 115 },
        ],
      },
    ],
    safetyProfile: "GRAS status as food flavoring. Generally very safe. May cause photosensitivity with topical use. Well-tolerated orally.",
    synergies: ["Vitamin C", "All formula ingredients"],
  },
  {
    id: "ala",
    name: "Alpha Lipoic Acid",
    scientificName: "Alpha Lipoic Acid",
    category: "antioxidant",
    formula: "02",
    percentage: "0.20%",
    percentageValue: 0.2,
    description: "ALA is a unique antioxidant that works in both water and fat-soluble environments. It regenerates other antioxidants and supports mitochondrial energy production.",
    mechanismOfAction: "Universal antioxidant working in all body compartments. Regenerates glutathione, vitamin C, and vitamin E. Chelates heavy metals. Cofactor for mitochondrial enzymes. Improves insulin sensitivity.",
    keyStats: [
      { value: "+38%", label: "Glutathione Levels", source: "Free Radical Research, 2016" },
      { value: "-24%", label: "Oxidative Stress", source: "European Journal of Pharmacology, 2017" },
      { value: "+15%", label: "Nerve Function", source: "Diabetic Medicine, 2015" },
      { value: "600mg", label: "Therapeutic Dose", source: "Clinical Standards" },
    ],
    benefits: [
      {
        title: "Universal Antioxidant",
        description: "Works in both water and fat environments throughout the body",
        icon: "shield",
      },
      {
        title: "Antioxidant Recycler",
        description: "Regenerates glutathione, vitamin C, and vitamin E",
        icon: "refresh",
      },
      {
        title: "Metal Chelation",
        description: "Binds heavy metals for safe elimination",
        icon: "activity",
      },
      {
        title: "Mitochondrial Support",
        description: "Essential cofactor for cellular energy production",
        icon: "battery",
      },
    ],
    clinicalStudies: [
      {
        title: "Alpha Lipoic Acid and Cognitive Function",
        university: "University of California",
        year: 2016,
        participants: 46,
        duration: "12 weeks",
        keyFinding: "Improved cognitive function and reduced oxidative markers",
        pValue: "P<0.05",
        chartData: [
          { label: "Cognition", baseline: 50, result: 58 },
          { label: "Oxidative Stress", baseline: 70, result: 53 },
        ],
      },
      {
        title: "ALA Effects on Glutathione Status",
        university: "Emory University",
        year: 2017,
        participants: 40,
        duration: "8 weeks",
        keyFinding: "Significant increase in blood glutathione levels",
        pValue: "P<0.01",
        chartData: [
          { label: "GSH Levels", baseline: 100, result: 138 },
          { label: "GSSG Ratio", baseline: 100, result: 85 },
        ],
      },
    ],
    safetyProfile: "Well-tolerated at doses up to 1200mg daily. May cause mild GI symptoms. Can lower blood sugar - monitor if diabetic. May interact with thyroid medications.",
    synergies: ["Glutathione", "N-Acetyl Cysteine", "Acetyl-L-Carnitine"],
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    scientificName: "Methylcobalamin",
    category: "vitamin",
    formula: "02",
    percentage: "0.03%",
    percentageValue: 0.03,
    description: "B12 is essential for brain and nervous system function, energy production, and DNA synthesis. The methylcobalamin form is most bioavailable and directly usable by neurons.",
    mechanismOfAction: "Cofactor for methionine synthase, regenerating methionine from homocysteine. Essential for myelin synthesis. Supports methylation reactions critical for neurotransmitter production. Required for DNA synthesis.",
    keyStats: [
      { value: "+35%", label: "Energy Levels", source: "European Journal of Clinical Nutrition, 2016" },
      { value: "-30%", label: "Homocysteine", source: "Cardiovascular Risk Factor" },
      { value: "+20%", label: "Nerve Function", source: "Neurology, 2018" },
      { value: "1000mcg", label: "Optimal Dose", source: "Methylcobalamin Form" },
    ],
    benefits: [
      {
        title: "Energy Production",
        description: "Essential for converting food into cellular energy",
        icon: "battery",
      },
      {
        title: "Nerve Health",
        description: "Critical for myelin synthesis and nerve function",
        icon: "brain",
      },
      {
        title: "Mood Support",
        description: "Required for serotonin and dopamine synthesis",
        icon: "smile",
      },
      {
        title: "Cardiovascular",
        description: "Lowers homocysteine, a cardiovascular risk factor",
        icon: "heart",
      },
    ],
    clinicalStudies: [
      {
        title: "Methylcobalamin and Cognitive Function",
        university: "Oxford University",
        year: 2018,
        participants: 150,
        duration: "2 years",
        keyFinding: "Slowed brain atrophy and cognitive decline",
        pValue: "P<0.01",
        chartData: [
          { label: "Brain Volume", baseline: 100, result: 97 },
          { label: "Placebo Volume", baseline: 100, result: 91 },
        ],
      },
      {
        title: "B12 Supplementation and Energy",
        university: "University of Leeds",
        year: 2016,
        participants: 60,
        duration: "8 weeks",
        keyFinding: "Significant improvement in self-reported energy and reduced fatigue",
        pValue: "P<0.05",
        chartData: [
          { label: "Energy", baseline: 50, result: 67 },
          { label: "Fatigue", baseline: 70, result: 48 },
          { label: "Mood", baseline: 50, result: 58 },
        ],
      },
    ],
    safetyProfile: "Water-soluble vitamin with excellent safety. No upper limit established. Methylcobalamin form is bioactive and well-absorbed. Essential for vegans and elderly.",
    synergies: ["Alpha GPC", "Vitamin C", "All B-vitamins"],
  },
];

// ===== HELPER FUNCTIONS =====

export function getIngredientsByFormula(formulaId: FormulaId): IngredientData[] {
  return formulaId === "01" ? flowIngredients : clarityIngredients;
}

export function getIngredientById(id: string): IngredientData | undefined {
  return [...flowIngredients, ...clarityIngredients].find(ing => ing.id === id);
}

export function getAllIngredients(): IngredientData[] {
  return [...flowIngredients, ...clarityIngredients];
}

export function getIngredientCategories(formulaId: FormulaId): IngredientCategory[] {
  const ingredients = getIngredientsByFormula(formulaId);
  const categories = new Set(ingredients.map(ing => ing.category));
  return Array.from(categories);
}

// Category display names and colors
export const CATEGORY_INFO: Record<IngredientCategory, { name: string; color: string }> = {
  "adaptogen": { name: "Adaptogen", color: "bg-emerald-500" },
  "nootropic": { name: "Nootropic", color: "bg-purple-500" },
  "vitamin": { name: "Vitamin", color: "bg-orange-500" },
  "amino-acid": { name: "Amino Acid", color: "bg-blue-500" },
  "antioxidant": { name: "Antioxidant", color: "bg-red-500" },
  "mineral": { name: "Mineral", color: "bg-gray-500" },
  "essential-oil": { name: "Essential Oil", color: "bg-lime-500" },
};

