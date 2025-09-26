import { createCanvas } from "../canvas";
import { Sprite, Position, InvaderTag, BoomEffects } from "../components";
import { gameVars } from "../utils";
import { CANVAS_W, CANVAS_H } from "../consts";
import { userInput } from "../input";

// Animation state for invaders
let invaderAnimFrame = 0;
let lastAnimTime = 0;
const INVADER_ANIM_INTERVAL = 0.3; // seconds
const BOOM_ANIM_DURATION = 0.2; // seconds

const ctx = createCanvas().getContext("2d")!;

export function renderSystem() {
  // Animate invaders only if not paused or game over
  if (!gameVars.gameOver && !userInput.pause) {
    const now = performance.now() / 1000;
    if (now - lastAnimTime > INVADER_ANIM_INTERVAL) {
      invaderAnimFrame = (invaderAnimFrame + 1) % 2;
      lastAnimTime = now;
    }
  }

  // clear
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // draw entities with Sprite & Position
  for (const [e, s] of Sprite.entries()) {
    const p = Position.get(e)!;
    ctx.save();
    ctx.translate(Math.round(p.x), Math.round(p.y));

    if (InvaderTag.has(e)) {
      // Invader animation: tentacles, legs, shooting
      ctx.fillStyle = s.color;
      ctx.fillRect(0, invaderAnimFrame === 0 ? 0 : 2, s.w, s.h - 6);

      ctx.fillStyle = "#e90d0dff";
      ctx.fillRect(6, 4 + (invaderAnimFrame === 0 ? 0 : 2), 4, 4);
      ctx.fillRect(s.w - 10, 4 + (invaderAnimFrame === 0 ? 0 : 2), 4, 4);

      ctx.fillStyle = s.color;
      for (let i = 0; i < 4; i++) {
        const tentacleX = i * 8 - 4;
        const tentacleY =
          s.h - 16 + (invaderAnimFrame === 0 ? 0 : i % 2 === 0 ? 4 : -2);
        ctx.fillRect(tentacleX, tentacleY, 4, 6);
      }

      if (invaderAnimFrame === 1) {
        ctx.fillRect(2, s.h - 2, 8, 2);
        ctx.fillRect(s.w - 10, s.h - 2, 8, 2);
      } else {
        ctx.fillRect(4, s.h - 4, 6, 2);
        ctx.fillRect(s.w - 10, s.h - 4, 6, 2);
      }
    } else {
      ctx.fillStyle = s.color;
      ctx.fillRect(0, 0, s.w, s.h);
    }
    ctx.restore();
  }

  // Boom effects rendering (handles both firing and hit animations)
  for (let i = BoomEffects.length - 1; i >= 0; i--) {
    const boom = BoomEffects[i];
    if (performance.now() - boom.start < BOOM_ANIM_DURATION * 1000) {
      ctx.globalAlpha = 0.8;
      //   ctx.fillStyle = "#ff0";
      ctx.fillStyle = BoomEffects[i].fillStyle;
      ctx.beginPath();
      ctx.arc(boom.x, boom.y, boom.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    } else {
      BoomEffects.splice(i, 1);
    }
  }

  // HUD and overlays...
  ctx.fillStyle = "#fff";
  ctx.font = "16px monospace";
  ctx.fillText("Invaders: " + InvaderTag.size, 8, CANVAS_H - 8);
  if (gameVars.gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, CANVAS_H / 2 - 40, CANVAS_W, 80);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "28px monospace";
    ctx.fillText(
      gameVars.win ? "YOU WIN" : "GAME OVER",
      CANVAS_W / 2,
      CANVAS_H / 2
    );
    ctx.font = "16px monospace";
    ctx.fillText("Press Enter to restart", CANVAS_W / 2, CANVAS_H / 2 + 30);
    ctx.textAlign = "left";
  }
  if (!gameVars.gameOver && userInput.pause) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, CANVAS_H / 2 - 40, CANVAS_W, 80);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "28px monospace";
    ctx.fillText("PAUSED", CANVAS_W / 2, CANVAS_H / 2);
    ctx.font = "16px monospace";
    ctx.fillText("Press P to resume", CANVAS_W / 2, CANVAS_H / 2 + 30);
    ctx.textAlign = "left";
  }
}
