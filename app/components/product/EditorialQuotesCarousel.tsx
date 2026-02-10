"use client";

import Image from "next/image";
import type { EditorialQuote } from "@/app/lib/editorialQuotesData";

interface EditorialQuotesCarouselProps {
  quotes: EditorialQuote[];
}

function QuoteCard({ quote }: { quote: EditorialQuote }) {
  return (
    <div className="flex flex-col h-full min-h-[220px] rounded-2xl bg-[var(--premium-surface)] p-[var(--premium-space-m)] text-black">
      {/* Text section: quote centered vertically */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <p className="premium-body text-lg md:text-xl leading-relaxed">
          &ldquo;{quote.quote}&rdquo;
        </p>
      </div>
      {/* Logo section: central, at bottom of card */}
      <div className="flex-shrink-0 flex items-center justify-center pt-[var(--premium-space-m)]">
        {quote.publicationLogoUrl ? (
          <div className="relative h-8 w-24 object-contain">
            <Image
              src={quote.publicationLogoUrl}
              alt={quote.publicationName}
              fill
              className="object-contain object-center"
              sizes="96px"
            />
          </div>
        ) : (
          <span className="premium-data text-sm font-medium opacity-80">
            {quote.publicationName}
          </span>
        )}
      </div>
    </div>
  );
}

export default function EditorialQuotesCarousel({
  quotes,
}: EditorialQuotesCarouselProps) {
  if (quotes.length === 0) return null;

  return (
    <section
      className="premium-section bg-black text-white"
      aria-label="Editorial quotes"
    >
      <div className="premium-container">
        {/* Mobile: swipeable horizontal scroll – first item centered on mount */}
        <div
          className="flex gap-[var(--premium-space-m)] overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory -mx-[var(--premium-section-padding-x)] pl-[7.5vw] pr-[7.5vw] lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
          role="region"
          aria-label="Editorial quotes - swipe to view all"
        >
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="flex-shrink-0 w-[85vw] max-w-[320px] snap-center"
            >
              <QuoteCard quote={quote} />
            </div>
          ))}
        </div>
        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-[var(--premium-space-xl)]">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </div>
    </section>
  );
}
