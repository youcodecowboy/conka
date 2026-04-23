interface SpecItem {
  label: string;
  value: string | number;
  hint?: string;
}

interface HairlineSpecStripProps {
  items: SpecItem[];
}

export function HairlineSpecStrip({ items }: HairlineSpecStripProps) {
  const count = items.length;
  const desktopColsClass = count === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";

  return (
    <div
      className={`grid grid-cols-2 ${desktopColsClass} bg-white border border-black/12`}
    >
      {items.map((item, idx) => {
        const isLastOverall = idx === count - 1;
        // Mobile is grid-cols-2. Last in a mobile row = odd index.
        // For 3-item strips the 3rd cell spans both columns, so it's also
        // the last in its mobile row.
        const isLastInMobileRow =
          idx % 2 === 1 || (count === 3 && idx === 2);
        const isSecondMobileRow = idx >= 2;
        const mobileSpanClass =
          count === 3 && idx === 2 ? "col-span-2 sm:col-span-1" : "";

        const cellClasses = [
          "p-4 lg:p-5",
          mobileSpanClass,
          isLastInMobileRow ? "border-r-0" : "border-r border-black/8",
          isSecondMobileRow ? "border-t border-black/8" : "",
          isLastOverall ? "sm:border-r-0" : "sm:border-r sm:border-black/8",
          isSecondMobileRow ? "sm:border-t-0" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const isLongValue = String(item.value).length > 14;
        const valueSizeClass = isLongValue
          ? "text-base lg:text-lg"
          : "text-2xl lg:text-4xl";

        return (
          <div key={idx} className={cellClasses}>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40 leading-none">
              {item.label}
            </p>
            <p
              className={`font-mono ${valueSizeClass} font-bold tabular-nums text-[#1B2757] mt-2 leading-none`}
            >
              {item.value}
            </p>
            {item.hint ? (
              <p className="font-mono text-[9px] text-black/45 tabular-nums mt-2 leading-none">
                {item.hint}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default HairlineSpecStrip;
