"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { CrossSellProps } from "./types";
import { VALID_PROTOCOL_IDS } from "./types";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import ProtocolCardMobile from "@/app/components/shop/ProtocolCardMobile";
import { FormulasShowcaseMobile } from "@/app/components/shop";

const OTHER_FORMULA: Record<string, { href: string; label: string }> = {
  "01": { href: "/conka-clarity", label: "Explore CONKA Clear" },
  "02": { href: "/conka-flow", label: "Explore CONKA Flow" },
};

export default function CrossSellMobile(props: CrossSellProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  if (props.variant === "protocol") {
    const otherIds = VALID_PROTOCOL_IDS.filter((id) => id !== props.currentProtocolId);
    return (
      <>
          <div className="text-center mb-4" style={{ marginBottom: "var(--premium-space-m)" }}>
            <h2
              className="premium-section-heading text-lg font-bold mb-1"
              style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
            >
              Explore Other Protocols
            </h2>
            <p className="premium-annotation text-sm opacity-70">
              find your perfect match
            </p>
            <div className="mt-4">
              <Link
                href="/quiz"
                className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth mt-4"
            style={{ gap: "var(--premium-space-m)", marginTop: "var(--premium-space-m)", WebkitOverflowScrolling: "touch" }}
            onScroll={() => {
              const el = carouselRef.current;
              if (!el) return;
              const cardWidth = el.offsetWidth * 0.8 + 16;
              const index = Math.min(
                otherIds.length - 1,
                Math.max(0, Math.round(el.scrollLeft / cardWidth))
              );
              setCarouselIndex(index);
            }}
          >
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
            {otherIds.map((id) => (
              <div key={id} className="w-[80vw] flex-shrink-0 snap-center">
                <ProtocolCardMobile
                  protocol={protocolSelectorData[id]}
                  isFirst={false}
                />
              </div>
            ))}
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {otherIds.map((id, idx) => (
              <div
                key={id}
                className={`w-2 h-2 rounded-full bg-current transition-opacity ${
                  carouselIndex === idx ? "opacity-100" : "opacity-20"
                }`}
                aria-hidden
              />
            ))}
          </div>
          <div className="mt-8" style={{ marginTop: "var(--premium-space-l)" }}>
            <FormulasShowcaseMobile />
          </div>
      </>
    );
  }

  // formula variant: primary CTA = Take the Quiz (same as protocol); secondary = Explore other formula
  const other = OTHER_FORMULA[props.currentFormulaId];

  return (
    <>
        <div className="text-center mb-4" style={{ marginBottom: "var(--premium-space-m)" }}>
          <h2
            className="premium-section-heading text-lg font-bold mb-1"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Explore Other Protocols
          </h2>
          <p className="premium-annotation text-sm opacity-70">
            find your perfect match
          </p>
          <div className="mt-4">
            <Link
              href="/quiz"
              className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Take the Quiz
            </Link>
          </div>
          {other && (
            <p className="premium-annotation text-sm opacity-70 mt-3">
              Want the complete experience?{" "}
              <Link
                href={other.href}
                className="underline hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded"
              >
                {other.label}
              </Link>
            </p>
          )}
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth mt-4"
          style={{ gap: "var(--premium-space-m)", marginTop: "var(--premium-space-m)", WebkitOverflowScrolling: "touch" }}
          onScroll={() => {
            const el = carouselRef.current;
            if (!el) return;
            const cardWidth = el.offsetWidth * 0.8 + 16;
            const index = Math.min(
              VALID_PROTOCOL_IDS.length - 1,
              Math.max(0, Math.round(el.scrollLeft / cardWidth))
            );
            setCarouselIndex(index);
          }}
        >
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
          {VALID_PROTOCOL_IDS.map((id) => (
            <div key={id} className="w-[80vw] flex-shrink-0 snap-center">
              <ProtocolCardMobile
                protocol={protocolSelectorData[id]}
                isFirst={false}
              />
            </div>
          ))}
          <div className="flex-shrink-0 w-4" aria-hidden="true" />
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {VALID_PROTOCOL_IDS.map((id, idx) => (
            <div
              key={id}
              className={`w-2 h-2 rounded-full bg-current transition-opacity ${
                carouselIndex === idx ? "opacity-100" : "opacity-20"
              }`}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-8" style={{ marginTop: "var(--premium-space-l)" }}>
          <FormulasShowcaseMobile />
        </div>
    </>
  );
}
