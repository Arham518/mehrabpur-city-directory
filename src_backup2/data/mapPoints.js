import { MAP_LOCATIONS, CITY } from "./city";
import { searchUrl } from "@/lib/maps";

// Marker positions are APPROXIMATE (offsets around the city centre 27.10°N, 68.42°E) because the master
// dataset provides no exact coordinates for these places. The popup links to a Google Maps search for the exact spot.
// Only the Mehrabpur Branch Canal uses real coordinates from the dataset.
const OFFSETS = [
  [0.004, 0.006],   // Royal Medical Center (Thari Road side)
  [-0.008, -0.006], // Bilal Super Drive (Halani Road)
  [0.001, 0.0],     // Mehran Motors (near Station Road)
  [0.007, -0.004],  // Govt Boys Degree College (Siyalabad Rd)
  [-0.001, 0.003],  // HBL (Station Road)
  [0.0, -0.002],    // M&P Courier (Station Road)
  [0.0045, 0.0015], // Mughal Marriage Hall
  [0.002, 0.008],   // Junction station (Shah Goth / Station Rd)
];
export const MAP_POINTS = MAP_LOCATIONS.map((m, i) => ({
  ...m,
  position: [CITY.center[0] + OFFSETS[i][0], CITY.center[1] + OFFSETS[i][1]],
  approximate: true,
  url: searchUrl({ name: m.name }),
}));
export const CANAL_POINT = { name: "Mehrabpur Branch Canal", type: "Canal", position: [27.05021, 68.41472], approximate: false, group: "agri", url: "https://mapcarta.com/15169450" };
