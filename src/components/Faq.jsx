import { useState } from 'react';
import { FAQS } from '../data/studio';
import './faq.css';

// One answer open at a time; every question is a real button.
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="faq">
      {FAQS.map(([q, a], i) => {
        const on = open === i;
        return (
          <li key={q} className={`faq__item${on ? ' is-open' : ''}`} data-reveal style={{ '--d': `${i * 0.04}s` }}>
            <h3>
              <button
                className="faq__q"
                aria-expanded={on}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span>
                  {i + 1}. {q}
                </span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a">
              <div>
                <p>{a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
