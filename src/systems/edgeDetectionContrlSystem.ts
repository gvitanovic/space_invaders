import { gameVars } from "../utils";
import { InvaderTag, Position } from "../components";

// Simple invader descent when hitting edge — implement by stepping down whenever direction flips
let prevDirection = gameVars.invaderDirection;
export function invaderEdgeCheckSystem() {
  if (prevDirection !== gameVars.invaderDirection) {
    // step down all invaders and increase speed
    for (const i of InvaderTag) {
      const p = Position.get(i)!;
      p.y += 18;
    }
    gameVars.invaderSpeed *= 1.12;
    prevDirection = gameVars.invaderDirection;
  }
}
