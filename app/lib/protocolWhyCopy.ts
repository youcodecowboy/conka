/**
 * Protocol Why v2 — copy for recognition → trap → break → transformation.
 * Single source for copywriters and legal. Phase 2 uses symptomEntries.
 */

export const sectionHeadings = {
  recognition: "Recognize yourself?",
  recognitionSubline: "Select what sounds familiar.",
  trap: "You're in the cycle",
  break: "Here's how to break it",
  transformation: "The outcome",
} as const;

export const beforeAfterStates = [
  { before: "3pm energy crash", after: "Stable energy" },
  { before: "Racing thoughts", after: "Clear focus" },
  { before: "Slow recovery", after: "Bounce back" },
  { before: "Stress → exhaustion", after: "Stress → adaptation" },
] as const;

export const credibilityLine = "Backed by 9 peer-reviewed studies";
export const whyNotAllInOne = "This is why we don't make an all-in-one";
export const transformationMicrocopy = "Not claims. States.";
export const transitionLine = "But there's a way out.";

export const interventionPoints = {
  flow: {
    position: "stress-to-oxidative" as const,
    label: "Flow reduces pressure here",
    icon: "shield",
  },
  clear: {
    position: "repair-to-performance" as const,
    label: "Clear builds capacity here",
    icon: "wrench",
  },
} as const;

// Phase 2: question-safe labels, entryNode = index into cycle (0–4)
export const symptomEntries = [
  { id: "mental-fog", label: "Can't think clearly under pressure", entryNode: 0 },
  { id: "energy-crash", label: "Energy crashes in the afternoon", entryNode: 3 },
  { id: "slow-recovery", label: "Takes days to bounce back", entryNode: 2 },
  { id: "always-on", label: "Can't switch off at night", entryNode: 1 },
] as const;
