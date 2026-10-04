import { Wheat, Sprout, Tractor } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { DirectoryList } from "@/components/DirectoryList";
import { byGroup, LISTINGS } from "@/data/listings";
import { GRAIN_TRADES } from "@/data/places";
import { Reveal } from "@/components/ui/reveal";

export default function Agriculture() {
  const items = [...byGroup("agri"), ...LISTINGS.filter((l) => l.category === "showrooms" && /tractor/i.test(l.sub + l.name))];
  return (
    <>
      <PageHero eyebrow="Ghalla Mandi" icon="Wheat" title="Agriculture &" accent="Grain Market" urdu="غلہ منڈی" text="Mehrabpur's Ghalla Mandi (Grain Market) is an important grain and jaggery (gur) trading hub, with seeds, pesticides, herbicides, fertilizer and agricultural machinery businesses around it." image="/images/mhr_canal.jpg">
        <div className="flex flex-wrap gap-2">{GRAIN_TRADES.map((t) => <span key={t} className="rounded-full border border-accent/30 bg-card px-3 py-1 text-xs font-bold text-accent">{t}</span>)}</div>
      </PageHero>
      <Container className="py-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[[Wheat, "Grain & Gur Mandi", "Station Road — wheat, barley, rice, jaggery trading."], [Sprout, "Inputs", "Fertilizer agencies, seeds, pesticides and agri marts around Ghalla Mandi."], [Tractor, "Machinery", "Tractor showrooms on Thari–Mehrabpur and Mehrabpur–Hindyari roads."]].map(([I, t, d], i) => (
            <Reveal key={t} delay={i * 0.06}><div className="card-surface h-full rounded-2xl p-5"><span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent"><I size={22} /></span><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div></Reveal>
          ))}
        </div>
        <SectionTitle title="Traders, agencies &" accent="machinery" />
        <DirectoryList items={items} title="agriculture listings" />
      </Container>
    </>
  );
}
