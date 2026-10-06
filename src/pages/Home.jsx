import { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/projects';
import { SERVICES, PROCESS, TECHNOLOGY } from '../data/studio';
import useReveal from '../lib/useReveal';
import Button from '../components/Button';
import EditorShowcase from '../components/EditorShowcase';
import WorkRing from '../components/WorkRing';
import Marquee from '../components/Marquee';
import Faq from '../components/Faq';
import ContactCta from '../components/ContactCta';
import Picture from '../components/Picture';
import './home.css';

// A line glyph per service, on a 24px grid.
const GLYPH = {
  '01': <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
  '02': <path d="M3 5.5A1.5 1.5 0 014.5 4h15A1.5 1.5 0 0121 5.5v13a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18.5zM3 9h18M9 9v11" />,
  '03': <path d="M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z" />,
  '04': <path d="M5 8h14l-1.2 12H6.2zM9 8V6.5a3 3 0 016 0V8" />,
  '05': <path d="M6 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 20.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8.5 6h7M7.3 8.2l3.5 7.6M16.7 8.2l-3.5 7.6" />,
  '06': <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9" />,
};

const DISCIPLINES = ['UI / UX Design', 'Web Development', 'E-commerce', 'Web Applications', 'Custom Systems', '3D & Interaction'];

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__lights" aria-hidden="true" />
      <div className="wrap hero__inner">
        <span className="tag" data-reveal>
          <i className="hero__pulse" aria-hidden="true" /> Design &amp; development studio · Colombo
        </span>
        <h1 className="display hero__title" data-reveal style={{ '--d': '0.08s' }}>
          Crafted <em>Websites</em>
          <br />
          <em>Made</em> to Be Remembered
        </h1>
        <p className="lead hero__lead" data-reveal style={{ '--d': '0.16s' }}>
          Premium websites, web apps and online stores for brands that want to stand out.
        </p>
        <div className="hero__actions" data-reveal style={{ '--d': '0.24s' }}>
          <Button to="/#contact">Get in touch</Button>
          <Button to="/works" variant="line">
            See our work
          </Button>
        </div>
      </div>
      <div className="wrap hero__editor" data-reveal style={{ '--d': '0.32s' }}>
        <EditorShowcase />
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="tools" aria-label="What we build with">
      <div className="wrap">
        <ul className="tools__grid">
          {TECHNOLOGY.slice(0, 8).map((t, i) => (
            <li key={t.name} data-reveal style={{ '--d': `${i * 0.04}s` }}>
              <span className="tools__name">{t.name}</span>
              <span className="tools__use">{t.use}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Intro() {
  const [a, b] = PROJECTS;
  return (
    <section id="intro" className="section intro">
      <div className="wrap intro__grid">
        <div className="intro__copy">
          <h2 className="h2" data-reveal>
            Design that <em>speaks.</em>
            <br />
            Code that <em>performs.</em>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.08s' }}>
            WEB CEYLON is a small studio in Colombo. We design and build focused digital experiences — from a first
            sketch to the last line of code — that make a brand look as good online as it is in person, and turn
            visitors into customers.
          </p>
          <div className="intro__actions" data-reveal style={{ '--d': '0.16s' }}>
            <Button to="/#approach">Our approach</Button>
            <Button to="/works" variant="line">
              See our work
            </Button>
          </div>
        </div>
        <div className="intro__stack" aria-hidden="true">
          {[a, b].filter(Boolean).map((p, i) => (
            <div key={p.slug} className={`intro__shot intro__shot--${i}`} data-reveal style={{ '--d': `${0.1 + i * 0.12}s` }}>
              <Picture src={p.cover} sizes="(min-width: 1024px) 40vw, 80vw" />
              <span className="intro__badge">
                <i style={{ background: p.accent }} /> {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="wrap">
        <div className="services__head">
          <h2 className="h2" data-reveal>
            Elevate your
            <br />
            <em>digital presence.</em>
          </h2>
          <div className="services__headSide" data-reveal style={{ '--d': '0.08s' }}>
            <p className="lead">From a single landing page to the software your business runs on.</p>
            <Button to="/#contact" variant="blue">
              Start a project
            </Button>
          </div>
        </div>
        <ul className="services__grid">
          {SERVICES.map((s, i) => (
            <li key={s.no} className="service" data-reveal style={{ '--d': `${(i % 3) * 0.06}s` }}>
              <span className="service__icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {GLYPH[s.no]}
                </svg>
              </span>
              <h3 className="service__name">{s.name}</h3>
              <p className="service__line">{s.line}</p>
              <ul className="service__detail">
                {s.detail.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section className="section platforms" aria-labelledby="platforms-title">
      <div className="wrap platforms__head">
        <h2 id="platforms-title" className="h2" data-reveal>
          One design language.
          <br />
          <em>Every screen.</em>
        </h2>
        <p className="lead" data-reveal style={{ '--d': '0.08s' }}>
          Phone, tablet or a 4K display — the same care, the same identity, built responsive from the first line.
        </p>
      </div>
      <Marquee speed={30} gap={28} className="platforms__marquee">
        {DISCIPLINES.map((d) => (
          <span key={d} className="platforms__item">
            {d} <i aria-hidden="true">•</i>
          </span>
        ))}
      </Marquee>
      <Marquee speed={36} gap={28} reverse className="platforms__marquee platforms__marquee--ghost">
        {DISCIPLINES.map((d) => (
          <span key={d} className="platforms__item">
            {d} <i aria-hidden="true">•</i>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="section approach">
      <div className="wrap">
        <div className="section-head">
          <span className="tag" data-reveal>
            Process
          </span>
          <h2 className="h2" data-reveal style={{ '--d': '0.06s' }}>
            Our <em>approach</em>
          </h2>
          <p className="lead" data-reveal style={{ '--d': '0.12s' }}>
            A clear path from first call to launch, and beyond.
          </p>
        </div>
        <ol className="approach__grid">
          {PROCESS.map((p, i) => (
            <li key={p.no} className={`step step--${i}`} data-reveal style={{ '--d': `${i * 0.06}s` }}>
              <span className="step__no">{p.no}</span>
              <h3 className="step__name">{p.name}</h3>
              <p className="step__text">{p.text}</p>
            </li>
          ))}
        </ol>
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
      <Intro />
      <WorkRing />
      <Services />
      <Platforms />
      <Approach />
      <section id="faq" className="section faq-section">
        <div className="wrap">
          <div className="section-head">
            <span className="tag" data-reveal>
              FAQs
            </span>
            <h2 className="h2" data-reveal style={{ '--d': '0.06s' }}>
              Frequently asked <em>questions</em>
            </h2>
          </div>
          <Faq />
        </div>
      </section>
      <ContactCta />
    </div>
  );
}
