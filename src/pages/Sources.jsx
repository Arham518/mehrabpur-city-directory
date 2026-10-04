import { useMemo } from "react";
import PageShell from "@/components/Shell";
import { PageHeading, SourceLink } from "@/components/Ui";
import { SRC, FETCHED } from "@/data/city";
import { CREDITS } from "@/data/credits";
import { LAST_UPDATED, LISTINGS, STATS } from "@/data/listings";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Sources() {
  usePageMeta("Sources, credits and method", "Where the Mehrabpur City Portal data and photos come from, how listings are verified, and what could not be checked.");
  const bySource = useMemo(() => {
    const m = {};
    LISTINGS.forEach((l) => l.sources.forEach((s) => { const k = s.name; (m[k] ||= { name: k, url: s.url, n: 0 }).n++; }));
    return Object.values(m).sort((a, b) => b.n - a.n);
  }, []);
  const photos = Object.entries(CREDITS).filter(([, c]) => c.kind === "commons");
  return (
    <PageShell side={false} rail={false}>
      <PageHeading title="Sources, credits and method" sub={`Data fetched ${FETCHED}; listings checked ${LAST_UPDATED}.`} />
      <div className="space-y-5">
        <section className="panel p-4 text-[14px] leading-relaxed" aria-labelledby="m">
          <h2 id="m" className="h-title mb-2">How the directory was built</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            <li>Started from the supplied Google Maps based dataset, then merged with public directory pages (WorldOrgs, Cybo) and OpenStreetMap.</li>
            <li><strong className="text-ink">{STATS.total}</strong> listings: {STATS.cross} cross-checked in two or more sources, {STATS.total - STATS.cross - STATS.needsCheck} in one directory, {STATS.needsCheck} name only.</li>
            <li>{STATS.withCoords} listings have map coordinates (OpenStreetMap, WorldOrgs map data, or decoded Google Plus Codes); {STATS.withPhone} show a phone number found in a source. No phone number or rating was invented.</li>
            <li>Ratings are the Google Maps ratings from the supplied dataset. Review counts were not available, so none are shown.</li>
            <li>Where two sources disagreed, the listing carries a note instead of silently picking one.</li>
          </ul>
        </section>

        <section className="panel overflow-hidden" aria-labelledby="s">
          <div className="panel-head"><h2 id="s" className="h-title">Sources used for city facts</h2></div>
          <ul className="divide-y divide-line">
            {Object.values(SRC).filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i).map((s) => <li key={s.url} className="px-4 py-2 text-[13.5px]"><SourceLink s={s} /></li>)}
          </ul>
        </section>

        <section className="panel overflow-hidden" aria-labelledby="sl">
          <div className="panel-head"><h2 id="sl" className="h-title">Sources behind the listings</h2></div>
          <div className="table-wrap"><table className="tbl"><thead><tr><th>Source</th><th>Listings</th></tr></thead>
            <tbody>{bySource.map((s) => <tr key={s.name}><td className="min-w-[240px]">{s.name}</td><td className="num">{s.n}</td></tr>)}</tbody></table></div>
        </section>

        <section className="panel p-4 text-[14px]" aria-labelledby="u">
          <h2 id="u" className="h-title mb-2">What could not be verified</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            <li>Cybo pages block automated checks, so some Cybo-only phone numbers could not be re-confirmed.</li>
            <li>The official Pakistan Railways timetable page could not be read automatically; times come from traintracking.pk and match the supplied dataset.</li>
            <li>The 1914 station date appears on the local portal only.</li>
            <li>Opening hours and ratings are as listed by directories and may be out of date.</li>
          </ul>
        </section>

        <section className="panel overflow-hidden" aria-labelledby="p">
          <div className="panel-head"><h2 id="p" className="h-title">Photo credits</h2></div>
          <p className="border-b border-line px-4 py-3 text-[13px] text-muted">Category and header pictures are representative photos from Wikimedia Commons. They show similar places elsewhere in Pakistan, not specific Mehrabpur businesses; each caption says so. Categories without a suitable free photo show a plain icon tile. Station, mosque and wall photos were supplied by the site owner (the wall photo was cropped to remove a social media banner).</p>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Used for</th><th>File</th><th>Author</th><th>Licence</th></tr></thead>
              <tbody>
                {photos.map(([k, c]) => (
                  <tr key={k}>
                    <td className="font-semibold capitalize">{k === "hero" ? "Home header" : k}</td>
                    <td className="min-w-[220px]"><a className="text-accent hover:underline" href={c.page} target="_blank" rel="noreferrer noopener">{c.title}</a><span className="block text-[12px] text-muted">{c.place}</span></td>
                    <td className="min-w-[120px]">{c.author}</td>
                    <td className="whitespace-nowrap">{c.licenseUrl ? <a className="text-accent hover:underline" href={c.licenseUrl} target="_blank" rel="noreferrer noopener">{c.license}</a> : c.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Photos were resized and compressed. Map tiles: © OpenStreetMap contributors.</p>
        </section>
      </div>
    </PageShell>
  );
}
