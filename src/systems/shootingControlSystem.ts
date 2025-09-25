import { createEntity } from "../utils";
import {
  Position,
  Velocity,
  Sprite,
  Collider,
  BulletTag,
  InvaderTag,
  BoomEffects,
} from "../components";
import { playerEntity } from "./index";

// Invader shooting system
let invaderShotTimer = 1.5;
export function invaderShootingSystem(dt: number) {
  invaderShotTimer -= dt;
  if (invaderShotTimer <= 0) {
    invaderShotTimer = 1.0 + Math.random() * 1.8;
    const invaders = Array.from(InvaderTag);
    if (invaders.length === 0) return;
    const shooter = invaders[Math.floor(Math.random() * invaders.length)];
    const p = Position.get(shooter)!;
    const s = Sprite.get(shooter)!;
    const shooterX = p.x + s.w / 2;
    const shooterY = p.y + s.h;

    // aim toward player position
    const playerPos = Position.get(playerEntity)!;
    const playerCenterX = playerPos.x + Sprite.get(playerEntity)!.w / 2;
    const playerCenterY = playerPos.y;
    const dx = playerCenterX - shooterX;
    const dy = playerCenterY - shooterY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const vx = (dx / length) * 240;
    const vy = (dy / length) * 240;

    const e = createEntity();
    Position.set(e, { x: shooterX, y: shooterY });
    Velocity.set(e, { x: vx, y: vy });
    Sprite.set(e, { w: 4, h: 8, color: "#f55" });
    Collider.set(e, { w: 4, h: 8 });
    BulletTag.add(e);

    BoomEffects.push({
      x: p.x + s.w / 2,
      y: p.y + s.h,
      start: performance.now(),
      radius: 7,
      fillStyle: "rgba(255, 100, 100, 0.8)",
    });
  }
}
