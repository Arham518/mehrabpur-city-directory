export const CITY = {
  name: "Mehrabpur",
  sindhi: "محرابپور",
  urdu: "محراب پور",
  rows: [
    ["City", "Mehrabpur"],
    ["Sindhi", "محرابپور"],
    ["Urdu", "محراب پور"],
    ["Province", "Sindh"],
    ["District", "Naushahro Feroze"],
    ["Taluka", "Mehrabpur"],
    ["Postal Code", "67000"],
    ["Telephone area code", "0242"],
    ["Railway station code", "MHR"],
    ["Railway station", "Mehrabpur Junction"],
    ["Main railway corridor", "Karachi–Peshawar railway line"],
    ["Population — city (2023)", "57,978"],
    ["Population — taluka (2023)", "273,567"],
    ["Coordinates", "approx. 27.10° N, 68.42° E"],
  ],
  population: { city: 57978, taluka: 273567 },
  center: [27.1, 68.42],
  postal: "67000",
  areaCode: "0242",
  stationCode: "MHR",
  censusNote: "Official Census 2023: Mehrabpur urban locality = 57,978 and Mehrabpur Taluka = 273,567.",
  censusSource: "https://www.mehrabpursindh.com/history-of-mehrabpur/",
};

// Section 1 — local areas the portal covers
export const AREAS = ["Mehrabpur", "Halani", "Behlani", "Sialabad", "Khanwahan", "Lakha Road", "Kotri Muhammad Kabir"];

// Section 2 — roads / routes / neighbourhoods
export const ROADS = [
  "Station Road", "Thari Road", "Thari–Mehrabpur Road", "Halani Road", "Sialabad / Siyalabad Road",
  "Mehrabpur–Hindyari Road", "Kotri Muhammad Kabir Road", "Langarji Road",
];
export const NEIGHBOURHOODS = ["Ward No. 3", "New Town", "Shah Goth", "Mojai Mohalla", "Bhittai Nagar", "Luqman Colony", "Cheema Town"];

// Section 31 — features the existing local portal offers (used for "Explore" cards)
export const PORTAL_FEATURES = [
  "History", "Train Timetable", "Weather", "Videos", "Social Workers Directory", "Towns & Villages",
  "Business Directory", "BISP 8171 information", "Government Services", "Local News", "Prayer Times",
];

// Section 33 — headline map locations (ratings as shown in the Maps-style listing)
export const MAP_LOCATIONS = [
  { name: "Royal Medical Center Mehrabpur", rating: 4.9, type: "Hospital", status: "Open", group: "doctors" },
  { name: "BILAL SUPER DRIVE- Total Petrol Station", rating: 4.0, type: "Petrol Station", status: "Open", group: "fuel" },
  { name: "Mehran Motors&co", rating: 5.0, type: "Car Dealer", status: "Open", group: "showrooms" },
  { name: "Government Boys Degree College Mehrabpur", rating: 4.7, type: "College", status: "Closed", group: "schools" },
  { name: "HBL Mehrabpur", rating: 3.9, type: "Bank", status: "Open", group: "banks" },
  { name: "M&P Courier and Logistics", rating: 4.2, type: "Courier", status: "Open", group: "transport" },
  { name: "Mughal Marriage Hall", rating: 3.9, type: "Marriage Hall", status: "", group: "hotels" },
  { name: "Mehrabpur Junction Railway Station", rating: null, type: "Railway Station", status: "", group: "transport" },
];

export const DATA_NOTE =
  "Public Maps/directories do not provide a 100% official master register. Some listings are duplicates, outdated, or carry the wrong category/city (Cybo / WorldOrgs searches for Mehrabpur sometimes mix in Gambat, Halani, Kotri Kabir or nearby areas). Phone numbers and addresses are shown only where a public source lists them — nothing is guessed. Entries marked “needs verification” should be confirmed before relying on them.";
