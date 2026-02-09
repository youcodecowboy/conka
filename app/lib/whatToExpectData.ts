/**
 * What to expect / transformation timeline copy per formula.
 * Used on PDP to show stages: immediate → 7 days → 14 days → 30 days → 60+.
 * Copy is feeling-led, laced with light science (mechanisms, outcomes) for credibility.
 *
 * ASSET RECOMMENDATIONS (per stage, optional):
 * - Flow: (1) Person taking shot / morning ritual. (2) Calm workspace or morning routine.
 *   (3) Focused work or exercise. (4) Balanced lifestyle / wind-down. (5) Long-term habit / bottle in routine.
 * - Clear: (1) Desk / screen work, clear head. (2) Supplement + water. (3) Deep work / clarity moment.
 *   (4) Sustained focus / week view. (5) Wellness routine.
 * Style: Real lifestyle or product-in-use; avoid stock clichés. Optional: subtle abstract (e.g. neurons, antioxidants)
 * for 30/60+ to signal “science” without being clinical.
 */

import type { FormulaId } from "./productData";

export interface WhatToExpectStep {
  subheading: string;
  heading: string;
  body: string;
}

export const whatToExpectStepsFlow: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Calm focus without the fog",
    body: "Lemon balm supports GABA in the brain—you’ll get a calmer, clearer head without sedation. You’ll feel less mental chatter and easier focus within the first half-hour as your system responds to the blend.",
  },
  {
    subheading: "7 Days",
    heading: "The shift begins",
    body: "With daily use, adaptogens like ashwagandha and rhodiola stack. You’ll feel stress more manageable and mornings smoother. Your body adapts and builds a new baseline.",
  },
  {
    subheading: "14 Days",
    heading: "Energy, focus & resilience",
    body: "Turmeric’s support for BDNF and brain circulation, plus rhodiola’s fatigue-buffering effects, show up. You’ll feel steadier energy and focus through the day, with fewer afternoon dips and clearer mental clarity.",
  },
  {
    subheading: "30 Days",
    heading: "Mind & body in balance",
    body: "The benefits compound—neuroprotection and calm focus from the full stack. You’ll feel more balanced: sustained clarity, steadier energy, and a calmer baseline. It becomes a non-negotiable part of your routine.",
  },
  {
    subheading: "60+ Days",
    heading: "Total system strength",
    body: "You’re supporting your system for the long run. You’ll maintain focus, resilience, and balance as part of a sustainable daily habit—not a short-term spike.",
  },
];

export const whatToExpectStepsClear: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Clearer head, less brain fog",
    body: "Glutathione and vitamin C dampen oxidative stress in the brain—you’ll feel the fog lift and complex tasks get easier from the first use. You’ll have a clearer head and sharper thinking within 30 minutes.",
  },
  {
    subheading: "7 Days",
    heading: "Antioxidant baseline building",
    body: "As you take it daily, glutathione and NAC (a glutathione precursor) build in your system. You’ll feel thinking get sharper and mental fatigue lighter as your antioxidant capacity rises.",
  },
  {
    subheading: "14 Days",
    heading: "Noticeable cognitive lift",
    body: "Vitamin C is concentrated in neurons and supports focus and decision speed. After two weeks you’ll feel steadier focus and more repeatable mental performance. Cognitive and clarity improvements are clearly there.",
  },
  {
    subheading: "30 Days",
    heading: "Compound mental clarity",
    body: "The full antioxidant and nootropic stack compounds. You’ll feel mental clarity and focus established—support for brain energy and resilience that sticks, not a short-lived boost.",
  },
  {
    subheading: "60+ Days",
    heading: "Long-term clarity & wellbeing",
    body: "You’re supporting clarity and cognitive health for the long term. You’ll maintain sharp thinking and balance—ingredients that support your brain over time, not just a short-term fix.",
  },
];

export const whatToExpectByFormula: Record<FormulaId, WhatToExpectStep[]> = {
  "01": whatToExpectStepsFlow,
  "02": whatToExpectStepsClear,
};
