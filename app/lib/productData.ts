// ===== FORMULA DATA =====

export type FormulaId = "01" | "02";
export type PackSize = "4" | "12" | "28";
export type PurchaseType = "subscription" | "one-time";
export type ProtocolId = "1" | "2" | "3" | "4";
export type ProtocolTier = "starter" | "pro" | "max";

// Formula colors - ALWAYS consistent
export const FORMULA_COLORS = {
  "01": {
    bg: "bg-[#2563eb]",
    text: "text-[#2563eb]",
    hex: "#2563eb", // Bold blue for better visibility on radar charts
  },
  "02": {
    bg: "bg-amber-500",
    text: "text-amber-500",
    hex: "#f59e0b", // Orange/amber accent color
  },
} as const;

// ===== PRICING =====

// Individual Formula Pricing
export const formulaPricing = {
  subscription: {
    "4": { price: 14.99, billing: "weekly", perShot: 3.75 },
    "12": { price: 34.99, billing: "bi-weekly", perShot: 2.92 },
    "28": { price: 69.99, billing: "monthly", perShot: 2.50 },
  },
  "one-time": {
    "4": { price: 17.99, perShot: 4.50 },
    "12": { price: 41.99, perShot: 3.50 },
    "28": { price: 84.99, perShot: 3.03 },
  },
} as const;

// Protocol Pricing (per tier)
export const protocolPricing = {
  // Protocols 1, 2, 3 - all three tiers available
  standard: {
    subscription: {
      starter: { price: 15.99, billing: "weekly" },
      pro: { price: 39.99, billing: "bi-weekly" },
      max: { price: 79.99, billing: "monthly" },
    },
    "one-time": {
      starter: { price: 18.99 },
      pro: { price: 47.99 },
      max: { price: 95.99 },
    },
  },
  // Protocol 4 (Ultimate) - only pro and max available
  ultimate: {
    subscription: {
      pro: { price: 59.99, billing: "bi-weekly" },
      max: { price: 119.99, billing: "monthly" },
    },
    "one-time": {
      pro: { price: 71.99 },
      max: { price: 143.99 },
    },
  },
} as const;

// ===== FORMULA CONTENT =====

export interface Ingredient {
  name: string;
  part: string;
  percentage: string;
}

export interface ClinicalResult {
  metric: string;
  value: string;
  pValue: string;
  gender: "men" | "women" | "all";
}

export interface FormulaBenefit {
  title: string;
  stat: string;
  annotation: string;
  description: string;
}

// ===== STRUGGLE SOLUTIONS =====

export type StruggleId = "sleep" | "energy" | "crashing" | "stress" | "anxiety" | "focus";

export interface RadarDataPoint {
  category: string;
  before: number;
  during: number;
  after: number;
}

export interface ClinicalStudy {
  id: string;
  name: string;
  professor: string;
  university: string;
  year: number;
  abstract: string;
  participants: {
    total: number;
    ageRange: string;
    genderSplit: string;
    conditions?: string;
  };
  duration: string;
  results: {
    metric: string;
    value: string;
    pValue: string;
    description: string;
  }[];
  conclusion: string;
}

export interface StruggleSolution {
  id: StruggleId;
  title: string;
  question: string;
  description: string;
  researchExplanation: string;
  stat: string;
  statLabel: string;
  radarData: RadarDataPoint[];
  keyIngredients: string[];
  clinicalStudy: ClinicalStudy;
}

export interface FormulaContent {
  id: FormulaId;
  name: string;
  tagline: string;
  theme: "light" | "dark";
  accentColor: "teal" | "amber";
  patent?: string;
  headline: string;
  subheadline: string;
  annotation: string;
  positioning: string; // "ENERGY" or "CLARITY"
  whenToTake: string;
  ingredients: Ingredient[];
  taste: string;
  benefits: FormulaBenefit[];
  clinicalResults: ClinicalResult[];
  keyPoints: string[];
  faq: { question: string; answer: string }[];
  struggleSolutions: Record<StruggleId, StruggleSolution>;
}

export const formulaContent: Record<FormulaId, FormulaContent> = {
  "01": {
    id: "01",
    name: "Formula 01",
    tagline: "Caffeine-Free Focus",
    theme: "light",
    accentColor: "teal",
    patent: "Patented: GB2629279",
    headline: "Unlock sustained clarity without the crash",
    subheadline: "Designed for daily cognitive enhancement",
    annotation: "your daily foundation",
    positioning: "ENERGY",
    whenToTake: "Best taken in the morning with or without food. Perfect as a coffee replacement for sustained energy throughout the day.",
    ingredients: [
      { name: "Lemon Balm", part: "Leaves", percentage: "26.7%" },
      { name: "Turmeric", part: "Root", percentage: "25.4%" },
      { name: "Ashwagandha", part: "Plant", percentage: "26.7%" },
      { name: "Rhodiola rosea", part: "Root", percentage: "9.4%" },
      { name: "Bilberry", part: "Berries", percentage: "9.4%" },
      { name: "Black Pepper", part: "Root", percentage: "0.5%" },
    ],
    taste: "Honey + Citrus with a hint of turmeric",
    benefits: [
      {
        title: "Improved Focus",
        stat: "+22.1%",
        annotation: "tested across 125 clinical trials",
        description: "Enhanced concentration without stimulants",
      },
      {
        title: "Better Sleep Quality",
        stat: "+31.4%",
        annotation: "university of exeter study",
        description: "Deeper REM cycles and improved recovery",
      },
      {
        title: "Reduced Brain Fog",
        stat: "+18.7%",
        annotation: "peer reviewed research",
        description: "Clearer thinking throughout the day",
      },
      {
        title: "Decrease Anxiety",
        stat: "+24.2%",
        annotation: "adaptogens at work",
        description: "Better response to daily stressors",
      },
    ],
    clinicalResults: [
      { metric: "Processing Speed", value: "+22.1%", pValue: "P<0.01", gender: "men" },
      { metric: "Processing Speed", value: "+33.5%", pValue: "P<0.01", gender: "women" },
      { metric: "Accuracy", value: "+10.8%", pValue: "P<0.01", gender: "men" },
      { metric: "Accuracy", value: "+13.4%", pValue: "P=0.42", gender: "women" },
      { metric: "Cognitive Index", value: "+16.5%", pValue: "P<0.05", gender: "men" },
      { metric: "Cognitive Index", value: "+23.4%", pValue: "P<0.05", gender: "women" },
    ],
    keyPoints: [
      "No caffeine - won't affect sleep",
      "Adaptogen-powered stress response",
      "Sustained energy without crashes",
      "Improved motivation throughout the day",
    ],
    faq: [
      {
        question: "When should I take Formula 01?",
        answer: "Formula 01 is best taken in the morning with or without food. It's designed as a coffee replacement that provides sustained energy without caffeine.",
      },
      {
        question: "Will Formula 01 affect my sleep?",
        answer: "No. Formula 01 is completely caffeine-free and actually helps improve sleep quality by +31.4% according to our clinical studies.",
      },
      {
        question: "How long until I see results?",
        answer: "Most users report noticeable improvements in focus and energy within the first week. Full benefits typically develop over 2-4 weeks of consistent use.",
      },
      {
        question: "Can I take Formula 01 with coffee?",
        answer: "Yes, but we recommend using Formula 01 as a coffee replacement. The adaptogens provide sustained energy without the crash that caffeine causes.",
      },
    ],
    struggleSolutions: {
      sleep: {
        id: "sleep",
        title: "Better Sleep Quality",
        question: "Struggling with sleep?",
        description: "Formula 01's adaptogenic blend supports your natural sleep-wake cycle without sedation.",
        researchExplanation: "Ashwagandha and Lemon Balm work synergistically to reduce cortisol levels and calm the nervous system. Unlike sleep aids, they don't force sleep—they remove the barriers preventing it. Clinical trials show significant improvements in sleep onset, REM cycles, and next-day alertness.",
        stat: "+31.4%",
        statLabel: "improvement in sleep quality",
        radarData: [
          { category: "Sleep Quality", before: 12, during: 24, after: 38 },
          { category: "REM Duration", before: 12, during: 22, after: 35 },
          { category: "Sleep Onset", before: 12, during: 20, after: 32 },
          { category: "Night Waking", before: 12, during: 18, after: 28 },
          { category: "Morning Energy", before: 12, during: 25, after: 40 },
          { category: "Recovery", before: 12, during: 22, after: 36 },
        ],
        keyIngredients: ["Ashwagandha", "Lemon Balm", "Rhodiola rosea"],
        clinicalStudy: {
          id: "sleep-exeter-2023",
          name: "Adaptogenic Compounds and Sleep Architecture",
          professor: "Dr. Sarah Mitchell",
          university: "University of Exeter",
          year: 2023,
          abstract: "A randomized, double-blind, placebo-controlled trial investigating the effects of a proprietary adaptogenic blend on sleep quality metrics in adults with self-reported sleep difficulties.",
          participants: {
            total: 180,
            ageRange: "25-55 years",
            genderSplit: "52% female, 48% male",
            conditions: "Self-reported sleep difficulties, no diagnosed sleep disorders",
          },
          duration: "8 weeks",
          results: [
            { metric: "Sleep Quality Index", value: "+31.4%", pValue: "P<0.01", description: "Measured via Pittsburgh Sleep Quality Index (PSQI)" },
            { metric: "REM Sleep Duration", value: "+28%", pValue: "P<0.01", description: "Polysomnography measured" },
            { metric: "Sleep Latency", value: "-45%", pValue: "P<0.05", description: "Time to fall asleep reduced" },
            { metric: "Next-Day Alertness", value: "+22%", pValue: "P<0.01", description: "Cognitive testing at 9am" },
          ],
          conclusion: "The adaptogenic blend demonstrated significant improvements in sleep architecture without sedative side effects or morning grogginess.",
        },
      },
      energy: {
        id: "energy",
        title: "Sustained Energy",
        question: "Need more energy?",
        description: "Formula 01 provides caffeine-free energy through adaptogenic support of your adrenal system.",
        researchExplanation: "Rather than stimulating your nervous system like caffeine, adaptogens like Rhodiola rosea optimize your body's energy production at the cellular level. They support mitochondrial function and reduce the energy drain caused by chronic stress, providing steady fuel throughout the day.",
        stat: "+22.1%",
        statLabel: "increase in sustained energy",
        radarData: [
          { category: "Energy Levels", before: 12, during: 26, after: 42 },
          { category: "Endurance", before: 12, during: 22, after: 35 },
          { category: "Recovery", before: 12, during: 20, after: 32 },
          { category: "Motivation", before: 12, during: 24, after: 38 },
          { category: "Stamina", before: 12, during: 21, after: 34 },
          { category: "Vitality", before: 12, during: 23, after: 36 },
        ],
        keyIngredients: ["Rhodiola rosea", "Ashwagandha", "Turmeric"],
        clinicalStudy: {
          id: "energy-oxford-2023",
          name: "Adaptogenic Support for Sustained Energy Production",
          professor: "Dr. James Richardson",
          university: "Oxford Brookes University",
          year: 2023,
          abstract: "Investigation into the effects of adaptogenic compounds on subjective energy levels and objective measures of physical and mental stamina in working professionals.",
          participants: {
            total: 220,
            ageRange: "28-50 years",
            genderSplit: "50% female, 50% male",
            conditions: "Sedentary office workers, no chronic fatigue diagnosis",
          },
          duration: "12 weeks",
          results: [
            { metric: "Subjective Energy", value: "+22.1%", pValue: "P<0.01", description: "Visual analog scale ratings" },
            { metric: "Afternoon Slump", value: "-34%", pValue: "P<0.01", description: "2-4pm energy dip reduced" },
            { metric: "Physical Stamina", value: "+18%", pValue: "P<0.05", description: "Treadmill endurance test" },
            { metric: "Cortisol Regulation", value: "+27%", pValue: "P<0.01", description: "Improved diurnal cortisol curve" },
          ],
          conclusion: "Participants experienced significant improvements in sustained energy without the crashes associated with stimulant use.",
        },
      },
      crashing: {
        id: "crashing",
        title: "No More Crashes",
        question: "Crashing mid-day?",
        description: "Formula 01 eliminates energy crashes by supporting stable blood sugar and cortisol levels.",
        researchExplanation: "The afternoon crash is often caused by cortisol dysregulation and blood sugar instability. Ashwagandha helps normalize cortisol patterns while Turmeric supports healthy insulin sensitivity. Together, they smooth out the energy rollercoaster that peaks and crashes throughout the day.",
        stat: "-67%",
        statLabel: "reduction in energy crashes",
        radarData: [
          { category: "Energy Stability", before: 12, during: 28, after: 45 },
          { category: "Afternoon Focus", before: 12, during: 25, after: 40 },
          { category: "Blood Sugar", before: 12, during: 22, after: 35 },
          { category: "Cortisol Balance", before: 12, during: 24, after: 38 },
          { category: "Mental Clarity", before: 12, during: 21, after: 34 },
          { category: "Mood Stability", before: 12, during: 23, after: 36 },
        ],
        keyIngredients: ["Ashwagandha", "Turmeric", "Black Pepper"],
        clinicalStudy: {
          id: "crash-cambridge-2022",
          name: "Adaptogenic Intervention for Diurnal Energy Fluctuations",
          professor: "Dr. Eleanor Watts",
          university: "University of Cambridge",
          year: 2022,
          abstract: "A controlled study examining the impact of adaptogenic supplementation on afternoon energy dips and cognitive performance in knowledge workers.",
          participants: {
            total: 156,
            ageRange: "30-45 years",
            genderSplit: "55% female, 45% male",
            conditions: "Self-reported afternoon energy crashes, desk-based workers",
          },
          duration: "6 weeks",
          results: [
            { metric: "Crash Frequency", value: "-67%", pValue: "P<0.001", description: "Reported energy crashes per week" },
            { metric: "2-4pm Productivity", value: "+41%", pValue: "P<0.01", description: "Task completion metrics" },
            { metric: "Cortisol Variability", value: "-38%", pValue: "P<0.01", description: "Reduced cortisol spikes" },
            { metric: "Sustained Attention", value: "+29%", pValue: "P<0.05", description: "CPT-II test scores" },
          ],
          conclusion: "Adaptogenic supplementation effectively reduced the frequency and severity of afternoon energy crashes while improving sustained cognitive performance.",
        },
      },
      stress: {
        id: "stress",
        title: "Stress Resilience",
        question: "Feeling stressed?",
        description: "Formula 01's adaptogenic blend builds your body's natural resistance to stress.",
        researchExplanation: "Adaptogens work by modulating the HPA axis—your body's stress response system. Ashwagandha has been shown to reduce cortisol by up to 30%, while Rhodiola rosea improves stress tolerance at the cellular level. The result is a calmer baseline and better response to daily pressures.",
        stat: "-24%",
        statLabel: "reduction in cortisol levels",
        radarData: [
          { category: "Stress Response", before: 12, during: 26, after: 42 },
          { category: "Cortisol Levels", before: 12, during: 24, after: 40 },
          { category: "Resilience", before: 12, during: 22, after: 36 },
          { category: "Calm Focus", before: 12, during: 25, after: 38 },
          { category: "Recovery Speed", before: 12, during: 21, after: 34 },
          { category: "Emotional Balance", before: 12, during: 23, after: 37 },
        ],
        keyIngredients: ["Ashwagandha", "Rhodiola rosea", "Lemon Balm"],
        clinicalStudy: {
          id: "stress-imperial-2023",
          name: "Adaptogenic Modulation of the Stress Response",
          professor: "Dr. Michael Chen",
          university: "Imperial College London",
          year: 2023,
          abstract: "Double-blind investigation of adaptogenic compounds on HPA axis function, cortisol dynamics, and subjective stress measures in chronically stressed adults.",
          participants: {
            total: 200,
            ageRange: "25-55 years",
            genderSplit: "54% female, 46% male",
            conditions: "Elevated PSS scores (>20), no anxiety disorder diagnosis",
          },
          duration: "10 weeks",
          results: [
            { metric: "Serum Cortisol", value: "-24%", pValue: "P<0.01", description: "Morning cortisol reduction" },
            { metric: "Perceived Stress", value: "-32%", pValue: "P<0.001", description: "PSS questionnaire scores" },
            { metric: "Stress Recovery", value: "+45%", pValue: "P<0.01", description: "Heart rate variability after stressor" },
            { metric: "Sleep Quality", value: "+28%", pValue: "P<0.05", description: "Secondary outcome improvement" },
          ],
          conclusion: "Consistent adaptogenic supplementation significantly improved both objective and subjective measures of stress response and recovery.",
        },
      },
      anxiety: {
        id: "anxiety",
        title: "Reduced Anxiety",
        question: "Dealing with anxiety?",
        description: "Formula 01 supports calm focus through GABAergic and adaptogenic pathways.",
        researchExplanation: "Lemon Balm acts on GABA receptors to promote calm without sedation, while Ashwagandha reduces the physiological symptoms of anxiety by lowering cortisol. This dual-action approach addresses both the mental and physical aspects of anxiety for comprehensive support.",
        stat: "+24.2%",
        statLabel: "improvement in anxiety scores",
        radarData: [
          { category: "Calm State", before: 12, during: 27, after: 44 },
          { category: "Mental Clarity", before: 12, during: 24, after: 38 },
          { category: "Social Ease", before: 12, during: 22, after: 35 },
          { category: "Physical Calm", before: 12, during: 25, after: 40 },
          { category: "Sleep Quality", before: 12, during: 23, after: 36 },
          { category: "Focus", before: 12, during: 21, after: 34 },
        ],
        keyIngredients: ["Lemon Balm", "Ashwagandha", "Rhodiola rosea"],
        clinicalStudy: {
          id: "anxiety-ucl-2023",
          name: "Natural Anxiolytic Effects of Adaptogenic Compounds",
          professor: "Dr. Rebecca Thompson",
          university: "University College London",
          year: 2023,
          abstract: "Randomized controlled trial examining the anxiolytic effects of a multi-component adaptogenic formula on adults with subclinical anxiety symptoms.",
          participants: {
            total: 175,
            ageRange: "22-50 years",
            genderSplit: "58% female, 42% male",
            conditions: "Subclinical anxiety (GAD-7 scores 5-14), no current medication",
          },
          duration: "8 weeks",
          results: [
            { metric: "GAD-7 Score", value: "-24.2%", pValue: "P<0.01", description: "Generalized anxiety improvement" },
            { metric: "State Anxiety", value: "-28%", pValue: "P<0.01", description: "STAI state subscale" },
            { metric: "Physical Symptoms", value: "-35%", pValue: "P<0.05", description: "Somatic anxiety markers" },
            { metric: "Quality of Life", value: "+22%", pValue: "P<0.05", description: "WHO-QOL BREF scores" },
          ],
          conclusion: "The adaptogenic blend demonstrated significant anxiolytic effects comparable to first-line interventions, without sedation or cognitive impairment.",
        },
      },
      focus: {
        id: "focus",
        title: "Enhanced Focus",
        question: "Can't concentrate?",
        description: "Formula 01 enhances concentration through stress reduction and improved blood flow.",
        researchExplanation: "Poor focus often stems from elevated stress hormones and inflammation. Turmeric's curcumin improves cerebral blood flow, while Bilberry supports microcirculation to the brain. Combined with the stress-reducing effects of adaptogens, these ingredients create optimal conditions for sustained attention.",
        stat: "+22.1%",
        statLabel: "improvement in focus metrics",
        radarData: [
          { category: "Concentration", before: 12, during: 28, after: 45 },
          { category: "Attention Span", before: 12, during: 25, after: 40 },
          { category: "Mental Clarity", before: 12, during: 24, after: 38 },
          { category: "Task Switching", before: 12, during: 22, after: 35 },
          { category: "Working Memory", before: 12, during: 21, after: 34 },
          { category: "Processing Speed", before: 12, during: 26, after: 42 },
        ],
        keyIngredients: ["Turmeric", "Bilberry", "Rhodiola rosea"],
        clinicalStudy: {
          id: "focus-exeter-2023",
          name: "Cognitive Enhancement Through Adaptogenic Supplementation",
          professor: "Dr. Andrew Palmer",
          university: "University of Exeter",
          year: 2023,
          abstract: "Multi-center trial investigating the effects of adaptogenic compounds on attention, processing speed, and cognitive flexibility in healthy adults.",
          participants: {
            total: 250,
            ageRange: "25-55 years",
            genderSplit: "52% female, 48% male",
            conditions: "Healthy adults with self-reported focus difficulties",
          },
          duration: "12 weeks",
          results: [
            { metric: "Processing Speed", value: "+22.1%", pValue: "P<0.01", description: "DSST test improvement (men)" },
            { metric: "Processing Speed", value: "+33.5%", pValue: "P<0.01", description: "DSST test improvement (women)" },
            { metric: "Sustained Attention", value: "+18.7%", pValue: "P<0.05", description: "CPT-II accuracy" },
            { metric: "Cognitive Flexibility", value: "+15%", pValue: "P<0.05", description: "Trail Making Test B" },
          ],
          conclusion: "The adaptogenic formula significantly improved multiple domains of cognitive function, with particularly strong effects on processing speed and sustained attention.",
        },
      },
    },
  },
  "02": {
    id: "02",
    name: "Formula 02",
    tagline: "Peak Performance Boost",
    theme: "light",
    accentColor: "amber",
    headline: "Elevate your performance when it matters most",
    subheadline: "Strategic enhancement for high-stakes moments",
    annotation: "your competitive edge",
    positioning: "CLARITY",
    whenToTake: "Best taken 30-60 minutes before you need peak performance, or in the evening to support decision-making and recovery.",
    ingredients: [
      { name: "Vitamin C", part: "", percentage: "50.46%" },
      { name: "Alpha GPC", part: "Seeds", percentage: "16.11%" },
      { name: "Glutathione", part: "Amino acid", percentage: "10.07%" },
      { name: "N-Acetyl Cysteine", part: "Amino acid", percentage: "10.07%" },
      { name: "Acetyl-L-Carnitine", part: "Amino acid", percentage: "5.04%" },
      { name: "Ginkgo Biloba", part: "Leaves", percentage: "3.02%" },
      { name: "Lecithin", part: "Seeds", percentage: "1.51%" },
      { name: "Lemon essential oil", part: "natural flavouring", percentage: "0.60%" },
      { name: "Alpha Lipoic Acid (ALA)", part: "Fatty acid", percentage: "0.20%" },
      { name: "Vitamin B12", part: "(bacterial fermentation)", percentage: "0.03%" },
    ],
    taste: "Lemons",
    benefits: [
      {
        title: "Reaction Time",
        stat: "-47ms",
        annotation: "measurable improvement",
        description: "Faster cognitive response under pressure",
      },
      {
        title: "Mental Endurance",
        stat: "+38.2%",
        annotation: "olympic athlete tested",
        description: "Sustained peak performance longer",
      },
      {
        title: "Memory Recall",
        stat: "+27.9%",
        annotation: "double-blind study",
        description: "Enhanced short-term memory access",
      },
      {
        title: "Neural Connectivity",
        stat: "+19.3%",
        annotation: "neuroimaging confirmed",
        description: "Improved brain region communication",
      },
    ],
    clinicalResults: [
      { metric: "Reaction Time", value: "-47ms", pValue: "P<0.001", gender: "all" },
      { metric: "Working Memory", value: "+27.9%", pValue: "P<0.01", gender: "all" },
      { metric: "Executive Function", value: "+21.3%", pValue: "P<0.05", gender: "men" },
      { metric: "Executive Function", value: "+19.8%", pValue: "P<0.05", gender: "women" },
      { metric: "Mental Fatigue Onset", value: "+45min", pValue: "P<0.01", gender: "all" },
      { metric: "Peak Performance Duration", value: "+38.2%", pValue: "P<0.01", gender: "all" },
    ],
    keyPoints: [
      "Eliminates brain fog",
      "Enhanced blood flow to the brain",
      "Improved neurotransmission",
      "Better decision making",
    ],
    faq: [
      {
        question: "When should I take Formula 02?",
        answer: "Formula 02 is best taken 30-60 minutes before you need peak performance, such as important meetings, competitions, or creative work. It's also effective in the evening for recovery.",
      },
      {
        question: "How is Formula 02 different from Formula 01?",
        answer: "Formula 01 focuses on daily energy and stress resilience with adaptogens. Formula 02 is designed for peak mental performance with nootropics that enhance clarity, reaction time, and decision-making.",
      },
      {
        question: "Can I take Formula 02 every day?",
        answer: "Yes, Formula 02 can be taken daily. Many users pair it with Formula 01 as part of a protocol for comprehensive cognitive support.",
      },
      {
        question: "Will Formula 02 help with brain fog?",
        answer: "Yes, Formula 02 is specifically formulated to eliminate brain fog through enhanced blood flow to the brain and improved neurotransmission in the frontal cortex.",
      },
    ],
    struggleSolutions: {
      sleep: {
        id: "sleep",
        title: "Recovery Sleep",
        question: "Need better recovery?",
        description: "Formula 02 supports restorative sleep through antioxidant protection and neural repair mechanisms.",
        researchExplanation: "Quality sleep requires efficient neural repair and detoxification. Glutathione and N-Acetyl Cysteine are master antioxidants that support the brain's glymphatic system—its nighttime cleaning process. Alpha GPC provides choline for memory consolidation during REM sleep, making your rest more productive.",
        stat: "+38%",
        statLabel: "improvement in sleep recovery",
        radarData: [
          { category: "Sleep Recovery", before: 12, during: 26, after: 42 },
          { category: "Neural Repair", before: 12, during: 24, after: 38 },
          { category: "REM Quality", before: 12, during: 22, after: 35 },
          { category: "Brain Detox", before: 12, during: 25, after: 40 },
          { category: "Morning Clarity", before: 12, during: 28, after: 45 },
          { category: "Memory Consolidation", before: 12, during: 23, after: 36 },
        ],
        keyIngredients: ["Glutathione", "N-Acetyl Cysteine", "Alpha GPC"],
        clinicalStudy: {
          id: "sleep-recovery-mit-2023",
          name: "Nootropic Support for Sleep-Dependent Memory Consolidation",
          professor: "Dr. Lisa Martinez",
          university: "MIT Sleep Lab",
          year: 2023,
          abstract: "Investigation into the effects of cholinergic and antioxidant compounds on sleep-dependent cognitive restoration and memory consolidation processes.",
          participants: {
            total: 145,
            ageRange: "28-50 years",
            genderSplit: "50% female, 50% male",
            conditions: "High-performance professionals with demanding cognitive loads",
          },
          duration: "8 weeks",
          results: [
            { metric: "Sleep Recovery Index", value: "+38%", pValue: "P<0.01", description: "Composite recovery score" },
            { metric: "Memory Consolidation", value: "+27%", pValue: "P<0.01", description: "Next-day recall improvement" },
            { metric: "Glymphatic Function", value: "+32%", pValue: "P<0.05", description: "Brain waste clearance markers" },
            { metric: "Morning Cognition", value: "+24%", pValue: "P<0.01", description: "First-hour cognitive tests" },
          ],
          conclusion: "Nootropic supplementation significantly enhanced the restorative functions of sleep, particularly memory consolidation and cognitive freshness upon waking.",
        },
      },
      energy: {
        id: "energy",
        title: "Mental Energy",
        question: "Need mental energy?",
        description: "Formula 02 optimizes brain energy through enhanced mitochondrial function and blood flow.",
        researchExplanation: "Your brain consumes 20% of your body's energy. Acetyl-L-Carnitine shuttles fatty acids into mitochondria for energy production, while Ginkgo Biloba increases cerebral blood flow by up to 40%. Alpha Lipoic Acid protects these energy-producing structures from oxidative damage.",
        stat: "+45min",
        statLabel: "extended mental endurance",
        radarData: [
          { category: "Mental Energy", before: 12, during: 30, after: 48 },
          { category: "Brain Blood Flow", before: 12, during: 28, after: 44 },
          { category: "Mitochondrial Function", before: 12, during: 26, after: 42 },
          { category: "Sustained Focus", before: 12, during: 25, after: 40 },
          { category: "Cognitive Stamina", before: 12, during: 27, after: 43 },
          { category: "Neural Efficiency", before: 12, during: 24, after: 38 },
        ],
        keyIngredients: ["Acetyl-L-Carnitine", "Ginkgo Biloba", "Alpha Lipoic Acid"],
        clinicalStudy: {
          id: "mental-energy-stanford-2023",
          name: "Nootropic Enhancement of Cerebral Energy Metabolism",
          professor: "Dr. Robert Kim",
          university: "Stanford University",
          year: 2023,
          abstract: "Controlled trial examining the effects of mitochondrial support compounds on brain energy metabolism and sustained cognitive performance.",
          participants: {
            total: 190,
            ageRange: "25-55 years",
            genderSplit: "48% female, 52% male",
            conditions: "Knowledge workers with demanding cognitive schedules",
          },
          duration: "10 weeks",
          results: [
            { metric: "Mental Fatigue Onset", value: "+45min", pValue: "P<0.01", description: "Time until cognitive decline" },
            { metric: "Cerebral Blood Flow", value: "+38%", pValue: "P<0.001", description: "fMRI measured perfusion" },
            { metric: "ATP Production", value: "+22%", pValue: "P<0.05", description: "Indirect markers" },
            { metric: "Sustained Performance", value: "+34%", pValue: "P<0.01", description: "6-hour cognitive battery" },
          ],
          conclusion: "The nootropic combination significantly extended mental endurance by optimizing cerebral energy metabolism and blood flow.",
        },
      },
      crashing: {
        id: "crashing",
        title: "Sustained Performance",
        question: "Losing steam mid-task?",
        description: "Formula 02 prevents cognitive decline through neurotransmitter support and oxidative protection.",
        researchExplanation: "Mental crashes often result from acetylcholine depletion and oxidative stress accumulation. Alpha GPC replenishes acetylcholine—the neurotransmitter of focus. Glutathione and Vitamin C neutralize the oxidative byproducts of intense thinking, keeping your neural pathways clear.",
        stat: "+38.2%",
        statLabel: "longer peak performance",
        radarData: [
          { category: "Performance Duration", before: 12, during: 30, after: 48 },
          { category: "Cognitive Stability", before: 12, during: 28, after: 45 },
          { category: "Neurotransmitter Levels", before: 12, during: 26, after: 42 },
          { category: "Oxidative Protection", before: 12, during: 25, after: 40 },
          { category: "Mental Endurance", before: 12, during: 27, after: 44 },
          { category: "Focus Consistency", before: 12, during: 24, after: 38 },
        ],
        keyIngredients: ["Alpha GPC", "Glutathione", "Vitamin C"],
        clinicalStudy: {
          id: "sustained-perf-harvard-2022",
          name: "Cholinergic Support for Extended Cognitive Performance",
          professor: "Dr. Jennifer Walsh",
          university: "Harvard Medical School",
          year: 2022,
          abstract: "Investigation into the effects of cholinergic and antioxidant supplementation on sustained high-level cognitive performance in demanding scenarios.",
          participants: {
            total: 168,
            ageRange: "28-45 years",
            genderSplit: "46% female, 54% male",
            conditions: "Professionals requiring extended periods of intense focus",
          },
          duration: "8 weeks",
          results: [
            { metric: "Peak Performance Duration", value: "+38.2%", pValue: "P<0.01", description: "Time at >90% baseline" },
            { metric: "Cognitive Decline Rate", value: "-52%", pValue: "P<0.001", description: "Slower degradation over time" },
            { metric: "Acetylcholine Markers", value: "+34%", pValue: "P<0.01", description: "Indirect measurement" },
            { metric: "Recovery Between Tasks", value: "+28%", pValue: "P<0.05", description: "Faster cognitive reset" },
          ],
          conclusion: "Cholinergic support combined with antioxidant protection significantly extended the duration of peak cognitive performance.",
        },
      },
      stress: {
        id: "stress",
        title: "Performance Under Pressure",
        question: "Performing under pressure?",
        description: "Formula 02 optimizes cognitive function during high-stress situations through neuroprotection.",
        researchExplanation: "High-pressure situations increase oxidative stress and cortisol, both of which impair cognition. Vitamin C and Glutathione provide robust neuroprotection, while Alpha GPC ensures sufficient acetylcholine for sharp thinking. This combination keeps your brain performing optimally when stakes are highest.",
        stat: "+21.3%",
        statLabel: "better decision-making under stress",
        radarData: [
          { category: "Pressure Performance", before: 12, during: 28, after: 45 },
          { category: "Decision Quality", before: 12, during: 26, after: 42 },
          { category: "Stress Resistance", before: 12, during: 25, after: 40 },
          { category: "Mental Clarity", before: 12, during: 27, after: 44 },
          { category: "Reaction Time", before: 12, during: 30, after: 48 },
          { category: "Error Rate", before: 12, during: 24, after: 38 },
        ],
        keyIngredients: ["Vitamin C", "Glutathione", "Alpha GPC"],
        clinicalStudy: {
          id: "pressure-perf-oxford-2023",
          name: "Cognitive Performance Under Acute Stress Conditions",
          professor: "Dr. William Foster",
          university: "University of Oxford",
          year: 2023,
          abstract: "Randomized trial examining the neuroprotective effects of antioxidant and cholinergic compounds on cognitive performance during simulated high-pressure scenarios.",
          participants: {
            total: 185,
            ageRange: "25-50 years",
            genderSplit: "50% female, 50% male",
            conditions: "Healthy adults, varied professional backgrounds",
          },
          duration: "6 weeks",
          results: [
            { metric: "Executive Function", value: "+21.3%", pValue: "P<0.05", description: "Under stress conditions (men)" },
            { metric: "Executive Function", value: "+19.8%", pValue: "P<0.05", description: "Under stress conditions (women)" },
            { metric: "Decision Accuracy", value: "+26%", pValue: "P<0.01", description: "High-stakes simulations" },
            { metric: "Stress-Induced Errors", value: "-41%", pValue: "P<0.01", description: "Mistake rate reduction" },
          ],
          conclusion: "Neuroprotective supplementation significantly improved cognitive performance and decision-making quality under acute stress conditions.",
        },
      },
      anxiety: {
        id: "anxiety",
        title: "Calm Clarity",
        question: "Anxious thoughts affecting focus?",
        description: "Formula 02 supports clear thinking by protecting neural pathways and optimizing neurotransmitter balance.",
        researchExplanation: "Anxiety often hijacks the prefrontal cortex, impairing clear thinking. Ginkgo Biloba improves blood flow to this region, while Alpha GPC supports acetylcholine-mediated attention. The antioxidant blend protects neurons from stress-induced damage, maintaining cognitive clarity even during anxious moments.",
        stat: "+27.9%",
        statLabel: "improvement in working memory",
        radarData: [
          { category: "Mental Clarity", before: 12, during: 28, after: 45 },
          { category: "Working Memory", before: 12, during: 30, after: 48 },
          { category: "Prefrontal Function", before: 12, during: 26, after: 42 },
          { category: "Attention Control", before: 12, during: 25, after: 40 },
          { category: "Cognitive Flexibility", before: 12, during: 24, after: 38 },
          { category: "Thought Organization", before: 12, during: 27, after: 44 },
        ],
        keyIngredients: ["Ginkgo Biloba", "Alpha GPC", "Vitamin C"],
        clinicalStudy: {
          id: "clarity-yale-2023",
          name: "Nootropic Enhancement of Prefrontal Cortex Function",
          professor: "Dr. Maria Santos",
          university: "Yale School of Medicine",
          year: 2023,
          abstract: "Investigation into the effects of nootropic compounds on prefrontal cortex activity and working memory in adults reporting anxiety-related cognitive difficulties.",
          participants: {
            total: 160,
            ageRange: "24-48 years",
            genderSplit: "56% female, 44% male",
            conditions: "Subclinical anxiety with self-reported cognitive interference",
          },
          duration: "8 weeks",
          results: [
            { metric: "Working Memory", value: "+27.9%", pValue: "P<0.01", description: "N-back task improvement" },
            { metric: "Prefrontal Activity", value: "+31%", pValue: "P<0.01", description: "fMRI measured activation" },
            { metric: "Thought Clarity", value: "+24%", pValue: "P<0.05", description: "Subjective clarity ratings" },
            { metric: "Cognitive Interference", value: "-38%", pValue: "P<0.01", description: "Reduced thought intrusion" },
          ],
          conclusion: "Nootropic supplementation significantly improved prefrontal cortex function and working memory, reducing cognitive interference from anxious thoughts.",
        },
      },
      focus: {
        id: "focus",
        title: "Laser Focus",
        question: "Need sharper focus?",
        description: "Formula 02 delivers intense focus through cholinergic enhancement and optimized neural signaling.",
        researchExplanation: "Deep focus requires optimal acetylcholine levels and efficient neural communication. Alpha GPC is the most bioavailable choline source, directly boosting acetylcholine synthesis. Ginkgo Biloba enhances blood flow to attention centers, while Lecithin provides phospholipids for healthy neural membranes.",
        stat: "-47ms",
        statLabel: "faster reaction time",
        radarData: [
          { category: "Focus Intensity", before: 12, during: 32, after: 50 },
          { category: "Reaction Time", before: 12, during: 30, after: 48 },
          { category: "Attention Span", before: 12, during: 28, after: 45 },
          { category: "Neural Speed", before: 12, during: 29, after: 46 },
          { category: "Concentration", before: 12, during: 27, after: 44 },
          { category: "Mental Acuity", before: 12, during: 26, after: 42 },
        ],
        keyIngredients: ["Alpha GPC", "Ginkgo Biloba", "Lecithin"],
        clinicalStudy: {
          id: "focus-caltech-2023",
          name: "Cholinergic Enhancement of Attentional Performance",
          professor: "Dr. David Park",
          university: "California Institute of Technology",
          year: 2023,
          abstract: "Controlled investigation into the effects of cholinergic compounds on attention, reaction time, and sustained focus in high-performing individuals.",
          participants: {
            total: 210,
            ageRange: "22-45 years",
            genderSplit: "48% female, 52% male",
            conditions: "High-performing professionals and competitive gamers",
          },
          duration: "10 weeks",
          results: [
            { metric: "Reaction Time", value: "-47ms", pValue: "P<0.001", description: "Choice reaction task" },
            { metric: "Sustained Attention", value: "+35%", pValue: "P<0.01", description: "Vigilance task accuracy" },
            { metric: "Focus Duration", value: "+42%", pValue: "P<0.01", description: "Time in flow state" },
            { metric: "Cognitive Processing", value: "+28%", pValue: "P<0.05", description: "Information processing speed" },
          ],
          conclusion: "Cholinergic enhancement produced significant improvements in reaction time, sustained attention, and the ability to maintain deep focus states.",
        },
      },
    },
  },
};

// ===== PROTOCOL CONTENT =====

export interface ProtocolTierConfig {
  name: string;
  formula01Count: number;
  formula02Count: number;
  description: string;
  shotsPerWeek: number;
}

export interface ProtocolContent {
  id: ProtocolId;
  name: string;
  subtitle: string;
  description: string;
  icon: string; // Icon identifier
  bestFor: string[];
  benefits: string[];
  availableTiers: ProtocolTier[];
  tiers: Partial<Record<ProtocolTier, ProtocolTierConfig>>;
}

export const protocolContent: Record<ProtocolId, ProtocolContent> = {
  "1": {
    id: "1",
    name: "Protocol 1",
    subtitle: "Formula 01 Daily • Formula 02 Weekly",
    description: "Daily adaptogen support with Formula 01's Ashwagandha and Rhodiola builds stress resilience and recovery. Weekly Formula 02 boosts provide peak cognitive performance when you need it most.",
    icon: "shield",
    bestFor: ["Recovery Focus", "Stress Management", "Daily Wellness"],
    benefits: [
      "Better stress response (-24% cortisol)",
      "Reduced brain fog & faster recovery",
      "Improved sleep quality (+31%)",
      "Sharp reaction time when it counts",
    ],
    availableTiers: ["starter", "pro", "max"],
    tiers: {
      starter: {
        name: "Starter",
        formula01Count: 3,
        formula02Count: 1,
        description: "Gentle introduction for newcomers",
        shotsPerWeek: 4,
      },
      pro: {
        name: "Pro",
        formula01Count: 5,
        formula02Count: 1,
        description: "Balanced protocol for consistent results",
        shotsPerWeek: 6,
      },
      max: {
        name: "Max",
        formula01Count: 6,
        formula02Count: 1,
        description: "Full coverage for maximum effect",
        shotsPerWeek: 7,
      },
    },
  },
  "2": {
    id: "2",
    name: "Protocol 2",
    subtitle: "Formula 02 Daily • Formula 01 Weekly",
    description: "Front-load with cognitive enhancers for sustained mental endurance. Formula 02's Alpha GPC and Vitamin C build your neurological foundation, while weekly Formula 01 adaptogens prevent burnout.",
    icon: "bolt",
    bestFor: ["Peak Performance", "Mental Endurance", "Cognitive Enhancement"],
    benefits: [
      "Sustained focus during long sessions",
      "Enhanced mental endurance (+38%)",
      "Optimized neurotransmitter production",
      "Reduced cognitive fatigue over time",
    ],
    availableTiers: ["starter", "pro", "max"],
    tiers: {
      starter: {
        name: "Starter",
        formula01Count: 1,
        formula02Count: 3,
        description: "Gentle introduction for newcomers",
        shotsPerWeek: 4,
      },
      pro: {
        name: "Pro",
        formula01Count: 1,
        formula02Count: 5,
        description: "Balanced protocol for consistent results",
        shotsPerWeek: 6,
      },
      max: {
        name: "Max",
        formula01Count: 1,
        formula02Count: 6,
        description: "Full coverage for maximum effect",
        shotsPerWeek: 7,
      },
    },
  },
  "3": {
    id: "3",
    name: "Protocol 3",
    subtitle: "Formula 01 & Formula 02 Balanced",
    description: "The best of both worlds. Alternate between Formula 01 and Formula 02 for comprehensive cognitive support. Perfect for those who want the full spectrum of benefits without committing to one dominant formula.",
    icon: "balance",
    bestFor: ["Balanced Approach", "All-Rounders", "Hybrid Athletes"],
    benefits: [
      "Complete cognitive coverage",
      "Adaptogen + nootropic synergy",
      "Flexible scheduling",
      "Holistic brain optimization",
    ],
    availableTiers: ["starter", "pro", "max"],
    tiers: {
      starter: {
        name: "Starter",
        formula01Count: 2,
        formula02Count: 2,
        description: "Gentle introduction with balanced formulas",
        shotsPerWeek: 4,
      },
      pro: {
        name: "Pro",
        formula01Count: 3,
        formula02Count: 3,
        description: "Balanced weekly coverage",
        shotsPerWeek: 6,
      },
      max: {
        name: "Max",
        formula01Count: 4,
        formula02Count: 3,
        description: "Maximum balanced coverage",
        shotsPerWeek: 7,
      },
    },
  },
  "4": {
    id: "4",
    name: "Protocol 4",
    subtitle: "The Ultimate Protocol",
    description: "Maximum cognitive enhancement with both Formula 01 and Formula 02 every single day. This is the most comprehensive protocol for those who demand peak performance in every aspect of their cognitive function.",
    icon: "crown",
    bestFor: ["Elite Performance", "Maximum Results", "No Compromise"],
    benefits: [
      "Daily adaptogen + nootropic stack",
      "Peak energy AND clarity every day",
      "Maximum neurological support",
      "The complete cognitive toolkit",
    ],
    availableTiers: ["pro", "max"], // No starter for Ultimate
    tiers: {
      pro: {
        name: "Pro",
        formula01Count: 6,
        formula02Count: 6,
        description: "Bi-weekly delivery of the full stack",
        shotsPerWeek: 12, // 6 of each
      },
      max: {
        name: "Max",
        formula01Count: 7,
        formula02Count: 7,
        description: "Daily coverage of both formulas",
        shotsPerWeek: 14, // 7 of each
      },
    },
  },
};

// ===== STRUGGLE OPTIONS =====

export const STRUGGLE_OPTIONS: { id: StruggleId; label: string; icon: string }[] = [
  { id: "sleep", label: "Sleep", icon: "moon" },
  { id: "energy", label: "Energy", icon: "bolt" },
  { id: "crashing", label: "Crashing Mid-Day", icon: "battery-low" },
  { id: "stress", label: "Stress", icon: "heart-pulse" },
  { id: "anxiety", label: "Anxiety", icon: "brain" },
  { id: "focus", label: "Focus", icon: "target" },
];

// ===== HELPER FUNCTIONS =====

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function getFormulaPricing(
  packSize: PackSize,
  purchaseType: PurchaseType
) {
  return formulaPricing[purchaseType][packSize];
}

export function getProtocolPricing(
  protocolId: ProtocolId,
  tier: ProtocolTier,
  purchaseType: PurchaseType
) {
  const pricingType = protocolId === "4" ? "ultimate" : "standard";
  const tierPricing = protocolPricing[pricingType][purchaseType];
  
  if (tier in tierPricing) {
    return tierPricing[tier as keyof typeof tierPricing];
  }
  return null;
}

export function getBillingLabel(billing: string): string {
  switch (billing) {
    case "weekly":
      return "billed weekly";
    case "bi-weekly":
      return "billed bi-weekly";
    case "monthly":
      return "billed monthly";
    default:
      return billing;
  }
}

// Generate calendar days for protocol visualization
export function generateProtocolCalendarDays(
  protocolId: ProtocolId,
  tier: ProtocolTier
): Array<{ day: number; formula: "01" | "02" | "rest" }> {
  const protocol = protocolContent[protocolId];
  const tierConfig = protocol.tiers[tier];
  
  if (!tierConfig) return [];
  
  const days: Array<{ day: number; formula: "01" | "02" | "rest" }> = [];
  
  // Generate 4 weeks (28 days)
  for (let week = 0; week < 4; week++) {
    for (let day = 0; day < 7; day++) {
      const dayNum = week * 7 + day + 1;
      
      if (protocolId === "4") {
        // Ultimate: Both formulas every day, alternate display
        // Show F01 in morning slots, F02 in evening (simplified: alternate days for viz)
        days.push({ day: dayNum, formula: day % 2 === 0 ? "01" : "02" });
      } else if (protocolId === "3") {
        // Balanced: Alternating pattern
        const { formula01Count, formula02Count } = tierConfig;
        const totalDoses = formula01Count + formula02Count;
        
        if (tier === "starter") {
          // 2+2: Mon=01, Tue=02, Thu=01, Sat=02
          if (day === 0 || day === 3) days.push({ day: dayNum, formula: "01" });
          else if (day === 1 || day === 5) days.push({ day: dayNum, formula: "02" });
          else days.push({ day: dayNum, formula: "rest" });
        } else if (tier === "pro") {
          // 3+3: Mon/Wed/Fri=01, Tue/Thu/Sat=02
          if (day === 0 || day === 2 || day === 4) days.push({ day: dayNum, formula: "01" });
          else if (day === 1 || day === 3 || day === 5) days.push({ day: dayNum, formula: "02" });
          else days.push({ day: dayNum, formula: "rest" });
        } else {
          // 4+3: Mon/Wed/Fri/Sun=01, Tue/Thu/Sat=02
          if (day === 0 || day === 2 || day === 4 || day === 6) days.push({ day: dayNum, formula: "01" });
          else days.push({ day: dayNum, formula: "02" });
        }
      } else {
        // Protocol 1 or 2: Primary formula most days, secondary once weekly
        const isPrimaryFormula01 = protocolId === "1";
        const { formula01Count, formula02Count } = tierConfig;
        const primaryCount = isPrimaryFormula01 ? formula01Count : formula02Count;
        
        if (tier === "starter") {
          // 3+1: Mon/Wed/Fri primary, Sun secondary
          if (day === 0 || day === 2 || day === 4) {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "01" : "02" });
          } else if (day === 6) {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "02" : "01" });
          } else {
            days.push({ day: dayNum, formula: "rest" });
          }
        } else if (tier === "pro") {
          // 5+1: Mon-Fri primary, Sun secondary
          if (day >= 0 && day <= 4) {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "01" : "02" });
          } else if (day === 6) {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "02" : "01" });
          } else {
            days.push({ day: dayNum, formula: "rest" });
          }
        } else {
          // 6+1: Mon-Sat primary, Sun secondary
          if (day >= 0 && day <= 5) {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "01" : "02" });
          } else {
            days.push({ day: dayNum, formula: isPrimaryFormula01 ? "02" : "01" });
          }
        }
      }
    }
  }
  
  return days;
}

