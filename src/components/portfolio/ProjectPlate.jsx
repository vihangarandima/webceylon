import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion';
import { usePageTransition } from '../ui/PageTransition';
import Picture from '../ui/Picture';

const host = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

// One project as an object in space: the cover screenshot in front, two more
// screens stacked behind it at depth. The stack tilts toward the cursor, fans
// apart on hover, and a light sheen follows the pointer across the glass.
export default function ProjectPlate({ project, eager = false }) {
  const { go } = usePageTransition();
  const object = useRef(null);
  const stack = useRef(null);
  const img = useRef(null);
  const to = `/work/${project.slug}`;
  const [back1, back2] = [project.gallery[1], project.gallery[2] || project.gallery[1]];

  useEffect(() => {
    const el = object.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    gsap.set(stack.current, { transformPerspective: 1200 });
    const rx = gsap.quickTo(stack.current, 'rotationX', { duration: 0.9, ease: 'power3.out' });
    const ry = gsap.quickTo(stack.current, 'rotationY', { duration: 0.9, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      ry((x - 0.5) * 14);
      rx(-(y - 0.5) * 10);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  const open = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks through
    e.preventDefault();
    go(to, img.current?.closest('.plate__screen'), img.current?.currentSrc || `${project.cover}.png`);
  };

  return (
    <article className="plate" style={{ '--accent': project.accent }} aria-labelledby={`plate-${project.slug}`}>
      <div ref={object} className="plate__object" data-cursor="view" data-cursor-label="View">
        <Link to={to} onClick={open} className="plate__link" aria-label={`${project.name} — read the case study`}>
          <div ref={stack} className="plate__stack">
            <Picture className="plate__layer plate__layer--2" imgClassName="plate__img" src={back2.src} alt="" sizes="30vw" />
            <Picture className="plate__layer plate__layer--1" imgClassName="plate__img" src={back1.src} alt="" sizes="30vw" />
            <div className="plate__layer plate__layer--0">
              <div className="plate__bar" aria-hidden="true">
                <span>{host(project.liveUrl)}</span>
                <span>{project.index}</span>
              </div>
              <div className="plate__screen">
                <Picture
                  ref={img}
                  imgClassName="plate__img"
                  src={project.cover}
                  alt={`${project.name} — ${project.gallery[0].caption}`}
                  sizes="(min-width: 900px) 56vw, 92vw"
                  eager={eager}
                />
                <span className="plate__sheen" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="plate__meta">
        <div className="plate__head">
          <span className="plate__index serif">{project.index}</span>
          <span className="meta">
            {project.category} · {project.year}
          </span>
        </div>
        <h3 id={`plate-${project.slug}`} className="plate__name serif">
          {project.name}
        </h3>
        <p className="plate__tagline">{project.tagline}</p>
        <p className="plate__summary">{project.summary}</p>
        <ul className="plate__stackList" aria-label="Built with">
          {project.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="plate__links">
          <Link to={to} onClick={open} className="ulink">
            Case study <span className="arrow">→</span>
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="ulink">
              Live site <span className="arrow">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="ulink">
              GitHub <span className="arrow">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
