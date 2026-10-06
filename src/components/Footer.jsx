import { Link } from 'react-router-dom';
import { STUDIO, whatsappLink } from '../data/studio';
import { MENU, ThemeSwitch } from './Header';
import Logo from './Logo';
import './footer.css';

export default function Footer() {
  const social = STUDIO.social.filter((s) => s.href);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p>Premium websites, web apps and online stores — designed and built in Colombo, Sri Lanka.</p>
          </div>
          <nav className="footer__col" aria-label="Footer">
            <p>Explore</p>
            {MENU.map((m) => (
              <Link key={m.label} to={m.to}>
                {m.label}
              </Link>
            ))}
          </nav>
          <div className="footer__col">
            <p>Contact</p>
            <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
            <a href={STUDIO.phoneHref}>{STUDIO.phoneDisplay}</a>
            <a href={whatsappLink('Hello WEB CEYLON!')} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
            {social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
        <p className="footer__word" aria-hidden="true">
          Web <em>Ceylon</em>
        </p>
        <div className="footer__base">
          <span>© {new Date().getFullYear()} WEB CEYLON. All rights reserved.</span>
          <span className="footer__theme">
            Theme <ThemeSwitch />
          </span>
        </div>
      </div>
    </footer>
  );
}
