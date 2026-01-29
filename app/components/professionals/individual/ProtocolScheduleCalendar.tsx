"use client";

import { ProtocolId } from "@/app/lib/productData";
import { generateProtocolCalendarDays } from "@/app/lib/productData";

interface ProtocolScheduleCalendarProps {
  protocolId: ProtocolId;
}

export default function ProtocolScheduleCalendar({
  protocolId,
}: ProtocolScheduleCalendarProps) {
  const allDays = generateProtocolCalendarDays(protocolId, "max");
  const weekDays = allDays.slice(0, 7);
  const isUltimate = protocolId === "4";

  const getCellClassName = (formula: "01" | "02" | "rest") => {
    if (formula === "rest") {
      return "border border-current opacity-20";
    }
    if (isUltimate) {
      return "bg-gradient-to-br from-amber-500 to-[#AAB9BC] text-white";
    }
    if (formula === "01") {
      return "bg-amber-500 text-white";
    }
    return "bg-[#AAB9BC] text-white";
  };

  return (
    <section className="px-6 md:px-16 py-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold mb-1">
          Recommended weekly schedule (max tier)
        </h2>
        <p className="font-clinical text-xs opacity-70 mb-3">
          Repeat for the month
        </p>

        <div className="border-2 border-black/10 rounded-lg overflow-hidden p-3 md:p-4">
          {/* Day headers + single week row */}
          <div className="grid grid-cols-7 gap-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="text-center font-clinical text-[10px] opacity-50"
              >
                {day}
              </div>
            ))}
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-sm flex items-center justify-center text-[10px] font-clinical ${getCellClassName(day.formula)}`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-black/10">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-sm" />
              <span className="font-clinical text-[10px]">F01</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#AAB9BC] rounded-sm" />
              <span className="font-clinical text-[10px]">F02</span>
            </div>
            {isUltimate && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-[#AAB9BC] rounded-sm" />
                <span className="font-clinical text-[10px]">Both</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
