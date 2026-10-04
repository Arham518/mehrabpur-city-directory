import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { ExternalLink } from "lucide-react";
import { MAP_POINTS, CANAL_POINT } from "@/data/mapPoints";
import { CITY } from "@/data/city";
import { getGroup } from "@/data/categories";

const pin = (color, size = 30) =>
  L.divIcon({
    className: "mhr-pin",
    iconSize: [size, size + 8],
    iconAnchor: [size / 2, size + 6],
    popupAnchor: [0, -size],
    html: `<div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 4px 10px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center"><div style="width:9px;height:9px;border-radius:50%;background:#fff;transform:rotate(45deg)"></div></div>`,
  });

function Fly({ target }) {
  const map = useMap();
  useEffect(() => { if (target) map.flyTo(target, 15, { duration: 1.2 }); }, [target, map]);
  return null;
}
function Resize() {
  const map = useMap();
  useEffect(() => { const t = setTimeout(() => map.invalidateSize(), 250); return () => clearTimeout(t); }, [map]);
  return null;
}

export default function LeafletMap({ focus, me, className = "h-[520px]" }) {
  return (
    <MapContainer center={CITY.center} zoom={14} scrollWheelZoom={false} className={`${className} w-full rounded-3xl`} style={{ zIndex: 0 }}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Resize />
      <Fly target={focus || me} />
      {MAP_POINTS.map((p) => (
        <Marker key={p.name} position={p.position} icon={pin(getGroup(p.group).color)}>
          <Popup>
            <strong>{p.name}</strong><br />
            <span>{p.type}{p.rating ? ` · ★ ${p.rating.toFixed(1)}` : ""}</span><br />
            <em style={{ fontSize: 11, opacity: 0.7 }}>Approximate marker position</em><br />
            <a href={p.url} target="_blank" rel="noreferrer" style={{ color: "#e8590c", fontWeight: 700 }}>Open exact place in Google Maps <ExternalLink size={11} style={{ display: "inline" }} /></a>
          </Popup>
        </Marker>
      ))}
      <Marker position={CANAL_POINT.position} icon={pin("#0284c7", 26)}>
        <Popup><strong>{CANAL_POINT.name}</strong><br />Canal · coordinates from Mapcarta<br /><a href={CANAL_POINT.url} target="_blank" rel="noreferrer" style={{ color: "#e8590c", fontWeight: 700 }}>View on Mapcarta</a></Popup>
      </Marker>
      {me && (
        <>
          <Circle center={me} radius={80} pathOptions={{ color: "#e8590c", fillColor: "#e8590c", fillOpacity: 0.25 }} />
          <Marker position={me} icon={pin("#e8590c", 30)}><Popup>You are here</Popup></Marker>
        </>
      )}
    </MapContainer>
  );
}
