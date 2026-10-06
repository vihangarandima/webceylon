import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import Picture from './Picture';
import './ring.css';

const PER_ROW = 10; // cards around each ring
const ROWS = [-1, 0, 1]; // three rings stacked: a room of screens

// Featured work as a room of screens. The visitor stands at the centre of a
// ring of real screenshots; scrolling past (or dragging) turns the room.
export default function WorkRing() {
  const section = useRef(null);
  const ring = useRef(null);

  const cards = useMemo(() => {
    const shots = PROJECTS.flatMap((p) => p.gallery.map((g) => ({ ...g, project: p })));
    let n = 0;
    return ROWS.flatMap((row, ri) =>
      Array.from({ length: PER_ROW }, (_, i) => ({
        shot: shots[(n++ * 7) % shots.length], // stride so neighbours differ
        angle: (360 / PER_ROW) * (i + (ri % 2 ? 0.5 : 0)),
        row,
      }))
    );
  }, []);

  useEffect(() => {
    const el = section.current;
    const r = ring.current;
    if (!el || !r) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let drag = 0;
    let drift = 0;
    let current = 0;
    let raf = 0;
    let last = performance.now();
    let dragging = null;

    const size = () => {
      const w = Math.min(400, Math.max(190, window.innerWidth * 0.28));
      const radius = w / 2 / Math.tan(Math.PI / PER_ROW) + 40;
      r.style.setProperty('--card-w', `${w}px`);
      r.style.setProperty('--radius', `${radius}px`);
    };

    const frame = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      if (!reduced && !dragging) drift += dt * 0.004;
      const target = p * 200 + drag + drift;
      current += (target - current) * (reduced ? 1 : 0.08);
      r.style.transform = `translateZ(calc(var(--radius) * 0.45)) rotateX(-4deg) rotateY(${current}deg)`;
      raf = requestAnimationFrame(frame);
    };

    // Only animate while the section is near the screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);

    const down = (e) => {
      if (e.button !== 0) return;
      dragging = { x: e.clientX, start: drag, moved: false };
    };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragging.x;
      if (Math.abs(dx) > 4) dragging.moved = true;
      drag = dragging.start + dx * 0.25;
    };
    const up = () => {
      // a drag should not also count as a click on a card
      if (dragging?.moved) el.addEventListener('click', (ev) => ev.preventDefault(), { capture: true, once: true });
      dragging = null;
    };

    size();
    window.addEventListener('resize', size);
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', size);
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <section ref={section} id="work" className="ring-section" aria-labelledby="work-title">
      <div className="ring-stage">
        <div className="ring-glow" aria-hidden="true" />
        <div className="ring-scene">
          <div ref={ring} className="ring">
            {cards.map((c, i) => (
              <Link
                key={i}
                to={`/work/${c.shot.project.slug}`}
                className="ring__card"
                style={{ '--a': `${c.angle}deg`, '--row': c.row }}
                tabIndex={-1}
                aria-hidden="true"
                draggable={false}
              >
                <Picture src={c.shot.src} alt="" sizes="400px" draggable={false} />
              </Link>
            ))}
          </div>
        </div>

        <div className="ring-shade" aria-hidden="true" />
        <div className="ring-center">
          <h2 id="work-title" className="sr-only">
            Featured works
          </h2>
          <Link to="/works" className="ring-center__link">
            View all
          </Link>
          <p className="ring-center__hint">Scroll or drag to turn</p>
        </div>
      </div>
    </section>
  );
}
