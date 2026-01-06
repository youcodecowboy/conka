// Our Story - Data for the immersive scrolling experience

export interface StoryQuote {
  text: string;
  author: string;
  role: string;
}

export interface StorySection {
  id: number;
  theme: "light" | "dark";
  headline: string;
  subtitle?: string;
  body: string;
  quote?: StoryQuote;
  imagePlaceholder: string;
}

// The 10 story sections
export const storySections: StorySection[] = [
  {
    id: 1,
    theme: "light",
    headline: "Where It All Began",
    subtitle: "two athletes, one shared obsession",
    body: "Humphrey Bodington and Harry Glover met at university as teammates. United by a relentless drive for performance, they pushed each other on and off the field. What started as camaraderie between athletes would soon evolve into a mission that neither could have predicted.",
    imagePlaceholder: "[FOUNDERS AT UNIVERSITY]",
  },
  {
    id: 2,
    theme: "dark",
    headline: "The Spark",
    subtitle: "when everything changed",
    body: "After years in competitive contact sports, we'd mastered physical rehabilitation. But there was one thing missing from the conversation: recovery for the brain. Harry played over a decade of professional rugby for his country. Humphrey's career, however, was cut short. A concussion injury led to what neurologists called permanent post-concussion syndrome. Eight months of cognitive fog, fatigue, and uncertainty followed.",
    quote: {
      text: "Lingering concussion symptoms pushed us to explore what the brain is truly capable of.",
      author: "Humphrey Bodington",
      role: "Co-Founder",
    },
    imagePlaceholder: "[CONCUSSION RECOVERY JOURNEY]",
  },
  {
    id: 3,
    theme: "light",
    headline: "Breakthrough Discovery",
    subtitle: "the science that changed everything",
    body: "Working with neuroscientists at Durham University, Prof. Paul Chazot and Prof. Karen Hind, Humphrey discovered how brain-enhancing nutrition could improve not just cognition after contact sport, but physical recovery, workplace motivation, and the ambition to take on bigger goals. The research revealed something remarkable: the complete CONKA formula extended lifespan equivalent to 15 human years in validated models, reduced oxidative stress, and reversed concussion-induced deficits.",
    imagePlaceholder: "[DURHAM UNIVERSITY RESEARCH LAB]",
  },
  {
    id: 4,
    theme: "dark",
    headline: "Parallel Paths",
    subtitle: "the Olympic revelation",
    body: "At the same time, Harry's journey with Team GB at the 2021 Olympics revealed something critical: cognitive performance was completely untapped, even among the world's elite athletes. Physical training had reached its peak. The next frontier was the mind.",
    imagePlaceholder: "[HARRY AT OLYMPICS]",
  },
  {
    id: 5,
    theme: "light",
    headline: "Half a Million in Research",
    subtitle: "no shortcuts, only science",
    body: "We invested over £500,000 into understanding how botanical ingredients could enhance brain performance. Working alongside Durham's neuroscience department, we tested, refined, and tested again. The goal was simple: create something that actually works, backed by real data, not marketing claims. Every ingredient was chosen for its synergistic effect. When any single component was removed, the benefits significantly decreased.",
    imagePlaceholder: "[RESEARCH & DEVELOPMENT]",
  },
  {
    id: 6,
    theme: "dark",
    headline: "Building the Technology",
    subtitle: "if you can't measure it, you can't improve it",
    body: "Tackling brain performance meant measuring it accurately. CONKA's cognitive testing technology was developed in partnership with Cambridge University. The Integrated Cognitive Assessment (ICA) is a 5-minute, language-independent digital test that measures brain processing speed with high precision. It's unlearnable, objective, and sensitive enough to detect changes that traditional tests miss.",
    imagePlaceholder: "[COGNITIVE TESTING APP]",
  },
  {
    id: 7,
    theme: "light",
    headline: "Reinventing Extraction",
    subtitle: "alcohol-free, performance-first",
    body: "Typical herbal tinctures use alcohol as a solvent. For professional athletes, that's a compromise we weren't willing to make. Dr. Shankar Katekhaye Ph.D invented an entirely new method of extracting active ingredients from herbs without using alcohol. A liquid formula that delivers faster absorption without any performance-compromising ingredients.",
    imagePlaceholder: "[DR. KATEKHAYE IN LAB]",
  },
  {
    id: 8,
    theme: "dark",
    headline: "Pro Sport Validation",
    subtitle: "the first real-world test",
    body: "Less than 16% of supplements are ever tested in clinical trials. CONKA has now completed over 25 trials with high-performing organisations. The first trial showed a 16% increase in brain performance compared to the placebo group. We had proof that this worked. Not in a lab, but on the field.",
    imagePlaceholder: "[CLINICAL TRIAL RESULTS]",
  },
  {
    id: 9,
    theme: "light",
    headline: "The Second Formula",
    subtitle: "precision-tuned for recovery",
    body: "Armed with data from professional sports teams, a pattern emerged. There were two days each week where cognitive performance dipped, always around periods of high intensity training. The technology revealed what athletes couldn't feel themselves. So we developed a second formula specifically designed to complement the first: Conka Flow for daily cognitive enhancement, Conka Clarity for recovery periods.",
    imagePlaceholder: "[TWO FORMULA SYSTEM]",
  },
  {
    id: 10,
    theme: "dark",
    headline: "The Journey Continues",
    subtitle: "from two athletes to thousands",
    body: "What began as a personal mission has grown into something bigger. Tested by Bristol Rugby, McGuigan Boxing Gym, Blackburn Rovers, Sale Sharks, Team GB 7s, Toulouse Rugby, Wigan Athletic, Southampton Saints, Birmingham FC, Bath Rugby, Leeds United, and countless individual athletes seeking an edge. The results speak for themselves: +22% cognitive speed in men, +33% in women. +16% overall cognitive efficiency. This is just the beginning.",
    imagePlaceholder: "[TEAM LOGOS & ATHLETES]",
  },
];

// Teams that have tested CONKA
export const testedByTeams = [
  "Bristol Rugby",
  "McGuigan Boxing Gym",
  "Blackburn Rovers F.C",
  "Sale Sharks",
  "Team GB 7s",
  "Toulouse Rugby",
  "WRU/RGC Rugby",
  "Wigan Athletic F.C",
  "Southampton Saints F.C",
  "Birmingham F.C",
  "Bath Rugby",
  "Leeds United F.C",
];

// Key research stats for the final section
export const researchStats = {
  speedMen: "+22%",
  speedWomen: "+33%",
  accuracyMen: "+11%",
  accuracyWomen: "+13%",
  efficiencyMen: "+16%",
  efficiencyWomen: "+23%",
};

