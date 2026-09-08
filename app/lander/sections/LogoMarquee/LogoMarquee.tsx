/**
 * CONKA — "Fueling High Performers at:" partner-logo marquee. Server component.
 * Pure CSS animation (no JS). Two identical groups loop seamlessly.
 * Per-logo heights match the prototype (logos differ in natural proportions).
 */

import styles from './LogoMarquee.module.css';

const LOGOS = [
  { src: '/lander/partners/bath-rugby.webp', alt: 'Bath Rugby', h: 52 },
  { src: '/lander/partners/southampton.webp', alt: 'Southampton FC', h: 54 },
  { src: '/lander/partners/england-rugby.webp', alt: 'England Rugby', h: 58 },
  { src: '/lander/partners/bayern.webp', alt: 'FC Bayern Munich', h: 52 },
  { src: '/lander/partners/team-gb.webp', alt: 'Team GB', h: 58 },
  { src: '/lander/partners/wales-rugby.webp', alt: 'Wales Rugby', h: 56 },
  { src: '/lander/partners/leeds.webp', alt: 'Leeds United', h: 54 },
  { src: '/lander/partners/wolves.webp', alt: 'Wolves', h: 48 },
  { src: '/lander/partners/f1.webp', alt: 'Formula 1', h: 26 },
  { src: '/lander/partners/barrys.webp', alt: "Barry's", h: 22 },
  { src: '/lander/partners/army.webp', alt: 'British Army', h: 46 },
  { src: '/lander/partners/british-airways.webp', alt: 'British Airways', h: 18 },
  { src: '/lander/partners/goldman-sachs.webp', alt: 'Goldman Sachs', h: 36 },
  { src: '/lander/partners/equinox.webp', alt: 'Equinox', h: 19 },
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <img key={l.alt} src={l.src} alt={l.alt} style={{ height: l.h }} />
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
