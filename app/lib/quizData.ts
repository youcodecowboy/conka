// ===== QUIZ DATA =====

// Extended answer values to support various question formats
export type AnswerValue =
  // Yes/No/Sometimes (original)
  | "yes"
  | "no"
  | "sometimes"
  // Training frequency
  | "4plus"
  | "1to3"
  | "rarely"
  // Athlete type
  | "endurance"
  | "strength"
  | "combat"
  | "cognitive"
  | "not-athletic"
  // Frequency variations
  | "occasionally"
  // Memory scale
  | "poor"
  | "average"
  | "excellent"
  // Supplement usage
  | "multiple"
  | "basics"
  | "none"
  // Cognitive demand
  | "extreme"
  | "moderate"
  | "light"
  // Primary goals
  | "resilience"
  | "clarity"
  | "balance"
  | "maximum";

export type ProtocolKey = "protocol1" | "protocol2" | "protocol3" | "protocol4";

// Icon types for quiz options
export type QuizIcon =
  | "check"
  | "x"
  | "tilde"
  | "dumbbell"
  | "run"
  | "boxing"
  | "brain"
  | "user"
  | "shield"
  | "bolt"
  | "scale"
  | "crown"
  | "pill"
  | "sparkles"
  | "zap";

export interface QuizOption {
  label: string;
  value: AnswerValue;
  icon: QuizIcon;
  scores: Partial<Record<ProtocolKey, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  measures: string; // Used in breakdown to explain what this question measures
  options: QuizOption[];
}

export interface QuestionBreakdown {
  questionId: string;
  questionText: string;
  measures: string;
  userAnswer: string;
  pointsAwarded: number;
  maxPoints: number;
}

export interface QuizResult {
  protocolId: ProtocolKey;
  protocolNumber: string; // "1", "2", "3", "4"
  percentage: number;
  totalPoints: number;
  maxPossiblePoints: number;
  questionBreakdown: QuestionBreakdown[];
}

export interface ProtocolMatchInfo {
  id: ProtocolKey;
  protocolNumber: string;
  name: string;
  subtitle: string;
  bestForSummary: string;
  keyBenefits: string[];
  icon: "shield" | "bolt" | "balance" | "crown";
}

// ===== PROTOCOL MATCH DESCRIPTIONS =====

export const protocolMatchInfo: Record<ProtocolKey, ProtocolMatchInfo> = {
  protocol1: {
    id: "protocol1",
    protocolNumber: "1",
    name: "Resilience Protocol",
    subtitle: "Build Resilience, Stay Sharp",
    bestForSummary:
      "Resilience Protocol is perfect for people who need consistent daily energy, struggle with stress management, and want better recovery. The adaptogen-focused approach with CONKA Flow builds your foundation while strategic CONKA Clarity boosts keep you sharp when it matters most.",
    keyBenefits: [
      "Daily stress resilience (-56% stress scores, PMID: 23439798)",
      "Improved sleep quality (+42%, PMID: 32021735)",
      "Reduced cortisol levels (-28%, PMID: 23439798)",
      "Weekly cognitive boost for peak performance",
    ],
    icon: "shield",
  },
  protocol2: {
    id: "protocol2",
    protocolNumber: "2",
    name: "Precision Protocol",
    subtitle: "Peak Cognition, Zero Burnout",
    bestForSummary:
      "Precision Protocol is ideal for those who need sustained mental clarity, experience brain fog, or have demanding cognitive work. The nootropic-heavy approach with CONKA Clarity enhances focus and reaction time, while weekly CONKA Flow prevents burnout.",
    keyBenefits: [
      "Enhanced memory & attention (+63%, PMID: 29246725)",
      "Increased cerebral blood flow (+57%, PMID: 21802920)",
      "Reduced mental fatigue (-30%, PMID: 17658628)",
      "Burnout prevention through adaptogens",
    ],
    icon: "bolt",
  },
  protocol3: {
    id: "protocol3",
    protocolNumber: "3",
    name: "Balance Protocol",
    subtitle: "The Best of Both Worlds",
    bestForSummary:
      "Balance Protocol is designed for all-rounders who want comprehensive cognitive support without committing to one dominant formula. Perfect for those with varied daily demands who need both energy resilience and mental sharpness throughout the week.",
    keyBenefits: [
      "Complete cognitive coverage (both formulas)",
      "Stress resilience + mental clarity synergy",
      "Flexible scheduling for varied needs",
      "Holistic brain optimization",
    ],
    icon: "balance",
  },
  protocol4: {
    id: "protocol4",
    protocolNumber: "4",
    name: "Ultimate Protocol",
    subtitle: "Maximum Power, Every Day",
    bestForSummary:
      "Ultimate Protocol is the ultimate choice for high performers who demand peak cognitive function every single day. With both CONKA Flow and CONKA Clarity daily, you get maximum adaptogenic support and nootropic enhancement for uncompromising performance.",
    keyBenefits: [
      "Daily adaptogen + nootropic stack",
      "Stress resilience (-56%) + memory boost (+63%)",
      "Maximum neurological support",
      "The complete cognitive toolkit",
    ],
    icon: "crown",
  },
};

// ===== QUIZ QUESTIONS =====

export const quizQuestions: QuizQuestion[] = [
  {
    id: "brain-fog",
    question: "Do you experience brain fog throughout the day?",
    subtitle:
      "Difficulty concentrating, mental cloudiness, or feeling mentally sluggish",
    measures: "mental clarity needs",
    options: [
      {
        label: "Yes",
        value: "yes",
        icon: "check",
        scores: { protocol2: 3, protocol3: 1, protocol4: 2 },
      },
      {
        label: "Sometimes",
        value: "sometimes",
        icon: "tilde",
        scores: { protocol2: 2, protocol3: 2, protocol1: 1 },
      },
      {
        label: "No",
        value: "no",
        icon: "x",
        scores: { protocol1: 2, protocol3: 1 },
      },
    ],
  },
  {
    id: "afternoon-crash",
    question: "Do you have a mid-afternoon energy crash?",
    subtitle: "That 2-4pm slump where productivity drops",
    measures: "energy consistency",
    options: [
      {
        label: "Yes",
        value: "yes",
        icon: "check",
        scores: { protocol1: 3, protocol3: 2, protocol4: 2 },
      },
      {
        label: "Sometimes",
        value: "sometimes",
        icon: "tilde",
        scores: { protocol1: 2, protocol3: 2, protocol2: 1 },
      },
      {
        label: "No",
        value: "no",
        icon: "x",
        scores: { protocol2: 2, protocol3: 1 },
      },
    ],
  },
  {
    id: "sleep-difficulty",
    question: "Do you have difficulties falling asleep at night?",
    subtitle: "Taking more than 20 minutes to fall asleep, or restless nights",
    measures: "sleep quality",
    options: [
      {
        label: "Yes",
        value: "yes",
        icon: "check",
        scores: { protocol1: 3, protocol3: 1, protocol4: 1 },
      },
      {
        label: "Sometimes",
        value: "sometimes",
        icon: "tilde",
        scores: { protocol1: 2, protocol3: 2 },
      },
      {
        label: "No",
        value: "no",
        icon: "x",
        scores: { protocol2: 2, protocol4: 1 },
      },
    ],
  },
  // Question 4: Training Intensity
  {
    id: "training-intensity",
    question: "How many times per week do you train intensely?",
    subtitle:
      "Intense = 60+ minutes of resistance, endurance, or combat training",
    measures: "physical recovery demands",
    options: [
      {
        label: "4+ times/week",
        value: "4plus",
        icon: "dumbbell",
        scores: { protocol4: 3, protocol1: 2 },
      },
      {
        label: "1-3 times/week",
        value: "1to3",
        icon: "run",
        scores: { protocol3: 2, protocol1: 1 },
      },
      {
        label: "Rarely or never",
        value: "rarely",
        icon: "user",
        scores: { protocol2: 2, protocol3: 1 },
      },
    ],
  },
  // Question 5: Athlete Type
  {
    id: "athlete-type",
    question: "What best describes your primary athletic focus?",
    subtitle: "Select the closest match to your training style",
    measures: "performance profile",
    options: [
      {
        label: "Endurance (running, cycling, swimming)",
        value: "endurance",
        icon: "run",
        scores: { protocol1: 2, protocol4: 2 },
      },
      {
        label: "Strength/Power (lifting, CrossFit)",
        value: "strength",
        icon: "dumbbell",
        scores: { protocol1: 2, protocol3: 1 },
      },
      {
        label: "Combat/Contact (MMA, rugby, boxing)",
        value: "combat",
        icon: "boxing",
        scores: { protocol2: 3, protocol4: 2 },
      },
      {
        label: "Cognitive Athlete (chess, esports, poker)",
        value: "cognitive",
        icon: "brain",
        scores: { protocol2: 3, protocol3: 1 },
      },
      {
        label: "Not particularly athletic",
        value: "not-athletic",
        icon: "user",
        scores: { protocol3: 2, protocol2: 1 },
      },
    ],
  },
  // Question 6: Head Impact Exposure
  {
    id: "head-impacts",
    question: "Do you regularly experience head impacts or collisions?",
    subtitle: "Headers in football, contact sports, or occupational hazards",
    measures: "neuroprotection needs",
    options: [
      {
        label: "Yes, regularly",
        value: "yes",
        icon: "check",
        scores: { protocol2: 3, protocol4: 3 },
      },
      {
        label: "Occasionally",
        value: "occasionally",
        icon: "tilde",
        scores: { protocol2: 2, protocol3: 2 },
      },
      {
        label: "No",
        value: "no",
        icon: "x",
        scores: { protocol1: 2, protocol3: 1 },
      },
    ],
  },
  // Question 7: Memory Self-Assessment
  {
    id: "memory-rating",
    question: "How would you rate your memory?",
    subtitle: "Consider both short-term recall and long-term memory",
    measures: "cognitive baseline",
    options: [
      {
        label: "Poor (1-4 out of 10)",
        value: "poor",
        icon: "x",
        scores: { protocol2: 3, protocol4: 2 },
      },
      {
        label: "Average (5-7 out of 10)",
        value: "average",
        icon: "tilde",
        scores: { protocol3: 2, protocol1: 1 },
      },
      {
        label: "Excellent (8-10 out of 10)",
        value: "excellent",
        icon: "check",
        scores: { protocol1: 2, protocol3: 1 },
      },
    ],
  },
  // Question 8: Current Supplement Usage
  {
    id: "supplement-usage",
    question: "Are you currently taking any cognitive or wellness supplements?",
    subtitle: "Vitamins, nootropics, adaptogens, or similar",
    measures: "supplementation baseline",
    options: [
      {
        label: "Yes, multiple supplements",
        value: "multiple",
        icon: "pill",
        scores: { protocol4: 2, protocol3: 2 },
      },
      {
        label: "One or two basics",
        value: "basics",
        icon: "tilde",
        scores: { protocol3: 2, protocol1: 1 },
      },
      {
        label: "No supplements currently",
        value: "none",
        icon: "x",
        scores: { protocol1: 2, protocol2: 1 },
      },
    ],
  },
  // Question 9: Daily Cognitive Demand
  {
    id: "cognitive-demand",
    question: "How cognitively demanding is your typical day?",
    subtitle:
      "Consider decision-making, problem-solving, and mental focus requirements",
    measures: "cognitive workload",
    options: [
      {
        label: "Extremely demanding (executive, surgeon, trader)",
        value: "extreme",
        icon: "zap",
        scores: { protocol4: 3, protocol2: 2 },
      },
      {
        label: "Moderately demanding (professional, creative)",
        value: "moderate",
        icon: "sparkles",
        scores: { protocol3: 2, protocol2: 2 },
      },
      {
        label: "Light to moderate (routine work, retired)",
        value: "light",
        icon: "user",
        scores: { protocol1: 2, protocol3: 1 },
      },
    ],
  },
  // Question 10: Primary Goal
  {
    id: "primary-goal",
    question: "What's your #1 goal with CONKA?",
    subtitle: "Select what matters most to you right now",
    measures: "user intent",
    options: [
      {
        label: "Stress resilience and better recovery",
        value: "resilience",
        icon: "shield",
        scores: { protocol1: 3 },
      },
      {
        label: "Sharper focus and mental clarity",
        value: "clarity",
        icon: "bolt",
        scores: { protocol2: 3 },
      },
      {
        label: "Overall brain health and balance",
        value: "balance",
        icon: "scale",
        scores: { protocol3: 3 },
      },
      {
        label: "Maximum cognitive performance",
        value: "maximum",
        icon: "crown",
        scores: { protocol4: 3 },
      },
    ],
  },
];

// ===== SCORING FUNCTIONS =====

export type UserAnswers = Record<string, AnswerValue>;

/**
 * Get the maximum possible points for a protocol across all questions
 */
function getMaxPossiblePoints(protocolKey: ProtocolKey): number {
  let maxPoints = 0;

  for (const question of quizQuestions) {
    let questionMax = 0;
    for (const option of question.options) {
      const points = option.scores[protocolKey] || 0;
      if (points > questionMax) {
        questionMax = points;
      }
    }
    maxPoints += questionMax;
  }

  return maxPoints;
}

/**
 * Calculate the user's score for a specific protocol
 */
function calculateProtocolScore(
  protocolKey: ProtocolKey,
  answers: UserAnswers,
): { totalPoints: number; breakdown: QuestionBreakdown[] } {
  let totalPoints = 0;
  const breakdown: QuestionBreakdown[] = [];

  for (const question of quizQuestions) {
    const userAnswer = answers[question.id];
    const selectedOption = question.options.find(
      (opt) => opt.value === userAnswer,
    );

    // Calculate max points for this question for this protocol
    let maxPoints = 0;
    for (const option of question.options) {
      const points = option.scores[protocolKey] || 0;
      if (points > maxPoints) {
        maxPoints = points;
      }
    }

    const pointsAwarded = selectedOption?.scores[protocolKey] || 0;
    totalPoints += pointsAwarded;

    breakdown.push({
      questionId: question.id,
      questionText: question.question,
      measures: question.measures,
      userAnswer: selectedOption?.label || "Not answered",
      pointsAwarded,
      maxPoints,
    });
  }

  return { totalPoints, breakdown };
}

/**
 * Calculate results for all protocols based on user answers
 * Returns sorted array with highest match first
 */
export function calculateQuizResults(answers: UserAnswers): QuizResult[] {
  const protocols: ProtocolKey[] = [
    "protocol1",
    "protocol2",
    "protocol3",
    "protocol4",
  ];
  const results: QuizResult[] = [];

  for (const protocolKey of protocols) {
    const maxPossiblePoints = getMaxPossiblePoints(protocolKey);
    const { totalPoints, breakdown } = calculateProtocolScore(
      protocolKey,
      answers,
    );

    const percentage =
      maxPossiblePoints > 0
        ? Math.round((totalPoints / maxPossiblePoints) * 100)
        : 0;

    results.push({
      protocolId: protocolKey,
      protocolNumber: protocolKey.replace("protocol", ""),
      percentage,
      totalPoints,
      maxPossiblePoints,
      questionBreakdown: breakdown,
    });
  }

  // Sort by percentage descending, then by protocol number ascending for ties
  results.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    return parseInt(a.protocolNumber) - parseInt(b.protocolNumber);
  });

  return results;
}

/**
 * Get the recommended protocol (highest scoring)
 */
export function getRecommendedProtocol(answers: UserAnswers): QuizResult {
  const results = calculateQuizResults(answers);
  return results[0];
}

/**
 * Get protocol match info by protocol key
 */
export function getProtocolMatchInfo(
  protocolKey: ProtocolKey,
): ProtocolMatchInfo {
  return protocolMatchInfo[protocolKey];
}

/**
 * Get all questions
 */
export function getQuizQuestions(): QuizQuestion[] {
  return quizQuestions;
}

/**
 * Get question by ID
 */
export function getQuestionById(id: string): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id);
}
