// The portfolio. Every entry here is rendered — so every entry must be real
// work with real screenshots. To add a project, copy the template at the
// bottom of this file, drop screenshots into /public/projects/<slug>/, and
// fill in what you know. Leave a field empty rather than guessing: the UI
// hides empty sections instead of showing placeholder text to visitors.

export const PROJECTS = [
  {
    slug: 'cricket-factory',
    index: '01',
    name: 'Cricket Factory',
    client: 'Cricket Factory',
    category: 'E-commerce · 3D retail experience',
    disciplines: ['Web Design', 'Development', 'E-commerce', '3D & Interactive'],
    year: '',
    tagline: 'Where Sri Lanka’s cricketers gear up.',
    summary:
      'A retail website for a Sri Lankan store of professional cricket equipment — a 3D ball and bat that react to the scroll, the full range across eleven categories, and the workshop, brands and store visit in one place.',
    accent: '#e0281f',
    cover: '/projects/cricket-factory/hero',
    gallery: [
      { src: '/projects/cricket-factory/hero', caption: 'Hero — a 3D match ball over “Where Sri Lanka’s cricketers gear up”' },
      { src: '/projects/cricket-factory/power', caption: 'Scroll-driven 3D bat and ball, with a live release-speed readout' },
      { src: '/projects/cricket-factory/range', caption: 'The range — every category, built for every role' },
      { src: '/projects/cricket-factory/menu', caption: 'Full-screen menu with category previews, search and WhatsApp' },
    ],
    liveUrl: 'https://cricket-factory.vercel.app/',
    githubUrl: '',
    stack: ['Next.js', 'React', 'Three.js', 'Lenis'],
    features: ['3D bat and ball driven by scroll', 'Eleven product categories', 'Bat finder and workshop services', 'Shortlist, search and WhatsApp chat'],
    story: {
      concept:
        'A cricket store needed a site that feels like stepping onto the field — and still lets players find the right bat, pads or gloves fast.',
      design:
        'Night-match black, ball-leather red and tall condensed type. The product is the hero: a 3D ball and bat move with the scroll, then real photography takes over for the range.',
      development:
        'Real-time 3D in the browser, smooth scrolling, a categorised range with product counts, a full-screen menu with live previews and search, and WhatsApp straight from the page.',
    },
    value: 'Brings the feel of the store to every screen — and turns browsing the range into a reason to visit.',
    results: [],
  },
  {
    slug: 'thrive',
    index: '02',
    name: 'Thrive',
    client: 'Thrive',
    category: 'Brand website · Interactive storytelling',
    disciplines: ['Web Design', 'Development', '3D & Interactive'],
    year: '',
    tagline: 'Your customers can feel the difference.',
    summary:
      'A website for a frontline service-training company that tells its story as a transformation: scattered fragments assemble into a glowing figure as the visitor scrolls from “before” to “after”.',
    accent: '#f2b25c',
    cover: '/projects/thrive/hero',
    gallery: [
      { src: '/projects/thrive/hero', caption: 'Hero — interactive fragments around “Your customers can feel the difference”' },
      { src: '/projects/thrive/thrive', caption: 'The fragments assemble into a figure: before, Thrive, after' },
      { src: '/projects/thrive/result', caption: 'The result — a before-and-after slider of the same customer moment' },
      { src: '/projects/thrive/contact', caption: 'Enquiry form to plan a first training session' },
    ],
    liveUrl: '',
    githubUrl: '',
    stack: [],
    features: ['Scroll-driven 3D particle story', 'Before / after progress rail', 'Drag-to-compare customer moment', 'Team enquiry form'],
    story: {
      concept:
        'Service training is hard to show — the change happens in people. The site needed to make a visitor feel that change, not just read about it.',
      design:
        'Deep night tones and warm gold, an elegant serif voice, and one idea carried all the way down: fragments becoming whole.',
      development:
        'A 3D particle scene that assembles with the scroll, a before-and-after progress rail, a draggable comparison of the same customer moment, and an enquiry form for teams.',
    },
    value: 'Makes an intangible service tangible — the visitor experiences the transformation the training promises.',
    results: [],
  },
  {
    slug: 'caltea',
    index: '03',
    name: 'Caltea Ceylon',
    client: 'Lucky Land Estate',
    category: 'E-commerce · Brand experience',
    // Used by the work filter. Keep to the names in DISCIPLINES below.
    disciplines: ['Web Design', 'Development', 'E-commerce'],
    year: '2026',
    tagline: 'A tea estate’s boutique, told like a slow pour.',
    summary:
      'An editorial online boutique for a family estate producing single-origin herbal teas and fabric-pouch gifts — built to sell directly and to carry the estate’s Ayurvedic heritage with it.',
    // Accent used for this project's light, glow and hover sheen.
    accent: '#c9a45c',
    cover: '/projects/caltea/hero',
    gallery: [
      { src: '/projects/caltea/hero', caption: 'Hero — "Nature’s Finest in Every Sip"' },
      { src: '/projects/caltea/pillars', caption: 'Handcrafted pillars: pyramid tea bags and fabric packaging' },
      { src: '/projects/caltea/standards', caption: 'Why Caltea — standards and small-batch production' },
      { src: '/projects/caltea/quiz', caption: 'Ayurvedic tea quiz — a dosha-based blend finder' },
      { src: '/projects/caltea/contact', caption: 'Estate concierge and corporate gifting enquiries' },
    ],
    liveUrl: 'https://caltea.lk/',
    githubUrl: '',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    features: ['Ayurvedic dosha quiz', 'Estate storytelling', 'Corporate gifting enquiries'],
    story: {
      concept:
        'A third-generation family estate needed an online boutique that felt like the estate itself — warm, unhurried, sensory — while doing the practical work of taking direct orders and corporate gifting requests.',
      design:
        'Dark, steeped tones and a serif voice borrowed from estate packaging. Photography carries the page; the interface steps back. The quiz turns browsing into a small ritual instead of a catalogue.',
      development:
        'A three-question Ayurvedic quiz recommends a blend, estate storytelling runs alongside the products, and gifting enquiries route straight to the estate rather than into a generic form.',
    },
    // Why the project matters, in one sentence. Qualitative — no numbers
    // unless they are real and sourced (those go in `results`).
    value: 'Gives a family estate its own direct sales channel — and a place to tell its story in its own voice.',
    // Add verified outcomes here, e.g. { label: 'Direct orders', value: '…' }.
    // Rendered only when present. Never add a number you cannot show a source for.
    results: [],
  },
  {
    slug: 'yamu',
    index: '04',
    name: 'Yamu Car Rentals',
    client: 'Yamu Car Rentals',
    category: 'Web application · Marketplace',
    disciplines: ['Web Design', 'Development', 'Web Apps'],
    year: '2026',
    tagline: 'Island-wide car hire, found in one search.',
    summary:
      'A vehicle-rental marketplace for Sri Lanka: travellers and locals search by vehicle type, location and budget, rental companies list their fleets, and an admin console keeps it all in check.',
    accent: '#e0772e',
    cover: '/projects/yamu/hero',
    gallery: [
      { src: '/projects/yamu/hero', caption: 'Homepage hero and instant fleet search' },
      { src: '/projects/yamu/search', caption: 'Vehicle search by category, location and radius' },
      { src: '/projects/yamu/fleets', caption: 'Rental company fleet showcase' },
      { src: '/projects/yamu/dashboard', caption: 'Super-admin control centre' },
    ],
    liveUrl: 'https://www.yamucarrentals.lk/',
    githubUrl: '',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Schema.org SEO'],
    features: ['Search by type, location and price', 'Two-sided: renters and fleet owners', 'Admin console'],
    story: {
      concept:
        'Hiring a car in Sri Lanka meant opaque pricing, unverified vehicles and a lot of phone calls. Yamu puts the whole market behind a single search box.',
      design:
        'A confident orange identity and a hero that shows the range at a glance — bike, tuk-tuk, car, van. The search bar sits in the first viewport because it is the product.',
      development:
        'Filtering by vehicle type, location and price range, a two-sided flow for people renting and companies listing, direct WhatsApp contact, and a super-admin console for the operators.',
    },
    value: 'Turns a market run on phone calls into a single search — for renters, for fleet owners and for the team running it.',
    results: [],
  },
];

// Filter categories, in display order. Only those used by at least one
// project are shown.
export const DISCIPLINES = ['Web Design', 'Development', 'E-commerce', 'Web Apps', '3D & Interactive', 'Branding'];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

export const nextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};

/*
  TEMPLATE — copy into PROJECTS above.

  {
    slug: 'new-project',          // URL: /work/new-project
    index: '05',
    name: '',
    client: '',
    category: '',
    disciplines: [],              // from DISCIPLINES
    year: '',
    tagline: '',
    summary: '',
    accent: '#c9a45c',
    cover: '/projects/new-project/hero',   // no extension: .webp and .png are both looked up
    gallery: [{ src: '/projects/new-project/hero', caption: '' }],
    liveUrl: '',
    githubUrl: '',
    stack: [],
    features: [],
    story: { concept: '', design: '', development: '' },
    value: '',
    results: [],
  },

  ARCHIVED — entries from the previous site that are NOT rendered, because they
  had no real screenshots (AI-generated or stock imagery), no live link, and
  claimed awards and metrics that could not be verified: CarRents.lk,
  ChargeUp EV, Lanka Luxe Heritage Stays, Mayura Ceylon Spices, Galle Maritime,
  Serendib Gem Vault. The originals are in git history (src/data/siteData.js,
  commit 4c1084e). If any is real work, add it back through the template above
  with genuine screenshots.
*/
