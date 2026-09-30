import { useRef, useState } from 'react';
import { gsap, useGSAP, useIsDesktop, useReducedMotion } from '../../lib/motion';
import { PROCESS } from '../../data/studio';
import './process.css';

// Five stages as five petals of one lotus. On desktop the section pins and
// the flower opens petal by petal as you scroll through the steps.
function ProcessLotus({ step }) {
  const petal = 'M0 -10 C 16 -30, 16 -62, 0 -86 C -16 -62, -16 -30, 0 -10 Z';
  return (
    <svg viewBox="-100 -100 200 200" className="plotus" aria-hidden="true">
      <circle r="96" className="plotus__ring" />
      <circle r="92" className="plotus__ring plotus__ring--dash" />
      {PROCESS.map((_, i) => (
        <g key={i} transform={`rotate(${i * 72})`}>
          <path d={petal} className={`plotus__petal${i <= step ? ' is-on' : ''}${i === step ? ' is-current' : ''}`} />
          <text y="-92" className="plotus__no" transform="rotate(0)">
            {`0${i + 1}`}
          </text>
        </g>
      ))}
      <circle r="8" className="plotus__core" />
    </svg>
  );
}

export default function Process() {
  const root = useRef(null);
  const [step, setStep] = useState(0);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const pinned = desktop && !reduced;

  useGSAP(
    () => {
      if (!pinned) {
        setStep(PROCESS.length - 1);
        return;
      }
      setStep(0);
      gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${PROCESS.length * 60}%`,
          pin: '.process__pin',
          scrub: true,
          onUpdate: (self) => setStep(Math.min(PROCESS.length - 1, Math.floor(self.progress * PROCESS.length))),
        },
      });
    },
    { scope: root, dependencies: [pinned], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="process" className={`process${pinned ? ' process--pinned' : ''}`} aria-labelledby="process-title">
      <div className="process__pin">
        <div className="wrap process__grid">
          <div className="process__head">
            <span className="meta">(07) Process</span>
            <h2 id="process-title" className="h2 process__title">
              How the <em>work</em> gets made.
            </h2>
            <ProcessLotus step={step} />
          </div>

          <ol className="process__steps">
            {PROCESS.map((p, i) => (
              <li key={p.no} className={`pstep${i === step || !pinned ? ' is-current' : ''}${i < step ? ' is-done' : ''}`}>
                <span className="pstep__no meta">{p.no}</span>
                <h3 className="pstep__name serif">{p.name}</h3>
                <p className="pstep__text">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
