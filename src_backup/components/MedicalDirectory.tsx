import React, { useState } from "react";
import { DOCTORS_DATA } from "../data/mehrabpurData";
import { 
  Phone, ShieldCheck, Ambulance, HeartPulse, Clock, 
  MapPin, Search 
} from "lucide-react";

interface MedicalDirectoryProps {
  language: "en" | "ur";
}

export const MedicalDirectory: React.FC<MedicalDirectoryProps> = ({ language: _language }) => {
  const [filterEmergencyOnly, setFilterEmergencyOnly] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const specialties = ["ALL", ...Array.from(new Set(DOCTORS_DATA.map((d) => d.specialty)))];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesEmergency = !filterEmergencyOnly || doc.emergency;
    const matchesSpecialty = selectedSpecialty === "ALL" || doc.specialty === selectedSpecialty;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.pmdcNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEmergency && matchesSpecialty && matchesSearch;
  });

  return (
    <div className="w-full max-w-full overflow-hidden flex flex-col gap-8 sm:gap-12 pb-16 animate-fade-scale">
      
      {/* Top PMDC Regulatory Cross-Reference Bar (White in Light Mode, Slate in Dark Mode) */}
      <div className="w-full bg-white dark:bg-[#0b0f17] text-slate-800 dark:text-white p-4 sm:p-5 rounded-lg shadow-xs border border-slate-200/70 dark:border-slate-800/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors duration-250">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
              PMDC REGULATORY CROSS-REFERENCE
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Sindh Health Care Commission (SHCC) &amp; Taluka Health Office Compliance Register
            </span>
          </div>
        </div>

        {/* Emergency Helplines in Light Red with Dark Red Hover Transition */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <a
            href="tel:1122"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60 hover:bg-rose-600 hover:text-white hover:border-rose-600 dark:hover:bg-rose-600 dark:hover:text-white dark:hover:border-rose-600 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer hover:-translate-y-0.5"
          >
            <Ambulance className="w-4 h-4" />
            <span>Rescue 1122</span>
          </a>
          <a
            href="tel:115"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4 text-slate-500" />
            <span>Edhi 115</span>
          </a>
        </div>
      </div>

      {/* Hero Master Medical Gazette Banner — Light in Light Mode */}
      <section className="relative overflow-hidden isolate rounded-lg bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-slate-200/30 dark:bg-slate-800/20 blur-2xl pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="relative z-10 max-w-5xl flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded font-bold uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs">
              OFFICIAL MEDICAL GAZETTE
            </span>
            <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80">
              DISTRICT NAUSHAHRO FEROZE
            </span>
            <span className="px-3 py-1 rounded font-semibold uppercase tracking-wider bg-slate-50 text-slate-700 border border-slate-200/80 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 font-mono">
              TALUKA CODE: 67000 / 67211
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white font-urdu leading-tight">
              طبی سہولیات و مستند معالجین
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-slate-900 dark:text-white leading-[1.15]">
              HEALTHCARE MASTER REGISTER
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mt-1 font-normal">
              Comprehensive verified repository of inpatient hospitals, PMDC-credentialed general practitioners, round-the-clock pharmacies, automated pathology units, and trauma facilities across Mehrabpur city, Station Area, Thari Road, and Halani bypass junction.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">Hospitals &amp; Centers</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">14+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Civil &amp; Private Units</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">PMDC Specialists</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">45+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Registered Consultants</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">24/7 Pharmacies</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">18+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Emergency Chemists</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase text-slate-500 dark:text-slate-400 font-semibold tracking-wider">Diagnostic Labs</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">06</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Ultrasound &amp; Pathology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Visual Showcase (3D Squarish Boxes with Hover Scale) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden shadow-xs border border-slate-200/70 dark:border-slate-800/70 h-60 bg-slate-100 dark:bg-slate-900 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group">
          <img
            src="/images/mhr_perimeter.jpg"
            alt="Taluka Hospital and Rural Health Center Precinct Mehrabpur"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5" /> Public Health Care
            </span>
            <h3 className="text-lg font-bold font-['Outfit']">تعلقہ ہیڈکوارٹر ہسپتال — THQ Hospital</h3>
            <p className="text-xs text-slate-300 mt-0.5">Emergency triage, surgical operation theaters, and mother &amp; child healthcare</p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-xs border border-slate-200/70 dark:border-slate-800/70 h-60 bg-slate-100 dark:bg-slate-900 hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out group">
          <img
            src="/images/mhr_mosque.jpg"
            alt="Heritage Precinct and Diagnostics Area Mehrabpur"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-85"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Clinical Diagnostic Care
            </span>
            <h3 className="text-lg font-bold font-['Outfit']">جدید تشخیصی لیبارٹریز — Pathology &amp; Ultrasound</h3>
            <p className="text-xs text-slate-300 mt-0.5">Automated hematology, digital X-Ray, color Doppler ultrasound &amp; ECG</p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctor name, specialty, hospital, or PMDC number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedSpecialty === spec
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-xs -translate-y-0.5"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5"
                }`}
              >
                {spec}
              </button>
            ))}

            {/* Emergency Filter in Light Red with Dark Red Hover */}
            <button
              onClick={() => setFilterEmergencyOnly(!filterEmergencyOnly)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 whitespace-nowrap hover:-translate-y-0.5 ${
                filterEmergencyOnly
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60 hover:bg-rose-600 hover:text-white hover:border-rose-600"
              }`}
            >
              <Ambulance className="w-3.5 h-3.5" />
              <span>24/7 Trauma Only</span>
            </button>
          </div>

        </div>

        {/* 6 Doctors Grid (3D Squarish Boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white dark:bg-[#0f141f] border border-slate-200/70 dark:border-slate-800/70 shadow-xs hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.08),0_6px_12px_-3px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col justify-between gap-4 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {doc.pmdcNo}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {doc.name}
                    </h3>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-urdu mt-0.5 block" dir="rtl">
                      {doc.nameUrdu}
                    </span>
                  </div>
                  {doc.emergency && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900/40">
                      24/7 On-Call
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.title}</span>
                    <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>{doc.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{doc.timing}</span>
                  </div>
                </div>
              </div>

              {/* Call Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`tel:${doc.phone.replace(/[^0-9]/g, "")}`}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>Call {doc.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
