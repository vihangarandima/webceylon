import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { onProgress } from '../../lib/loadTracker';
import { MaskLine } from './Ornament';
import './loader.css';

const MIN_MS = 1500;       // long enough for the mask to draw itself
const MIN_MS_REPEAT = 600; // returning in the same session: get out of the way
const MAX_MS = 7000;       // never hold anyone hostage to a slow network

// The mask draws itself out of the dark while real work loads (fonts, the 3D
// chunk, the first rendered frame), then the curtain lifts into the hero.
export default function Loader({ onDone }) {
  const root = useRef(null);
  const count = useRef(null);
  const bar = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let seen = false;
    try {
      seen = sessionStorage.getItem('wc-seen') === '1';
      sessionStorage.setItem('wc-seen', '1');
    } catch {
      /* storage blocked — show the full loader */
    }
    const minMs = reduced || seen ? MIN_MS_REPEAT : MIN_MS;
    const started = performance.now();
    document.documentElement.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const paths = root.current.querySelectorAll('.ml');
      if (!reduced) {
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, { strokeDashoffset: 0, duration: seen ? 0.8 : 1.6, stagger: 0.05, ease: 'power2.inOut' });
        gsap.from('.loader__word span', { yPercent: 110, duration: 1.1, stagger: 0.04, delay: 0.3 });
      }
    }, root);

    const shown = { v: 0 };
    let target = 0;
    let exiting = false;

    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(shown.v * 100)).padStart(3, '0');
      if (bar.current) bar.current.style.transform = `scaleX(${shown.v})`;
    };

    const exit = () => {
      if (exiting) return;
      exiting = true;
      let handed = false;
      const hand = () => {
        if (handed) return;
        handed = true;
        document.documentElement.style.overflow = '';
        onDone?.();
      };
      const finish = () => {
        hand();
        setGone(true);
      };
      if (reduced) {
        gsap.to(root.current, { opacity: 0, duration: 0.4, onComplete: finish });
        return;
      }
      gsap
        .timeline({ onComplete: finish })
        .to(shown, { v: 1, duration: 0.3, onUpdate: render })
        .to('.loader__mask', { scale: 1.25, opacity: 0, duration: 1, ease: 'expo.in' }, '<')
        .to('.loader__word span', { yPercent: -110, duration: 0.7, stagger: 0.02, ease: 'expo.in' }, '<0.2')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '-=0.35');
      // Hand over slightly before the curtain finishes so the hero is already moving.
      gsap.delayedCall(1.4, hand);
    };

    const tryExit = () => {
      if (target >= 1 && performance.now() - started >= minMs) exit();
    };

    const off = onProgress((p) => {
      target = p;
      gsap.to(shown, { v: Math.min(p, 0.98), duration: 0.8, ease: 'power2.out', onUpdate: render, overwrite: true });
      tryExit();
    });
    const poll = setInterval(tryExit, 120);
    const cap = setTimeout(exit, MAX_MS);

    return () => {
      off();
      clearInterval(poll);
      clearTimeout(cap);
      ctx.revert();
      document.documentElement.style.overflow = '';
    };
    // onDone is stable for the app's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="loader" role="status" aria-live="polite">
      <span className="sr-only">Loading WEB CEYLON</span>
      <MaskLine className="loader__mask" />
      <div className="loader__foot" aria-hidden="true">
        <div className="loader__word serif">
          {'WEB CEYLON'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </div>
        <div className="loader__progress">
          <span className="meta">Colombo — Est. in craft</span>
          <span ref={count} className="meta loader__count">000</span>
        </div>
        <div className="loader__bar">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
}
