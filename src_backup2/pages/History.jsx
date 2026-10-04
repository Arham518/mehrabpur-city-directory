import { Landmark, TrainFront, Trees, Droplets } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { HISTORY, NATURAL_PLACES, CANALS } from "@/data/places";

export default function History() {
  return (
    <>
      <PageHero eyebrow="History & Landmarks" icon="Landmark" title="History of" accent="Mehrabpur" urdu="محراب پور کی تاریخ" text="Local history associates Mehrabpur with Mir Mehrab Khan Jatoi. The railway station, mosques, canals and reserved forest are key landmarks." image="/images/mhr_mosque.jpg" />
      <Container className="space-y-12 py-10">
        <section className="grid gap-5 md:grid-cols-2">
          {HISTORY.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="card-surface h-full rounded-3xl p-6">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white">{i === 0 ? <Landmark size={22} /> : <TrainFront size={22} />}</span>
                <h2 className="text-lg font-extrabold">{h.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                <a href={h.source} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs underline hover:text-accent">Local / history source</a>
              </div>
            </Reveal>
          ))}
        </section>

        <section>
          <SectionTitle title="Landmarks &" accent="photos" />
          <div className="grid gap-4 md:grid-cols-3">
            {[["/images/mhr_mosque.jpg", "White mosque / shrine with domes"], ["/images/mhr_station_sign.jpg", "Mehrabpur station sign"], ["/images/mhr_canal.jpg", "Canal near Mehrabpur"]].map(([s, c], i) => (
              <Reveal key={s} delay={i * 0.07}><TiltCard max={6}><figure className="overflow-hidden rounded-3xl border border-line"><img src={s} alt={c} className="h-60 w-full object-cover" loading="lazy" /><figcaption className="bg-card px-4 py-3 text-sm font-semibold">{c}</figcaption></figure></TiltCard></Reveal>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Natural &" accent="heritage places" />
          <div className="grid gap-4 sm:grid-cols-3">
            {NATURAL_PLACES.map((p) => <div key={p.name} className="card-surface flex items-center gap-3 rounded-2xl p-4"><Trees className="text-accent" /><div><b className="block">{p.name}</b><span className="text-xs text-muted">{p.type}</span></div></div>)}
            {CANALS.slice(0, 1).map((c) => <div key={c.name} className="card-surface flex items-center gap-3 rounded-2xl p-4"><Droplets className="text-sky-500" /><div><b className="block">{c.name}</b><span className="text-xs text-muted">27.05021, 68.41472</span></div></div>)}
          </div>
        </section>
      </Container>
    </>
  );
}
