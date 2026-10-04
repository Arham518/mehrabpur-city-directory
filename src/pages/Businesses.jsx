import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import PageShell from "@/components/Shell";
import ListingCard from "@/components/ListingCard";
import { PageHeading } from "@/components/Ui";
import { CATEGORY_GROUPS } from "@/data/categories";
import { AREAS_IN_DATA, CONFIDENCE, LISTINGS, matchListing } from "@/data/listings";
import { usePageMeta } from "@/hooks/usePageMeta";

const PAGE = 24;

export function Filters({ params, set, areas, showCat = true, subs }) {
  const q = params.get("q") || "";
  return (
    <div className="panel mb-4 grid gap-3 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
      <div className="relative sm:col-span-2 xl:col-span-1">
        <label htmlFor="f-q" className="sr-only">Search listings</label>
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input id="f-q" className="field pl-9 pr-8" placeholder="Name, area, phone..." value={q} onChange={(e) => set("q", e.target.value)} />
        {q && <button type="button" onClick={() => set("q", "")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-ink"><X size={14} /></button>}
      </div>
      {showCat && (
        <div>
          <label htmlFor="f-cat" className="sr-only">Category</label>
          <select id="f-cat" className="field" value={params.get("cat") || ""} onChange={(e) => set("cat", e.target.value)}>
            <option value="">All categories</option>
            {CATEGORY_GROUPS.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </div>
      )}
      {subs && (
        <div>
          <label htmlFor="f-sub" className="sr-only">Type</label>
          <select id="f-sub" className="field" value={params.get("sub") || ""} onChange={(e) => set("sub", e.target.value)}>
            <option value="">All types</option>
            {subs.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="f-area" className="sr-only">Area</label>
        <select id="f-area" className="field" value={params.get("area") || ""} onChange={(e) => set("area", e.target.value)}>
          <option value="">All areas</option>
          {areas.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-conf" className="sr-only">Verification</label>
        <select id="f-conf" className="field" value={params.get("conf") || ""} onChange={(e) => set("conf", e.target.value)}>
          <option value="">Any verification</option>
          {Object.entries(CONFIDENCE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-2 text-[13.5px] sm:col-span-2 xl:col-span-4">
        <input type="checkbox" className="h-4 w-4 accent-[var(--accent)]" checked={params.get("phone") === "1"} onChange={(e) => set("phone", e.target.checked ? "1" : "")} />
        Only listings with a phone number
      </label>
    </div>
  );
}

export function useListingFilter(base, params) {
  return useMemo(() => {
    const q = params.get("q") || "", cat = params.get("cat") || "", area = params.get("area") || "", conf = params.get("conf") || "", phone = params.get("phone") === "1", sub = params.get("sub") || "";
    return base.filter((l) => (!cat || l.category === cat) && (!area || l.area === area) && (!conf || l.confidence === conf) && (!phone || l.phone) && (!sub || l.sub === sub) && matchListing(l, q));
  }, [base, params]);
}

export function ListingGrid({ items }) {
  const [shown, setShown] = useState(PAGE);
  const list = items.slice(0, shown);
  if (!items.length) return <div className="panel p-8 text-center text-muted">No listings match these filters. Clear a filter or try another word.</div>;
  return (
    <>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">{list.map((l) => <ListingCard key={l.id} l={l} />)}</div>
      {shown < items.length && (
        <div className="mt-5 text-center">
          <button type="button" className="btn btn-outline" onClick={() => setShown((s) => s + PAGE)}>Show more ({items.length - shown} left)</button>
        </div>
      )}
    </>
  );
}

export function useSetParam() {
  const [params, setParams] = useSearchParams();
  const set = (k, v) => { const n = new URLSearchParams(params); if (v) n.set(k, v); else n.delete(k); setParams(n, { replace: true }); };
  return [params, set, () => setParams({}, { replace: true })];
}

export default function Businesses() {
  usePageMeta("Business directory", "Search every business, clinic, school, bank and office listed for Mehrabpur, with sources and verification status.");
  const [params, set, clear] = useSetParam();
  const items = useListingFilter(LISTINGS, params);
  const active = params.get("cat") || undefined;
  const hasFilter = [...params.keys()].length > 0;
  return (
    <PageShell active={active}>
      <PageHeading title="Business directory" sub="Every listing shows where it came from. “Needs verification” means only a name was found." />
      <Filters params={params} set={set} areas={AREAS_IN_DATA} />
      <div className="mb-3 flex items-center justify-between text-[13px] text-muted" aria-live="polite">
        <span><strong className="text-ink">{items.length}</strong> of {LISTINGS.length} listings</span>
        {hasFilter && <button type="button" onClick={clear} className="font-semibold text-accent hover:underline">Clear filters</button>}
      </div>
      <ListingGrid key={params.toString()} items={items} />
    </PageShell>
  );
}
