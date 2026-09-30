import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, useIsDesktop, useReducedMotion } from '../../lib/motion';
import { PROJECTS } from '../../data/projects';
import { useScroll } from '../ui/SmoothScroll';
import { Lotus } from '../ui/Ornament';
import SplitReveal from '../ui/SplitReveal';
import Magnetic from '../ui/Magnetic';
import ProjectPlate from './ProjectPlate';
import './work.css';

const pad = (n) => String(n).padStart(2, '0');

// Desktop: the section pins and the work travels past horizontally, each
// project turning in space as it crosses the centre of the screen.
// Mobile and reduced motion: the same plates, stacked, revealed as you scroll.
export default function Work() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const counter = useRef(null);
  const desktop = useIsDesktop();
  const reduced = useReducedMotion();
  const horizontal = desktop && !reduced;
  const { scrollTo } = useScroll();
  const total = PROJECTS.length;

  useGSAP(
    () => {
      if (!horizontal) {
        if (reduced) return;
        gsap.utils.toArray('.plate__object').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(18% 8% 18% 8%)', scale: 0.92 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: 1.4,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            }
          );
        });
        return;
      }

      const el = track.current;
      const panels = gsap.utils.toArray('.work__panel', el).map((p) => ({
        panel: p,
        object: p.querySelector('.plate__object, .work__panelObject'),
      }));
      const objects = panels.map((p) => p.object).filter(Boolean);
      const plates = gsap.utils.toArray('.plate', el);
      const distance = () => el.scrollWidth - window.innerWidth;

      // Turn each object by how far its panel is from the centre of the screen:
      // square-on when it arrives, angled away as it comes and goes.
      const place = () => {
        const vw = window.innerWidth;
        panels.forEach(({ panel, object }) => {
          if (!object) return;
          const r = panel.getBoundingClientRect();
          const d = gsap.utils.clamp(-1.3, 1.3, (r.left + r.width / 2 - vw / 2) / vw);
          object.style.transform = `perspective(1400px) rotateY(${d * -26}deg) translateZ(${Math.abs(d) * -240}px)`;
        });
        let current = 0;
        plates.forEach((p, i) => {
          const r = p.getBoundingClientRect();
          const active = Math.abs(r.left + r.width / 2 - vw / 2) < vw * 0.32;
          p.classList.toggle('is-active', active);
          if (r.left < vw * 0.6) current = i + 1;
        });
        if (counter.current) counter.current.textContent = pad(Math.max(1, Math.min(total, current)));
      };

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            place();
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
          onRefresh: place,
        },
      });
      place();
      ScrollTrigger.refresh();
      return () => {
        objects.forEach((o) => (o.style.transform = ''));
        plates.forEach((p) => p.classList.remove('is-active'));
      };
    },
    { scope: root, dependencies: [horizontal, reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="work" className={`work ${horizontal ? 'work--h' : 'work--v'}`} aria-labelledby="work-title">
      <div className="work__viewport">
        <div ref={track} className="work__track">
          <div className="work__panel work__panel--intro">
            <div className="work__panelObject">
              <span className="meta">(03) Selected work</span>
              <SplitReveal as="h2" id="work-title" className="work__title serif" lines={['Selected', 'Work']} />
              <p className="work__lede">
                Live projects, designed and built end to end by the studio. Every screen you see here is real and in use today.
              </p>
              <span className="work__hint meta" aria-hidden="true">
                {horizontal ? 'Keep scrolling' : 'Scroll'} <span className="work__hintLine" />
              </span>
            </div>
          </div>

          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="work__panel work__panel--project">
              <ProjectPlate project={p} eager={i === 0} />
            </div>
          ))}

          <div className="work__panel work__panel--next">
            <div className="work__panelObject work__next">
              <Lotus size={120} className="work__nextLotus" strokeWidth={0.8} />
              <span className="work__nextIndex serif">{pad(total + 1)}</span>
              <h3 className="work__nextTitle serif">
                Your <em>project</em>
              </h3>
              <p className="work__lede">The next plate in this gallery is yours. Tell us what you are building.</p>
              <Magnetic>
                <a
                  href="#contact"
                  className="btn btn--gold"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contact');
                  }}
                >
                  Start a project <span className="arrow">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {horizontal && (
          <div className="work__progress" aria-hidden="true">
            <span className="meta">
              <span ref={counter}>01</span> / {pad(total)}
            </span>
            <span className="work__bar">
              <span ref={bar} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
