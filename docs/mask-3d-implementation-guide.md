# Mask 3D — Implementation Guide

The procedure behind the hero sculpture: a Raksha-style Sri Lankan mask rendered
live in the browser. Written before the build, used during it, kept for whoever
touches `src/components/three/` next.

**Confidence labels.** **VERIFIED** — read directly from the primary source on
the checked date. **ASSUMPTION** — reasonable engineering judgement, not
confirmed by a primary source. **UNKNOWN** — could not be confirmed; do not
rely on it.

All checks dated **2026-09-30** unless stated.

---

## 0. The decision that shapes everything: no downloaded model

There is no licensed, high-quality Raksha/Kolam glTF in this repo, and the
brief says a bad model is worse than no model. So the mask is **built in code**
(`src/components/three/maskGeometry.js`): a sculpted face shell, bulging eyes,
a fan of flame blades, beaded rims, teeth and tongue — a sculptural
interpretation of the Gurulu Raksha, not a scan.

Consequences:

- **Zero asset download.** No `.glb`, no textures, no HDRI. Sections 3 and 4
  below still apply the moment a real model replaces the procedural one.
- Colour is set on materials, not in textures — so the colour-management rules
  in section 4 are what keep the reds red.

---

## 1. Renderer and libraries

| Claim | Source | Status |
|---|---|---|
| `@react-three/fiber@8` pairs with `react@18`; `@9` pairs with `react@19` | https://r3f.docs.pmnd.rs/getting-started/installation | **VERIFIED** |
| `@react-three/drei@9.122.0` peers `react ^18`, `@react-three/fiber ^8`, `three >=0.137` | `npm view @react-three/drei@9 peerDependencies` | **VERIFIED** |
| WebGPU is "Limited availability … not Baseline because it does not work in some of the most widely-used browsers" | https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API | **VERIFIED** |

**Decision: WebGL 2 via `WebGLRenderer`.** The site targets unknown visitor
hardware in Sri Lanka and abroad, a large share on mid-range Android. WebGPU is
not Baseline, and nothing in this scene needs compute shaders. Revisit when MDN
reports WebGPU as Baseline.

Installed versions: `three@0.170.0` (pinned below latest `0.186.1` because
drei 9 depends on `three-stdlib`, which lags core — **ASSUMPTION** that 0.170 is
the safer pairing; npm warned only about `three-mesh-bvh`, a drei transitive
dependency not used here), `@react-three/fiber@8.18.0`,
`@react-three/drei@9.122.0`, `gsap@3.15.0`, `@gsap/react@2.1.2`,
`lenis@1.3.26`.

Drei is used for `Environment` + `Lightformer` (procedural image-based
lighting, no network fetch) and `PerformanceMonitor`. Nothing else from it is
imported, so the rest tree-shakes away (**ASSUMPTION** — confirm in the build
report's chunk sizes).

---

## 2. Performance budget

No primary source publishes a universal triangle budget; the numbers below are
**ASSUMPTION**, set from the target hardware and measured against the build.

| Budget | Desktop | Mobile |
|---|---|---|
| Triangles, whole scene | ≤ 120k | ≤ 45k |
| Draw calls | ≤ 40 | ≤ 30 |
| Texture memory | 0 (procedural) | 0 |
| Device pixel ratio cap | 2 | 1.5 |
| Particles | 700 | 220 |
| 3D JS chunk (gzip) | lazy-loaded, never on the critical path | same |

How it is held:

- Face shell segment count drops on mobile (`detail` in `maskGeometry.js`).
- Teeth and beads are `InstancedMesh` — one draw call per group, not per bead.
- Flame blades share one geometry per size tier.
- `PerformanceMonitor` lowers DPR when frame rate drops.
- The canvas stops rendering (`frameloop="never"`) once it is scrolled out of
  view.

---

## 3. Asset pipeline (for when a real model replaces the procedural one)

| Claim | Source | Status |
|---|---|---|
| `KHR_draco_mesh_compression` compresses **geometry** (positions, normals, UVs, weights/joints, indices); decoded on the client before rendering | https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md | **VERIFIED** |
| So Draco reduces **download size**, not GPU memory | same (decode-then-upload) | **VERIFIED** (by the decode step described) |
| KTX 2.0 is "a container format … for reliably distributing GPU textures" that reduces "asset file size and GPU memory usage" | https://www.khronos.org/gltf/ | **VERIFIED** |

**They are not interchangeable.** Draco shrinks the mesh on the wire; KTX2 /
Basis shrinks textures on the wire *and* stays compressed in GPU memory. A
painted mask with 2k colour + normal + roughness maps needs **both**.

Pipeline: export `.glb` → `gltf-transform optimize` with Draco (or Meshopt) for
geometry and KTX2 (ETC1S for colour, UASTC for normal maps) for textures.
**UNKNOWN** — the exact current `gltf-transform` CLI flags; read
https://gltf-transform.dev/cli before running it rather than copying flags from
memory.

Loading in R3F: drei's `useGLTF(url, dracoPath)` plus a `KTX2Loader` with its
transcoder path set. **UNKNOWN** — the exact drei 9 signature for enabling KTX2
inside `useGLTF`; check the drei README for 9.122 at the time of use.

---

## 4. Colour accuracy

Mask colours are symbolic — the lacquer red, the yellow/gold of the flames, the
black, the bone white of eyes and teeth. They must come out as authored, not
washed or oversaturated.

Rules applied in this repo:

1. **Material colours are authored as sRGB hex and left to Three.js to
   convert.** With colour management on (Three's default since r152 —
   **ASSUMPTION**, the manual page could not be fetched: both
   `threejs.org/manual/en/color-management.html` and its raw GitHub source
   returned 404 on the checked date), `new Color('#8e1b1b')` is interpreted as
   sRGB and converted to linear for lighting.
2. **Renderer output is sRGB** — R3F's default. Do not override
   `outputColorSpace`.
3. **Tone mapping**: `ACESFilmicToneMapping` shifts saturated reds toward
   orange. This scene uses `AgXToneMapping` with exposure tuned by eye against
   the reference photo `public/masks/gurulu_raksha_mask.jpg`.
   **ASSUMPTION** — judged visually.
4. **When textures arrive:** colour/albedo maps get
   `texture.colorSpace = THREE.SRGBColorSpace`; normal, roughness, metalness
   and AO maps stay linear (`NoColorSpace`). glTF loaders set this themselves.
   **UNKNOWN** against the current manual for the reason in rule 1 — verify at
   https://threejs.org/docs/ before relying on it.

---

## 5. Scene fundamentals and render loop

The minimum set is Scene, Camera, Renderer, and Meshes (Geometry + Material).
R3F's `<Canvas>` creates the first three.

R3F drives rendering through the renderer's animation loop. Per-frame work goes
in `useFrame`, reading **refs**, never React state — a `setState` every frame
re-renders the component tree 60 times a second. Scroll progress and pointer
position are stored in a mutable module (`src/lib/sceneState.js`) that both
GSAP and `useFrame` read.

---

## 6. Lighting for carved relief

A mask is carved relief; lighting is what makes it read.

- **Image-based lighting without an HDRI download**: drei `<Environment>` with
  `<Lightformer>` children renders a small cube map from emissive planes once.
  A warm key strip above-left, a narrow teal-grey rim behind-right (it
  separates the flames from the black background), and a low amber bounce.
- **One moving spotlight** follows the cursor, so the relief visibly changes as
  the mouse moves — the "lighting reacts" interaction.
- Lacquer: `MeshPhysicalMaterial` with `clearcoat` over a mid-roughness base —
  a painted, varnished wooden mask, not plastic.
- Gold: `metalness 1`, roughness ~0.3 — aged, not mirror.

---

## 7. Interaction model

| Claim | Source | Status |
|---|---|---|
| `gsap.registerPlugin(useGSAP)` must be called | https://gsap.com/resources/React/ | **VERIFIED** |
| `useGSAP` reverts animations **and ScrollTriggers** automatically on unmount | same | **VERIFIED** |
| Animations created in event handlers are not cleaned up unless wrapped in `contextSafe()` | same | **VERIFIED** |
| React 18 StrictMode runs effects twice in development | same | **VERIFIED** |
| "GSAP is now 100% free for all users" — including ScrollTrigger | https://gsap.com/pricing/ | **VERIFIED** (commercial terms: read the linked licence; **UNKNOWN** beyond the pricing page) |

- **No OrbitControls.** Drag-to-rotate fights page scroll on touch devices.
  The mask follows the pointer with damping instead, and the camera orbits on
  scroll.
- **Lenis + ScrollTrigger**: Lenis's scroll event calls
  `ScrollTrigger.update`, and Lenis is ticked from `gsap.ticker` so both share
  one clock.
- **`prefers-reduced-motion: reduce`**: no smooth scroll, no scroll-driven
  camera, no pointer follow, no loader animation. The mask is still shown,
  lit and static.

---

## 8. GPU memory discipline

- JavaScript garbage collection does not free GPU buffers; geometries,
  materials and textures must be `.dispose()`d. **ASSUMPTION** against the
  manual (the cleanup page 404'd on the checked date), but it is standard
  Three.js behaviour and R3F disposes objects it created declaratively when
  they unmount.
- Geometries built imperatively in `maskGeometry.js` are created in `useMemo`
  and disposed in a `useEffect` cleanup.
- `webglcontextlost`: the canvas listens for it and swaps to the static
  fallback image rather than showing a black rectangle.

---

## 9. Accessibility

- The canvas is `aria-hidden`; the hero carries a visually hidden text
  description of the mask so screen readers and crawlers get the content.
- The fallback path — no WebGL, context loss, or save-data — shows the real
  photograph of a Gurulu Raksha mask, graded to match.
- WCAG 2.2 contrast (https://www.w3.org/TR/WCAG22/): body text is bone
  `#ece4d6` on near-black; muted text is held at ≥ 4.5:1 (**ASSUMPTION** —
  check with a contrast tool after any palette change).

---

## 10. Core Web Vitals with a 3D asset

| Metric | Good threshold | Source | Status |
|---|---|---|---|
| LCP | ≤ 2.5 s | https://web.dev/articles/vitals | **VERIFIED** |
| INP | ≤ 200 ms | same | **VERIFIED** |
| CLS | ≤ 0.1 | same | **VERIFIED** |
| Measured at | 75th percentile, mobile and desktop separately | same | **VERIFIED** |

The 3D budget is *on top of* these, not instead of them. The LCP element is the
hero headline (text), not the canvas; the canvas chunk is dynamically imported
after first paint, so it cannot delay LCP.

---

## Verification checklist

- [ ] `npm run build` passes; the three.js chunk is separate from the entry chunk
- [ ] Hero headline paints before the 3D chunk arrives
- [ ] Reds in the mask match the reference photo side by side
- [ ] Reduced motion: no smooth scroll, no pinned horizontal scroll, mask static
- [ ] Mobile: fewer particles, DPR ≤ 1.5, no pinned horizontal gallery
- [ ] No WebGL → fallback photo, no console errors
- [ ] Canvas stops rendering when scrolled away
- [ ] No console warnings in dev (StrictMode double-mount included)

## Anti-patterns

- **setState in `useFrame`** — re-renders React every frame.
- **Creating geometry inside `useFrame` or render** without `useMemo` — leaks
  GPU memory on every render.
- **Treating Draco as texture compression** — it does nothing for textures.
- **Tagging normal maps as sRGB** — corrupts lighting silently.
- **OrbitControls on a scroll page** — captures the wheel and touch scroll.
- **Registering ScrollTriggers in a plain `useEffect`** without cleanup —
  duplicate triggers under StrictMode.
- **Downloading an HDRI from a third-party CDN at runtime** — an extra network
  dependency for a light setup Lightformers do offline.
