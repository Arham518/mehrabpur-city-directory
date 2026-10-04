import PageShell from "@/components/Shell";
import { PageHeading, Photo, SourceLink } from "@/components/Ui";
import { ECONOMY, HISTORY, LANDMARKS } from "@/data/places";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function History() {
  usePageMeta("History of Mehrabpur", "A short, sourced history of Mehrabpur, Sindh: Mir Mehrab Khan Jatoi, the railway station, the 2005 taluka and the 2007 derailment.");
  return (
    <PageShell>
      <PageHeading title="History of Mehrabpur" sub="Each entry names its source. Dates from local pages are marked where they could not be confirmed elsewhere." />
      <ol className="panel divide-y divide-line">
        {HISTORY.map((h) => (
          <li key={h.year} className="grid gap-1 p-4 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
            <p className="text-[15px] font-extrabold text-accent">{h.year}</p>
            <div>
              <h2 className="text-[15px] font-bold">{h.title}</h2>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{h.text}</p>
              <p className="mt-1.5 text-[11.5px] text-muted">Source: <SourceLink s={h.src} /></p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="panel" aria-labelledby="ec"><div className="panel-head"><h2 id="ec" className="h-title">Local economy</h2></div>
          <ul className="list-disc space-y-1.5 p-4 pl-8 text-[13.5px]">{ECONOMY.map((e) => <li key={e}>{e}</li>)}</ul></section>
        <section className="panel" aria-labelledby="lm"><div className="panel-head"><h2 id="lm" className="h-title">Landmarks</h2></div>
          <ul className="divide-y divide-line">{LANDMARKS.map((l) => <li key={l.name} className="p-4 text-[13.5px]"><p className="font-semibold">{l.name}</p><p className="text-muted">{l.text}</p></li>)}</ul></section>
      </div>

      <section className="mt-6" aria-labelledby="ph">
        <h2 id="ph" className="mb-3 text-[17px] font-bold">Photos of Mehrabpur</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Photo id="stationSign" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:py-2" />
          <Photo id="stationPlatform" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:py-2" />
          <Photo id="mosque" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:py-2" />
          <Photo id="wall" caption className="panel overflow-hidden [&>img]:aspect-[4/3] [&_figcaption]:px-2.5 [&_figcaption]:py-2" />
        </div>
      </section>
    </PageShell>
  );
}
