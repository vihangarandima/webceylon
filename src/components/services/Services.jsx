import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { SERVICES } from '../../data/studio';
import SplitReveal from '../ui/SplitReveal';
import { Lotus } from '../ui/Ornament';
import './services.css';

// A ledger of what the studio does. On desktop each row opens as you hover
// it; on touch every row is simply open.
export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.service', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: '.services__list', start: 'top 80%', once: true },
      });
      gsap.fromTo('.service__rule', { scaleX: 0 }, {
        scaleX: 1,
        stagger: 0.08,
        duration: 1.6,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.services__list', start: 'top 80%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <span className="meta">(04) Services</span>
          <span className="meta">What we make</span>
        </div>
        <SplitReveal id="services-title" className="h2 services__title" lines={['Six ways', 'to be remembered.']} />

        <ol className="services__list">
          {SERVICES.map((s) => (
            <li key={s.no} className="service" tabIndex={0}>
              <span className="service__rule" aria-hidden="true" />
              <span className="service__no meta">{s.no}</span>
              <h3 className="service__name serif">{s.name}</h3>
              <p className="service__line">{s.line}</p>
              <ul className="service__detail">
                {s.detail.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <Lotus size={28} className="service__lotus" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
