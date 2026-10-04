import { Clock, MapPin, Navigation, Phone, TriangleAlert } from "lucide-react";
import { CatIcon, Confidence, Rating, SourceLink } from "./Ui";
import { directionsUrl, telHref } from "@/lib/maps";

export default function ListingCard({ l }) {
  return (
    <article className="panel tilt flex h-full flex-col">
      <div className="flex gap-3 p-4">
        <CatIcon group={l.category} size={40} />
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-[15px] font-bold leading-snug">{l.name}</h3>
          {l.urdu && <p className="urdu text-[14px] text-muted" lang="ur" dir="rtl">{l.urdu}</p>}
          <p className="mt-0.5 text-[12.5px] text-muted">{l.sub} · {l.area}</p>
        </div>
        <Rating value={l.rating} />
      </div>
      <div className="flex-1 space-y-1.5 px-4 pb-3 text-[13px]">
        {l.address && <p className="flex gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" /><span>{l.address}</span></p>}
        {l.phones.map((p) => (
          <p key={p} className="flex gap-2"><Phone size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" /><a href={telHref(p)} className="font-medium tabular-nums text-accent hover:underline">{p}</a></p>
        ))}
        {l.hours && <p className="flex gap-2"><Clock size={14} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" /><span>{l.hours}</span></p>}
        {l.note && <p className="text-muted">{l.note}</p>}
        {l.flags?.length > 0 && (
          <p className="flex gap-2 text-warn"><TriangleAlert size={14} className="mt-0.5 shrink-0" aria-hidden="true" /><span>{l.flags.join(" ")}</span></p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5">
        <Confidence level={l.confidence} />
        <a href={directionsUrl(l)} target="_blank" rel="noreferrer noopener" className="btn btn-primary btn-sm">
          <Navigation size={13} /> Get Directions
        </a>
      </div>
      <details className="border-t border-line px-4 py-2 text-[12px] text-muted">
        <summary className="cursor-pointer select-none font-medium hover:text-ink">Source and accuracy</summary>
        <ul className="mt-1.5 space-y-0.5">
          {l.sources.map((s, i) => <li key={i}><SourceLink s={s} className="break-words" /></li>)}
          <li>{l.hasCoords ? `Position: ${l.lat.toFixed(5)}, ${l.lon.toFixed(5)} (${l.coordSource})` : "No coordinates found; directions use a text search."}</li>
          <li>Checked {l.last_updated}</li>
        </ul>
      </details>
    </article>
  );
}
