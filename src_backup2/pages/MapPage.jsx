import { lazy, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LocateFixed, ExternalLink, Layers, Star } from "lucide-react";
import { Container, PageHero, GroupBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { MAP_POINTS } from "@/data/mapPoints";
import { getGroup } from "@/data/categories";
import { CITY } from "@/data/city";
import { MEHRABPUR_MAPS_URL } from "@/lib/maps";
import { cn } from "@/lib/utils";

const LeafletMap = lazy(() => import("@/components/LeafletMap"));

export default function MapPage() {
  const [sp] = useSearchParams();
  const [mode, setMode] = useState("osm");
  const [me, setMe] = useState(null);
  const [focus, setFocus] = useState(null);
  const [err, setErr] = useState("");

  const locate = () => {
    setErr("");
    if (!navigator.geolocation) return setErr("Geolocation is not supported by this browser.");
    navigator.geolocation.getCurrentPosition(
      (p) => { setMode("osm"); setMe([p.coords.latitude, p.coords.longitude]); },
      () => setErr("Location permission was denied or unavailable."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
  useEffect(() => { if (sp.get("locate")) locate(); /* eslint-disable-next-line */ }, []);

  return (
    <>
      <PageHero eyebrow="Map" icon="Map" title="Mehrabpur" accent="Map" urdu="نقشہ" text={`Centered on ${CITY.rows.at(-1)[1]}. Marker positions are approximate — use “Open exact place” for Google Maps.`} />
      <Container className="py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-line bg-card p-1">
            {[["osm", "OpenStreetMap + markers"], ["google", "Google Maps"]].map(([k, l]) => (
              <button key={k} onClick={() => setMode(k)} className={cn("cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold", mode === k ? "bg-accent text-white" : "text-muted hover:text-ink")}>{l}</button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={locate}><LocateFixed size={15} /> My Location</Button>
          <Button as="a" href={MEHRABPUR_MAPS_URL} target="_blank" rel="noreferrer" variant="soft" size="sm"><ExternalLink size={14} /> Open in Google Maps</Button>
          {err && <span className="text-xs font-semibold text-red-500">{err}</span>}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 overflow-hidden rounded-3xl border border-line shadow-soft">
            {mode === "osm" ? (
              <Suspense fallback={<div className="grid h-[560px] place-items-center text-muted">Loading map…</div>}><LeafletMap focus={focus} me={me} className="h-[560px]" /></Suspense>
            ) : (
              <iframe title="Google Map of Mehrabpur" className="h-[560px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=27.10,68.42&z=13&output=embed" />
            )}
          </div>
          <aside className="space-y-2.5">
            <h2 className="flex items-center gap-2 font-extrabold"><Layers size={17} className="text-accent" /> Major locations</h2>
            {MAP_POINTS.map((p) => (
              <button key={p.name} onClick={() => { setMode("osm"); setFocus([...p.position]); }} className="flex w-full cursor-pointer items-center gap-3 rounded-2xl card-surface p-3 text-left transition hover:border-accent/60">
                <GroupBadge group={getGroup(p.group)} size={36} />
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{p.name}</span><span className="text-xs text-muted">{p.type}{p.status ? ` · ${p.status}` : ""}</span></span>
                {p.rating != null && <span className="flex items-center gap-1 text-sm font-bold"><Star size={13} className="fill-amber-400 text-amber-400" />{p.rating.toFixed(1)}</span>}
              </button>
            ))}
          </aside>
        </div>
      </Container>
    </>
  );
}
