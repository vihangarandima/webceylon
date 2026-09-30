import { Component, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, deviceTier, prefersReducedMotion } from '../../lib/motion';
import { scene, on, emit } from '../../lib/sceneState';
import { track, firstFrame, markFirstFrame } from '../../lib/loadTracker';
import SplitReveal from '../ui/SplitReveal';
import Picture from '../ui/Picture';
import { useScroll } from '../ui/SmoothScroll';
import './hero.css';

// The 3D chunk is fetched once, as early as possible, and the loader waits on
// both the download and the first rendered frame.
let scenePromise = null;
function loadScene() {
  if (!scenePromise) {
    scenePromise = import('../three/HeroScene');
    track(scenePromise);
    track(firstFrame);
  }
  return scenePromise;
}
const HeroScene = lazy(loadScene);

// If WebGL throws while mounting, show the photograph instead of a blank hero.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    markFirstFrame();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Fallback() {
  return (
    <div className="hero__fallback">
      <Picture
        src="/masks/gurulu_raksha_mask"
        ext="jpg"
        alt=""
        sizes="(min-width: 900px) 40vw, 80vw"
        eager
      />
    </div>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const stage = useRef(null);
  const backdrop = useRef(null);
  const [tier] = useState(deviceTier);
  const [lost, setLost] = useState(false);
  const [welcomeBack, setWelcomeBack] = useState(false);
  const reduced = prefersReducedMotion();
  const { scrollTo } = useScroll();
  const use3D = tier !== 'none' && !lost;

  if (use3D) loadScene();

  useEffect(
    () =>
      on('scene-lost', () => {
        setLost(true);
        markFirstFrame();
      }),
    []
  );

  // Hand-over from the loader: the mask rises out of the dark.
  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      scene.intro = 1;
      return;
    }
    const t = gsap.to(scene, { intro: 1, duration: 2.6, ease: 'power2.out' });
    return () => t.kill();
  }, [ready, reduced]);

  useGSAP(
    () => {
      if (reduced) {
        scene.intro = 1;
        return;
      }
      // Elements outside this section are passed as nodes: string selectors
      // are scoped to the hero by useGSAP and would not be found.
      const statementEl = document.getElementById('statement');
      // Scroll drives the camera through hero + statement.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        endTrigger: statementEl,
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scene.progress = self.progress;
          if (scene.awakened && self.progress < 0.04) setWelcomeBack(true);
        },
      });
      // The canvas fades as the portfolio arrives, then stops rendering.
      // On phones the mask cannot move aside, so it dims behind the statement.
      const narrow = window.innerWidth < 900;
      if (narrow) {
        gsap.to(stage.current, {
          opacity: 0.22,
          ease: 'none',
          scrollTrigger: { trigger: statementEl, start: 'top 85%', end: 'top 30%', scrub: true },
        });
      }
      gsap.fromTo(
        [stage.current, backdrop.current],
        { opacity: (i) => (narrow && i === 0 ? 0.22 : 1) },
        {
          opacity: 0,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: statementEl, start: 'bottom 110%', end: 'bottom 40%', scrub: true },
        }
      );
      ScrollTrigger.create({
        trigger: statementEl,
        start: 'bottom 40%',
        onEnter: () => {
          scene.active = false;
          emit('scene-active', false);
        },
        onLeaveBack: () => {
          scene.active = true;
          emit('scene-active', true);
        },
      });
      // Reaching the work wakes the mask for the visitor's return.
      ScrollTrigger.create({
        trigger: document.getElementById('work'),
        start: 'top 60%',
        once: true,
        onEnter: () => {
          scene.awakened = true;
        },
      });
      // Oversized letters drift apart and the copy recedes.
      const out = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__word--a', { xPercent: -14, yPercent: -25, ease: 'none', scrollTrigger: out });
      gsap.to('.hero__word--b', { xPercent: 12, yPercent: 20, ease: 'none', scrollTrigger: out });
      gsap.to('.hero__foot, .hero__top', { opacity: 0, y: -40, ease: 'none', scrollTrigger: { ...out, end: '60% top' } });
    },
    { scope: root }
  );

  // The small copy arrives after the title.
  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap.from('.hero__fade', { opacity: 0, y: 20, duration: 1.4, stagger: 0.1, delay: 0.9 });
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <div ref={backdrop} className="hero__backdrop" aria-hidden="true" />
      <div ref={stage} className="hero__stage">
        {use3D ? (
          <SceneBoundary fallback={<Fallback />}>
            <Suspense fallback={null}>
              <HeroScene tier={tier === 'high' ? 'high' : 'low'} reduced={reduced} />
            </Suspense>
          </SceneBoundary>
        ) : (
          <Fallback />
        )}
      </div>
      <p className="sr-only">
        A three-dimensional Gurulu Raksha mask — a traditional Sri Lankan carved wooden mask in crimson lacquer
        with gold leaf, bulging eyes, bared teeth and a crown of flames — floats in the dark and turns to follow
        the cursor.
      </p>

      <div className="hero__inner wrap">
        <div className="hero__top">
          <span className="meta hero__fade">(01) Intro</span>
          <span className="meta hero__fade">6°50′N 79°54′E — Colombo, Sri Lanka</span>
        </div>

        <h1 id="hero-title" className="hero__title">
          <SplitReveal as="span" className="hero__word hero__word--a" lines={['WEB']} trigger="manual" play={ready} stagger={0.06} duration={1.6} />
          <SplitReveal as="span" className="hero__word hero__word--b" lines={['Ceylon']} trigger="manual" play={ready} delay={0.15} stagger={0.06} duration={1.6} />
        </h1>

        <div className="hero__foot">
          <div className="hero__intro hero__fade">
            <p className="hero__claim">
              {welcomeBack ? (
                <>
                  Welcome back. <em>You’ve seen the work.</em>
                </>
              ) : (
                <>
                  We build <em>exceptional</em> digital experiences.
                </>
              )}
            </p>
            <p className="hero__sub">
              An independent web studio in Colombo. Websites, web applications and interactive work —
              made by hand, in detail, to be looked at twice.
            </p>
          </div>
          <button className="hero__scroll hero__fade" onClick={() => scrollTo('#work')}>
            <span className="meta">{welcomeBack ? 'Back to the work' : 'Scroll to the work'}</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
