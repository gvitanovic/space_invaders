import { CANVAS_H, CANVAS_W } from "./consts.js";

export function createCanvas(w = CANVAS_W, h = CANVAS_H) {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  document.body.appendChild(canvas);
  return canvas;
}
