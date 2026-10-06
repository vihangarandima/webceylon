import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { useTheme } from '../lib/theme';
import Picture from './Picture';
import { Mark } from './Logo';
import './editor.css';

// The page itself, as layers. Clicking one scrolls to that section.
const LAYERS = [
  ['top', 'Hero'],
  ['tools', 'Tech Stack'],
  ['intro', 'Introduction'],
  ['work', 'Featured Works'],
  ['services', 'Services'],
  ['approach', 'Approach'],
  ['faq', 'FAQs'],
  ['contact', 'Contact'],
];

// Plausible properties for whichever layer is selected.
const PROPS = {
  Hero: { type: 'Relative', width: '1fr', height: 'Auto', max: '1200', gap: '24', pad: '120' },
  'Tech Stack': { type: 'Relative', width: '1fr', height: 'Fit', max: '1200', gap: '48', pad: '40' },
  Introduction: { type: 'Relative', width: '1fr', height: 'Auto', max: '1320', gap: '64', pad: '140' },
  'Featured Works': { type: 'Sticky', width: '1fr', height: '100vh', max: 'None', gap: '0', pad: '0' },
  Services: { type: 'Relative', width: '1fr', height: 'Auto', max: '1320', gap: '16', pad: '140' },
  Approach: { type: 'Relative', width: '1fr', height: 'Auto', max: '1320', gap: '16', pad: '140' },
  FAQs: { type: 'Relative', width: '1fr', height: 'Auto', max: '880', gap: '10', pad: '140' },
  Contact: { type: 'Relative', width: '1fr', height: 'Auto', max: '1320', gap: '40', pad: '120' },
};

const Icon = {
  desktop: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3.5" width="16" height="10" rx="1.5" />
      <path d="M7 17h6M10 13.5V17" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="2.5" width="8" height="15" rx="1.8" />
      <path d="M9 15h2" />
    </svg>
  ),
  pointer: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
      <path d="M5 3l11 6.5-4.8 1.3L9 15.5z" />
    </svg>
  ),
  pause: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
      <rect x="5" y="4" width="3.4" height="12" rx="1" />
      <rect x="11.6" y="4" width="3.4" height="12" rx="1" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
      <path d="M6 4l10 6-10 6z" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15.5 12.5A6.5 6.5 0 017.5 4.5a6.5 6.5 0 108 8z" />
    </svg>
  ),
  layer: (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 3l7 3.5-7 3.5-7-3.5zM3 10l7 3.5 7-3.5M3 13.5L10 17l7-3.5" />
    </svg>
  ),
};

export default function EditorShowcase() {
  const { toggle } = useTheme();
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState('desktop');
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);

  const shots = useMemo(
    () => PROJECTS.flatMap((p) => p.gallery.map((g) => ({ ...g, project: p }))),
    []
  );

  // The selection walks down the layers on its own, like someone at work.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % LAYERS.length), 2600);
    return () => clearInterval(id);
  }, [paused]);

  const layer = LAYERS[active][1];
  const props = PROPS[layer];
  const goTo = (i) => {
    setActive(i);
    document.getElementById(LAYERS[i][0])?.scrollIntoView({ behavior: 'smooth' });
  };

  const strip = (
    <>
      {shots.map((s) => (
        <Link key={s.src} to={`/work/${s.project.slug}`} className="shot" title={`${s.project.name} — ${s.caption}`}>
          <span className="shot__label">
            <span className="shot__dot" style={{ background: s.project.accent }} />
            {s.project.name}
          </span>
          <span className="shot__frame">
            <Picture src={s.src} alt={`${s.project.name} — ${s.caption}`} sizes="420px" draggable={false} />
          </span>
        </Link>
      ))}
    </>
  );

  return (
    <div className="editor" data-device={device}>
      <div className="editor__top">
        <span className="editor__chip">
          <Mark size={16} />
          <span aria-hidden="true">›</span>
        </span>
        <div className="editor__devices" role="group" aria-label="Preview size">
          {['desktop', 'mobile'].map((d) => (
            <button key={d} aria-pressed={device === d} aria-label={`${d} preview`} onClick={() => setDevice(d)}>
              {Icon[d]}
            </button>
          ))}
        </div>
        <span className="editor__readout">
          <span>W</span> {device === 'desktop' ? '1440px' : '390px'}
          <i />
          <span>⌕</span> 100%
        </span>
        <span className="editor__avatars" aria-hidden="true">
          <b>WC</b>
        </span>
      </div>

      <div className="editor__body">
        <aside className="editor__left" aria-label="Page sections">
          <div className="editor__tabs" aria-hidden="true">
            <span>Pages</span>
            <span className="is-on">Layers</span>
            <span>Assets</span>
          </div>
          <div className="editor__page">
            <span>⌂ Home</span>
            <span aria-hidden="true">⌄</span>
          </div>
          <ul className="editor__layers">
            {LAYERS.map(([id, name], i) => (
              <li key={id}>
                <button className={i === active ? 'is-on' : ''} onClick={() => goTo(i)}>
                  <span aria-hidden="true">›</span>
                  {Icon.layer}
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="editor__canvas">
          <div className="editor__viewport">
            <div className="editor__strip">
              <div className={`editor__track${paused ? ' is-paused' : ''}`} style={{ '--speed': `${60 / speed}s` }}>
                {strip}
              </div>
              <div className={`editor__track${paused ? ' is-paused' : ''}`} style={{ '--speed': `${60 / speed}s` }} aria-hidden="true">
                {strip}
              </div>
            </div>
          </div>
          <p className="editor__hint">Hover to hold · click a shot to open its project</p>
        </div>

        <aside className="editor__right" aria-hidden="true">
          <p className="editor__panelTitle">{layer}</p>
          <dl>
            <dt>Position</dt>
            <dd>
              <span>Type</span>
              <b>{props.type}</b>
            </dd>
            <dt>Size</dt>
            <dd>
              <span>Width</span>
              <b>{props.width}</b>
              <em>Fill</em>
            </dd>
            <dd>
              <span>Height</span>
              <b>{props.height}</b>
              <em>Fit</em>
            </dd>
            <dd>
              <span>Max W</span>
              <b>{props.max}</b>
            </dd>
            <dt>Layout</dt>
            <dd>
              <span>Gap</span>
              <b>{props.gap}</b>
            </dd>
            <dd>
              <span>Padding</span>
              <b>{props.pad}</b>
            </dd>
            <dt>Effects</dt>
            <dd>
              <span>Appear</span>
              <b>Fade up</b>
            </dd>
          </dl>
        </aside>
      </div>

      <div className="editor__toolbar" role="toolbar" aria-label="Showcase controls">
        <span className="editor__tool is-on" aria-hidden="true">
          {Icon.pointer}
        </span>
        <button className="editor__tool" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play' : 'Pause'}>
          {paused ? Icon.play : Icon.pause}
        </button>
        <button className="editor__tool editor__speed" onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))} aria-label={`Speed ${speed}x`}>
          {speed}X
        </button>
        <button className="editor__tool" onClick={toggle} aria-label="Switch theme">
          {Icon.moon}
        </button>
      </div>
    </div>
  );
}
