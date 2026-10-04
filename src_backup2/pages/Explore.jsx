import { Link } from "react-router-dom";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { CITY, AREAS, ROADS, NEIGHBOURHOODS, PORTAL_FEATURES, DATA_NOTE } from "@/data/city";
import { SUGGESTED_FIELDS } from "@/data/places";
import { LISTINGS } from "@/data/listings";

export default function Explore() {
  const withPhone = LISTINGS.filter((l) => l.phones.length).length;
  return (
    <>
      <PageHero eyebrow="Explore Mehrabpur" icon="Compass" title="Explore" accent="Mehrabpur" urdu={`${CITY.sindhi} · ${CITY.urdu}`} text={CITY.censusNote} image="/images/mhr_wall.jpg" />
      <Container className="space-y-12 py-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl card-surface">
              <div className="border-b border-line bg-accent-soft px-5 py-3.5 font-extrabold">Mehrabpur — Main City Data</div>
              <table className="w-full text-sm"><tbody>
                {CITY.rows.map(([k, v]) => <tr key={k} className="border-t border-line/60 first:border-0"><th className="w-1/2 px-5 py-2.5 text-left font-semibold text-muted">{k}</th><td className={`px-5 py-2.5 font-bold ${/[\u0600-\u06FF]/.test(v) ? "font-urdu" : ""}`}>{v}</td></tr>)}
              </tbody></table>
            </div>
          </Reveal>
          <div className="space-y-5">
            {[["/images/mhr_station_platform.jpg", "Mehrabpur Junction"], ["/images/mhr_wall.jpg", "Mehrabpur City"]].map(([s, c], i) => (
              <Reveal key={s} delay={0.1 + i * 0.08}><TiltCard max={5}><figure className="relative overflow-hidden rounded-3xl border border-line"><img src={s} alt={c} className="h-52 w-full object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm font-semibold text-white">{c}</figcaption></figure></TiltCard></Reveal>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Local" accent="areas" sub="Areas covered by the Mehrabpur regional directory." />
          <div className="flex flex-wrap gap-2">{AREAS.map((a) => <Link key={a} to={`/businesses?area=${encodeURIComponent(a)}`} className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-white">{a}</Link>)}</div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card-surface rounded-3xl p-5"><h3 className="mb-3 font-extrabold">Important roads / routes</h3><div className="flex flex-wrap gap-2">{ROADS.map((r) => <span key={r} className="rounded-full border border-line bg-bg-soft px-3 py-1.5 text-xs font-semibold">{r}</span>)}</div></div>
          <div className="card-surface rounded-3xl p-5"><h3 className="mb-3 font-extrabold">Neighbourhoods</h3><div className="flex flex-wrap gap-2">{NEIGHBOURHOODS.map((r) => <span key={r} className="rounded-full border border-line bg-bg-soft px-3 py-1.5 text-xs font-semibold">{r}</span>)}</div></div>
        </section>

        <section>
          <SectionTitle title="What a full city" accent="portal covers" sub="Sections provided by the existing Mehrabpur portal — this site covers each as a feature." />
          <div className="flex flex-wrap gap-2">{PORTAL_FEATURES.map((f) => <span key={f} className="rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-xs font-bold text-accent">{f}</span>)}</div>
        </section>

        <section className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6">
          <h3 className="font-extrabold">About the data</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{DATA_NOTE}</p>
          <p className="mt-3 text-sm text-muted">Dataset: <b className="text-ink">{LISTINGS.length}</b> listings · <b className="text-ink">{withPhone}</b> with a public phone · every record carries <code>{SUGGESTED_FIELDS.join(", ")}</code> fields (see <code>src/data/listings.js</code>).</p>
        </section>
      </Container>
    </>
  );
}
