import React, { useState } from "react";
import { 
  Building, Phone, MapPin, Clock, Users, ArrowRight,
  ShieldCheck, Train, Wheat, Search, 
  Navigation, Award
} from "lucide-react";
import { 
  VITAL_METRICS, CIVIC_OFFICES, 
  type CivicOffice 
} from "../data/mehrabpurData";
import { City3DCanvas } from "./City3DCanvas";

interface CivicOverviewProps {
  language: "en" | "ur";
  onExploreRailway: () => void;
  onExploreMandi: () => void;
  onExploreMedical: () => void;
}

export const CivicOverview: React.FC<CivicOverviewProps> = ({
  onExploreRailway,
  onExploreMandi,
  onExploreMedical,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtery, setSelectedArtery] = useState<string>("All");

  const arteries = ["All", "Municipal Infrastructure", "Land & Revenue", "Civil Registration", "Law & Order", "Energy & Utilities"];

  const filteredOffices: CivicOffice[] = CIVIC_OFFICES.filter((office) => {
    const matchesSearch =
      office.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.officer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      office.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesArtery =
      selectedArtery === "All" || office.domain.toLowerCase().includes(selectedArtery.toLowerCase());

    return matchesSearch && matchesArtery;
  });

  return (
    <div className="flex flex-col gap-10">
      
      {/* Hero Section: Master Civic & Executive Header */}
      <section className="relative rounded-2xl bg-white dark:bg-[#0b0f19] border border-slate-200/90 dark:border-slate-800/90 shadow-sm overflow-hidden transition-all duration-300">
        
        {/* Subtle Ambient Background Accents (Clean Light Tones, No Yellow) */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-slate-200/30 dark:bg-slate-800/20 blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-slate-100/40 dark:bg-slate-900/30 blur-3xl pointer-events-none -mb-16" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col gap-8">
          
          {/* Top Overline Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg font-bold uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs text-[11px]">
                OFFICIAL CIVIC PORTAL
              </span>
              <span className="px-3 py-1 rounded-lg font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/90 dark:border-slate-700/80 text-[11px]">
                SINDH • NAUSHAHRO FEROZE
              </span>
              <span className="px-3 py-1 rounded-lg font-mono text-slate-600 bg-slate-50 border border-slate-200 dark:text-slate-400 dark:bg-slate-900 dark:border-slate-800 text-[11px]">
                POSTAL 67000 • PR CODE: MHR
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Navigation className="w-3.5 h-3.5 text-slate-400" />
              <span>{VITAL_METRICS.coordinates} • ELEV 38M ASL</span>
            </div>
          </div>

          {/* Hero Main: Split 2-Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              
              {/* Refined Urdu Typography (Clean Slate Tones) */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white font-urdu leading-tight">
                  محراب پور ڈیجیٹل پورٹل
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-mono mt-1 font-semibold">
                  HISTORIC RAILWAY JUNCTION &amp; AGRICULTURAL MANDI OF SINDH
                </span>
              </div>

              {/* English Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white leading-tight">
                Civic Authority, Railway Junction &amp; Trade Hub
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Sovereign civic directory, daily passenger train timetable for Mehrabpur Junction (MHR), real-time Ghalla Mandi commodity rates, and verified PMDC healthcare registrations for Taluka Mehrabpur.
              </p>

              {/* Quick Navigation 3D Action Buttons (Light/Clean Palette, No Yellow) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onExploreRailway}
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2 group"
                >
                  <Train className="w-4 h-4" />
                  <span>Railway Timetable (MHR)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onExploreMandi}
                  className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider shadow-xs hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <Wheat className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span>Ghalla Mandi Rates</span>
                </button>
                <button
                  onClick={onExploreMedical}
                  className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider shadow-xs hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <span>Medical Directory</span>
                </button>
              </div>

            </div>

            {/* Right Column: Interactive 3D Model & Real Mehrabpur Station Photography Badge */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* 3D Canvas Container */}
              <City3DCanvas />

              {/* Real Photograph of Mehrabpur Railway Station (3D Card) */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-slate-100 dark:bg-slate-950 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 group h-44">
                <img
                  src="/images/mhr_railway_historic.jpg"
                  alt="Historic Mehrabpur Railway Station junction Sindh Pakistan"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300">
                        OFFICIAL LANDMARK PHOTOGRAPH
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">
                        Historic Mehrabpur Railway Station (EST. 1914)
                      </span>
                      <span className="text-[11px] text-slate-300">
                        Colonial red brick architectural heritage &amp; ML-1 junction platform
                      </span>
                    </div>
                    <button
                      onClick={onExploreRailway}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Timetable</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Statistical KPI Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                CENSUS 2023 REGISTRY
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                {VITAL_METRICS.populationCity.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Taluka Aggregate: {VITAL_METRICS.populationTaluka.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                PR TRACK KILOMETER
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                KM {VITAL_METRICS.railwayKm}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Main Line-1 (ML-1) Karachi to Peshawar
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                GHALLA &amp; GUR MANDI
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                {VITAL_METRICS.establishedMandi} Est.
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Over 120 wholesale commodity houses in trade
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                MUNICIPAL AREA
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">
                {VITAL_METRICS.municipalArea}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Catchment fed by Rohri Canal distributaries
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Strategic Geographic Gateway & Convergence Grid */}
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              STRATEGIC GEOGRAPHIC GATEWAY &amp; AGRO-INDUSTRIAL MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              The Sovereign Convergence of Sindh
            </h2>
            <span className="text-base text-slate-600 dark:text-slate-400 font-urdu" dir="rtl">
              محراب پور: اسٹریٹجک جنکشن، ریلوے کوریڈور و زرعی سنگم
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              CIRC. 1780 — 1914
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700">
              ELEV 38M ASL
            </span>
          </div>
        </div>

        {/* 4 Pillars of Convergence (3D Squarish Boxes with Scale & Elevation Hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. ML-1 Transit */}
          <div className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="h-28 rounded-md overflow-hidden relative">
                <img
                  src="/images/mhr_station_platform.jpg"
                  alt="Platform 1 and Canopy Roof Mehrabpur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                  TRANSIT SPINE
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">ML-1 Rail Connectivity</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct non-stop passenger &amp; freight transit linking Karachi Port with Rohri, Sukkur, Multan, Lahore, Rawalpindi &amp; Peshawar.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Station Code: MHR</span>
              <span className="text-[10px] text-slate-400 font-mono">18 Trains/Day</span>
            </div>
          </div>

          {/* 2. N-5 Highway */}
          <div className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="h-28 rounded-md overflow-hidden relative">
                <img
                  src="/images/mhr_perimeter.jpg"
                  alt="N-5 Arterial Highway corridor Mehrabpur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                  ARTERIAL ROAD
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">N-5 National Highway Link</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                4-lane arterial freight corridor connecting Naushahro Feroze, Ranipur, Khairpur, Sukkur, and Hyderabad logistics markets.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>National Highway Access</span>
              <span className="text-[10px] text-slate-400 font-mono">Freight Trunk</span>
            </div>
          </div>

          {/* 3. Rohri Canal */}
          <div className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="h-28 rounded-md overflow-hidden relative">
                <img
                  src="/images/mhr_canal.jpg"
                  alt="Rohri Canal Distributary Mehrabpur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                  CANAL LIFELINE
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Rohri Canal Perennial Feeder</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sustaining 270,000+ acres of high-yield Basmati rice, sweet sugarcane, gold wheat crops, and prime mango orchards.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Indus Basin Water System</span>
              <span className="text-[10px] text-slate-400 font-mono">Irrigation Grid</span>
            </div>
          </div>

          {/* 4. Mandi Nexus */}
          <div className="p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08),0_4px_8px_-2px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group">
            <div className="flex flex-col gap-3">
              <div className="h-28 rounded-lg overflow-hidden relative">
                <img
                  src="/images/mhr_ghalla_mandi.jpg"
                  alt="Ghalla Mandi Trading Yard Mehrabpur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 dark:bg-slate-900/95 dark:text-white shadow-xs border border-slate-200/60 dark:border-slate-700/60">
                  COMMODITY HUB
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Ghalla Mandi Trading Nexus</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Annual commodity transactions exceeding 142,000+ Metric Tons of grain, raw gur, mustard, and agro-fertilizer trades.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Station Chowk Mandi Gate</span>
              <span className="text-[10px] text-slate-400 font-mono">142K+ MT Vol</span>
            </div>
          </div>

        </div>
      </section>

      {/* Historical Sovereignty & Heritage Archive (Full-Width 3D Squarish Card) */}
      <section className="w-full">
        <div className="p-6 sm:p-8 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.008] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08),0_4px_10px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-500" />
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                HISTORICAL SOVEREIGNTY &amp; COLONIAL HERITAGE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Mir Mehrab Khan Jatoi &amp; The 1914 Railway Gateway
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
              Founded in the 1780s as a fortified settlement along prime Indus alluvial deposits by Chieftain Mir Mehrab Khan Jatoi during the zenith of Talpur rule. In 1914, under British North Western Railway expansion, it was elevated into a premier locomotive marshaling, coaling, and freight weighbridge outpost connecting Sindh's agricultural interior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">1780s Settlement</span>
              <span className="text-slate-500 dark:text-slate-400">Fortified Talpur Chieftaincy</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">1914 Rail Junction</span>
              <span className="text-slate-500 dark:text-slate-400">ML-1 Strategic Gateway</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">6 Union Councils</span>
              <span className="text-slate-500 dark:text-slate-400">Taluka Revenue Sub-Division</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Postal Code 67000</span>
              <span className="text-slate-500 dark:text-slate-400">Tehsil Administrative Center</span>
            </div>
          </div>
        </div>
      </section>

      {/* Systematic Classification: 5 Civic Departments */}
      <section className="flex flex-col gap-6">
        
        {/* Search & Artery Filter Bar (3D Tactile Filter Bar) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search verified civic records (e.g. TMA, NADRA, Mukhtiarkar, SEPCO, Police)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
            />
          </div>

          {/* Artery Filter Buttons (3D Tactile Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            {arteries.map((art) => (
              <button
                key={art}
                onClick={() => setSelectedArtery(art)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedArtery === art
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5"
                }`}
              >
                {art}
              </button>
            ))}
          </div>

        </div>

        {/* 5 Public Offices Cards Grid: 3D Squarish Boxes with Scale & Lift Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((office, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08),0_6px_12px_-3px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {office.domain}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {office.title}
                    </h4>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-urdu mt-0.5 block" dir="rtl">
                      {office.titleUrdu}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                    <Building className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{office.officer}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{office.timing}</span>
                  </div>
                </div>

                {/* Service Tags (Crisp Squarish Tags) */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {office.services.map((srv, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3D Call Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0.5 transition-all shadow-xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>Call {office.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
