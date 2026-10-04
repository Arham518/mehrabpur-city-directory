import { useState } from "react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/lib/icons";
import { NEWS, NEWS_SECTIONS, NEWS_SOURCE } from "@/data/places";
import { cn } from "@/lib/utils";

export default function News() {
  const [tab, setTab] = useState("News");
  const items = tab === "News" ? NEWS : tab === "Events" ? NEWS.filter((n) => n.type === "Event") : [];
  return (
    <>
      <PageHero eyebrow="Community" icon="Newspaper" title="News &" accent="Events" urdu="مقامی خبریں" text="Local updates, announcements, jobs, notices, lost & found and public complaints for Mehrabpur." image="/images/mhr_wall.jpg" />
      <Container className="py-10">
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto">
          {NEWS_SECTIONS.map((s) => <button key={s} onClick={() => setTab(s)} className={cn("shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-bold", tab === s ? "border-accent bg-accent text-white" : "border-line bg-card hover:border-accent")}>{s}</button>)}
        </div>
        {items.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.06}><article className="card-surface flex gap-4 rounded-2xl p-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"><Icon name={n.icon} size={22} /></span><div><span className="text-[11px] font-bold uppercase tracking-wider text-accent">{n.type}</span><h3 className="font-bold leading-snug">{n.title}</h3><a href={NEWS_SOURCE} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-muted underline hover:text-accent">Source: Mehrabpur Sindh — community events</a></div></article></Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line p-12 text-center"><p className="font-bold">{tab} — coming soon</p><p className="mt-1 text-sm text-muted">No entries for this section yet. It is planned in the portal structure; entries can be added to <code>src/data/places.js</code>.</p></div>
        )}
      </Container>
    </>
  );
}
