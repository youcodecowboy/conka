// Our Story — the V1 narrative.
//
// Copy is transcribed verbatim from Henry's Figma (file kG2CX5AvjTgP3pAjZdedFs,
// the V1 column), including its em dashes, ellipsis and straight apostrophes.
// Do not "tidy" the punctuation: it is approved brand copy, not copy authored
// here. Plan: docs/development/featurePlans/our-story-simplification.md
//
// Structure: a split hero, four alternating image/copy chapters, one CTA.
// The page owns section wrappers and backgrounds; this module is content only.

export interface StoryStat {
  value: string;
  label: string;
}

export interface StoryChapter {
  id: number;
  heading: string;
  /** Rendered as separate <p> elements, one per Figma line group. */
  paragraphs: string[];
  image: string;
  imageAlt: string;
  /** Which side the image sits on at lg and above. Mobile always stacks image first. */
  imageSide: "left" | "right";
}

export const storyHero = {
  heading: "Two athletes. One obsession. Zero shortcuts",
  body: "Harry and Humphrey didn't set out to build a supplement. They just couldn't accept that brain performance was left to chance. So they spent £500K and five years changing that.",
  image: "/story/v1/hero-founders.webp",
  imageAlt:
    "CONKA founders Harry Glover and Humphrey Bodington on site in high-visibility vests",
  stats: [
    { value: "£500K+", label: "invested into brain research" },
    { value: "25+", label: "trials with professional teams" },
    { value: "150,000+", label: "shots taken to date" },
  ] satisfies StoryStat[],
};

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    heading: "It started with one question",
    paragraphs: [
      "Harry and Humphrey met as teammates. Both wired the same way: Improve, Improve, Improve.",
      "One question stuck with them: How can we improve our brain’s performance?",
      "For Humphrey it got personal... a run of concussions had shown him just how much sharper a mind could be, and how much there was to gain.",
      "The more they looked, the more it added up. That edge everyone wants — a faster start, a clearer afternoon, a mind that keeps up — no one had built a real way to reach it.",
      "So they did.",
    ],
    image: "/story/v1/founders-portrait.webp",
    imageAlt:
      "CONKA founders Harry Glover and Humphrey Bodington together on a rugby pitch",
    imageSide: "left",
  },
  {
    id: 2,
    heading: "Uncharted territory. Directed by the best.",
    paragraphs: [
      "They took the question to neuroscientists at Durham University. Not for a quick answer. For a real one.",
      "The thing they found: the right natural ingredients work far better together than any one does alone. Take one out and the whole effect drops. The combination is the point.",
      "Getting there took £500K of their own money and years of testing. No shortcuts. That was always the deal.",
      "£500K+ of their own money, invested in the research",
    ],
    image: "/story/v1/durham-lab.webp",
    imageAlt: "A neuroscientist in a white coat in a Durham University laboratory",
    imageSide: "right",
  },
  {
    id: 3,
    heading: "Tested where fakes wouldn't survive.",
    paragraphs: [
      "To know it actually worked, they needed to test CONKA rigorously. So they took it to where the stakes are highest, where a fraction of a percent is the difference between winning and losing, and no one has patience for something that doesn't.",
      "If it worked there, it worked.",
      "4 clinical studies on one product.",
    ],
    image: "/story/v1/athlete-shot.webp",
    imageAlt: "A professional athlete taking a CONKA shot in a gym",
    imageSide: "left",
  },
  {
    id: 4,
    heading: "A science-grade test. In your pocket.",
    paragraphs: [
      "The tools that measure the brain properly used to live in university labs. CONKA put one in an app.",
      "Developed with neuroscientists at Cambridge University, it reads your focus, memory and reaction speed and turns them into a single score. The same kind of test used in the trials. Now yours, every morning.",
      "Every score feeds one of the largest brain datasets ever built outside a research institution. Over a million tests, and counting.",
    ],
    image: "/story/v1/app-score.webp",
    imageAlt: "The CONKA app showing a daily cognitive performance score",
    imageSide: "right",
  },
];

export const storyCta = {
  heading: "Everyone has a brain.",
  body: "What started with two people is now a daily habit for thousands. Not athletes. Just people curious about what a clearer mind could do for them. Yours is the next one worth measuring.",
  ctaLabel: "Try CONKA",
};
