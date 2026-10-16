import { describe, expect, it } from "vitest";
import { BALL_R, H, newGame, PADDLE_W, PADDLE_X, step, W } from "./pong-engine";

describe("pong", () => {
  it("rebate na parede de cima", () => {
    const g = newGame();
    Object.assign(g.ball, { x: W / 2, y: BALL_R + 1, vx: 100, vy: -300 });
    step(g, 1 / 60, g.player);
    expect(g.ball.vy).toBeGreaterThan(0);
  });

  it("raquete do jogador devolve a bola, mais rápida", () => {
    const g = newGame();
    const face = PADDLE_X + PADDLE_W;
    Object.assign(g.ball, { x: face + BALL_R + 2, y: g.player, vx: -600, vy: 0 });
    const before = Math.hypot(g.ball.vx, g.ball.vy);
    step(g, 1 / 30, g.player); // 20px num passo: cruza a face
    expect(g.ball.vx).toBeGreaterThan(0);
    expect(Math.hypot(g.ball.vx, g.ball.vy)).toBeGreaterThan(before);
  });

  it("bola que passa pela raquete é ponto da Nora", () => {
    const g = newGame();
    g.player = H - 50;
    Object.assign(g.ball, { x: 60, y: 40, vx: -400, vy: 0 });
    let scorer = null;
    for (let i = 0; i < 60 && !scorer; i++) scorer = step(g, 1 / 60, H);
    expect(scorer).toBe("nora");
    expect(g.score.nora).toBe(1);
  });
});
