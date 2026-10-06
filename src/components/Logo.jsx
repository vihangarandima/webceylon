// The mark: a W cut from two strokes, beside the wordmark.
export function Mark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M4 12h10l9 30 7-21-3-9h10l9 30 9-30h10L51 54H41l-7-21-7 21H17z" fill="currentColor" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="logo">
      <Mark />
      <span className="logo__word">
        Web <em>Ceylon</em>
      </span>
    </span>
  );
}
