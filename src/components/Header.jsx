import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../lib/theme';
import { STUDIO, whatsappLink } from '../data/studio';
import Logo from './Logo';
import Button from './Button';
import './header.css';

export const MENU = [
  { to: '/', label: 'Home' },
  { to: '/works', label: 'Works' },
  { to: '/#services', label: 'Services' },
  { to: '/#approach', label: 'Approach' },
  { to: '/#faq', label: 'FAQs' },
  { to: '/#contact', label: 'Contact' },
];

export function ThemeSwitch({ className = '' }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      className={`switch ${className}`}
      role="switch"
      aria-checked={theme === 'light'}
      aria-label="Light theme"
      onClick={toggle}
    >
      <span className="switch__knob" />
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap header__bar">
        <Link to="/" className="header__brand" aria-label="WEB CEYLON — home">
          <Logo />
        </Link>

        <div className="header__actions">
          <ThemeSwitch />
          <Button to="/#contact" className="header__connect">
            Connect
          </Button>
          <button
            className="header__menu"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </div>

      <div id="site-menu" className="menu" hidden={!open}>
        <div className="wrap menu__inner">
          <nav aria-label="Site">
            <ul className="menu__list">
              {MENU.map((m, i) => (
                <li key={m.label} style={{ '--i': i }}>
                  <Link to={m.to} className="menu__link">
                    <span className="menu__no">0{i + 1}</span>
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu__side">
            <p className="menu__label">Say hello</p>
            <a href={`mailto:${STUDIO.email}`} className="menu__contact">
              {STUDIO.email}
            </a>
            <a href={STUDIO.phoneHref} className="menu__contact">
              {STUDIO.phoneDisplay}
            </a>
            <Button href={whatsappLink('Hello WEB CEYLON, I would like to discuss a website project.')} target="_blank" rel="noreferrer" variant="blue">
              WhatsApp us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
