// Física do Pong do /dna em um campo lógico fixo; o canvas só escala.
export const W = 800;
export const H = 450;
export const PADDLE_W = 12;
export const PADDLE_H = 84;
export const PADDLE_X = 24; // distância da raquete até a borda
export const BALL_R = 15;
export const WIN = 5;

const START_SPEED = 340;
const MAX_SPEED = 900;
const NORA_SPEED = 270; // abaixo da bola rápida: dá pra ganhar batendo com a ponta
const MAX_ANGLE = Math.PI / 3.2;

export type Side = "player" | "nora";

export type Game = {
  ball: { x: number; y: number; vx: number; vy: number; spin: number };
  player: number; // centro Y da raquete da esquerda
  nora: number; // centro Y da raquete da direita
  score: Record<Side, number>;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const clampPaddle = (y: number) => clamp(y, PADDLE_H / 2, H - PADDLE_H / 2);

export function newGame(): Game {
  const game: Game = {
    ball: { x: W / 2, y: H / 2, vx: 0, vy: 0, spin: 0 },
    player: H / 2,
    nora: H / 2,
    score: { player: 0, nora: 0 },
  };
  serve(game, -1);
  return game;
}

/** Bola no centro, saindo para `dir` (-1 = jogador, 1 = Nora) num ângulo aleatório. */
export function serve(game: Game, dir: 1 | -1) {
  const angle = (Math.random() - 0.5) * (Math.PI / 3);
  game.ball.x = W / 2;
  game.ball.y = H / 2;
  game.ball.vx = dir * START_SPEED * Math.cos(angle);
  game.ball.vy = START_SPEED * Math.sin(angle);
}

function bounce(game: Game, dir: 1 | -1, paddleY: number) {
  const b = game.ball;
  const offset = clamp((b.y - paddleY) / (PADDLE_H / 2), -1, 1);
  const speed = Math.min(Math.hypot(b.vx, b.vy) * 1.06, MAX_SPEED);
  const angle = offset * MAX_ANGLE;
  b.vx = dir * speed * Math.cos(angle);
  b.vy = speed * Math.sin(angle);
  b.spin += dir * 6;
}

/** Avança `dt` segundos. Retorna quem marcou ponto neste passo, se alguém marcou. */
export function step(game: Game, dt: number, playerTarget: number): Side | null {
  const b = game.ball;

  game.player = clampPaddle(game.player + (playerTarget - game.player) * Math.min(1, dt * 18));

  // Nora só reage depois do meio do campo e volta pro centro quando a bola vai embora.
  const aim = b.vx > 0 && b.x > W * 0.4 ? b.y : H / 2;
  const reach = NORA_SPEED * dt;
  game.nora = clampPaddle(game.nora + clamp(aim - game.nora, -reach, reach));

  const prevX = b.x;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  b.spin += (b.vx > 0 ? 1 : -1) * dt * 4;

  if (b.y < BALL_R) {
    b.y = BALL_R;
    b.vy = Math.abs(b.vy);
  } else if (b.y > H - BALL_R) {
    b.y = H - BALL_R;
    b.vy = -Math.abs(b.vy);
  }

  // Colisão por cruzamento da face (não perde a bola rápida entre dois frames).
  const leftFace = PADDLE_X + PADDLE_W;
  const rightFace = W - PADDLE_X - PADDLE_W;
  const reachY = PADDLE_H / 2 + BALL_R;
  if (b.vx < 0 && prevX - BALL_R >= leftFace && b.x - BALL_R < leftFace && Math.abs(b.y - game.player) <= reachY) {
    b.x = leftFace + BALL_R;
    bounce(game, 1, game.player);
  } else if (b.vx > 0 && prevX + BALL_R <= rightFace && b.x + BALL_R > rightFace && Math.abs(b.y - game.nora) <= reachY) {
    b.x = rightFace - BALL_R;
    bounce(game, -1, game.nora);
  }

  if (b.x < -BALL_R) {
    game.score.nora++;
    return "nora";
  }
  if (b.x > W + BALL_R) {
    game.score.player++;
    return "player";
  }
  return null;
}
