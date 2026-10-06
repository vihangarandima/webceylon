import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import { drawLines } from './lines';
import './sphere.css';

// Featured works: a globe of curved project cards in a tall section. The
// stage stays on screen while the visitor scrolls through; the globe turns
// with the scroll (and with a drag), "Our Works" waits behind it, and at the
// end it gives way to "View all".
export default function WorksSphere() {
  const section = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const bg = useRef(null);
  const navigate = useNavigate();
  const [end, setEnd] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [fallback, setFallback] = useState(false);

  const shots = useMemo(() => PROJECTS.flatMap((p) => p.gallery.map((g) => ({ ...g, project: p }))), []);

  useEffect(() => {
    const sec = section.current;
    const st = stage.current;
    const cv = canvas.current;
    const bgc = bg.current;
    if (!sec || !st || !cv || !bgc) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 700;
    let sphere = null;
    let raf = 0;
    let visible = false;
    let alive = true;
    let drag = null;
    const bctx = bgc.getContext('2d');

    const progress = () => {
      const r = sec.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    };

    const size = () => {
      const w = st.clientWidth;
      const h = st.clientHeight;
      bgc.width = Math.round(w / 2);
      bgc.height = Math.round(h / 2);
      sphere?.resize(w, h);
    };

    const frame = (now) => {
      const p = progress();
      setEnd((e) => (e !== p > 0.8 ? p > 0.8 : e));
      drawLines(bctx, bgc.width, bgc.height, reduced ? 0 : now / 1000);
      if (sphere) {
        sphere.setProgress(p);
        sphere.render(now);
      }
      if (visible && alive) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(sec);

    // The 3D chunk loads only once the section is near.
    const loadIo = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        loadIo.disconnect();
        import('./sphereScene')
          .then(({ createSphere }) => {
            if (!alive) return;
            try {
              sphere = createSphere(cv, { shots, small, onHover: (s) => setHovered(s) });
              size();
              cv.classList.add('is-ready');
            } catch {
              setFallback(true); // no WebGL: the grid below stands in
            }
          })
          .catch(() => setFallback(true));
      },
      { rootMargin: '600px 0px' }
    );
    loadIo.observe(sec);

    const down = (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, moved: false };
    };
    // Cards are only pickable while the globe is on screen and before
    // "View all" takes over the centre.
    const pickable = () => visible && sphere && progress() <= 0.8;

    const move = (e) => {
      if (!visible) return;
      const r = st.getBoundingClientRect();
      if (drag) {
        const dx = e.clientX - drag.x;
        if (Math.abs(dx) > 3) drag.moved = true;
        drag.x = e.clientX;
        sphere?.dragBy(dx * 0.006);
      }
      const shot = pickable() ? sphere.pick(e.clientX - r.left, e.clientY - r.top) : sphere?.pick(-1e4, -1e4);
      st.dataset.cursor = shot ? 'View' : 'Drag';
    };
    const up = (e) => {
      if (drag && !drag.moved && pickable()) {
        const r = st.getBoundingClientRect();
        const shot = sphere.pick(e.clientX - r.left, e.clientY - r.top);
        if (shot) navigate(`/work/${shot.project.slug}`);
      }
      drag = null;
    };

    size();
    window.addEventListener('resize', size);
    st.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      loadIo.disconnect();
      window.removeEventListener('resize', size);
      st.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      sphere?.dispose();
    };
  }, [shots, navigate]);

  return (
    <section ref={section} id="work" className="sphere-section" aria-labelledby="work-title">
      <div ref={stage} className={`sphere-stage${end ? ' is-end' : ''}`} data-cursor="Drag">
        <canvas ref={bg} className="sphere-lines" aria-hidden="true" />
        <div className="sphere-grain" aria-hidden="true" />

        <h2 id="work-title" className="sphere-title">
          <span className="sphere-title__our">Our</span> <em>Works</em>
        </h2>
        <Link to="/works" className="sphere-all" tabIndex={end ? 0 : -1}>
          View all
        </Link>

        <canvas ref={canvas} className="sphere-canvas" aria-hidden="true" />

        <p className={`sphere-caption${hovered ? ' is-on' : ''}`} aria-hidden="true">
          {hovered ? (
            <>
              <i style={{ background: hovered.project.accent }} /> {hovered.project.name}
            </>
          ) : (
            ' '
          )}
        </p>
      </div>

      {/* For screen readers, keyboards and browsers without WebGL */}
      <ul className={`sphere-list${fallback ? ' is-visible' : ''}`}>
        {PROJECTS.map((p) => (
          <li key={p.slug}>
            <Link to={`/work/${p.slug}`}>
              {p.name} — {p.category}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
