/**
 * WEB CEYLON — Core Application Controller & Interactive Systems
 */

// Global Case Studies Registry
const CASE_STUDIES = {
  carrents: {
    id: 'carrents',
    title: 'CarRents.lk — Premier Fleet Architecture of Sri Lanka',
    category: 'Automotive & Logistics',
    badge: 'Awwwards Mobile of the Week Nominee',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHXzQ80mfW28ygd8hlbk2UcsLgAsg-C5jHa9UwPn9e_377clk9DhRth-br2reztmVG6pxU5xnOh2V-vc2TzrnPUWYEoCClZFdThhH4K2k79VFinGN8wUZLAC1vnm3eGQmJaXsf85ka9YcW5OsgiIwd36u1eNXreoGHuaqd3nk5Gvy_aMhqR3CvniooPGL3Zp49XzenlnIFqh5W9UaPfdL4MwtDyjP3GsvtXaPH3kwV5DKWsieKEsE',
    liveUrl: 'https://carrents.lk',
    metrics: [
      { label: 'Booking Conversion', value: '+240%', highlight: true },
      { label: 'Lighthouse Performance', value: '100/100', highlight: false },
      { label: 'Search Typoahead Latency', value: '28ms', highlight: true },
      { label: 'Fleet Sync Node Count', value: '350+ Vehicles', highlight: false }
    ],
    challenge: 'The Sri Lankan exotic car rental market suffered from fragmented WhatsApp bookings, unverified fleet availability, and inconsistent pricing that drove overseas tourists to international intermediaries with 30% take rates.',
    solution: 'WEB CEYLON engineered a bespoke booking ecosystem with calendar token locks, automated passport/ID verification, Stripe Escrow deposit handling, and real-time fleet telematics across Colombo, Galle, and Kandy hubs.',
    stack: ['Next.js 14 App Router', 'TypeScript', 'Node.js Gateway', 'MongoDB Replica Set', 'Tailwind CSS', 'Stripe Escrow Connect', 'Mapbox GL GL']
  },
  chargeup: {
    id: 'chargeup',
    title: 'ChargeUp EV Ceylon — Nationwide High-Voltage Grid Mesh',
    category: 'Electric Vehicles & IoT',
    badge: 'National Green Tech Award 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2JCg2pZ431Wm-gcUI7Qq7CyeogBxzmLFi_d2bj7VvIJq66OzZhLvkN4A6jHNxWHOOohsBZDiAEjjwrU8GVkHut5STcYe8I6sJ-keXrO30hWSj0uyfL-sSNWLTgHouGVDRoPz-TQhX7O1u_PzLxaR-fO8AlR9kqxlgKTnq4JpM5Mz7jOHEfBf2ABuaNeKmmjm6xYZwi18gGs3wy6cB-yoHCY35azJuiq7XrVVaL2PH4IJ4lQSoYGp',
    liveUrl: '#',
    metrics: [
      { label: 'Grid Mesh Nodes', value: '140+ Stations', highlight: true },
      { label: 'Telemetry Latency', value: '< 85ms', highlight: true },
      { label: 'System Uptime SLA', value: '99.98%', highlight: false },
      { label: 'Monthly KW Dispatched', value: '1.2M kWh', highlight: false }
    ],
    challenge: 'EV drivers traversing Sri Lanka’s central mountain passes regularly faced broken chargers and dead zones without real-time voltage telemetry or reservation guarantees.',
    solution: 'We built an ultra-low latency WebSocket routing platform connecting 140+ high-voltage DC chargers with dynamic terrain elevation-aware range calculators and instant NFC reservation slots.',
    stack: ['React 18', 'Go (Golang) Microservices', 'WebSockets', 'PostgreSQL TimescaleDB', 'Redis Cache', 'Tailwind CSS', 'Leaflet Vector Maps']
  },
  lankaluxe: {
    id: 'lankaluxe',
    title: 'Lanka Luxe Heritage Stays — Geoffrey Bawa Architectural Villas',
    category: 'Luxury Hospitality',
    badge: 'Awwwards Site of the Day',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZRc53117CP1ZYCxrYXiRrlB6__kNGaLYqDp2UhdOLBHGyYJHP4txTuF8GNZdYntsUNSjWInIWdGI2Ceucke_JUh_qLHj1IObuPzrykRCR8hZ_m2Kpk2kT5skL6-9eSI4IT-sCP93kSoebJjlh1IEEO5FyTaMwctgbwOkr99urfI9X1pPBaqvlerE0OOsVEvA_QAjP_SJppb3y0bjZEbUuhJ4rfgMZCLPKoXFLzL3fKSxInJe1OUm',
    liveUrl: '#',
    metrics: [
      { label: 'OTA Commission Cut', value: '-68%', highlight: true },
      { label: 'Direct Booking Lift', value: '+310%', highlight: true },
      { label: 'Average Stay Duration', value: '4.8 Nights', highlight: false },
      { label: 'Luxury Inquiry Rate', value: '18.4%', highlight: false }
    ],
    challenge: 'Colonial boutique estates in Galle Fort and Nuwara Eliya were paying up to 25% commission to Booking.com and Airbnb while losing direct luxury brand equity.',
    solution: 'Created an editorial digital gallery and experiential booking system featuring bespoke room configurators, private helicopter charter add-ons, and multi-currency Stripe checkout.',
    stack: ['Next.js 14', 'Sanity Headless CMS', 'Stripe Elements', 'Tailwind CSS', 'Framer Motion GL', 'Vercel Edge Functions']
  },
  mayura: {
    id: 'mayura',
    title: 'Mayura Ceylon Spices & Botanicals — Global DTC Engine',
    category: 'E-Commerce & Retail',
    badge: 'Best Headless Storefront 2025',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUXmvrabBbX0kW2c7e-K2gDoBpjchwAHo0fjxu4nvIXjQ7lGbIkPV1RcuanBeuH9hMT3m3OadszWuSQcmcEL93WGo4ZfH0g3MrHOjMA9zlVsnOjXzhPom63IwqMn5ak-x74lNp4DOAqLxP74kjA0XSRx0wOkX0HVTCKwpfeDeOVYRd7f_9TuyWCapDDpVonaoockwYPpmBGHOVQQB8S0s_IeN0Bva9l4QxhOKv_GGpA4WiwZT9nyVE',
    liveUrl: '#',
    metrics: [
      { label: 'Global Cross-Border Sales', value: '+195%', highlight: true },
      { label: 'Cart Abandonment Rate', value: '14.2%', highlight: true },
      { label: 'Supported Currencies', value: '16 Global', highlight: false },
      { label: 'Avg Order Value (USD)', value: '$148.00', highlight: false }
    ],
    challenge: 'Century-old southern Ceylon Alba cinnamon and artisan pepper growers needed a global digital storefront capable of shipping directly to Michelin-starred restaurants with multi-currency localized taxation.',
    solution: 'Designed and deployed a headless Shopify Plus architecture with 3D product grain inspectors, custom duty calculators, and automatic DHL Express dispatch integrations.',
    stack: ['Shopify Plus Storefront API', 'Remix / React', 'Three.js 3D Viewport', 'Tailwind CSS', 'DHL Global API', 'Klaviyo Telemetry']
  },
  symphony: {
    id: 'symphony',
    title: 'Ceylon Symphony Pavilion — 3D Seating & High-Concurrency Ticketing',
    category: 'Custom Systems & FinTech',
    badge: 'Enterprise Performance Award',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmQOSbp6qq4IeExU_dYssM2MAeSUzlrV5VYKRIT9p4uslChHVO0SY76LWhJ3JJmu6791KHw15BHF2ZleSPB2DafP6XfTu22D5FkHKVdDiIenJhwf2eEzQ5Zv47xZCEHN6cUOBItDPFAIfRRtoTRbWj6mWtrGxAoPzE1X6u-8W5zSkHQfeZ4AHIAMo5NNGYi7jeriPs-J_KAUG2ny50bG_rJLFcj_EUmGGgcz5CFXgXt8VAhx18honk',
    liveUrl: '#',
    metrics: [
      { label: 'Drop Concurrency', value: '12,000 req/s', highlight: true },
      { label: 'Seat Lock Latency', value: '18ms', highlight: true },
      { label: 'Zero Double-Bookings', value: '100.00%', highlight: false },
      { label: 'Lighthouse Score', value: '99/100', highlight: false }
    ],
    challenge: 'High-profile philharmonic gala concerts routinely crashed Colombo ticket servers within seconds of release, causing severe race conditions and double-sold VIP box tiers.',
    solution: 'Architected an SVG vector and WebGL interactive auditorium seating chart with distributed Redis token locks and serverless queue protection allowing 12k concurrent buyers to reserve in real time.',
    stack: ['Next.js 14', 'Redis Cluster', 'PostgreSQL', 'Tailwind CSS', 'SVG Coordinate Matrix', 'Stripe Connect']
  }
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initNavHighlight();
  initMobileMenu();
  initFilterButtons();
  initCaseStudyTriggers();
  initEstimator();
  initContactForm();
});

/**
 * 1. Real-time Colombo IST Clock (UTC +5:30)
 */
function initLiveClock() {
  const clockElements = document.querySelectorAll('.live-colombo-clock');
  if (clockElements.length === 0) return;

  function updateTime() {
    const now = new Date();
    // UTC time in ms
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Sri Lanka is UTC+5:30 (5.5 * 3600000 ms)
    const slTime = new Date(utcMs + (5.5 * 3600000));
    
    const hours = String(slTime.getHours()).padStart(2, '0');
    const minutes = String(slTime.getMinutes()).padStart(2, '0');
    const seconds = String(slTime.getSeconds()).padStart(2, '0');
    
    clockElements.forEach(el => {
      el.textContent = `[Live ${hours}:${minutes}:${seconds} IST]`;
    });
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/**
 * 2. Active Navigation Highlight
 */
function initNavHighlight() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a, #mobileDrawer a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
      link.classList.remove('text-on-surface-variant');
      link.classList.add('text-primary', 'font-semibold');
    }
  });
}

/**
 * 3. Mobile Drawer Navigation
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileDrawer');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

/**
 * 4. Portfolio Filter Buttons
 */
function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-[0_0_16px_rgba(16,185,129,0.3)]');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-[0_0_16px_rgba(16,185,129,0.3)]');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 5. Dynamic Case Study Modal Drawer
 */
function initCaseStudyTriggers() {
  const triggers = document.querySelectorAll('[data-open-case-study]');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studyId = btn.getAttribute('data-open-case-study');
      openCaseStudy(studyId);
    });
  });
}

window.openCaseStudy = function(id) {
  const study = CASE_STUDIES[id] || CASE_STUDIES['carrents'];
  const drawer = document.getElementById('caseStudyDrawer');
  if (!drawer) return;

  const titleEl = document.getElementById('csTitle');
  const categoryEl = document.getElementById('csCategory');
  const challengeEl = document.getElementById('csChallenge');
  const solutionEl = document.getElementById('csSolution');
  const imgEl = document.getElementById('csImage');
  const liveLinkEl = document.getElementById('csLiveLink');
  const metricsEl = document.getElementById('csMetrics');
  const stackEl = document.getElementById('csStack');

  if (titleEl) titleEl.textContent = study.title;
  if (categoryEl) categoryEl.textContent = `${study.category} • ${study.badge}`;
  if (challengeEl) challengeEl.textContent = study.challenge;
  if (solutionEl) solutionEl.textContent = study.solution;
  if (imgEl) imgEl.src = study.image;
  if (liveLinkEl) {
    liveLinkEl.href = study.liveUrl;
    liveLinkEl.textContent = study.liveUrl.startsWith('http') ? `Explore ${study.liveUrl.replace('https://', '')}` : 'Inquire for Private Walkthrough';
  }

  // Populate metrics
  if (metricsEl) {
    metricsEl.innerHTML = study.metrics.map(m => `
      <div class="p-space-sm rounded-lg bg-surface-container text-center">
        <span class="block font-headline-md text-headline-md ${m.highlight ? 'text-primary' : 'text-secondary'} font-bold font-syne">${m.value}</span>
        <span class="font-label-sm text-label-sm text-on-surface-variant uppercase font-space">${m.label}</span>
      </div>
    `).join('');
  }

  // Populate tech stack
  if (stackEl) {
    stackEl.innerHTML = study.stack.map(tech => `
      <span class="px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-space border border-surface-container-high">${tech}</span>
    `).join('');
  }

  drawer.classList.remove('translate-y-full');
  document.body.style.overflow = 'hidden';
};

window.closeCaseStudy = function() {
  const drawer = document.getElementById('caseStudyDrawer');
  if (drawer) {
    drawer.classList.add('translate-y-full');
    document.body.style.overflow = '';
  }
};

/**
 * 6. Interactive Scope & Cost Estimator (services.html)
 */
function initEstimator() {
  const form = document.getElementById('scopeEstimatorForm');
  if (!form) return;

  function calculateEstimate() {
    let basePrice = 4500;
    let baseWeeks = 4;

    const projectType = form.querySelector('input[name="projType"]:checked')?.value || 'showcase';
    const tier = form.querySelector('input[name="tier"]:checked')?.value || 'flagship';
    const checkedFeatures = form.querySelectorAll('input[name="feature"]:checked');

    if (projectType === 'webapp') { basePrice += 3500; baseWeeks += 3; }
    if (projectType === 'ecommerce') { basePrice += 4000; baseWeeks += 4; }
    if (projectType === 'fintech') { basePrice += 6500; baseWeeks += 6; }

    if (tier === 'monumental') { basePrice *= 1.4; baseWeeks += 2; }
    if (tier === 'enterprise') { basePrice *= 1.8; baseWeeks += 4; }

    checkedFeatures.forEach(feat => {
      basePrice += parseInt(feat.getAttribute('data-cost') || 600);
      baseWeeks += 0.5;
    });

    const priceMin = Math.round(basePrice);
    const priceMax = Math.round(basePrice * 1.25);
    const weeks = Math.round(baseWeeks);

    const priceEl = document.getElementById('estPriceRange');
    const weeksEl = document.getElementById('estTimeline');
    
    if (priceEl) priceEl.textContent = `$${priceMin.toLocaleString()} – $${priceMax.toLocaleString()} USD`;
    if (weeksEl) weeksEl.textContent = `${weeks} – ${weeks + 2} Weeks`;
  }

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', calculateEstimate);
  });

  calculateEstimate();
}

/**
 * 7. Contact & Discovery Form Submission
 */
function initContactForm() {
  const contactForm = document.getElementById('projectInquiryForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value || 'Partner';
    showToast(`Inquiry received from ${name}. Studio Colombo will respond within 6 hours.`);
    contactForm.reset();
  });
}

/**
 * 8. Universal Toast Notification
 */
window.showToast = function(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'glass-card fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl border border-primary/40 bg-surface-container-lowest/90 backdrop-blur-xl text-on-surface shadow-2xl flex items-center gap-3';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-3 h-3 rounded-full bg-primary animate-ping"></span>
    <span class="font-space text-sm text-primary uppercase tracking-wider font-semibold">WEB CEYLON DISPATCH:</span>
    <span class="font-jakarta text-sm text-on-surface">${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
};
