import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scene as state, emit } from '../../lib/sceneState';
import {
  buildFaceGeometry,
  buildFaceTextures,
  buildBladeGeometry,
  buildBladeTextures,
  buildEarGeometry,
  buildEarTextures,
  buildTuskGeometry,
  tuskPlacement,
  tonguePlacement,
  flameLayout,
  beadLayout,
  teethLayout,
  zAt,
  EYES,
  EAR_POS,
  COLORS,
} from './maskGeometry';

const damp = THREE.MathUtils.damp;
const AMBER = new THREE.Color('#e0a045');
const BLACK = new THREE.Color('#000000');

// Seat instanced transforms once, before the first frame.
function useInstances(ref, matrices) {
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [ref, matrices]);
}

function Eye({ position, material, pupilMaterial, rimMaterial }) {
  const look = useRef(null);
  const target = useMemo(() => new THREE.Vector3(), []);
  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, dt) => {
    const g = look.current;
    if (!g) return;
    // The eyes find the visitor: they track a point floating in front of the
    // mask under the cursor.
    target.set(state.pointer.x * 2.4, state.pointer.y * 1.5, 4);
    g.parent.worldToLocal(world.copy(target));
    const yaw = Math.atan2(world.x - g.position.x, world.z - g.position.z);
    const pitch = Math.atan2(-(world.y - g.position.y), Math.hypot(world.x - g.position.x, world.z - g.position.z));
    g.rotation.y = damp(g.rotation.y, THREE.MathUtils.clamp(yaw, -0.6, 0.6), 6, dt);
    g.rotation.x = damp(g.rotation.x, THREE.MathUtils.clamp(pitch, -0.5, 0.5), 6, dt);
  });

  return (
    <group position={position}>
      <mesh material={rimMaterial} position={[0, 0, -0.03]}>
        <torusGeometry args={[0.178, 0.022, 12, 48]} />
      </mesh>
      <group ref={look}>
        <mesh material={material}>
          <sphereGeometry args={[0.155, 40, 28]} />
        </mesh>
        <mesh material={pupilMaterial} position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.074, 28, 20]} />
        </mesh>
      </group>
    </group>
  );
}

function painted(set, { side = THREE.FrontSide, bumpScale = 1 } = {}) {
  return new THREE.MeshPhysicalMaterial({
    map: set.map,
    roughnessMap: set.orm,
    metalnessMap: set.orm,
    clearcoatMap: set.orm,
    bumpMap: set.bump,
    bumpScale,
    roughness: 1,
    metalness: 1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.32,
    side,
  });
}

export default function MaskSculpture({ quality = 'high', reduced = false }) {
  const group = useRef(null);
  const inner = useRef(null);
  const flames = useRef(null);
  const beads = useRef(null);
  const teeth = useRef(null);
  const halo = useRef(null);
  const hovering = useRef(false);
  const { size, camera } = useThree();

  const high = quality === 'high';

  const geo = useMemo(
    () => ({
      face: high ? buildFaceGeometry(110, 220) : buildFaceGeometry(64, 128),
      blade: buildBladeGeometry(),
      ear: buildEarGeometry(),
      tusk: buildTuskGeometry(),
    }),
    [high]
  );
  const tex = useMemo(
    () => ({ face: buildFaceTextures(high ? 1024 : 512), blade: buildBladeTextures(), ear: buildEarTextures() }),
    [high]
  );
  const layout = useMemo(
    () => ({ flames: flameLayout(), beads: beadLayout(), teeth: teethLayout(), tusks: tuskPlacement() }),
    []
  );

  const mat = useMemo(
    () => ({
      // Painted, varnished wood: one recipe, three painted surfaces.
      face: painted(tex.face, { side: THREE.DoubleSide, bumpScale: 1.1 }),
      flame: painted(tex.blade, { bumpScale: 0.6 }),
      ear: painted(tex.ear, { bumpScale: 0.6 }),
      // Eye rims: plain antique gold.
      // Small parts share one cheap standard-material program: fewer shaders
      // to compile before the first frame.
      gold: new THREE.MeshStandardMaterial({ color: '#b8893a', metalness: 1, roughness: 0.3 }),
      bone: new THREE.MeshStandardMaterial({ color: COLORS.bone, roughness: 0.3 }),
      black: new THREE.MeshStandardMaterial({ color: '#0b0908', roughness: 0.15 }),
      tongue: new THREE.MeshStandardMaterial({ color: COLORS.crimsonHi, roughness: 0.28 }),
      halo: new THREE.MeshBasicMaterial({ color: '#8c7240', transparent: true, opacity: 0.5 }),
    }),
    [tex]
  );

  useInstances(flames, layout.flames);
  useInstances(beads, layout.beads);
  useInstances(teeth, layout.teeth);

  // GPU memory is not garbage collected — release what was built imperatively.
  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(tex).forEach((set) => Object.values(set).forEach((t) => t.dispose()));
      Object.values(mat).forEach((m) => m.dispose());
    },
    [geo, tex, mat]
  );

  const eyeZ = EYES.map(([x, y]) => zAt(x, y) + 0.02);
  const mobile = size.width < 900;
  const center = useMemo(() => new THREE.Vector3(), []);
  const smoothed = useRef({ px: 0, py: 0, glow: 0 });

  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g) return;
    const s = smoothed.current;
    const p = state.progress;
    const intro = state.intro;
    const t = clock.elapsedTime;

    // Pointer, smoothed — luxury is a little behind the hand, never jittery.
    const followX = reduced ? 0 : state.pointer.x;
    const followY = reduced ? 0 : state.pointer.y;
    s.px = damp(s.px, followX, 2.2, dt);
    s.py = damp(s.py, followY, 2.2, dt);

    // Emerging from darkness: rises, turns to face you, scales up.
    const e = 1 - Math.pow(1 - intro, 3);
    const k = THREE.MathUtils.smootherstep(p, 0, 1);

    g.position.x = mobile ? 0 : k * 2.3; // clears the statement copy on the left
    g.position.y = (1 - e) * -0.35 + (reduced ? 0 : Math.sin(t * 0.6) * 0.025) - k * 0.1;
    g.rotation.y = (1 - e) * -0.7 + s.px * 0.38 + k * -0.55;
    g.rotation.x = -s.py * 0.18 + k * 0.08;
    g.rotation.z = s.px * -0.04;
    const sc = (0.86 + 0.14 * e) * (1 - k * 0.12);
    g.scale.setScalar(sc);

    if (halo.current) {
      halo.current.rotation.z = t * 0.03 + k * 1.2;
      halo.current.rotation.x = 0.2 + s.py * 0.1 + k * 0.6;
      halo.current.rotation.y = s.px * 0.2;
    }

    // Awakened: after the visitor has seen the work and come back, the gold
    // carries a slow ember glow. The hero has changed since they left.
    const wantGlow = state.awakened ? 1 : 0;
    s.glow = damp(s.glow, wantGlow, 1.2, dt);
    const pulse = 0.75 + 0.25 * Math.sin(t * 1.4);
    mat.flame.emissive.copy(BLACK).lerp(AMBER, s.glow * 0.16 * pulse);
    mat.gold.emissive.copy(BLACK).lerp(AMBER, s.glow * 0.15 * pulse);
    mat.halo.opacity = 0.35 + s.glow * 0.4;

    // Is the pointer over the mask? Screen-space distance to its centre is
    // cheap and good enough for a cursor state.
    if (!reduced) {
      inner.current.getWorldPosition(center).project(camera);
      const aspect = size.width / size.height;
      const dx = (state.pointer.x - center.x) * aspect;
      const dy = state.pointer.y - center.y;
      const over = Math.hypot(dx, dy) < 0.42 * sc && p < 0.5 && intro > 0.9;
      if (over !== hovering.current) {
        hovering.current = over;
        emit('mask-hover', over);
      }
    }
  });

  useEffect(() => () => emit('mask-hover', false), []);

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh geometry={geo.face} material={mat.face} />

        {EYES.map(([x, y], i) => (
          <Eye key={i} position={[x, y, eyeZ[i]]} material={mat.bone} pupilMaterial={mat.black} rimMaterial={mat.gold} />
        ))}

        <instancedMesh ref={flames} args={[geo.blade, mat.flame, layout.flames.length]} />

        {EAR_POS.map(([x, y, z, yaw], i) => (
          <mesh key={i} geometry={geo.ear} material={mat.ear} position={[x, y, z]} rotation={[0, yaw, 0]} />
        ))}

        <instancedMesh ref={beads} args={[undefined, mat.bone, layout.beads.length]}>
          <sphereGeometry args={[0.024, 14, 10]} />
        </instancedMesh>

        <instancedMesh ref={teeth} args={[undefined, mat.bone, layout.teeth.length]}>
          <boxGeometry args={[0.07, 0.1, 0.045]} />
        </instancedMesh>

        {layout.tusks.map((t, i) => (
          <mesh key={i} geometry={geo.tusk} material={mat.bone} {...t} />
        ))}

        {/* the long tongue hangs over the lower lip, down the chin */}
        <mesh material={mat.tongue} {...tonguePlacement()}>
          <capsuleGeometry args={[0.075, 0.42, 8, 20]} />
        </mesh>
      </group>

      {/* Two fine rings behind the head: a bead-strung halo, in a digital register */}
      <group ref={halo} position={[0, 0.15, -0.5]}>
        <mesh material={mat.halo}>
          <torusGeometry args={[1.62, 0.0035, 6, 180]} />
        </mesh>
        <mesh material={mat.halo} rotation={[0, 0, 0.4]} scale={1.07}>
          <torusGeometry args={[1.62, 0.002, 6, 180, Math.PI * 1.3]} />
        </mesh>
      </group>
    </group>
  );
}
