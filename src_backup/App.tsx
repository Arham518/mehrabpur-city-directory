import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CivicOverview } from "./components/CivicOverview";
import { RailwayJunction } from "./components/RailwayJunction";
import { GhallaMandi } from "./components/GhallaMandi";
import { MedicalDirectory } from "./components/MedicalDirectory";
import { Footer } from "./components/Footer";
import { usePortalStore } from "./store/usePortalStore";

export function App() {
  const { currentTab, setTab, darkMode, language } = usePortalStore();

  // Synchronize dark theme class with DOM documentElement and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("mhr_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("mhr_theme", "light");
    }
  }, [darkMode]);

  // Dynamic colorful atmospheric tone according to active section
  const getTabGlowClass = () => {
    switch (currentTab) {
      case "overview": return "tab-glow-overview";
      case "railway": return "tab-glow-railway";
      case "mandi": return "tab-glow-mandi";
      case "medical": return "tab-glow-medical";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#f8fafc] dark:bg-[#07090e] text-[#0f172a] dark:text-[#f1f5f9] transition-colors duration-250 font-sans antialiased">
      
      {/* High-End Industry Standard Floating Header / Navbar */}
      <Navbar />

      {/* Main Container with Standardized Spacing, Colorful Transitions & Ambient Glow */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 overflow-hidden transition-all duration-500 ${getTabGlowClass()}`}>
        <div key={currentTab} className="animate-fade-scale w-full">
          {currentTab === "overview" && (
            <CivicOverview
              language={language}
              onExploreRailway={() => setTab("railway")}
              onExploreMandi={() => setTab("mandi")}
              onExploreMedical={() => setTab("medical")}
            />
          )}

          {currentTab === "railway" && <RailwayJunction language={language} />}
          {currentTab === "mandi" && <GhallaMandi language={language} />}
          {currentTab === "medical" && <MedicalDirectory language={language} />}
        </div>
      </main>

      {/* High-End Industry Footer */}
      <Footer />
    </div>
  );
}

export default App;
