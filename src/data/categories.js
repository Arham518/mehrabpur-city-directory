// Directory groups. Each listing belongs to exactly one group. `cover` is a representative photo (see credits.js),
// never a photo of a specific named business.
export const CATEGORY_GROUPS = [
  { id: "doctors", label: "Doctors & Hospitals", short: "Doctors", icon: "Stethoscope", color: "#e11d48", route: "/doctors", cover: "doctors", blurb: "Hospitals, clinics, dental, laboratories, ultrasound and blood bank." },
  { id: "schools", label: "Schools & Colleges", short: "Schools", icon: "GraduationCap", color: "#2563eb", route: "/schools", cover: "schools", blurb: "Government and private schools, degree colleges, computer institutes." },
  { id: "fuel", label: "Pumps & Gas Stations", short: "Fuel", icon: "Fuel", color: "#16a34a", cover: "fuel", blurb: "Petrol pumps and filling stations." },
  { id: "food", label: "Restaurants & Sweets", short: "Food", icon: "UtensilsCrossed", color: "#ea580c", cover: "food", blurb: "Restaurants, fast food, cafes, naan hotels, bakeries and sweet shops." },
  { id: "shops", label: "Shops & Markets", short: "Shops", icon: "ShoppingBag", color: "#ca8a04", cover: "shops", blurb: "Grocery, general stores, garments, electronics, hardware and jewellery." },
  { id: "showrooms", label: "Showrooms & Auto", short: "Showrooms", icon: "CarFront", color: "#9333ea", cover: "showrooms", blurb: "Car, tractor and motorcycle dealers, workshops and spare parts." },
  { id: "hotels", label: "Hotels & Halls", short: "Hotels", icon: "BedDouble", color: "#0891b2", cover: "hotels", blurb: "Hotels, guest places, community halls and marriage halls." },
  { id: "banks", label: "Banks & ATMs", short: "Banks", icon: "Landmark", color: "#1e40af", cover: "banks", blurb: "Bank branches, microfinance and e-Sahulat." },
  { id: "pharmacies", label: "Pharmacies", short: "Pharmacies", icon: "Pill", color: "#dc2626", cover: "pharmacies", blurb: "Medical stores and pharmacies." },
  { id: "recreation", label: "Parks & Recreation", short: "Recreation", icon: "Trees", color: "#15803d", cover: "recreation", blurb: "Gyms, parks, grounds and the public library." },
  { id: "masjids", label: "Masjids & Religious Places", short: "Masjids", icon: "Landmark", color: "#059669", cover: "masjids", blurb: "Masjids, madarsas, imambargahs and shrines." },
  { id: "transport", label: "Transport & Travel", short: "Transport", icon: "TrainFront", color: "#0284c7", route: "/railway", cover: "transport", blurb: "Mehrabpur Junction, bus terminal, courier and booking offices." },
  { id: "govt", label: "Government & Emergency", short: "Government", icon: "ShieldCheck", color: "#475569", route: "/government", cover: "govt", blurb: "Police, NADRA, post office, SEPCO, SSGC and public offices." },
  { id: "agri", label: "Agriculture & Grain Market", short: "Agriculture", icon: "Wheat", color: "#65a30d", route: "/agriculture", cover: "agri", blurb: "Ghalla Mandi, fertilizer, seeds, traders and cotton." },
  { id: "tech", label: "Mobile, Computer & Internet", short: "Tech", icon: "Smartphone", color: "#7c3aed", cover: "tech", blurb: "Mobile shops, computer centers, franchises and fiber internet." },
  { id: "services", label: "Services & Industry", short: "Services", icon: "Briefcase", color: "#475569", cover: "services", blurb: "Real estate, tailors, salons, photo and print, furniture and factories." },
];
export const getGroup = (id) => CATEGORY_GROUPS.find((g) => g.id === id) || CATEGORY_GROUPS[CATEGORY_GROUPS.length - 1];
export const groupRoute = (g) => g.route || `/businesses?cat=${g.id}`;

export const MEDICAL_SPECIALTIES = ["Hospital", "Clinic", "Dental Clinic", "Laboratory", "Medical Center", "Homeopathic", "Veterinary", "Optician"];
