import { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getProject, nextProject } from '../data/projects';
import useReveal from '../lib/useReveal';
import Picture, { host } from '../components/Picture';
import Button from '../components/Button';
import ContactCta from '../components/ContactCta';
import { WorkCard } from './Works';
import './case-study.css';

const pad = (n) => String(n).padStart(2, '0');

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);
  const root = useRef(null);
  useReveal(root, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.name} — Case Study | WEB CEYLON`;
  }, [project]);

  if (!project) return <Navigate to="/works" replace />;

  const next = nextProject(project.slug);
  const [, ...shots] = project.gallery;
  const story = [
    ['The brief', project.story.concept],
    ['The design', project.story.design],
    ['The build', project.story.development],
  ].filter(([, t]) => t);

  return (
    <div ref={root} key={slug} style={{ '--accent': project.accent }}>
      <article className="cs">
        <div className="cs__glow" aria-hidden="true" />
        <header className="wrap cs__head">
          <Link to="/works" className="tag cs__back" data-reveal>
            ← All works
          </Link>
          <h1 className="display cs__title" data-reveal style={{ '--d': '0.06s' }}>
            {project.name}
          </h1>
          <p className="lead cs__tagline" data-reveal style={{ '--d': '0.12s' }}>
            {project.tagline}
          </p>
          <dl className="cs__facts" data-reveal style={{ '--d': '0.18s' }}>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            {project.year && (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.liveUrl && (
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    {host(project.liveUrl)} ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <div className="wrap" data-reveal style={{ '--d': '0.24s' }}>
          <div className="cs__cover">
            <Picture src={project.cover} alt={`${project.name} — ${project.gallery[0].caption}`} sizes="(min-width: 1320px) 1280px, 94vw" eager />
          </div>
        </div>

        <section className="wrap cs__overview" aria-label="Overview">
          <p className="cs__summary" data-reveal>
            {project.summary}
          </p>
          <div className="cs__aside" data-reveal style={{ '--d': '0.08s' }}>
            {project.value && (
              <div className="cs__value">
                <p className="cs__label">Why it matters</p>
                <p>{project.value}</p>
              </div>
            )}
            {project.stack.length > 0 && (
              <div>
                <p className="cs__label">Built with</p>
                <ul className="cs__chips">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} target="_blank" rel="noreferrer" variant="blue">
                Visit live site
              </Button>
            )}
          </div>
        </section>

        {story.length > 0 && (
          <section className="wrap cs__story" aria-label="The story">
            {story.map(([title, text], i) => (
              <div key={title} className="cs__chapter" data-reveal style={{ '--d': `${i * 0.06}s` }}>
                <span className="cs__no">{pad(i + 1)}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            ))}
          </section>
        )}

        {project.features.length > 0 && (
          <section className="wrap cs__features" aria-label="Key features">
            <p className="cs__label" data-reveal>
              Key features
            </p>
            <ul data-reveal>
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {shots.length > 0 && (
          <section className="wrap cs__gallery" aria-label="Screens">
            {shots.map((s, i) => (
              <figure key={s.src} className="cs__shot" data-reveal>
                <div className="cs__shotFrame">
                  <Picture src={s.src} alt={s.caption} sizes="(min-width: 900px) 46vw, 94vw" />
                </div>
                <figcaption>
                  <span>{pad(i + 2)}</span> {s.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        {project.results.length > 0 && (
          <section className="wrap cs__results" aria-label="Results">
            {project.results.map((r) => (
              <div key={r.label} data-reveal>
                <strong>{r.value}</strong>
                <span>{r.label}</span>
              </div>
            ))}
          </section>
        )}

        {next && next.slug !== project.slug && (
          <section className="wrap cs__next" aria-label="Next project">
            <p className="cs__label" data-reveal>
              Next project
            </p>
            <div className="cs__nextCard" data-reveal>
              <WorkCard project={next} />
            </div>
          </section>
        )}
      </article>
      <ContactCta />
    </div>
  );
}
