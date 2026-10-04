// Helpers for Google Maps links (no API key needed — uses public search/direction URLs).
const q = (l) => encodeURIComponent([l.name, l.address, "Mehrabpur, Sindh, Pakistan"].filter(Boolean).join(", "));
export const directionsUrl = (l) => `https://www.google.com/maps/dir/?api=1&destination=${q(l)}`;
export const searchUrl = (l) => `https://www.google.com/maps/search/?api=1&query=${q(l)}`;
export const MEHRABPUR_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mehrabpur%2C%20Sindh%2C%20Pakistan";
export const telHref = (p) => `tel:${p.replace(/[^\d+]/g, "")}`;
