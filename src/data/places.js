import { SRC } from "./city";

// Coordinates are OpenStreetMap place nodes unless marked otherwise.
export const TOWNS = [
  { id: "mehrabpur", name: "Mehrabpur", note: "City and taluka headquarters", pop: "57,978 (2023)", coords: [27.10187, 68.41713], src: "OSM node 929274923", url: "https://www.openstreetmap.org/node/929274923" },
  { id: "halani", name: "Halani", note: "Town on Halani Road; second urban council of the taluka", pop: "25,317 (2023)", coords: [27.08597, 68.31397], src: "OSM node 10069783707", url: "https://www.openstreetmap.org/node/10069783707" },
  { id: "behlani", name: "Behlani", note: "Town west of Mehrabpur", coords: [27.09682, 68.34189], src: "OSM node 10967641965", url: "https://www.openstreetmap.org/node/10967641965" },
  { id: "khanwahan", name: "Khanwahan", note: "Union Council with the villages listed below", coords: [27.17744, 68.29245], src: "OSM node 10967634271", url: "https://www.openstreetmap.org/node/10967634271" },
  { id: "kotri", name: "Kotri Muhammad Kabir", note: "On the N-5 side of the taluka", coords: [27.1453, 68.36861], src: "OSM node 10976572598", url: "https://www.openstreetmap.org/node/10976572598" },
  { id: "lakha", name: "Lakha Road", note: "Village and road junction south of the city", coords: [26.98942, 68.34238], src: "OSM node 10069783959", url: "https://www.openstreetmap.org/node/10069783959" },
  { id: "sialabad", name: "Sialabad", note: "Village on Sialabad Road (position from a Google Plus Code in a Cybo listing; approximate)", coords: [27.04494, 68.3823], src: "Cybo (Plus Code 29VJ+XWF)", url: "https://www.cybo.com/PK/mehrabpur/hotels-and-motels", approx: true },
  { id: "pirwasan", name: "Pir Wasan (Ziarat)", note: "Dargah Pirwasan, on the Mehran Highway side", coords: [27.02919, 68.48865], src: "OSM node 10199243119", url: "https://www.openstreetmap.org/node/10199243119" },
];

export const KHANWAHAN = {
  villages: [
    { name: "Shadan Khan Mari", coords: [27.20596, 68.29735], osm: "Shadan Mari" },
    { name: "Tunia Baqa Shah", coords: [27.1605, 68.27042] },
    { name: "Saeed Khan Khushk", coords: [27.1939, 68.25789], osm: "Saeed Khan Khusk" },
    { name: "Rais Shahnawaz Khan Khushk", coords: [27.18655, 68.23857], osm: "Shah Nawaz Khushik (closest OSM match)" },
    { name: "Juma Khan Dobal", coords: [27.1662, 68.25944] },
    { name: "Tando Gulshah", coords: [27.17517, 68.26307] },
    { name: "Madd Koondhar", coords: [27.16749, 68.31021], osm: "Mad Kondar" },
    { name: "Aayal Tunia", coords: [27.15238, 68.29623] },
    { name: "Ghulam Hyder Siyal", coords: null },
    { name: "Rais Haji Imdad Ali Khushk", coords: null },
  ],
  schools: ["GGPS Khan Wahan", "GBPS Imdad Ali Khushk", "GBPS Saeed Khan Khushk", "GBPS Jumo Dobal", "GBPS Tando Gul Shah"],
  source: { label: "mehrabpursindh.com - Khanwahan", url: "https://www.mehrabpursindh.com/khanwahan/" },
};

export const CANAL = {
  name: "Mehrabpur Branch Canal",
  coords: [27.05021, 68.41472],
  note: "Mapcarta places the canal at 27.05021, 68.41472. OpenStreetMap shows unnamed canal segments next to that point (drawn on the map).",
  source: { label: "Mapcarta", url: "https://mapcarta.com/15169450" },
  local: "Local listings also mention Langar Neher / Langarji (for example Saleem Autos is “near Langar Neher”). No further detail has been verified.",
};

export const HISTORY = [
  { year: "Origin", title: "Settlement of Mir Mehrab Khan Jatoi", text: "The local history page says Mir Mehrab Khan Jatoi came from Khairpur and settled here with his family; villagers followed and the settlement took his name. It adds that the area once lay along an earlier course of the Indus.", src: SRC.portalHistory },
  { year: "1914", title: "Mehrabpur railway station inaugurated", text: "The local portal dates the station to 1914 and calls Mehrabpur a junction on the Karachi–Lahore line, with a now-disused branch to Naushahro Feroze. This date comes from a local source and has not been checked against Pakistan Railways records.", src: SRC.portalHistory },
  { year: "2005", title: "Independent taluka", text: "Mehrabpur became its own taluka (tehsil) in July 2005. Before that it was part of Kandiaro and Bhiria talukas.", src: SRC.portalHistory },
  { year: "2007", title: "Derailment south of the city", text: "On 19 December 2007 an overcrowded Karachi–Lahore express derailed about 2 km south of Mehrabpur; more than 49 people died. Defective rails were suspected.", src: SRC.wiki },
  { year: "2023", title: "Census 2023", text: "The city counted 57,978 people and the taluka 273,764, up from 53,608 and 246,649 in 2017.", src: SRC.pbsTc },
];
export const ECONOMY = [
  "Ghalla Mandi (grain market): wheat, rice and jaggery trade",
  "Cotton ginning factories and agro-processing units",
  "Furniture markets and other commercial hubs",
];
export const LANDMARKS = [
  { name: "Mehrabpur Junction", text: "Busy junction on the Karachi–Peshawar line; 18 scheduled stopping services." },
  { name: "Ghalla Mandi", text: "Grain and jaggery market on Station Road." },
  { name: "Pakko Mehrabpur Reserved Forest", text: "Reserved forest listed in the first dataset. No location verified yet." },
  { name: "Ziarat Pir Wasan", text: "Dargah Pirwasan on the Mehran Highway side, mapped in OpenStreetMap." },
];

export const NEWS = [
  { date: "2 Jan 2026", title: "Bhitai Press Club Mehrabpur elections 2026", type: "News", text: "The local press club elected a new body: Athar Jokhio as President and Srichand Adhlari as General Secretary." },
  { date: "15–25 Jan 2026", title: "Regional polio and mass vaccination drive", type: "Health", text: "District Health Office teams visited wards and villages of Mehrabpur Tehsil for polio and routine immunisation catch-up." },
  { date: "Feb 2026 (dates TBA)", title: "Sindh Literature & Cultural Fest, regional edition", type: "Event", text: "Local literary circles planned folk music and book stalls at the Municipal Grounds; dates were not confirmed." },
  { date: "Ongoing at time of listing", title: "Road and drainage works in Ward 4 and near the railway station", type: "Civic", text: "Minor traffic diversions were expected." },
];
export const NEWS_SOURCE = SRC.portalEvents;
