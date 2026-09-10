/**
 * CONKA — "Fueling High Performers at:" partner-logo marquee. Server component.
 * Pure CSS animation (no JS). Two identical groups loop seamlessly.
 * Per-logo heights match the prototype (logos differ in natural proportions).
 */

import Image from 'next/image';
import { PARTNER_LOGOS } from '@/app/components/landing/partnerLogos';
import styles from './LogoMarquee.module.css';

// The logo list is shared: app/components/landing/partnerLogos.ts. This page
// uses its nw/nh (natural pixel dimensions, for next/image's aspect ratio) and
// h (display height). next/image serves a small AVIF/WebP at the rendered size
// and lazy-loads (no priority) so these sit below the hero's LCP instead of
// competing with it. The source PNGs are ~500px crests (70-115 KB each) but
// only ever render ~50 px tall, so the optimizer collapses them to a few KB.

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {PARTNER_LOGOS.map((l) => (
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
