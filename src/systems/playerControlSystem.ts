import { playerEntity } from "./index";
import { Position } from "../components";
import { userInput as input } from "../input";
import { CANVAS_W } from "../consts";
import { Sprite } from "../components";
import { gameVars } from "../utils";
import { spawnBullet } from "../spawn";

// Player control system
export function playerControlSystem(dt: number) {
  const pos = Position.get(playerEntity)!;
  const speed = 220; // px/s
  let vx = 0;
  if (input.left) vx -= speed;
  if (input.right) vx += speed;
  pos.x += vx * dt;
  pos.x = Math.max(0, Math.min(CANVAS_W - Sprite.get(playerEntity)!.w, pos.x));

  // shooting
  gameVars.lastShot -= dt;
  if (input.shoot && gameVars.lastShot <= 0) {
    const p = Position.get(playerEntity)!;
    spawnBullet(p.x + 14, p.y - 8, -380, true);
    gameVars.lastShot = 0.35; // seconds between shots
  }
}
