import { useState } from 'react';
import { STUDIO, SERVICES, whatsappLink } from '../data/studio';
import Button from './Button';
import './contact.css';

// The site has no backend, so the form does not pretend to "send": it
// writes the message into the visitor's own email app or WhatsApp.
function Brief() {
  const [form, setForm] = useState({ name: '', email: '', service: SERVICES[0].name, message: '', via: 'email' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setError('Please add your name and a few words about the project.');
      return;
    }
    setError('');
    const body = `Hello Global Arc Solutions,\n\n${form.message}\n\nService: ${form.service}\nName: ${form.name}${form.email ? `\nEmail: ${form.email}` : ''}`;
    if (form.via === 'whatsapp') window.open(whatsappLink(body), '_blank', 'noopener');
    else
      window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(`Project enquiry — ${form.service}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="brief" onSubmit={submit} noValidate>
      <div className="brief__row">
        <label className="field">
          <span>Name *</span>
          <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your name" required />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" />
        </label>
      </div>
      <label className="field">
        <span>Service</span>
        <select value={form.service} onChange={set('service')}>
          {SERVICES.map((s) => (
            <option key={s.no}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Project *</span>
        <textarea rows={4} value={form.message} onChange={set('message')} placeholder="What are you building, and when do you need it?" required />
      </label>
      <fieldset className="brief__via">
        <legend>Reply to me by</legend>
        {[
          ['email', 'Email'],
          ['whatsapp', 'WhatsApp'],
        ].map(([v, l]) => (
          <label key={v} className={form.via === v ? 'is-on' : ''}>
            <input type="radio" name="via" value={v} checked={form.via === v} onChange={set('via')} />
            {l}
          </label>
        ))}
      </fieldset>
      <p className="brief__error" role="alert">
        {error}
      </p>
      <Button type="submit" variant="blue" className="brief__send">
        Start a project
      </Button>
      <p className="brief__note">Opens your own email app or WhatsApp with the message ready to send.</p>
    </form>
  );
}

export default function ContactCta() {
  return (
    <section id="contact" className="section cta" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="cta__card" data-reveal>
          <div className="cta__glow" aria-hidden="true" />
          <div className="cta__intro">
            <span className="tag">Let’s talk</span>
            <h2 id="contact-title" className="h2">
              Ready to build something <em>remarkable?</em>
            </h2>
            <p className="lead">
              Tell us about your project. We reply by email or WhatsApp — whichever you prefer.
            </p>
            <ul className="cta__direct">
              <li>
                <span>Email</span>
                <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
              </li>
              <li>
                <span>Phone</span>
                <a href={STUDIO.phoneHref}>{STUDIO.phoneDisplay}</a>
              </li>
              <li>
                <span>Studio</span>
                <span>{STUDIO.location}, Sri Lanka</span>
              </li>
            </ul>
          </div>
          <Brief />
        </div>
      </div>
    </section>
  );
}
