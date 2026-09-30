// The portfolio. Every entry here is rendered — so every entry must be real
// work with real screenshots. To add a project, copy the template at the
// bottom of this file, drop screenshots into /public/projects/<slug>/, and
// fill in what you know. Leave a field empty rather than guessing: the UI
// hides empty sections instead of showing placeholder text to visitors.

export const PROJECTS = [
  {
    slug: 'caltea',
    index: '01',
    name: 'Caltea Ceylon',
    client: 'Lucky Land Estate',
    category: 'E-commerce · Brand experience',
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
    // Add verified outcomes here, e.g. { label: 'Direct orders', value: '…' }.
    // Rendered only when present. Never add a number you cannot show a source for.
    results: [],
  },
  {
    slug: 'yamu',
    index: '02',
    name: 'Yamu Car Rentals',
    client: 'Yamu Car Rentals',
    category: 'Web application · Marketplace',
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
    results: [],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

export const nextProject = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};

/*
  TEMPLATE — copy into PROJECTS above.

  {
    slug: 'new-project',          // URL: /work/new-project
    index: '03',
    name: '',
    client: '',
    category: '',
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
