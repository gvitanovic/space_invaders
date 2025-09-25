import { Entity } from "./types";

export const Position = new Map<
  Entity,
  { x: number; y: number; shooterId?: number }
>();
export const Velocity = new Map<Entity, { x: number; y: number }>();
export const Sprite = new Map<
  Entity,
  { w: number; h: number; color: string }
>();
export const PlayerTag = new Set<Entity>();
export const InvaderTag = new Set<Entity>();
export const BulletTag = new Set<Entity>();
export const Collider = new Map<Entity, { w: number; h: number }>();
export const BoomEffects: Array<{
  x: number;
  y: number;
  radius: number;
  start: number;
  fillStyle: string;
}> = [];
