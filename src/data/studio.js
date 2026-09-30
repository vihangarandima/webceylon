// Studio facts, services, capabilities and process. Contact details are the
// ones the previous site published.

export const STUDIO = {
  name: 'WEB CEYLON',
  location: 'Boralasgamuwa, Colombo',
  address: '551/1, Thalgahawatta Road, Wawa Road, Boralasgamuwa, Sri Lanka',
  phoneDisplay: '070 243 4288',
  phoneHref: 'tel:+94702434288',
  whatsapp: '94702434288',
  email: 'vihangarandima8@gmail.com',
  hours: 'Monday – Friday · 09:00 – 19:00 (UTC+5:30)',
  // Fill in to show them in the footer; empty ones are hidden.
  social: [
    { label: 'GitHub', href: 'https://github.com/vihangarandima' },
    { label: 'LinkedIn', href: '' },
    { label: 'Instagram', href: '' },
  ],
};

export const whatsappLink = (text) =>
  `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(text)}`;

export const SERVICES = [
  {
    no: '01',
    name: 'Web Development',
    line: 'Fast, hand-built websites in React and Next.js — no templates, no page builders.',
    detail: ['Responsive from 320px to 4K', 'Performance budgets from day one', 'Headless CMS when you need one'],
  },
  {
    no: '02',
    name: 'UI / UX Design',
    line: 'Interfaces designed from a blank canvas around how your customers actually decide.',
    detail: ['Research and flows', 'High-fidelity design in Figma', 'Design systems that survive growth'],
  },
  {
    no: '03',
    name: 'Web Applications',
    line: 'Portals, dashboards and booking engines with real accounts, roles and data.',
    detail: ['Full-stack React / Node', 'Auth and role-based access', 'REST APIs, documented'],
  },
  {
    no: '04',
    name: 'E-commerce',
    line: 'Online stores that sell locally and abroad, with the checkout your customers expect.',
    detail: ['Custom or headless storefronts', 'Local and international payments', 'Inventory and order flows'],
  },
  {
    no: '05',
    name: 'Custom Systems',
    line: 'The internal software your business runs on — built around your process, not the other way round.',
    detail: ['Admin consoles', 'Integrations with existing tools', 'Reporting and exports'],
  },
  {
    no: '06',
    name: 'Interactive Experiences',
    line: '3D, motion and WebGL for brands that need to be remembered — like the page you are on.',
    detail: ['Three.js / WebGL', 'Scroll-driven storytelling', 'Motion that respects reduced-motion'],
  },
];

export const TECHNOLOGY = [
  { name: 'React', use: 'Interfaces' },
  { name: 'Next.js', use: 'Server-rendered sites' },
  { name: 'TypeScript', use: 'Safer codebases' },
  { name: 'JavaScript', use: 'Everywhere' },
  { name: 'Node.js', use: 'APIs & services' },
  { name: 'MongoDB', use: 'Document data' },
  { name: 'PostgreSQL', use: 'Relational data' },
  { name: 'Three.js', use: 'WebGL & 3D' },
  { name: 'GSAP', use: 'Motion' },
  { name: 'Tailwind CSS', use: 'Styling at speed' },
  { name: 'Vite', use: 'Builds' },
  { name: 'Vercel', use: 'Deployment' },
];

export const PROCESS = [
  {
    no: '01',
    name: 'Discover',
    text: 'We learn the business before the brief: who buys, why they hesitate, and what the site has to do for you.',
  },
  {
    no: '02',
    name: 'Design',
    text: 'Structure first, then the look — typography, layout and motion designed for you, reviewed in the browser as early as possible.',
  },
  {
    no: '03',
    name: 'Develop',
    text: 'Clean, modular code with performance budgets. You see progress on a live staging link, not in screenshots.',
  },
  {
    no: '04',
    name: 'Launch',
    text: 'Tested across devices and browsers, deployed without downtime, and handed over with everything you need to own it.',
  },
  {
    no: '05',
    name: 'Evolve',
    text: 'A site is never finished. We stay on to measure, refine and build the next thing with you.',
  },
];
