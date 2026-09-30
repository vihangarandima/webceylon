import { useLayoutEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { getProject, nextProject } from '../../data/projects';
import { usePageTransition } from '../ui/PageTransition';
import SplitReveal from '../ui/SplitReveal';
import Picture from '../ui/Picture';
import { Lotus } from '../ui/Ornament';
import Contact from '../contact/Contact';
import './case-study.css';

function Chapter({ no, title, children, className = '' }) {
  return (
    <section className={`chapter ${className}`} aria-labelledby={`ch-${no}`}>
      <div className="chapter__label">
        <span className="chapter__no serif">{no}</span>
        <h2 id={`ch-${no}`} className="meta">
          {title}
        </h2>
      </div>
      <div className="chapter__body">{children}</div>
    </section>
  );
}

// A project told in five chapters. The hero image is the same image the
// visitor clicked, now filling the screen — the page transition hands over
// into it seamlessly.
export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const root = useRef(null);
  const { go, settle } = usePageTransition();

  useLayoutEffect(() => {
    document.title = project ? `${project.name} — WEB CEYLON` : 'WEB CEYLON';
    settle();
    return () => {
      document.title = 'WEB CEYLON — Digital experiences, crafted in Colombo';
    };
  }, [project, settle]);

  useGSAP(
    () => {
      if (!project || prefersReducedMotion()) return;
      gsap.to('.cs__heroImg img', {
        yPercent: 18,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: '.cs__hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.from('.cs__heroMeta > *', { opacity: 0, y: 24, stagger: 0.08, duration: 1.2, delay: 0.5 });
      gsap.utils.toArray('.cs__shot').forEach((el) => {
        gsap.fromTo(
          el.querySelector('.cs__shotFrame'),
          { clipPath: 'inset(12% 6% 12% 6%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
        gsap.fromTo(el.querySelector('img'), { yPercent: -6 }, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      gsap.utils.toArray('.chapter').forEach((el) => {
        gsap.from(el.querySelectorAll('.chapter__label, .chapter__text, .cs__features li, .cs__stack li'), {
          opacity: 0,
          y: 30,
          stagger: 0.05,
          duration: 1.1,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true }
  );

  if (!project) return <Navigate to="/" replace />;

  const next = nextProject(project.slug);
  const [first, ...shots] = project.gallery;
  const openNext = (e) => {
    if (e.metaKey || e.ctrlKey || e.button !== 0) return;
    e.preventDefault();
    const img = e.currentTarget.querySelector('img');
    go(`/work/${next.slug}`, e.currentTarget.querySelector('.cs__nextImg'), img?.currentSrc);
  };

  return (
    <article ref={root} className="cs" style={{ '--accent': project.accent }}>
      <header className="cs__hero">
        <Picture className="cs__heroImg" src={project.cover} alt={`${project.name} — ${first.caption}`} eager sizes="100vw" />
        <div className="cs__heroShade" aria-hidden="true" />
        <div className="cs__heroMeta wrap">
          <Link to="/#work" className="meta ulink cs__back">
            ← All work
          </Link>
          <span className="meta">
            {project.index} — {project.category} · {project.year}
          </span>
          <SplitReveal as="h1" className="cs__title serif" lines={[project.name]} delay={0.35} stagger={0.03} />
          <p className="cs__tagline">{project.tagline}</p>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn--gold cs__visit">
              Visit the live site <span className="arrow">↗</span>
            </a>
          )}
        </div>
      </header>

      <div className="wrap cs__body">
        <p className="cs__summary lead">{project.summary}</p>

        <dl className="cs__facts">
          <div>
            <dt className="meta">Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt className="meta">Discipline</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt className="meta">Year</dt>
            <dd>{project.year}</dd>
          </div>
          {project.liveUrl && (
            <div>
              <dt className="meta">Live</dt>
              <dd>
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="ulink">
                  {new URL(project.liveUrl).host.replace(/^www\./, '')} ↗
                </a>
              </dd>
            </div>
          )}
        </dl>

        {project.story.concept && (
          <Chapter no="01" title="Concept">
            <p className="chapter__text">{project.story.concept}</p>
          </Chapter>
        )}

        <Chapter no="02" title="Design" className="chapter--wide">
          {project.story.design && <p className="chapter__text">{project.story.design}</p>}
          <div className="cs__shots">
            {shots.map((s, i) => (
              <figure key={s.src} className={`cs__shot cs__shot--${i % 3}`}>
                <div className="cs__shotFrame">
                  <Picture src={s.src} alt={s.caption} sizes="(min-width: 900px) 70vw, 100vw" />
                </div>
                <figcaption className="meta">
                  <span>{String(i + 2).padStart(2, '0')}</span> {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Chapter>

        {project.story.development && (
          <Chapter no="03" title="Development">
            <p className="chapter__text">{project.story.development}</p>
            {project.features.length > 0 && (
              <ul className="cs__features">
                {project.features.map((f) => (
                  <li key={f}>
                    <Lotus size={14} /> {f}
                  </li>
                ))}
              </ul>
            )}
          </Chapter>
        )}

        <Chapter no="04" title="Technology">
          <ul className="cs__stack">
            {project.stack.map((s) => (
              <li key={s} className="serif">
                {s}
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter no="05" title="Result">
          {project.results.length > 0 ? (
            <dl className="cs__results">
              {project.results.map((r) => (
                <div key={r.label}>
                  <dt className="serif">{r.value}</dt>
                  <dd className="meta">{r.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {project.liveUrl && (
            <p className="chapter__text">
              Live and in use at{' '}
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="ulink cs__liveLink">
                {new URL(project.liveUrl).host.replace(/^www\./, '')} ↗
              </a>
            </p>
          )}
        </Chapter>
      </div>

      {next && next.slug !== project.slug && (
        <Link to={`/work/${next.slug}`} className="cs__next" onClick={openNext} data-cursor="view" data-cursor-label="Next">
          <div className="wrap cs__nextInner">
            <span className="meta">Next project — {next.index}</span>
            <span className="cs__nextName serif">{next.name}</span>
          </div>
          <div className="cs__nextImg">
            <Picture src={next.cover} alt="" sizes="100vw" />
          </div>
        </Link>
      )}

      <Contact />
    </article>
  );
}
