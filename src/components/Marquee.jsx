// An endless strip. The content is rendered twice so the loop is seamless;
// the copy is hidden from screen readers.
export default function Marquee({ children, speed = 40, gap = 48, pausable = false, reverse = false, className = '' }) {
  const style = { '--speed': `${speed}s`, '--gap': `${gap}px`, animationDirection: reverse ? 'reverse' : undefined };
  const cls = `marquee__track${pausable ? ' is-pausable' : ''}`;
  return (
    <div className={`marquee ${className}`}>
      <div className={cls} style={style}>
        {children}
      </div>
      <div className={cls} style={style} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
