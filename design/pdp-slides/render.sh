#!/bin/bash
# Renders the PDP carousel slides to public/formulas/mmPdpAssetsV2/.
#   ./render.sh            renders every slide
#   ./render.sh s1 s4      renders just those
#
# Slides are authored at 2400x1715 (7:5, the aspect ProductImageSlideshow uses)
# and downsampled to 2000px wide. The carousel tops out around 1400px even at
# 3x DPR, so 2000 leaves headroom without paying for pixels nobody sees.
# NOTE: macOS bash is 3.2 — no associative arrays, hence the case statement.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="$HERE/../../public/formulas/mmPdpAssetsV2"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
WIDTH=2000
QUALITY=82

slide_name() {
  case "$1" in
    s0) echo FlowStarterKit ;;   s1) echo FlowBenefitStack ;;
    s2) echo FlowWhatToExpect ;; s3) echo FlowIngredients ;;
    s4) echo FlowVsCoffee ;;     s5) echo FlowProof ;;
    s7) echo FlowReview ;;       s8) echo FlowGuarantee ;;
    *)  echo "$1" ;;
  esac
}

mkdir -p "$OUT"
if [ $# -gt 0 ]; then SLIDES="$*"; else SLIDES="s0 s1 s2 s3 s4 s5 s7 s8"; fi

for s in $SLIDES; do
  out="$(slide_name "$s")"
  tmp="$(mktemp -t "$s").png"
  # virtual-time-budget waits for the local @font-face files; without it Chrome
  # can screenshot before they load and text renders blank.
  "$CHROME" --headless --disable-gpu --force-device-scale-factor=1 --hide-scrollbars \
    --virtual-time-budget=8000 --run-all-compositor-stages-before-draw \
    --screenshot="$tmp" --window-size=2400,1715 "file://$HERE/slides/$s.html" 2>/dev/null
  sips -Z $WIDTH "$tmp" >/dev/null
  sips -s format jpeg -s formatOptions $QUALITY "$tmp" --out "$OUT/$out.jpg" >/dev/null
  rm -f "$tmp"
  printf "%-4s -> %-22s %s\n" "$s" "$out.jpg" "$(ls -lh "$OUT/$out.jpg" | awk '{print $5}')"
done
