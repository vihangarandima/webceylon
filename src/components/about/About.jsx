import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import SplitReveal from '../ui/SplitReveal';
import Picture from '../ui/Picture';
import './about.css';

const PRINCIPLES = [
  {
    no: 'I',
    title: 'Room to breathe',
    text: 'Space is part of the design. Every page balances open ground with dense detail, so nothing shouts and nothing is lost.',
  },
  {
    no: 'II',
    title: 'Fast is a feature',
    text: 'Beautiful is worthless if it is slow. We set performance budgets before we draw, and hold to them when we build.',
  },
  {
    no: 'III',
    title: 'You talk to the makers',
    text: 'No account managers in between. The people you speak to are the people who design and write every line of your site.',
  },
];

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The arch frame opens like a doorway; the mask inside drifts slower than the page.
      gsap.fromTo('.about__arch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)',
        duration: 1.8,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: '.about__arch', start: 'top 80%', once: true },
      });
      gsap.fromTo('.about__arch img', { yPercent: -10, scale: 1.2 }, {
        yPercent: 10,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: { trigger: '.about__arch', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.principle', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 1.2,
        scrollTrigger: { trigger: '.about__principles', start: 'top 82%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="section-head">
          <span className="meta">(05) About</span>
          <span className="meta">Who we are</span>
        </div>

        <div className="about__grid">
          <div className="about__copy">
            <SplitReveal id="about-title" className="h2 about__title" lines={['Rooted in', 'Ceylon,', 'built for', 'anywhere.']} />
            <p className="lead about__lead">
              WEB CEYLON is an independent web studio in Colombo. We design and build websites, web applications and
              interactive experiences for businesses that want to look as good online as they are in person.
            </p>
            <p className="about__body">
              Sri Lanka has a long tradition of making things properly: carved masks, lacquer work, temple stone,
              the architecture of people like Geoffrey Bawa. We take that seriously. We start from a blank page for
              every client, write clean code that you own outright, and care about the parts most people never
              notice — until they are missing.
            </p>
          </div>

          <figure className="about__figure">
            <Picture
              className="about__arch"
              src="/masks/gurulu_raksha_mask"
              ext="jpg"
              alt="A hand-carved Gurulu Raksha mask, painted in red, yellow and black with white-beaded eye rings."
              sizes="(min-width: 900px) 36vw, 90vw"
            />
            <figcaption className="meta">Gurulu Raksha — carved and painted by hand. The reference for everything on this page.</figcaption>
          </figure>
        </div>

        <ol className="about__principles">
          {PRINCIPLES.map((p) => (
            <li key={p.no} className="principle">
              <span className="principle__no serif">{p.no}</span>
              <h3 className="principle__title">{p.title}</h3>
              <p className="principle__text">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
