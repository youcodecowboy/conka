/* ============================================================================
 * PARTNER_LOGOS
 *
 * The one list of "Fueling High Performers at:" partner logos. Three marquee
 * components render it, each with its own layout and its own image strategy:
 *
 *   app/components/landing/LogoMarquee.tsx           /go/*     plain <img>, uses w
 *   app/lander/sections/LogoMarquee/LogoMarquee.tsx  /lander   plain <img>, uses h only
 *   app/(trial-b)/lander-b/sections/.../LogoMarquee  /lander-b next/image, uses nw/nh
 *
 * They each used to carry their own copy of these 14 entries, so renaming an
 * asset fixed one page and silently broke two others with the build still
 * passing (found during SCRUM-1321's WebP conversion, fixed in SCRUM-1324).
 * The components stay separate on purpose: only /go carries live traffic, and
 * collapsing three components into one would rewrite two dormant pages to tidy
 * one live one. Only the data is shared.
 *
 * Add a logo here and all three bands get it. Add the sizing fields with it:
 * a missing `w` or `nw`/`nh` reintroduces the layout shift they exist to stop.
 * ========================================================================== */

export interface PartnerLogo {
  src: string;
  alt: string;
  /** Display height in px. Logos differ in natural proportions, so this is
   *  tuned per logo rather than set to one value for the row. */
  h: number;
  /**
   * Rendered pixel width at `h`, from the asset's own proportions. Stated so
   * an <img> can carry width/height attributes: without them the flex row has
   * no size until each logo decodes, and every arrival reflows the track under
   * a running transform, which is what made the marquee visibly jump.
   *
   * Close to `nw / nh * h` but not computed from it: the existing values round
   * inconsistently (34.5 down, 85.5 up), and deriving them would move rendered
   * widths on a live page for no gain.
   */
  w: number;
  /** Natural width of the source asset, for next/image's aspect ratio. */
  nw: number;
  /** Natural height of the source asset, for next/image's aspect ratio. */
  nh: number;
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  { src: "/lander/partners/bath-rugby.webp", alt: "Bath Rugby", h: 52, w: 52, nw: 104, nh: 104 },
  { src: "/lander/partners/southampton.webp", alt: "Southampton FC", h: 54, w: 47, nw: 94, nh: 108 },
  { src: "/lander/partners/england-rugby.webp", alt: "England Rugby", h: 58, w: 34, nw: 69, nh: 116 },
  { src: "/lander/partners/bayern.webp", alt: "FC Bayern Munich", h: 52, w: 52, nw: 104, nh: 104 },
  { src: "/lander/partners/team-gb.webp", alt: "Team GB", h: 58, w: 42, nw: 85, nh: 116 },
  { src: "/lander/partners/wales-rugby.webp", alt: "Wales Rugby", h: 56, w: 42, nw: 84, nh: 112 },
  { src: "/lander/partners/leeds.webp", alt: "Leeds United", h: 54, w: 43, nw: 86, nh: 108 },
  { src: "/lander/partners/wolves.webp", alt: "Wolves", h: 48, w: 55, nw: 110, nh: 96 },
  { src: "/lander/partners/f1.webp", alt: "Formula 1", h: 26, w: 104, nw: 208, nh: 52 },
  { src: "/lander/partners/barrys.webp", alt: "Barry's", h: 22, w: 106, nw: 213, nh: 44 },
  { src: "/lander/partners/army.webp", alt: "British Army", h: 46, w: 54, nw: 107, nh: 92 },
  { src: "/lander/partners/british-airways.webp", alt: "British Airways", h: 18, w: 114, nw: 228, nh: 36 },
  { src: "/lander/partners/goldman-sachs.webp", alt: "Goldman Sachs", h: 36, w: 86, nw: 171, nh: 72 },
  { src: "/lander/partners/equinox.webp", alt: "Equinox", h: 19, w: 100, nw: 200, nh: 38 },
];
