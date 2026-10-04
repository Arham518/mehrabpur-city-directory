import { Phone, TriangleAlert } from "lucide-react";
import PageShell from "@/components/Shell";
import { PageHeading, Photo, SourceLink, CatIcon } from "@/components/Ui";
import { DOWN_TRAINS, OTHER_SOURCE, STATION, STATION_CONTACTS, STATION_TIPS, UP_TRAINS } from "@/data/railway";
import { SRC } from "@/data/city";
import { nextTrains, to12 } from "@/lib/trains";
import { telHref } from "@/lib/maps";
import { usePageMeta } from "@/hooks/usePageMeta";

function TrainTable({ title, rows, id }) {
  return (
    <section className="panel overflow-hidden" aria-labelledby={id}>
      <div className="panel-head"><h2 id={id} className="h-title">{title}</h2><span className="chip">{rows.length} services</span></div>
      <div className="table-wrap hidden sm:block">
        <table className="tbl">
          <thead><tr><th>Train</th><th>No.</th><th>Route</th><th>Arrives</th><th>Departs</th></tr></thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.no}>
                <td className="font-semibold"><a className="hover:text-accent hover:underline" href={t.src} target="_blank" rel="noreferrer noopener">{t.train}</a></td>
                <td className="num text-muted">{t.no}</td><td>{t.route}</td>
                <td className="num font-semibold">{to12(t.arr)}</td><td className="num">{to12(t.dep)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="sm:hidden">
        {rows.map((t) => (
          <li key={t.no} className="flex items-start gap-3 border-b border-line px-4 py-3 last:border-0">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold">{t.train} <span className="font-normal text-muted">{t.no}</span></p>
              <p className="text-[12.5px] text-muted">{t.route}</p>
            </div>
            <div className="shrink-0 text-right text-[13px] tabular-nums"><p className="font-bold">{to12(t.arr)}</p><p className="text-[11.5px] text-muted">dep {to12(t.dep)}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Railway() {
  usePageMeta("Mehrabpur Junction train timetable", "Scheduled arrival and departure times of the 18 trains that stop at Mehrabpur Junction (MHR), Pakistan Railways, with sources and a note on conflicting timetables.");
  const next = nextTrains(3);
  return (
    <PageShell>
      <PageHeading title="Mehrabpur Junction" urdu="محراب پور جنکشن" sub={`Station code ${STATION.code} · ${STATION.line}. Scheduled times at Mehrabpur, not live running status.`} />

      <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="panel overflow-hidden" aria-labelledby="nx">
          <div className="panel-head"><h2 id="nx" className="h-title">Next scheduled stops</h2></div>
          <ul>
            {next.map((t) => (
              <li key={t.no} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">
                <CatIcon group="transport" size={32} />
                <div className="min-w-0 flex-1"><p className="truncate text-[13.5px] font-semibold">{t.train} <span className="font-normal text-muted">{t.no}</span></p><p className="truncate text-[12px] text-muted">{t.route}</p></div>
                <div className="text-right"><p className="text-[14px] font-bold tabular-nums">{to12(t.arr)}</p><p className="text-[11px] text-muted">{t.tomorrow ? "tomorrow" : "today"}</p></div>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Based on your device clock.</p>
        </section>
        <div className="grid grid-cols-2 gap-3">
          <Photo id="stationSign" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:pb-2" />
          <Photo id="stationPlatform" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:pb-2" />
        </div>
      </div>

      <div className="space-y-5">
        <TrainTable id="up" title="Up trains (towards Lahore / Peshawar)" rows={UP_TRAINS} />
        <TrainTable id="dn" title="Down trains (towards Karachi)" rows={DOWN_TRAINS} />
      </div>
      <p className="mt-2 text-[12px] text-muted">Times: Pakistan Railways schedule as published by <SourceLink s={SRC.traintracking} />, checked {STATION.fetched}. {STATION.validity}</p>

      <section className="mt-6 flex gap-3 rounded-lg border border-warn/40 bg-card p-4 text-[13px]" aria-labelledby="cf">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-warn" aria-hidden="true" />
        <div className="min-w-0">
          <h2 id="cf" className="font-semibold">Another local timetable shows different times</h2>
          <p className="mt-1 text-muted">{OTHER_SOURCE.note} <SourceLink s={OTHER_SOURCE} /></p>
          <details className="mt-2">
            <summary className="cursor-pointer font-semibold text-accent">Show the other table</summary>
            <div className="table-wrap mt-2 rounded-lg border border-line">
              <table className="tbl"><thead><tr><th>Train</th><th>Arrives</th><th>Departs</th></tr></thead>
                <tbody>{OTHER_SOURCE.rows.map(([n, a, d]) => <tr key={n}><td>{n}</td><td className="num">{a}</td><td className="num">{d}</td></tr>)}</tbody></table>
            </div>
          </details>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="panel overflow-hidden" aria-labelledby="ct">
          <div className="panel-head"><h2 id="ct" className="h-title">Station contacts</h2></div>
          <ul>{STATION_CONTACTS.map(([n, p]) => (
            <li key={n} className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 last:border-0 text-[13.5px]"><span>{n}</span><a href={telHref(p)} className="btn btn-outline btn-sm tabular-nums"><Phone size={13} />{p}</a></li>
          ))}</ul>
        </section>
        <section className="panel" aria-labelledby="tp">
          <div className="panel-head"><h2 id="tp" className="h-title">Travel notes</h2></div>
          <ul className="list-disc space-y-1.5 p-4 pl-8 text-[13.5px]">{STATION_TIPS.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Station position (OpenStreetMap): {STATION.coords[0]}, {STATION.coords[1]}. Opened: {STATION.opened}.</p>
        </section>
      </div>
    </PageShell>
  );
}
