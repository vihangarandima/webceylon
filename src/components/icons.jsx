import {
  siReact,
  siNextdotjs,
  siNodedotjs,
  siThreedotjs,
  siTailwindcss,
  siVercel,
  siFramer,
  siVite,
  siFigma,
  siTypescript,
  siJavascript,
  siGreensock,
  siMongodb,
  siPostgresql,
  siGithub,
  siGit,
  siWhatsapp,
  siInstagram,
} from 'simple-icons';

// Brand marks from Simple Icons, drawn in the current text colour.
export const BRANDS = {
  react: siReact,
  next: siNextdotjs,
  node: siNodedotjs,
  three: siThreedotjs,
  tailwind: siTailwindcss,
  vercel: siVercel,
  framer: siFramer,
  vite: siVite,
  figma: siFigma,
  typescript: siTypescript,
  javascript: siJavascript,
  gsap: siGreensock,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  github: siGithub,
  git: siGit,
  whatsapp: siWhatsapp,
  instagram: siInstagram,
};

export function Brand({ name, size = 22, className = '' }) {
  const icon = BRANDS[name];
  if (!icon) return null;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

// Solid glyphs for the service tiles, on a 24px grid.
const GLYPHS = {
  globe: (
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-2.9a15.7 15.7 0 00-1.4-3.6A8 8 0 0118.9 8zM12 4c.8 1.1 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.9 1.9-4zM4.3 14a8 8 0 010-4h3.4a16.5 16.5 0 000 4H4.3zm.8 2h2.9c.3 1.3.8 2.5 1.4 3.6A8 8 0 015.1 16zM8 8H5.1a8 8 0 014.3-3.6C8.8 5.5 8.3 6.7 8 8zm4 12c-.8-1.1-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.9-1.9 4zm2.3-6H9.7a14.7 14.7 0 010-4h4.6a14.7 14.7 0 010 4zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h2.9a8 8 0 01-4.3 3.6zm1.7-5.6a16.5 16.5 0 000-4h3.4a8 8 0 010 4h-3.4z" />
  ),
  redesign: <path d="M4 4h10l-2 2H6v12h12v-6l2-2v10H4V4zm15.4-1.4l2 2L12 14H10v-2l9.4-9.4z" />,
  cart: (
    <path d="M3 3h2.5l2.3 11.2a2 2 0 002 1.6H18v-2H9.8l-.3-1.5h8.9a2 2 0 001.9-1.5L22 5H6.6L6 3H3zm6.5 15a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zm7.5 0a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z" />
  ),
  app: <path d="M3 4h18v4H3V4zm0 6h8v10H3V10zm10 0h8v4h-8v-4zm0 6h8v4h-8v-4z" />,
  send: <path d="M2.5 11.2L21 3l-8.2 18.5-2.4-7.9-7.9-2.4zm8.6 1.7l1.2 3.9 4.7-10.5-10.5 4.7 3.9 1.2 2.8-2.8.7.7-2.8 2.8z" />,
  pen: <path d="M14.5 3.5l6 6L9 21H3v-6L14.5 3.5zm0 2.8L5 15.8V19h3.2l9.5-9.5-3.2-3.2z" />,
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  cube: <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.3L5.6 7.8 12 11.3l6.4-3.5L12 4.3zM5 9.5v6.3l6 3.3v-6.3L5 9.5zm8 9.6l6-3.3V9.5l-6 3.3v6.3z" />,
  rocket: (
    <path d="M14 3c3.5 0 6 .5 7 1-.5 1-1 3.5-1 7l-6 6-3-3-3-3 6-6zm1 4a2 2 0 100 4 2 2 0 000-4zM7 12l-3 1-2 3 4-.5L7 12zm5 5l-.5 4 3-2 1-3L12 17zm-6 0c-1.5 1.5-2 4-2 4s2.5-.5 4-2l-2-2z" />
  ),
  tools: (
    <path d="M21.7 5.3l-3 3-2-.7-.7-2 3-3A5.5 5.5 0 0012.5 9L3 18.5 5.5 21 15 11.5a5.5 5.5 0 006.7-6.2zM4 3l3 1 .5 2L10 8.5 8.5 10 6 7.5l-2-.5-1-3L4 3zm10.5 12l1.5-1.5 5 5L19.5 20l-5-5z" />
  ),
};

export function Glyph({ name, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {GLYPHS[name]}
    </svg>
  );
}

export function Chevron({ dir = 'right', size = 16 }) {
  const d = { right: 'M6 3l5 5-5 5', left: 'M10 3L5 8l5 5', down: 'M3 6l5 5 5-5' }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
