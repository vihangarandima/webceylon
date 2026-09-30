import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register once, here, so every component imports gsap from this module and
// gets the same configured instance.
gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: 'expo.out', duration: 1.1 });

export { gsap, ScrollTrigger, useGSAP };

const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;

export const prefersReducedMotion = () => mq('(prefers-reduced-motion: reduce)');
export const hasFinePointer = () => mq('(hover: hover) and (pointer: fine)');

function useMedia(query) {
  const [match, setMatch] = useState(() => mq(query));
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsDesktop = () => useMedia('(min-width: 900px)');
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)');

// A coarse guess at what the device can afford, used only to scale the 3D
// scene. 'none' means no WebGL at all.
export function deviceTier() {
  if (typeof window === 'undefined') return 'mid';
  // Presence check only: creating a probe context costs up to seconds on
  // some drivers. If a real context then fails, the scene's error boundary
  // and context-loss handler switch to the photograph.
  if (!('WebGL2RenderingContext' in window || 'WebGLRenderingContext' in window)) return 'none';
  const saveData = navigator.connection?.saveData;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const small = window.innerWidth < 900;
  if (saveData || cores <= 2 || memory <= 2) return 'low';
  if (small || cores <= 4) return 'mid';
  return 'high';
}
