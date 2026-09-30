import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/motion';

const ScrollCtx = createContext(null);

// Lenis for inertia, driven from GSAP's ticker so ScrollTrigger and the smooth
// scroll share one clock. Skipped entirely under reduced motion, where native
// scrolling is the right answer.
export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target, opts = {}) => {
    const lenis = lenisRef.current;
    const offset = opts.offset ?? 0;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: opts.immediate ? 0 : 1.6, immediate: opts.immediate });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY + offset : 0;
    window.scrollTo({ top, behavior: opts.immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const value = useMemo(
    () => ({
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
      lenis: () => lenisRef.current,
    }),
    [scrollTo]
  );

  return <ScrollCtx.Provider value={value}>{children}</ScrollCtx.Provider>;
}

export const useScroll = () => useContext(ScrollCtx);
