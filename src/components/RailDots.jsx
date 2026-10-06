import { useEffect, useState } from 'react';

// Position dots for a list that becomes a swipeable rail on phones (the
// `.rail` class in global.css). Tapping a dot scrolls to that card. Shown
// only where the list actually scrolls sideways.
export default function RailDots({ railRef, count, label = 'Swipe' }) {
  const [active, setActive] = useState(0);
  const [scrolls, setScrolls] = useState(false);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const measure = () => setScrolls(el.scrollWidth > el.clientWidth + 4);
    const onScroll = () => {
      const card = el.firstElementChild;
      if (!card) return;
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 0);
      setActive(Math.min(count - 1, Math.round(el.scrollLeft / step)));
    };
    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [railRef, count]);

  if (!scrolls) return null;
  const go = (i) => {
    const el = railRef.current;
    const card = el.children[i];
    if (card) el.scrollTo({ left: card.offsetLeft - el.firstElementChild.offsetLeft, behavior: 'smooth' });
  };
  return (
    <div className="rail-dots">
      <span className="rail-dots__label" aria-hidden="true">
        {label} <span>→</span>
      </span>
      <div className="rail-dots__dots" role="group" aria-label="Choose a card">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} className={i === active ? 'is-on' : ''} aria-label={`Card ${i + 1} of ${count}`} aria-current={i === active} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}
