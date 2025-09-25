import { gameVars } from "../utils";
import { InvaderTag, Position, Sprite } from "../components";
import { CANVAS_W } from "../consts";

export function invaderSystem(dt: number) {
  const invaders = Array.from(InvaderTag);
  if (invaders.length === 0) {
    gameVars.win = true;
    gameVars.gameOver = true;
    return;
  }
  // compute bounds
  let minX = Number.POSITIVE_INFINITY,
    maxX = Number.NEGATIVE_INFINITY;
  for (const e of invaders) {
    const p = Position.get(e)!;
    const s = Sprite.get(e)!;
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x + s.w);
  }
  // change direction if hit edges
  const margin = 8;
  if (maxX >= CANVAS_W - margin) gameVars.invaderDirection = -1;
  if (minX <= margin) gameVars.invaderDirection = 1;
  // move
  for (const e of invaders) {
    const p = Position.get(e)!;
    p.x += gameVars.invaderDirection * gameVars.invaderSpeed * dt;
  }
  // occasionally step down
  // simple: if direction flipped recently, move down a bit and increase speed
  // we'll detect flips by checking if any invader is near edge and direction would change next frame
  // Instead, every few seconds step down
}
