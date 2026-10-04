import { UP_TRAINS, DOWN_TRAINS } from "@/data/railway";

const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
export const ALL_TRAINS = [
  ...UP_TRAINS.map((t) => ({ ...t, dir: "UP" })),
  ...DOWN_TRAINS.map((t) => ({ ...t, dir: "DOWN" })),
].sort((a, b) => toMin(a.time) - toMin(b.time));

/** Next `n` scheduled trains from now (wraps around midnight). Scheduled time only — not live. */
export function nextTrains(n = 3, now = new Date()) {
  const cur = now.getHours() * 60 + now.getMinutes();
  const after = ALL_TRAINS.filter((t) => toMin(t.time) >= cur);
  const before = ALL_TRAINS.filter((t) => toMin(t.time) < cur);
  return [...after, ...before].slice(0, n);
}
export { toMin };
