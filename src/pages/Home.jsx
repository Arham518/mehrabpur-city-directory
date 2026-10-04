import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, CircleCheck, Clock, Navigation, Phone, TrainFront } from "lucide-react";
import PageShell from "@/components/Shell";
import { CatIcon, CategoryCover, Rating, SectionHead, SourceLink, Confidence } from "@/components/Ui";
import { Stat } from "@/components/Stat";
import { CATEGORY_GROUPS, getGroup, groupRoute } from "@/data/categories";
import { CITY, EMERGENCY, SRC } from "@/data/city";
import { countByGroup, FEATURED, LAST_UPDATED, STATS } from "@/data/listings";
import { CREDITS } from "@/data/credits";
import { ALL_TRAINS, nextTrains, to12 } from "@/lib/trains";
import { directionsUrl, telHref } from "@/lib/maps";
import { usePageMeta } from "@/hooks/usePageMeta";
import { fmt } from "@/lib/utils";

const MapView = lazy(() => import("@/components/MapView"));

const HOME_CATS = ["doctors", "schools", "banks", "fuel", "food", "shops", "agri", "transport"];

function Hero() {
  const bg = CREDITS.hero?.file || "/images/local/station-sign.jpg";
  const features = [
    `${STATS.total} listings, each with a source`,
    `${STATS.withCoords} with map positions`,
    `${STATS.withPhone} with phone numbers`,
    `${ALL_TRAINS.length} scheduled train stops`,
  ];
  return (
    <section className="relative isolate overflow-hidden border-b border-navy-line bg-navy text-white" aria-labelledby="hero-h">
      <img src={bg} alt="" aria-hidden="true" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-navy/80" />
      <div className="mx-auto grid max-w-[1480px] items-center gap-6 px-4 py-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] md:py-10 lg:py-12">
        <div>
          <p className="text-[12.5px] font-semibold uppercase tracking-wider text-white/70">Mehrabpur · Naushahro Feroze · Sindh</p>
          <h1 id="hero-h" className="mt-2 max-w-xl text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-[36px] lg:text-[42px]">
            Discover Everything Around You
          </h1>
          <p className="mt-3 max-w-lg text-[15px] text-white/80">
            Doctors, schools, banks, markets, the Ghalla Mandi, trains and government contacts for Mehrabpur and nearby towns, collected from public sources and marked where a detail is not yet verified.
          </p>
          <ul className="mt-5 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[14px] text-white/90"><CircleCheck size={17} className="shrink-0 text-emerald-400" aria-hidden="true" />{f}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link to="/businesses" className="btn btn-primary !h-10 !px-5">Browse directory <ArrowRight size={15} /></Link>
            <Link to="/railway" className="btn !h-10 border-white/30 bg-white/10 text-white hover:bg-white/20"><TrainFront size={15} /> Train timetable</Link>
          </div>
        </div>
        <div className="panel overflow-hidden !border-white/20 text-ink shadow-xl">
          <div className="panel-head"><h2 className="h-title">Mehrabpur on the map</h2><Link to="/map" className="text-[12.5px] font-semibold text-accent hover:underline">Open map</Link></div>
          <Suspense fallback={<div className="h-[230px] bg-soft" />}>
            <MapView listings={[]} lines className="h-[230px]" interactive={false} zoom={13} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ g, i }) {
  const n = countByGroup(g.id);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.3, delay: (i % 4) * 0.04 }}>
      <Link to={groupRoute(g)} className="panel tilt group block h-full overflow-hidden" aria-label={`${g.label}, ${n} listings`}>
        <div className="relative h-[92px] sm:h-[104px]">
          <CategoryCover group={g} className="h-full w-full" />
          <CatIcon group={g} size={32} className="absolute left-2.5 top-2.5 ring-2 ring-white dark:ring-card" />
        </div>
        <div className="flex items-center gap-2 border-t border-line px-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-bold">{g.label}</p>
            <p className="text-[12px] tabular-nums text-muted">{n} listings</p>
          </div>
          <ChevronRight size={16} className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true" />
        </div>
      </Link>
    </motion.div>
  );
}

function TopCard({ l }) {
  const g = getGroup(l.category);
  return (
    <article className="panel tilt flex h-full flex-col overflow-hidden">
      <div className="flex h-[70px] items-center gap-3 border-b border-line px-4" style={{ background: `${g.color}14` }}>
        <CatIcon group={g} size={38} />
        <span className="text-[12.5px] font-semibold" style={{ color: g.color }}>{g.short}</span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-[14.5px] font-bold leading-snug">{l.name}</h3>
        <div className="flex items-center gap-2 text-[12.5px] text-muted"><Rating value={l.rating} /><span>{l.sub}</span></div>
        {l.address && <p className="text-[12.5px] text-muted">{l.address}</p>}
        {l.phone && <a href={telHref(l.phone)} className="flex items-center gap-1.5 text-[13px] font-medium tabular-nums text-accent hover:underline"><Phone size={13} />{l.phone}</a>}
        {l.hours && <p className="flex items-center gap-1.5 text-[12.5px] text-muted"><Clock size={13} />{l.hours}</p>}
        <div className="mt-auto pt-2"><Confidence level={l.confidence} /></div>
      </div>
      <a href={directionsUrl(l)} target="_blank" rel="noreferrer noopener" className="btn btn-primary m-3 mt-0 w-[calc(100%-1.5rem)]"><Navigation size={14} /> Get Directions</a>
    </article>
  );
}

export default function Home() {
  usePageMeta("", "Local directory for Mehrabpur, Naushahro Feroze, Sindh: doctors, schools, banks, markets, trains, government contacts and map.");
  const next = nextTrains(3);
  return (
    <>
      <Hero />
      <PageShell>
        <section aria-labelledby="cats">
          <SectionHead id="cats" title="Browse by Category" sub="Counts are calculated from the listings in this directory." action={<Link to="/categories" className="text-[13px] font-semibold text-accent hover:underline">All {CATEGORY_GROUPS.length} categories</Link>} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {HOME_CATS.map((id, i) => <CategoryCard key={id} g={getGroup(id)} i={i} />)}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="top">
          <SectionHead id="top" title="Featured Listings" sub="Listings with a sourced phone number and map position. Ratings are shown only where the supplied Google Maps data had one." action={<Link to="/businesses?phone=1" className="text-[13px] font-semibold text-accent hover:underline">View all with phone</Link>} />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 2xl:grid-cols-4">
            {FEATURED.slice(0, 4).map((l) => <TopCard key={l.id} l={l} />)}
          </div>
        </section>

        <section className="mt-8" aria-labelledby="glance">
          <SectionHead id="glance" title="Mehrabpur at a glance" action={<Link to="/explore" className="text-[13px] font-semibold text-accent hover:underline">More facts</Link>} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <Stat label="City population" value={fmt(CITY.population.city)} sub="Census 2023" src="pbsTc" />
            <Stat label="Taluka population" value={fmt(CITY.population.taluka)} sub="Census 2023" src="cityPopTaluka" />
            <Stat label="Postal code" value={CITY.postal} sub={`Area code ${CITY.areaCode}`} src="pakpost" />
            <Stat label="Elevation" value={`${CITY.elevationM} m`} sub={`${CITY.center[0].toFixed(3)}° N, ${CITY.center[1].toFixed(3)}° E`} src="osmCity" />
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2" aria-label="Trains and emergency numbers">
          <div className="panel overflow-hidden">
            <div className="panel-head"><h2 className="h-title">Next trains at Mehrabpur Junction</h2><Link to="/railway" className="text-[12.5px] font-semibold text-accent hover:underline">Timetable</Link></div>
            <ul>
              {next.map((t) => (
                <li key={t.no} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">
                  <CatIcon group="transport" size={32} />
                  <div className="min-w-0 flex-1"><p className="truncate text-[13.5px] font-semibold">{t.train} <span className="font-normal text-muted">{t.no}</span></p><p className="truncate text-[12px] text-muted">{t.route}</p></div>
                  <div className="text-right"><p className="text-[14px] font-bold tabular-nums">{to12(t.arr)}</p><p className="text-[11px] text-muted">{t.tomorrow ? "tomorrow" : "today"}</p></div>
                </li>
              ))}
            </ul>
            <p className="border-t border-line px-4 py-2 text-[11.5px] text-muted">Scheduled times only; delays are common. Not live.</p>
          </div>
          <div className="panel overflow-hidden">
            <div className="panel-head"><h2 className="h-title">Emergency and public service numbers</h2><Link to="/government" className="text-[12.5px] font-semibold text-accent hover:underline">All</Link></div>
            <ul>
              {EMERGENCY.slice(0, 5).map((e) => (
                <li key={e.name} className="flex items-center gap-3 border-b border-line px-4 py-2.5 last:border-0">
                  <div className="min-w-0 flex-1"><p className="truncate text-[13.5px] font-semibold">{e.name}</p><p className="truncate text-[12px] text-muted">{e.note}</p></div>
                  <a href={telHref(e.phone)} className="btn btn-outline btn-sm tabular-nums"><Phone size={13} />{e.phone}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-8 rounded-lg border border-line bg-soft p-4 text-[12.5px] leading-relaxed text-muted">
          <strong className="text-ink">About this data.</strong> Listings come from a supplied Google Maps based dataset, merged with public directories and OpenStreetMap, checked on {LAST_UPDATED}. Phone numbers are only shown when a source lists them. “Needs verification” means a name was found but no second source or position. Sources: <SourceLink s={SRC.portalHome} />, <Link to="/sources" className="text-accent hover:underline">full list and method</Link>.
        </p>
      </PageShell>
    </>
  );
}
