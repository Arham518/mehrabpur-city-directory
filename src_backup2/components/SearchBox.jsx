import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { LISTINGS } from "@/data/listings";
import { getGroup } from "@/data/categories";
import { cn } from "@/lib/utils";

export const matchListing = (l, q) => {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  const hay = `${l.name} ${l.sub} ${l.area} ${l.address || ""} ${l.categoryLabel} ${l.phone || ""}`.toLowerCase();
  return t.split(/\s+/).every((w) => hay.includes(w));
};

export function SearchBox({ className, placeholder = "Search for doctors, schools, shops, pumps, hotels, or any place...", autoFocus }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const results = useMemo(() => (q.trim().length < 2 ? [] : LISTINGS.filter((l) => matchListing(l, q)).slice(0, 7)), [q]);

  useEffect(() => {
    const fn = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const go = (e) => {
    e?.preventDefault();
    setOpen(false);
    nav(`/businesses${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
  };

  return (
    <form ref={box} onSubmit={go} className={cn("relative w-full", className)} role="search">
      <input
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        aria-label="Search places in Mehrabpur"
        className="h-11 w-full rounded-full border border-line bg-card pl-5 pr-12 text-sm text-ink shadow-sm outline-none transition placeholder:text-muted/80 focus:border-accent focus:ring-2 focus:ring-accent/25"
      />
      <button type="submit" aria-label="Search" className="absolute right-1.5 top-1.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-accent hover:text-white">
        <Search size={17} />
      </button>
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
          {results.map((l) => {
            const g = getGroup(l.category);
            return (
              <li key={l.id}>
                <button type="button" onClick={() => { setOpen(false); nav(`/businesses?q=${encodeURIComponent(l.name)}`); }} className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-accent-soft">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ background: g.color }}><MapPin size={14} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{l.name}</span>
                    <span className="block truncate text-xs text-muted">{l.sub} · {l.area}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
