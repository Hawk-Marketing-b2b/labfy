import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

// Hélice dupla de partículas. A forma toda é calculada no shader a partir de
// (t ao longo da hélice, lerp entre as fitas, é-pulso): gira, "respira" e
// abre o zíper conforme o usuário rola pra fora do hero.
const VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  varying float vMix;
  varying float vAlpha;
  varying float vPulse;

  const float TURNS = 3.4;
  const float LEN = 8.0;
  const float R = 0.95;
  const float PI = 3.14159265;

  void main() {
    float t = position.x;
    float l = position.y;
    float p = position.z;

    // pulsos correm ao longo das fitas
    t = mix(t, fract(t + uTime * (0.025 + aSeed * 0.02)), p);

    float th = t * TURNS * 2.0 * PI + uTime * 0.35;
    float y = (t - 0.5) * LEN;
    float r = R * (1.0 + uScroll * 0.6);
    vec3 a = vec3(cos(th) * r, y, sin(th) * r);
    vec3 b = vec3(cos(th + PI) * r, y, sin(th + PI) * r);
    vec3 pos = mix(a, b, l);
    pos.x += (l - 0.5) * 2.0 * uScroll * 1.4;
    pos += vec3(
      sin(uTime * 0.8 + aSeed * 31.0),
      cos(uTime * 0.7 + aSeed * 17.0),
      sin(uTime * 0.6 + aSeed * 11.0)
    ) * 0.03;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // 0 = fundo da hélice, 1 = frente (câmera em z=6)
    float depth = clamp((mv.z + 7.4) / 2.6, 0.0, 1.0);
    float isRung = step(0.001, l) * step(l, 0.999) * (1.0 - p);
    vAlpha = mix(0.22, 1.0, depth) * (1.0 - isRung * uScroll) * (1.0 - uScroll * 0.5);
    vMix = l;
    vPulse = p;
    gl_PointSize = aSize * uPixelRatio * (46.0 / -mv.z) * mix(0.6, 1.25, depth);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vMix;
  varying float vAlpha;
  varying float vPulse;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = pow(smoothstep(0.5, 0.0, d), 2.0);
    vec3 col = mix(uColorA, uColorB, vMix);
    col = mix(col, vec3(1.0), clamp(vPulse * 0.7 + smoothstep(0.2, 0.0, d) * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(col, alpha * vAlpha * uOpacity);
  }
`;

function buildHelix(perStrand: number, rungs: number, rungPoints: number, pulses: number) {
  const total = perStrand * 2 + rungs * rungPoints + pulses;
  const position = new Float32Array(total * 3);
  const seed = new Float32Array(total);
  const size = new Float32Array(total);
  let i = 0;
  const push = (t: number, lerp: number, s: number, pulse: number) => {
    position.set([t, lerp, pulse], i * 3);
    seed[i] = Math.random();
    size[i] = s;
    i++;
  };

  for (let strand = 0; strand < 2; strand++) {
    for (let k = 0; k < perStrand; k++) {
      push(k / (perStrand - 1), strand, 0.9 + Math.random() * 0.6, 0);
    }
  }
  for (let r = 0; r < rungs; r++) {
    for (let k = 1; k <= rungPoints; k++) {
      push((r + 0.5) / rungs, k / (rungPoints + 1), 0.5 + Math.random() * 0.3, 0);
    }
  }
  for (let k = 0; k < pulses; k++) push(Math.random(), k % 2, 2.4, 1);

  return { position, seed, size };
}

export default function Helix({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const state = useRef({ time: 0, scroll: 0, ndc: new THREE.Vector2() });

  const data = useMemo(
    () => (isMobile ? buildHelix(160, 30, 6, 14) : buildHelix(280, 44, 8, 28)),
    [isMobile],
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: isMobile ? 0.55 : 1 },
      uColorA: { value: new THREE.Color("#ffffff") },
      uColorB: { value: new THREE.Color("#BFDBFE") },
    }),
    [isMobile],
  );

  useEffect(() => {
    const st = state.current;
    const trigger = ScrollTrigger.create({
      trigger: "#dna-hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: self => (st.scroll = self.progress),
    });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      st.ndc.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      trigger.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((root, delta) => {
    const st = state.current;
    st.time += delta;
    const group = groupRef.current;
    if (group) {
      group.position.x = isMobile ? 0 : viewport.width * 0.24;
      group.rotation.z += (0.32 + st.ndc.x * 0.08 - group.rotation.z) * 0.05;
      group.rotation.x += (-st.ndc.y * 0.12 - group.rotation.x) * 0.05;
    }
    uniforms.uTime.value = st.time;
    uniforms.uScroll.value = st.scroll;
    uniforms.uPixelRatio.value = root.gl.getPixelRatio();
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.position, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[data.seed, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[data.size, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={VERT}
          fragmentShader={FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
