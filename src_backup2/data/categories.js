// Directory categories ("groups"). Each listing belongs to exactly one group.
// `photo` is optional — cards without a photo use a tasteful gradient + icon.
export const CATEGORY_GROUPS = [
  { id: "doctors", label: "Doctors & Hospitals", short: "Doctors", icon: "Stethoscope", color: "#e11d48", grad: ["#fb7185", "#be123c"], route: "/doctors", blurb: "Hospitals, clinics, dental, labs, ultrasound and blood bank." },
  { id: "schools", label: "Schools & Colleges", short: "Schools", icon: "GraduationCap", color: "#2563eb", grad: ["#60a5fa", "#1d4ed8"], route: "/schools", blurb: "Government & private schools, degree colleges, computer institutes." },
  { id: "fuel", label: "Pumps & Gas Stations", short: "Fuel", icon: "Fuel", color: "#16a34a", grad: ["#4ade80", "#15803d"], blurb: "Petrol pumps — keep Petrol / CNG / EV as future sub-categories." },
  { id: "food", label: "Restaurants & Cafes", short: "Food", icon: "UtensilsCrossed", color: "#ea580c", grad: ["#fb923c", "#c2410c"], blurb: "Restaurants, fast food, cafes, naan hotels, bakeries and sweets." },
  { id: "shops", label: "Shops & Markets", short: "Shops", icon: "ShoppingBag", color: "#ca8a04", grad: ["#facc15", "#a16207"], blurb: "Grocery, general stores, garments, hardware, electrical and sanitary." },
  { id: "showrooms", label: "Showrooms & Auto", short: "Showrooms", icon: "CarFront", color: "#9333ea", grad: ["#c084fc", "#7e22ce"], blurb: "Car, tractor and motorcycle showrooms, auto workshops and spare parts." },
  { id: "hotels", label: "Hotels & Marriage Halls", short: "Hotels", icon: "BedDouble", color: "#0891b2", grad: ["#22d3ee", "#0e7490"], blurb: "Hotels, guest places, community halls and marriage halls." },
  { id: "banks", label: "Banks & ATMs", short: "Banks", icon: "Landmark", color: "#1e3a8a", grad: ["#6366f1", "#1e3a8a"], blurb: "Bank branches, microfinance and e-Sahulat." },
  { id: "pharmacies", label: "Pharmacies", short: "Pharmacies", icon: "Pill", color: "#dc2626", grad: ["#f87171", "#b91c1c"], blurb: "Medical stores and pharmacies." },
  { id: "recreation", label: "Parks & Recreation", short: "Recreation", icon: "Trees", color: "#15803d", grad: ["#86efac", "#166534"], blurb: "Gyms, parks, grounds and the public library." },
  { id: "masjids", label: "Masjids & Religious Places", short: "Masjids", icon: "Mosque", color: "#059669", grad: ["#34d399", "#047857"], photo: "/images/mhr_mosque.jpg", blurb: "Masjids, madarsas and ziarats." },
  { id: "transport", label: "Transport & Travel", short: "Transport", icon: "TrainFront", color: "#0284c7", grad: ["#38bdf8", "#0369a1"], route: "/railway", photo: "/images/mhr_station_platform.jpg", blurb: "Mehrabpur Junction, bus terminal, courier and booking offices." },
  { id: "govt", label: "Government & Emergency", short: "Government", icon: "ShieldCheck", color: "#475569", grad: ["#94a3b8", "#334155"], route: "/government", blurb: "Police, NADRA, post office, SEPCO, SSGC and public offices." },
  { id: "agri", label: "Agriculture & Grain Market", short: "Agriculture", icon: "Wheat", color: "#65a30d", grad: ["#a3e635", "#4d7c0f"], route: "/agriculture", photo: "/images/mhr_canal.jpg", blurb: "Ghalla Mandi, fertilizer, seeds, traders and cotton." },
  { id: "tech", label: "Mobile, Computer & Internet", short: "Tech", icon: "Smartphone", color: "#7c3aed", grad: ["#a78bfa", "#5b21b6"], blurb: "Mobile shops, computer centers, franchises and fiber internet." },
  { id: "services", label: "Services & Industry", short: "Services", icon: "Briefcase", color: "#374151", grad: ["#9ca3af", "#1f2937"], blurb: "Real estate, tailors, salons, photo & print, furniture and factories." },
];

export const getGroup = (id) => CATEGORY_GROUPS.find((g) => g.id === id);

// The full "recommended final database categories" list from the master dataset.
export const MASTER_CATEGORY_LIST = [
  "Businesses","Doctors","Hospitals","Clinics","Pharmacies","Laboratories","Dental Clinics","Schools","Colleges","Academies","Computer Institutes","Banks","ATMs","Petrol Pumps","CNG","Auto Showrooms","Car Dealers","Motorcycle Dealers","Tractor Showrooms","Auto Workshops","Spare Parts","Agriculture Stores","Fertilizer Dealers","Pesticide Dealers","Seed Dealers","Grain Market","Gur Mandi","Restaurants","Fast Food","Cafes","Bakeries","Hotels","Marriage Halls","Mosques","Madrassas","Government Offices","Police","NADRA","Post Office","SEPCO","SSGC","Courier","Mobile Shops","Internet/Fiber","Computer Shops","Electronics","Hardware","Sanitary","Furniture","Garments","Tailors","Beauty Salons","Photo Studios","Printing","Book Shops","Real Estate","Gyms","Parks","Grounds","Libraries","Railway","Bus Transport","Canals","Bridges","Villages","Towns","Historical Places","Tourist Places","News","Events","Jobs","Emergency Contacts",
];

export const MEDICAL_SPECIALTIES = [
  "General Physician","Dentist","Gynecologist","Pediatrician","Skin Specialist","ENT","Orthopedic","Homeopathic","Veterinary","Ultrasound","Laboratory","Blood Bank","Pharmacy",
];
