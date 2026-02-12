/**
 * What to expect / transformation timeline copy per protocol.
 * Same time anchors as formula timeline; copy blends CONKA Flow + CONKA Clear and emphasizes synergy.
 * Per-protocol character: Resilience (CONKA Flow dominant), Precision (CONKA Clear dominant),
 * Balance (equal split), Ultimate (both daily — most compelling and intense).
 */

import type { FormulaId, ProtocolId } from "./productData";
import type { ProductId } from "./productTypes";
import type { WhatToExpectStep } from "./whatToExpectData";
import { whatToExpectByFormula } from "./whatToExpectData";

export type { WhatToExpectStep };

export const whatToExpectStepsResilience: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Calm baseline, sharper focus when it counts",
    body: "CONKA Flow’s adaptogens start to steady your system while CONKA Clear’s cognitive support kicks in. You’ll feel the mental chatter ease and focus sharpen—the combination gives you a calm baseline with clarity when you need it.",
  },
  {
    subheading: "7 Days",
    heading: "Stress more manageable, recovery building",
    body: "Daily CONKA Flow builds stress resilience; weekly CONKA Clear boosts add cognitive peaks. You’ll feel mornings smoother and recovery faster. CONKA Flow does the heavy lifting; CONKA Clear sharpens performance when it matters.",
  },
  {
    subheading: "14 Days",
    heading: "Steadier energy, fewer afternoon dips",
    body: "The synergy shows: adaptogens from CONKA Flow stack with CONKA Clear’s support for focus and brain energy. You’ll feel steadier through the day with less burnout and clearer thinking when you need to perform.",
  },
  {
    subheading: "30 Days",
    heading: "Resilience and clarity in rhythm",
    body: "CONKA Flow’s baseline and CONKA Clear’s targeted boosts compound. You’ll feel stress more manageable and mental clarity reliable—a system that supports recovery and performance without overload.",
  },
  {
    subheading: "60+ Days",
    heading: "Sustainable resilience",
    body: "You’re supporting long-term stress resilience and cognitive performance. The protocol becomes a non-negotiable part of your routine—CONKA Flow builds the foundation, CONKA Clear adds the edge.",
  },
];

export const whatToExpectStepsPrecision: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Fog lifts, thinking sharpens",
    body: "CONKA Clear’s nootropics and antioxidants get to work fast; CONKA Flow’s calming support keeps the system steady. You’ll feel the fog lift and complex tasks get easier without the jitters—clarity with balance.",
  },
  {
    subheading: "7 Days",
    heading: "Cognitive baseline building",
    body: "Daily CONKA Clear builds your neurological foundation; weekly CONKA Flow prevents burnout. You’ll feel thinking get sharper and mental fatigue lighter. CONKA Clear leads; CONKA Flow keeps you from burning out.",
  },
  {
    subheading: "14 Days",
    heading: "Noticeable mental endurance",
    body: "The synergy is clear: CONKA Clear’s cognitive support stacks with CONKA Flow’s stress modulation. You’ll feel steadier focus and longer mental endurance—peak clarity without the crash.",
  },
  {
    subheading: "30 Days",
    heading: "Compound clarity and balance",
    body: "The full stack compounds. You’ll feel mental clarity and focus established, with CONKA Flow smoothing the edges so you can sustain performance. Clarity that sticks, without burnout.",
  },
  {
    subheading: "60+ Days",
    heading: "Long-term cognitive edge",
    body: "You’re supporting clarity and mental performance for the long run. CONKA Clear builds the foundation; CONKA Flow keeps the system balanced. A sustainable protocol for those who need to stay sharp.",
  },
];

export const whatToExpectStepsBalance: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Best of both: calm and clear",
    body: "Alternating CONKA Flow and CONKA Clear gives you the full spectrum from day one. You’ll feel adaptogenic calm from CONKA Flow and cognitive lift from CONKA Clear—two formulas, one balanced system.",
  },
  {
    subheading: "7 Days",
    heading: "The rhythm establishes",
    body: "Alternate days let each formula do its job without overlap. You’ll feel stress more manageable and thinking sharper as your body adapts to the rhythm. CONKA Flow one day, CONKA Clear the next—comprehensive support.",
  },
  {
    subheading: "14 Days",
    heading: "Energy and clarity in balance",
    body: "The best of both worlds compounds. You’ll feel steadier energy from CONKA Flow’s adaptogens and sustained clarity from CONKA Clear’s nootropics. No single-formula compromise—full spectrum benefits.",
  },
  {
    subheading: "30 Days",
    heading: "Mind and body in sync",
    body: "Alternating CONKA Flow and CONKA Clear becomes second nature. You’ll feel balanced: resilience from CONKA Flow, cognitive edge from CONKA Clear. A protocol built for all-rounders who want it all.",
  },
  {
    subheading: "60+ Days",
    heading: "Sustainable full-spectrum support",
    body: "You’re supporting stress resilience and cognitive performance in balance. The alternating rhythm keeps both systems primed—sustainable, comprehensive, no compromise on either side.",
  },
];

export const whatToExpectStepsUltimate: WhatToExpectStep[] = [
  {
    subheading: "Within 30 minutes",
    heading: "The full stack from the first use",
    body: "Both formulas from the first use. You’ll feel adaptogenic calm and cognitive clarity at once—no choosing between stress support and sharp thinking. The full stack from day one.",
  },
  {
    subheading: "7 Days",
    heading: "Daily synergy—no compromise",
    body: "CONKA Flow and CONKA Clear every day means both systems stack without trade-off. You’ll feel stress more manageable and mental clarity rising. Maximum support, no compromise.",
  },
  {
    subheading: "14 Days",
    heading: "Peak energy and peak clarity—every day",
    body: "The ultimate protocol shows its edge: daily adaptogens plus daily nootropics. You’ll feel steadier energy and sharper focus—both formulas working in parallel for elite performance.",
  },
  {
    subheading: "30 Days",
    heading: "The complete cognitive toolkit—yours",
    body: "Both formulas daily compound. You’ll feel resilience and clarity at their peak—the full cognitive toolkit. For those who demand maximum results and won’t choose between CONKA Flow and CONKA Clear.",
  },
  {
    subheading: "60+ Days",
    heading: "Long-term peak—the best you can do",
    body: "You’re supporting your system at the highest level. Daily CONKA Flow and daily CONKA Clear maintain focus, resilience, and clarity as a sustainable habit—the ultimate protocol for the long run.",
  },
];

export const whatToExpectByProtocol: Record<ProtocolId, WhatToExpectStep[]> = {
  "1": whatToExpectStepsResilience,
  "2": whatToExpectStepsPrecision,
  "3": whatToExpectStepsBalance,
  "4": whatToExpectStepsUltimate,
};

/** Single config: formulas + protocols. Use with WhatToExpectTimeline (productId). */
export const whatToExpectByProduct: Record<ProductId, WhatToExpectStep[]> = {
  ...(whatToExpectByFormula as Record<FormulaId, WhatToExpectStep[]>),
  ...whatToExpectByProtocol,
};
