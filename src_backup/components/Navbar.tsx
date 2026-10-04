import React from "react";
import { 
  Building2, Train, Wheat, Stethoscope, Sun, Moon, 
  Menu, X 
} from "lucide-react";
import { usePortalStore, type NavTab } from "../store/usePortalStore";

export type { NavTab };

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setTab,
    darkMode,
    toggleDarkMode,
    language,
    toggleLanguage,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = usePortalStore();

  const navItems: { tab: NavTab; labelEn: string; labelUr: string; icon: React.ReactNode; badge: string }[] = [
    {
      tab: "overview",
      labelEn: "Civic Overview",
      labelUr: "شہری جائزہ",
      icon: <Building2 className="w-4 h-4" />,
      badge: "Govt",
    },
    {
      tab: "railway",
      labelEn: "Railway Junction",
      labelUr: "ریلوے جنکشن",
      icon: <Train className="w-4 h-4" />,
      badge: "MHR",
    },
    {
      tab: "mandi",
      labelEn: "Ghalla Mandi",
      labelUr: "غلہ منڈی",
      icon: <Wheat className="w-4 h-4" />,
      badge: "Rates",
    },
    {
      tab: "medical",
      labelEn: "Medical Directory",
      labelUr: "طبی ڈائریکٹری",
      icon: <Stethoscope className="w-4 h-4" />,
      badge: "PMDC",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/95 dark:bg-[#07090e]/95 border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_14px_35px_-8px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.6)] transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity with 3D Monogram Emblem */}
        <div 
          onClick={() => setTab("overview")}
          className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
        >
          {/* 3D Geometric Monogram Tile (Sleek Square-ish with Bevel & Inset Glow) */}
          <div className="w-11 h-11 rounded-lg bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white border border-slate-700/80 shadow-[0_6px_14px_rgba(0,0,0,0.22),inset_0_1.5px_0_rgba(255,255,255,0.3),0_2px_0_#334155] flex items-center justify-center group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out">
            <span className="font-['Outfit'] font-black text-sm tracking-wider text-slate-100">MHR</span>
          </div>

          {/* Dual-Language Wordmark */}
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                MEHRABPUR
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700/80 font-semibold shadow-2xs">
                Sindh 67000
              </span>
            </div>
            <span 
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 font-urdu -mt-0.5" 
              style={{ lineHeight: 1.6 }}
            >
              محراب پور ڈیجیٹل پورٹل
            </span>
          </div>
        </div>

        {/* Center: 3D Segmented Console Dock */}
        <nav className="hidden md:flex items-center p-1.5 rounded-lg bg-slate-100/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_1px_2px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setTab(item.tab)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold transition-all duration-300 ease-out cursor-pointer transform ${
                  isActive
                    ? "bg-white text-slate-950 dark:bg-slate-800 dark:text-white shadow-[0_4px_12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1),0_2px_0_#cbd5e1] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15),0_2px_0_#1e293b] -translate-y-1 scale-[1.02] border border-slate-200/70 dark:border-slate-700/70 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/80 hover:-translate-y-0.5 hover:shadow-[0_3px_8px_rgba(0,0,0,0.06)]"
                }`}
              >
                <span className={isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}>
                  {item.icon}
                </span>
                <span>{language === "ur" ? item.labelUr : item.labelEn}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded tracking-wider ${
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100 font-bold border border-slate-200 dark:border-slate-600"
                      : "bg-slate-200/60 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: 3D Utility Cluster (Language & Theme Controls) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* 3D Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-3.5 py-2 rounded-md text-xs font-bold border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0.5 transition-all duration-200 cursor-pointer shadow-[0_3px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85),0_1.5px_0_#cbd5e1] dark:shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1),0_1.5px_0_#334155]"
            title="Switch Language / زبان تبدیل کریں"
          >
            {language === "en" ? "اردو" : "EN"}
          </button>

          {/* 3D Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Theme"
            className="w-10 h-10 rounded-md border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center hover:-translate-y-0.5 hover:scale-105 active:translate-y-0.5 transition-all duration-200 cursor-pointer shadow-[0_3px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85),0_1.5px_0_#cbd5e1] dark:shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1),0_1.5px_0_#334155]"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-slate-200" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-md border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu (3D Tactile) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090e] px-4 py-3 flex flex-col gap-2 shadow-xl animate-fade-scale">
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setTab(item.tab)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white font-bold dark:bg-white dark:text-slate-950 shadow-md"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? "text-white dark:text-slate-950" : "text-slate-500"}>
                    {item.icon}
                  </span>
                  <span>{language === "ur" ? item.labelUr : item.labelEn}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono font-bold">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
