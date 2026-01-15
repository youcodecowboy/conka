"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formulas, FormulaShowcaseData } from "./formulasShowcaseData";
import { FormulaId } from "@/app/lib/productData";

// Desktop Formula Card with Hover Overlay
function FormulaPanel({ formula }: { formula: FormulaShowcaseData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Image Container with Hover Overlay */}
      <div
        className="relative aspect-[3/4] rounded-lg overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Image
          src={formula.image.src}
          alt={formula.image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{
            objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
          }}
          sizes="50vw"
          priority
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-[var(--background)] flex flex-col justify-center p-8 transition-all duration-300 ${
            isHovered ? "opacity-95" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Description */}
          <p className="text-base mb-6 leading-relaxed opacity-90">
            {formula.description}
          </p>

          {/* All 3 Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {formula.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: formula.accentColor }}
                >
                  {stat.value}
                </p>
                <p className="font-clinical text-xs font-semibold mb-1">
                  {stat.label}
                </p>
                <p className="font-clinical text-[10px] opacity-60 leading-tight">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Key Points */}
          <ul className="space-y-2">
            {formula.keyPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 font-clinical text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: formula.accentColor }}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hover Indicator (visible in default state) */}
        <div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)] border-2 border-[var(--foreground)] transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-80"
          }`}
        >
          <span className="font-clinical text-xs">Hover for details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
      </div>

      {/* Content Section (Always Visible) */}
      <div className="pt-6 flex-1 flex flex-col">
        {/* Product Name and Tagline */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`w-10 h-10 ${formula.bgColor} text-white rounded-md flex items-center justify-center flex-shrink-0`}
          >
            <span className="font-clinical text-sm font-bold">
              {formula.id}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold">{formula.name}</h3>
            <p className="font-commentary text-lg opacity-80">
              {formula.subtitle}
            </p>
          </div>
        </div>

        {/* Top 2 Key Stats (Concise) */}
        <div className="flex gap-6 mb-6">
          {formula.stats.slice(0, 2).map((stat, idx) => (
            <div key={idx} className="flex items-baseline gap-2">
              <span
                className="text-xl font-bold"
                style={{ color: formula.accentColor }}
              >
                {stat.value}
              </span>
              <span className="font-clinical text-xs opacity-70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            href={formula.href}
            className="neo-button px-8 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 w-full justify-center"
          >
            Shop {formula.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FormulasShowcaseDesktop() {
  return (
    <section className="px-16 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">
            Individual Formulas
          </h2>
          <p className="font-commentary text-base md:text-lg opacity-70">
            build your own stack
          </p>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-2 gap-12">
          {formulas.map((formula) => (
            <FormulaPanel key={formula.id} formula={formula} />
          ))}
        </div>

        {/* Comparison note */}
        <div className="mt-12 text-center">
          <p className="font-commentary text-lg opacity-70">
            both formulas work together synergistically
          </p>
        </div>
      </div>
    </section>
  );
}
