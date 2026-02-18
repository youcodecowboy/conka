"use client";

import useIsMobile from "../hooks/useIsMobile";
import KeyBenefitsDesktop from "./KeyBenefitsDesktop";
import KeyBenefitsMobile from "./KeyBenefitsMobile";

export interface Benefit {
  id: string;
  title: string;
  icon?: React.ReactNode; // SVG icon component
  stat: string;
  annotation: string;
  struggle: string; // the felt problem (1–2 sentences)
  outcome: string; // the felt result in plain English
  description: string; // mechanism/how it works
  ingredientAsset: {
    image: string; // path e.g. "/ingredients/flow/lemon-balm.jpg"
    name: string; // e.g. "Lemon Balm Extract"
    dosage: string; // e.g. "300mg per serving"
  };
  clinicalBreakdown?: {
    study: string;
    participants: string;
    duration: string;
    results: string[];
  };
}

// Key Benefits Data - All stats from verified PubMed studies. Ingredient images: flow (ashwagandha, lemon-balm, turmeric), clear (glutathione).
export const keyBenefits: Benefit[] = [
  {
    id: "focus",
    title: "Improved Focus",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    stat: "+18%",
    annotation: "PMID: 12888775 — Lemon Balm",
    struggle:
      "Can't stay locked in for more than 20 minutes? Your brain needs fuel, not stimulants.",
    outcome:
      "Sustained concentration without the jittery edge. Think clearly under pressure. Remember what you read the first time.",
    description:
      "Balance alertness with tranquility for sustained concentration",
    ingredientAsset: {
      image: "/ingredients/flow/lemon-balm.webp",
      name: "Lemon Balm Extract",
      dosage: "300mg per serving",
    },
    clinicalBreakdown: {
      study: "Kennedy et al. 2003, Neuropsychopharmacology",
      participants: "20 healthy young adults",
      duration: "Single doses with 7-day intervals",
      results: [
        "+18% improvement in memory performance",
        "+15% increase in calmness scores",
        "Enhanced acetylcholine receptor activity",
        "P<0.05 statistical significance",
      ],
    },
  },
  {
    id: "sleep",
    title: "Better Sleep Quality",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    stat: "+42%",
    annotation: "PMID: 32021735 — Ashwagandha",
    struggle:
      "Lying awake replaying your day? Your nervous system won't switch off.",
    outcome:
      "Fall asleep faster. Stay asleep longer. Wake up actually rested, not just less tired.",
    description: "Improved sleep quality and reduced time to fall asleep",
    ingredientAsset: {
      image: "/ingredients/flow/ashwagandha.webp",
      name: "KSM-66® Ashwagandha",
      dosage: "600mg per serving",
    },
    clinicalBreakdown: {
      study: "Salve et al. 2019, Cureus",
      participants: "58 healthy adults",
      duration: "8 weeks",
      results: [
        "+42% improvement in sleep quality",
        "Reduced morning cortisol levels",
        "Improved stress resistance",
        "Enhanced quality of life scores",
      ],
    },
  },
  {
    id: "brain-fog",
    title: "Reduced Brain Fog",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    stat: "+40%",
    annotation: "PMID: 29559699 — Glutathione",
    struggle:
      "Feeling like you're thinking through fog? That's oxidative stress slowing you down.",
    outcome:
      "Sharp mornings. Clear afternoons. No 3pm wall. Your brain clears, your words come faster.",
    description: "Clear cellular waste and keep your mind responsive",
    ingredientAsset: {
      image: "/ingredients/clear/glutathione.webp",
      name: "Reduced Glutathione",
      dosage: "250mg per serving",
    },
    clinicalBreakdown: {
      study: "Sinha et al. 2018, European Journal of Clinical Nutrition",
      participants: "12 healthy adults",
      duration: "4 weeks",
      results: [
        "+40% increase in blood glutathione levels",
        "2x enhancement in NK cell activity",
        "Improved lymphocyte proliferation",
        "Enhanced immune function markers",
      ],
    },
  },
  {
    id: "stress",
    title: "Stress Resilience",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    stat: "-56%",
    annotation: "PMID: 23439798 — Ashwagandha",
    struggle:
      "One bad email ruins your whole morning? Stress shouldn't control your day.",
    outcome:
      "Pressure doesn't rattle you. Deadlines don't drain you. You respond, you don't react.",
    description: "Reduce cortisol and build natural stress resistance",
    ingredientAsset: {
      image: "/ingredients/flow/ashwagandha.webp",
      name: "KSM-66® Ashwagandha",
      dosage: "600mg per serving",
    },
    clinicalBreakdown: {
      study:
        "Chandrasekhar et al. 2012, Indian Journal of Psychological Medicine",
      participants: "64 subjects with chronic stress",
      duration: "60 days",
      results: [
        "-56% reduction in stress assessment scores",
        "-28% decrease in serum cortisol levels",
        "P<0.0001 statistical significance",
        "Improved quality of life measures",
      ],
    },
  },
  {
    id: "memory",
    title: "Improve Memory",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    stat: "+63%",
    annotation: "PMID: 29246725 — Turmeric",
    struggle:
      "Forgetting names two minutes after hearing them? Your brain isn't broken — it's under-resourced.",
    outcome:
      "Retain what you learn. Recall it when you need it. Connect ideas faster. Your brain works for you, not against you.",
    description: "Enhanced neuroplasticity and memory formation",
    ingredientAsset: {
      image: "/ingredients/flow/turmeric.jpg",
      name: "Longvida® Curcumin",
      dosage: "400mg per serving",
    },
    clinicalBreakdown: {
      study:
        "Small et al. 2018, American Journal of Geriatric Psychiatry (UCLA)",
      participants: "40 non-demented adults aged 51-84",
      duration: "18 months",
      results: [
        "+63% improvement in memory (SRT)",
        "+96% improvement in attention",
        "Reduced brain amyloid and tau accumulation",
        "P<0.0001 statistical significance",
      ],
    },
  },
];

interface KeyBenefitsProps {
  benefits: Benefit[];
}

export default function KeyBenefits({ benefits }: KeyBenefitsProps) {
  const isMobile = useIsMobile(1024); // lg breakpoint

  // Own text color so section/body defaults don't cascade into mixed-context areas (e.g. selected tile).
  const contentClass = "text-[var(--color-ink)]";

  // Render mobile version on smaller viewports
  if (isMobile) {
    return (
      <div className={contentClass}>
        <KeyBenefitsMobile benefits={benefits} />
      </div>
    );
  }

  // Render desktop version on larger viewports
  return (
    <div className={contentClass}>
      <KeyBenefitsDesktop benefits={benefits} />
    </div>
  );
}
