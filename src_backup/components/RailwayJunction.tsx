import React, { useState } from "react";
import { TRAINS_DATA } from "../data/mehrabpurData";
import { Train, Search, Phone, Printer, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface RailwayJunctionProps {
  language: "en" | "ur";
}

export const RailwayJunction: React.FC<RailwayJunctionProps> = ({ language: _language }) => {
  const [filterDirection, setFilterDirection] = useState<"ALL" | "UP" | "DOWN">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrains = TRAINS_DATA.filter((train) => {
    const matchesDirection = filterDirection === "ALL" || train.direction === filterDirection;
    const matchesSearch =
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.nameUrdu.includes(searchQuery) ||
      train.to.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDirection && matchesSearch;
  });

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col gap-8 sm:gap-12 pb-16 animate-fade-scale">
      
      {/* Sovereign Railway Header Banner — Light in Light Mode, Dark in Dark Mode */}
      <section className="relative overflow-hidden isolate rounded-lg bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-slate-200/30 dark:bg-slate-800/20 blur-2xl pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="relative z-10 max-w-5xl flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded font-bold uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              MAIN LINE-1 (ML-1) • MILEPOST 412
            </span>
            <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
              PAKISTAN RAILWAYS • SUKKUR DIVISION
            </span>
            <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-50 text-slate-700 border border-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 font-mono">
              ESTABLISHED 1914
            </span>
            <span className="hidden sm:inline-block ml-auto text-xs text-slate-500 dark:text-slate-400 font-mono">
              28.106° N, 68.745° E • 2 Through-Platforms
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-urdu leading-tight">
              محراب پور جنکشن
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white leading-[1.15]">
              MEHRABPUR JUNCTION (MHR)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mt-1 font-normal">
              18 Daily Express Stopping Services linking Karachi directly with Lahore, Rawalpindi, Peshawar, Multan, and Jacobabad. Central passenger &amp; freight junction connecting Taluka Mehrabpur, Halani, Behlani, and Northern Naushahro Feroze.
            </p>
          </div>

          {/* Action Helplines (3D Tactile Buttons, Zero Yellow) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="tel:117"
              className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_3px_8px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Dial 117 PR Helpline</span>
            </a>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0.5 shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Timetable</span>
            </button>
          </div>
        </div>
      </section>

      {/* Railway Landmark Context Cards (3D Squarish Boxes with Hover Scale) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Real Station Board Landmark */}
        <div className="relative rounded-lg overflow-hidden shadow-xs border border-slate-200/70 dark:border-slate-800/70 h-60 bg-slate-100 dark:bg-slate-900 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group">
          <img
            src="/images/mhr_station_board.jpg"
            alt="Official Mehrabpur Railway Station Name Board on Track"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 flex items-center gap-1.5">
              <Train className="w-3.5 h-3.5" /> Official Railway Landmark
            </span>
            <h3 className="text-lg font-bold font-['Outfit']">محراب پور — Station Board &amp; ML-1 Tracks</h3>
            <p className="text-xs text-slate-300 mt-0.5">Iconic bilingual sign along the ML-1 Karachi-Peshawar mainline tracks</p>
          </div>
        </div>

        {/* Real Platform & Canopy Overhead View */}
        <div className="relative rounded-lg overflow-hidden shadow-xs border border-slate-200/70 dark:border-slate-800/70 h-60 bg-slate-100 dark:bg-slate-900 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group">
          <img
            src="/images/mhr_station_platform.jpg"
            alt="Mehrabpur Junction Platforms and Canopy Overhead View"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Junction Architecture
            </span>
            <h3 className="text-lg font-bold font-['Outfit']">Platform 1 &amp; Canopy Roof</h3>
            <p className="text-xs text-slate-300 mt-0.5">Dual through-lines, passenger footbridge, and heritage colonial shelter</p>
          </div>
        </div>

      </section>

      {/* Timetable Interactive Search & Direction Filter */}
      <section className="flex flex-col gap-6">
        
        {/* Search & Filter Bar (3D Tactile Container) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search train (e.g. Tezgam, 25 UP, Awam, Multan, Lahore, Rawalpindi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
            />
          </div>

          {/* Direction Filter Buttons (3D Keycaps, Zero Yellow) */}
          <div className="flex items-center gap-1.5 p-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setFilterDirection("ALL")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filterDirection === "ALL"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All Services (18)
            </button>
            <button
              onClick={() => setFilterDirection("UP")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filterDirection === "UP"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              UP (To North)
            </button>
            <button
              onClick={() => setFilterDirection("DOWN")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filterDirection === "DOWN"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              DOWN (To Karachi)
            </button>
          </div>
        </div>

        {/* Timetable Table in Desktop & Responsive on Mobile (Thin Delicate Border, Zero Yellow) */}
        <div className="overflow-x-auto rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                <th className="py-3.5 px-5">Train &amp; Number</th>
                <th className="py-3.5 px-5">Route Corridor</th>
                <th className="py-3.5 px-5">MHR Stop &amp; Time</th>
                <th className="py-3.5 px-5">Frequency</th>
                <th className="py-3.5 px-5">Platform</th>
                <th className="py-3.5 px-5">Accommodations</th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {filteredTrains.map((train, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center font-bold font-mono text-xs border border-slate-200/60 dark:border-slate-700/60">
                        {train.number.split(" ")[0]}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block text-sm">
                          {train.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                          {train.number}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-slate-100">
                      <span>{train.from}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span>{train.to}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                      {train.route}
                    </span>
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-900 dark:text-white">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{train.mhrTime}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Halt: {train.stopDuration}
                    </span>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px] uppercase border border-slate-200/60 dark:border-slate-700/60">
                      {train.frequency}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {train.platform}
                  </td>

                  <td className="py-3.5 px-5">
                    <div className="flex flex-wrap gap-1">
                      {train.classes.map((cls, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Operational</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

    </div>
  );
};
