import Image from "next/image";
import { StorySection as StorySectionType } from "@/app/lib/storyData";

interface StorySectionProps {
  section: StorySectionType;
  totalSections: number;
}

export function StorySection({
  section,
  totalSections,
}: StorySectionProps) {
  const formattedId = section.id.toString().padStart(2, "0");
  const isEven = section.id % 2 === 0;

  return (
    <div
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20"
      data-section-id={section.id}
    >
      {/* Content Side */}
      <div
        className={`flex-1 flex flex-col justify-center ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="brand-caption text-black/40 mb-4 lg:mb-6 tracking-widest">
          {formattedId} / {totalSections.toString().padStart(2, "0")}
        </div>

        <div className="mb-6 lg:mb-8">
          <h2 className="brand-h2 mb-0 tracking-tight">
            {section.headline}
          </h2>
          {section.subtitle && (
            <p className="brand-body text-lg lg:text-2xl mt-2 text-black/60">
              {section.subtitle}
            </p>
          )}
        </div>

        <p
          className="brand-body text-base lg:text-lg text-black/80"
          style={{
            maxWidth: "var(--brand-body-max-width)",
            lineHeight: "var(--brand-body-leading)",
          }}
        >
          {section.body}
        </p>

        {section.quote && (
          <div className="mt-8 lg:mt-10 border-l-4 border-[var(--brand-accent)] pl-5 lg:pl-6">
            <blockquote className="brand-body text-lg lg:text-xl italic text-black/80 mb-3">
              &ldquo;{section.quote.text}&rdquo;
            </blockquote>
            <div className="brand-caption text-black/60">
              <span className="font-semibold">{section.quote.author}</span>
              <span className="mx-2">&bull;</span>
              <span>{section.quote.role}</span>
            </div>
          </div>
        )}
      </div>

      {/* Image Side */}
      <div
        className={`flex-1 w-full ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {section.image ? (
          <div
            className="relative w-full h-56 lg:h-[500px] overflow-hidden"
            style={{ borderRadius: "var(--brand-radius-card)" }}
          >
            <Image
              src={section.image}
              alt={section.headline}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <div
            className="w-full h-56 lg:h-[500px] border-2 border-dashed flex items-center justify-center border-black/20"
            style={{ borderRadius: "var(--brand-radius-card)" }}
          >
            <span className="brand-caption text-center px-4 text-black/40">
              {section.imagePlaceholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StorySection;
