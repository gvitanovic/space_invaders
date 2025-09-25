import { userInput } from "./input";
import { setGameState, gameVars, GameState } from "./utils";

export function initializeUserControls() {
  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") userInput.left = true;
    if (e.code === "ArrowRight") userInput.right = true;
    if (e.code === "Space") userInput.shoot = true;
    if (e.code === "KeyP") userInput.pause = !userInput.pause;
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") userInput.left = false;
    if (e.code === "ArrowRight") userInput.right = false;
    if (e.code === "Space") userInput.shoot = false;
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && gameVars.gameOver) setGameState(GameState.Init);
  });
}
