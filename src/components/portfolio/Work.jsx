import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { PROJECTS } from '../../data/projects';
import { useScroll } from '../ui/SmoothScroll';
import SplitReveal from '../ui/SplitReveal';
import ProjectCard from './ProjectCard';
import './work.css';

// The portfolio, one project after another, top to bottom. Each one opens
// as it scrolls in; nothing moves sideways or pins.
export default function Work() {
  const root = useRef(null);
  const { scrollTo } = useScroll();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('.project').forEach((el) => {
        gsap.fromTo(
          el.querySelector('.project__stage .frame'),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
        );
        gsap.from(el.querySelectorAll('.project__heading > *, .project__body > *, .project__shots li'), {
          opacity: 0,
          y: 30,
          stagger: 0.06,
          duration: 1.1,
          scrollTrigger: { trigger: el.querySelector('.project__info'), start: 'top 85%', once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="section work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Selected work · {String(PROJECTS.length).padStart(2, '0')}</span>
          <SplitReveal id="work-title" className="h2" lines={['Work that is', 'live and in use.']} />
          <p className="section-head__note">
            Every project here was designed and built end to end by the studio. Real clients, real screens — open
            any of them to read how it was made.
          </p>
        </div>

        <div className="work__list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} eager={i === 0} />
          ))}
        </div>

        <div className="work__next">
          <p className="work__nextText serif">
            Your project <em>could be next.</em>
          </p>
          <a
            href="#contact"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
          >
            Start a project <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
