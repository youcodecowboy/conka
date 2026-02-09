"use client";

type PDPPlaceholderStep = 1 | 2 | 3 | 4 | 8;

interface PDPPlaceholderProps {
  step: PDPPlaceholderStep;
  title?: string;
  children?: React.ReactNode;
}

const STEP_CONFIG: Record<
  PDPPlaceholderStep,
  { defaultTitle: string; defaultContent: React.ReactNode }
> = {
  1: {
    defaultTitle: "Trusted by customers",
    defaultContent: (
      <p className="font-clinical text-sm opacity-70">
        Star rating & reviews — section coming soon.
      </p>
    ),
  },
  2: {
    defaultTitle: "The problem it solves",
    defaultContent: (
      <p className="font-primary">Section copy coming soon.</p>
    ),
  },
  3: {
    defaultTitle: "What this actually does",
    defaultContent: (
      <ul className="list-disc list-inside space-y-2 font-primary">
        <li>Outcome placeholder 1</li>
        <li>Outcome placeholder 2</li>
        <li>Outcome placeholder 3</li>
        <li>Section coming soon.</li>
      </ul>
    ),
  },
  4: {
    defaultTitle: "What to expect over time",
    defaultContent: (
      <p className="font-primary">
        Days / Week 1 / Weeks 2–4 / longer term — section coming soon.
      </p>
    ),
  },
  8: {
    defaultTitle: "Why CONKA over alternatives",
    defaultContent: (
      <p className="font-primary">Section coming soon.</p>
    ),
  },
};

export default function PDPPlaceholder({
  step,
  title,
  children,
}: PDPPlaceholderProps) {
  const config = STEP_CONFIG[step];
  const heading = title ?? config.defaultTitle;
  const content = children ?? config.defaultContent;

  return (
    <section className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="neo-box p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
          <div className="text-[var(--foreground)]">{content}</div>
        </div>
      </div>
    </section>
  );
}
