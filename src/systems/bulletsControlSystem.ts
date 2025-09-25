import { BulletTag, Position, Velocity, Sprite, Collider } from "../components";
import { CANVAS_H } from "../consts";

export function bulletSystem(dt: number) {
  for (const e of Array.from(BulletTag)) {
    const p = Position.get(e)!;
    const v = Velocity.get(e)!;
    p.y += v.y * dt;
    // remove bullets off-screen
    if (p.y < -20 || p.y > CANVAS_H + 20) {
      // remove
      Position.delete(e);
      Velocity.delete(e);
      Sprite.delete(e);
      Collider.delete(e);
      BulletTag.delete(e);
    }
  }
}
