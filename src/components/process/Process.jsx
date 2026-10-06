import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { PROCESS, TECHNOLOGY } from '../../data/studio';
import SplitReveal from '../ui/SplitReveal';
import './process.css';

// Five steps in a row, then the tools we build with — read at a glance.
export default function Process() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.pstep', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 1.2,
        scrollTrigger: { trigger: '.process__steps', start: 'top 82%', once: true },
      });
      gsap.fromTo(
        '.process__rail span',
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'expo.inOut', scrollTrigger: { trigger: '.process__steps', start: 'top 82%', once: true } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="process" className="section process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Process</span>
          <SplitReveal id="process-title" className="h2" lines={['How the work', 'gets made.']} />
          <p className="section-head__note">
            A clear path from first call to launch, with a live staging link the whole way — so you always see real
            progress, not promises.
          </p>
        </div>

        <div className="process__rail" aria-hidden="true">
          <span />
        </div>
        <ol className="process__steps">
          {PROCESS.map((p) => (
            <li key={p.no} className="pstep">
              <span className="pstep__no">{p.no}</span>
              <h3 className="pstep__name serif">{p.name}</h3>
              <p className="pstep__text">{p.text}</p>
            </li>
          ))}
        </ol>

        <div className="tools">
          <h3 className="meta tools__title">Tools we build with</h3>
          <ul className="tools__list">
            {TECHNOLOGY.map((t) => (
              <li key={t.name}>
                <span className="tools__name">{t.name}</span>
                <span className="tools__use">{t.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
