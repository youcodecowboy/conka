/**
 * Morning ↔ Afternoon connector strip.
 *
 * Visual schema for the two-product daily rhythm. Used above the
 * Flow/Clear product surfaces in both LandingProductSplit and
 * LandingWhatItDoes (via WhatsInsideProductMini).
 */
export default function AmPmConnector() {
  return (
    <div className="flex items-center gap-3 mb-4 text-xs text-black/40 font-medium">
      <span aria-hidden>☀️</span>
      <span className="uppercase tracking-wide">Morning</span>
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(217, 119, 6, 0.3), rgba(3, 105, 161, 0.3))",
        }}
      />
      <span className="uppercase tracking-wide">Afternoon</span>
      <span aria-hidden>☀️</span>
    </div>
  );
}
