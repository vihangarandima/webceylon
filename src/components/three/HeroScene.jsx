import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import MaskSculpture from './MaskSculpture';
import Particles from './Particles';
import { scene as state, on, emit } from '../../lib/sceneState';
import { markFirstFrame } from '../../lib/loadTracker';

const damp = THREE.MathUtils.damp;

// Camera orbits the mask as the page scrolls; the spotlight follows the
// cursor so the carved relief visibly changes under your hand.
function Rig({ reduced }) {
  const spot = useRef(null);
  const key = useRef(null);
  const rim = useRef(null);
  const { camera, scene } = useThree();
  const cur = useRef({ p: 0, lx: 0, ly: 0 });
  const lookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (spot.current) spot.current.target.position.set(0, 0.1, 0);
  }, []);

  useFrame((_, dt) => {
    const c = cur.current;
    c.p = damp(c.p, state.progress, 5, dt);
    const k = THREE.MathUtils.smootherstep(c.p, 0, 1);
    const intro = state.intro;

    // Frame the whole mask — crown to side flames — whatever the aspect ratio.
    const halfTan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const fitH = 4.6 / (2 * halfTan);
    const fitW = 3.6 / (2 * halfTan * camera.aspect);
    const base = Math.max(fitH, fitW);
    // Orbit: a quarter turn around the mask and a slow pull back.
    const angle = k * 0.75;
    const radius = base * (1 + k * 0.15);
    camera.position.set(Math.sin(angle) * radius, 0.5 + k * 0.5, Math.cos(angle) * radius);
    lookAt.current.set(0, 0.6, 0);
    camera.lookAt(lookAt.current);

    c.lx = damp(c.lx, reduced ? -0.4 : state.pointer.x, 3, dt);
    c.ly = damp(c.ly, reduced ? 0.5 : state.pointer.y, 3, dt);
    if (spot.current) {
      spot.current.position.set(c.lx * 4 + 1, c.ly * 3 + 2, 5);
      spot.current.intensity = 30 * intro;
    }
    if (key.current) key.current.intensity = 1.1 * intro;
    if (rim.current) rim.current.intensity = 2.4 * intro;
    // Environment light rises with the intro: the mask emerges from darkness.
    scene.environmentIntensity = 0.08 + 0.62 * intro;
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight ref={key} position={[-3, 4, 5]} color="#ffd9a8" intensity={0} />
      <directionalLight ref={rim} position={[3.5, 1.5, -4]} color="#7fb5ad" intensity={0} />
      <spotLight ref={spot} angle={0.42} penumbra={0.9} decay={2} distance={22} color="#ffe2b8" intensity={0} />
    </>
  );
}

function FirstFrame() {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    // two frames later the shaders are compiled and on screen
    requestAnimationFrame(() => requestAnimationFrame(markFirstFrame));
  });
  return null;
}

export default function HeroScene({ tier = 'high', reduced = false }) {
  const [active, setActive] = useState(true);
  const [dpr, setDpr] = useState(tier === 'high' ? 1.75 : 1.25);
  const high = tier === 'high';

  useEffect(() => on('scene-active', setActive), []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      camera={{ fov: 30, near: 0.1, far: 50, position: [0, 0.18, 6.2] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          emit('scene-lost');
        });
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(high ? 1.75 : 1.25)} flipflops={3} />
      <Rig reduced={reduced} />
      <MaskSculpture quality={high ? 'high' : 'low'} reduced={reduced} />
      <Particles count={high ? 700 : 220} reduced={reduced} />
      {/* Image-based light from glowing panels — no HDRI download. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#ffd9a8" position={[-4, 5, 3]} scale={[6, 2, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3} color="#8fc2ba" position={[5, 1, -4]} scale={[1.2, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.9} color="#e0a045" position={[0, -4, 2]} scale={[8, 1, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={0.5} color="#fff1dc" position={[2, 2.5, 5]} scale={1.2} target={[0, 0, 0]} />
      </Environment>
      <FirstFrame />
    </Canvas>
  );
}
