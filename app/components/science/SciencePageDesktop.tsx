"use client";

import Image from "next/image";
import ScienceHero from "./ScienceHero";
import SciencePillars from "./SciencePillars";
import SynergyChart from "./SynergyChart";
import EvidenceSummary from "./EvidenceSummary";

export default function SciencePageDesktop() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <ScienceHero isMobile={false} />

      {/* Divider with Quote */}
      <div className="px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="neo-box p-8 flex items-center gap-8">
            <div className="w-1 h-24 bg-amber-500 flex-shrink-0"></div>
            <div>
              <p className="font-commentary text-2xl leading-relaxed">
                &ldquo;The brain is the most complex organ in the known
                universe. We believe it deserves ingredients backed by rigorous
                science, not marketing hype.&rdquo;
              </p>
              <p className="font-clinical text-sm opacity-70 mt-4">
                - The CONKA Research Philosophy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Are Adaptogens Section */}
      <div className="px-16 py-12 bg-current/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
                Understanding The Basics
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                What Are Adaptogens?
              </h2>
              <div className="space-y-4 text-base opacity-80">
                <p>
                  Adaptogens are a unique class of natural compounds that help
                  your body &ldquo;adapt&rdquo; to stress. Unlike stimulants
                  that force a response, adaptogens work by normalizing
                  physiological functions and maintaining homeostasis.
                </p>
                <p>
                  The term was coined by Soviet scientist Dr. Nikolai Lazarev in
                  1947, and these compounds have been used in traditional
                  medicine for thousands of years. Modern research has validated
                  their effects on the hypothalamic-pituitary-adrenal (HPA)
                  axis.
                </p>
                <p>
                  Key adaptogens in our formulas include{" "}
                  <strong>Ashwagandha</strong>, <strong>Rhodiola rosea</strong>,
                  and <strong>Lemon Balm</strong>, each clinically proven to
                  reduce cortisol and improve stress resilience.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
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
            {/* Visual */}
            <div className="neo-box overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/CONKA_07.jpg"
                  alt="Adaptogenic herbs"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-clinical text-xs opacity-70 mb-1">
                    CONKA Flow Contains
                  </p>
                  <p className="font-bold text-xl">
                    3 Research-Backed Adaptogens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Five Pillars */}
      <SciencePillars isMobile={false} />

      {/* Synergy Chart */}
      <SynergyChart isMobile={false} />

      {/* How We're Different Section */}
      <div className="px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-clinical text-xs uppercase tracking-widest opacity-50 mb-2">
              Our Approach
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold">
              What Makes CONKA Different
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="neo-box p-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-500 text-white flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Clinical Dosing</h3>
              <p className="text-sm opacity-80">
                We use the same doses proven effective in clinical trials, not
                underdosed &ldquo;proprietary blends&rdquo; that hide inadequate
                amounts.
              </p>
            </div>

            {/* Card 2 */}
            <div className="neo-box p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500 text-white flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <h3 className="font-bold text-xl mb-2">Bioavailability First</h3>
              <p className="text-sm opacity-80">
                Black pepper increases curcumin absorption by 2000%. We include
                synergistic compounds that ensure maximum nutrient delivery.
              </p>
            </div>

            {/* Card 3 */}
            <div className="neo-box p-6">
              <div className="w-12 h-12 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <h3 className="font-bold text-xl mb-2">Full Transparency</h3>
              <p className="text-sm opacity-80">
                Every statistic links to its PubMed source. No exaggerated
                claims, just real science you can verify yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Summary */}
      <EvidenceSummary isMobile={false} />
    </div>
  );
}
