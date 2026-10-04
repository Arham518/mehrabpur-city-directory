import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Minus, MapPin } from "lucide-react";
import { Hero3DLazy } from "./Hero3DLazy";
import { getGroup } from "@/data/categories";
import { Icon } from "@/lib/icons";

// stylised pins (percent positions) — a decorative preview of the real map page
const PINS = [
  { g: "doctors", x: 62, y: 30 }, { g: "schools", x: 24, y: 28 }, { g: "fuel", x: 38, y: 72 },
  { g: "food", x: 74, y: 62 }, { g: "banks", x: 50, y: 44 }, { g: "transport", x: 82, y: 38 },
  { g: "hotels", x: 18, y: 58 }, { g: "masjids", x: 56, y: 82 },
];

export function MapPreview() {
  return (
    <div className="relative">
      <div className="relative h-[300px] overflow-hidden rounded-3xl border border-line bg-[#efe9df] shadow-soft dark:bg-[#241e18] sm:h-[340px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 340" preserveAspectRatio="none" aria-hidden>
          <rect width="400" height="340" className="fill-[#efe9df] dark:fill-[#241e18]" />
          <path d="M0 230 C90 210 120 250 210 220 S340 180 400 205 L400 340 L0 340Z" className="fill-[#dfeadb] dark:fill-[#2a3326]" />
          <path d="M280 0 C300 60 250 110 290 170 S340 250 330 340 L400 340 L400 0Z" className="fill-[#d6e7ef] dark:fill-[#1f2f38]" opacity=".8" />
          <g className="stroke-white dark:stroke-[#3a2f26]" strokeWidth="9" strokeLinecap="round" fill="none">
            <path d="M-10 120 L410 150" /><path d="M120 -10 L150 350" /><path d="M-10 260 L410 90" /><path d="M250 -10 L210 350" />
          </g>
          <g className="stroke-[#f3c9a5] dark:stroke-[#5a3b22]" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M-10 60 L410 80" /><path d="M60 -10 L90 350" /><path d="M330 -10 L360 350" /><path d="M-10 190 L410 175" />
          </g>
        </svg>
        <p className="absolute left-1/2 top-[44%] -translate-x-1/2 rounded bg-white/70 px-1.5 text-[10px] font-bold uppercase tracking-widest text-muted dark:bg-black/40">City Centre</p>
        {PINS.map((p, i) => {
          const g = getGroup(p.g);
          return (
            <motion.span key={i} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07, type: "spring" }} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-white shadow-lg" style={{ background: g.color }}><Icon name={g.icon} size={13} /></span>
            </motion.span>
          );
        })}
        {/* your location */}
        <div className="absolute left-[44%] top-[56%] -translate-x-1/2 -translate-y-full">
          <span className="relative flex h-5 w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-white bg-accent shadow-lg" />
          </span>
          <span className="absolute left-6 top-0 whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">Your location</span>
        </div>
        <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow">
          <Link to="/map" aria-label="Zoom in" className="flex h-8 w-8 items-center justify-center hover:bg-accent-soft"><Plus size={15} /></Link>
          <Link to="/map" aria-label="Zoom out" className="flex h-8 w-8 items-center justify-center border-t border-line hover:bg-accent-soft"><Minus size={15} /></Link>
        </div>
        <Link to="/map" className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl border border-line bg-card/95 px-3 py-1.5 text-xs font-bold shadow backdrop-blur hover:text-accent"><MapPin size={13} className="text-accent" /> Open interactive map</Link>
      </div>
      <Hero3DLazy className="pointer-events-none absolute -right-3 -top-12 h-32 w-32 sm:-right-5 sm:-top-14 sm:h-40 sm:w-40" />
    </div>
  );
}
