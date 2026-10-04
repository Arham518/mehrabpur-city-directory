import { lazy, Suspense } from "react";
import { ExternalLink } from "lucide-react";
import PageShell from "@/components/Shell";
import { PageHeading, Photo, SourceLink } from "@/components/Ui";
import { CITY } from "@/data/city";
import { CANAL, KHANWAHAN, TOWNS } from "@/data/places";
import { haversineKm } from "@/lib/maps";
import { usePageMeta } from "@/hooks/usePageMeta";

const MapView = lazy(() => import("@/components/MapView"));

export default function Villages() {
  usePageMeta("Towns and villages", "Towns and villages of Mehrabpur taluka with OpenStreetMap positions, the Khanwahan union council villages and the Mehrabpur Branch Canal.");
  return (
    <PageShell>
      <PageHeading title="Towns, villages and canal" sub="Positions are OpenStreetMap place nodes unless marked approximate. Distances are straight-line kilometres from the city centre, not road distances." />
      <section className="panel mb-5 overflow-hidden" aria-label="Map of towns">
        <Suspense fallback={<div className="h-[340px] bg-soft" />}>
          <MapView listings={[]} showTowns lines className="h-[300px] sm:h-[380px]" zoom={11} />
        </Suspense>
      </section>

      <section className="panel overflow-hidden" aria-labelledby="tw">
        <div className="panel-head"><h2 id="tw" className="h-title">Nearby towns</h2></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Place</th><th>About</th><th>Distance</th><th>Position</th><th>Source</th></tr></thead>
            <tbody>
              {TOWNS.map((t) => (
                <tr key={t.id}>
                  <td className="font-semibold">{t.name}{t.pop && <span className="block text-[12px] font-normal text-muted">{t.pop}</span>}</td>
                  <td className="min-w-[220px] text-muted">{t.note}</td>
                  <td className="num">{t.id === "mehrabpur" ? "-" : `${haversineKm(CITY.center, t.coords).toFixed(0)} km`}</td>
                  <td className="num text-[12.5px]">{t.coords[0].toFixed(4)}, {t.coords[1].toFixed(4)}{t.approx && <span className="chip ml-1 !text-warn">approx.</span>}</td>
                  <td><a className="inline-flex items-center gap-1 text-accent hover:underline" href={t.url} target="_blank" rel="noreferrer noopener">{t.src.split(" (")[0]}<ExternalLink size={11} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel mt-5 overflow-hidden" aria-labelledby="kw">
        <div className="panel-head"><h2 id="kw" className="h-title">Khanwahan union council villages</h2><span className="chip">{KHANWAHAN.villages.length} villages</span></div>
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
          {KHANWAHAN.villages.map((v) => (
            <li key={v.name} className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 text-[13.5px] sm:[&:nth-last-child(-n+2)]:border-b-0">
              <span className="min-w-0">{v.name}{v.osm && <span className="block text-[11.5px] text-muted">OSM name: {v.osm}</span>}</span>
              {v.coords ? <a className="shrink-0 text-[12px] tabular-nums text-accent hover:underline" href={`https://www.openstreetmap.org/?mlat=${v.coords[0]}&mlon=${v.coords[1]}#map=15/${v.coords[0]}/${v.coords[1]}`} target="_blank" rel="noreferrer noopener">map</a> : <span className="shrink-0 text-[12px] text-muted">no position found</span>}
            </li>
          ))}
        </ul>
        <div className="border-t border-line px-4 py-3 text-[13px]">
          <p className="font-semibold">Schools listed for Khanwahan</p>
          <p className="mt-1 text-muted">{KHANWAHAN.schools.join(" · ")}</p>
          <p className="mt-2 text-[11.5px] text-muted">Source: <SourceLink s={KHANWAHAN.source} /></p>
        </div>
      </section>

      <section className="panel mt-5 grid overflow-hidden md:grid-cols-[1fr_280px]" aria-labelledby="cn">
        <div className="p-4">
          <h2 id="cn" className="h-title">{CANAL.name}</h2>
          <p className="mt-2 text-[13.5px] text-muted">{CANAL.note}</p>
          <p className="mt-2 text-[13.5px] text-muted">{CANAL.local}</p>
          <p className="mt-2 text-[12px] text-muted">Position {CANAL.coords[0]}, {CANAL.coords[1]} · Source: <SourceLink s={CANAL.source} /></p>
        </div>
        <Photo id="canal" caption className="border-t border-line md:border-l md:border-t-0 [&>img]:h-44 [&_figcaption]:px-3 [&_figcaption]:py-2" />
      </section>
    </PageShell>
  );
}
