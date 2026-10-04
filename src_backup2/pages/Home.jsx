import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Navigation, ShieldCheck, Star, MapPinned, Sparkles, ArrowRight, TrainFront, Clock } from "lucide-react";
import { Container, SectionTitle, CategoryCard, PlaceCard, GroupBadge, Cover } from "@/components/common";
import { MapPreview } from "@/components/MapPreview";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { Icon } from "@/lib/icons";
import { CATEGORY_GROUPS, getGroup } from "@/data/categories";
import { LISTINGS, countByGroup, find } from "@/data/listings";
import { CITY } from "@/data/city";
import { UP_TRAINS, DOWN_TRAINS } from "@/data/railway";
import { MEHRABPUR_MAPS_URL } from "@/lib/maps";
import { nextTrains } from "@/lib/trains";

const FEATURES = [
  { icon: "MapPinned", label: "Maps-linked listings" },
  { icon: "Phone", label: "Phone Numbers" },
  { icon: "Star", label: "Ratings" },
  { icon: "Navigation", label: "Directions" },
];

const NEARBY_IDS = ["doctors", "schools", "transport", "masjids", "agri", "food", "fuel", "banks"];
const TOP_NAMES = ["Royal Medical Center", "Mehran Motors", "John's PIJJA", "Government Boys Degree College"];
const RECENT_NAMES = ["Citi Medical Center / Pharmacy", "Bilal Super", "Al Shifa Lab", "Khushhali", "Ali Ultrasound"];
const QUICK = [
  ["Find Doctors Near Me", "Stethoscope", "doctors"], ["Find Schools Near Me", "GraduationCap", "schools"],
  ["Find Petrol Pumps", "Fuel", "fuel"], ["Find Restaurants", "UtensilsCrossed", "food"],
  ["Find Banks & ATMs", "Landmark", "banks"], ["Find Pharmacies", "Pill", "pharmacies"],
];

export default function Home() {
  const nav = useNavigate();
  const top = TOP_NAMES.map(find).filter(Boolean);
  const recent = RECENT_NAMES.map(find).filter(Boolean);
  const upcoming = nextTrains(3);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        <div className="grid-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <Container className="relative grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              <Sparkles size={13} /> Mehrabpur City Portal · <span className="font-urdu text-sm normal-case tracking-normal">{CITY.sindhi}</span>
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Discover Everything <span className="text-accent">Around You</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Mehrabpur ka mukammal city guide — doctors, schools, railway timetable, banks, petrol pumps, grain market, restaurants aur sab kuch ek jagah.
              Find phone numbers, ratings and directions for {LISTINGS.length}+ places in Mehrabpur, Naushahro Feroze, Sindh.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-6">
              {FEATURES.map((f) => (
                <li key={f.label} className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent"><Icon name={f.icon} size={17} /></span>
                  {f.label}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => nav("/businesses")}>Browse Directory <ArrowRight size={18} /></Button>
              <Button size="lg" variant="outline" onClick={() => nav("/explore")}>Explore Mehrabpur</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <MapPreview />
          </motion.div>
        </Container>
      </section>

      {/* ───────── 3-COLUMN DASHBOARD ───────── */}
      <Container className="grid gap-6 pb-4 xl:grid-cols-[250px_minmax(0,1fr)_290px]">
        {/* Left: All Categories */}
        <aside className="order-2 xl:order-1">
          <div className="card-surface rounded-3xl p-4 xl:sticky xl:top-24">
            <h2 className="mb-2 px-1 text-base font-extrabold">All Categories</h2>
            <ul className="max-h-[72vh] space-y-0.5 overflow-y-auto pr-1">
              {CATEGORY_GROUPS.map((g) => (
                <li key={g.id}>
                  <Link to={g.route || `/businesses?cat=${g.id}`} className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-accent-soft">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ background: g.color }}><Icon name={g.icon} size={15} /></span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{g.label}</span>
                    <span className="text-[11px] text-muted">{countByGroup(g.id)}</span>
                    <ChevronRight size={15} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Center */}
        <div className="order-1 min-w-0 space-y-10 xl:order-2">
          <section>
            <SectionTitle title="Nearby" accent="Places" sub="Browse by category — counts come from the Mehrabpur master dataset." action={<Link to="/categories" className="text-sm font-bold text-accent hover:underline">View all categories →</Link>} />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {NEARBY_IDS.map((id, i) => <CategoryCard key={id} group={getGroup(id)} count={countByGroup(id)} i={i} to={getGroup(id).route} />)}
            </div>
          </section>

          <section>
            <SectionTitle title="Top Places" accent="Near You" sub="Highest-rated listings with phone numbers from public Maps-style sources." action={<Link to="/businesses?sort=rating" className="text-sm font-bold text-accent hover:underline">See top rated →</Link>} />
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {top.map((l, i) => <PlaceCard key={l.id} l={l} i={i} />)}
            </div>
          </section>
        </div>

        {/* Right */}
        <aside className="order-3 space-y-5">
          <div className="card-surface rounded-3xl p-4">
            <h2 className="mb-2 text-base font-extrabold">Quick Search</h2>
            <ul className="space-y-0.5">
              {QUICK.map(([label, ic, cat]) => (
                <li key={label}>
                  <Link to={`/businesses?cat=${cat}`} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-semibold transition hover:bg-accent-soft hover:text-accent">
                    <Icon name={ic} size={16} className="text-accent" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface rounded-3xl p-4">
            <div className="mb-2 flex items-center justify-between"><h2 className="text-base font-extrabold">Recent Listings</h2><Link to="/businesses" className="text-xs font-bold text-accent">All</Link></div>
            <ul className="space-y-2.5">
              {recent.map((l) => {
                const g = getGroup(l.category);
                return (
                  <li key={l.id}>
                    <Link to={`/businesses?q=${encodeURIComponent(l.name)}`} className="flex items-center gap-3 rounded-xl p-1 transition hover:bg-accent-soft">
                      <Cover group={g} className="h-12 w-12 shrink-0 rounded-xl" iconSize={26} />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-bold">{l.name}</span>
                        <span className="block truncate text-xs text-muted">{l.sub} · {l.area}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card-surface rounded-3xl p-4 text-center">
            <span className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent"><MapPinned size={22} /></span>
            <p className="text-sm font-bold">Open Mehrabpur in Google Maps</p>
            <p className="mb-3 mt-1 text-xs text-muted">Every “Get Directions” button opens Google Maps with the place name and Mehrabpur.</p>
            <Button as="a" href={MEHRABPUR_MAPS_URL} target="_blank" rel="noreferrer" className="w-full">Open in Maps</Button>
          </div>
        </aside>
      </Container>

      {/* ───────── WELCOME / PHOTOS ───────── */}
      <Container className="mt-14">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Welcome to</p>
              <h2 className="font-display mt-1 text-3xl font-bold">Mehrabpur <span className="font-urdu text-2xl text-muted">{CITY.sindhi}</span></h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Mehrabpur is a city and taluka of Naushahro Feroze District, Sindh, on the Karachi–Peshawar railway line. It is known for Mehrabpur Junction and the Ghalla Mandi (grain & jaggery market).
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {[["Population (city, 2023)", "57,978"], ["Population (taluka, 2023)", "273,567"], ["Postal code", CITY.postal], ["Area code", CITY.areaCode], ["Station code", CITY.stationCode], ["District", "Naushahro Feroze"]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-bg-soft p-3"><dt className="text-[11px] text-muted">{k}</dt><dd className="text-base font-extrabold">{v}</dd></div>
                ))}
              </dl>
              <Button className="mt-6" onClick={() => nav("/explore")}>Explore Mehrabpur <ArrowRight size={16} /></Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
              <TiltCard className="col-span-2 row-span-2 sm:col-span-2"><figure className="relative h-full min-h-[300px] overflow-hidden rounded-3xl border border-line"><img src="/images/mhr_station_platform.jpg" alt="Mehrabpur Junction platform with canopy" className="absolute inset-0 h-full w-full object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-semibold text-white">Mehrabpur Junction</figcaption></figure></TiltCard>
              <TiltCard><figure className="relative h-full min-h-[140px] overflow-hidden rounded-2xl border border-line"><img src="/images/mhr_wall.jpg" alt="Mehrabpur City wall" className="absolute inset-0 h-full w-full object-cover" /></figure></TiltCard>
              <TiltCard><figure className="relative h-full min-h-[140px] overflow-hidden rounded-2xl border border-line"><img src="/images/mhr_mosque.jpg" alt="White mosque with domes in Mehrabpur" className="absolute inset-0 h-full w-full object-cover" /></figure></TiltCard>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* ───────── RAILWAY TEASER ───────── */}
      <Container className="mt-14">
        <div className="relative overflow-hidden rounded-3xl border border-line">
          <img src="/images/mhr_station_sign.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1410]/95 via-[#1c1410]/80 to-[#1c1410]/40" />
          <div className="relative grid gap-6 p-6 text-white sm:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-2"><TrainFront size={15} /> Mehrabpur Junction · MHR</p>
              <h2 className="font-display mt-2 text-3xl font-bold">Next trains at Mehrabpur</h2>
              <p className="mt-2 max-w-md text-sm text-white/75">18 stopping services daily (9 Up + 9 Down). Scheduled times only — delays are common.</p>
              <Button as={Link} to="/railway" className="mt-5">Full timetable <ArrowRight size={16} /></Button>
            </div>
            <ul className="space-y-2">
              {upcoming.map((t) => (
                <li key={t.no + t.dir} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <span className="flex h-10 w-14 items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold">{t.time}</span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{t.train} <span className="font-normal text-white/60">{t.no}</span></span><span className="block text-xs text-white/70">{t.route}</span></span>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold">{t.dir}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* ───────── EXPLORE GRID ───────── */}
      <Container className="mt-14">
        <SectionTitle title="Full Mehrabpur" accent="City Portal" sub="Home → Explore → Businesses → Doctors → Schools → Railway → Government → Agriculture → Villages → History → News → Map → Contact" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/doctors", "Stethoscope", "Doctors & Hospitals", "Clinics, labs, dental, ultrasound, blood bank."],
            ["/schools", "GraduationCap", "Schools & Colleges", "40+ educational centers in the taluka."],
            ["/railway", "TrainFront", "Railway Timetable", "9 Up + 9 Down trains at MHR."],
            ["/government", "ShieldCheck", "Government & Emergency", "Police, NADRA, SEPCO, SSGC, post office."],
            ["/agriculture", "Wheat", "Ghalla Mandi", "Grain, jaggery, fertilizer & traders."],
            ["/villages", "Trees", "Towns & Villages", "Khanwahan, Halani, Sialabad and more."],
            ["/history", "Landmark", "History & Landmarks", "Mir Mehrab Khan Jatoi, the station, canals."],
            ["/news", "Newspaper", "News & Events", "Local updates, jobs, notices."],
          ].map(([to, ic, t, d], i) => (
            <Reveal key={to} delay={i * 0.04}>
              <TiltCard max={7}>
                <Link to={to} className="group flex h-full flex-col gap-3 rounded-2xl card-surface p-5 transition hover:border-accent/60">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition group-hover:bg-accent group-hover:text-white"><Icon name={ic} size={22} /></span>
                  <h3 className="font-bold">{t}</h3>
                  <p className="text-sm text-muted">{d}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
