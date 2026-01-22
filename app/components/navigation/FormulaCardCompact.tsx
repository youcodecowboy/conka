"use client";

import Link from "next/link";
import Image from "next/image";
import { FormulaShowcaseData } from "@/app/components/shop/formulasShowcaseData";

interface FormulaCardCompactProps {
  formula: FormulaShowcaseData;
  onNavigate?: () => void;
}

export default function FormulaCardCompact({
  formula,
  onNavigate,
}: FormulaCardCompactProps) {
  return (
    <Link
      href={formula.href}
      onClick={onNavigate}
      className="group block"
    >
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-[3/2] mb-4 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-current transition-all bg-[var(--background)]">
          <Image
            src={formula.image.src}
            alt={formula.image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-120"
            style={{
              objectPosition: `${formula.image.focalX}% ${formula.image.focalY}%`,
            }}
            sizes="50vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-white">
            <h4 className="font-bold text-lg mb-3 text-center">{formula.name}</h4>
            <p className="text-sm font-clinical opacity-90 mb-4 text-center leading-relaxed">
              {formula.description}
            </p>
            <ul className="space-y-2 text-sm font-clinical">
              {formula.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
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
                    className="flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col">
          {/* Badge + Name + Tagline */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className={`w-10 h-10 ${formula.bgColor} text-white rounded-md flex items-center justify-center flex-shrink-0`}
            >
              <span className="font-clinical text-sm font-bold">
                {formula.id}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-1">{formula.name}</h4>
              <p className="font-clinical text-base opacity-70 mb-4">
                {formula.subtitle}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <div className="neo-button px-6 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2 w-full justify-center">
              Shop {formula.name}
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
