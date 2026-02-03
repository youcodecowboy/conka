"use client";

import Image from "next/image";
import ScienceHero from "./ScienceHero";
import SciencePillars from "./SciencePillars";
import SynergyChart from "./SynergyChart";
import EvidenceSummary from "./EvidenceSummary";

export default function SciencePageMobile() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ScienceHero isMobile={true} />

      {/* Quote Section */}
      <div className="px-4 py-8">
        <div className="neo-box p-6">
          <div className="flex gap-4">
            <div className="w-1 bg-amber-500 flex-shrink-0"></div>
            <div>
              <p className="font-commentary text-lg leading-relaxed">
                &ldquo;The brain is the most complex organ in the known
                universe. It deserves ingredients backed by rigorous
                science.&rdquo;
              </p>
              <p className="font-clinical text-xs opacity-70 mt-3">
                - The CONKA Research Philosophy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Are Adaptogens Section */}
      <div className="px-4 py-8 bg-current/5">
        {/* Image First on Mobile */}
        <div className="neo-box overflow-hidden mb-6">
          <div className="aspect-video relative">
            <Image
              src="/CONKA_07.jpg"
              alt="Adaptogenic herbs"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-clinical text-xs opacity-70 mb-1">
                CONKA Flow Contains
              </p>
              <p className="font-bold text-lg">3 Research-Backed Adaptogens</p>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div>
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            Understanding The Basics
          </p>
          <h2 className="text-2xl font-bold mb-4">What Are Adaptogens?</h2>
          <div className="space-y-3 text-sm opacity-80">
            <p>
              Adaptogens are a unique class of natural compounds that help your
              body &ldquo;adapt&rdquo; to stress. Unlike stimulants that force a
              response, adaptogens work by normalizing physiological functions.
            </p>
            <p>
              The term was coined by Soviet scientist Dr. Nikolai Lazarev in
              1947. Modern research has validated their effects on the HPA axis.
            </p>
            <p>
              Key adaptogens in our formulas include{" "}
              <strong>Ashwagandha</strong>, <strong>Rhodiola rosea</strong>, and{" "}
              <strong>Lemon Balm</strong>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
              HPA Axis Modulation
            </span>
            <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
              Cortisol Regulation
            </span>
            <span className="font-clinical text-xs px-3 py-1.5 border-2 border-current/20 rounded-full">
              Non-Sedating
            </span>
          </div>
        </div>
      </div>

      {/* The Five Pillars */}
      <SciencePillars isMobile={true} />

      {/* Synergy Chart */}
      <SynergyChart isMobile={true} />

      {/* How We're Different Section */}
      <div className="px-4 py-8">
        <div className="text-center mb-6">
          <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
            Our Approach
          </p>
          <h2 className="text-2xl font-bold">What Makes CONKA Different</h2>
        </div>

        <div className="space-y-4">
          {/* Card 1 */}
          <div className="neo-box p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Clinical Dosing</h3>
                <p className="text-sm opacity-80">
                  Same doses proven effective in clinical trials, not underdosed
                  blends.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="neo-box p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">
                  Bioavailability First
                </h3>
                <p className="text-sm opacity-80">
                  Black pepper increases curcumin absorption by 2000%.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="neo-box p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base mb-1">Full Transparency</h3>
                <p className="text-sm opacity-80">
                  Every stat links to its PubMed source. Real science you can
                  verify.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <EvidenceSummary isMobile={true} />
    </div>
  );
}
