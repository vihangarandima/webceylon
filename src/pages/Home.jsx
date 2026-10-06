import { useEffect, useRef } from 'react';
import { SERVICE_TILES, PACKAGES } from '../data/studio';
import useReveal from '../lib/useReveal';
import Button from '../components/Button';
import EditorShowcase from '../components/EditorShowcase';
import IntroWall from '../components/IntroWall';
import WorkRing from '../components/WorkRing';
import Marquee from '../components/Marquee';
import Faq from '../components/Faq';
import Approach from '../components/approach/Approach';
import { Brand, Glyph, ArrowRight } from '../components/icons';
import { Mark } from '../components/Logo';
import './home.css';

// Two rows of the tools behind the work.
const TOOLS = [
  ['figma', 'Figma'],
  ['typescript', 'TypeScript'],
  ['javascript', 'JavaScript'],
  ['gsap', 'GSAP'],
  ['mongodb', 'MongoDB'],
  ['postgresql', 'PostgreSQL'],
  ['github', 'GitHub'],
  ['git', 'Git'],
];

// What the sites are built on.
const PLATFORMS = [
  ['react', 'React'],
  ['next', 'Next.js'],
  ['node', 'Node.js'],
  ['three', 'Three.js'],
  ['tailwind', 'Tailwind CSS'],
  ['vite', 'Vite'],
  ['framer', 'Framer Motion'],
  ['vercel', 'Vercel'],
];

const BAND = ['UI/UX Design', 'Website Design & Development', 'E-commerce', 'Web Applications', 'Brand Identity', '3D & Interaction'];

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__lights" aria-hidden="true" />
      <div className="wrap hero__inner">
        <span className="tag" data-reveal>
          Design In Details
        </span>
        <h1 className="display hero__title" data-reveal style={{ '--d': '0.06s' }}>
          Crafted <em>Websites</em>
          <br />
          <em>Lasting</em> Impressions
        </h1>
        <p className="lead hero__lead" data-reveal style={{ '--d': '0.12s' }}>
          Premium websites crafted in Colombo for bold brands.
        </p>
        <div className="hero__actions" data-reveal style={{ '--d': '0.18s' }}>
          <Button to="/contact">Get in touch</Button>
          <Button to="/works" variant="dark">
            See our work
          </Button>
        </div>
      </div>
      <div className="hero__editor" data-reveal style={{ '--d': '0.26s' }}>
        <EditorShowcase />
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="tools" aria-label="Tools we work with">
      <ul className="tools__grid wrap">
        {TOOLS.map(([icon, name], i) => (
          <li key={name} data-reveal style={{ '--d': `${(i % 4) * 0.05}s` }}>
            <Brand name={icon} size={20} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services__head">
          <h2 id="services-title" className="h2" data-reveal>
            Elevate your
            <br />
            digital footprint.
          </h2>
          <div className="services__actions" data-reveal style={{ '--d': '0.08s' }}>
            <Button to="/works">See our work</Button>
            <Button to="/contact" variant="dark">
              Start a project
            </Button>
          </div>
        </div>
        <ul className="tiles">
          {SERVICE_TILES.map((t, i) => (
            <li key={t.label.join(' ')} className="tile" data-reveal style={{ '--d': `${(i % 5) * 0.05}s` }}>
              <Glyph name={t.icon} size={28} />
              <span>
                {t.label[0]}
                <br />
                {t.label[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Band() {
  return (
    <div className="band">
      <Marquee speed={36} gap={28}>
        {BAND.map((b) => (
          <span key={b} className="band__item">
            {b} <i aria-hidden="true">•</i>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function Platforms() {
  return (
    <section className="section platforms" aria-labelledby="platforms-title">
      <div className="wrap platforms__grid">
        <div className="platforms__card" data-reveal>
          <div className="platforms__stars" aria-hidden="true" />
          <h2 id="platforms-title" className="h3">
            Platform flexibility.
            <br />
            Design consistency.
          </h2>
          <p className="lead">
            Whatever the stack, our design language stays consistent, refined, responsive, and built to perform.
          </p>
          <Button to="/works" variant="dark">
            See our work
          </Button>
        </div>
        <ul className="platforms__logos" data-reveal style={{ '--d': '0.08s' }}>
          {PLATFORMS.map(([icon, name]) => (
            <li key={name} title={name}>
              <Brand name={icon} size={38} />
              <span className="platforms__name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="packages" className="section packages" aria-labelledby="packages-title">
      <div className="wrap">
        <div className="packages__head">
          <div className="packages__glow" aria-hidden="true" />
          <h2 id="packages-title" className="packages__title" data-reveal>
            Packages
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.06s' }}>
            Clear starting points. Every project is quoted on its actual scope before any work begins.
          </p>
        </div>
        <ul className="packages__grid">
          {PACKAGES.map((p, i) => (
            <li key={p.name} className="pack" data-reveal style={{ '--d': `${i * 0.06}s` }}>
              <p className="pack__name">{p.name}</p>
              <p className="pack__price">
                {p.price ? (
                  <>
                    <small>from</small> {p.price}
                  </>
                ) : (
                  <>
                    <em>Quote</em> on request
                  </>
                )}
              </p>
              <p className="pack__text">{p.text}</p>
              <ul className="pack__items">
                {p.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <div className="pack__actions">
                <Button to="/contact">Start a project</Button>
                <a href="#faq" className="pack__details">
                  Questions <ArrowRight size={14} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Finale() {
  return (
    <section className="finale" aria-labelledby="finale-title">
      <div className="wrap finale__inner">
        <h2 id="finale-title" className="display finale__title" data-reveal>
          Create Bold.
          <br />
          Deliver Better.
        </h2>
        <div className="finale__actions" data-reveal style={{ '--d': '0.08s' }}>
          <Button to="/works" variant="dark">
            See our work
          </Button>
          <Button to="/contact">Get in touch</Button>
        </div>
      </div>
      <div className="finale__mark" aria-hidden="true">
        <Mark size={640} />
      </div>
    </section>
  );
}

export default function Home() {
  const root = useRef(null);
  useReveal(root);

  useEffect(() => {
    document.title = 'WEB CEYLON | Premium Web Design Studio, Colombo';
  }, []);

  return (
    <div ref={root}>
      <Hero />
      <Tools />
      <IntroWall />
      <WorkRing />
      <Services />
      <Band />
      <Platforms />
      <Packages />
      <Approach />
      <section id="faq" className="section faq-section" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title" className="h2 section-title" data-reveal>
            Frequently Asked <em>Questions</em>
          </h2>
          <Faq />
        </div>
      </section>
      <Finale />
    </div>
  );
}
