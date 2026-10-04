import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { CITY } from "@/data/city";
import { getGroup } from "@/data/categories";
import { CANAL, TOWNS } from "@/data/places";
import { STATION } from "@/data/railway";
import { directionsUrl } from "@/lib/maps";
import osm from "@/data/osmLines.json";

const pinCache = {};
const pin = (color, size = 22) => {
  const k = color + size;
  return (pinCache[k] ||= L.divIcon({
    className: "mhr-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)"></div>`,
  }));
};

function Fit({ points, focus }) {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
      if (focus) map.setView(focus, 16);
      else if (points.length > 1) map.fitBounds(points, { padding: [24, 24], maxZoom: 16 });
    }, 120);
    return () => clearTimeout(t);
  }, [map, points, focus]);
  return null;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export default function MapView({ listings = [], className = "h-[420px]", lines = true, showTowns = false, focus, interactive = true, zoom = 14, showStation = true }) {
  const pts = useMemo(() => listings.filter((l) => l.hasCoords), [listings]);
  const fit = useMemo(() => pts.map((l) => [l.lat, l.lon]), [pts]);
  const rails = osm.rail || [];
  const canals = osm.canal || [];
  return (
    <MapContainer
      center={CITY.center}
      zoom={zoom}
      scrollWheelZoom={false}
      dragging={interactive}
      zoomControl={interactive}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      keyboard={interactive}
      className={`${className} w-full`}
      style={{ zIndex: 0 }}
      aria-label="Map of Mehrabpur"
    >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
      {lines && rails.map((r, i) => <Polyline key={`r${i}`} positions={r} pathOptions={{ color: "#64748b", weight: 3, dashArray: "6 5" }} />)}
      {lines && canals.map((r, i) => <Polyline key={`c${i}`} positions={r} pathOptions={{ color: "#0ea5e9", weight: 3 }} />)}
      {showStation && (
        <Marker position={STATION.coords} icon={pin("#0284c7", 26)}>
          <Popup><strong>{STATION.name}</strong><br />Station position from OpenStreetMap</Popup>
        </Marker>
      )}
      {showTowns && TOWNS.filter((t) => t.id !== "mehrabpur").map((t) => (
        <Marker key={t.id} position={t.coords} icon={pin("#0b1b3a", 16)}>
          <Popup><strong>{t.name}</strong><br />{t.note}<br /><em>{t.approx ? "Approximate position" : t.src}</em></Popup>
        </Marker>
      ))}
      {pts.map((l) => (
        <Marker key={l.id} position={[l.lat, l.lon]} icon={pin(getGroup(l.category).color, 20)}>
          <Popup>
            <strong>{l.name}</strong><br />
            {l.sub}{l.area ? ` · ${l.area}` : ""}<br />
            {l.phone && <span>{l.phone}<br /></span>}
            <span style={{ opacity: 0.7, fontSize: 11 }}>{l.coordSource}</span><br />
            <a href={directionsUrl(l)} target="_blank" rel="noreferrer noopener">Get directions</a>
          </Popup>
        </Marker>
      ))}
      <Fit points={fit} focus={focus} />
    </MapContainer>
  );
}
