import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  buildEdges,
  buildPulses,
  buildScalars,
  buildScattered,
  buildTargets,
} from "./constellation-data";

const POINTS_VERT = /* glsl */ `
  attribute vec3 aTarget;
  attribute float aSeed;
  attribute float aSize;
  uniform float uTime;
  uniform float uMorph;
  uniform float uScroll;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  varying float vSeed;

  void main() {
    float m = smoothstep(aSeed * 0.3, aSeed * 0.3 + 0.7, uMorph);
    vec3 pos = mix(position, aTarget, m);

    // drift orgânico — formado ainda "respira" 20%
    float amp = 0.06 * (1.0 - m * 0.8);
    pos.x += sin(uTime * 0.60 + aSeed * 6.2831 + pos.y * 2.0) * amp;
    pos.y += cos(uTime * 0.50 + aSeed * 12.566 + pos.x * 2.3) * amp;
    pos.z += sin(uTime * 0.40 + aSeed * 3.1415 + pos.x * 1.7) * amp * 0.6;

    // repulsão do mouse (espaço de mundo, plano z=0)
    vec2 d = pos.xy - uMouse;
    float f = exp(-length(d) * 2.5) * 0.35;
    pos.xy += normalize(d + vec2(1e-5)) * f;

    // colapso na saída do hero
    pos *= 1.0 - uScroll * 0.4;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (42.0 / -mv.z) * (1.0 - uScroll * 0.5);
    vSeed = aSeed;
  }
`;

const POINTS_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uScroll;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = pow(smoothstep(0.5, 0.0, d), 2.0);
    vec3 color = mix(uColorB, uColorA, smoothstep(0.25, 0.0, d));
    float tw = 0.8 + 0.2 * sin(vSeed * 40.0);
    gl_FragColor = vec4(color, alpha * uOpacity * tw * (1.0 - uScroll));
  }
`;

const LINES_VERT = /* glsl */ `
  attribute vec3 aTarget;
  attribute float aSeed;
  uniform float uTime;
  uniform float uMorph;
  uniform float uScroll;
  uniform vec2 uMouse;

  void main() {
    float m = smoothstep(aSeed * 0.3, aSeed * 0.3 + 0.7, uMorph);
    vec3 pos = mix(position, aTarget, m);
    float amp = 0.06 * (1.0 - m * 0.8);
    pos.x += sin(uTime * 0.60 + aSeed * 6.2831 + pos.y * 2.0) * amp;
    pos.y += cos(uTime * 0.50 + aSeed * 12.566 + pos.x * 2.3) * amp;
    pos.z += sin(uTime * 0.40 + aSeed * 3.1415 + pos.x * 1.7) * amp * 0.6;
    vec2 d = pos.xy - uMouse;
    float f = exp(-length(d) * 2.5) * 0.35;
    pos.xy += normalize(d + vec2(1e-5)) * f;
    pos *= 1.0 - uScroll * 0.4;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const LINES_FRAG = /* glsl */ `
  uniform vec3 uColorB;
  uniform float uMorph;
  uniform float uScroll;

  void main() {
    // linhas só existem quando o Ø forma — assinatura visual
    float alpha = uMorph * uMorph * 0.28 * (1.0 - uScroll);
    gl_FragColor = vec4(uColorB, alpha);
  }
`;

const PULSES_VERT = /* glsl */ `
  attribute vec3 aEnd;
  attribute float aT0;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  varying float vT;

  void main() {
    float t = fract(uTime * aSpeed + aT0);
    vec3 pos = mix(position, aEnd, t);
    pos *= 1.0 - uScroll * 0.4;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uPixelRatio * (110.0 / -mv.z);
    vT = t;
  }
`;

const PULSES_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform float uMorph;
  uniform float uScroll;
  varying float vT;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = pow(smoothstep(0.5, 0.0, d), 1.6);
    alpha *= sin(3.14159 * vT);
    alpha *= uMorph * uMorph * uMorph * (1.0 - uScroll);
    gl_FragColor = vec4(uColorA, alpha * 0.9);
  }
`;

const COLOR_WHITE = new THREE.Color("#ffffff");
const COLOR_ICE = new THREE.Color("#BFDBFE");

function makeUniforms() {
  return {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uScroll: { value: 0 },
    uPixelRatio: { value: 1 },
    uOpacity: { value: 1 },
    uMouse: { value: new THREE.Vector2(99, 99) },
    uColorA: { value: COLOR_WHITE },
    uColorB: { value: COLOR_ICE },
  };
}

type ConstellationProps = {
  count: number;
  withEdges: boolean;
};

export default function Constellation({ count, withEdges }: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  const state = useRef({
    time: 0,
    morph: 0,
    scroll: 0,
    ndc: new THREE.Vector2(0, 0),
    mouseTarget: new THREE.Vector2(99, 99),
    mouseCurrent: new THREE.Vector2(99, 99),
    hasPointer: false,
  });

  const data = useMemo(() => {
    const scattered = buildScattered(count);
    const targets = buildTargets(count);
    const { seeds, sizes } = buildScalars(count);

    if (!withEdges) {
      return { scattered, targets, seeds, sizes, lines: null, pulses: null };
    }

    const edges = buildEdges(targets);
    const nEdges = edges.length / 2;
    const linePos = new Float32Array(nEdges * 2 * 3);
    const lineTarget = new Float32Array(nEdges * 2 * 3);
    const lineSeed = new Float32Array(nEdges * 2);
    for (let e = 0; e < nEdges; e++) {
      for (let end = 0; end < 2; end++) {
        const idx = edges[e * 2 + end];
        const v = e * 2 + end;
        for (let c = 0; c < 3; c++) {
          linePos[v * 3 + c] = scattered[idx * 3 + c];
          lineTarget[v * 3 + c] = targets[idx * 3 + c];
        }
        lineSeed[v] = seeds[idx];
      }
    }

    const pulses = buildPulses(edges, targets, 24);
    return {
      scattered,
      targets,
      seeds,
      sizes,
      lines: { pos: linePos, target: lineTarget, seed: lineSeed },
      pulses,
    };
  }, [count, withEdges]);

  const pointsUniforms = useMemo(makeUniforms, []);
  const linesUniforms = useMemo(makeUniforms, []);
  const pulsesUniforms = useMemo(makeUniforms, []);

  // Ciclo do morph (~9s), uScroll via ScrollTrigger e mouse em coords de mundo.
  useEffect(() => {
    const st = state.current;

    const proxy = { m: 0 };
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(proxy, {
      m: 1,
      duration: 2.0,
      delay: 2.2,
      ease: "power2.inOut",
      onUpdate: () => (st.morph = proxy.m),
    }).to(proxy, {
      m: 0,
      duration: 2.0,
      delay: 2.8,
      ease: "power2.inOut",
      onUpdate: () => (st.morph = proxy.m),
    });

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: self => (st.scroll = self.progress),
    });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      st.hasPointer = true;
      st.ndc.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      tl.kill();
      trigger.kill();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((rootState, delta) => {
    const st = state.current;
    st.time += delta;

    // NDC → mundo no plano z=0 (câmera olhando a origem)
    const persp = camera as THREE.PerspectiveCamera;
    const halfH = Math.tan((persp.fov * Math.PI) / 360) * persp.position.z;
    const halfW = halfH * (size.width / size.height);
    if (st.hasPointer) {
      st.mouseTarget.set(st.ndc.x * halfW, st.ndc.y * halfH);
    }
    st.mouseCurrent.lerp(st.mouseTarget, 0.08);

    // parallax leve do grupo
    const group = groupRef.current;
    if (group) {
      group.rotation.y += (st.ndc.x * 0.06 - group.rotation.y) * 0.06;
      group.rotation.x += (-st.ndc.y * 0.04 - group.rotation.x) * 0.06;
    }

    const dpr = rootState.gl.getPixelRatio();
    for (const u of [pointsUniforms, linesUniforms, pulsesUniforms]) {
      u.uTime.value = st.time;
      u.uMorph.value = st.morph;
      u.uScroll.value = st.scroll;
      u.uPixelRatio.value = dpr;
      u.uMouse.value.copy(st.mouseCurrent);
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.scattered, 3]} />
          <bufferAttribute attach="attributes-aTarget" args={[data.targets, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={pointsUniforms}
          vertexShader={POINTS_VERT}
          fragmentShader={POINTS_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {data.lines && (
        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.lines.pos, 3]} />
            <bufferAttribute attach="attributes-aTarget" args={[data.lines.target, 3]} />
            <bufferAttribute attach="attributes-aSeed" args={[data.lines.seed, 1]} />
          </bufferGeometry>
          <shaderMaterial
            uniforms={linesUniforms}
            vertexShader={LINES_VERT}
            fragmentShader={LINES_FRAG}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {data.pulses && (
        <points frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.pulses.start, 3]} />
            <bufferAttribute attach="attributes-aEnd" args={[data.pulses.end, 3]} />
            <bufferAttribute attach="attributes-aT0" args={[data.pulses.t0, 1]} />
            <bufferAttribute attach="attributes-aSpeed" args={[data.pulses.speed, 1]} />
          </bufferGeometry>
          <shaderMaterial
            uniforms={pulsesUniforms}
            vertexShader={PULSES_VERT}
            fragmentShader={PULSES_FRAG}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}
