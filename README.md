# WEB CEYLON

The studio site: a Vite + React single-page app with a procedural 3D
Gurulu Raksha mask (three.js / React Three Fiber), GSAP ScrollTrigger and
Lenis smooth scrolling.

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

It appears in the gallery and gets its own case study at `/work/<slug>`.
Leave a field empty rather than guessing — empty sections are hidden, and
`results` renders only when it has real, sourced numbers.

## Where things live

```
src/
  data/          projects, services, technology, process, contact details
  lib/           gsap setup, shared scene state, loader progress
  components/
    three/       the mask: geometry + painted textures, lighting, particles
    hero/ statement/ portfolio/ services/ about/ process/ contact/
    projects/    case study page
    navigation/  nav bar and fullscreen menu
    ui/          loader, smooth scroll, page transition, ornaments
docs/            mask-3d-implementation-guide.md
```

## Notes

- No WebGL, or a lost GL context → the hero shows the mask photograph instead.
- `prefers-reduced-motion` → no smooth scroll, static mask.
- `vercel.json` rewrites every path to `index.html`, so `/work/caltea` and the
  old `/services`-style URLs work on refresh.
- The old static site (`*.html`, `css/`, `js/`, `index.html.bak`) is not part
  of the build and can be deleted.
