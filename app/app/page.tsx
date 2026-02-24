"use client";

import Navigation from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import { AppHero, AppStickyPhoneBlock, AppSubscribersSection } from "@/app/components/app";
import {
  CognitiveTestSection,
  CognitiveTestSectionMobile,
} from "@/app/components/cognitive-test";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function AppPage() {
  const isMobile = useIsMobile();

  return (
    <div
      className="min-h-screen theme-conka-flow"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <Navigation />

      <AppHero />

      <AppStickyPhoneBlock />

      <AppSubscribersSection />

      {/* Cognitive Test Section */}
      {isMobile !== undefined &&
        (isMobile ? <CognitiveTestSectionMobile /> : <CognitiveTestSection />)}

      {/* Evidence Section - White */}
      <section className="bg-white text-black px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-clinical text-xs uppercase tracking-widest opacity-70 mb-4">
              EVIDENCE - BACKED BRAIN OPTIMISATION
            </p>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              The CONKA app combines neuroscience-based testing with
              personalised recommendations. Clinical data supports a potential{" "}
              <span className="font-bold">
                16% improvement in cognitive performance
              </span>{" "}
              over 30 days when following the recommended brain optimisation
              plan.
            </p>
            <blockquote className="font-commentary text-xl md:text-2xl italic max-w-2xl mx-auto">
              &ldquo;Developed by neuroscientists and tested with professional
              athletes - your brain deserves the same precision and care.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Key Features Section - Black */}
      <section className="bg-black text-white px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The App Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="border-2 border-white/20 rounded-lg bg-white/5 p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Personalised Performance Plan
              </h3>
              <p className="opacity-80">
                Personalised recommendations and actionable steps to boost your
                performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-white/20 rounded-lg bg-white/5 p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Instant Cognitive Insight
              </h3>
              <p className="opacity-80">
                Immediate insights into your brains processing speed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-white/20 rounded-lg bg-white/5 p-6">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M3 3v18h18" />
                  <path d="M18 7l-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Measurable Progress Tracking
              </h3>
              <p className="opacity-80">
                Track progress over time and see measurable improvement - up to
                16% in just 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Features List Section - White */}
      <section className="bg-white text-black px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            The App Features
          </h2>
          <div className="space-y-6">
            {/* FDA Cleared */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">FDA CLEARED</h3>
              <p className="opacity-80">
                You can&apos;t learn it or game it, the only way to get better
                is to improve your brain power
              </p>
            </div>

            {/* Seamless Formula */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">SEAMLESS FORMULA</h3>
              <p className="opacity-80">
                Integration with CONKA brain shots to maximise improvement.
              </p>
            </div>

            {/* Measurable Proof */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">MEASURABLE PROOF</h3>
              <p className="opacity-80">
                Track daily progress and see measurable gain, the only brain
                supplement you can measure working.
              </p>
            </div>

            {/* Habit Building */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">HABIT BUILDING</h3>
              <p className="opacity-80">
                Science-backed strategies and nudges to keep you accountable.
              </p>
            </div>

            {/* Compare with the Best */}
            <div className="neo-box p-6">
              <h3 className="text-xl font-bold mb-2">COMPARE WITH THE BEST</h3>
              <p className="opacity-80">
                Keep competitive, see how you stack up against some of the
                fastest brains in the world from footballers to F1 drivers by
                posting your score into the Global leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section - Black */}
      <section className="bg-black text-white px-6 md:px-16 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why our App has the best functionality
          </h2>
          <div className="border-2 border-white/20 rounded-lg bg-white/5 p-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-white/30">
                  <th className="text-left p-4 font-bold">Feature</th>
                  <th className="text-left p-4 font-bold">Us</th>
                  <th className="text-left p-4 font-bold">Them</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Purpose</td>
                  <td className="p-4">
                    Measures and trains your brain for real performance
                    improvement
                  </td>
                  <td className="p-4">
                    Tracks general wellness or gives broad lifestyle advice
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Measurement</td>
                  <td className="p-4">
                    Objective cognitive data that shows when you&apos;re
                    actually underperforming
                  </td>
                  <td className="p-4">
                    Relies on how you feel or surface-level metrics
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Focus</td>
                  <td className="p-4">
                    Brain-first. The organ that drives everything
                  </td>
                  <td className="p-4">
                    Mostly heart rate, steps, sleep or mood tracking
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Scientific Backing</td>
                  <td className="p-4">
                    FDA cleared medical device with clinical grounding
                  </td>
                  <td className="p-4">
                    Often unverified or loosely science-informed
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Testing Method</td>
                  <td className="p-4">
                    Uses visual tests (animals) to avoid learning, language or
                    education bias
                  </td>
                  <td className="p-4">
                    Many tests are affected by prior knowledge or IQ factors
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Progress Over Time</td>
                  <td className="p-4">
                    Shows measurable cognitive improvement without learning
                    effects
                  </td>
                  <td className="p-4">
                    Score increases are often just familiarity with the test
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-semibold">Guidance</td>
                  <td className="p-4">
                    Pairs data with the CONKA formula to actively improve
                    performance
                  </td>
                  <td className="p-4">
                    Gives numbers with little direction or actionable change
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Motivation</td>
                  <td className="p-4">
                    Keeps you competitive by benchmarking against pro athletes
                  </td>
                  <td className="p-4">
                    No high-performance comparison or motivational challenge
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
