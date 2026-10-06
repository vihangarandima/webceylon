import { useEffect, useRef, useState } from 'react';
import './cursor.css';

// A blue dot that is exactly where the pointer is, and a glowing ring that
// follows a moment behind. Over links and buttons the ring opens up; over
// anything marked data-cursor="View" it becomes a solid disc with that word.
// Mouse and trackpad only, and never with reduced motion.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ mode: '', label: '', hidden: true, down: false });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setEnabled(fine.matches && !calm.matches);
    check();
    fine.addEventListener('change', check);
    calm.addEventListener('change', check);
    return () => {
      fine.removeEventListener('change', check);
      calm.removeEventListener('change', check);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('has-cursor', enabled);
    if (!enabled) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let last = '';

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const el = e.target.closest?.('[data-cursor], a, button, label, input, textarea, select, [role="button"]');
      let mode = '';
      let label = '';
      if (el?.matches('input, textarea, select')) mode = 'text';
      else if (el?.dataset.cursor) {
        mode = 'label';
        label = el.dataset.cursor;
      } else if (el) mode = 'link';
      const key = mode + label;
      if (key !== last) {
        last = key;
        setState((s) => ({ ...s, mode, label, hidden: false }));
      } else setState((s) => (s.hidden ? { ...s, hidden: false } : s));
    };
    const leave = (e) => !e.relatedTarget && setState((s) => ({ ...s, hidden: true }));
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;
  const cls = ['cursor', state.mode && `is-${state.mode}`, state.hidden && 'is-hidden', state.down && 'is-down']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} aria-hidden="true">
      <div ref={ring} className="cursor__ring">
        <span className="cursor__disc">
          <span className="cursor__label">{state.label}</span>
        </span>
      </div>
      <div ref={dot} className="cursor__dot" />
    </div>
  );
}
