import { cloneElement, useEffect, useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../../lib/motion';

// Pulls its single child toward the pointer while hovered, then springs back.
// Only on fine pointers; a no-op wrapper everywhere else.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const x = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  // Keep the child's own ref working alongside ours.
  const childRef = children.ref;
  const setRef = (node) => {
    ref.current = node;
    if (typeof childRef === 'function') childRef(node);
    else if (childRef) childRef.current = node;
  };
  return cloneElement(children, { ref: setRef });
}
