// Master listing dataset for the Mehrabpur City Portal.
// Fields: id, name, category (group id), sub, area, address, phone, phones[], email, rating,
//         hours, verified, source, sourceUrl, last_updated, note
// RULES: phone numbers / addresses are copied only from the supplied master dataset — never invented.
//        verified:true  → has a linked public source (or Maps-style listing) AND a phone or address.
//        verified:false → name-only entries, unlinked/duplicated data, or entries flagged "needs verification".
import { getGroup } from "./categories.js";

export const LAST_UPDATED = "2026-10-03";

const SRC = {
  maps: ["Google Maps-style listing", null],
  mp: ["Mehrabpur Sindh portal", "https://mehrabpursindh.com/"],
  mpLocal: ["Mehrabpur Sindh portal", "https://www.mehrabpursindh.com/local-business/"],
  dir: ["Public directories (unlinked)", null],
};
const hostLabel = (u) => {
  if (u.includes("halaman-kuning")) return "Halaman Kuning (Cybo)";
  if (u.includes("cybo.com")) return "Cybo";
  if (u.includes("worldorgs")) return "PK World Orgs";
  if (u.includes("mehrabpursindh")) return "Mehrabpur Sindh portal";
  if (u.includes("khushhali")) return "Khushhali Bank";
  if (u.includes("dnb.com")) return "Dun & Bradstreet";
  if (u.includes("mapcarta")) return "Mapcarta";
  return "Public directory";
};

const AREA_RULES = [
  [/station road/i, "Station Road"],
  [/thari/i, "Thari Road"],
  [/halani/i, "Halani Road"],
  [/sialabad|siyalabad|sailabad/i, "Sialabad Road"],
  [/hindyari/i, "Hindyari Road"],
  [/ghal+a|grain|fsc godown/i, "Ghalla Mandi"],
  [/langar/i, "Langarji"],
  [/mojai/i, "Mojai Mohalla"],
  [/shah goth/i, "Shah Goth"],
  [/cheema town/i, "Cheema Town"],
  [/kotri/i, "Kotri Muhammad Kabir"],
  [/khanwahan/i, "Khanwahan"],
  [/new town/i, "New Town"],
  [/ward no\.? ?3|ward #3/i, "Ward No. 3"],
];
const inferArea = (txt) => {
  for (const [re, a] of AREA_RULES) if (re.test(txt)) return a;
  return "Mehrabpur";
};

let counter = 0;
// e(group, sub, name, options)
function e(category, sub, name, o = {}) {
  const key = o.s || null;
  let source = "Name only (needs verification)";
  let sourceUrl = null;
  if (key && SRC[key]) [source, sourceUrl] = SRC[key];
  else if (key) { source = hostLabel(key); sourceUrl = key; }
  const phone = o.phone || null;
  const phones = phone ? phone.split("/").map((p) => p.trim()) : [];
  const hasData = !!(phone || o.address);
  const verified = o.verified !== undefined ? o.verified : !!(key && key !== "dir" && hasData);
  counter += 1;
  return {
    id: `l${counter}`,
    name,
    urdu: o.urdu || null,
    category,
    sub,
    area: o.area || inferArea(`${o.address || ""} ${name}`),
    address: o.address || null,
    phone,
    phones,
    email: o.email || null,
    rating: o.rating ?? null,
    hours: o.hours || null,
    verified,
    source,
    sourceUrl,
    last_updated: LAST_UPDATED,
    note: o.note || null,
  };
}

const CY = "https://www.cybo.com/";
const WO = "https://pk.worldorgs.com/catalog/mehrabpur/";
const HK = "https://halaman-kuning.cybo.com/PK/mehrabpur/industri";

export const LISTINGS = [
  // ───────── 4. Hospitals / doctors / clinics ─────────
  e("doctors", "Hospital", "Royal Medical Center Mehrabpur", { address: "Cheema Town, Thari Road", phone: "0302-2745752", rating: 4.9, hours: "Open 24 hours", s: "maps" }),
  e("doctors", "Medical clinic", "Dr Fareed Mughal", { address: "4C28+CGP, Mehrabpur", rating: 5.0, s: "maps" }),
  e("doctors", "General Clinic", "Laraib Lifecare General Clinic", { address: "Mehrabpur", phone: "0309-9992474", s: "dir", note: "Phone listed publicly" }),
  e("doctors", "Medical Center", "Shaheed Dr Amir Shahzad Medical Center", { address: "Mehrabpur", phone: "0314-4002220", s: "dir" }),
  e("doctors", "Clinic", "Abdullah Clinic – Dr. Mushtaq Jalbani", { address: "Station Road", phone: "0301-3813964", s: "dir" }),
  e("doctors", "Clinic", "Dr Ghulam Rassol Clinic"),
  e("doctors", "Skin Specialist", "Roshan Skin Clinic"),
  e("doctors", "Medical Center", "Ali Medical Centre"),
  e("doctors", "Clinic", "Al Majeed Clinic"),
  e("doctors", "Clinic", "Jabeen Clinic"),
  e("doctors", "Clinic", "Tooba Clinic"),
  e("doctors", "Clinic", "Al Shifa Clinic"),
  e("doctors", "Clinic", "Tasmeen Clinic"),
  e("doctors", "Clinic", "Muhammad Clinic"),
  e("doctors", "Medical Center", "Raza Medical Center"),
  e("doctors", "Homeopathic", "Attari Homeo Clinic"),
  e("doctors", "Veterinary", "Memon Veterinary Clinic"),
  e("doctors", "Dentist", "Al Madina Dental Clinic", { address: "14 Thari Road, Ward No. 3", phone: "0316-3132744", s: "dir" }),
  e("doctors", "Ultrasound", "Ali Ultrasound & Diagnostic Center", { address: "Near Adnan Medical Store, Halani Road", phone: "0309-3859236", s: "mpLocal" }),
  e("doctors", "Laboratory", "Al Shifa Lab Mehrabpur", { address: "Near Police Station", phone: "0319-2366683", rating: 5.0, hours: "08:00–21:00", s: "maps", note: "Maps category: Medical Center" }),
  e("doctors", "Laboratory", "Diagnostic & Research Lab (CP)", { address: "Station Road" }),
  e("doctors", "Blood Bank", "Ali Laboratory & Blood Bank"),
  e("doctors", "Medical Center", "Citi Medical Center / Pharmacy Mehrabpur", { address: "Hospital Road / Yaqoob Poultry Farm Office Road", phone: "0242-430002", s: CY + "PK/gambat/pharmacies-and-drug-stores/" }),

  // ───────── 5. Pharmacies ─────────
  e("pharmacies", "Medical Store", "Farhan Medical Store", { address: "Thari Road, New Town", phone: "0300-2490226", hours: "07:00–22:00 (approx.)", s: "maps" }),
  e("pharmacies", "Medical Store", "Adnan Medical Store", { address: "Halani Road (landmark in local listings)", verified: false }),
  e("pharmacies", "Medical Store", "Kamran Medical Store"),
  e("pharmacies", "Medical Store", "Abid Medical Store", { address: "Thari Road, New Town", phone: "0302-2745752", s: CY + "PK/gambat/pharmacies-and-drug-stores/", verified: false, note: "Same phone number as Royal Medical Center — duplicate or wrong; needs verification." }),
  e("pharmacies", "Medical Store", "Zubaid Medical Store"),
  e("pharmacies", "Pharmacy", "Citi Medical Center Pharmacy"),

  // ───────── 6. Schools / colleges ─────────
  e("schools", "Government School", "Government Boys Higher Secondary School Mehrabpur", { s: WO + "college/government-boys-higher-secondary-school", verified: false }),
  e("schools", "Government School", "Government High School Mehrabpur"),
  e("schools", "Government School", "Govt. (N) Tameer-e-Millat High School", { address: "High School Road", phone: "0242-430907", s: WO + "college/govtn-tameer-e-millat-high-school" }),
  e("schools", "Government School", "Government Urdu Primary School New Town", { address: "New Town", s: WO + "college/govturdu-primary-school-newtown-mehrabpur-semis-code-416050242", note: "SEMIS Code: 416050242" }),
  e("schools", "Government School", "Government Primary Boys School", { address: "Shah Goth", s: WO + "college/government-primary-boys-school" }),
  e("schools", "Secondary School", "Roshan Tara Secondary School Mehrabpur", { phone: "0301-3985199", hours: "08:15–14:00 (approx.)", s: WO + "college/roshan-tara-secondary-school-mehrabput" }),
  e("schools", "Private School", "Allied School", { address: "Sialabad Road", s: WO + "college/allied-school" }),
  e("schools", "Private School", "Mehran Public School Mehrabpur", { address: "Sialabad Road, near Government Girls High School, Shah Goth", phone: "0301-3428480", s: WO + "college/mehran-public-school-mehrabpur" }),
  e("schools", "Higher Secondary", "Ever Shine Public Higher Secondary School Mehrabpur", { address: "Ward No. 1", phone: "0300-0208444", hours: "Mon–Fri 08:00–14:00", s: CY + "PK-biz/ever-shine-public-higher-secondary_1Y", area: "Ward No. 1" }),
  e("schools", "Private School", "Sindh Collegiate Mehrabpur", { address: "Ward No. 3", phone: "0302-0003042", s: CY + "PK-biz/sindh-collegiate-mehrabpur", note: "Website: sindhcollegiate.org" }),
  e("schools", "Higher Secondary", "Mazhar Muslim Model H/Secondary School Mehrabpur"),
  e("schools", "Private School", "Sachal Community Model School Mehrabpur", { address: "Siyalabad Road", s: WO + "college/sachal-community-model-school-mehrabpur" }),
  e("schools", "Private School", "KB Public High School Campus 2", { address: "Thari Road / Mojai Mohalla" }),
  e("schools", "Private School", "KB School Mehrabpur"),
  e("schools", "Private School", "The Educators Mehrabpur Campus"),
  e("schools", "College", "Bahria Foundation College"),
  e("schools", "College", "Mazhar Model School & College"),
  e("schools", "College", "Al-Mustafa Public School & College"),
  e("schools", "Private School", "City Public High / Sindh Education Foundation School"),
  e("schools", "Computer Institute", "MIIT Computer Center", { address: "Falcon Street / near Tameer-e-Millat High School", phone: "0242-430438", s: CY + "PK/mehrabpur/education/" }),
  e("schools", "Technical Institute", "Government Monotechnic Institute (Boys), Mehrabpur", { address: "Sailabad Road", s: CY + "PK/mehrabpur/education/" }),
  e("schools", "Degree College", "Govt Girls Degree College Mehrabpur"),
  e("schools", "Degree College", "Government Boys Degree College Mehrabpur", { address: "Siyalabad Road", phone: "0242-430779", rating: 4.7, s: "maps" }),
  e("schools", "Law College", "Oriental Law College Mehrabpur"),

  // ───────── 7. Banks ─────────
  e("banks", "Bank", "Habib Bank Limited (H.B.L) Mehrabpur", { address: "Station Road", rating: 3.9, s: "maps" }),
  e("banks", "Bank", "Bank Al Habib Limited (BAHL)", { address: "Halani Road", phone: "0242-430914", s: "dir", verified: false, note: "Branch phone publicly listed in directories" }),
  e("banks", "Bank", "National Bank of Pakistan", { address: "Station Road", phone: "0242-430649", email: "customer@nbp.com.pk", s: CY + "PK-biz/national-bank-of-pakistan-%D9%86%D9%8A%D8%B4%D9%86%D9%84-%D8%A8%D8%A6%D9%86%DA%AA-%D8%A2%D9%81" }),
  e("banks", "Bank", "United Bank Limited (UBL)", { address: "Mehrabpur Road, Ward No. 3", phone: "0315-3234186", s: CY + "PK/mehrabpur/banks/" }),
  e("banks", "Bank", "MCB Bank Mehrabpur", { address: "Station Road", phone: "0242-430226", s: CY + "PK/mehrabpur/banks/" }),
  e("banks", "Bank", "Zarai Taraqiati Bank Ltd"),
  e("banks", "Bank", "Tameer Bank Mehrabpur"),
  e("banks", "Microfinance", "Khushhali Microfinance Bank", { address: "Opposite Bilal Petrol Pump, Halani Road", phone: "0242-430591", s: "https://uat.khushhalibank.com.pk/?page_id=610" }),
  e("banks", "Payments", "e-Sahulat", { address: "Station Road", verified: false }),

  // ───────── 8. Petrol pumps ─────────
  e("fuel", "Petrol Station", "BILAL SUPER DRIVE – Total Petrol Station", { address: "Survey No. 126/1, Halani Road", phone: "0300-8314102", rating: 4.0, hours: "Open 24 hours", s: "maps" }),
  e("fuel", "Petrol Pump", "Shahbaz PSO Pump", { address: "Mehrabpur area (landmark in local listings)", s: CY + "PK/mehrabpur/hotels-and-motels", verified: false }),
  e("fuel", "Petrol Pump", "Petrol Pump Station", { s: CY + "PK-biz/petrol-pump-station_29", verified: false, note: "Directory listing exists but city/address metadata is inconsistent — needs verification." }),

  // ───────── 9. Showrooms / auto ─────────
  e("showrooms", "Car Dealer", "Mehran Motors&co", { address: "Shop No. 56, Haydri Plaza, near Station Road", phone: "0300-3225905", rating: 5.0, s: "maps" }),
  e("showrooms", "Tractor & Car Showroom", "Ali Tractor and Car Showroom", { address: "Thari–Mehrabpur Road", phone: "0304-8000627", hours: "09:00–18:00", s: WO + "auto-repair-shop/ali-tractor-and-car-showroom" }),
  e("showrooms", "Tractor Showroom", "Mehran Tractor Showroom", { address: "Thari Road, Ward No. 3", rating: 5.0, s: "maps", note: "Maps category: Wholesaler" }),
  e("showrooms", "Motorcycle Dealer", "Al Shahbaz Autos (الشھباز آٹوز محرابپور)", { address: "Mehrabpur–Hindyari Road", s: "maps", urdu: "الشھباز آٹوز محرابپور" }),
  e("showrooms", "Tractor Showroom", "Fazal Hussain Tractor Showroom", { address: "Mehrabpur–Hindyari Road", s: WO + "bakery/al-noor-super-store", verified: false, note: "Public listing/reference on Mehrabpur–Hindyari Road." }),
  e("showrooms", "Bike Showroom", "SHOWROOM BIKES", { address: "Village Muhammad Shams Kalhoro, Khanwahan Taluka, Mehrabpur", s: "https://www.dnb.com/business-directory/company-profiles.showroom_bikes.613fbd2373cf860936f5eb8ce48432a7.html", area: "Khanwahan" }),
  e("showrooms", "Auto Parts", "Saleem Autos Mehrabpur", { address: "Thari Road, near Langar Neher, Ward No. 16 New Town", s: "maps" }),
  e("showrooms", "Motorcycle Repair", "Amir Autos", { address: "Near Adnan Medical Store, Halani Road", phone: "0300-3141489", rating: 4.4, s: "maps", note: "Maps category: Computer repair service; also motorcycle repair." }),
  e("showrooms", "Auto Workshop", "New Sindh Supper Autos", { address: "New Town", phone: "0301-3854588", s: CY + "PK-biz/new-sindh-supper-autos" }),

  // ───────── 10. Grain market / agriculture ─────────
  e("agri", "Grain Market", "Grain Market Mehrabpur / Ghalla Mandi", { address: "Station Road", s: WO + "software-company/grain-market", note: "Grain + jaggery (gur) trading hub: wheat, barley, rice, jaggery; seeds, pesticides, herbicides, fertilizer and agricultural machinery businesses." }),
  e("agri", "Fertilizer", "Memon Fertilizers", { address: "Ghalla Mandi, near FSC Godown", phone: "0242-430255", s: CY + "PK/mehrabpur/industry/" }),
  e("agri", "Fertilizer", "Nafees Fertilizer Agency", { phone: "0300-8314019", s: CY + "PK/mehrabpur/industry/" }),
  e("agri", "Trader", "AL Hafeez Traders", { phone: "0301-2875494", s: HK }),
  e("agri", "Trader", "Zaheer Aqdas Cheema & Company", { address: "Ghala Mandi Road", phone: "0300-7084550", s: HK }),
  e("agri", "Agri Mart", "Sufi Agriculture Mart Mehrabpur", { phone: "0315-1362212", s: HK }),
  e("agri", "Trader", "Noman Akhtar & Brothers", { phone: "0300-3141491", s: HK }),
  e("agri", "Trader", "Baba Traders", { address: "Unit No. 4, Ghala Mandi Road", phone: "0300-9153818", s: HK }),
  e("agri", "Trader", "Cheema Brothers Mehrabpur", { address: "Shop No. 55, Grain Market", phone: "0300-8314029", s: HK }),
  e("agri", "Farm", "Al Karam Controlled Shade Farm"),
  e("agri", "Cotton Factory", "Mughal Cotton Factory"),
  e("agri", "Vegetable Market", "New Sabzi Mandi", { address: "Halani Road" }),

  // ───────── 11. Restaurants / fast food / cafes ─────────
  e("food", "Fast Food", "John's PIJJA Mehrabpur", { address: "Halani Road, opposite Eid Gah", phone: "0313-8440090", rating: 4.8, hours: "16:00–02:00 (approx.)", s: "maps" }),
  e("food", "Fast Food", "Yasin Chicken Broast Mehrabpur", { phone: "0307-7368707", s: "dir", verified: false }),
  e("food", "Fast Food", "Memon Pakora Shop Mehrabpur", { address: "Station Road", phone: "0333-7599759", s: CY + "PK/gambat/fast-food-restaurants/" }),
  e("food", "Fast Food", "Fast Pizza Cafe & Grill"),
  e("food", "Restaurant", "Al Tariq Restaurant"),
  e("food", "Cafe", "Cafe Anwar"),
  e("food", "Cafe", "Cafe Kashif Hotel"),
  e("food", "Fast Food", "AFC Fast Food"),
  e("food", "Naan Hotel", "Shalimar Naan Hotel", { address: "Station Road" }),
  e("food", "Restaurant", "Al Wahab Restaurant & BBQ"),
  e("food", "Fast Food", "Pakistan Chicken House"),
  e("food", "Chaat", "Ahsan Chaat"),
  e("food", "Cafe", "Al-Mehran Kaify & Hotel"),
  e("food", "Restaurant", "Super Madina Sahil Restaurant"),
  e("food", "Naan Hotel", "Lasaani Mehboob Naan Shop"),
  e("food", "Restaurant", "Wadhanpota Restaurant Hotel"),
  e("food", "Restaurant", "Haji Ghous Bux Chang"),
  // bakeries / sweets
  e("food", "Sweets", "Gulzar Sweet / Milk Shop", { address: "Thari Road, New Town", phone: "0302-3131800", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Bakery", "Baloch Baker Mehrabpur", { address: "Station Road", phone: "0306-9526134", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Bakery", "Zeeshan Baker", { address: "Station Road", phone: "0304-8000101", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Sweets", "Shani Sweets & Cold Corner", { address: "Thari–Mehrabpur Road, New Town", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Pizza", "N.N Pizza Hub", { address: "New Town", phone: "0300-6295269", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Bakery", "Rizwan Bakers & General Store", { address: "Ward No. 3", phone: "0313-1017074", s: CY + "PK/mehrabpur/bakeries/" }),
  e("food", "Bakery", "Ibrahim Sindh Amard Bakery", { address: "Mehrabpur", rating: 5.0, s: "maps" }),
  e("food", "Bakery", "Baba Maaz Bakers"),

  // ───────── 13. Hotels / halls ─────────
  e("hotels", "Hotel", "Kinara Hotel", { address: "Langarji Road", rating: 4.2, s: "maps" }),
  e("hotels", "Hotel", "Shabir Hotel Wala (Home)", { address: "Ward No. 14, New Town", phone: "0304-8588901", rating: 3.8, s: "maps" }),
  e("hotels", "Hotel", "Tiktok Hotel", { phone: "0300-0036932", s: CY + "PK/mehrabpur/hotels-and-motels", verified: true, note: "Public listing phone" }),
  e("hotels", "Hotel", "Arain Da Hotel"),
  e("hotels", "Hotel", "Javed Khaskheli Hotel", { address: "Near Shahbaz PSO Pump", phone: "0300-2696050", s: CY + "PK/mehrabpur/hotels-and-motels" }),
  e("hotels", "Guest Place (Otak)", "Mallah Ji Otak"),
  e("hotels", "Marriage Hall", "Mughal Marriage Hall (مغل شادی ہال)", { address: "Mehrabpur", rating: 3.9, s: "maps", urdu: "مغل شادی ہال" }),
  e("hotels", "Marriage Hall", "Sindh Marriage Hall", { address: "Thari Road, Ward No. 3", phone: "0302-3295894", rating: 4.1, s: "maps" }),
  e("hotels", "Community Hall", "Soomro Community Hall", { address: "New Town", s: CY + "PK/mehrabpur/hotels-%26-travel/", verified: true }),
  e("hotels", "Garden / Hall", "Alif Laam Meem Garden", { address: "Langarji / Mehrabpur", phone: "0300-8170966", s: CY + "PK/mehrabpur/hotels-%26-travel/" }),

  // ───────── 14. Markets / grocery ─────────
  e("shops", "Grocery", "Arif K.Store", { rating: 4.5, phone: "0304-9966808", hours: "07:30–23:00 (approx.)", s: "maps", address: "Mehrabpur" }),
  e("shops", "Super Store", "Al Noor Super Store", { address: "Mehrabpur–Hindyari Road", phone: "0344-4888818", s: WO + "bakery/al-noor-super-store" }),
  e("shops", "Super Market", "Chand Super Market"),
  e("shops", "General Store", "Hydri General Store"),
  e("shops", "Karyana", "Afzal Karyana Store"),
  e("shops", "General Store", "Amjad General Store", { address: "Station Road", phone: "0301-3585812", s: HK }),
  e("shops", "Confectionery", "Umair Confectionery Store"),
  e("shops", "Traders", "Sufi Traders"),
  e("shops", "Garments", "A ONE Collection"),
  e("shops", "General Store", "Khizar General & Garments Store"),
  e("shops", "General Store", "Abid Luqman General Store"),
  e("shops", "General Store", "Muqeem General Store"),
  e("shops", "General Store", "Naveed General Store"),
  e("shops", "General Store", "Waseem General Store"),
  e("shops", "Shopping Center", "M-Basheer Shopping Center"),
  e("shops", "General Store", "Inayat General Store"),
  e("shops", "General Store", "New Kashish General Store"),
  e("shops", "Karyana", "Aslam Mallah Kiryana"),
  e("shops", "Karyana", "Bismillah Karyana Store"),
  e("shops", "Karyana", "Pak Karyana"),
  e("shops", "Grocery", "Jinsaar Grocery Store"),
  e("shops", "Footwear", "Rajper Shoes Point"),
  e("shops", "General Store", "Ghulam Ali Shaikh General Store"),
  e("shops", "Karyana", "Ahmed Karyana & General Store"),
  e("shops", "Garments", "Ahsan Garments"),
  e("shops", "Utensils", "Shaikh Bartan & Trunk Store"),
  e("shops", "General Store", "Al Madina General Store"),
  e("shops", "Traders", "Shah Nawaz Traders"),
  e("shops", "Traders", "Mohsin Ali Traders"),
  e("shops", "General Store", "Balouch General Store"),
  e("shops", "General Store", "Kamran General Store"),
  e("shops", "General Store", "Ateeb General Store"),
  e("shops", "General Store", "Asad General Store"),
  // hardware / electric
  e("shops", "Hardware", "Moon Hardware Store", { address: "Mehrabpur", phone: "0300-3204913", rating: 3.8, s: "maps" }),
  e("shops", "Electric", "Mallah Electric Mallah", { address: "Station Road" }),
  e("shops", "Electric", "Bismillah Refrigeration & Electric"),
  e("shops", "Sanitary", "Javed Aslam Sanitary Shop"),

  // ───────── 15. Mobile / computer / internet ─────────
  e("tech", "Mobile Shop", "ALI MOBILE & WHOLESALE", { address: "Near Ali Laboratory / Halani Road", phone: "0316-3482152", rating: 5.0, s: "maps" }),
  e("tech", "Mobile Repair", "New Wifi Mobile Repairing Lab", { address: "Station Road", phone: "0301-2522115", rating: 5.0, s: "maps" }),
  e("tech", "Mobile Shop", "Kashif Ashraf Mobiles"),
  e("tech", "Mobile Shop", "Nobel Mobile Shop"),
  e("tech", "Telecom", "Touheed Haider Communication", { address: "Station Road", phone: "0300-3966058", s: "dir", verified: false }),
  e("tech", "Telecom", "Telenor Franchise"),
  e("tech", "Telecom", "Zong Franchise"),
  e("tech", "Computer Center", "Genius Computer's Center Mehrabpur", { address: "Ward #8 Mehrabpur Road, near Sajjad X-Ray / Abbasi Market", phone: "0300-2895037", rating: 4.4, s: "maps" }),
  e("tech", "Computer Shop", "Bismillah Computer Shop"),
  e("tech", "Fiber Internet", "Mehrabpur Fiber Internet Service", { phone: "0325-3417610 / 0301-2445974 / 0301-3807213", s: "https://www.mehrabpursindh.com/mehrabpur-fiber-internet-service-2/", note: "FTTH/wireless packages: 6, 10, 15, 20, 35, 100 Mbps. Contacts: Imran Channa 0325-3417610 · Imran Memon 0301-2445974 · Muzaffar Husain 0301-3807213." }),

  // ───────── 17. Courier / transport ─────────
  e("transport", "Railway", "Mehrabpur Junction Railway Station (MHR)", { address: "Shah Goth / Station Road area", s: "https://mehrabpursindh.com/", note: "Karachi–Peshawar main line. 18 stopping services (9 Up + 9 Down) in the indexed timetable." }),
  e("transport", "Bus Terminal", "Bus Terminal", { phone: "0301-3224307", s: "https://mehrabpursindh.com/", verified: true }),
  e("transport", "Courier", "M&P Courier and Logistics", { address: "Station Road", phone: "0316-0020188", rating: 4.2, s: "maps" }),
  e("transport", "Courier", "Leopards Courier Express Center", { address: "Station Road area" }),
  e("transport", "Courier", "TCS Mehrabpur"),
  e("transport", "Booking Office", "China Town Booking Office", { address: "Thari Road", phone: "0300-0046389", s: CY + "PK/mehrabpur/hotels-%26-travel/" }),

  // ───────── 18. Government / public services ─────────
  e("govt", "Hospital", "Civil Hospital Mehrabpur", { s: "https://www.mehrabpursindh.com/government-services/", verified: false }),
  e("govt", "Police", "Police Station Mehrabpur", { phone: "0242-430332 / 0300-2497076", s: CY + "PK/mehrabpur/police-and-law-enforcement/", note: "0242-430332 from Cybo; 0300-2497076 from a Maps-style listing (category shown as 'Police academy')." }),
  e("govt", "NADRA", "NADRA Registration Center – NRC Mehrabpur", { address: "Main Halani Road", phone: "0242-431205", s: "https://mehrabpursindh.com/" }),
  e("govt", "Post Office", "Post Office / General Post Office Mehrabpur", { note: "Postal code 67000", s: "https://www.mehrabpursindh.com/government-services/", verified: false }),
  e("govt", "Municipal", "Municipality / Town Office", { s: "https://www.mehrabpursindh.com/government-services/", verified: false }),
  e("govt", "Revenue", "Revenue Office", { s: "https://www.mehrabpursindh.com/government-services/", verified: false }),
  e("govt", "Representatives", "Local Representatives", { s: "https://www.mehrabpursindh.com/government-services/", verified: false }),
  e("govt", "Electricity", "SEPCO Office Mehrabpur", { address: "Kotri Road / Shah Goth area", phone: "0242-520014", s: "https://mehrabpursindh.com/" }),
  e("govt", "Gas", "SSGC Mehrabpur", { phone: "0242-430423", s: "https://mehrabpursindh.com/" }),

  // ───────── 20. Masjids ─────────
  e("masjids", "Masjid", "Jamia Masjid Mehrabpur (جامعہ مسجد)", { address: "Station Road", rating: 5.0, s: "maps", urdu: "جامعہ مسجد" }),
  e("masjids", "Masjid", "Madina Masjid", { address: "Ward No. 3", s: "maps" }),
  e("masjids", "Masjid", "Madni Masjid Toori Wali", { address: "Mehrabpur–Hindyari Road / Link Road", s: CY + "PK/mehrabpur/banks/" }),
  e("masjids", "Masjid", "Makki Masjid", { address: "Hussain Chowk, Shahi Bazar" }),
  e("masjids", "Madarsa", "Madarsa Jamia Darul Uloom Muhammadia"),

  // ───────── 21. Recreation ─────────
  e("recreation", "Gym", "Golds Gym Mehrabpur", { address: "Unit No. 5, Pakistan Chowk" }),
  e("recreation", "Gym", "Shaheen Fitness Gym", { phone: "0300-3291254", s: CY + "PK/mehrabpur/bakeries/" }),
  e("recreation", "Park", "FPS Park"),
  e("recreation", "Ground", "City Ground Mehrabpur"),
  e("recreation", "Library", "Mehrabpur Public Library"),

  // ───────── 22–26 Services & industry ─────────
  e("services", "Real Estate", "Zafar Qureshi Property Dealers", { address: "Thari–Mehrabpur Road, New Town", phone: "0300-3088699", s: "maps" }),
  e("services", "Real Estate", "Mehmood Real Estate", { address: "Umer Farooq Cloth Market, near Madina Masjid Road", phone: "0300-3069580", s: CY + "PK/mehrabpur/industry/" }),
  e("services", "Real Estate", "Shams Estate Agency"),
  e("services", "Photostate", "Mohsin PhotoState Mehrabpur", { address: "Ward #14, Thari Road, near Railway Crossing", phone: "0340-3548731", rating: 5.0, s: "maps" }),
  e("services", "Print Shop", "New Sindh Photo State Mehrabpur", { phone: "0307-7664221", s: "maps", address: "Mehrabpur" }),
  e("services", "Book Store", "Ghullam Haider Book Store", { address: "Sialabad Road", phone: "0301-3211249", s: CY + "PK-biz/ghullam-haider-book-store" }),
  e("services", "Book Store", "Noor Photo State & Book Store"),
  e("services", "Photo Studio", "Munawar Photo Studio"),
  e("services", "Tailor", "Fashion Tailor Mehrabpur", { address: "Ward No. 3", phone: "0301-3428710", rating: 3.9, s: "maps", note: "Maps category shows 'Banquet hall' — likely mislabeled; verify." }),
  e("services", "Tailor", "Madina Tailor"),
  e("services", "Beauty Parlour", "Pink Rose Beauty Parlour", { address: "Mojai Mohalla" }),
  e("services", "Salon", "Jatoe Saloon"),
  e("services", "Furniture", "Diamand Furniture House", { phone: "0301-3871045", s: CY + "PK/mehrabpur/industry/" }),
  e("services", "Factory", "Skyla Soap Factory", { address: "Kotri Muhammad Kabir Road", phone: "0300-3224434", s: CY + "PK/mehrabpur/industry/" }),
  e("services", "Cotton Ginning", "Al Madina Cotton Ginners", { address: "Mehrabpur–Sialabad Road", s: CY + "PK/mehrabpur/hotels-%26-travel/" }),
].map((l) => ({ ...l, categoryLabel: getGroup(l.category)?.label }));

export const countByGroup = (gid) => LISTINGS.filter((l) => l.category === gid).length;
export const byGroup = (gid) => LISTINGS.filter((l) => l.category === gid);
export const find = (name) => LISTINGS.find((l) => l.name.toLowerCase().includes(name.toLowerCase()));
export const AREAS_IN_DATA = [...new Set(LISTINGS.map((l) => l.area))].sort();

// Emergency numbers — only what the master dataset lists.
export const EMERGENCY = [
  { name: "Emergency Police", phone: "15", note: "National police emergency number" },
  { name: "Police Station Mehrabpur", phone: "0242-430332", note: "Cybo listing; second Maps-style number 0300-2497076" },
  { name: "NADRA Registration Center (NRC)", phone: "0242-431205", note: "Main Halani Road" },
  { name: "SEPCO Office Mehrabpur", phone: "0242-520014", note: "Kotri Road / Shah Goth area" },
  { name: "SSGC Mehrabpur", phone: "0242-430423", note: "Gas utility" },
  { name: "Bus Terminal", phone: "0301-3224307", note: "Local portal listing" },
];
