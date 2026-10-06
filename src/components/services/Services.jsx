import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { SERVICES } from '../../data/studio';
import SplitReveal from '../ui/SplitReveal';
import './services.css';

// What the studio does, as six plain cards: everything readable at once,
// nothing hidden behind a hover.
export default function Services() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.service', {
        opacity: 0,
        y: 40,
        stagger: 0.07,
        duration: 1.2,
        scrollTrigger: { trigger: '.services__list', start: 'top 82%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <SplitReveal id="services-title" className="h2" lines={['What we make.']} />
          <p className="section-head__note">
            From a single landing page to the software a business runs on — designed and written by the same small
            team, start to finish.
          </p>
        </div>

        <ol className="services__list">
          {SERVICES.map((s) => (
            <li key={s.no} className="service">
              <span className="service__no serif">{s.no}</span>
              <h3 className="service__name">{s.name}</h3>
              <p className="service__line">{s.line}</p>
              <ul className="service__detail">
                {s.detail.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
