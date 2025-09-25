import { createEntity } from "./utils";
import { CANVAS_W, CANVAS_H } from "./consts";
import {
  Position,
  Velocity,
  Sprite,
  PlayerTag,
  InvaderTag,
  BulletTag,
  Collider,
} from "./components";

export function spawnPlayer() {
  const e = createEntity();
  Position.set(e, { x: CANVAS_W / 2 - 16, y: CANVAS_H - 64 });
  Velocity.set(e, { x: 0, y: 0 });
  Sprite.set(e, { w: 32, h: 16, color: "rgba(221, 188, 127, 1)" });
  Collider.set(e, { w: 32, h: 16 });
  PlayerTag.add(e);
  return e;
}

export function spawnInvader(x: number, y: number) {
  const e = createEntity();
  Position.set(e, { x, y });
  Velocity.set(e, { x: 0, y: 0 });
  Sprite.set(e, { w: 28, h: 16, color: "rgba(86, 151, 43, 1)" });
  Collider.set(e, { w: 28, h: 16 });
  InvaderTag.add(e);
  return e;
}

export function spawnBullet(
  x: number,
  y: number,
  vy: number,
  fromPlayer = true,
  shooterId?: number
) {
  const e = createEntity();
  Position.set(e, { x, y, shooterId }); // add shooterId for enemy bullets
  Velocity.set(e, { x: 0, y: vy });
  Sprite.set(e, { w: 4, h: 12, color: fromPlayer ? "#fff" : "#f44" });
  BulletTag.add(e);
  Collider.set(e, { w: 4, h: 12 });
  return e;
}
