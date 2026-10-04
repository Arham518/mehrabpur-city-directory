import { Link, NavLink } from "react-router-dom";
import { ChevronRight, ExternalLink, Phone, Search, Train } from "lucide-react";
import { CatIcon } from "./Ui";
import { CATEGORY_GROUPS, groupRoute } from "@/data/categories";
import { countByGroup, FEATURED, STATS } from "@/data/listings";
import { MEHRABPUR_MAPS_URL, telHref } from "@/lib/maps";
import { cn } from "@/lib/utils";

/** Left: All Categories (sticky list on desktop) */
const NAVNAME = { doctors: "Doctors & Hospitals", schools: "Schools & Colleges", fuel: "Fuel Stations", food: "Food & Sweets", shops: "Shops & Markets", showrooms: "Showrooms & Auto", hotels: "Hotels & Halls", banks: "Banks & ATMs", pharmacies: "Pharmacies", recreation: "Parks & Gyms", masjids: "Masjids", transport: "Transport", govt: "Government", agri: "Agriculture", tech: "Mobile & Internet", services: "Services" };

export function CategorySidebar() {
  return (
    <nav aria-label="All categories" className="panel overflow-hidden">
      <div className="panel-head"><h2 className="h-title">All Categories</h2></div>
      <ul>
        {CATEGORY_GROUPS.map((g) => (
          <li key={g.id} className="border-b border-line last:border-0">
            <NavLink
              to={groupRoute(g)}
              className={({ isActive }) => cn("flex items-center gap-3 px-3.5 py-2 text-[13.5px] hover:bg-soft", isActive && g.route && "bg-accent-soft font-semibold")}
            >
              <CatIcon group={g} size={28} />
              <span className="min-w-0 flex-1 truncate">{NAVNAME[g.id] || g.label}</span>
              <span className="text-[12px] tabular-nums text-muted">{countByGroup(g.id)}</span>
              <ChevronRight size={14} className="text-muted" aria-hidden="true" />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Mobile/tablet replacement for the sidebar: horizontally scrollable chips */
export function CategoryChips({ active }) {
  return (
    <nav aria-label="Categories" className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden">
      <Link to="/businesses" className={cn("chip shrink-0 !px-3 !py-1.5 !text-[13px]", !active && "border-accent bg-accent-soft !text-accent")}>All</Link>
      {CATEGORY_GROUPS.map((g) => (
        <Link key={g.id} to={groupRoute(g)} className={cn("chip shrink-0 !px-3 !py-1.5 !text-[13px] !text-ink", active === g.id && "border-accent bg-accent-soft !text-accent")}>
          <span className="h-2 w-2 rounded-full" style={{ background: g.color }} aria-hidden="true" />
          {g.short}
        </Link>
      ))}
    </nav>
  );
}

/** Right: Quick Search, Featured, Maps card */
export function RightRail() {
  const quick = [
    ["Doctors near Thari Road", "/businesses?cat=doctors&q=thari"],
    ["Banks on Station Road", "/businesses?cat=banks"],
    ["Schools & colleges", "/schools"],
    ["Ghalla Mandi traders", "/agriculture"],
    ["24-hour places", "/businesses?q=24+hours"],
    ["Listings with phone number", "/businesses?phone=1"],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 xl:content-start">
      <section className="panel overflow-hidden" aria-labelledby="qs">
        <div className="panel-head"><h2 id="qs" className="h-title">Quick Search</h2></div>
        <ul>
          {quick.map(([label, to]) => (
            <li key={label} className="border-b border-line last:border-0">
              <Link to={to} className="flex items-center gap-2 px-4 py-2 text-[13.5px] hover:bg-soft hover:text-accent">
                <Search size={13} className="text-muted" aria-hidden="true" />
                <span className="flex-1">{label}</span>
                <ChevronRight size={14} className="text-muted" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel overflow-hidden" aria-labelledby="fl">
        <div className="panel-head"><h2 id="fl" className="h-title">Featured Listings</h2><Link to="/businesses?phone=1" className="text-[12.5px] font-semibold text-accent hover:underline">View all</Link></div>
        <ul>
          {FEATURED.slice(4, 8).map((l) => (
            <li key={l.id} className="border-b border-line last:border-0">
              <div className="flex items-center gap-3 px-4 py-2.5">
                <CatIcon group={l.category} size={34} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-semibold">{l.name}</p>
                  <p className="truncate text-[12px] text-muted">{l.sub} · {l.area}</p>
                </div>
                {l.phone && (
                  <a href={telHref(l.phone)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-accent hover:bg-accent-soft" aria-label={`Call ${l.name}`}>
                    <Phone size={14} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel overflow-hidden sm:col-span-2 xl:col-span-1" aria-labelledby="gm">
        <div className="panel-head"><h2 id="gm" className="h-title">Google Maps</h2></div>
        <div className="p-4">
          <p className="text-[13px] text-muted">Open Mehrabpur in Google Maps for live traffic and street view. {STATS.withCoords} of {STATS.total} listings here have coordinates.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={MEHRABPUR_MAPS_URL} target="_blank" rel="noreferrer noopener" className="btn btn-primary btn-sm">Open in Maps <ExternalLink size={13} /></a>
            <Link to="/map" className="btn btn-outline btn-sm">Portal map</Link>
            <Link to="/railway" className="btn btn-outline btn-sm"><Train size={13} /> Trains</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/** 3-column page shell. Left sidebar only >= lg, right rail beside content >= xl, otherwise stacked below. */
export default function PageShell({ children, active, rail = true, side = true }) {
  return (
    <div className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6">
      {side && <CategoryChips active={active} />}
      <div
        className={cn(
          "grid gap-5",
          side && rail && "lg:grid-cols-[236px_minmax(0,1fr)] xl:grid-cols-[236px_minmax(0,1fr)_290px]",
          side && !rail && "lg:grid-cols-[236px_minmax(0,1fr)]",
          !side && rail && "xl:grid-cols-[minmax(0,1fr)_290px]",
        )}
      >
        {side && (
          <aside className="hidden lg:row-span-2 lg:block xl:row-span-1">
            <div className="sticky top-20"><CategorySidebar /></div>
          </aside>
        )}
        <div className={cn("min-w-0", side && "lg:col-start-2 lg:row-start-1")}>{children}</div>
        {rail && (
          <aside className={cn("min-w-0", side && "lg:col-start-2 lg:row-start-2 xl:col-start-3 xl:row-start-1", !side && "xl:col-start-2")}>
            <RightRail />
          </aside>
        )}
      </div>
    </div>
  );
}
