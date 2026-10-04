import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Clock, Info, TrainFront, Search } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { UP_TRAINS, DOWN_TRAINS, STATION } from "@/data/railway";
import { nextTrains, toMin } from "@/lib/trains";
import { cn } from "@/lib/utils";

function Table({ title, icon: I, rows, nextNo, q }) {
  const shown = rows.filter((r) => `${r.train} ${r.no} ${r.route}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="overflow-hidden rounded-3xl card-surface">
      <div className="flex items-center gap-2 border-b border-line bg-accent-soft px-5 py-3.5"><I size={18} className="text-accent" /><h3 className="font-extrabold">{title}</h3><span className="ml-auto text-xs text-muted">{rows.length} trains</span></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead><tr className="text-xs uppercase tracking-wider text-muted"><th className="px-5 py-2.5">Train</th><th className="px-3 py-2.5">Route</th><th className="px-5 py-2.5 text-right">Mehrabpur</th></tr></thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.no} className={cn("border-t border-line/70 transition-colors hover:bg-accent-soft/60", nextNo.has(r.no) && "bg-accent-soft")}>
                <td className="px-5 py-3"><div className="font-bold">{r.train}</div><div className="font-mono text-xs text-muted">{r.no}</div></td>
                <td className="px-3 py-3 text-muted">{r.route}</td>
                <td className="px-5 py-3 text-right"><span className="inline-block rounded-lg bg-accent px-2.5 py-1 font-mono text-xs font-bold text-white">~{r.time}</span></td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={3} className="px-5 py-6 text-center text-muted">No trains match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Railway() {
  const [now, setNow] = useState(new Date());
  const [q, setQ] = useState("");
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(t); }, []);
  const next = useMemo(() => nextTrains(3, now), [now]);
  const nextNo = new Set(next.map((t) => t.no));
  const cur = now.getHours() * 60 + now.getMinutes();

  return (
    <>
      <PageHero eyebrow="Mehrabpur Junction · MHR" icon="TrainFront" title="Railway" accent="Timetable" urdu="محراب پور جنکشن" text={`${STATION.services} on the ${STATION.corridor}. Station location: ${STATION.location}.`} image="/images/mhr_station_platform.jpg" />
      <Container className="py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {next.map((t, i) => {
            const diff = (toMin(t.time) - cur + 1440) % 1440;
            return (
              <Reveal key={t.no} delay={i * 0.06}>
                <TiltCard><div className={cn("h-full rounded-3xl p-5", i === 0 ? "bg-accent text-white shadow-lg" : "card-surface")}>
                  <p className={cn("flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider", i === 0 ? "text-white/80" : "text-accent")}><Clock size={13} /> {i === 0 ? "Next scheduled" : "Then"} · in {Math.floor(diff / 60)}h {diff % 60}m</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight">{t.time}</p>
                  <p className="mt-1 font-bold">{t.train} <span className="font-mono text-xs opacity-70">{t.no}</span></p>
                  <p className={cn("text-sm", i === 0 ? "text-white/85" : "text-muted")}>{t.route}</p>
                </div></TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="relative mt-6">
          <Search size={16} className="absolute left-4 top-3.5 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search train name, number or destination (e.g. Tezgam, Lahore)…" className="h-11 w-full rounded-full border border-line bg-card pl-11 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Table title="Up Trains (from Karachi)" icon={ArrowUpFromLine} rows={UP_TRAINS} nextNo={nextNo} q={q} />
          <Table title="Down Trains (to Karachi)" icon={ArrowDownToLine} rows={DOWN_TRAINS} nextNo={nextNo} q={q} />
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-muted">
          <Info size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <p><b className="text-ink">Note:</b> this is the scheduled timetable (approximate “~” arrival times at Mehrabpur). Railway timings change and delays are common. Planned data fields: <code className="text-xs">{STATION.future_fields.join(", ")}</code>. Source: <a className="underline" href={STATION.source} target="_blank" rel="noreferrer">Mehrabpur Sindh portal</a>. Last updated {STATION.last_updated}.</p>
        </div>

        <SectionTitle className="mt-12" title="Mehrabpur" accent="Junction" sub={STATION.built} />
        <div className="grid gap-4 sm:grid-cols-2">
          {[["/images/mhr_station_sign.jpg", "Station sign — MEHRABPUR / محراب پور"], ["/images/mhr_station_platform.jpg", "Platform and canopy (view from the footbridge)"]].map(([src, cap], i) => (
            <Reveal key={src} delay={i * 0.08}><TiltCard max={5}><figure className="overflow-hidden rounded-3xl border border-line"><img src={src} alt={cap} className="h-72 w-full object-cover" /><figcaption className="bg-card px-4 py-3 text-sm font-semibold">{cap}</figcaption></figure></TiltCard></Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
