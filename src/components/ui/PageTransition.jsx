import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { useScroll } from './SmoothScroll';

const Ctx = createContext(null);

// Project → case study. The clicked preview image lifts out of the page at
// its exact on-screen position and expands to fill the viewport; the case
// study mounts underneath with the same image as its hero, and the clone
// dissolves into it. One continuous object instead of a page swap.
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const { scrollTo } = useScroll();
  const [clone, setClone] = useState(null);
  const cloneRef = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (to, fromEl, src) => {
      if (busy.current) return;
      if (!fromEl || prefersReducedMotion()) {
        navigate(to);
        scrollTo(0, { immediate: true });
        return;
      }
      busy.current = true;
      const r = fromEl.getBoundingClientRect();
      setClone({ src, rect: { top: r.top, left: r.left, width: r.width, height: r.height } });

      // Wait a frame for the clone to exist, then fly it.
      requestAnimationFrame(() => {
        const el = cloneRef.current;
        if (!el) return;
        gsap
          .timeline({
            onComplete: () => {
              navigate(to);
              scrollTo(0, { immediate: true });
              window.scrollTo(0, 0);
            },
          })
          .to(el, {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            duration: 1.1,
            ease: 'expo.inOut',
          })
          .to(el.querySelector('img'), { scale: 1.06, duration: 1.1, ease: 'expo.inOut' }, 0);
      });
    },
    [navigate, scrollTo]
  );

  // Called by the case study once its hero is on screen.
  const settle = useCallback(() => {
    const el = cloneRef.current;
    if (!el) {
      busy.current = false;
      return;
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.6,
      delay: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        setClone(null);
        busy.current = false;
      },
    });
  }, []);

  const value = useMemo(() => ({ go, settle }), [go, settle]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {clone && (
        <div
          ref={cloneRef}
          className="transition-clone"
          aria-hidden="true"
          style={{ position: 'fixed', zIndex: 120, overflow: 'hidden', ...clone.rect }}
        >
          <img src={clone.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
    </Ctx.Provider>
  );
}

export const usePageTransition = () => useContext(Ctx);
