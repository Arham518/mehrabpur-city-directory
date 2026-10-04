import { lazy, Suspense, useMemo, useState } from "react";
import PageShell from "@/components/Shell";
import { CatIcon, PageHeading } from "@/components/Ui";
import { CATEGORY_GROUPS } from "@/data/categories";
import { LISTINGS, STATS } from "@/data/listings";
import { usePageMeta } from "@/hooks/usePageMeta";
import { cn } from "@/lib/utils";

const MapView = lazy(() => import("@/components/MapView"));

export default function MapPage() {
  usePageMeta("Map of Mehrabpur", "Map of Mehrabpur listings with real coordinates from OpenStreetMap, directory pages and Google Plus Codes, plus the railway line and canals.");
  const [cat, setCat] = useState("");
  const list = useMemo(() => LISTINGS.filter((l) => l.hasCoords && (!cat || l.category === cat)), [cat]);
  const counts = useMemo(() => Object.fromEntries(CATEGORY_GROUPS.map((g) => [g.id, LISTINGS.filter((l) => l.hasCoords && l.category === g.id).length])), []);
  return (
    <PageShell side={false} rail={false}>
      <PageHeading title="Map of Mehrabpur" sub={`${STATS.withCoords} of ${STATS.total} listings have real coordinates. Markers are only drawn where a position was found; the rest are still in the directory.`} />
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter map by category">
        <button type="button" aria-pressed={!cat} onClick={() => setCat("")} className={cn("chip shrink-0 !px-3 !py-1.5 !text-[13px] !text-ink", !cat && "border-accent bg-accent-soft !text-accent")}>All ({STATS.withCoords})</button>
        {CATEGORY_GROUPS.filter((g) => counts[g.id]).map((g) => (
          <button key={g.id} type="button" aria-pressed={cat === g.id} onClick={() => setCat(g.id)} className={cn("chip shrink-0 !px-3 !py-1.5 !text-[13px] !text-ink", cat === g.id && "border-accent bg-accent-soft !text-accent")}>
            <span className="h-2 w-2 rounded-full" style={{ background: g.color }} aria-hidden="true" />{g.short} ({counts[g.id]})
          </button>
        ))}
      </div>
      <div className="panel overflow-hidden">
        <Suspense fallback={<div className="h-[60vh] min-h-[380px] bg-soft" role="status">Loading map...</div>}>
          <MapView listings={list} lines className="h-[62vh] min-h-[400px]" interactive />
        </Suspense>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line px-4 py-2.5 text-[12px] text-muted">
          <span className="inline-flex items-center gap-1.5"><span className="h-0 w-5 border-t-[3px] border-dashed border-slate-500" />Railway (OSM)</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-0 w-5 border-t-[3px] border-sky-500" />Canals (OSM, unnamed)</span>
          <span className="inline-flex items-center gap-1.5"><CatIcon group="transport" size={14} />Mehrabpur Junction</span>
          <span>Showing {list.length} markers. Scroll or drag the page with two fingers on mobile; zoom with the + / - buttons.</span>
        </div>
      </div>
      <p className="mt-2 text-[12px] text-muted">Positions come from OpenStreetMap, directory map data (WorldOrgs) and decoded Google Plus Codes (Cybo). Each marker popup names the source. Positions can be off by tens of metres.</p>
    </PageShell>
  );
}
