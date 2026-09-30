import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';
import { TECHNOLOGY } from '../../data/studio';
import './technology.css';

// Two bands of names running in opposite directions. Scroll faster and they
// run faster and lean into it — the page answers the speed of your hand.
function Band({ items, reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className={`band${reverse ? ' band--rev' : ''}`} aria-hidden="true">
      <div className="band__inner">
        {row.map((t, i) => (
          <span key={i} className="band__item serif">
            {t.name}
            <span className="band__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Technology() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const bands = gsap.utils.toArray('.band__inner');
      const loops = bands.map((b, i) =>
        gsap.fromTo(b, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40, ease: 'none', repeat: -1 })
      );
      const skew = gsap.quickTo(bands, 'skewX', { duration: 0.5, ease: 'power3.out' });
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity();
          const speed = 1 + Math.min(Math.abs(v) / 400, 5);
          loops.forEach((l) => l.timeScale(speed * (v < 0 ? -1 : 1)));
          skew(gsap.utils.clamp(-8, 8, v / -250));
        },
        onToggle: (self) => loops.forEach((l) => (self.isActive ? l.play() : l.pause())),
      });
      // ease back to cruising speed when scrolling stops
      const settle = gsap.ticker.add(() => {
        loops.forEach((l) => {
          const ts = l.timeScale();
          const target = ts < 0 ? -1 : 1;
          l.timeScale(ts + (target - ts) * 0.05);
        });
      });
      return () => gsap.ticker.remove(settle);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="technology" className="section technology" aria-labelledby="tech-title">
      <div className="wrap">
        <div className="section-head">
          <span className="meta">(06) Technology</span>
          <span className="meta">What we build with</span>
        </div>
        <h2 id="tech-title" className="h2 technology__title">
          Modern tools, <em>used with restraint.</em>
        </h2>
      </div>

      <div className="technology__bands">
        <Band items={TECHNOLOGY.slice(0, 6)} />
        <Band items={TECHNOLOGY.slice(6)} reverse />
      </div>

      <div className="wrap">
        <ul className="technology__grid">
          {TECHNOLOGY.map((t) => (
            <li key={t.name}>
              <span className="technology__name">{t.name}</span>
              <span className="meta">{t.use}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
