import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { LiyaWela } from '../ui/Ornament';
import './statement.css';

// Words brighten one by one as you read down the page, while the camera
// swings around the mask behind them.
const WORDS = [
  ['WEB CEYLON is a small studio in Colombo.'],
  ['We design and build for the web the way this island has always carved its masks —'],
  ['by hand,', 'em'],
  ['with obsessive attention,'],
  ['and meant to be', ''],
  ['looked at twice.', 'em'],
];

export default function Statement() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.statement__w',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.statement__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
      const vine = root.current.querySelectorAll('.statement__vine path');
      vine.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(vine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="statement" className="statement" aria-label="About the studio in one sentence">
      <div className="wrap statement__grid">
        <span className="meta statement__label">(02) Statement</span>
        <p className="statement__text">
          {WORDS.map(([chunk, style], i) =>
            chunk.split(' ').map((w, j) => (
              <span key={`${i}-${j}`} className={`statement__w${style === 'em' ? ' statement__w--em' : ''}`}>
                {w}{' '}
              </span>
            ))
          )}
        </p>
        <div className="statement__notes">
          <p>
            <span className="meta">Where</span>
            Boralasgamuwa, Colombo — working with clients in Sri Lanka and abroad.
          </p>
          <p>
            <span className="meta">What</span>
            Websites, web applications, e-commerce and interactive work.
          </p>
        </div>
      </div>
      <LiyaWela className="statement__vine" segments={14} />
    </section>
  );
}
