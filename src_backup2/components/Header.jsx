import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, LayoutGrid, Map as MapIcon, LocateFixed, Menu, X, MapPin, ChevronRight } from "lucide-react";
import { SearchBox } from "./SearchBox";
import { ThemeToggle } from "./ui/theme-toggle";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/map", label: "Map", icon: MapIcon },
];
export const ALL_PAGES = [
  ["/explore", "Explore Mehrabpur"],
  ["/businesses", "Business Directory"],
  ["/doctors", "Doctors & Hospitals"],
  ["/schools", "Schools & Colleges"],
  ["/railway", "Railway — Mehrabpur Junction"],
  ["/government", "Government & Emergency"],
  ["/agriculture", "Agriculture & Ghalla Mandi"],
  ["/villages", "Towns & Villages"],
  ["/history", "History & Landmarks"],
  ["/news", "News & Events"],
  ["/contact", "Contact"],
];

export function Logo({ className }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)} aria-label="Mehrabpur CityGuide home">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-[0_8px_18px_-6px_var(--accent)]">
        <MapPin size={22} fill="currentColor" strokeWidth={1.5} />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-extrabold tracking-tight text-ink">CityGuide</span>
        <span className="block text-[11px] font-medium text-muted">Find Everything Near You · <span className="font-urdu text-[11px]">محرابپور</span></span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 lg:px-6">
        <Logo className="shrink-0" />
        <div className="hidden min-w-0 flex-1 md:block lg:px-4"><SearchBox /></div>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {MAIN_NAV.map(({ to, label, icon: I, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => cn("relative flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors", isActive ? "text-accent" : "text-muted hover:text-ink")}>
              {({ isActive }) => (<>
                <I size={16} />{label}
                {isActive && <motion.span layoutId="navline" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-accent" />}
              </>)}
            </NavLink>
          ))}
          <button onClick={() => nav("/map?locate=1")} className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink">
            <LocateFixed size={16} /> My Location
          </button>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0 lg:ml-2">
          <ThemeToggle />
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-line bg-card text-ink transition hover:border-accent hover:text-accent">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="px-4 pb-3 md:hidden"><SearchBox /></div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-2xl">
            <div className="mx-auto grid max-w-[1400px] gap-1 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
              {[...MAIN_NAV.map((n) => [n.to, n.label]), ["/map?locate=1", "My Location"], ...ALL_PAGES].map(([to, label]) => (
                <Link key={to} to={to} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-accent-soft hover:text-accent">
                  {label}<ChevronRight size={16} className="text-muted" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
