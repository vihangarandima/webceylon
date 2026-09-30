import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scene as state } from '../../lib/sceneState';

// Gold dust hanging in the air around the mask — incense smoke in a dark
// shrine. It drifts upward, and parts around the cursor.
const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;
  attribute float aSeed;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    float speed = 0.05 + aSeed * 0.08;
    p.y = mod(p.y + uTime * speed + 4.0, 8.0) - 4.0;
    p.x += sin(uTime * 0.25 + aSeed * 6.2831) * 0.18;
    vec2 d = p.xy - uPointer;
    float dist = length(d);
    p.xy += normalize(d + 1e-4) * smoothstep(1.1, 0.0, dist) * 0.45;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.35 + aSeed) / -mv.z;
    // fade at the top and bottom of the loop so wrapping is invisible
    vAlpha = (0.25 + 0.75 * fract(aSeed * 7.13)) * smoothstep(4.0, 2.5, abs(p.y));
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, a * a * vAlpha * uOpacity);
    #include <colorspace_fragment>
  }
`;

export default function Particles({ count = 700, reduced = false }) {
  const mat = useRef(null);
  const { viewport, gl } = useThree();

  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * 6;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * 4;
      pos[i * 3 + 2] = -3 + Math.random() * 4.5;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 26 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uPointer: { value: new THREE.Vector2(99, 99) },
      uColor: { value: new THREE.Color('#d9b36a') },
      uOpacity: { value: 0 },
    }),
    [gl]
  );

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }, dt) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value = reduced ? 0 : clock.elapsedTime;
    if (!reduced) {
      const tx = (state.pointer.x * viewport.width) / 2;
      const ty = (state.pointer.y * viewport.height) / 2;
      u.uPointer.value.x = THREE.MathUtils.damp(u.uPointer.value.x, tx, 4, dt);
      u.uPointer.value.y = THREE.MathUtils.damp(u.uPointer.value.y, ty, 4, dt);
    }
    u.uOpacity.value = THREE.MathUtils.damp(u.uOpacity.value, state.intro * (1 - state.progress * 0.5), 2, dt);
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
