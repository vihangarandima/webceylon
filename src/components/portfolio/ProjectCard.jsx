import { Link } from 'react-router-dom';
import { usePageTransition } from '../ui/PageTransition';
import Picture from '../ui/Picture';

export const host = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

function Frame({ src, alt, url, sizes, eager }) {
  return (
    <div className="frame">
      <div className="frame__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        {url && <span>{host(url)}</span>}
      </div>
      <Picture src={src} alt={alt} sizes={sizes} eager={eager} />
    </div>
  );
}

// One project, laid out like a page in a monograph: the homepage large on a
// tinted ground, the facts beside it, and three more real screens beneath.
export default function ProjectCard({ project, eager = false }) {
  const { go } = usePageTransition();
  const to = `/work/${project.slug}`;
  const more = project.gallery.slice(1, 4);

  const open = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
    e.preventDefault();
    const img = e.currentTarget.querySelector('img');
    go(to, img?.closest('.frame'), img?.currentSrc || `${project.cover}.png`);
  };

  return (
    <article className="project" style={{ '--accent': project.accent }} aria-labelledby={`project-${project.slug}`}>
      <Link to={to} onClick={open} className="project__stage" aria-label={`${project.name} — open the case study`}>
        <Frame
          src={project.cover}
          alt={`${project.name} — ${project.gallery[0].caption}`}
          url={project.liveUrl}
          sizes="(min-width: 1200px) 1100px, 92vw"
          eager={eager}
        />
        <span className="project__view" aria-hidden="true">
          View case study <span className="arrow">→</span>
        </span>
      </Link>

      <div className="project__info">
        <div className="project__heading">
          <span className="project__index serif">{project.index}</span>
          <h3 id={`project-${project.slug}`} className="project__name serif">
            {project.name}
          </h3>
          <p className="project__tagline">{project.tagline}</p>
        </div>

        <div className="project__body">
          <p className="project__summary">{project.summary}</p>
          <dl className="project__facts">
            <div>
              <dt className="meta">Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt className="meta">Type</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt className="meta">Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt className="meta">Built with</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
          </dl>
          <div className="project__links">
            <Link to={to} onClick={open} className="btn">
              View case study <span className="arrow">→</span>
            </Link>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Visit live site <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <ul className="project__shots" aria-label={`More screens from ${project.name}`}>
          {more.map((s) => (
            <li key={s.src}>
              <Link to={to} onClick={open} className="project__shot">
                <Frame src={s.src} alt={s.caption} sizes="(min-width: 900px) 30vw, 46vw" />
                <span className="project__caption">{s.caption}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
