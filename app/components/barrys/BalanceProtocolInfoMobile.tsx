"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { testimonials, shuffleTestimonials } from "@/app/lib/testimonialsData";

const Testimonials = dynamic(
  () => import("@/app/components/testimonials/Testimonials"),
  {
    loading: () => <div className="h-[500px]" />,
  },
);

const benefits = [
  {
    title: "Stress resilience",
    stat: "-56%",
    statLabel: "stress scores",
    pmid: "PMID: 23439798",
  },
  {
    title: "Cognitive enhancement",
    stat: "+63%",
    statLabel: "memory",
    pmid: "PMID: 29246725",
  },
  {
    title: "Sustained energy",
    stat: "+17%",
    statLabel: "fitness",
    pmid: "PMID: 10839209",
  },
  {
    title: "Mental clarity & detox",
    stat: "+40%",
    statLabel: "GSH",
    pmid: "PMID: 29559699",
  },
];

export default function BalanceProtocolInfoMobile() {
  const [shuffledTestimonials, setShuffledTestimonials] = useState<
    typeof testimonials
  >([]);

  // Shuffle testimonials on client side only to avoid hydration mismatch
  useEffect(() => {
    setShuffledTestimonials(shuffleTestimonials(testimonials));
  }, []);

  return (
    <section className="px-6 py-12 border-t-2 border-current/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            What to Expect with the Balance Protocol
          </h2>
          <p className="font-clinical text-sm opacity-70">
            For those who want clarity and focus in equal measure
          </p>
        </div>

        {/* Situational Context */}
        <div className="mb-8 text-center">
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            Commonly chosen when
          </p>
          <p className="font-primary text-base opacity-80">
            Training hard • thinking hard • recovery matters
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="neo-box p-4 flex flex-col items-center text-center"
            >
              {/* Large Stat */}
              <div className="mb-2">
                <div className="font-clinical text-4xl font-bold text-teal-600 mb-1">
                  {benefit.stat}
                </div>
                <div className="font-clinical text-xs uppercase tracking-widest opacity-70">
                  {benefit.statLabel}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm mb-1 leading-tight">
                {benefit.title}
              </h3>

              {/* PMID */}
              <p className="font-clinical text-xs opacity-60 mt-auto">
                {benefit.pmid}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-8">
          <Link
            href="/protocol/3"
            className="neo-button px-8 py-4 font-bold text-base w-full flex items-center justify-center gap-2"
          >
            View Product
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

      {/* Testimonials Section - Outside max-w-6xl to allow full width */}
      {shuffledTestimonials.length > 0 && (
        <div className="mt-8">
          <Testimonials testimonials={shuffledTestimonials} />
        </div>
      )}
    </section>
  );
}
