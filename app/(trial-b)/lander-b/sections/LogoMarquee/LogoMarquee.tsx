/**
 * CONKA — "Fueling High Performers at:" partner-logo marquee. Server component.
 * Pure CSS animation (no JS). Two identical groups loop seamlessly.
 * Per-logo heights match the prototype (logos differ in natural proportions).
 */

import Image from 'next/image';
import styles from './LogoMarquee.module.css';

// nw/nh = natural pixel dimensions (for next/image aspect ratio); h = display
// height. next/image serves a small AVIF/WebP at the rendered size and
// lazy-loads (no priority) so these sit below the hero's LCP instead of
// competing with it. The source PNGs are ~500px crests (70–115 KB each) but
// only ever render ~50 px tall — the optimizer collapses them to a few KB.
const LOGOS = [
  { src: '/lander/partners/bath-rugby.webp', alt: 'Bath Rugby', h: 52, nw: 104, nh: 104 },
  { src: '/lander/partners/southampton.webp', alt: 'Southampton FC', h: 54, nw: 94, nh: 108 },
  { src: '/lander/partners/england-rugby.webp', alt: 'England Rugby', h: 58, nw: 69, nh: 116 },
  { src: '/lander/partners/bayern.webp', alt: 'FC Bayern Munich', h: 52, nw: 104, nh: 104 },
  { src: '/lander/partners/team-gb.webp', alt: 'Team GB', h: 58, nw: 85, nh: 116 },
  { src: '/lander/partners/wales-rugby.webp', alt: 'Wales Rugby', h: 56, nw: 84, nh: 112 },
  { src: '/lander/partners/leeds.webp', alt: 'Leeds United', h: 54, nw: 86, nh: 108 },
  { src: '/lander/partners/wolves.webp', alt: 'Wolves', h: 48, nw: 110, nh: 96 },
  { src: '/lander/partners/f1.webp', alt: 'Formula 1', h: 26, nw: 208, nh: 52 },
  { src: '/lander/partners/barrys.webp', alt: "Barry's", h: 22, nw: 213, nh: 44 },
  { src: '/lander/partners/army.webp', alt: 'British Army', h: 46, nw: 107, nh: 92 },
  { src: '/lander/partners/british-airways.webp', alt: 'British Airways', h: 18, nw: 228, nh: 36 },
  { src: '/lander/partners/goldman-sachs.webp', alt: 'Goldman Sachs', h: 36, nw: 171, nh: 72 },
  { src: '/lander/partners/equinox.webp', alt: 'Equinox', h: 19, nw: 200, nh: 38 },
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <Image
          key={l.alt}
          src={l.src}
          alt={l.alt}
          width={l.nw}
          height={l.nh}
          sizes="160px"
          style={{ height: l.h, width: 'auto' }}
        />
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className={styles.section}>
      <p className={styles.title}>Fueling High Performers at:</p>
      <div className={styles.marquee}>
        <div className={styles.inner}>
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
