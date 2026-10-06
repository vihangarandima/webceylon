# WEB CEYLON

The studio site: a small Vite + React single-page app. No animation or 3D
libraries — the 3D work ring, marquees and reveals are plain CSS and a
little JavaScript.

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # production build into dist/
npm run images    # regenerate WebP versions of screenshots
```

## Adding a project

1. Put screenshots in `public/projects/<slug>/` (PNG, ideally 1600px+ wide).
2. Run `npm run images` to create the `.webp` versions.
3. Copy the template at the bottom of `src/data/projects.js` into `PROJECTS`.

It appears on the Works page, in the hero showcase and the 3D work ring, and
gets its own case study at `/work/<slug>`.
Leave a field empty rather than guessing — empty sections are hidden, and
`results` renders only when it has real, sourced numbers.

## Where things live

```
src/
  data/          projects, services, process, FAQs, contact details
  lib/           theme (dark/light switch), useReveal (scroll fade-in)
  pages/         Home, Works (/works), CaseStudy (/work/<slug>)
  components/    Header + menu, Footer, EditorShowcase (hero), WorkRing
                 (3D room of screens), Faq, ContactCta (form), Marquee, ...
  styles/        global.css — colour tokens for both themes, type, buttons
```

## Notes

- Dark theme by default; the switch in the header remembers the visitor's
  choice on their device.
- The hero showcase and the work ring are built from the screenshots in
  `src/data/projects.js` — add a project and it appears in both.
- `prefers-reduced-motion` → no marquees, drifting or fade-ins.
- The contact form has no backend: it opens the visitor's email app or
  WhatsApp with the message filled in.
- `vercel.json` rewrites every path to `index.html`, so `/works` and
  `/work/caltea` work on refresh.
