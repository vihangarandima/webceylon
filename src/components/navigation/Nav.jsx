import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { useScroll } from '../ui/SmoothScroll';
import { Lotus } from '../ui/Ornament';
import Magnetic from '../ui/Magnetic';
import { STUDIO, whatsappLink } from '../../data/studio';
import './nav.css';

export const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// Letters roll up on hover: the label is rendered twice, stacked.
function RollText({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const { scrollTo, stop, start, lenis } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on the way down, return on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    // let the menu close before the long scroll starts
    setTimeout(() => scrollTo(`#${id}`), open ? 500 : 0);
  };

  // Menu open/close: a paper panel wipes down, the links rise.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    if (open) {
      stop();
      el.hidden = false;
      const tl = gsap.timeline();
      tl.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: reduced ? 0 : 0.9, ease: 'expo.inOut' })
        .fromTo(el.querySelectorAll('.menu__link'), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: reduced ? 0 : 1 }, '-=0.4')
        .fromTo(el.querySelectorAll('.menu__fade'), { opacity: 0 }, { opacity: 1, duration: reduced ? 0 : 0.6, stagger: 0.05 }, '-=0.8');
      el.querySelector('.menu__link')?.focus({ preventScroll: true });
      const onKey = (e) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      return () => {
        tl.kill();
        window.removeEventListener('keydown', onKey);
      };
    }
    if (!el.hidden) {
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: reduced ? 0 : 0.8,
        ease: 'expo.inOut',
        onComplete: () => {
          el.hidden = true;
          start();
        },
      });
      btnRef.current?.focus({ preventScroll: true });
    }
  }, [open, stop, start]);

  // Close the menu on route change.
  useEffect(() => setOpen(false), [location.pathname]);

  const toTop = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollTo(0);
    }
  };

  return (
    <>
      <header className={`nav${hidden && !open ? ' is-hidden' : ''}${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" onClick={toTop} aria-label="WEB CEYLON — home">
            <Lotus size={26} className="nav__lotus" />
            <span className="nav__word">
              WEB <em>Ceylon</em>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`/#${l.id}`} onClick={go(l.id)} className="nav__link">
                <RollText>{l.label}</RollText>
              </a>
            ))}
          </nav>

          <a href="/#contact" onClick={go('contact')} className="btn nav__cta">
            Start a project
          </a>

          <Magnetic strength={0.3}>
            <button
              ref={btnRef}
              className="nav__menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="nav__menu-label">{open ? 'Close' : 'Menu'}</span>
              <span className="nav__burger" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <div id="site-menu" ref={menuRef} className="menu" hidden role="dialog" aria-modal="true" aria-label="Site menu">
        <div className="menu__inner wrap">
          <ul className="menu__list">
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} className="menu__item">
                <a href={`/#${l.id}`} onClick={go(l.id)} className="menu__link" tabIndex={open ? 0 : -1}>
                  <span className="menu__no">0{i + 1}</span>
                  <span className="menu__label">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <div className="menu__fade">
              <span className="meta">Write</span>
              <a className="ulink" href={`mailto:${STUDIO.email}`} tabIndex={open ? 0 : -1}>{STUDIO.email}</a>
            </div>
            <div className="menu__fade">
              <span className="meta">Call</span>
              <a className="ulink" href={STUDIO.phoneHref} tabIndex={open ? 0 : -1}>{STUDIO.phoneDisplay}</a>
            </div>
            <div className="menu__fade">
              <span className="meta">Message</span>
              <a className="ulink" href={whatsappLink('Hello WEB CEYLON, I would like to discuss a website project.')} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
                WhatsApp <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
