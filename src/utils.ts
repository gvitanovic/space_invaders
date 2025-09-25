import { Entity } from "./types";
import {
  Position,
  Velocity,
  Sprite,
  PlayerTag,
  InvaderTag,
  BulletTag,
  Collider,
} from "./components";
import { spawnPlayer, spawnInvader } from "./spawn";

export function rectsOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

const entityIdGen = (() => {
  let nextEntity: Entity = 1;
  return {
    createEntity(): Entity {
      return nextEntity++;
    },
    resetEntityCounter() {
      nextEntity = 1;
    },
  };
})();

export const createEntity = entityIdGen.createEntity;
export const resetEntityCounter = entityIdGen.resetEntityCounter;

// state management
export interface GameVars {
  lastShot: number;
  playerEntity: number;
  invaderDirection: number;
  invaderSpeed: number;
  gameOver: boolean;
  win: boolean;
}

export const gameVars: GameVars = {
  lastShot: 0,
  playerEntity: 0,
  invaderDirection: 1,
  invaderSpeed: 20,
  gameOver: false,
  win: false,
};

export enum GameState {
  Init = "init",
  Playing = "playing",
  GameOver = "gameover",
  Win = "win",
  Shoot = "shoot",
}

export let currentState: GameState = GameState.Init;

export function setGameState(state: GameState) {
  currentState = state;
  switch (state) {
    case GameState.Init:
      resetGameState();
      break;
    case GameState.Playing:
      break;
    case GameState.GameOver:
      break;
    case GameState.Win:
      break;
  }
}

function resetGameState() {
  // clear all components
  Position.clear();
  Velocity.clear();
  Sprite.clear();
  Collider.clear();
  PlayerTag.clear();
  InvaderTag.clear();
  BulletTag.clear();
  resetEntityCounter();

  resetGameVars();

  // spawn player and invaders
  gameVars.playerEntity = spawnPlayer();
  const cols = 8;
  const rows = 4;
  const startX = 40;
  const startY = 40;
  const gapX = 44;
  const gapY = 34;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      spawnInvader(startX + c * gapX, startY + r * gapY);

  (window as any).spawnInvader = spawnInvader;
}

function resetGameVars() {
  gameVars.lastShot = 0;
  gameVars.gameOver = false;
  gameVars.win = false;
  gameVars.invaderDirection = 1;
  gameVars.invaderSpeed = 20;
}
