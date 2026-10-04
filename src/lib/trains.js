import { UP_TRAINS, DOWN_TRAINS } from "@/data/railway";
export const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
export const ALL_TRAINS = [...UP_TRAINS.map((t) => ({ ...t, dir: "Up" })), ...DOWN_TRAINS.map((t) => ({ ...t, dir: "Down" }))].sort((a, b) => toMin(a.arr) - toMin(b.arr));
/** Next `n` scheduled stops from `now` (wraps past midnight). Scheduled only, not live. */
export function nextTrains(n = 3, now = new Date()) {
  const cur = now.getHours() * 60 + now.getMinutes();
  const after = ALL_TRAINS.filter((t) => toMin(t.arr) >= cur);
  const before = ALL_TRAINS.filter((t) => toMin(t.arr) < cur);
  return [...after, ...before].slice(0, n).map((t) => ({ ...t, tomorrow: toMin(t.arr) < cur }));
}
export const to12 = (t) => { const [h, m] = t.split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
