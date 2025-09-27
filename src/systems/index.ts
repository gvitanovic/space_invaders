import { spawnPlayer } from "../spawn";

export let playerEntity = spawnPlayer();

export { playerControlSystem } from "./playerControlSystem";
export { invaderSystem } from "./invadersControlSystem";
export { bulletSystem } from "./bulletsControlSystem";
export { collisionSystem } from "./collisionControlSystem";
export { invaderShootingSystem } from "./shootingControlSystem";
export { invaderEdgeCheckSystem } from "./edgeDetectionControlSystem";
export { renderSystem } from "./renderingControlSystem";
