import { Link } from 'react-router-dom';

// Pill button. Internal routes use `to`, everything else `href`, actions
// neither. The label rolls up on hover (see .roll in global.css).
export default function Button({ to, href, variant = 'solid', className = '', children, icon, ...rest }) {
  const cls = `btn btn--${variant} ${className}`;
  const inner = (
    <>
      <span className="roll" data-text={children}>
        <span>{children}</span>
      </span>
      {icon}
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
