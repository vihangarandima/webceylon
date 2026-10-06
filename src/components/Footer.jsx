import { Link } from 'react-router-dom';
import { STUDIO, whatsappLink } from '../data/studio';
import { Brand, ArrowRight } from './icons';
import './footer.css';

const Mail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const Phone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
  </svg>
);

export default function Footer() {
  const github = STUDIO.social.find((s) => s.label === 'GitHub' && s.href);
  const links = [
    github && { label: 'GitHub', href: github.href, icon: <Brand name="github" size={18} />, external: true },
    { label: 'WhatsApp', href: whatsappLink('Hello WEB CEYLON!'), icon: <Brand name="whatsapp" size={18} />, external: true },
    { label: 'Email', href: `mailto:${STUDIO.email}`, icon: <Mail /> },
    { label: 'Call', href: STUDIO.phoneHref, icon: <Phone /> },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <ul className="footer__social wrap">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span>
                {l.icon} {l.label}
              </span>
              <ArrowRight size={15} />
            </a>
          </li>
        ))}
      </ul>

      <div className="footer__cols wrap">
        <div>
          <p className="footer__head">Studio</p>
          <Link to="/">Home</Link>
          <Link to="/works">Works</Link>
          <Link to="/#approach">Approach</Link>
          <Link to="/#faq">FAQs</Link>
        </div>
        <div>
          <p className="footer__head">Services</p>
          <Link to="/#services">Crafted Websites</Link>
          <Link to="/#services">E-commerce Design</Link>
          <Link to="/#services">Web Applications</Link>
          <Link to="/#services">3D &amp; Interaction</Link>
        </div>
        <div>
          <p className="footer__head">Work</p>
          <Link to="/work/cricket-factory">Cricket Factory</Link>
          <Link to="/work/thrive">Thrive</Link>
          <Link to="/work/caltea">Caltea Ceylon</Link>
          <Link to="/work/yamu">Yamu Car Rentals</Link>
        </div>
        <div>
          <p className="footer__head">Contact</p>
          <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          <a href={STUDIO.phoneHref}>Phone: {STUDIO.phoneDisplay}</a>
          <span>Based in {STUDIO.location}</span>
          <span>Serving Sri Lanka &amp; worldwide</span>
        </div>
      </div>

      <p className="footer__copy wrap">© {new Date().getFullYear()} WEB CEYLON. All rights reserved.</p>
    </footer>
  );
}
