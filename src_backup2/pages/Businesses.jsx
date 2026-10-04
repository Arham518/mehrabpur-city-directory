import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, BadgeCheck, Phone, Star } from "lucide-react";
import { Container, PageHero, ListingRow, EmptyState } from "@/components/common";
import { matchListing } from "@/components/SearchBox";
import { CATEGORY_GROUPS } from "@/data/categories";
import { LISTINGS, AREAS_IN_DATA } from "@/data/listings";
import { DATA_NOTE } from "@/data/city";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const PAGE = 30;

export default function Businesses() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const cat = sp.get("cat") || "all";
  const area = sp.get("area") || "all";
  const sort = sp.get("sort") || "name";
  const verified = sp.get("verified") === "1";
  const phoneOnly = sp.get("phone") === "1";
  const [limit, setLimit] = useState(PAGE);

  const set = (k, v) => {
    const n = new URLSearchParams(sp);
    if (v === "" || v === "all" || v === false) n.delete(k); else n.set(k, v === true ? "1" : v);
    setSp(n, { replace: true });
    setLimit(PAGE);
  };

  const list = useMemo(() => {
    let r = LISTINGS.filter((l) => matchListing(l, q) && (cat === "all" || l.category === cat) && (area === "all" || l.area === area) && (!verified || l.verified) && (!phoneOnly || l.phones.length));
    r = [...r].sort(sort === "rating" ? (a, b) => (b.rating ?? -1) - (a.rating ?? -1) || a.name.localeCompare(b.name) : (a, b) => a.name.localeCompare(b.name));
    return r;
  }, [q, cat, area, sort, verified, phoneOnly]);

  const toggle = (on, onClick, icon, label) => (
    <button onClick={onClick} className={cn("flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition", on ? "border-accent bg-accent text-white" : "border-line bg-card hover:border-accent")}>{icon}{label}</button>
  );

  return (
    <>
      <PageHero eyebrow="Business Directory" icon="Store" title="Mehrabpur" accent="Businesses" urdu="کاروباری ڈائریکٹری" text={`Search all ${LISTINGS.length} listings by name, category, area, address or phone. Filter by category, area, phone availability and source status.`} image="/images/mhr_wall.jpg" />
      <Container className="py-8">
        <div className="card-surface rounded-3xl p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_170px]">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-3.5 text-muted" />
              <input value={q} onChange={(e) => set("q", e.target.value)} placeholder="Search name, area, phone, category…" className="h-11 w-full rounded-xl border border-line bg-bg pl-11 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
            </div>
            <select value={area} onChange={(e) => set("area", e.target.value)} className="h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-accent" aria-label="Area">
              <option value="all">All areas</option>
              {AREAS_IN_DATA.map((a) => <option key={a}>{a}</option>)}
            </select>
            <select value={sort} onChange={(e) => set("sort", e.target.value)} className="h-11 rounded-xl border border-line bg-bg px-3 text-sm outline-none focus:border-accent" aria-label="Sort">
              <option value="name">Sort: Name A–Z</option>
              <option value="rating">Sort: Top rated</option>
            </select>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SlidersHorizontal size={15} className="text-muted" />
            {toggle(verified, () => set("verified", !verified), <BadgeCheck size={13} />, "Source listed only")}
            {toggle(phoneOnly, () => set("phone", !phoneOnly), <Phone size={13} />, "Has phone")}
            {toggle(sort === "rating", () => set("sort", sort === "rating" ? "name" : "rating"), <Star size={13} />, "Top rated")}
            <span className="ml-auto text-sm text-muted"><b className="text-ink">{list.length}</b> places</span>
          </div>
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => set("cat", "all")} className={cn("shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-bold", cat === "all" ? "border-accent bg-accent text-white" : "border-line bg-card hover:border-accent")}>All</button>
            {CATEGORY_GROUPS.map((g) => (
              <button key={g.id} onClick={() => set("cat", g.id)} className={cn("flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold", cat === g.id ? "border-transparent text-white" : "border-line bg-card hover:border-accent")} style={cat === g.id ? { background: g.color } : undefined}>
                <Icon name={g.icon} size={13} />{g.short}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {list.length === 0 ? <EmptyState /> : <div className="grid gap-3 lg:grid-cols-2">{list.slice(0, limit).map((l) => <ListingRow key={l.id} l={l} />)}</div>}
          {list.length > limit && <div className="mt-6 text-center"><button onClick={() => setLimit((n) => n + PAGE)} className="cursor-pointer rounded-xl border border-line bg-card px-5 py-2.5 text-sm font-bold hover:border-accent hover:text-accent">Show more ({list.length - limit} left)</button></div>}
        </div>
        <p className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-muted"><b className="text-ink">Data note:</b> {DATA_NOTE}</p>
      </Container>
    </>
  );
}
