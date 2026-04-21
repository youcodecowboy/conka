"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  AthleteData,
  SportCategory,
  getAthletesForFormula,
  getAthletesForProtocol,
  getCaseStudyPhotoPath,
} from "@/app/lib/caseStudiesData";
import type { ProductId, FormulaId, ProtocolId } from "@/app/lib/productData";
import ConkaCTAButton from "./landing/ConkaCTAButton";

interface FormulaCaseStudiesProps {
  formulaId?: FormulaId;
  productId?: ProductId;
  athletes?: AthleteData[];
}

const SPORT_LABELS: Record<SportCategory, string> = {
  rugby: "RUGBY UNION",
  rugby7s: "RUGBY 7s",
  football: "FOOTBALL",
  motorsport: "MOTORSPORT",
  business: "BUSINESS",
  other: "OTHER",
};

const STAT_KEYS = ["Total Score", "Accuracy", "Speed"] as const;
const STAT_ABBR: Record<(typeof STAT_KEYS)[number], string> = {
  "Total Score": "TOT",
  Accuracy: "ACC",
  Speed: "SPD",
};

function productLabel(v?: AthleteData["productVersion"]): string {
  if (v === "01") return "FLOW";
  if (v === "02") return "CLEAR";
  if (v === "both") return "FLOW · CLEAR";
  return "—";
}

function getStat(athlete: AthleteData, key: (typeof STAT_KEYS)[number]) {
  return athlete.improvements.find((i) => i.metric === key);
}

function AthleteSpecCard({ athlete }: { athlete: AthleteData }) {
  const [bioOpen, setBioOpen] = useState(false);
  const photoSrc = getCaseStudyPhotoPath(athlete.id) || athlete.photo || "";
  const focal = athlete.focalPoint ?? { x: 50, y: 50 };

  return (
    <div className="flex flex-col bg-white border border-black/12 overflow-hidden h-full">
      {/* Photo */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--brand-surface)]">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={athlete.name}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{ objectPosition: `${focal.x}% ${focal.y}%` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-black/30">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Photo
            </span>
          </div>
        )}
      </div>

      {/* Spec band */}
      <div className="flex flex-col flex-1 p-4 lg:p-5">
        {/* Identity */}
        <div className="mb-4">
          <p className="text-base font-semibold text-black leading-tight">
            {athlete.name}
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/50 mt-1 leading-tight">
            {SPORT_LABELS[athlete.sport]}
            {athlete.position ? ` · ${athlete.position.toUpperCase()}` : ""}
          </p>
        </div>

        {/* 3-metric grid — hero data */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-black/8">
          {STAT_KEYS.map((key) => {
            const stat = getStat(athlete, key);
            return (
              <div key={key} className="flex flex-col items-start gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/40 leading-none">
                  {STAT_ABBR[key]}
                </span>
                <span className="font-mono text-2xl lg:text-3xl font-bold tabular-nums text-black leading-none">
                  {stat?.value ?? "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bio with expand */}
        {athlete.description ? (
          <div className="pt-3">
            <p
              className={`text-xs leading-relaxed text-black/60 ${
                !bioOpen ? "line-clamp-2" : ""
              }`}
            >
              {athlete.description}
            </p>
            <button
              type="button"
              onClick={() => setBioOpen((p) => !p)}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/60 mt-2 underline decoration-black/20 underline-offset-2 hover:decoration-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1"
            >
              {bioOpen ? "Show less" : "Read more"}
            </button>
          </div>
        ) : null}

        {/* Footer: product + tests */}
        <div className="mt-auto flex items-start justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/40 leading-none">
              Product
            </p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-black mt-1 leading-none truncate">
              {productLabel(athlete.productVersion)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/40 leading-none">
              Tests
            </p>
            <p className="font-mono text-[10px] font-bold tabular-nums text-black mt-1 leading-none">
              N={athlete.testsCompleted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FormulaCaseStudies({
  formulaId,
  productId,
}: FormulaCaseStudiesProps) {
  let athletes: AthleteData[] = [];

  if (productId) {
    if (
      productId === "1" ||
      productId === "2" ||
      productId === "3" ||
      productId === "4"
    ) {
      athletes = getAthletesForProtocol(productId as ProtocolId);
    } else if (productId === "01" || productId === "02") {
      athletes = getAthletesForFormula(productId as FormulaId);
    }
  } else if (formulaId) {
    athletes = getAthletesForFormula(formulaId);
  } else {
    throw new Error(
      "FormulaCaseStudies requires either formulaId or productId",
    );
  }

  if (athletes.length === 0) return null;

  return (
    <>
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          Verified Results · Measured Outcomes
        </p>
        <h2
          className="brand-h1 mb-2 text-black"
          style={{ letterSpacing: "-0.02em" }}
        >
          CONKA Case Studies
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          {athletes.length} Athletes · Real data · Measured improvement
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {athletes.map((athlete) => (
          <AthleteSpecCard key={athlete.id} athlete={athlete} />
        ))}
      </div>

      <div className="mt-10 flex justify-start">
        <ConkaCTAButton href="/case-studies" meta="// all measured outcomes">
          View All Case Studies
        </ConkaCTAButton>
      </div>
    </>
  );
}

export function FormulaCaseStudiesMobile({
  formulaId,
  productId,
  athletes: providedAthletes,
}: FormulaCaseStudiesProps) {
  let athletes: AthleteData[] = [];

  if (providedAthletes) {
    athletes = providedAthletes;
  } else if (productId) {
    if (
      productId === "1" ||
      productId === "2" ||
      productId === "3" ||
      productId === "4"
    ) {
      athletes = getAthletesForProtocol(productId as ProtocolId);
    } else if (productId === "01" || productId === "02") {
      athletes = getAthletesForFormula(productId as FormulaId);
    }
  } else if (formulaId) {
    athletes = getAthletesForFormula(formulaId);
  }

  const caseStudiesCarouselRef = useRef<HTMLDivElement>(null);
  const [caseStudiesCarouselIndex, setCaseStudiesCarouselIndex] = useState(0);

  if (athletes.length === 0) return null;

  return (
    <>
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
          Verified Results · Measured Outcomes
        </p>
        <h2
          className="brand-h1 mb-2 text-black"
          style={{ letterSpacing: "-0.02em" }}
        >
          CONKA Case Studies
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/50 tabular-nums">
          {athletes.length} Athletes · Real data · Measured improvement
        </p>
      </header>

      {/* Swipeable horizontal carousel */}
      <div
        ref={caseStudiesCarouselRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="region"
        aria-label="CONKA case studies - swipe to view all"
        onScroll={() => {
          const el = caseStudiesCarouselRef.current;
          if (!el) return;
          const cardWidth = el.offsetWidth * 0.75 + 16;
          const index = Math.min(
            athletes.length - 1,
            Math.max(0, Math.round(el.scrollLeft / cardWidth)),
          );
          setCaseStudiesCarouselIndex(index);
        }}
      >
        {athletes.map((athlete) => (
          <div
            key={athlete.id}
            className="flex-shrink-0 w-[75vw] max-w-[280px] snap-center"
          >
            <AthleteSpecCard athlete={athlete} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {athletes.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 transition-all ${
              caseStudiesCarouselIndex === idx
                ? "bg-black w-6"
                : "bg-black/25 w-1.5"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <div className="mt-10 flex justify-start">
        <ConkaCTAButton href="/case-studies" meta="// all measured outcomes">
          View All Case Studies
        </ConkaCTAButton>
      </div>
    </>
  );
}
