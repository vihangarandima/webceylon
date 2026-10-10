// The mark: a precision geometric G-Arc with satellite zenith accent
export function Mark({ size = 26, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M52 18 C46.5 9 37.5 4 27.5 4 C12.3 4 0 16.3 0 31.5 C0 46.7 12.3 59 27.5 59 C42.7 59 55 46.7 55 31.5 C55 30 54 28.5 52.5 28.5 L28 28.5 C26.3 28.5 25 29.8 25 31.5 L25 35.5 C25 37.2 26.3 38.5 28 38.5 L44.2 38.5 C41.2 46 34.5 50 27.5 50 C17.3 50 9 41.7 9 31.5 C9 21.3 17.3 13 27.5 13 C33.5 13 39 16 42.5 21 C43.5 22.5 45.8 22.8 47.3 21.8 L50.5 19.5 C51.5 18.8 51.5 18.2 52 18 Z"
        fill="currentColor"
        transform="translate(4.5, 0)"
      />
      <circle cx="56.5" cy="18" r="3.5" fill="var(--blue, #1f6bff)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="logo">
      <Mark />
      <span className="logo__word">
        Global Arc <em>Solutions</em>
      </span>
    </span>
  );
}

