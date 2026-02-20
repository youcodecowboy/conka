/**
 * Timeline data for landing page "What to Expect" (Flow / Clear).
 * Shared by WhatToExpectDesktop and WhatToExpectMobile.
 */

export interface TimelineStage {
  subheading: string;
  heading: string;
  body: string;
}

export const timelineFlow: TimelineStage[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Calmer head, sharper focus",
    body: "Lemon balm supports GABA receptors. You'll feel less mental chatter and easier concentration within 30 minutes.",
  },
  {
    subheading: "Week 1-2",
    heading: "Stress becomes manageable",
    body: "Adaptogens like ashwagandha stack daily. You'll feel mornings smoother and stress more under control.",
  },
  {
    subheading: "Month 1",
    heading: "Energy and focus compound",
    body: "Neuroprotection and resilience build. You'll feel steadier energy, clearer thinking, and fewer afternoon dips.",
  },
  {
    subheading: "2+ Months",
    heading: "Sustainable daily strength",
    body: "You're supporting your system for the long run. Focus, resilience, and balance maintained as a habit, not a spike.",
  },
];

export const timelineClear: TimelineStage[] = [
  {
    subheading: "Within 30 minutes",
    heading: "Fog lifts, thinking sharpens",
    body: "Glutathione and vitamin C dampen oxidative stress. You'll feel the fog lift and complex tasks get easier from the first use.",
  },
  {
    subheading: "Week 1-2",
    heading: "Antioxidant capacity builds",
    body: "Glutathione and NAC build in your system daily. You'll feel thinking get sharper and mental fatigue lighter.",
  },
  {
    subheading: "Month 1",
    heading: "Cognitive clarity established",
    body: "The antioxidant and nootropic stack compounds. You'll feel mental clarity and focus reliably there, not just a short-lived boost.",
  },
  {
    subheading: "2+ Months",
    heading: "Long-term cognitive support",
    body: "You're supporting clarity and brain health for the long term. Sharp thinking and balance maintained, not a quick fix.",
  },
];
