"use client";

import Link from "next/link";
import type { CrossSellProps } from "./types";
import { VALID_PROTOCOL_IDS } from "./types";
import { protocolSelectorData } from "@/app/components/shop/protocolSelectorData";
import ProtocolCard from "@/app/components/shop/ProtocolCard";
import FormulasShowcase from "@/app/components/shop/FormulasShowcase";

export default function CrossSellDesktop(props: CrossSellProps) {
  if (props.variant === "protocol") {
    const otherIds = VALID_PROTOCOL_IDS.filter((id) => id !== props.currentProtocolId);
    return (
      <>
        <div className="text-center mb-12" style={{ marginBottom: "var(--premium-space-xl)" }}>
          <h2
            className="premium-section-heading text-2xl md:text-3xl font-bold mb-2"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Explore Other Protocols
          </h2>
            <p className="premium-annotation text-xl">
              find your perfect match
            </p>
            <div className="mt-6">
              <Link
                href="/quiz"
                className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Take the Quiz
              </Link>
            </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gap: "var(--premium-space-m)" }}>
            {otherIds.map((id) => (
              <ProtocolCard key={id} protocol={protocolSelectorData[id]} />
            ))}
          </div>
          <div className="mt-12" style={{ marginTop: "var(--premium-space-xl)" }}>
            <FormulasShowcase />
          </div>
      </>
    );
  }

  // formula variant: same CTA as protocol — Take the Quiz
  return (
    <>
        <div className="text-center mb-12" style={{ marginBottom: "var(--premium-space-xl)" }}>
          <h2
            className="premium-section-heading text-2xl md:text-3xl font-bold mb-2"
            style={{ letterSpacing: "var(--letter-spacing-premium-title)" }}
          >
            Explore Other Protocols
          </h2>
          <p className="premium-annotation text-xl">
            find your perfect match
          </p>
          <div className="mt-6">
            <Link
              href="/quiz"
              className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold text-base hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Take the Quiz
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ gap: "var(--premium-space-m)" }}>
          {VALID_PROTOCOL_IDS.map((id) => (
            <ProtocolCard key={id} protocol={protocolSelectorData[id]} />
          ))}
        </div>
        <div className="mt-12" style={{ marginTop: "var(--premium-space-xl)" }}>
          <FormulasShowcase excludeFormulaId={props.currentFormulaId} />
        </div>
    </>
  );
}
