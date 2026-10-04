import React, { useState } from "react";
import { 
  Building2, Train, Wheat, Stethoscope, Phone, MapPin, 
  Shield, Mail, Copy, Check, Compass 
} from "lucide-react";
import { usePortalStore, type NavTab } from "../store/usePortalStore";

const NAV_LINKS: { tab: NavTab; label: string; icon: React.ReactNode }[] = [
  { tab: "overview",  label: "Civic & Executive Overview",  icon: <Building2 className="w-3.5 h-3.5" /> },
  { tab: "railway",   label: "Railway Timetable (MHR)",      icon: <Train className="w-3.5 h-3.5" /> },
  { tab: "mandi",     label: "Ghalla Mandi Commodity Rates", icon: <Wheat className="w-3.5 h-3.5" /> },
  { tab: "medical",   label: "Medical & Doctors Directory",  icon: <Stethoscope className="w-3.5 h-3.5" /> },
];

const EMERGENCY_LINES = [
  { tel: "15",   label: "Police Emergency",       isRed: true },
  { tel: "1122", label: "Rescue 1122 Ambulance",  isRed: true },
  { tel: "115",  label: "Edhi Foundation",         isRed: false },
  { tel: "117",  label: "PR Railway Helpline",     isRed: false },
  { tel: "118",  label: "WAPDA / SEPCO Complaint", isRed: false },
];

export const Footer: React.FC = () => {
  const { setTab } = usePortalStore();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mr.arham170@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full bg-slate-100 dark:bg-[#05080f] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">

        {/* 4-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Column 1 – City Identity & Seal */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-slate-900 dark:text-white tracking-widest font-['Outfit']">
                  MEHRABPUR
                </span>
                <span className="text-slate-600 dark:text-slate-400 font-urdu text-xs" style={{ lineHeight: 1.6 }}>
                  محراب پور ڈیجیٹل پورٹل
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              Official municipal, railway junction, agricultural mandi, and healthcare repository for Taluka Mehrabpur, District Naushahro Feroze, Sindh.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Postal: 67000 • PR Code: <b className="text-slate-800 dark:text-slate-200">MHR</b></span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>Census 2023: 57,978 City • 273,567 Taluka</span>
            </div>
          </div>

          {/* Column 2 – Civic Portals */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Civic Portals
            </span>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ tab, label, icon }) => (
                <button
                  key={tab}
                  onClick={() => setTab(tab)}
                  className="group flex items-center gap-2.5 text-xs text-left text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <span className="text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                    {icon}
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3 – Emergency Helplines */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Emergency Helplines
            </span>
            <div className="flex flex-col gap-2.5">
              {EMERGENCY_LINES.map(({ tel, label, isRed }) => (
                <a
                  key={tel}
                  href={`tel:${tel}`}
                  className={`group flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg border transition-all duration-300 ${
                    isRed
                      ? "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60 dark:hover:bg-rose-600 dark:hover:text-white"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-slate-900 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Phone className={`w-3 h-3 ${isRed ? "text-rose-500 group-hover:text-white" : "text-slate-500"}`} />
                    <span>{label}</span>
                  </div>
                  <b className="font-mono text-[11px]">{tel}</b>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 – Creator & Engineering Ownership */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
              Creator &amp; Architecture
            </span>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/70 flex flex-col gap-3 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  DEVELOPED &amp; ENGINEERED BY
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs">
                  A
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                    Arham
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Lead Frontend Engineer
                  </span>
                </div>
              </div>

              {/* Creator Email with Interactive Copy & Mailto */}
              <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mt-1">
                <a
                  href="mailto:mr.arham170@gmail.com"
                  className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200 hover:underline font-mono truncate transition-colors"
                  title="Send email to Arham"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">mr.arham170@gmail.com</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            © 2026 Mehrabpur Digital City Portal. Created by Arham. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">Taluka Mehrabpur, Sindh, Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
