import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, DISCIPLINES } from '../data/projects';
import useReveal from '../lib/useReveal';
import Picture from '../components/Picture';
import ContactCta from '../components/ContactCta';
import './works.css';

// A category picker in the shape of a single pill: label, current choice,
// count, chevron. Opens a small list.
function CategoryPicker({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !box.current?.contains(e.target) && setOpen(false);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const count = options.find(([n]) => n === value)?.[1] ?? 0;
  return (
    <div ref={box} className={`picker${open ? ' is-open' : ''}`}>
      <button className="picker__btn" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="picker__label">Category</span>
        <span className="picker__value">{value}</span>
        <span className="picker__count">{count}</span>
        <span className="picker__chev" aria-hidden="true" />
      </button>
      {open && (
        <ul className="picker__list" role="listbox" aria-label="Category">
          {options.map(([name, n]) => (
            <li key={name}>
              <button
                role="option"
                aria-selected={name === value}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
              >
                {name}
                <span>{n}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function WorkCard({ project, eager }) {
  return (
    <Link to={`/work/${project.slug}`} className="wcard" data-cursor="View">
      <span className="wcard__media">
        <Picture src={project.cover} alt={`${project.name} — ${project.gallery[0].caption}`} sizes="(min-width: 900px) 48vw, 92vw" eager={eager} />
        <span className="wcard__hover" aria-hidden="true">
          View Project
        </span>
      </span>
      <span className="wcard__meta">
        <span className="wcard__name">{project.name}</span>
        <span className="wcard__cat">{project.category}</span>
      </span>
    </Link>
  );
}

export default function Works() {
  const root = useRef(null);
  const [category, setCategory] = useState('All');

  const options = useMemo(() => {
    const used = DISCIPLINES.filter((d) => PROJECTS.some((p) => p.disciplines?.includes(d)));
    return [['All', PROJECTS.length], ...used.map((d) => [d, PROJECTS.filter((p) => p.disciplines.includes(d)).length])];
  }, []);
  const shown = category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.disciplines.includes(category));

  useReveal(root, [category]);
  useEffect(() => {
    document.title = 'Works — Web Design Portfolio | WEB CEYLON';
  }, []);

  return (
    <div ref={root}>
      <section className="works">
        <div className="works__glow" aria-hidden="true" />
        <div className="wrap">
          <h1 className="display works__title" data-reveal>
            Our <em>Works</em>
          </h1>
          <p className="lead works__lead" data-reveal style={{ '--d': '0.06s' }}>
            Live projects, designed and built end to end by the studio.
          </p>
          <div className="works__picker" data-reveal style={{ '--d': '0.12s' }}>
            <CategoryPicker value={category} options={options} onChange={setCategory} />
          </div>
          <ul className="works__grid">
            {shown.map((p, i) => (
              <li key={p.slug} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` }}>
                <WorkCard project={p} eager={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCta />
    </div>
  );
}
