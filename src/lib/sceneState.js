// Shared, mutable state between the DOM (GSAP, pointer listeners) and the
// WebGL scene (useFrame). Deliberately not React state: it changes every frame,
// and a re-render per frame is exactly what must not happen.

export const scene = {
  // Pointer in normalised device coords, -1..1, y up. Smoothed in the scene.
  pointer: { x: 0, y: 0 },
  // 0 at the top of the hero, 1 when the statement section has scrolled past.
  progress: 0,
  // 0 → 1 once the loader hands over; drives the mask emerging from darkness.
  intro: 0,
  // Set once the visitor reaches the portfolio. Coming back to the top then
  // finds the mask "awakened" — the hero has changed since they left.
  awakened: false,
  // Whether the canvas is worth rendering at all (on screen, tab visible).
  active: true,
};

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      scene.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scene.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

// Tiny event bus for the few moments the DOM needs to hear from the scene
// (and vice versa) without routing through React.
export const emit = (name, detail) =>
  window.dispatchEvent(new CustomEvent(`wc:${name}`, { detail }));

export const on = (name, fn) => {
  const h = (e) => fn(e.detail);
  window.addEventListener(`wc:${name}`, h);
  return () => window.removeEventListener(`wc:${name}`, h);
};
