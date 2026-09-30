import { useEffect, useRef, useState } from 'react';
import { gsap, useFinePointer, useReducedMotion } from '../../lib/motion';
import { on } from '../../lib/sceneState';
import './cursor.css';

// States come from the element under the pointer:
//   data-cursor="view"  — project plates: ring grows and reads VIEW
//   data-cursor="text"  — custom label via data-cursor-label
//   a / button          — ring tightens (links also get magnetic pull)
//   the 3D mask         — reported by the scene; ring becomes a carved halo
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const dot = useRef(null);
  const ring = useRef(null);
  const [state, setState] = useState({ kind: 'default', label: '' });
  const [hidden, setHidden] = useState(true);
  const maskHover = useRef(false);
  const domState = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('has-cursor', enabled);
    if (!enabled) return;

    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' });
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' });
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' });
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' });

    const resolve = () => {
      if (domState.current) setState(domState.current);
      else setState(maskHover.current ? { kind: 'mask', label: '' } : { kind: 'default', label: '' });
    };

    const move = (e) => {
      xd(e.clientX);
      yd(e.clientY);
      xr(e.clientX);
      yr(e.clientY);
      setHidden(false);
    };
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button, input, textarea, select, label');
      if (!t) domState.current = null;
      else if (t.matches('input, textarea, select')) domState.current = { kind: 'hidden', label: '' };
      else if (t.dataset.cursor === 'view') domState.current = { kind: 'view', label: t.dataset.cursorLabel || 'View' };
      else if (t.dataset.cursor === 'text') domState.current = { kind: 'view', label: t.dataset.cursorLabel || '' };
      else domState.current = { kind: 'link', label: '' };
      resolve();
    };
    const leave = () => setHidden(true);
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');

    const offMask = on('mask-hover', (v) => {
      maskHover.current = v;
      resolve();
    });

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      offMask();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor cursor--${state.kind}${hidden ? ' is-hidden' : ''}`} aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span className="cursor__label">{state.label}</span>
        <svg className="cursor__halo" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" />
        </svg>
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}
