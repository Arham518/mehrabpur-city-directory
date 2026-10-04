import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { matchListing } from "./SearchBox";
import { ListingRow, EmptyState } from "./common";
import { cn } from "@/lib/utils";

/** Searchable list with optional sub-category chips. `items` are listing objects. */
export function DirectoryList({ items, chips, chipOf = (l) => l.sub, initial = 24, title }) {
  const [q, setQ] = useState("");
  const [chip, setChip] = useState("All");
  const [limit, setLimit] = useState(initial);

  const chipList = useMemo(() => {
    if (chips) return chips;
    const m = new Map();
    items.forEach((l) => m.set(chipOf(l), (m.get(chipOf(l)) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
  }, [items, chips, chipOf]);

  const shown = useMemo(() => items.filter((l) => matchListing(l, q) && (chip === "All" || (chips ? chips.find((c) => c.name === chip)?.match(l) : chipOf(l) === chip))), [items, q, chip, chips, chipOf]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-3.5 text-muted" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setLimit(initial); }} placeholder={`Search ${title || "this list"}…`} className="h-11 w-full rounded-full border border-line bg-card pl-11 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
        </div>
        <p className="text-sm text-muted"><b className="text-ink">{shown.length}</b> result{shown.length === 1 ? "" : "s"}</p>
      </div>
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
        {[{ name: "All", count: items.length }, ...chipList].map((c) => (
          <button key={c.name} disabled={c.count === 0} onClick={() => { setChip(c.name); setLimit(initial); }} className={cn("shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40", chip === c.name ? "border-accent bg-accent text-white" : "border-line bg-card text-ink hover:border-accent")}>
            {c.name} <span className={chip === c.name ? "text-white/80" : "text-muted"}>{c.count}</span>
          </button>
        ))}
      </div>
      {shown.length === 0 ? <EmptyState /> : (
        <div className="grid gap-3 lg:grid-cols-2">{shown.slice(0, limit).map((l) => <ListingRow key={l.id} l={l} />)}</div>
      )}
      {shown.length > limit && (
        <div className="mt-6 text-center"><button onClick={() => setLimit((n) => n + initial)} className="cursor-pointer rounded-xl border border-line bg-card px-5 py-2.5 text-sm font-bold hover:border-accent hover:text-accent">Show more ({shown.length - limit} left)</button></div>
      )}
    </div>
  );
}
