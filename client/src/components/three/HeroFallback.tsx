// PRNG determinístico (mulberry32) — mesmo campo de pontos em todo render.
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

const rnd = mulberry32(20260703);
const DOTS = Array.from({ length: 40 }, () => ({
  left: 8 + rnd() * 84,
  top: 10 + rnd() * 80,
  opacity: 0.12 + rnd() * 0.35,
  size: 2 + Math.round(rnd() * 2),
}));

/**
 * Fundo estático do hero — usado como fallback do 3D (reduced-motion,
 * low-end, ?static=1) e como fallback do Suspense enquanto o chunk carrega.
 */
export default function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ice"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
        />
      ))}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        className="animate-breathe absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 stroke-ice opacity-50 md:w-72"
      >
        <circle cx="60" cy="62" r="37" />
        <line x1="18" y1="100" x2="102" y2="24" />
      </svg>
    </div>
  );
}
