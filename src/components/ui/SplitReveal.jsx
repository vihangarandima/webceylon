import { Fragment, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';

// Renders text split into lines → words → characters and reveals the
// characters rising out of a clipping mask. Screen readers get the plain text
// from a visually hidden copy; the split spans are hidden from them.
//
// `lines` is an array so line breaks are art-directed, never left to chance.
// trigger: 'view' (when scrolled into view) or 'manual' (when `play` is true).
export default function SplitReveal({
  as: Tag = 'h2',
  lines,
  className = '',
  trigger = 'view',
  play = true,
  delay = 0,
  stagger = 0.022,
  duration = 1.2,
  ...rest
}) {
  const ref = useRef(null);
  const text = lines.join(' ');

  useGSAP(
    () => {
      const chars = ref.current.querySelectorAll('.split-char');
      if (prefersReducedMotion()) return;
      if (trigger === 'manual' && !play) {
        gsap.set(chars, { yPercent: 110 });
        return;
      }
      gsap.fromTo(
        chars,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: 'expo.out',
          scrollTrigger: trigger === 'view' ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
        }
      );
    },
    { scope: ref, dependencies: [play, trigger], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="sr-only">{text}</span>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi, words) => (
            <Fragment key={wi}>
              <span className="split-word">
                {[...word].map((ch, ci) => (
                  <span className="split-char" key={ci}>
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
