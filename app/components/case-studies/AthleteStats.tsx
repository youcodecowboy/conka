"use client";

import { AthleteData, ImprovementStat } from "@/app/lib/caseStudiesData";

interface AthleteStatsProps {
  athlete: AthleteData;
  compact?: boolean;
}

// Single stat bar component
function StatBar({ stat, index }: { stat: ImprovementStat; index: number }) {
  const isPositive = stat.percentage > 0;
  const isNegativeGood = stat.metric.toLowerCase().includes("time") || 
                         stat.metric.toLowerCase().includes("speed");
  const displayPositive = isNegativeGood ? !isPositive : isPositive;
  
  return (
    <div
      className="premium-card-soft premium-card-soft-stroke p-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="premium-body-sm font-medium text-[var(--text-on-light)]">{stat.metric}</p>
          {stat.description && (
            <p className="premium-body-sm text-[var(--text-on-light-muted)] mt-0.5">{stat.description}</p>
          )}
        </div>
        <div className={`text-2xl font-bold font-clinical ${displayPositive ? "text-emerald-600" : "text-blue-600"}`}>
          {stat.value}
        </div>
      </div>
      <div className="h-2 bg-black/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${displayPositive ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ width: `${Math.min(Math.abs(stat.percentage), 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="premium-body-sm text-[var(--text-on-light-muted)]">0%</span>
        <span className="premium-body-sm font-medium text-[var(--text-on-light)]">
          {Math.abs(stat.percentage).toFixed(1)}% {isNegativeGood && stat.percentage < 0 ? "faster" : displayPositive ? "improvement" : "reduction"}
        </span>
      </div>
    </div>
  );
}

// Baseline vs Results comparison
function ComparisonChart({ athlete }: { athlete: AthleteData }) {
  const metrics = Object.keys(athlete.baseline) as (keyof typeof athlete.baseline)[];
  
  const formatMetricName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <div className="space-y-3">
      {metrics.map((metric, idx) => {
        const baselineVal = athlete.baseline[metric];
        const resultVal = athlete.results[metric];
        
        if (baselineVal === undefined || resultVal === undefined) return null;
        
        // For reaction/decision time, lower is better
        const isTimeMetric = metric.toLowerCase().includes('time') || metric.toLowerCase().includes('speed');
        const maxVal = isTimeMetric 
          ? Math.max(baselineVal, resultVal) * 1.1
          : 100;
        
        return (
          <div key={metric} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="premium-body-sm text-[var(--text-on-light-muted)]">{formatMetricName(metric)}</span>
              <span className="premium-body-sm text-[var(--text-on-light)]">
                {baselineVal}{isTimeMetric ? "ms" : ""} → {resultVal}{isTimeMetric ? "ms" : ""}
              </span>
            </div>
            <div className="relative h-4 flex gap-1">
              {/* Baseline bar */}
              <div className="flex-1 h-full bg-current/10 rounded overflow-hidden">
                <div 
                  className="h-full bg-current/30 rounded"
                  style={{ width: `${(baselineVal / maxVal) * 100}%` }}
                />
              </div>
              {/* Result bar */}
              <div className="flex-1 h-full bg-current/10 rounded overflow-hidden">
                <div 
                  className={`h-full rounded ${isTimeMetric && resultVal < baselineVal ? 'bg-emerald-500' : !isTimeMetric && resultVal > baselineVal ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${(resultVal / maxVal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Legend */}
      <div className="flex justify-center gap-6 pt-2 border-t border-[var(--color-premium-stroke)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-black/20" />
          <span className="premium-body-sm text-[var(--text-on-light-muted)]">Baseline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="premium-body-sm text-[var(--text-on-light-muted)]">Results</span>
        </div>
      </div>
    </div>
  );
}

export default function AthleteStats({ athlete, compact = false }: AthleteStatsProps) {
  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {athlete.improvements.slice(0, 4).map((stat) => (
          <div key={stat.metric} className="text-center p-2 premium-card-soft premium-card-soft-stroke">
            <p className="text-lg font-bold font-clinical text-[var(--text-on-light)]">{stat.value}</p>
            <p className="premium-body-sm text-[var(--text-on-light-muted)] truncate">{stat.metric}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-on-light)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
            <polyline points="16 7 22 7 22 13"/>
          </svg>
          Key Improvements
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {athlete.improvements.map((stat, idx) => (
            <StatBar key={stat.metric} stat={stat} index={idx} />
          ))}
        </div>
      </div>

      <div className="premium-card-soft premium-card-soft-stroke p-6">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-on-light)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          Baseline vs Results
        </h4>
        <ComparisonChart athlete={athlete} />
      </div>

      <div className="premium-card-soft premium-card-soft-stroke p-6">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--text-on-light)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
            <line x1="12" y1="22" x2="12" y2="15.5"/>
            <polyline points="22 8.5 12 15.5 2 8.5"/>
          </svg>
          Performance Metrics
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${(athlete.results.totalScore || 0)} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold font-clinical text-[var(--text-on-light)]">{athlete.results.totalScore?.toFixed(1)}</span>
              </div>
            </div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Total Score</p>
            <p className="premium-body-sm text-emerald-600">{athlete.improvements[0]?.value}</p>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray={`${(athlete.results.accuracy || 0)} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold font-clinical text-[var(--text-on-light)]">{athlete.results.accuracy?.toFixed(1)}</span>
              </div>
            </div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Accuracy</p>
            <p className="premium-body-sm text-blue-600">{athlete.improvements[1]?.value}</p>
          </div>
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray={`${(athlete.results.speed || 0)} 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold font-clinical text-[var(--text-on-light)]">{athlete.results.speed?.toFixed(1)}</span>
              </div>
            </div>
            <p className="premium-body-sm text-[var(--text-on-light-muted)]">Speed</p>
            <p className="premium-body-sm text-amber-600">{athlete.improvements[2]?.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

