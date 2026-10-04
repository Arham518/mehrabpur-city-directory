// Verified city facts. Every figure carries its source; conflicts with the first dataset are flagged.
export const FETCHED = "4 Oct 2026";

export const SRC = {
  pbsTc: { label: "PBS Census 2023, Table 2 (urban localities)", url: "https://www.pbs.gov.pk/wp-content/uploads/census_tables/tables/table_2_sindh_districts.pdf" },
  cityPop: { label: "citypopulation.de (PBS Census 2023)", url: "https://www.citypopulation.de/en/pakistan/sindh/admin/814__naushahro_feroze/" },
  cityPopTaluka: { label: "citypopulation.de - Mehrabpur taluka (PBS)", url: "https://citypopulation.de/en/pakistan/sindh/admin/naushahro_feroze/81403__mehrabpur/" },
  pbs2017: { label: "PBS Census 2017, Naushahro Feroze district tables", url: "https://www.pbs.gov.pk/wp-content/uploads/2020/07/District102_Combined.pdf" },
  wiki: { label: "Wikipedia - Mehrabpur", url: "https://en.wikipedia.org/wiki/Mehrabpur" },
  portalHistory: { label: "mehrabpursindh.com - History", url: "https://www.mehrabpursindh.com/history-of-mehrabpur/" },
  portalTimetable: { label: "mehrabpursindh.com - Train timetable", url: "https://www.mehrabpursindh.com/mehrabpur-train-time-table-mehrabpur-junction-railways-info/" },
  portalHome: { label: "mehrabpursindh.com", url: "https://mehrabpursindh.com/" },
  portalSchools: { label: "mehrabpursindh.com - Schools & colleges", url: "https://www.mehrabpursindh.com/school-collages/" },
  portalEvents: { label: "mehrabpursindh.com - Community events", url: "https://www.mehrabpursindh.com/community-events/" },
  portalGov: { label: "mehrabpursindh.com - Government services", url: "https://www.mehrabpursindh.com/government-services/" },
  portalZip: { label: "mehrabpursindh.com - Postal code guide", url: "https://www.mehrabpursindh.com/mehrabpur-zip-code-67000-postal-code-guide-for-mehrabpur-sindh/" },
  pakpost: { label: "Pakistan Post - post code directory", url: "https://www.pakpost.gov.pk/postcodes.php" },
  osmCity: { label: "OpenStreetMap - Mehrabpur (node 929274923)", url: "https://www.openstreetmap.org/node/929274923" },
  osmStation: { label: "OpenStreetMap - Mehrabpur station (node 11236783031)", url: "https://www.openstreetmap.org/node/11236783031" },
  traintracking: { label: "traintracking.pk (Pakistan Railways schedule)", url: "https://traintracking.pk/trains" },
  pakrail: { label: "Pakistan Railways - train timings", url: "https://pakrail.gov.pk/TrainTiming.aspx" },
  bbc: { label: "BBC News via Wikipedia (2007 derailment)", url: "https://en.wikipedia.org/wiki/Mehrabpur" },
};

export const CITY = {
  name: "Mehrabpur",
  sindhi: "محرابپور",
  urdu: "محراب پور",
  center: [27.10187, 68.41713], // OSM place node 929274923
  stationCoords: [27.09967, 68.42095], // OSM railway=station node
  postal: "67000",
  areaCode: "0242",
  stationCode: "MHR",
  elevationM: 28,
  population: {
    city: 57978, cityMale: 29397, cityFemale: 28572, cityTrans: 9, city2017: 53608, cityGrowth: 1.32, cityHousehold: 5.62,
    taluka: 273764, talukaMale: 138457, talukaFemale: 135289, talukaTrans: 18, taluka2017: 246649, taluka1998: 155345,
    talukaUrban: 83295, talukaRural: 190469, literate10: 110945, population10: 182115, areaKm2: 361,
    district: 1777082, halani: 25317,
  },
};

// [label, value, source key, optional note]
export const CITY_FACTS = [
  ["City", "Mehrabpur (محراب پور / محرابپور)", "wiki"],
  ["Province / Division", "Sindh / Shaheed Benazirabad", "osmCity"],
  ["District / Taluka", "Naushahro Feroze / Mehrabpur", "wiki"],
  ["Population, city (Census 2023)", "57,978", "pbsTc", "29,397 male, 28,572 female, 9 transgender; 53,608 in 2017 (+1.32% a year); 5.62 persons per household"],
  ["Population, taluka (Census 2023)", "273,764", "cityPopTaluka", "138,457 male, 135,289 female, 18 transgender; 83,295 urban, 190,469 rural. Your first dataset said 273,567: that is a digit slip, the male + female + transgender counts add up to 273,764."],
  ["Taluka area", "361 km²", "pbs2017", "About 758 people per km² in 2023"],
  ["Postal code", "67000", "pakpost", "Pakistan Post lists 67000 for Mahrabpur tehsil. Some directories (OSM, pakistani.pk) show 67211, which is a different Nawabshah-area code."],
  ["Telephone area code", "0242", "wiki"],
  ["Railway station", "Mehrabpur Junction (MHR)", "portalTimetable", "Karachi–Peshawar main line (ML-1). Station opened in 1914 per the local portal."],
  ["Coordinates", "27.1019° N, 68.4171° E", "osmCity", "Station: 27.0997° N, 68.4210° E (OSM). Wikipedia gives 27.0994° N, 68.4208° E."],
  ["Elevation", "28 m", "wiki"],
  ["Taluka created", "July 2005", "portalHistory", "Carved out of Kandiaro and Bhiria talukas"],
  ["Union councils (city)", "8", "wiki"],
  ["Distance to N-5", "About 15 km", "portalHistory"],
];

export const LANGUAGES_CITY = [["Sindhi", 46.9], ["Urdu", 28.3], ["Punjabi", 22.6], ["Saraiki", 1.1], ["Others", 1.1]]; // Wikipedia / Census 2023
export const LANGUAGES_TALUKA = [["Sindhi", 225796], ["Urdu", 19776], ["Punjabi", 18684], ["Balochi", 3016], ["Saraiki", 2427], ["Brahvi", 1751], ["Hindko", 1208], ["Other", 538 + 363 + 8]]; // PBS via citypopulation.de

export const AREAS = ["Mehrabpur", "Halani", "Behlani", "Sialabad", "Khanwahan", "Lakha Road", "Kotri Muhammad Kabir"];
export const ROADS = ["Station Road", "Thari Road", "Thari–Mehrabpur Road", "Halani Road", "Sialabad Road", "Mehrabpur–Hindyari Road", "Kotri Muhammad Kabir Road", "Langarji Road"];
export const NEIGHBOURHOODS = ["Ward No. 3", "New Town", "Shah Goth", "Mojai Mohalla", "Bhittai Nagar", "Luqman Colony", "Cheema Town"];

export const EMERGENCY = [
  { name: "Police emergency", phone: "15", note: "National police emergency number", source: "portalTimetable" },
  { name: "Police Station Mehrabpur", phone: "0242-430332", note: "Listed on mehrabpursindh.com and Cybo", source: "portalHome" },
  { name: "Railway Police helpline", phone: "1333", note: "Theft, lost luggage, safety at the station or on trains", source: "portalTimetable" },
  { name: "Station Police (Mehrabpur Junction)", phone: "0242-431010", note: "Listed on the local railway page", source: "portalTimetable" },
  { name: "NADRA Registration Center", phone: "0242-431205", note: "Main Halani Road", source: "portalHome" },
  { name: "SEPCO (electricity)", phone: "0242-520014", note: "Power failures and billing", source: "portalHome" },
  { name: "SSGC (gas)", phone: "0242-430423", note: "Gas leaks and supply", source: "portalHome" },
  { name: "Bus Terminal", phone: "0301-3224307", note: "Inter-city buses", source: "portalHome" },
];
