// A Gurulu Raksha mask, carved in code.
//
// Face coordinates: x ∈ [-1, 1], y ∈ [-1.3, 1], z toward the viewer.
// The face is a polar grid (rings × segments) pushed out by a height field —
// dome, brow, bulb nose, cheeks, a wide grin — and painted with canvas
// textures drawn in the same coordinates, so every painted line sits on the
// carving it belongs to. Flames and ear fans are extruded shapes whose UVs are
// their own shape coordinates, so their stripes are painted in shape space and
// taper with the blade.
//
// Palette is the site's: crimson lacquer, antique gold and amber, black,
// bone, and the muted temple teal standing in for the traditional green.

import * as THREE from 'three';

export const COLORS = {
  crimson: '#8e1b1b',
  crimsonHi: '#b3261e',
  crimsonLo: '#4e0d0b',
  gold: '#c9a45c',
  goldHi: '#e6c883',
  amber: '#e0a045',
  black: '#120a08',
  bone: '#efe5cf',
  teal: '#3d7a73',
};

// ---------------------------------------------------------------------------
// Shape of the face

const rx = (s) => (s > 0 ? 0.8 + 0.05 * s : 0.8 - 0.16 * s * s);
const ry = (s) => (s > 0 ? 0.92 : 1.22);

const g = (x, y, cx, cy, sx, sy) => Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));
const smooth = (a, b, v) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const MOUTH = { cx: 0, cy: -0.55, rx: 0.56, ry: 0.21 };
export const EYES = [
  [-0.33, 0.2],
  [0.33, 0.2],
];

const mouthE = (x, y) => Math.sqrt(((x - MOUTH.cx) / MOUTH.rx) ** 2 + ((y - MOUTH.cy) / MOUTH.ry) ** 2);

function faceT(x, y) {
  const s = Math.sin(Math.atan2(y, x));
  return Math.sqrt((x / rx(s)) ** 2 + (y / ry(s)) ** 2);
}

function height(x, y, t) {
  const dome = 0.4 * Math.pow(Math.max(0, 1 - t * t), 0.55);
  const feat =
    0.13 * (g(x, y, -0.33, 0.4, 0.26, 0.08) + g(x, y, 0.33, 0.4, 0.26, 0.08)) + // brow ridge
    0.05 * g(x, y, 0, 0.62, 0.3, 0.18) + // forehead
    -0.09 * (g(x, y, -0.33, 0.2, 0.18, 0.15) + g(x, y, 0.33, 0.2, 0.18, 0.15)) + // eye sockets
    0.14 * g(x, y, 0, 0.05, 0.08, 0.22) + // nose bridge
    0.22 * g(x, y, 0, -0.16, 0.17, 0.11) + // bulb nose
    -0.07 * (g(x, y, -0.1, -0.22, 0.05, 0.035) + g(x, y, 0.1, -0.22, 0.05, 0.035)) + // nostrils
    0.14 * (g(x, y, -0.5, -0.25, 0.22, 0.25) + g(x, y, 0.5, -0.25, 0.22, 0.25)) + // cheeks
    0.06 * g(x, y, 0, -1.05, 0.28, 0.14); // chin
  const e = mouthE(x, y);
  const lips = 0.17 * Math.exp(-((e - 1) ** 2) / 0.05);
  const cavity = -0.4 * (1 - smooth(0.45, 0.92, e));
  const fall = 1 - smooth(0.82, 1, t);
  const rim = t > 0.93 ? -(((t - 0.93) / 0.07) ** 2) * 0.14 : 0; // rolled edge
  return dome + (feat + lips + cavity) * fall + rim;
}

// Surface height anywhere on the face — used to seat eyes, teeth and tusks.
export const zAt = (x, y) => height(x, y, Math.min(1, faceT(x, y)));

export function buildFaceGeometry(rings = 110, segs = 220) {
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= rings; i++) {
    const t = i / rings;
    for (let j = 0; j <= segs; j++) {
      const th = (j / segs) * Math.PI * 2;
      const s = Math.sin(th);
      const x = t * rx(s) * Math.cos(th);
      const y = t * ry(s) * s;
      pos.push(x, y, height(x, y, t));
      uv.push((x + 1) / 2, (y + 1.3) / 2.3);
    }
  }
  const row = segs + 1;
  for (let i = 0; i < rings; i++) {
    for (let j = 0; j < segs; j++) {
      const a = i * row + j;
      const b = a + row;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

// ---------------------------------------------------------------------------
// Painting helpers. Every surface is painted three times from one routine:
//   color — albedo (sRGB)
//   orm   — R clearcoat (varnish), G roughness, B metalness: gold paint is
//           real metal, the mouth has no varnish so it reads as a hollow
//   bump  — mid grey is the surface; lighter is raised, darker is incised

function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const INKS = {
  color: {
    base: COLORS.crimson,
    baseHi: '#a3231c',
    baseLo: COLORS.crimsonLo,
    gold: '#d4a94f',
    amber: COLORS.amber,
    black: COLORS.black,
    bone: COLORS.bone,
    teal: COLORS.teal,
    lip: COLORS.crimsonHi,
    cavity: '#150606',
    patina: 'rgba(20, 6, 4, 0.08)',
  },
  orm: {
    base: 'rgb(255,120,0)',
    baseHi: 'rgb(255,120,0)',
    baseLo: 'rgb(255,120,0)',
    gold: 'rgb(90,74,255)',
    amber: 'rgb(200,100,0)',
    black: 'rgb(255,80,0)',
    bone: 'rgb(210,105,0)',
    teal: 'rgb(230,110,0)',
    lip: 'rgb(255,95,0)',
    cavity: 'rgb(0,235,0)',
    patina: 'rgba(170,170,0,0.12)',
  },
  bump: {
    base: '#808080',
    baseHi: '#808080',
    baseLo: '#808080',
    gold: '#b4b4b4',
    amber: '#a0a0a0',
    black: '#5c5c5c',
    bone: '#aaaaaa',
    teal: '#909090',
    lip: '#808080',
    cavity: '#606060',
    patina: 'rgba(90,90,90,0.12)',
  },
};

function makeCanvas(w, h) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  return cv;
}

function toTexture(cv, mode) {
  const tex = new THREE.CanvasTexture(cv);
  tex.anisotropy = 4;
  if (mode === 'color') tex.colorSpace = THREE.SRGBColorSpace; // data maps stay linear
  tex.needsUpdate = true;
  return tex;
}

function paintSet(w, h, painter) {
  const out = {};
  for (const mode of ['color', 'orm', 'bump']) {
    const cv = makeCanvas(w, h);
    painter(cv.getContext('2d'), INKS[mode], mode);
    out[mode === 'color' ? 'map' : mode] = toTexture(cv, mode);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Face painting

function outlinePath(ctx, t) {
  ctx.beginPath();
  for (let j = 0; j <= 160; j++) {
    const th = (j / 160) * Math.PI * 2;
    const s = Math.sin(th);
    const x = t * rx(s) * Math.cos(th);
    const y = t * ry(s) * s;
    j ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  }
  ctx.closePath();
}

function mouthPath(ctx, e) {
  ctx.beginPath();
  ctx.ellipse(MOUTH.cx, MOUTH.cy, MOUTH.rx * e, MOUTH.ry * e, 0, 0, Math.PI * 2);
}

// A fan of petals opening upward from (cx, cy) — the ornament above the nose
// and the scalloped brows over each eye.
function petalFan(ctx, c, cx, cy, r, from, to, n, colors, petalW = 0.5) {
  for (let i = 0; i < n; i++) {
    const a = from + ((to - from) * (i + 0.5)) / n;
    const w = ((to - from) / n) * petalW;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(cx + Math.cos(a - w) * r * 0.9, cy + Math.sin(a - w) * r * 0.9, cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.quadraticCurveTo(cx + Math.cos(a + w) * r * 0.9, cy + Math.sin(a + w) * r * 0.9, cx, cy);
    ctx.fill();
    ctx.strokeStyle = c.gold;
    ctx.lineWidth = 0.006;
    ctx.stroke();
  }
}

function paintFace(ctx, c, mode, S) {
  const rand = rng(7);
  ctx.fillStyle = c.baseLo;
  ctx.fillRect(0, 0, S, S);
  // Face units → pixels (y up).
  ctx.setTransform(S / 2, 0, 0, -S / 2.3, S / 2, S * (1 - 1.3 / 2.3));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (mode === 'color') {
    const grad = ctx.createRadialGradient(0, 0.05, 0.05, 0, -0.1, 1.2);
    grad.addColorStop(0, c.baseHi);
    grad.addColorStop(0.6, c.base);
    grad.addColorStop(1, c.baseLo);
    ctx.fillStyle = grad;
  } else ctx.fillStyle = c.base;
  outlinePath(ctx, 1.02);
  ctx.fill();

  if (mode === 'bump') {
    ctx.strokeStyle = 'rgba(70,70,70,0.18)';
    ctx.lineWidth = 0.004;
    for (let k = 0; k < 90; k++) {
      const y0 = -1.3 + k * 0.026 + rand() * 0.01;
      ctx.beginPath();
      for (let x = -1; x <= 1; x += 0.05) {
        const y = y0 + Math.sin(x * 3 + k) * 0.012 + Math.sin(x * 11 + k * 0.7) * 0.004;
        x === -1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // Age: soft blotches, so it never looks factory-new
  for (let k = 0; k < 46; k++) {
    const x = rand() * 2 - 1;
    const y = rand() * 2.2 - 1.25;
    const r = 0.04 + rand() * 0.14;
    ctx.fillStyle = c.patina;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + rand() * 0.8), rand() * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rim: black band, gold line inside
  ctx.strokeStyle = c.black;
  ctx.lineWidth = 0.07;
  outlinePath(ctx, 0.99);
  ctx.stroke();
  ctx.strokeStyle = c.gold;
  ctx.lineWidth = 0.012;
  outlinePath(ctx, 0.93);
  ctx.stroke();

  // Forehead fan above the nose — teal root, amber and bone petals
  ctx.fillStyle = c.teal;
  ctx.beginPath();
  ctx.ellipse(0, 0.44, 0.09, 0.04, 0, 0, Math.PI * 2);
  ctx.fill();
  petalFan(ctx, c, 0, 0.44, 0.27, Math.PI * 0.12, Math.PI * 0.88, 11, [c.amber, c.bone]);

  // Eyes: scalloped brow fans, then black socket, bone ring, gold rim
  for (const [ex, ey] of EYES) {
    const sx = Math.sign(ex);
    petalFan(ctx, c, ex, ey, 0.36, Math.PI * (sx > 0 ? 0.08 : 0.22), Math.PI * (sx > 0 ? 0.78 : 0.92), 9, [c.bone, c.amber], 0.42);
    ctx.fillStyle = c.teal;
    ctx.beginPath();
    ctx.arc(ex, ey, 0.275, Math.PI * 0.05, Math.PI * 0.95);
    ctx.lineTo(ex, ey);
    ctx.fill();
    ctx.fillStyle = c.black;
    ctx.beginPath();
    ctx.arc(ex, ey, 0.245, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.bone;
    ctx.lineWidth = 0.034;
    ctx.beginPath();
    ctx.arc(ex, ey, 0.215, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = c.gold;
    ctx.lineWidth = 0.012;
    ctx.beginPath();
    ctx.arc(ex, ey, 0.25, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Nose: gold spine and a leaf on the bridge, black nostrils
  ctx.strokeStyle = c.gold;
  ctx.lineWidth = 0.012;
  ctx.beginPath();
  ctx.moveTo(0, 0.38);
  ctx.lineTo(0, -0.05);
  ctx.stroke();
  ctx.fillStyle = c.gold;
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.quadraticCurveTo(0.06, 0.2, 0, 0.1);
  ctx.quadraticCurveTo(-0.06, 0.2, 0, 0.3);
  ctx.fill();
  ctx.fillStyle = c.black;
  for (const sx of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(sx * 0.1, -0.22, 0.045, 0.028, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Carved creases from nose to cheek, picked out in gold
  for (const sx of [-1, 1]) {
    ctx.strokeStyle = c.black;
    ctx.lineWidth = 0.026;
    ctx.beginPath();
    ctx.moveTo(sx * 0.16, -0.12);
    ctx.bezierCurveTo(sx * 0.34, -0.14, sx * 0.5, -0.3, sx * 0.56, -0.46);
    ctx.stroke();
    ctx.strokeStyle = c.gold;
    ctx.lineWidth = 0.01;
    ctx.stroke();
  }

  // Lips and the open grin
  ctx.fillStyle = c.lip;
  mouthPath(ctx, 1.2);
  ctx.fill();
  ctx.fillStyle = c.cavity;
  mouthPath(ctx, 0.86);
  ctx.fill();
  ctx.strokeStyle = c.black;
  ctx.lineWidth = 0.02;
  mouthPath(ctx, 1.2);
  ctx.stroke();
  mouthPath(ctx, 0.87);
  ctx.stroke();
  ctx.strokeStyle = c.gold;
  ctx.lineWidth = 0.008;
  mouthPath(ctx, 1.04);
  ctx.stroke();
}

export function buildFaceTextures(size = 1024) {
  return paintSet(size, size, (ctx, c, mode) => paintFace(ctx, c, mode, size));
}

// ---------------------------------------------------------------------------
// Flame spikes — tall, pointed, striped like the painted flames of a Raksha

const BLADE_W = 0.14; // half-width of the texture window in shape units

// One outline for both the 3D shape and the painted stripes (a canvas context
// and a THREE.Shape share moveTo/bezierCurveTo). `sx` squeezes it toward the
// centre line so inner stripes taper with the flame; the tip curls over.
function traceBlade(p, sx = 1) {
  p.moveTo(-0.12 * sx, 0);
  p.bezierCurveTo(-0.15 * sx, 0.3, 0.0, 0.52, -0.03 * sx + 0.01, 0.76);
  p.bezierCurveTo(-0.04 * sx + 0.02, 0.88, 0.04, 0.96, 0.09, 1.0);
  p.bezierCurveTo(0.05 + 0.02 * sx, 0.84, 0.1 + 0.04 * sx, 0.66, 0.06 + 0.04 * sx, 0.46);
  p.bezierCurveTo(0.03 + 0.06 * sx, 0.3, 0.14 * sx, 0.16, 0.12 * sx, 0);
}

// The flame leans: its spine runs from (0, 0) to the tip at (0.09, 1). To
// inset a stripe evenly, un-shear onto a vertical spine, narrow, re-shear.
const LEAN = 0.09;
function bladePath(ctx, k = 1) {
  ctx.save();
  ctx.transform(1, 0, LEAN, 1, 0, 0);
  ctx.scale(k, 1);
  ctx.transform(1, 0, -LEAN, 1, 0, 0);
  ctx.beginPath();
  traceBlade(ctx);
  ctx.closePath();
  ctx.restore();
}

export function buildBladeGeometry() {
  const s = new THREE.Shape();
  traceBlade(s);
  s.lineTo(-0.12, 0);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.022,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 14,
  });
  geo.translate(0, 0, -0.011);
  geo.computeVertexNormals();
  return geo;
}

function paintBlade(ctx, c, mode, W, H) {
  ctx.fillStyle = c.black;
  ctx.fillRect(0, 0, W, H);
  // shape units → pixels: x ∈ [-BLADE_W, BLADE_W], y ∈ [0, 1], y up
  ctx.setTransform(W / (2 * BLADE_W), 0, 0, -H, W / 2, H);
  // outer band: amber at the root rising to pale gold at the tip — half
  // metal, so it glows like gilded paint rather than turning grey at angles
  if (mode === 'color') {
    const grad = ctx.createLinearGradient(0, 0, 0, 1);
    grad.addColorStop(0, '#d98a2e');
    grad.addColorStop(0.5, '#e7ae45');
    grad.addColorStop(1, '#f0cf7a');
    ctx.fillStyle = grad;
  } else if (mode === 'orm') ctx.fillStyle = 'rgb(230,85,70)';
  else ctx.fillStyle = c.gold;
  bladePath(ctx, 1.15);
  ctx.fill();
  ctx.fillStyle = c.lip;
  bladePath(ctx, 0.6);
  ctx.fill();
  ctx.fillStyle = c.black;
  bladePath(ctx, 0.28);
  ctx.fill();
  // bone hairline down the spine
  ctx.strokeStyle = c.bone;
  ctx.lineWidth = 0.008;
  ctx.beginPath();
  ctx.moveTo(0.004, 0.06);
  ctx.lineTo(LEAN * 0.9, 0.9);
  ctx.stroke();
}

export function buildBladeTextures() {
  const W = 128;
  const H = 512;
  const set = paintSet(W, H, (ctx, c, mode) => paintBlade(ctx, c, mode, W, H));
  // front and back faces use raw shape coordinates as UVs: map x → [0, 1]
  for (const t of Object.values(set)) {
    t.repeat.set(1 / (2 * BLADE_W), 1);
    t.offset.set(0.5, 0);
  }
  return set;
}

// ---------------------------------------------------------------------------
// Ear fans — the oval discs either side of the face

export const EAR = { rx: 0.36, ry: 0.27 };

export function buildEarGeometry() {
  const s = new THREE.Shape();
  s.absellipse(0, 0, EAR.rx, EAR.ry, 0, Math.PI * 2, false, 0);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.03,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 48,
  });
  geo.translate(0, 0, -0.015);
  geo.computeVertexNormals();
  return geo;
}

function paintEar(ctx, c, mode, W, H) {
  const sx = W / (2 * (EAR.rx + 0.04));
  const sy = H / (2 * (EAR.ry + 0.04));
  ctx.fillStyle = c.gold;
  ctx.fillRect(0, 0, W, H);
  ctx.setTransform(sx, 0, 0, -sy, W / 2, H / 2);
  const ring = (k, fill) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(0, 0, EAR.rx * k, EAR.ry * k, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  ring(1.08, c.gold);
  ring(0.9, c.black); // behind the 3D bead ring
  ring(0.78, c.teal);
  ring(0.64, c.lip);
  // lattice of gold diagonals with bone dots at the crossings
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, EAR.rx * 0.64, EAR.ry * 0.64, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = c.gold;
  ctx.lineWidth = 0.006;
  const step = 0.06;
  for (let k = -12; k <= 12; k++) {
    ctx.beginPath();
    ctx.moveTo(k * step - 0.5, -0.5);
    ctx.lineTo(k * step + 0.5, 0.5);
    ctx.moveTo(k * step - 0.5, 0.5);
    ctx.lineTo(k * step + 0.5, -0.5);
    ctx.stroke();
  }
  ctx.fillStyle = c.bone;
  for (let i = -8; i <= 8; i++) {
    for (let j = -8; j <= 8; j++) {
      ctx.beginPath();
      ctx.arc(i * step, j * step + (i % 2 ? step / 2 : 0), 0.008, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  ctx.strokeStyle = c.gold;
  ctx.lineWidth = 0.01;
  ctx.beginPath();
  ctx.ellipse(0, 0, EAR.rx * 0.64, EAR.ry * 0.64, 0, 0, Math.PI * 2);
  ctx.stroke();
}

export function buildEarTextures() {
  const W = 512;
  const H = 384;
  const set = paintSet(W, H, (ctx, c, mode) => paintEar(ctx, c, mode, W, H));
  for (const t of Object.values(set)) {
    t.repeat.set(1 / (2 * (EAR.rx + 0.04)), 1 / (2 * (EAR.ry + 0.04)));
    t.offset.set(0.5, 0.5);
  }
  return set;
}

export const EAR_POS = [
  [-0.98, -0.02, -0.04, 0.45],
  [0.98, -0.02, -0.04, -0.45],
]; // x, y, z, yaw

// ---------------------------------------------------------------------------
// Tusks — a cone bent outward, from each corner of the grin

export function buildTuskGeometry() {
  const geo = new THREE.ConeGeometry(0.04, 0.44, 14, 12);
  geo.rotateX(Math.PI); // tip down
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i); // +0.22 root … -0.22 tip
    const t = (0.22 - y) / 0.44;
    p.setX(i, p.getX(i) + t * t * 0.09); // curve outward
    p.setZ(i, p.getZ(i) + t * t * 0.05); // and forward
  }
  geo.translate(0, -0.2, 0);
  geo.computeVertexNormals();
  return geo;
}

export function tuskPlacement() {
  return [-1, 1].map((sx) => {
    const x = sx * 0.47;
    const y = -0.5;
    return { position: [x, y, zAt(x, y) + 0.02], rotation: [0.1, 0, sx * -0.12], scale: [sx, 1, 1] };
  });
}

// ---------------------------------------------------------------------------
// Flame layout

const _m = new THREE.Matrix4();
const _t = new THREE.Matrix4();

// T · Rz(fan) · Rx(lean) · S — each spike leans back along its own direction,
// then fans out around the head.
function bladeMatrix(x, y, z, fan, lean, sx, sy) {
  _m.makeTranslation(x, y, z);
  _m.multiply(_t.makeRotationZ(fan));
  _m.multiply(_t.makeRotationX(lean));
  _m.multiply(_t.makeScale(sx, sy, 1));
  return _m.clone();
}

export function flameLayout() {
  const front = [];
  const back = [];
  const deg = Math.PI / 180;
  const C = [0, 0.05];

  // Front fan: from ear level on one side, over the top, to the other.
  const N = 15;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const a = (-18 + 216 * t) * deg;
    const tall = Math.pow(Math.sin(Math.PI * t), 1.4);
    const h = 0.75 + 1.25 * tall;
    const r = 0.66;
    front.push(bladeMatrix(C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r * 1.1, -0.1 - (i % 2) * 0.025, a - Math.PI / 2, -0.28, 1.7 + 0.5 * tall, h));
  }
  // Back fan, interleaved and a little shorter, for depth.
  for (let i = 0; i < N - 1; i++) {
    const t = (i + 0.5) / (N - 1);
    const a = (-18 + 216 * t) * deg;
    const tall = Math.pow(Math.sin(Math.PI * t), 1.4);
    const h = (0.75 + 1.25 * tall) * 0.86;
    const r = 0.6;
    back.push(bladeMatrix(C[0] + Math.cos(a) * r, C[1] + Math.sin(a) * r * 1.1, -0.2, a - Math.PI / 2, -0.4, 2.0, h));
  }
  return [...front, ...back];
}

// ---------------------------------------------------------------------------
// Beads and teeth

export function beadLayout() {
  const out = [];
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  const v = new THREE.Vector3();
  const e = new THREE.Euler();
  for (const [ex, ey, ez, yaw] of EAR_POS) {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(ex, ey, ez), q.setFromEuler(e.set(0, yaw, 0)), s);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      v.set(Math.cos(a) * EAR.rx * 0.84, Math.sin(a) * EAR.ry * 0.84, 0.045).applyMatrix4(m);
      out.push(new THREE.Matrix4().compose(v.clone(), new THREE.Quaternion(), s));
    }
  }
  return out;
}

// Block teeth set around the inside of the grin, each pointing to the centre.
export function teethLayout() {
  const out = [];
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const place = (deg, upper) => {
    const a = (deg * Math.PI) / 180;
    const x = MOUTH.cx + Math.cos(a) * MOUTH.rx * 0.8;
    const y = MOUTH.cy + Math.sin(a) * MOUTH.ry * 0.72;
    const toward = Math.atan2(MOUTH.cy - y, MOUTH.cx - x) - Math.PI / 2;
    e.set(upper ? 0.25 : -0.25, 0, toward);
    q.setFromEuler(e);
    out.push(new THREE.Matrix4().compose(new THREE.Vector3(x, y, zAt(x, y) - 0.005), q.clone(), new THREE.Vector3(1, 1, 1)));
  };
  for (let i = 0; i < 10; i++) place(30 + i * 13.3, true);
  for (let i = 0; i < 8; i++) place(212 + i * 16.5, false);
  return out;
}

// The tongue hangs from inside the grin, over the lower lip, down the chin.
export function tonguePlacement() {
  return { position: [0, -0.86, zAt(0, -0.8) + 0.05], rotation: [-0.22, 0, 0], scale: [1.7, 1, 0.45] };
}
