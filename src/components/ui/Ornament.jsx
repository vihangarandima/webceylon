// The studio's ornamental vocabulary, drawn in code so every line can be
// animated (stroke-dash) and recoloured with currentColor.
//
//   Lotus    — the brand glyph; eight petals, two rings. Also the process dial.
//   MaskLine — a line drawing of a Gurulu Raksha mask, used by the loader.

const TAU = Math.PI * 2;
const f = (n) => Math.round(n * 100) / 100;

function petal(r1, r2, width) {
  // A pointed lotus petal from radius r1 to r2 along the -y axis.
  const mid = (r1 + r2) / 2;
  return `M0 ${f(-r1)} C ${f(width)} ${f(-mid)}, ${f(width * 0.6)} ${f(-r2 + (r2 - r1) * 0.15)}, 0 ${f(-r2)} C ${f(-width * 0.6)} ${f(-r2 + (r2 - r1) * 0.15)}, ${f(-width)} ${f(-mid)}, 0 ${f(-r1)} Z`;
}

export function Lotus({ size = 40, petals = 8, className = '', petalClass = '', strokeWidth = 1.2, ...rest }) {
  const outer = petal(14, 46, 13);
  const inner = petal(8, 30, 9);
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true" {...rest}>
      {Array.from({ length: petals }, (_, i) => (
        <path key={`o${i}`} className={petalClass} data-i={i} d={outer} transform={`rotate(${(360 / petals) * i})`} />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <path key={`i${i}`} d={inner} opacity="0.6" transform={`rotate(${(360 / petals) * i + 180 / petals})`} />
      ))}
      <circle r="5" />
      <circle r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Flame crown points around an arc, for the mask line drawing.
function flameCrown(cx, cy, r, count, from, to, len) {
  let d = '';
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const a = from + (to - from) * t;
    const next = from + (to - from) * Math.min(1, (i + 0.5) / count);
    const L = len * (0.55 + 0.45 * Math.sin(Math.PI * t));
    const bx = cx + Math.cos(a) * r;
    const by = cy + Math.sin(a) * r;
    const tx = cx + Math.cos(a - 0.12) * (r + L);
    const ty = cy + Math.sin(a - 0.12) * (r + L);
    const ex = cx + Math.cos(next) * r;
    const ey = cy + Math.sin(next) * r;
    d += `${i === 0 ? 'M' : 'L'}${f(bx)} ${f(by)} Q ${f(bx + (tx - bx) * 0.3 + 4)} ${f(by + (ty - by) * 0.6)}, ${f(tx)} ${f(ty)} Q ${f(ex + (tx - ex) * 0.5 - 3)} ${f(ey + (ty - ey) * 0.45)}, ${f(ex)} ${f(ey)} `;
  }
  return d;
}

export function MaskLine({ className = '', ...rest }) {
  return (
    <svg viewBox="-10 -20 220 240" className={className} fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {/* flame crown, from ear to ear */}
      <path className="ml" d={flameCrown(100, 118, 56, 13, Math.PI * 0.92, Math.PI * 2.08, 64)} />
      {/* beaded ear fans */}
      <ellipse className="ml" cx="36" cy="128" rx="20" ry="15" />
      <ellipse className="ml" cx="36" cy="128" rx="12" ry="9" />
      <ellipse className="ml" cx="164" cy="128" rx="20" ry="15" />
      <ellipse className="ml" cx="164" cy="128" rx="12" ry="9" />
      {/* tusks */}
      <path className="ml" d="M70 160 q -4 18 2 30 M130 160 q 4 18 -2 30" />
      {/* face */}
      <path className="ml" d="M100 64 C 140 64 158 92 156 128 C 154 168 128 196 100 198 C 72 196 46 168 44 128 C 42 92 60 64 100 64 Z" />
      {/* brow and third eye */}
      <path className="ml" d="M62 104 Q 80 90 96 102 M104 102 Q 120 90 138 104" />
      <path className="ml" d="M100 78 L 94 90 L 100 98 L 106 90 Z" />
      {/* eyes */}
      <circle className="ml" cx="78" cy="116" r="12" />
      <circle className="ml" cx="122" cy="116" r="12" />
      <circle className="ml" cx="78" cy="116" r="4.5" />
      <circle className="ml" cx="122" cy="116" r="4.5" />
      {/* nose */}
      <path className="ml" d="M100 104 L 100 138 M90 142 Q 100 150 110 142" />
      {/* mouth, teeth, tongue */}
      <path className="ml" d="M66 160 Q 100 146 134 160 Q 100 192 66 160 Z" />
      <path className="ml" d="M74 160 l 5 8 l 5 -9 l 5 8 l 5 -9 l 6 9 l 5 -9 l 5 8 l 5 -8 l 5 8 l 5 -7" />
      <path className="ml" d="M94 170 Q 100 190 106 170" />
    </svg>
  );
}
