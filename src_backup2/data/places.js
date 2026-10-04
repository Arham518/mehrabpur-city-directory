// Sections 27–30 + Khanwahan: heritage, canals, villages, news.
export const HISTORY = [
  { title: "Mehrabpur historical settlement", text: "The local history page associates the origins of Mehrabpur with Mir Mehrab Khan Jatoi.", source: "https://www.mehrabpursindh.com/history-of-mehrabpur/" },
  { title: "Mehrabpur Railway Station", text: "A local history source associates the station with 1914. Treat this as a “local / history source” claim until confirmed by Pakistan Railways records.", source: "https://www.mehrabpursindh.com/history-of-mehrabpur/" },
];

export const NATURAL_PLACES = [
  { name: "Pakko Mehrabpur Reserved Forest", type: "Reserved forest" },
  { name: "Ziarat Pir Wasan", type: "Ziarat (shrine)" },
  { name: "Majeed Anno", type: "Local place" },
];

export const CANALS = [
  { name: "Mehrabpur Branch Canal", branch: "Mapped canal, Sindh", coords: [27.05021, 68.41472], note: "Coordinates from Mapcarta (approx. 27.05021, 68.41472).", source: "https://mapcarta.com/15169450" },
  { name: "Langar Neher / Langarji", branch: "Local reference", coords: null, note: "Referenced in local listings (e.g. Saleem Autos is “near Langar Neher”). Full details not yet verified.", source: null },
];
export const CANAL_FIELDS = ["Canal name", "Branch", "Nearby villages", "Bridges", "Water status", "Map", "Photos"];

export const KHANWAHAN = {
  villages: [
    "Shadan Khan Mari", "Tunia Baqa Shah", "Saeed Khan Khushk", "Rais Shahnawaz Khan Khushk", "Juma Khan Dobal",
    "Tando Gulshah", "Madd Koondhar", "Aayal Tunia", "Ghulam Hyder Siyal", "Rais Haji Imdad Ali Khushk",
  ],
  schools: ["GGPS Khan Wahan", "GBPS Imdad Ali Khushk", "GBPS Saeed Khan Khushk", "GBPS Jumo Dobal", "GBPS Tando Gul Shah"],
  source: "https://www.mehrabpursindh.com/khanwahan/",
};

export const NEARBY_TOWNS = [
  { name: "Mehrabpur", note: "Main city & taluka headquarters" },
  { name: "Halani", note: "Nearby town on Halani Road" },
  { name: "Behlani", note: "Nearby area" },
  { name: "Sialabad", note: "Sialabad / Siyalabad Road" },
  { name: "Khanwahan", note: "Union Council with villages listed below" },
  { name: "Lakha Road", note: "Nearby area" },
  { name: "Kotri Muhammad Kabir", note: "Kotri Muhammad Kabir Road" },
];

export const EDUCATION_STATS = { centers: "40+", government: "18+", private: "22+", source: "https://www.mehrabpursindh.com/school-collages/" };

export const NEWS = [
  { title: "Bhitai Press Club Mehrabpur Elections 2026", type: "News", icon: "Newspaper" },
  { title: "Regional Polio & Mass Vaccination Drive", type: "Health", icon: "Syringe" },
  { title: "Sindh Literature & Cultural Fest — regional planning", type: "Event", icon: "CalendarDays" },
  { title: "Road maintenance / drainage projects in Ward 4 and Railway Station area", type: "Civic", icon: "Construction" },
];
export const NEWS_SOURCE = "https://www.mehrabpursindh.com/community-events/";
export const NEWS_SECTIONS = ["News", "Events", "Announcements", "Jobs", "Death Notices", "Lost & Found", "Public Complaints"];

export const GRAIN_TRADES = ["Wheat", "Barley", "Rice", "Jaggery (Gur)", "Seeds", "Pesticides", "Herbicides", "Fertilizer", "Agricultural machinery"];

export const SUGGESTED_FIELDS = ["city = Mehrabpur", "area", "verified", "source", "last_updated"];
