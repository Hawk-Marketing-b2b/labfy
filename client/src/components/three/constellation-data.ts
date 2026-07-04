// Funções puras que geram a geometria da constelação do hero.
// O alvo é o símbolo Ø do nora-symbol.svg (viewBox 120): círculo cx60 cy62 r37
// + diagonal (18,100)→(102,24), normalizado pra [-1,1] (y invertido) e
// escalado pro mundo da cena.

export const WORLD_SCALE = 1.7;

const CIRCLE = { cx: 0, cy: -1 / 30, r: 37 / 60 };
const LINE = { x1: -0.7, y1: -2 / 3, x2: 0.7, y2: 0.6 };

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nuvem espalhada: casca esférica achatada em z (estado de repouso). */
export function buildScattered(n: number, seed = 11): Float32Array {
  const rnd = mulberry32(seed);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 1.2 + rnd() * 1.0;
    const theta = rnd() * Math.PI * 2;
    const phi = Math.acos(2 * rnd() - 1);
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.15;
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85;
    out[i * 3 + 2] = r * Math.cos(phi) * 0.5;
  }
  return out;
}

/** Pontos-alvo sobre o Ø: 70% no círculo, 30% na diagonal, com jitter. */
export function buildTargets(n: number, seed = 23): Float32Array {
  const rnd = mulberry32(seed);
  const out = new Float32Array(n * 3);
  const nCircle = Math.floor(n * 0.7);

  const dx = LINE.x2 - LINE.x1;
  const dy = LINE.y2 - LINE.y1;
  const len = Math.hypot(dx, dy);
  const px = -dy / len;
  const py = dx / len;

  for (let i = 0; i < n; i++) {
    let x: number;
    let y: number;
    if (i < nCircle) {
      const a = (i / nCircle) * Math.PI * 2 + (rnd() - 0.5) * 0.08;
      const rr = CIRCLE.r + (rnd() - 0.5) * 0.06;
      x = CIRCLE.cx + Math.cos(a) * rr;
      y = CIRCLE.cy + Math.sin(a) * rr;
    } else {
      const t = (i - nCircle) / Math.max(1, n - nCircle - 1);
      const jitter = (rnd() - 0.5) * 0.05;
      x = LINE.x1 + dx * t + px * jitter;
      y = LINE.y1 + dy * t + py * jitter;
    }
    out[i * 3] = x * WORLD_SCALE;
    out[i * 3 + 1] = y * WORLD_SCALE;
    out[i * 3 + 2] = (rnd() - 0.5) * 0.12;
  }
  return out;
}

/** Seeds/tamanhos por ponto. */
export function buildScalars(n: number, seed = 37): { seeds: Float32Array; sizes: Float32Array } {
  const rnd = mulberry32(seed);
  const seeds = new Float32Array(n);
  const sizes = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    seeds[i] = rnd();
    sizes[i] = 0.5 + rnd() * 0.7;
  }
  return { seeds, sizes };
}

/**
 * kNN (k vizinhos) sobre os ALVOS — as linhas "desenham" o Ø quando a forma
 * monta. Retorna pares de índices, dedupados, com corte por distância e cap.
 */
export function buildEdges(
  targets: Float32Array,
  k = 2,
  dMax = 0.28 * WORLD_SCALE,
  cap = 1600,
): Uint32Array {
  const n = targets.length / 3;
  const dMax2 = dMax * dMax;
  const pairs = new Set<number>();

  for (let i = 0; i < n; i++) {
    const xi = targets[i * 3];
    const yi = targets[i * 3 + 1];
    const zi = targets[i * 3 + 2];
    // k melhores vizinhos (busca linear — roda uma vez, no chunk lazy)
    const bestIdx = new Array<number>(k).fill(-1);
    const bestD = new Array<number>(k).fill(Infinity);
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const dx = targets[j * 3] - xi;
      const dy = targets[j * 3 + 1] - yi;
      const dz = targets[j * 3 + 2] - zi;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > dMax2) continue;
      for (let b = 0; b < k; b++) {
        if (d2 < bestD[b]) {
          for (let s = k - 1; s > b; s--) {
            bestD[s] = bestD[s - 1];
            bestIdx[s] = bestIdx[s - 1];
          }
          bestD[b] = d2;
          bestIdx[b] = j;
          break;
        }
      }
    }
    for (let b = 0; b < k; b++) {
      const j = bestIdx[b];
      if (j < 0) continue;
      const key = i < j ? i * n + j : j * n + i;
      pairs.add(key);
    }
  }

  const list = Array.from(pairs).slice(0, cap);
  const out = new Uint32Array(list.length * 2);
  const nBig = n;
  list.forEach((key, idx) => {
    out[idx * 2] = Math.floor(key / nBig);
    out[idx * 2 + 1] = key % nBig;
  });
  return out;
}

export type PulseAttrs = {
  start: Float32Array; // vec3 por pulso (posição-alvo do endpoint A)
  end: Float32Array; // vec3 por pulso (posição-alvo do endpoint B)
  t0: Float32Array;
  speed: Float32Array;
};

/** Sorteia m arestas e gera os atributos dos pulsos de luz. */
export function buildPulses(
  edges: Uint32Array,
  targets: Float32Array,
  m = 24,
  seed = 53,
): PulseAttrs {
  const rnd = mulberry32(seed);
  const nEdges = edges.length / 2;
  const count = Math.min(m, nEdges);
  const start = new Float32Array(count * 3);
  const end = new Float32Array(count * 3);
  const t0 = new Float32Array(count);
  const speed = new Float32Array(count);

  for (let p = 0; p < count; p++) {
    const e = Math.floor(rnd() * nEdges);
    const a = edges[e * 2];
    const b = edges[e * 2 + 1];
    for (let c = 0; c < 3; c++) {
      start[p * 3 + c] = targets[a * 3 + c];
      end[p * 3 + c] = targets[b * 3 + c];
    }
    t0[p] = rnd();
    speed[p] = 0.25 + rnd() * 0.35;
  }
  return { start, end, t0, speed };
}
