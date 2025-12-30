"use client";

import { useState } from "react";
import { ClinicalStudyData } from "@/app/lib/ingredientsData";
import StudyBarChart from "./StudyBarChart";

interface IngredientStudiesProps {
  studies: ClinicalStudyData[];
  accentColor?: string;
}

export default function IngredientStudies({ studies, accentColor = "text-current" }: IngredientStudiesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {studies.map((study, idx) => (
        <div
          key={idx}
          className="neo-box overflow-hidden"
        >
          {/* Study Header */}
          <button
            onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            className="w-full p-4 text-left hover:bg-current/5 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-sm">{study.title}</h4>
                <p className="font-clinical text-xs opacity-70 mt-1">
                  {study.university} • {study.year}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-clinical text-xs px-2 py-1 rounded bg-current/10 ${accentColor}`}>
                  {study.pValue}
                </span>
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
                  className={`transition-transform flex-shrink-0 ${expandedIndex === idx ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </button>

          {/* Expanded Content */}
          {expandedIndex === idx && (
            <div className="px-4 pb-4 border-t-2 border-current/10">
              {/* Study Meta */}
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-current/10">
                <div>
                  <p className="font-clinical text-xs opacity-50 uppercase">Participants</p>
                  <p className="font-bold text-lg">{study.participants}</p>
                </div>
                <div>
                  <p className="font-clinical text-xs opacity-50 uppercase">Duration</p>
                  <p className="font-bold text-lg">{study.duration}</p>
                </div>
                <div>
                  <p className="font-clinical text-xs opacity-50 uppercase">Significance</p>
                  <p className={`font-bold text-lg font-clinical ${accentColor}`}>{study.pValue}</p>
                </div>
              </div>

              {/* Key Finding */}
              <div className="py-4 border-b border-current/10">
                <p className="font-clinical text-xs opacity-50 uppercase mb-2">Key Finding</p>
                <p className="text-sm font-medium">{study.keyFinding}</p>
              </div>

              {/* Chart */}
              {study.chartData && study.chartData.length > 0 && (
                <div className="pt-4">
                  <p className="font-clinical text-xs opacity-50 uppercase mb-3">Results</p>
                  <div className="h-48">
                    <StudyBarChart data={study.chartData} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

