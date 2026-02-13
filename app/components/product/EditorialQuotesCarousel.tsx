"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import type { EditorialQuote } from "@/app/lib/editorialQuotesData";

const SECTION_TITLE = "What the press says";
const HERO_IMAGE_SRCS = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg"];
const CARD_MIN_HEIGHT = 220;

type StripItem =
  | { type: "quote"; quote: EditorialQuote }
  | { type: "hero"; src: string };

function buildStripItems(quotes: EditorialQuote[]): StripItem[] {
  const items: StripItem[] = [];
  const max = Math.max(quotes.length, HERO_IMAGE_SRCS.length);
  for (let i = 0; i < max; i++) {
    if (i < quotes.length) items.push({ type: "quote", quote: quotes[i] });
    if (i < HERO_IMAGE_SRCS.length)
      items.push({ type: "hero", src: HERO_IMAGE_SRCS[i] });
  }
  return items;
}

interface EditorialQuotesCarouselProps {
  quotes: EditorialQuote[];
}

function QuoteCard({ quote }: { quote: EditorialQuote }) {
  return (
    <div
      className="flex flex-col h-full bg-white p-[var(--premium-space-m)] text-black overflow-hidden"
      style={{
        borderRadius: "var(--premium-radius-card)",
        minHeight: `${CARD_MIN_HEIGHT}px`,
      }}
    >
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        <p className="premium-body-sm leading-relaxed">
          &ldquo;{quote.quote}&rdquo;
        </p>
      </div>
      <div className="flex-shrink-0 flex items-center justify-center pt-[var(--premium-space-m)]">
        {quote.publicationLogoUrl ? (
          <div className="relative h-6 w-20 object-contain">
            <Image
              src={quote.publicationLogoUrl}
              alt={quote.publicationName}
              fill
              className="object-contain object-center"
              sizes="80px"
            />
          </div>
        ) : (
          <span className="premium-data text-xs font-medium opacity-80">
            {quote.publicationName}
          </span>
        )}
      </div>
    </div>
  );
}

function HeroCard({ src }: { src: string }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[var(--color-premium-bg-soft)]"
      style={{ borderRadius: "var(--premium-radius-card)" }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center scale-125"
        sizes="(max-width: 1024px) 85vw, 360px"
      />
    </div>
  );
}

export default function EditorialQuotesCarousel({
  quotes,
}: EditorialQuotesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (quotes.length === 0) return null;

  const items = buildStripItems(quotes);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || items.length === 0) return;

    const updateActiveIndex = () => {
      const { scrollLeft, clientWidth } = el;
      const children = el.children;
      if (children.length === 0) return;
      for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i] as HTMLElement;
        if (child.offsetLeft <= scrollLeft + clientWidth / 2) {
          setActiveIndex(i);
          return;
        }
      }
      setActiveIndex(0);
    };

    updateActiveIndex();
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [items.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;
    (el.children[index] as HTMLElement).scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <>
      <h2
        className="premium-section-heading mb-[var(--space-header-gap)]"
        style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
      >
        {SECTION_TITLE}
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-[var(--premium-space-xl)] overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="region"
        aria-label="Editorial quotes and imagery – scroll to view all"
      >
        {items.map((item, index) => (
          <div
            key={item.type === "quote" ? item.quote.id : `hero-${index}`}
            className="flex-shrink-0 w-[85vw] max-w-[320px] lg:w-[360px] lg:max-w-[360px] h-[220px] snap-center"
          >
            {item.type === "quote" ? (
              <QuoteCard quote={item.quote} />
            ) : (
              <div className="relative w-full h-full">
                <HeroCard src={item.src} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination dots – light, visible on dark section; mobile only */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6 lg:hidden" role="tablist" aria-label="Carousel position">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "bg-white opacity-100 scale-125"
                  : "bg-white opacity-30 hover:opacity-50"
              }`}
              aria-label={`Go to item ${index + 1}`}
              aria-selected={activeIndex === index}
            />
          ))}
        </div>
      )}
    </>
  );
}
