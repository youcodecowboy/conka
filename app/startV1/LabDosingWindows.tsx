/**
 * Dosing windows — clinical timeline above the 2x2 product/info grid.
 *
 * Shows a 12-hour range (06:00–18:00) with two highlighted bands:
 *   - FLOW   · 06:00–10:00 (0%–33.3%)
 *   - CLEAR  · 12:00–16:00 (50%–83.3%)
 *
 * Reads like a lab protocol schedule rather than a marketing "morning/evening"
 * strip. Pure monospace, navy accent, no colour.
 */

const RANGE_START = 6;
const RANGE_END = 18;
const RANGE = RANGE_END - RANGE_START; // 12 hours

/* Hour labels shown along the top axis. Skipping odd hours keeps the scale
   readable at mobile width without crowding. */
const HOUR_MARKS = [6, 8, 10, 12, 14, 16, 18];

const WINDOWS = [
  { id: "flow", label: "FLOW", range: "6–10 AM", start: 6, end: 10 },
  { id: "clear", label: "CLEAR", range: "12–4 PM", start: 12, end: 16 },
];

function pct(hour: number): string {
  return `${((hour - RANGE_START) / RANGE) * 100}%`;
}

export default function LabDosingWindows() {
  return (
    <div className="mb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 mb-3">
        Recommended Dosing Windows
      </p>

      {/* Hour scale */}
      <div className="relative h-4 mb-1">
        {HOUR_MARKS.map((h) => (
          <span
            key={h}
            className="absolute top-0 -translate-x-1/2 font-mono text-[9px] tabular-nums text-black/40"
            style={{ left: pct(h) }}
          >
            {String(h).padStart(2, "0")}
          </span>
        ))}
      </div>

      {/* Timeline track with highlighted window bands */}
      <div className="relative h-3 bg-black/5 border-y border-black/10">
        {/* Hour tick marks — hairline verticals along the track */}
        {HOUR_MARKS.map((h) => (
          <span
            key={h}
            className="absolute top-0 bottom-0 w-px bg-black/15"
            style={{ left: pct(h) }}
            aria-hidden
          />
        ))}

        {/* Dosing window bands */}
        {WINDOWS.map((w) => (
          <div
            key={w.id}
            className="absolute top-0 bottom-0 bg-[#1B2757]"
            style={{
              left: pct(w.start),
              width: `${((w.end - w.start) / RANGE) * 100}%`,
            }}
            aria-label={`${w.label} window, ${w.range}`}
          />
        ))}
      </div>

      {/* Window labels — aligned to the midpoint of each band */}
      <div className="relative h-6 mt-2">
        {WINDOWS.map((w) => {
          const mid = (w.start + w.end) / 2;
          return (
            <div
              key={w.id}
              className="absolute top-0 -translate-x-1/2 flex items-baseline gap-1.5 whitespace-nowrap"
              style={{ left: pct(mid) }}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                {w.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/40 tabular-nums">
                {w.range}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
