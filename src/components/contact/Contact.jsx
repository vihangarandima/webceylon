import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion';
import { STUDIO, SERVICES, whatsappLink } from '../../data/studio';
import SplitReveal from '../ui/SplitReveal';
import Magnetic from '../ui/Magnetic';
import { LiyaWela, Lotus } from '../ui/Ornament';
import { useScroll } from '../ui/SmoothScroll';
import './contact.css';

// The site has no backend, so the form does not pretend to "send" anything:
// it composes the brief and hands it to the visitor's own email app or
// WhatsApp, where they can see exactly what goes out.
function Brief() {
  const [form, setForm] = useState({ name: '', email: '', service: SERVICES[0].name, message: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const body = () =>
    `Hello WEB CEYLON,\n\n${form.message}\n\nService: ${form.service}\nName: ${form.name}${form.email ? `\nEmail: ${form.email}` : ''}`;

  const valid = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a few words about the project.');
      return false;
    }
    setError('');
    return true;
  };

  const byEmail = (e) => {
    e.preventDefault();
    if (!valid()) return;
    const subject = `Project enquiry — ${form.service}`;
    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`;
  };

  const byWhatsApp = () => {
    if (!valid()) return;
    window.open(whatsappLink(body()), '_blank', 'noopener');
  };

  return (
    <form className="brief" onSubmit={byEmail} noValidate>
      <div className="brief__row">
        <label className="field">
          <span className="meta">Your name *</span>
          <input value={form.name} onChange={set('name')} autoComplete="name" required />
        </label>
        <label className="field">
          <span className="meta">Email</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <fieldset className="brief__chips">
        <legend className="meta">What do you need?</legend>
        {SERVICES.map((s) => (
          <label key={s.no} className={`chip${form.service === s.name ? ' is-on' : ''}`}>
            <input type="radio" name="service" value={s.name} checked={form.service === s.name} onChange={set('service')} />
            {s.name}
          </label>
        ))}
      </fieldset>
      <label className="field">
        <span className="meta">The project *</span>
        <textarea rows={4} value={form.message} onChange={set('message')} required placeholder="What are you building, and when do you need it?" />
      </label>
      <p className="brief__error" role="alert">
        {error}
      </p>
      <div className="brief__actions">
        <button type="submit" className="btn btn--gold">
          Send by email <span className="arrow">↗</span>
        </button>
        <button type="button" className="btn" onClick={byWhatsApp}>
          Send on WhatsApp <span className="arrow">↗</span>
        </button>
      </div>
      <p className="brief__note meta">Opens your own email app or WhatsApp with the message filled in.</p>
    </form>
  );
}

export default function Contact() {
  const root = useRef(null);
  const { scrollTo } = useScroll();
  const year = new Date().getFullYear();
  const social = STUDIO.social.filter((s) => s.href);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.contact__lotus', {
        rotate: -120,
        scale: 0.6,
        opacity: 0,
        duration: 2.4,
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });
      gsap.from('.contact__line, .brief', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: '.contact__lines', start: 'top 85%', once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="contact" className="contact" aria-labelledby="contact-title">
      <Lotus size={900} className="contact__lotus" strokeWidth={0.25} />
      <div className="wrap">
        <div className="section-head">
          <span className="meta">(08) Contact</span>
          <span className="meta">{STUDIO.hours}</span>
        </div>

        <SplitReveal
          id="contact-title"
          className="contact__title serif"
          lines={['Let’s build', 'something', 'unforgettable.']}
          stagger={0.03}
        />

        <div className="contact__grid">
          <ul className="contact__lines">
            <li className="contact__line">
              <span className="meta">Write</span>
              <Magnetic strength={0.2}>
                <a href={`mailto:${STUDIO.email}`} className="contact__big contact__big--email">
                  {STUDIO.email.split('@')[0]}
                  <wbr />@{STUDIO.email.split('@')[1]}
                </a>
              </Magnetic>
            </li>
            <li className="contact__line">
              <span className="meta">Call</span>
              <Magnetic strength={0.2}>
                <a href={STUDIO.phoneHref} className="contact__big">
                  {STUDIO.phoneDisplay}
                </a>
              </Magnetic>
            </li>
            <li className="contact__line">
              <span className="meta">Message</span>
              <Magnetic strength={0.2}>
                <a
                  href={whatsappLink('Hello WEB CEYLON, I would like to discuss a website project.')}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__big"
                >
                  WhatsApp <span className="arrow">↗</span>
                </a>
              </Magnetic>
            </li>
            <li className="contact__line">
              <span className="meta">Visit</span>
              <address className="contact__addr">{STUDIO.address}</address>
            </li>
          </ul>
          <Brief />
        </div>
      </div>

      <LiyaWela className="contact__vine" segments={16} />

      <footer className="footer wrap">
        <div className="footer__brand serif">
          WEB <em>Ceylon</em>
        </div>
        <div className="footer__row">
          <span className="meta">© {year} WEB CEYLON · {STUDIO.location}</span>
          {social.length > 0 && (
            <ul className="footer__social">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="ulink meta">
                    {s.label} <span className="arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <button className="ulink meta footer__top" onClick={() => scrollTo(0)}>
            Return to the mask ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
