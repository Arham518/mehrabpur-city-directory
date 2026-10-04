// Google Maps links need no API key. With real coordinates we link to the exact point, otherwise to a text search.
const query = (l) => encodeURIComponent([l.name, l.address, "Mehrabpur, Sindh, Pakistan"].filter(Boolean).join(", "));
export const directionsUrl = (l) =>
  l.lat != null
    ? `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lon}`
    : `https://www.google.com/maps/dir/?api=1&destination=${query(l)}`;
export const searchUrl = (l) =>
  l.lat != null ? `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lon}` : `https://www.google.com/maps/search/?api=1&query=${query(l)}`;
export const MEHRABPUR_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=27.10187,68.41713";
export const telHref = (p) => `tel:${p.replace(/[^\d+]/g, "")}`;
export const haversineKm = (a, b) => {
  const r = Math.PI / 180;
  const x = Math.sin(((b[0] - a[0]) * r) / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(((b[1] - a[1]) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};
