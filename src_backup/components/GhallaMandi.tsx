import React, { useState } from "react";
import { COMMODITIES_DATA, MANDI_BUSINESSES } from "../data/mehrabpurData";
import { 
  Wheat, TrendingUp, TrendingDown, Minus, Clock, Store, 
  MapPin, Phone, Search, CheckCircle2, ArrowRight
} from "lucide-react";

interface GhallaMandiProps {
  language: "en" | "ur";
}

export const GhallaMandi: React.FC<GhallaMandiProps> = ({ language: _language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Registries" },
    { id: "traders", label: "Grain & Gur Commission" },
    { id: "fertilizers", label: "Agro Chemicals & Seeds" },
    { id: "cotton", label: "Cotton Ginning & Mills" },
    { id: "machinery", label: "Tractors & Implements" },
    { id: "storage", label: "Cold Storage & Godowns" },
  ];

  const filteredBusinesses = MANDI_BUSINESSES.filter((biz) => {
    const matchesCategory = selectedCategory === "all" || biz.category === selectedCategory;
    const matchesSearch =
      biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col gap-8 sm:gap-12 pb-16 animate-fade-scale">
      
      {/* 24H Live Mandi Spot Quotations Ticker (Terminal Style) */}
      <div className="w-full max-w-full bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-white py-3 px-4 sm:px-5 rounded-lg shadow-xs border border-slate-200/70 dark:border-slate-800/70 flex flex-col md:flex-row items-center justify-between gap-3 transition-colors duration-250">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-slate-900 dark:text-white font-mono uppercase tracking-wider font-bold text-xs">
            MANDI 24H SPOT TICKER
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden md:inline">|</span>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto min-w-0 flex-1 max-w-full py-1 scrollbar-none whitespace-nowrap text-xs touch-pan-x">
          {COMMODITIES_DATA.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-800">
              <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}:</span>
              <span className="text-slate-900 dark:text-white font-bold font-mono">Rs {item.price.toLocaleString()}</span>
              {item.change === "up" && (
                <span className="flex items-center text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {item.changeAmount}
                </span>
              )}
              {item.change === "flat" && (
                <span className="flex items-center text-[10px] font-mono text-slate-400">
                  <Minus className="w-3 h-3 mr-0.5" />
                  Stable
                </span>
              )}
              {item.change === "down" && (
                <span className="flex items-center text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                  {item.changeAmount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>AUCTION CLOSE: 18:30 PKT</span>
        </div>
      </div>

      {/* Hero Banner with Standardized Heading Hierarchy */}
      <section className="relative overflow-hidden isolate rounded-lg bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-slate-200/30 dark:bg-slate-800/20 blur-2xl pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded font-bold uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs font-mono">
                GRAIN &amp; GUR REGISTRY
              </span>
              <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
                STATION ROAD TERMINAL
              </span>
              <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-50 text-slate-700 border border-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 font-mono">
                120+ COMMISSION HOUSES
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-urdu leading-tight">
                غلہ منڈی و زرعی تجارتی مرکز
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white leading-[1.15]">
                GHALLA MANDI &amp; AGRI TRADE HUB
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                Sindh's high-volume agricultural commodity terminal. Transacting over 142,000 Metric Tons of premium wheat, aromatic Sindhi Basmati paddy, artisanal sugarcane jaggery (gur), rape seed mustard, and agrochemicals annually.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#mandi-directory"
                className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_3px_8px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2 font-mono"
              >
                <Store className="w-4 h-4" />
                <span>Explore 9 Registered Arthi Agencies</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Authentic Photograph Showcase (3D Squarish Box) */}
          <div className="lg:col-span-5 relative rounded-lg overflow-hidden shadow-xs border border-slate-200/70 dark:border-slate-800/70 h-64 bg-slate-100 dark:bg-slate-950 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group">
            <img
              src="/images/mhr_ghalla_mandi.jpg"
              alt="Ghalla Mandi Trading Yard Station Road Terminal Mehrabpur"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-300">
                HISTORIC TRADING YARD
              </span>
              <h3 className="text-base font-bold font-['Outfit']">Station Road Terminal Complex</h3>
              <p className="text-xs text-slate-300 mt-0.5">Jute sacks of golden wheat grain and traditional weighbridges</p>
            </div>
          </div>

        </div>

        {/* Statistical Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">ANNUAL VOLUME</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">142,000 MT</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Wheat, Gur, Paddy, Mustard</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">DAILY TRANSACTIONS</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">38,500 Bags</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Peak harvesting throughput</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">DIGITAL WEIGHMENT</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">94.8% Digital</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Certified weighbridges</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">REGISTERED BROKERS</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">120+ Arthis</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Licensed trade houses</span>
          </div>
        </div>
      </section>

      {/* Spot Price Cards Grid (Zero Undefined Errors, Complete Financial Cards) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              OFFICIAL COMMODITY RATE REGISTER
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Daily Spot Price Quotations
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Unit: Standard Maund / Bag</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMMODITIES_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08),0_6px_12px_-3px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {item.weight}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-urdu mt-0.5 block" dir="rtl">
                      {item.nameUrdu}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                    <Wheat className="w-4 h-4" />
                  </div>
                </div>

                {/* Price Display */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                      Rs {item.price.toLocaleString()}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    item.change === "up" 
                      ? "text-emerald-600 dark:text-emerald-400" 
                      : item.change === "down" 
                      ? "text-rose-600 dark:text-rose-400" 
                      : "text-slate-500"
                  }`}>
                    {item.change === "up" && <TrendingUp className="w-3.5 h-3.5" />}
                    {item.change === "down" && <TrendingDown className="w-3.5 h-3.5" />}
                    {item.change === "flat" && <Minus className="w-3.5 h-3.5" />}
                    <span>{item.changeAmount}</span>
                  </span>
                </div>
              </div>

              {/* Market Trend Report */}
              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-md border border-slate-200/60 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">Market Arrival Trend:</span>
                {item.trend}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Registered Mandi Businesses Directory */}
      <section id="mandi-directory" className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Arthis, Fertilizer Dealers, Cotton Mills (e.g. Memon, Nafees, Al-Madina)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* 9 Business Cards Grid: 3D Squarish Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBusinesses.map((biz, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08),0_6px_12px_-3px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {biz.badge}
                    </span>
                    <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white mt-0.5">
                      {biz.name}
                    </h3>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-urdu mt-0.5 block" dir="rtl">
                      {biz.nameUrdu}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                    <Store className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{biz.specialty}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{biz.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`tel:${biz.phone.replace(/[^0-9]/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer font-mono hover:-translate-y-0.5 active:translate-y-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>Call {biz.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
