import { useEffect, useRef, useState } from "react";
import {
  BALL_R,
  type Game,
  H,
  newGame,
  PADDLE_H,
  PADDLE_W,
  PADDLE_X,
  serve,
  type Side,
  step,
  W,
  WIN,
} from "./pong-engine";

type Phase = "idle" | "playing" | "over";

const ICE = "rgba(191,219,254,0.7)";
const KEY_SPEED = 520; // px/s no campo lógico

/** Pong com o Ø como bola: mouse/dedo/setas controlam a raquete da esquerda. */
export default function Pong() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(newGame());
  const target = useRef(H / 2);
  const keys = useRef({ up: false, down: false });
  const trail = useRef<{ x: number; y: number }[]>([]);
  const frozenUntil = useRef(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [winner, setWinner] = useState<Side | null>(null);
  const [visible, setVisible] = useState(false);

  // Desenho: um frame do estado atual (também usado parado, no idle/over).
  const draw = useRef(() => {});
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const symbol = new Image();
    symbol.src = "/logos/nora-symbol.svg";

    draw.current = () => {
      const g = game.current;
      const scale = canvas.width / W;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // linha central
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 14]);
      ctx.beginPath();
      ctx.moveTo(W / 2, 16);
      ctx.lineTo(W / 2, H - 16);
      ctx.stroke();
      ctx.setLineDash([]);

      // placar
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.font = "800 72px 'Inter Tight', Inter, sans-serif";
      ctx.fillText(String(g.score.player), W / 2 - 80, 92);
      ctx.fillText(String(g.score.nora), W / 2 + 80, 92);
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillText("VOCÊ", W / 2 - 80, 116);
      ctx.fillText("NORA", W / 2 + 80, 116);

      // raquetes
      ctx.shadowColor = ICE;
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.roundRect(PADDLE_X, g.player - PADDLE_H / 2, PADDLE_W, PADDLE_H, 6);
      ctx.roundRect(W - PADDLE_X - PADDLE_W, g.nora - PADDLE_H / 2, PADDLE_W, PADDLE_H, 6);
      ctx.fill();

      // rastro + bola Ø
      trail.current.forEach((p, i) => {
        ctx.globalAlpha = ((i + 1) / trail.current.length) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, BALL_R * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#BFDBFE";
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.save();
      ctx.translate(g.ball.x, g.ball.y);
      ctx.rotate(g.ball.spin);
      if (symbol.complete) ctx.drawImage(symbol, -BALL_R * 1.25, -BALL_R * 1.25, BALL_R * 2.5, BALL_R * 2.5);
      ctx.restore();
      ctx.shadowBlur = 0;
    };

    symbol.onload = () => draw.current();

    // canvas acompanha o tamanho do wrapper, em device pixels
    const ro = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(entry.contentRect.width * dpr);
      canvas.height = Math.round(entry.contentRect.width * dpr * (H / W));
      draw.current();
    });
    ro.observe(wrapRef.current!);

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(wrapRef.current!);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Loop: só roda jogando e com o jogo na tela.
  useEffect(() => {
    if (phase !== "playing" || !visible) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const k = keys.current;
      if (k.up || k.down) {
        target.current = Math.min(H, Math.max(0, target.current + (k.down ? 1 : -1) * KEY_SPEED * dt));
      }

      const g = game.current;
      if (now >= frozenUntil.current) {
        const scorer = step(g, dt, target.current);
        trail.current.push({ x: g.ball.x, y: g.ball.y });
        if (trail.current.length > 10) trail.current.shift();
        if (scorer) {
          trail.current = [];
          if (g.score[scorer] >= WIN) {
            setWinner(scorer);
            setPhase("over");
          } else {
            serve(g, scorer === "player" ? 1 : -1);
            frozenUntil.current = now + 700;
          }
        }
      }
      draw.current();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, visible]);

  const start = () => {
    game.current = newGame();
    trail.current = [];
    frozenUntil.current = performance.now() + 500;
    setWinner(null);
    setPhase("playing");
    canvasRef.current?.focus();
  };

  const onPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    target.current = ((e.clientY - r.top) / r.height) * H;
  };

  const onKey = (down: boolean) => (e: React.KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (k === "arrowup" || k === "w") keys.current.up = down;
    else if (k === "arrowdown" || k === "s") keys.current.down = down;
    else return;
    e.preventDefault(); // setas não rolam a página enquanto joga
  };

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#07070B] shadow-[0_0_120px_-30px_rgba(191,219,254,0.35)]"
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label="Pong: mova a raquete da esquerda com o mouse, o dedo ou as setas do teclado"
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        onKeyDown={onKey(true)}
        onKeyUp={onKey(false)}
        className="block aspect-[16/9] w-full touch-none outline-none focus-visible:ring-1 focus-visible:ring-sky-200/40"
      />

      {phase !== "playing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#07070B]/60 text-center backdrop-blur-[2px]">
          {phase === "over" && (
            <p className="font-display text-2xl font-bold md:text-4xl">
              {winner === "player" ? "Você venceu a Nora! 🎉" : "A Nora venceu dessa vez."}
            </p>
          )}
          <button
            onClick={start}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
          >
            {phase === "idle" ? "Jogar" : "Revanche"}
          </button>
          <p className="text-xs text-white/50">
            Primeiro a fazer {WIN} pontos. Mouse, dedo ou setas.
          </p>
        </div>
      )}
    </div>
  );
}
