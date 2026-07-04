// Hélice dupla procedural (duas fitas senoidais + degraus), pensada pra ficar
// desfocada atrás do manifesto. Decorativa: o wrapper deve ter aria-hidden.
const W = 420;
const H = 1040;
const N = 64;
const TURNS = 2.6;
const AMP = 150;
const CX = W / 2;

type Sample = { y: number; x1: number; x2: number; depth: number };

const SAMPLES: Sample[] = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);
  const phase = t * TURNS * Math.PI * 2;
  return {
    y: t * H,
    x1: CX + Math.sin(phase) * AMP,
    x2: CX + Math.sin(phase + Math.PI) * AMP,
    depth: Math.abs(Math.cos(phase)),
  };
});

const RUNGS = SAMPLES.filter((_, i) => i % 3 === 1);

function strand(pick: (s: Sample) => number) {
  return SAMPLES.map(
    (s, i) => `${i === 0 ? "M" : "L"}${pick(s).toFixed(1)},${s.y.toFixed(1)}`,
  ).join(" ");
}

export default function DnaHelix({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" className={className}>
      <path
        d={strand(s => s.x1)}
        stroke="#BFDBFE"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={strand(s => s.x2)}
        stroke="#BFDBFE"
        strokeOpacity="0.3"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {RUNGS.map((s, i) => (
        <line
          key={i}
          x1={s.x1.toFixed(1)}
          y1={s.y.toFixed(1)}
          x2={s.x2.toFixed(1)}
          y2={s.y.toFixed(1)}
          stroke="#BFDBFE"
          strokeOpacity={(0.08 + s.depth * 0.2).toFixed(2)}
          strokeWidth="2"
        />
      ))}
      {RUNGS.map((s, i) => (
        <g key={`n${i}`}>
          <circle
            cx={s.x1.toFixed(1)}
            cy={s.y.toFixed(1)}
            r="4"
            fill="#ffffff"
            fillOpacity={(0.25 + s.depth * 0.35).toFixed(2)}
          />
          <circle
            cx={s.x2.toFixed(1)}
            cy={s.y.toFixed(1)}
            r="4"
            fill="#ffffff"
            fillOpacity={(0.15 + (1 - s.depth) * 0.25).toFixed(2)}
          />
        </g>
      ))}
    </svg>
  );
}
