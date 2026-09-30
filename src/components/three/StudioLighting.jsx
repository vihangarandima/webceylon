import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Image-based light from glowing panels, rendered once into a PMREM cube —
// the same idea as drei's <Environment><Lightformer/></Environment>, in a
// few lines instead of a dependency, and with no HDRI to download.
const PANELS = [
  // [shape, colour, intensity, position, scale]
  ['rect', '#ffd9a8', 2.2, [-4, 5, 3], [6, 2]], // warm key, above left
  ['rect', '#8fc2ba', 3.0, [5, 1, -4], [1.2, 6]], // teal rim, behind right
  ['rect', '#e0a045', 0.9, [0, -4, 2], [8, 1]], // amber bounce from below
  ['ring', '#fff1dc', 0.5, [2, 2.5, 5], [1.2, 1.2]], // soft catch-light
];

export function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const room = new THREE.Scene();
    const disposables = [];
    for (const [shape, color, intensity, pos, [sx, sy]] of PANELS) {
      const geo = shape === 'ring' ? new THREE.RingGeometry(0.5, 1, 48) : new THREE.PlaneGeometry(1, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.scale.set(sx, sy, 1);
      mesh.lookAt(0, 0, 0);
      room.add(mesh);
      disposables.push(geo, mat);
    }
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(room, 0.02);
    scene.environment = target.texture;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
      disposables.forEach((d) => d.dispose());
    };
  }, [gl, scene]);

  return null;
}

// Drops the pixel ratio when the frame rate sags, and restores it when
// there is headroom again. Measured over two-second windows.
export function AdaptiveDpr({ high, low = 1 }) {
  const setDpr = useThree((s) => s.setDpr);
  const acc = useRef({ t: 0, frames: 0, current: high });

  useFrame((_, dt) => {
    const a = acc.current;
    a.t += dt;
    a.frames++;
    if (a.t < 2) return;
    const fps = a.frames / a.t;
    a.t = 0;
    a.frames = 0;
    if (fps < 45 && a.current !== low) {
      a.current = low;
      setDpr(low);
    } else if (fps > 58 && a.current !== high) {
      a.current = high;
      setDpr(high);
    }
  });

  return null;
}
