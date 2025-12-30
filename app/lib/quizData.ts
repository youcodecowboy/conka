// ===== QUIZ DATA =====

export type AnswerValue = "yes" | "no" | "sometimes";
export type ProtocolKey = "protocol1" | "protocol2" | "protocol3" | "protocol4";

export interface QuizOption {
  label: string;
  value: AnswerValue;
  icon: "check" | "x" | "tilde";
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
    name: "Protocol 1",
    subtitle: "Build Resilience, Stay Sharp",
    bestForSummary: "Protocol 1 is perfect for people who need consistent daily energy, struggle with stress management, and want better recovery. The adaptogen-focused approach with Conka Flow builds your foundation while strategic Conka Clarity boosts keep you sharp when it matters most.",
    keyBenefits: [
      "Daily stress resilience through adaptogens",
      "Improved sleep quality and recovery",
      "Reduced cortisol levels (-24%)",
      "Weekly cognitive boost for peak performance",
    ],
    icon: "shield",
  },
  protocol2: {
    id: "protocol2",
    protocolNumber: "2",
    name: "Protocol 2",
    subtitle: "Peak Cognition, Zero Burnout",
    bestForSummary: "Protocol 2 is ideal for those who need sustained mental clarity, experience brain fog, or have demanding cognitive work. The nootropic-heavy approach with Conka Clarity enhances focus and reaction time, while weekly Conka Flow prevents burnout.",
    keyBenefits: [
      "Enhanced mental clarity and focus",
      "Faster reaction time (-47ms)",
      "Extended mental endurance (+38%)",
      "Burnout prevention through adaptogens",
    ],
    icon: "bolt",
  },
  protocol3: {
    id: "protocol3",
    protocolNumber: "3",
    name: "Protocol 3",
    subtitle: "The Best of Both Worlds",
    bestForSummary: "Protocol 3 is designed for all-rounders who want comprehensive cognitive support without committing to one dominant formula. Perfect for those with varied daily demands who need both energy resilience and mental sharpness throughout the week.",
    keyBenefits: [
      "Complete cognitive coverage",
      "Adaptogen + nootropic synergy",
      "Flexible scheduling for varied needs",
      "Holistic brain optimization",
    ],
    icon: "balance",
  },
  protocol4: {
    id: "protocol4",
    protocolNumber: "4",
    name: "Protocol 4",
    subtitle: "Maximum Power, Every Day",
    bestForSummary: "Protocol 4 is the ultimate choice for high performers who demand peak cognitive function every single day. With both Conka Flow and Conka Clarity daily, you get maximum adaptogenic support and nootropic enhancement for uncompromising performance.",
    keyBenefits: [
      "Daily adaptogen + nootropic stack",
      "Peak energy AND clarity every day",
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
    subtitle: "Difficulty concentrating, mental cloudiness, or feeling mentally sluggish",
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
  // Placeholder questions - to be expanded to 10
  // These demonstrate the scoring system and can be easily modified
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
  answers: UserAnswers
): { totalPoints: number; breakdown: QuestionBreakdown[] } {
  let totalPoints = 0;
  const breakdown: QuestionBreakdown[] = [];
  
  for (const question of quizQuestions) {
    const userAnswer = answers[question.id];
    const selectedOption = question.options.find((opt) => opt.value === userAnswer);
    
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
  const protocols: ProtocolKey[] = ["protocol1", "protocol2", "protocol3", "protocol4"];
  const results: QuizResult[] = [];
  
  for (const protocolKey of protocols) {
    const maxPossiblePoints = getMaxPossiblePoints(protocolKey);
    const { totalPoints, breakdown } = calculateProtocolScore(protocolKey, answers);
    
    const percentage = maxPossiblePoints > 0 
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
export function getProtocolMatchInfo(protocolKey: ProtocolKey): ProtocolMatchInfo {
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

