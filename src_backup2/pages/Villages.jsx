import { Link } from "react-router-dom";
import { School, Home as HomeIcon, MapPin, Droplets } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { NEARBY_TOWNS, KHANWAHAN, CANALS, CANAL_FIELDS } from "@/data/places";
import { NEIGHBOURHOODS } from "@/data/city";

export default function Villages() {
  return (
    <>
      <PageHero eyebrow="Taluka Mehrabpur" icon="Trees" title="Towns &" accent="Villages" urdu="شہر اور گاؤں" text="Nearby areas of Mehrabpur taluka — each can get its own page with schools, health facilities, businesses and photos." image="/images/mhr_canal.jpg" />
      <Container className="space-y-12 py-10">
        <section>
          <SectionTitle title="Nearby" accent="Areas / Taluka" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEARBY_TOWNS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.04}><TiltCard><Link to={`/businesses?area=${encodeURIComponent(t.name)}`} className="group flex h-full items-start gap-3 rounded-2xl card-surface p-4 hover:border-accent/60"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><MapPin size={20} /></span><span><b className="block">{t.name}</b><span className="text-xs text-muted">{t.note}</span></span></Link></TiltCard></Reveal>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted"><b className="text-ink">City neighbourhoods:</b> {NEIGHBOURHOODS.join(" · ")}</p>
        </section>

        <section>
          <SectionTitle title="Khanwahan —" accent="Union Council villages" sub="Villages and schools listed on the Khanwahan page of the Mehrabpur Sindh portal." />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-surface rounded-3xl p-5"><h3 className="mb-3 flex items-center gap-2 font-extrabold"><HomeIcon size={18} className="text-accent" /> Villages ({KHANWAHAN.villages.length})</h3>
              <ul className="grid gap-2 sm:grid-cols-2">{KHANWAHAN.villages.map((v) => <li key={v} className="rounded-xl bg-bg-soft px-3 py-2 text-sm font-semibold">{v}</li>)}</ul></div>
            <div className="card-surface rounded-3xl p-5"><h3 className="mb-3 flex items-center gap-2 font-extrabold"><School size={18} className="text-accent" /> Educational institutions</h3>
              <ul className="grid gap-2 sm:grid-cols-2">{KHANWAHAN.schools.map((v) => <li key={v} className="rounded-xl bg-bg-soft px-3 py-2 text-sm font-semibold">{v}</li>)}</ul>
              <a href={KHANWAHAN.source} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs text-muted underline hover:text-accent">Source: Mehrabpur Sindh — Khanwahan</a></div>
          </div>
        </section>

        <section>
          <SectionTitle title="Canals &" accent="Nehr / Irrigation" sub={`Planned fields: ${CANAL_FIELDS.join(" | ")}`} />
          <div className="grid gap-4 md:grid-cols-2">
            {CANALS.map((c) => (
              <div key={c.name} className="card-surface rounded-2xl p-5"><h3 className="flex items-center gap-2 font-extrabold"><Droplets size={18} className="text-sky-500" /> {c.name}</h3><p className="text-xs font-semibold text-accent">{c.branch}</p><p className="mt-2 text-sm text-muted">{c.note}</p>{c.source && <a href={c.source} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline hover:text-accent">Source</a>}</div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
