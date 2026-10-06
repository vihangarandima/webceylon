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
    line: '3D, motion and WebGL for brands that need to be remembered.',
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

// What sets the studio apart. Short, specific, true.
export const PRINCIPLES = [
  {
    title: 'Art-directed, never templated',
    text: 'Every site starts from a blank page and a clear idea of who you are. No themes, no page builders.',
  },
  {
    title: 'Engineered, not assembled',
    text: 'Hand-written React and Node.js. Clean, documented code that you own outright.',
  },
  {
    title: 'Fast by default',
    text: 'Performance budgets are set before the first sketch, and kept through launch.',
  },
  {
    title: 'The details others skip',
    text: 'Type, spacing, motion — and the loading, empty and error states nobody plans for.',
  },
  {
    title: 'Built around your business',
    text: 'We start from how your customers decide, then design the page that helps them say yes.',
  },
  {
    title: 'A direct line to the makers',
    text: 'No account managers. You talk to the people who design and build your site.',
  },
];

// Questions people ask before they start. Answers stay within what the
// studio actually offers — no promised timelines or prices.
export const FAQS = [
  [
    'How do we get started?',
    'Send a few lines through the form below, by email or on WhatsApp. We reply on whichever you prefer, ask a few questions, and send a clear proposal with scope, timeline and cost.',
  ],
  [
    'How involved do I need to be?',
    'You share your content, preferences and feedback at the key moments. We handle the design, development, testing and launch — and you see progress on a live preview link throughout.',
  ],
  [
    'How long does a website take?',
    'It depends on the number of pages and the features involved. You get a timeline with the proposal, before any work begins, and we keep to it.',
  ],
  [
    'Do you build online stores and web applications?',
    'Yes. Alongside websites we build online stores with local and international payments, and web applications with accounts, roles, dashboards and admin consoles.',
  ],
  [
    'Will it work on phones?',
    'Every site is designed and tested from 320px phones to 4K screens. Mobile is designed on purpose, not shrunk from the desktop.',
  ],
  [
    'Do I own the website?',
    'Yes. You own the design and the code outright, and we hand over everything you need to run it.',
  ],
  [
    'Do you support the site after launch?',
    'Yes. We stay on to measure, refine, update content and build what comes next.',
  ],
  [
    'Do you work with clients outside Sri Lanka?',
    'Yes. We work with clients in Sri Lanka and abroad, keeping in touch over email, WhatsApp and video calls across time zones.',
  ],
];
