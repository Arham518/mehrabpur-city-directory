import { create } from "zustand";

export type NavTab = "overview" | "railway" | "mandi" | "medical";

interface PortalState {
  currentTab: NavTab;
  darkMode: boolean;
  language: "en" | "ur";
  mobileMenuOpen: boolean;
  railwayDirection: "ALL" | "UP" | "DN";
  railwaySearch: string;
  mandiCategory: string;
  mandiSearch: string;
  medicalSpecialty: string;
  medicalEmergencyOnly: boolean;
  medicalSearch: string;

  // Actions
  setTab: (tab: NavTab) => void;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  toggleLanguage: () => void;
  setLanguage: (lang: "en" | "ur") => void;
  setMobileMenuOpen: (open: boolean) => void;
  setRailwayDirection: (dir: "ALL" | "UP" | "DN") => void;
  setRailwaySearch: (query: string) => void;
  setMandiCategory: (cat: string) => void;
  setMandiSearch: (query: string) => void;
  setMedicalSpecialty: (specialty: string) => void;
  setMedicalEmergencyOnly: (only: boolean) => void;
  setMedicalSearch: (query: string) => void;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("mhr_theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

export const usePortalStore = create<PortalState>((set) => ({
  currentTab: "overview",
  darkMode: getInitialDarkMode(),
  language: "en",
  mobileMenuOpen: false,
  railwayDirection: "ALL",
  railwaySearch: "",
  mandiCategory: "ALL",
  mandiSearch: "",
  medicalSpecialty: "ALL",
  medicalEmergencyOnly: false,
  medicalSearch: "",

  setTab: (tab) => {
    set({ currentTab: tab, mobileMenuOpen: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  toggleDarkMode: () => {
    set((state) => {
      const next = !state.darkMode;
      if (typeof window !== "undefined") {
        if (next) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("mhr_theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("mhr_theme", "light");
        }
      }
      return { darkMode: next };
    });
  },

  setDarkMode: (enabled) => {
    if (typeof window !== "undefined") {
      if (enabled) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("mhr_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("mhr_theme", "light");
      }
    }
    set({ darkMode: enabled });
  },

  toggleLanguage: () => {
    set((state) => ({ language: state.language === "en" ? "ur" : "en" }));
  },

  setLanguage: (language) => set({ language }),

  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

  setRailwayDirection: (railwayDirection) => set({ railwayDirection }),
  setRailwaySearch: (railwaySearch) => set({ railwaySearch }),

  setMandiCategory: (mandiCategory) => set({ mandiCategory }),
  setMandiSearch: (mandiSearch) => set({ mandiSearch }),

  setMedicalSpecialty: (medicalSpecialty) => set({ medicalSpecialty }),
  setMedicalEmergencyOnly: (medicalEmergencyOnly) => set({ medicalEmergencyOnly }),
  setMedicalSearch: (medicalSearch) => set({ medicalSearch }),
}));
