import { useEffect, useMemo, useRef } from 'react';
import { PROJECTS } from '../data/projects';
import Button from './Button';
import './intro-wall.css';

// Every screen of every project, as one list.
const ALL = PROJECTS.flatMap((p) => p.gallery.map((g) => ({ ...g, project: p })));

// How far each row slides per pixel scrolled, and in which direction.
const RATES = [-0.12, 0.16, -0.32];

// "Design that speaks": three rows of real screens fill the section and
// slide sideways at different speeds as the page scrolls past, with the
// words on a dark fade at the left.
export default function IntroWall() {
  const section = useRef(null);
  const tracks = useRef([]);

  // Each row starts at a different screen so neighbours never repeat.
  const rows = useMemo(
    () =>
      RATES.map((_, r) => {
        const start = (r * 5) % ALL.length;
        // repeated so a long row never runs out, whatever the scroll
        return Array.from({ length: ALL.length * 2 }, (_, i) => ALL[(start + i) % ALL.length]);
      }),
    []
  );

  useEffect(() => {
    const el = section.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let visible = false;
    const pos = RATES.map(() => 0);

    const frame = () => {
      const r = el.getBoundingClientRect();
      // 0 when the section's top meets the bottom of the screen
      const scrolled = window.innerHeight - r.top;
      tracks.current.forEach((t, i) => {
        if (!t) return;
        // the rows start shifted so the moving one never shows its end
        const base = RATES[i] < 0 ? 0 : -t.scrollWidth / 4;
        const target = base + scrolled * RATES[i];
        pos[i] += (target - pos[i]) * 0.12;
        t.style.transform = `translate3d(${pos[i]}px, 0, 0)`;
      });
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={section} id="intro" className="iwall" aria-labelledby="intro-title">
      <div className="iwall__rows" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="iwall__row">
            <div ref={(n) => (tracks.current[r] = n)} className="iwall__track">
              {row.map((s, i) => (
                <img
                  key={i}
                  src={`${s.src}-800.webp`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="iwall__tile"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="iwall__shade" aria-hidden="true" />

      <div className="wrap iwall__copy">
        <h2 id="intro-title" className="iwall__title" data-reveal>
          Design that speaks.
          <br />
          Delivery that converts.
        </h2>
        <p className="iwall__text" data-reveal style={{ '--d': '0.08s' }}>
          WEB CEYLON crafts focused digital experiences that make a brand look as good online as it is in person.
          Considered design and clean engineering, from the first sketch to the last line of code — built to win
          attention and turn visitors into customers.
        </p>
        <div className="iwall__actions" data-reveal style={{ '--d': '0.16s' }}>
          <Button to="/#approach">Our approach</Button>
          <Button to="/works" variant="dark">
            See our work
          </Button>
        </div>
      </div>
    </section>
  );
}
