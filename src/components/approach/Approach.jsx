import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../data/projects';
import './approach.css';

const [P1, P2, P3] = PROJECTS;

// ---------------------------------------------------------------------------
// Visuals — each one drawn in code from the studio's own work.

function DiscoveryVisual() {
  return (
    <div className="av av--discovery" aria-hidden="true">
      <img className="av-discovery__back" src={`${P2.cover}-800.webp`} alt="" loading="lazy" />
      <img className="av-discovery__front" src={`${P1.cover}-800.webp`} alt="" loading="lazy" />
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="av av--mobile" aria-hidden="true">
      <div className="av-mobile__planet" />
      <div className="av-mobile__phone">
        <span className="av-mobile__notch" />
        <img src={`${P1.gallery[1]?.src || P1.cover}-800.webp`} alt="" loading="lazy" />
      </div>
    </div>
  );
}

// A small sales dashboard. Bars grow once the card is on screen.
function DashboardVisual() {
  const bars = [42, 58, 35, 70, 52, 84, 63, 90, 48, 76, 66, 95];
  return (
    <div className="av av--dash" aria-hidden="true">
      <div className="av-dash__screen">
        <div className="av-dash__side">
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} className={i === 1 ? 'is-on' : ''} />
          ))}
        </div>
        <div className="av-dash__main">
          <div className="av-dash__tiles">
            {[
              ['Total orders', '1,284', '+12%'],
              ['Revenue', '$48,620', '+8%'],
              ['Visitors', '32,910', '+21%'],
            ].map(([k, v, d]) => (
              <div key={k} className="av-dash__tile">
                <span>{k}</span>
                <b>{v}</b>
                <em>{d}</em>
              </div>
            ))}
          </div>
          <div className="av-dash__chart">
            <span className="av-dash__chartTitle">Revenue analytics</span>
            <div className="av-dash__bars">
              {bars.map((h, i) => (
                <i key={i} style={{ '--h': `${h}%`, '--i': i }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="av-dash__note">Illustrative dashboard</p>
    </div>
  );
}

// An editor with two collaborators' cursors moving around the canvas.
function EditorVisual() {
  return (
    <div className="av av--editor" aria-hidden="true">
      <div className="av-editor__window">
        <div className="av-editor__bar">
          <i />
          <i />
          <i />
          <span>Home — Desktop</span>
        </div>
        <div className="av-editor__body">
          <ul className="av-editor__layers">
            {['Desktop', 'Header', 'Hero', 'Featured Works', 'Services', 'Approach', 'Footer'].map((l, i) => (
              <li key={l} className={i === 2 ? 'is-on' : ''} style={{ paddingLeft: i ? 18 : 6 }}>
                {l}
              </li>
            ))}
          </ul>
          <div className="av-editor__canvas">
            <span className="av-editor__frameLabel">Desktop</span>
            <div className="av-editor__frame">
              <img src={`${P3?.cover || P1.cover}-800.webp`} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
      <span className="av-cursor av-cursor--a">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M2 1l11 6-5 1.4L6 14z" fill="currentColor" />
        </svg>
        <b>You</b>
      </span>
      <span className="av-cursor av-cursor--b">
        <svg viewBox="0 0 16 16" width="16" height="16">
          <path d="M2 1l11 6-5 1.4L6 14z" fill="currentColor" />
        </svg>
        <b>Global Arc</b>
      </span>
    </div>
  );
}

// The studio's real projects as rows in a content table.
function CmsVisual() {
  return (
    <div className="av av--cms" aria-hidden="true">
      <div className="av-cms__table">
        <div className="av-cms__head">
          <span>Title</span>
          <span>Category</span>
          <span>Image</span>
        </div>
        {PROJECTS.map((p) => (
          <div key={p.slug} className="av-cms__row">
            <span className="av-cms__title">
              <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor">
                <path d="M3 1h7l3 3v11H3z" />
              </svg>
              {p.name}
            </span>
            <span className="av-cms__cat">{p.category.split(' · ')[0]}</span>
            <img src={`${p.cover}-800.webp`} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

// A watch face keeping Colombo time.
function ClockVisual() {
  const [now, setNow] = useState(() => new Date());
  const ref = useRef(null);

  useEffect(() => {
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting) id = setInterval(() => setNow(new Date()), 1000);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);

  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' })
    .formatToParts(now)
    .reduce((o, p) => ({ ...o, [p.type]: Number(p.value) }), {});
  const s = parts.second || 0;
  const m = (parts.minute || 0) + s / 60;
  const h = ((parts.hour || 0) % 12) + m / 60;

  return (
    <div ref={ref} className="av av--clock" aria-hidden="true">
      <div className="av-clock">
        {Array.from({ length: 60 }, (_, i) => (
          <i key={i} className={i % 5 ? 'av-clock__tick' : 'av-clock__tick is-hour'} style={{ '--r': `${i * 6}deg` }} />
        ))}
        {[12, 3, 6, 9].map((n) => (
          <span key={n} className={`av-clock__num av-clock__num--${n}`}>
            {n}
          </span>
        ))}
        <b className="av-clock__hand av-clock__hand--h" style={{ '--r': `${h * 30}deg` }} />
        <b className="av-clock__hand av-clock__hand--m" style={{ '--r': `${m * 6}deg` }} />
        <b className="av-clock__hand av-clock__hand--s" style={{ '--r': `${s * 6}deg` }} />
        <span className="av-clock__pin" />
        <span className="av-clock__label">Colombo</span>
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: 'Discovery First',
    text: (
      <>
        We begin by <b>defining clear goals</b>, understanding your audience, and aligning with your brand voice to
        set a strong foundation.
      </>
    ),
    Visual: DiscoveryVisual,
  },
  {
    title: 'Mobile-First Design',
    text: (
      <>
        Every layout is designed for <b>seamless mobile-first experiences</b>, ensuring performance across all
        devices.
      </>
    ),
    Visual: MobileVisual,
  },
  {
    title: 'Conversion-Driven',
    text: (
      <>
        Websites built with strategy, designed to engage audiences, and crafted to turn <b>visitors into customers</b>.
      </>
    ),
    Visual: DashboardVisual,
  },
  {
    title: 'Pixel-Perfect Development',
    text: (
      <>
        Designed and developed with <b>pixel-perfect precision</b>, delivering high performance and easy updates.
      </>
    ),
    Visual: EditorVisual,
  },
  {
    title: 'Seamless Launch',
    text: (
      <>
        Launched without downtime and handed over with everything you need — <b>update your content
        effortlessly</b> after going live, or let us handle it.
      </>
    ),
    Visual: CmsVisual,
  },
  {
    title: 'Future-Ready',
    text: (
      <>
        Websites designed to be <b>scalable and future-ready</b>, adapting as your business grows.
      </>
    ),
    Visual: ClockVisual,
  },
];

export default function Approach() {
  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="wrap">
        <h2 id="approach-title" className="h2 approach__title" data-reveal>
          Our Approach
        </h2>
        <div className="approach__grid">
          {CARDS.map(({ title, text, Visual }, i) => (
            <article key={title} className={`acard acard--${i}`} data-reveal style={{ '--d': `${(i % 2) * 0.08}s` }}>
              <div className="acard__copy">
                <h3 className="h3">{title}</h3>
                <p className="lead text">{text}</p>
              </div>
              <Visual />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
