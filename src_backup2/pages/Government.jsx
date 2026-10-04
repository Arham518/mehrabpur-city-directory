import { Phone, Siren } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { DirectoryList } from "@/components/DirectoryList";
import { byGroup, EMERGENCY } from "@/data/listings";
import { telHref } from "@/lib/maps";
import { Reveal } from "@/components/ui/reveal";

export default function Government() {
  return (
    <>
      <PageHero eyebrow="Government Services" icon="ShieldCheck" title="Government &" accent="Emergency" urdu="سرکاری خدمات" text="Police, NADRA, post office, municipality, revenue office, SEPCO, SSGC and key emergency contacts for Mehrabpur." image="/images/mhr_mosque.jpg" />
      <Container className="py-8">
        <SectionTitle title="Emergency &" accent="Public Contacts" sub="Numbers listed in the master dataset. Emergency Police: 15." />
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMERGENCY.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.04}>
              <a href={telHref(c.phone)} className={`group flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 ${i === 0 ? "bg-red-600 text-white shadow-lg" : "card-surface"}`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${i === 0 ? "bg-white/20" : "bg-accent-soft text-accent"}`}>{i === 0 ? <Siren size={22} /> : <Phone size={20} />}</span>
                <span className="min-w-0"><span className="block text-sm font-bold">{c.name}</span><span className="block font-mono text-lg font-extrabold">{c.phone}</span><span className={`block text-xs ${i === 0 ? "text-white/80" : "text-muted"}`}>{c.note}</span></span>
              </a>
            </Reveal>
          ))}
        </div>
        <SectionTitle title="Public" accent="offices" />
        <DirectoryList items={byGroup("govt")} title="government offices" />
      </Container>
    </>
  );
}
