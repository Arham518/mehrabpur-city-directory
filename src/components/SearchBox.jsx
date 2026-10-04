import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ className = "", compact = false, onDone }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const go = (e) => {
    e.preventDefault();
    nav(q.trim() ? `/businesses?q=${encodeURIComponent(q.trim())}` : "/businesses");
    onDone?.();
  };
  return (
    <form onSubmit={go} role="search" className={`flex w-full ${className}`}>
      <label className="sr-only" htmlFor={compact ? "search-compact" : "search-main"}>Search Mehrabpur</label>
      <div className="relative min-w-0 flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <input
          id={compact ? "search-compact" : "search-main"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search doctors, schools, banks, shops..."
          className="h-10 w-full rounded-l-lg border-0 bg-white pl-9 pr-3 text-[14px] text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent"
          autoComplete="off"
        />
      </div>
      <button type="submit" className="h-10 shrink-0 rounded-r-lg bg-accent px-4 text-[14px] font-semibold text-white hover:bg-accent-hover dark:text-[#06101f]">
        <span className="hidden sm:inline">Search</span>
        <Search size={16} className="sm:hidden" aria-label="Search" />
      </button>
    </form>
  );
}
