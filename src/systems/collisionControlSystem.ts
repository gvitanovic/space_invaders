import {
  BulletTag,
  InvaderTag,
  Position,
  Sprite,
  Velocity,
  Collider,
  BoomEffects,
} from "../components";
import { rectsOverlap } from "../utils";
import { gameVars } from "../utils";
import { playerEntity } from "./index";

export function collisionSystem() {
  // player bullets hit invaders
  for (const b of Array.from(BulletTag)) {
    const bpos = Position.get(b)!;
    const bs = Sprite.get(b)!;
    const isPlayerBullet = bs.color === "#fff";
    if (isPlayerBullet) {
      for (const inv of Array.from(InvaderTag)) {
        const ipos = Position.get(inv)!;
        const ispr = Sprite.get(inv)!;
        if (
          rectsOverlap(
            { x: bpos.x, y: bpos.y, w: bs.w, h: bs.h },
            { x: ipos.x, y: ipos.y, w: ispr.w, h: ispr.h }
          )
        ) {
          // kill invader & bullet
          Position.delete(inv);
          Velocity.delete(inv);
          Sprite.delete(inv);
          Collider.delete(inv);
          InvaderTag.delete(inv);
          Position.delete(b);
          Velocity.delete(b);
          Sprite.delete(b);
          Collider.delete(b);
          BulletTag.delete(b);
          // speed up invaders slightly
          gameVars.invaderSpeed *= 1.02;
          BoomEffects.push({
            x: ipos.x + ispr.w / 2,
            y: ipos.y + ispr.h / 2,
            start: performance.now(),
            radius: 7,
            fillStyle: "rgba(255, 200, 50, 0.8)",
          });
          break;
        }
      }
    } else {
      // enemy bullet hits player
      const ppos = Position.get(playerEntity)!;
      const ps = Sprite.get(playerEntity)!;
      if (
        rectsOverlap(
          { x: bpos.x, y: bpos.y, w: bs.w, h: bs.h },
          { x: ppos.x, y: ppos.y, w: ps.w, h: ps.h }
        )
      ) {
        gameVars.gameOver = true; // player died
      }
    }
  }

  // invaders reach player line -> lose
  for (const inv of InvaderTag) {
    const ipos = Position.get(inv)!;
    const ispr = Sprite.get(inv)!;
    if (ipos.y + ispr.h >= Position.get(playerEntity)!.y) {
      gameVars.gameOver = true;
    }
  }
}
