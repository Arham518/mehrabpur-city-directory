import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MapPin, Menu, X, ChevronRight } from "lucide-react";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
import { CatIcon } from "./Ui";
import { CATEGORY_GROUPS, groupRoute } from "@/data/categories";
import { countByGroup } from "@/data/listings";

export const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/explore", label: "About Mehrabpur" },
  { to: "/businesses", label: "Directory" },
  { to: "/railway", label: "Railway" },
  { to: "/map", label: "Map" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];
const MORE = [
  { to: "/categories", label: "All categories" },
  { to: "/villages", label: "Towns & villages" },
  { to: "/history", label: "History" },
  { to: "/sources", label: "Sources & credits" },
];

export function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex min-w-0 items-center gap-2.5 ${className}`} aria-label="Mehrabpur City Portal, home">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e5484d] text-white" aria-hidden="true">
        <MapPin size={19} strokeWidth={2.4} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[17px] font-extrabold tracking-tight text-white">Mehrabpur <span className="font-semibold text-white/80">City Portal</span></span>
        <span className="block truncate text-[11.5px] text-white/60">Find everything near you · <span className="urdu" lang="ur">محراب پور</span></span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-line bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center gap-3 px-4 sm:px-6">
        <Logo className="lg:w-[250px] lg:shrink-0" />
        <div className="hidden min-w-0 flex-1 lg:block xl:max-w-[560px]">
          <SearchBox compact />
        </div>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `rounded-md px-2.5 py-2 text-[13.5px] font-medium transition-colors whitespace-nowrap ${isActive ? "bg-white/12 text-white" : "text-white/75 hover:bg-white/8 hover:text-white"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-navy-line bg-white/5 text-white hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className="border-t border-navy-line px-4 pb-3 pt-2.5 lg:hidden sm:px-6">
        <SearchBox />
      </div>

      {open && (
        <div className="fixed inset-0 top-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" id="mobile-drawer">
          <button type="button" className="absolute inset-0 bg-black/55" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(86vw,340px)] flex-col overflow-y-auto border-l border-navy-line bg-navy">
            <div className="flex h-16 items-center justify-between border-b border-navy-line px-4">
              <span className="text-[15px] font-bold">Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-navy-line" aria-label="Close menu"><X size={18} /></button>
            </div>
            <nav aria-label="Mobile" className="p-2">
              {[...NAV, ...MORE].map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `flex items-center justify-between rounded-md px-3 py-2.5 text-[14.5px] ${isActive ? "bg-white/12 font-semibold" : "text-white/85 hover:bg-white/8"}`}>
                  {n.label}<ChevronRight size={15} className="opacity-50" />
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-navy-line p-2">
              <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-wider text-white/50">Categories</p>
              {CATEGORY_GROUPS.map((g) => (
                <Link key={g.id} to={groupRoute(g)} className="flex items-center gap-3 rounded-md px-3 py-2 text-[14px] text-white/85 hover:bg-white/8">
                  <CatIcon group={g} size={26} />
                  <span className="min-w-0 flex-1 truncate">{g.label}</span>
                  <span className="text-[12px] text-white/50">{countByGroup(g.id)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
