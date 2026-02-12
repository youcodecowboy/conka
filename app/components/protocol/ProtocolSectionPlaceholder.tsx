"use client";

interface ProtocolSectionPlaceholderProps {
  id: string;
  title: string;
  description?: string;
}

export default function ProtocolSectionPlaceholder({
  id,
  title,
  description,
}: ProtocolSectionPlaceholderProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      className="premium-section"
      aria-labelledby={headingId}
    >
      <div className="premium-container">
        <div className="premium-box p-6 md:p-8">
          <h2 id={headingId} className="premium-section-heading mb-2">
            {title}
          </h2>
          {description && (
            <p className="premium-annotation opacity-70">{description}</p>
          )}
          <p className="premium-data text-sm opacity-50 mt-2">
            This section is coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
