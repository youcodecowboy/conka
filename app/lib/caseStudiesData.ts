// ===== CASE STUDIES DATA =====

// Sport categories for filtering
export type SportCategory = 
  | "football"
  | "tennis"
  | "golf"
  | "running"
  | "cycling"
  | "swimming"
  | "boxing"
  | "esports"
  | "chess"
  | "business"
  | "creative"
  | "other";

// Performance metrics structure
export interface PerformanceMetrics {
  reactionTime?: number;      // in milliseconds
  focusScore?: number;        // 0-100 scale
  recoveryScore?: number;     // 0-100 scale
  stressResilience?: number;  // 0-100 scale
  sleepQuality?: number;      // 0-100 scale
  mentalEndurance?: number;   // 0-100 scale
  decisionSpeed?: number;     // in milliseconds
  accuracy?: number;          // percentage
}

// Individual improvement stat for display
export interface ImprovementStat {
  metric: string;
  value: string;        // Display value like "+22pts" or "-44ms"
  percentage: number;   // Numerical percentage for charts
  description?: string; // Optional context
}

// Main athlete data structure
export interface AthleteData {
  id: string;
  name: string;
  photo?: string;                              // Optional photo path
  sport: SportCategory;                         // For filtering
  profession: string;                           // Display text
  achievement?: string;                         // Notable achievement
  description: string;                          // Bio/story
  quote?: string;                               // Optional testimonial
  
  // Product Info
  productVersion?: "01" | "02" | "both";
  protocolUsed?: string;
  
  // Performance Data (Conka App Results)
  testsCompleted: number;
  durationWeeks: number;
  baseline: PerformanceMetrics;
  results: PerformanceMetrics;
  improvements: ImprovementStat[];
  
  // Feature flag
  featured: boolean;
}

// Sport category display info
export const SPORT_INFO: Record<SportCategory, { name: string; emoji: string }> = {
  football: { name: "Football", emoji: "⚽" },
  tennis: { name: "Tennis", emoji: "🎾" },
  golf: { name: "Golf", emoji: "⛳" },
  running: { name: "Running", emoji: "🏃" },
  cycling: { name: "Cycling", emoji: "🚴" },
  swimming: { name: "Swimming", emoji: "🏊" },
  boxing: { name: "Boxing", emoji: "🥊" },
  esports: { name: "Esports", emoji: "🎮" },
  chess: { name: "Chess", emoji: "♟️" },
  business: { name: "Business", emoji: "💼" },
  creative: { name: "Creative", emoji: "🎨" },
  other: { name: "Other", emoji: "🏆" },
};

// ===== ATHLETE DATA =====

export const athletes: AthleteData[] = [
  {
    id: "marcus-johnson",
    name: "Marcus Johnson",
    sport: "football",
    profession: "Professional Footballer",
    achievement: "Premier League Champion",
    description: "Marcus struggled with maintaining focus during high-pressure matches, often experiencing mental fatigue in the second half. After incorporating Conka Flow into his pre-match routine, he noticed significant improvements in his ability to read the game and maintain concentration throughout 90 minutes.",
    quote: "Conka has completely changed my pre-match routine. I feel sharper in the final 15 minutes when it matters most.",
    productVersion: "01",
    protocolUsed: "Protocol 1 - Pro",
    testsCompleted: 47,
    durationWeeks: 12,
    baseline: {
      reactionTime: 285,
      focusScore: 62,
      recoveryScore: 55,
      stressResilience: 58,
      mentalEndurance: 61,
    },
    results: {
      reactionTime: 241,
      focusScore: 84,
      recoveryScore: 78,
      stressResilience: 81,
      mentalEndurance: 88,
    },
    improvements: [
      { metric: "Reaction Time", value: "-44ms", percentage: -15.4, description: "Faster decision-making on the pitch" },
      { metric: "Focus Score", value: "+22pts", percentage: 35.5, description: "Improved second-half concentration" },
      { metric: "Recovery", value: "+23pts", percentage: 41.8, description: "Better post-match recovery" },
      { metric: "Mental Endurance", value: "+27pts", percentage: 44.3, description: "Sustained performance throughout matches" },
    ],
    featured: true,
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    sport: "tennis",
    profession: "WTA Tennis Player",
    achievement: "Grand Slam Quarter-Finalist",
    description: "Elena was looking for a way to improve her mental game without relying on caffeine, which affected her sleep during tournaments. Conka Clarity became her secret weapon for maintaining peak cognitive performance during long matches without the jitters.",
    quote: "The difference in my third-set performance has been remarkable. I'm making fewer unforced errors when it counts.",
    productVersion: "02",
    protocolUsed: "Protocol 2 - Max",
    testsCompleted: 63,
    durationWeeks: 16,
    baseline: {
      reactionTime: 198,
      focusScore: 71,
      decisionSpeed: 245,
      stressResilience: 65,
      accuracy: 78,
    },
    results: {
      reactionTime: 162,
      focusScore: 91,
      decisionSpeed: 189,
      stressResilience: 87,
      accuracy: 92,
    },
    improvements: [
      { metric: "Reaction Time", value: "-36ms", percentage: -18.2, description: "Quicker court coverage" },
      { metric: "Focus Score", value: "+20pts", percentage: 28.2, description: "Improved match awareness" },
      { metric: "Decision Speed", value: "-56ms", percentage: -22.9, description: "Faster shot selection" },
      { metric: "Accuracy", value: "+14%", percentage: 17.9, description: "Fewer unforced errors" },
    ],
    featured: true,
  },
  {
    id: "james-chen",
    name: "James Chen",
    sport: "esports",
    profession: "Professional Valorant Player",
    achievement: "VCT Masters Finalist",
    description: "In esports, milliseconds matter. James needed to maintain peak reaction times across 8+ hour practice sessions and multi-day tournament schedules. The combination of Conka Flow and Clarity gave him the edge he needed.",
    quote: "My aim consistency in the final rounds has improved dramatically. No more mental fatigue throwing off my crosshair placement.",
    productVersion: "both",
    protocolUsed: "Protocol 4 - Max",
    testsCompleted: 128,
    durationWeeks: 20,
    baseline: {
      reactionTime: 172,
      focusScore: 78,
      mentalEndurance: 65,
      accuracy: 82,
      stressResilience: 70,
    },
    results: {
      reactionTime: 148,
      focusScore: 95,
      mentalEndurance: 91,
      accuracy: 94,
      stressResilience: 89,
    },
    improvements: [
      { metric: "Reaction Time", value: "-24ms", percentage: -14.0, description: "Faster flick reactions" },
      { metric: "Focus Score", value: "+17pts", percentage: 21.8, description: "Sustained tournament focus" },
      { metric: "Mental Endurance", value: "+26pts", percentage: 40.0, description: "No late-game fatigue" },
      { metric: "Accuracy", value: "+12%", percentage: 14.6, description: "Improved headshot percentage" },
    ],
    featured: true,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    sport: "running",
    profession: "Ultra-Marathon Runner",
    achievement: "UTMB Top 10 Finisher",
    description: "Ultra-running is as much a mental sport as a physical one. Sarah needed something to help her maintain focus during 100+ mile races. Conka Flow's adaptogenic blend helped her manage race-day stress and maintain mental clarity through the night.",
    quote: "At mile 80, when your body wants to quit, it's your mind that keeps you moving. Conka helps keep that mind sharp.",
    productVersion: "01",
    protocolUsed: "Protocol 1 - Max",
    testsCompleted: 34,
    durationWeeks: 24,
    baseline: {
      focusScore: 68,
      stressResilience: 72,
      mentalEndurance: 75,
      sleepQuality: 58,
      recoveryScore: 62,
    },
    results: {
      focusScore: 86,
      stressResilience: 91,
      mentalEndurance: 94,
      sleepQuality: 82,
      recoveryScore: 88,
    },
    improvements: [
      { metric: "Mental Endurance", value: "+19pts", percentage: 25.3, description: "Sustained focus over 24+ hours" },
      { metric: "Stress Resilience", value: "+19pts", percentage: 26.4, description: "Better race-day composure" },
      { metric: "Sleep Quality", value: "+24pts", percentage: 41.4, description: "Improved recovery sleep" },
      { metric: "Recovery", value: "+26pts", percentage: 41.9, description: "Faster post-race recovery" },
    ],
    featured: false,
  },
  {
    id: "david-okonkwo",
    name: "David Okonkwo",
    sport: "chess",
    profession: "International Chess Master",
    achievement: "FIDE Rating 2450+",
    description: "Chess at the competitive level demands hours of intense concentration. David found that his calculation accuracy would drop significantly after the 4-hour mark. Conka Clarity helped him maintain his analytical sharpness throughout long classical games.",
    quote: "I'm calculating variations deeper and more accurately in the endgame phase. My blunder rate has dropped significantly.",
    productVersion: "02",
    protocolUsed: "Protocol 2 - Pro",
    testsCompleted: 89,
    durationWeeks: 18,
    baseline: {
      focusScore: 82,
      decisionSpeed: 320,
      accuracy: 76,
      mentalEndurance: 68,
      stressResilience: 71,
    },
    results: {
      focusScore: 96,
      decisionSpeed: 258,
      accuracy: 91,
      mentalEndurance: 89,
      stressResilience: 88,
    },
    improvements: [
      { metric: "Focus Score", value: "+14pts", percentage: 17.1, description: "Deeper concentration" },
      { metric: "Decision Speed", value: "-62ms", percentage: -19.4, description: "Faster time management" },
      { metric: "Accuracy", value: "+15%", percentage: 19.7, description: "Fewer calculation errors" },
      { metric: "Mental Endurance", value: "+21pts", percentage: 30.9, description: "No late-game fatigue" },
    ],
    featured: false,
  },
  {
    id: "amanda-foster",
    name: "Amanda Foster",
    sport: "golf",
    profession: "LPGA Tour Professional",
    achievement: "2x Major Championship Winner",
    description: "Golf requires intense focus over 4-5 hours while managing pressure on every shot. Amanda incorporated Conka into her tournament preparation to improve her mental consistency and stress management during crucial moments.",
    quote: "My putting under pressure has improved dramatically. I'm staying calm on those must-make putts.",
    productVersion: "both",
    protocolUsed: "Protocol 3 - Pro",
    testsCompleted: 52,
    durationWeeks: 14,
    baseline: {
      focusScore: 74,
      stressResilience: 68,
      decisionSpeed: 380,
      accuracy: 81,
      mentalEndurance: 72,
    },
    results: {
      focusScore: 92,
      stressResilience: 89,
      decisionSpeed: 305,
      accuracy: 93,
      mentalEndurance: 90,
    },
    improvements: [
      { metric: "Focus Score", value: "+18pts", percentage: 24.3, description: "Better shot concentration" },
      { metric: "Stress Resilience", value: "+21pts", percentage: 30.9, description: "Calmer under pressure" },
      { metric: "Accuracy", value: "+12%", percentage: 14.8, description: "Improved putting stats" },
      { metric: "Mental Endurance", value: "+18pts", percentage: 25.0, description: "Consistent back-nine performance" },
    ],
    featured: false,
  },
  {
    id: "michael-brooks",
    name: "Michael Brooks",
    sport: "boxing",
    profession: "Professional Boxer",
    achievement: "Commonwealth Champion",
    description: "In boxing, a split-second lapse in concentration can end a fight. Michael needed to maintain his defensive awareness and reaction speed throughout 12 rounds. Conka helped him stay sharp when fatigue would normally set in.",
    quote: "I'm seeing punches coming that I would have missed before. My defensive reactions in the championship rounds are night and day.",
    productVersion: "01",
    protocolUsed: "Protocol 1 - Max",
    testsCompleted: 41,
    durationWeeks: 10,
    baseline: {
      reactionTime: 195,
      focusScore: 76,
      stressResilience: 80,
      mentalEndurance: 71,
      recoveryScore: 65,
    },
    results: {
      reactionTime: 158,
      focusScore: 93,
      stressResilience: 94,
      mentalEndurance: 92,
      recoveryScore: 86,
    },
    improvements: [
      { metric: "Reaction Time", value: "-37ms", percentage: -19.0, description: "Faster defensive reflexes" },
      { metric: "Focus Score", value: "+17pts", percentage: 22.4, description: "Improved awareness" },
      { metric: "Mental Endurance", value: "+21pts", percentage: 29.6, description: "Sharper in late rounds" },
      { metric: "Recovery", value: "+21pts", percentage: 32.3, description: "Better training recovery" },
    ],
    featured: false,
  },
  {
    id: "lisa-hartmann",
    name: "Lisa Hartmann",
    sport: "business",
    profession: "Hedge Fund Manager",
    achievement: "Top 30 Under 30 Finance",
    description: "Managing high-stakes investments requires constant mental clarity and the ability to make split-second decisions. Lisa found that Conka helped her maintain cognitive sharpness during long trading sessions and high-pressure board meetings.",
    quote: "In my world, a foggy mind costs millions. Conka keeps me sharp from market open to close.",
    productVersion: "02",
    protocolUsed: "Protocol 2 - Max",
    testsCompleted: 76,
    durationWeeks: 22,
    baseline: {
      focusScore: 72,
      decisionSpeed: 290,
      stressResilience: 64,
      mentalEndurance: 68,
      sleepQuality: 52,
    },
    results: {
      focusScore: 94,
      decisionSpeed: 218,
      stressResilience: 88,
      mentalEndurance: 91,
      sleepQuality: 78,
    },
    improvements: [
      { metric: "Focus Score", value: "+22pts", percentage: 30.6, description: "Enhanced market analysis" },
      { metric: "Decision Speed", value: "-72ms", percentage: -24.8, description: "Faster trade execution" },
      { metric: "Stress Resilience", value: "+24pts", percentage: 37.5, description: "Calmer during volatility" },
      { metric: "Sleep Quality", value: "+26pts", percentage: 50.0, description: "Better work-life balance" },
    ],
    featured: true,
  },
  {
    id: "tom-nakamura",
    name: "Tom Nakamura",
    sport: "cycling",
    profession: "Professional Cyclist",
    achievement: "Tour de France Stage Winner",
    description: "Grand tour cycling demands mental resilience over three weeks of racing. Tom needed help managing the psychological toll of daily competition. Conka Flow's adaptogenic blend became part of his daily routine for stress management and recovery.",
    quote: "Week three used to destroy me mentally. Now I'm racing smarter and recovering faster between stages.",
    productVersion: "01",
    protocolUsed: "Protocol 1 - Pro",
    testsCompleted: 58,
    durationWeeks: 16,
    baseline: {
      focusScore: 70,
      stressResilience: 66,
      mentalEndurance: 73,
      sleepQuality: 61,
      recoveryScore: 58,
    },
    results: {
      focusScore: 88,
      stressResilience: 87,
      mentalEndurance: 93,
      sleepQuality: 84,
      recoveryScore: 85,
    },
    improvements: [
      { metric: "Mental Endurance", value: "+20pts", percentage: 27.4, description: "Sustained focus over 3 weeks" },
      { metric: "Sleep Quality", value: "+23pts", percentage: 37.7, description: "Better hotel sleep" },
      { metric: "Stress Resilience", value: "+21pts", percentage: 31.8, description: "Improved race composure" },
      { metric: "Recovery", value: "+27pts", percentage: 46.6, description: "Faster overnight recovery" },
    ],
    featured: false,
  },
  {
    id: "rachel-kim",
    name: "Rachel Kim",
    sport: "creative",
    profession: "Film Director",
    achievement: "Sundance Best Director",
    description: "Directing a film requires maintaining creative clarity while managing hundreds of decisions daily under intense pressure. Rachel found Conka helped her stay creatively focused during 14-hour shoot days without the burnout she'd experienced before.",
    quote: "My creative vision stays crystal clear from first shot to wrap. I'm making better decisions faster.",
    productVersion: "both",
    protocolUsed: "Protocol 3 - Max",
    testsCompleted: 44,
    durationWeeks: 12,
    baseline: {
      focusScore: 68,
      decisionSpeed: 340,
      stressResilience: 58,
      mentalEndurance: 62,
      sleepQuality: 48,
    },
    results: {
      focusScore: 89,
      decisionSpeed: 265,
      stressResilience: 84,
      mentalEndurance: 88,
      sleepQuality: 76,
    },
    improvements: [
      { metric: "Focus Score", value: "+21pts", percentage: 30.9, description: "Clearer creative vision" },
      { metric: "Decision Speed", value: "-75ms", percentage: -22.1, description: "Faster on-set decisions" },
      { metric: "Stress Resilience", value: "+26pts", percentage: 44.8, description: "Better pressure management" },
      { metric: "Sleep Quality", value: "+28pts", percentage: 58.3, description: "Improved shoot sleep" },
    ],
    featured: false,
  },
  {
    id: "alex-morgan-swimmer",
    name: "Alex Morgan",
    sport: "swimming",
    profession: "Olympic Swimmer",
    achievement: "Olympic Bronze Medalist",
    description: "At the Olympic level, the difference between medals is often mental. Alex needed to optimize every aspect of his cognitive performance to shave those final fractions of seconds. Conka Clarity became essential to his pre-race routine.",
    quote: "My race starts are more explosive and my pacing decisions mid-race are sharper. It's the edge I needed.",
    productVersion: "02",
    protocolUsed: "Protocol 2 - Pro",
    testsCompleted: 82,
    durationWeeks: 20,
    baseline: {
      reactionTime: 168,
      focusScore: 79,
      stressResilience: 75,
      mentalEndurance: 81,
      recoveryScore: 70,
    },
    results: {
      reactionTime: 142,
      focusScore: 94,
      stressResilience: 92,
      mentalEndurance: 95,
      recoveryScore: 89,
    },
    improvements: [
      { metric: "Reaction Time", value: "-26ms", percentage: -15.5, description: "Faster block starts" },
      { metric: "Focus Score", value: "+15pts", percentage: 19.0, description: "Better race awareness" },
      { metric: "Stress Resilience", value: "+17pts", percentage: 22.7, description: "Calmer on the blocks" },
      { metric: "Recovery", value: "+19pts", percentage: 27.1, description: "Faster between heats" },
    ],
    featured: false,
  },
];

// ===== HELPER FUNCTIONS =====

export function getAthleteById(id: string): AthleteData | undefined {
  return athletes.find(athlete => athlete.id === id);
}

export function getFeaturedAthletes(): AthleteData[] {
  return athletes.filter(athlete => athlete.featured);
}

export function getAthletesBySport(sport: SportCategory): AthleteData[] {
  return athletes.filter(athlete => athlete.sport === sport);
}

export function getAllSports(): SportCategory[] {
  const sports = new Set(athletes.map(athlete => athlete.sport));
  return Array.from(sports);
}

export function getAthletesByProductVersion(version: "01" | "02" | "both"): AthleteData[] {
  return athletes.filter(athlete => 
    athlete.productVersion === version || athlete.productVersion === "both"
  );
}

// Calculate average improvement percentage for an athlete
export function getAverageImprovement(athlete: AthleteData): number {
  const improvements = athlete.improvements.map(i => Math.abs(i.percentage));
  return improvements.reduce((sum, val) => sum + val, 0) / improvements.length;
}

