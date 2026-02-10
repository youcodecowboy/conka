"use client";

type PDPPlaceholderStep = 3 | 8;

interface PDPPlaceholderProps {
  step: PDPPlaceholderStep;
  title?: string;
  children?: React.ReactNode;
}

const STEP_CONFIG: Record<
  PDPPlaceholderStep,
  { defaultTitle: string; defaultContent: React.ReactNode }
> = {
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
    <section className="premium-section">
      <div className="premium-container">
        <div className="premium-box p-6 md:p-8">
          <h2 className="premium-section-heading mb-4">{heading}</h2>
          <div className="text-[var(--foreground)]">{content}</div>
        </div>
      </div>
    </section>
  );
}
