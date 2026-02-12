/**
 * Protocol Synergy Copy — Why Two Formulas Work Better Than One
 *
 * Simplified for hero-style strip. Copy is structured so legal/compliance
 * can review and mechanisms can be plugged in without touching component code.
 */

export interface ScientificReference {
  author: string;
  year: string;
  journal: string;
}

export interface ProtocolSynergyCopy {
  framing: {
    headline: string;
    subheadline: string;
    introParagraph: string;
  };
  diagramImagePath: string;
  mechanisms: {
    flow: {
      title: string;
      description: string;
      keyPoints: string[];
    };
    clear: {
      title: string;
      description: string;
      keyPoints: string[];
    };
  };
  synergy: {
    title: string;
    description: string;
  };
  outcomeTranslation: string[];
  references: ScientificReference[];
}

export const protocolSynergyCopy: ProtocolSynergyCopy = {
  framing: {
    headline: "Why Two Formulas Work Better Than One",
    subheadline: "Reduce pressure. Strengthen repair. Break the loop.",
    introParagraph:
      "CONKA Flow supports environmental regulation—helping maintain healthy stress signalling and antioxidant pathways. CONKA Clear strengthens cellular infrastructure—supporting glutathione synthesis and mitochondrial function. Together, they create a system that reduces load while improving capacity.",
  },
  diagramImagePath: "/protocols/FlowClearSynergyDiagram.png",
  mechanisms: {
    flow: {
      title: "Flow: Reduces Pressure",
      description:
        "Most supplements try to boost performance. Flow does something counterintuitive: it stabilizes the system that performance depends on. Think of it like turning down the heat so the system can cool naturally. Stress isn't the problem—unmanaged stress is. Flow reduces the load, creating space for your body's natural recovery processes to work.",
      keyPoints: [
        "Modulates stress response pathways",
        "Maintains antioxidant balance",
        "Reduces systemic pressure",
      ],
    },
    clear: {
      title: "Clear: Strengthens Repair",
      description:
        "Your cells already have the blueprint for recovery. What they need are the materials. Clear rebuilds the infrastructure—like repairing the foundation while the house stands. It doesn't add more complexity; it strengthens what's already there. When your cellular machinery runs efficiently, everything else follows.",
      keyPoints: [
        "Replenishes glutathione reserves",
        "Fuels mitochondrial function",
        "Rebuilds cellular repair capacity",
      ],
    },
  },
  synergy: {
    title: "Together: Break the Cycle",
    description:
      "Flow reduces load while Clear improves capacity. Together, they create a system that breaks the problem cycle—reducing pressure while strengthening repair mechanisms.",
  },
  outcomeTranslation: [
    "Sustained mental clarity under pressure",
    "Stable, consistent energy throughout the day",
    "Greater resilience to stress and demanding periods",
    "Faster, more efficient recovery between challenges",
  ],
  references: [
    { author: "Panossian et al.", year: "2010", journal: "Phytomedicine" },
    { author: "Darbinyan et al.", year: "2000", journal: "Phytomedicine" },
    { author: "Jurenka", year: "2009", journal: "Alternative Medicine Review" },
    { author: "Hewlings & Kalman", year: "2017", journal: "Foods" },
    {
      author: "Kensler et al.",
      year: "2007",
      journal: "Annual Review of Pharmacology and Toxicology",
    },
    {
      author: "Atkuri et al.",
      year: "2007",
      journal: "Current Opinion in Pharmacology",
    },
    {
      author: "Packer et al.",
      year: "1995",
      journal: "Free Radical Biology and Medicine",
    },
    { author: "Hellhammer et al.", year: "2004", journal: "Nutrition" },
    { author: "Mori et al.", year: "2009", journal: "Phytotherapy Research" },
  ],
};
