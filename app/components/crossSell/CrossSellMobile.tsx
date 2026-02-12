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
      <section
        className="w-full px-3 py-8"
        aria-label="Explore other protocols and formulas"
      >
        <div className="w-full">
          <div className="text-center mb-4">
            <h2 className="premium-section-heading text-lg font-bold mb-1">
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
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth -mx-3 px-3 mt-4"
            style={{ WebkitOverflowScrolling: "touch" }}
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
          <div className="mt-8">
            <FormulasShowcaseMobile />
          </div>
        </div>
      </section>
    );
  }

  // formula variant
  const other = OTHER_FORMULA[props.currentFormulaId];
  const subtext =
    props.currentFormulaId === "01"
      ? "combine CONKA Flow with CONKA Clear in a protocol"
      : "combine CONKA Clear with CONKA Flow in a protocol";

  return (
    <section
      className="w-full px-3 py-8"
      aria-label="Explore protocols and other formulas"
    >
      <div className="w-full">
        <div className="text-center mb-4">
          <h2 className="premium-section-heading text-lg font-bold mb-1">
            Want the Complete Experience?
          </h2>
          <p className="premium-annotation text-sm opacity-70 mb-4">
            {subtext}
          </p>
          {other && (
            <Link
              href={other.href}
              className="inline-block px-6 py-3 rounded-full border-2 border-black font-semibold text-sm hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              {other.label}
            </Link>
          )}
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth -mx-3 px-3 mt-4"
          style={{ WebkitOverflowScrolling: "touch" }}
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
        <div className="mt-8">
          <FormulasShowcaseMobile />
        </div>
      </div>
    </section>
  );
}
