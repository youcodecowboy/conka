"use client";

import { useState, useEffect } from "react";
import { Athlete } from "./CaseStudies";

interface CaseStudiesDesktopProps {
  athletes: Athlete[];
}

export default function CaseStudiesDesktop({
  athletes,
}: CaseStudiesDesktopProps) {
  const [activeAthlete, setActiveAthlete] = useState(0);
  const [disableTransition, setDisableTransition] = useState(false);

  // Create extended array with duplicate first slide at the end for seamless loop
  const extendedAthletes = [...athletes, athletes[0]];

  const handleNext = (targetIdx: number) => {
    setActiveAthlete(targetIdx);
  };

  // Handle seamless loop: when we reach the duplicate first slide, jump back to real first
  useEffect(() => {
    if (activeAthlete === athletes.length) {
      // We're on the duplicate first slide, wait for animation then jump back without transition
      const timer = setTimeout(() => {
        setDisableTransition(true);
        setActiveAthlete(0);
        // Re-enable transitions after a brief moment
        setTimeout(() => setDisableTransition(false), 50);
      }, 700); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [activeAthlete, athletes.length]);

  return (
    <section className="px-6 md:px-16 pt-12 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-right mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="font-commentary text-xl">real athletes, real results</p>
        </div>

        {/* Slideshow Indicator */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 opacity-60">
            <span className="font-clinical text-sm">click to scroll</span>
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden pr-6">
          <div
            className="flex gap-4 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(-${activeAthlete} * (100% + 1rem)))`,
              transition: disableTransition
                ? "none"
                : "transform 700ms ease-in-out",
            }}
          >
            {extendedAthletes.map((athlete, idx) => (
              <div
                key={idx}
                className="flex flex-shrink-0 gap-4"
                style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
              >
                {/* Current Athlete - 75% */}
                <div className="w-[75%] flex-shrink-0">
                  <div className="neo-box h-[600px]">
                    <div className="grid md:grid-cols-3 gap-6 p-6 h-full">
                      {/* Left: Photo */}
                      <div className="md:col-span-1">
                        <div className="placeholder-box w-full h-full min-h-[400px]">
                          <span className="font-clinical text-sm">
                            [ATHLETE PHOTO]
                          </span>
                        </div>
                      </div>

                      {/* Right: Details */}
                      <div className="md:col-span-2 space-y-6 flex flex-col">
                        {/* Header */}
                        <div>
                          <h3 className="text-3xl font-bold mb-1">
                            {athlete.name}
                          </h3>
                          <p className="font-clinical text-lg">
                            {athlete.sport}
                          </p>
                          <p className="font-clinical text-sm opacity-70">
                            {athlete.achievement}
                          </p>
                        </div>

                        {/* Protocol */}
                        <div>
                          <p className="font-clinical text-sm opacity-70 mb-1">
                            Protocol
                          </p>
                          <p className="font-medium">{athlete.protocol}</p>
                        </div>

                        {/* Testimonial */}
                        <div>
                          <p className="font-commentary text-xl mb-2">
                            &quot;{athlete.quote}&quot;
                          </p>
                        </div>

                        {/* Key Benefits Icons */}
                        <div>
                          <p className="font-clinical text-sm opacity-70 mb-2">
                            Key Benefits
                          </p>
                          <div className="flex flex-wrap gap-4">
                            {athlete.results.map((result, resultIdx) => (
                              <div
                                key={resultIdx}
                                className="flex items-center gap-2"
                              >
                                <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </div>
                                <span className="font-clinical text-xs">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Biography */}
                        <div className="flex-1">
                          <p className="font-clinical text-sm opacity-70 mb-1">
                            Biography
                          </p>
                          <p className="text-sm opacity-80">
                            {athlete.name} has been using CONKA for{" "}
                            {athlete.duration}, achieving remarkable results in{" "}
                            {athlete.sport.toLowerCase()}.
                          </p>
                        </div>

                        {/* Signature */}
                        <div className="pt-4 border-t-2 border-current border-opacity-20">
                          <p className="font-commentary text-2xl">
                            {athlete.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Athlete Preview - 25% */}
                <div className="w-[25%] flex-shrink-0">
                  <div
                    className="neo-box h-[600px] cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleNext(idx + 1)}
                  >
                    {(() => {
                      // Handle wrapping: if we're on the last slide (duplicate), next should be the second athlete (index 1)
                      const nextIdx = idx === athletes.length ? 1 : idx + 1;
                      const nextAthlete = extendedAthletes[nextIdx];
                      if (!nextAthlete) return null;
                      return (
                        <div className="p-4 h-full flex flex-col justify-center items-center">
                          <div className="placeholder-box w-full h-[200px] mb-4">
                            <span className="font-clinical text-xs">
                              [NEXT]
                            </span>
                          </div>
                          <p className="font-clinical text-sm text-center font-medium">
                            {nextAthlete.name}
                          </p>
                          <p className="font-clinical text-xs opacity-70 text-center mt-1">
                            {nextAthlete.sport}
                          </p>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
