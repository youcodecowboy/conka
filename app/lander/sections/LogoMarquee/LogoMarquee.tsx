/**
 * CONKA — "Fueling High Performers at:" partner-logo marquee. Server component.
 * Pure CSS animation (no JS). Two identical groups loop seamlessly.
 * Per-logo heights match the prototype (logos differ in natural proportions).
 *
 * The logo list is shared: app/components/landing/partnerLogos.ts. This page
 * renders it with a plain <img> at `h`, ignoring the `w`/`nw`/`nh` fields the
 * other two bands use.
 */

import { PARTNER_LOGOS } from '@/app/components/landing/partnerLogos';
import styles from './LogoMarquee.module.css';

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {PARTNER_LOGOS.map((l) => (
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
