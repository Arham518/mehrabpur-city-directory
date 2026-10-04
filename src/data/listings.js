import raw from "./listings.json";
import { getGroup } from "./categories";

export const LAST_UPDATED = "2026-10-04";

export const CONFIDENCE = {
  cross: { label: "Cross-checked", hint: "Found in two or more independent directories", tone: "ok" },
  single: { label: "Directory listing", hint: "Found in one public directory", tone: "info" },
  name: { label: "Needs verification", hint: "Name only, or the source could not be checked", tone: "warn" },
};

export const LISTINGS = raw.map((l) => ({
  ...l,
  phone: l.phones[0] || null,
  categoryLabel: getGroup(l.category).label,
  verified: l.confidence !== "name",
  hasCoords: l.lat != null && l.lon != null,
}));

export const byGroup = (gid) => LISTINGS.filter((l) => l.category === gid);
export const countByGroup = (gid) => byGroup(gid).length;
export const bySlug = (id) => LISTINGS.find((l) => l.id === id);
export const AREAS_IN_DATA = [...new Set(LISTINGS.map((l) => l.area))].sort();

export const STATS = {
  total: LISTINGS.length,
  withPhone: LISTINGS.filter((l) => l.phone).length,
  withCoords: LISTINGS.filter((l) => l.hasCoords).length,
  cross: LISTINGS.filter((l) => l.confidence === "cross").length,
  needsCheck: LISTINGS.filter((l) => l.confidence === "name").length,
};

export const matchListing = (l, q) => {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  const hay = `${l.hours || ""} ${l.name} ${l.urdu || ""} ${l.sub} ${l.area} ${l.address || ""} ${l.categoryLabel} ${l.phones.join(" ")}`.toLowerCase();
  return t.split(/\s+/).every((w) => hay.includes(w));
};

// Featured: has a sourced phone, coordinates, and (preferably) a Maps rating.
export const FEATURED = [...LISTINGS]
  .filter((l) => l.phone && l.hasCoords && l.confidence !== "name")
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.confidence === "cross") - (a.confidence === "cross"))
  .filter((l, i, arr) => arr.findIndex((x) => x.category === l.category) === i)
  .slice(0, 8);
