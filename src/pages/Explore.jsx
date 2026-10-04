import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import PageShell from "@/components/Shell";
import { PageHeading, SectionHead, SourceLink, Photo } from "@/components/Ui";
import { Stat } from "@/components/Stat";
import { AREAS, CITY, CITY_FACTS, LANGUAGES_CITY, LANGUAGES_TALUKA, NEIGHBOURHOODS, ROADS, SRC } from "@/data/city";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fmt } from "@/lib/utils";

function Bar({ label, pct, right }) {
  return (
    <li className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 text-[13px]">
      <span>{label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-soft ring-1 ring-line"><span className="block h-full rounded-full bg-accent" style={{ width: `${Math.min(100, pct)}%` }} /></span>
      <span className="tabular-nums text-muted">{right}</span>
    </li>
  );
}

export default function Explore() {
  usePageMeta("About Mehrabpur", "Facts and figures for Mehrabpur, Sindh: Census 2023 population, taluka, postal code, area code, coordinates, languages and areas.");
  const p = CITY.population;
  const talukaTotal = LANGUAGES_TALUKA.reduce((a, [, n]) => a + n, 0);
  return (
    <PageShell>
      <PageHeading title="About Mehrabpur" urdu={CITY.urdu} sub="City and taluka headquarters in Naushahro Feroze District, Sindh, on the Karachi–Peshawar railway line. Every figure below shows its source." />
      <div className="mb-5 grid gap-4 md:grid-cols-[1fr_280px]">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Stat label="City (2023)" value={fmt(p.city)} sub={`${fmt(p.cityMale)} male · ${fmt(p.cityFemale)} female`} src="pbsTc" />
          <Stat label="Taluka (2023)" value={fmt(p.taluka)} sub={`${fmt(p.talukaUrban)} urban · ${fmt(p.talukaRural)} rural`} src="cityPopTaluka" />
          <Stat label="City growth" value={`${p.cityGrowth}% / yr`} sub={`${fmt(p.city2017)} in 2017`} src="pbsTc" />
          <Stat label="Taluka area" value={`${p.areaKm2} km²`} sub={`About ${Math.round(p.taluka / p.areaKm2)} people per km²`} src="pbs2017" />
        </div>
        <Photo id="stationSign" caption className="panel overflow-hidden p-0 [&>img]:aspect-[4/3] [&_figcaption]:px-3 [&_figcaption]:pb-2" />
      </div>

      <section aria-labelledby="facts" className="panel overflow-hidden">
        <div className="panel-head"><h2 id="facts" className="h-title">Key facts</h2></div>
        <dl>
          {CITY_FACTS.map(([k, v, src, note]) => (
            <div key={k} className="grid gap-x-4 gap-y-0.5 border-b border-line px-4 py-2.5 last:border-0 sm:grid-cols-[210px_minmax(0,1fr)]">
              <dt className="text-[13px] font-semibold text-muted">{k}</dt>
              <dd className="min-w-0 text-[14px]">
                <span className="font-semibold">{v}</span>
                {note && <span className="mt-0.5 block text-[12.5px] text-muted">{note}</span>}
                <span className="mt-0.5 block text-[11.5px] text-muted">Source: <SourceLink s={SRC[src]} /></span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-6 flex gap-3 rounded-lg border border-warn/40 bg-card p-4 text-[13px]" aria-label="Data corrections">
        <TriangleAlert size={18} className="mt-0.5 shrink-0 text-warn" aria-hidden="true" />
        <div>
          <p className="font-semibold">Where sources disagreed</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
            <li>Taluka population: the first dataset said 273,567. PBS Census 2023 figures (citypopulation.de, and the local portal) give <strong className="text-ink">273,764</strong>, and the male, female and transgender counts add up to that.</li>
            <li>Postal code: Pakistan Post lists <strong className="text-ink">67000</strong>. Some directories show 67211, which belongs to another area.</li>
            <li>Station position: an earlier approximate marker was replaced by the OpenStreetMap station node.</li>
          </ul>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="panel" aria-labelledby="lc">
          <div className="panel-head"><h2 id="lc" className="h-title">Mother tongue, city (%)</h2></div>
          <ul className="space-y-2.5 p-4">{LANGUAGES_CITY.map(([n, v]) => <Bar key={n} label={n} pct={v} right={`${v}%`} />)}</ul>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Source: <SourceLink s={SRC.wiki} /> (Census 2023)</p>
        </section>
        <section className="panel" aria-labelledby="lt">
          <div className="panel-head"><h2 id="lt" className="h-title">Mother tongue, taluka (people)</h2></div>
          <ul className="space-y-2.5 p-4">{LANGUAGES_TALUKA.map(([n, v]) => <Bar key={n} label={n} pct={(v / talukaTotal) * 100} right={fmt(v)} />)}</ul>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Source: <SourceLink s={SRC.cityPopTaluka} /></p>
        </section>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <ChipPanel title="Areas covered" items={AREAS} to="/villages" />
        <ChipPanel title="Roads and routes" items={ROADS} />
        <ChipPanel title="Neighbourhoods" items={NEIGHBOURHOODS} />
      </div>
      <p className="mt-2 text-[12px] text-muted">Area, road and neighbourhood names come from the supplied dataset and public listings (<SourceLink s={SRC.portalHome} />). <Link to="/villages" className="text-accent hover:underline">Towns and villages</Link></p>
    </PageShell>
  );
}

function ChipPanel({ title, items, to }) {
  return (
    <section className="panel">
      <div className="panel-head"><h2 className="h-title">{title}</h2></div>
      <ul className="flex flex-wrap gap-2 p-4">{items.map((i) => <li key={i} className="chip !text-ink">{i}</li>)}</ul>
    </section>
  );
}
