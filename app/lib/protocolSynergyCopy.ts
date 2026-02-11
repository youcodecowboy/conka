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
        "CONKA Flow supports environmental regulation—helping maintain healthy stress signalling and antioxidant pathways. By reducing the load on your system, Flow creates space for repair.",
      keyPoints: [
        "Supports healthy stress response pathways",
        "Helps maintain antioxidant balance",
        "Reduces systemic pressure",
      ],
    },
    clear: {
      title: "Clear: Strengthens Repair",
      description:
        "CONKA Clear strengthens cellular infrastructure—supporting glutathione synthesis and mitochondrial function. Clear builds capacity for recovery.",
      keyPoints: [
        "Supports glutathione synthesis",
        "Strengthens mitochondrial function",
        "Builds cellular repair capacity",
      ],
    },
  },
  synergy: {
    title: "Together: Break the Cycle",
    description:
      "Flow reduces load while Clear improves capacity. Together, they create a system that breaks the problem cycle—reducing pressure while strengthening repair mechanisms.",
  },
  outcomeTranslation: [
    "May support sustained mental clarity under load",
    "Designed to support more stable energy production",
    "Helps maintain greater resilience to demanding periods",
    "Designed to support more efficient recovery cycles",
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
