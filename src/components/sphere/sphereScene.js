import * as THREE from 'three';

// A globe of curved cards. Each card is a small patch of the sphere's own
// surface, so it bends with it; the far side shows through, mirrored, and
// fades into the dark with fog.

// Rows of cards from south to north: latitude (degrees) and how many.
const ROWS = [
  [-40, 5],
  [-13, 7],
  [13, 7],
  [40, 5],
];
const CARD_W = 0.5; // angular width at the equator, radians
const CARD_H = 0.33; // angular height
const SEGS = 18; // grid density: enough to look smoothly curved
const IMG_ASPECT = 1024 / 464; // screenshots
const CARD_ASPECT = CARD_W / CARD_H;

// One curved patch centred on (lat0, lon0). Width is corrected by latitude so
// cards stay the same size near the poles.
function cardGeometry(lat0, lon0, radius) {
  const geo = new THREE.BufferGeometry();
  const pos = [];
  const uv = [];
  const idx = [];
  const width = CARD_W / Math.cos(lat0);
  // crop the screenshot to the card's shape, keeping the left of the page
  const uSpan = Math.min(1, CARD_ASPECT / IMG_ASPECT);
  for (let j = 0; j <= SEGS; j++) {
    const v = j / SEGS;
    const lat = lat0 + (v - 0.5) * CARD_H;
    for (let i = 0; i <= SEGS; i++) {
      const u = i / SEGS;
      const lon = lon0 + (u - 0.5) * width;
      pos.push(radius * Math.cos(lat) * Math.sin(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lon));
      uv.push(u * uSpan, v);
    }
  }
  const row = SEGS + 1;
  for (let j = 0; j < SEGS; j++) {
    for (let i = 0; i < SEGS; i++) {
      const a = j * row + i;
      idx.push(a, a + 1, a + row, a + 1, a + row + 1, a + row);
    }
  }
  geo.setIndex(idx);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return geo;
}

export function createSphere(canvas, { shots, onHover, small = false }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  const globe = new THREE.Group();
  scene.add(globe);

  const loader = new THREE.TextureLoader();
  const textures = new Map();
  const texture = (src) => {
    if (!textures.has(src)) {
      const t = loader.load(`${src}-800.webp`);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      textures.set(src, t);
    }
    return textures.get(src);
  };

  // Lay the cards out, row by row, offset so neighbouring rows interleave.
  const cards = [];
  let n = 0;
  ROWS.forEach(([latDeg, count], r) => {
    const lat = THREE.MathUtils.degToRad(latDeg);
    for (let i = 0; i < count; i++) {
      // loosely placed, not a grid: small fixed offsets per card
      const jitter = (k) => (((n * k) % 13) / 13 - 0.5) * 2;
      const lon = (i / count) * Math.PI * 2 + (r % 2 ? Math.PI / count : 0) + jitter(7) * 0.14;
      const latJ = lat + jitter(11) * 0.07;
      const shot = shots[(n * 5) % shots.length]; // stride so neighbours differ
      const radius = 1 + jitter(5) * 0.09; // some cards float nearer, some further
      n++;
      const mat = new THREE.MeshBasicMaterial({ map: texture(shot.src), side: THREE.DoubleSide, transparent: true, fog: true });
      const mesh = new THREE.Mesh(cardGeometry(latJ, lon, radius), mat);
      // outward direction through the card's centre, for the hover lift
      const normal = new THREE.Vector3(Math.cos(latJ) * Math.sin(lon), Math.sin(latJ), Math.cos(latJ) * Math.cos(lon));
      mesh.userData = { shot, normal, lift: 0 };
      globe.add(mesh);
      cards.push(mesh);
    }
  });

  // The far side of the globe sinks into the dark. Near and far are set
  // from the camera distance in resize(), so this holds at any screen shape.
  scene.fog = new THREE.Fog(0x000000, 2.6, 5.2);

  const state = { progress: 0, drag: 0, dragVel: 0, spin: 0, hovered: null, opacity: 1, size: [1, 1] };
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(10, 10);

  const resize = (w, h) => {
    state.size = [w, h];
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // the globe about as tall as the screen; on narrow screens fit its width
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const d = Math.max(1.12 / t, 1.04 / (t * camera.aspect));
    camera.position.set(0, 0, d);
    // front of the globe sits at about d - 1, the back at d + 1
    scene.fog.near = d - 0.5;
    scene.fog.far = d + 1.6;
    camera.updateProjectionMatrix();
  };

  const pick = (x, y) => {
    const [w, h] = state.size;
    pointer.set((x / w) * 2 - 1, -(y / h) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(cards, false)[0];
    // only the near side counts: the camera looks down -z, the globe's front faces +z
    const card = hit && hit.point.z > -0.2 ? hit.object : null;
    if (card !== state.hovered) {
      state.hovered = card;
      onHover?.(card ? card.userData.shot : null);
    }
    return card ? card.userData.shot : null;
  };

  let last = performance.now();
  const render = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    // drag keeps a little momentum after release
    state.drag += state.dragVel;
    state.dragVel *= 0.92;
    state.spin += dt * 0.06;

    const p = state.progress;
    const enter = THREE.MathUtils.smoothstep(p, 0, 0.12);
    globe.rotation.y = p * Math.PI * 1.7 + state.drag + state.spin;
    globe.rotation.x = 0.22 + Math.sin(p * Math.PI) * 0.18;
    globe.rotation.z = -0.08;
    globe.scale.setScalar(0.72 + 0.28 * enter);

    // dim the cards once the visitor reaches the end, for "View all"
    const target = 1 - 0.55 * THREE.MathUtils.smoothstep(p, 0.78, 0.92);
    state.opacity += (target - state.opacity) * 0.1;

    for (const c of cards) {
      const want = c === state.hovered ? 0.08 : 0;
      c.userData.lift += (want - c.userData.lift) * 0.15;
      c.position.copy(c.userData.normal).multiplyScalar(c.userData.lift);
      c.material.opacity = state.opacity * enter;
    }
    renderer.render(scene, camera);
  };

  return {
    resize,
    render,
    pick,
    setProgress: (p) => (state.progress = p),
    nudge: (dx) => (state.dragVel = dx),
    dragBy: (dx) => {
      state.drag += dx;
      state.dragVel = dx * 0.6;
    },
    dispose: () => {
      cards.forEach((c) => {
        c.geometry.dispose();
        c.material.dispose();
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    },
  };
}
