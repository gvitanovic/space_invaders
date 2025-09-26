import { userInput as input } from "./input";
import { initializeUserControls } from "./controls";
import { GameState, setGameState, gameVars } from "./utils";
import {
  playerControlSystem,
  invaderSystem,
  bulletSystem,
  collisionSystem,
  invaderShootingSystem,
  invaderEdgeCheckSystem,
  renderSystem,
} from "./systems";

initializeUserControls();

setGameState(GameState.Init);

let lastTime = performance.now();
function loop(now: number) {
  const dt = Math.min(0.07, (now - lastTime) / 1000);
  lastTime = now;
  if (!gameVars.gameOver && !input.pause) {
    playerControlSystem(dt);
    invaderSystem(dt);
    invaderEdgeCheckSystem();
    bulletSystem(dt);
    invaderShootingSystem(dt);
    collisionSystem();
  }
  renderSystem();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
