export interface TrainInfo {
  number: string;
  name: string;
  nameUrdu: string;
  direction: 'UP' | 'DOWN';
  route: string;
  from: string;
  to: string;
  mhrStop: string;
  slot: string;
  frequency: string;
  platform: number;
  classes: string[];
  status: string;
}

export interface CommodityPrice {
  name: string;
  nameUrdu: string;
  weight: string;
  price: number;
  change: 'up' | 'down' | 'flat';
  changeAmount: string;
  trend: string;
}

export interface MandiBusiness {
  name: string;
  nameUrdu: string;
  category: 'traders' | 'fertilizers' | 'cotton' | 'machinery' | 'storage';
  badge: string;
  location: string;
  specialty: string;
  phone: string;
  verified: boolean;
}

export interface DoctorInfo {
  name: string;
  nameUrdu: string;
  title: string;
  specialty: string;
  qualification: string;
  pmdcNo: string;
  hospital: string;
  timing: string;
  phone: string;
  emergency: boolean;
}

export interface CivicOffice {
  title: string;
  titleUrdu: string;
  officer: string;
  role: string;
  address: string;
  phone: string;
  emergencyHelpline?: string;
  timing: string;
  services: string[];
  domain: string;
}

export const VITAL_METRICS = {
  cityPopulation: "57,978",
  talukaPopulation: "273,567",
  unionCouncils: 6,
  postalCode: "67000",
  prCode: "MHR",
  elevation: "38m ASL",
  coordinates: "27.1042° N, 68.4231° E",
  district: "Naushahro Feroze",
  division: "Shaheed Benazirabad",
  province: "Sindh",
  establishedMandi: "1914",
  municipalArea: "422 km²",
  annualGrainInflow: "142,000+ Metric Tons",
  dailyGurTrading: "38,500 Bags",
  licensedBrokers: "120+ Wholesale Houses",
  expressStoppingTrains: 18,
};

// All 18 Scheduled Express Services from Stitch Screen 2
export const TRAINS_DATA: TrainInfo[] = [
  // --- UP TRAINS (Karachi -> North) ---
  {
    number: "25 UP",
    name: "Bahauddin Zikria Express",
    nameUrdu: "بہاؤالدین زکریا ایکسپریس",
    direction: "UP",
    route: "Karachi Cantt → Multan Cantt",
    from: "Karachi Cantt",
    to: "Multan Cantt",
    mhrStop: "~00:58",
    slot: "Midnight Stop",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "AC Business"],
    status: "On Time"
  },
  {
    number: "37 UP",
    name: "Fareed Express",
    nameUrdu: "فرید ایکسپریس",
    direction: "UP",
    route: "Karachi City → Lahore Jn",
    from: "Karachi City",
    to: "Lahore Jn",
    mhrStop: "~02:20",
    slot: "Late Night",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "Sleeper"],
    status: "On Time"
  },
  {
    number: "1 UP",
    name: "Khyber Mail",
    nameUrdu: "خیبر میل",
    direction: "UP",
    route: "Karachi Cantt → Peshawar Cantt",
    from: "Karachi Cantt",
    to: "Peshawar Cantt",
    mhrStop: "~05:10",
    slot: "Dawn Priority",
    frequency: "Daily",
    platform: 1,
    classes: ["AC Sleeper", "AC Business", "Economy"],
    status: "On Time"
  },
  {
    number: "145 UP",
    name: "Sukkur Express",
    nameUrdu: "سکھر ایکسپریس",
    direction: "UP",
    route: "Karachi City → Jacobabad Jn",
    from: "Karachi City",
    to: "Jacobabad Jn",
    mhrStop: "~06:06",
    slot: "Early Morning",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy"],
    status: "On Time"
  },
  {
    number: "11 UP",
    name: "Hazara Express",
    nameUrdu: "ہزارہ ایکسپریس",
    direction: "UP",
    route: "Karachi City → Havelian (KPK)",
    from: "Karachi City",
    to: "Havelian (KPK)",
    mhrStop: "~13:35",
    slot: "Afternoon",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "AC Standard"],
    status: "On Time"
  },
  {
    number: "13 UP",
    name: "Awam Express",
    nameUrdu: "عوام ایکسپریس",
    direction: "UP",
    route: "Karachi Cantt → Peshawar Cantt",
    from: "Karachi Cantt",
    to: "Peshawar Cantt",
    mhrStop: "~14:20",
    slot: "Afternoon",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "AC Lower"],
    status: "On Time"
  },
  {
    number: "9 UP",
    name: "Allama Iqbal Express",
    nameUrdu: "علامہ اقبال ایکسپریس",
    direction: "UP",
    route: "Karachi Cantt → Sialkot Jn",
    from: "Karachi Cantt",
    to: "Sialkot Jn",
    mhrStop: "~19:15",
    slot: "Evening",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "AC Standard"],
    status: "On Time"
  },
  {
    number: "7 UP",
    name: "Tezgam Express",
    nameUrdu: "تیزگام ایکسپریس",
    direction: "UP",
    route: "Karachi Cantt → Rawalpindi",
    from: "Karachi Cantt",
    to: "Rawalpindi",
    mhrStop: "~20:45",
    slot: "Prime Night",
    frequency: "Daily",
    platform: 1,
    classes: ["Economy", "AC Business", "AC Sleeper"],
    status: "On Time"
  },
  {
    number: "15 UP",
    name: "Karachi Express",
    nameUrdu: "کراچی ایکسپریس",
    direction: "UP",
    route: "Karachi Cantt → Lahore Jn",
    from: "Karachi Cantt",
    to: "Lahore Jn",
    mhrStop: "~23:15",
    slot: "Night Express",
    frequency: "Daily",
    platform: 1,
    classes: ["AC Business", "Economy"],
    status: "On Time"
  },

  // --- DOWN TRAINS (North -> Karachi) ---
  {
    number: "146 DN",
    name: "Sukkur Express",
    nameUrdu: "سکھر ایکسپریس",
    direction: "DOWN",
    route: "Jacobabad Jn → Karachi City",
    from: "Jacobabad Jn",
    to: "Karachi City",
    mhrStop: "~01:25",
    slot: "Midnight",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy"],
    status: "On Time"
  },
  {
    number: "26 DN",
    name: "Bahauddin Zikria Express",
    nameUrdu: "بہاؤالدین زکریا ایکسپریس",
    direction: "DOWN",
    route: "Multan Cantt → Karachi Cantt",
    from: "Multan Cantt",
    to: "Karachi Cantt",
    mhrStop: "~02:40",
    slot: "Night",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "AC Business"],
    status: "On Time"
  },
  {
    number: "8 DN",
    name: "Tezgam Express",
    nameUrdu: "تیزگام ایکسپریس",
    direction: "DOWN",
    route: "Rawalpindi → Karachi Cantt",
    from: "Rawalpindi",
    to: "Karachi Cantt",
    mhrStop: "~03:10",
    slot: "Late Night",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "AC Business", "AC Sleeper"],
    status: "On Time"
  },
  {
    number: "38 DN",
    name: "Fareed Express",
    nameUrdu: "فرید ایکسپریس",
    direction: "DOWN",
    route: "Lahore Jn → Karachi City",
    from: "Lahore Jn",
    to: "Karachi City",
    mhrStop: "~04:10",
    slot: "Pre-Dawn",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "Sleeper"],
    status: "On Time"
  },
  {
    number: "16 DN",
    name: "Karachi Express",
    nameUrdu: "کراچی ایکسپریس",
    direction: "DOWN",
    route: "Lahore Jn → Karachi Cantt",
    from: "Lahore Jn",
    to: "Karachi Cantt",
    mhrStop: "~05:30",
    slot: "Dawn",
    frequency: "Daily",
    platform: 2,
    classes: ["AC Business", "Economy"],
    status: "On Time"
  },
  {
    number: "10 DN",
    name: "Allama Iqbal Express",
    nameUrdu: "علامہ اقبال ایکسپریس",
    direction: "DOWN",
    route: "Sialkot Jn → Karachi Cantt",
    from: "Sialkot Jn",
    to: "Karachi Cantt",
    mhrStop: "~07:45",
    slot: "Morning",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "AC Standard"],
    status: "On Time"
  },
  {
    number: "12 DN",
    name: "Hazara Express",
    nameUrdu: "ہزارہ ایکسپریس",
    direction: "DOWN",
    route: "Havelian (KPK) → Karachi City",
    from: "Havelian (KPK)",
    to: "Karachi City",
    mhrStop: "~09:45",
    slot: "Morning",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "AC Standard"],
    status: "On Time"
  },
  {
    number: "14 DN",
    name: "Awam Express",
    nameUrdu: "عوام ایکسپریس",
    direction: "DOWN",
    route: "Peshawar Cantt → Karachi Cantt",
    from: "Peshawar Cantt",
    to: "Karachi Cantt",
    mhrStop: "~11:35",
    slot: "Noon",
    frequency: "Daily",
    platform: 2,
    classes: ["Economy", "AC Lower"],
    status: "On Time"
  },
  {
    number: "2 DN",
    name: "Khyber Mail",
    nameUrdu: "خیبر میل",
    direction: "DOWN",
    route: "Peshawar Cantt → Karachi Cantt",
    from: "Peshawar Cantt",
    to: "Karachi Cantt",
    mhrStop: "~18:25",
    slot: "Evening",
    frequency: "Daily",
    platform: 2,
    classes: ["AC Sleeper", "AC Business", "Economy"],
    status: "On Time"
  }
];

// Commodity Prices from Stitch Screen 3
export const COMMODITIES_DATA: CommodityPrice[] = [
  {
    name: "Wheat (Gandum)",
    nameUrdu: "گندم",
    weight: "100 kg bag",
    price: 8850,
    change: "up",
    changeAmount: "+Rs 150",
    trend: "Heavy regional arrivals from Taluka Mehrabpur farms into central grain granary"
  },
  {
    name: "Gur / Desi Shakar",
    nameUrdu: "دیسی گُڑ / شکر",
    weight: "40 kg (1 Maund)",
    price: 7200,
    change: "up",
    changeAmount: "+Rs 200",
    trend: "Strong provincial demand from Karachi, Balochistan & Quetta buyers"
  },
  {
    name: "Seed Cotton (Phutti / Kapas)",
    nameUrdu: "پھٹی (کپاس)",
    weight: "40 kg (1 Maund)",
    price: 8400,
    change: "up",
    changeAmount: "+Rs 100",
    trend: "Sindh premium grade fiber in active trading across local ginning factories"
  },
  {
    name: "Rice (Irri-6)",
    nameUrdu: "چاول اری-6",
    weight: "50 kg bag",
    price: 4950,
    change: "flat",
    changeAmount: "Rs 0",
    trend: "Stable export mills procurement from Larkana & Dadu feeder lines"
  },
  {
    name: "Mustard Seeds (Sarsoon)",
    nameUrdu: "سرسوں بیج",
    weight: "40 kg (1 Maund)",
    price: 6100,
    change: "up",
    changeAmount: "+Rs 50",
    trend: "Local edible oil expelling mills purchasing regular lots"
  },
  {
    name: "Sunflower Seeds",
    nameUrdu: "سورج مکھی",
    weight: "40 kg (1 Maund)",
    price: 7800,
    change: "flat",
    changeAmount: "Rs 0",
    trend: "Brisk trade in regional processing units and solvent extraction facilities"
  }
];

// Mandi Establishments from Stitch Screen 3
export const MANDI_BUSINESSES: MandiBusiness[] = [
  {
    name: "Memon Fertilizers",
    nameUrdu: "میمن فرٹیلائزرز غلہ منڈی",
    category: "fertilizers",
    badge: "Fertilizer & Nutrients",
    location: "Ghalla Mandi, near FSC Godown",
    specialty: "Urea, DAP, Zinc & Specialized Micronutrients",
    phone: "0242-430255",
    verified: true
  },
  {
    name: "Nafees Fertilizer Agency",
    nameUrdu: "نفیس فرٹیلائزر ایجنسی",
    category: "fertilizers",
    badge: "Pioneer Agency",
    location: "Grain Market, Central Mehrabpur",
    specialty: "Engro, FFC & Multi-Brand National Agencies",
    phone: "0242-430118",
    verified: true
  },
  {
    name: "Haji Abdul Ghaffar & Sons",
    nameUrdu: "حاجی عبدالغفار اینڈ سنز غلہ کمیشن",
    category: "traders",
    badge: "Master Grain Broker",
    location: "Station Road, Mandi Gate #1",
    specialty: "Wholesale Wheat & Sugarcane Jaggery Auctions",
    phone: "0300-3214567",
    verified: true
  },
  {
    name: "Al-Madina Cotton Ginning & Pressing",
    nameUrdu: "المدینہ کاٹن جننگ اینڈ پریسنگ فیکٹری",
    category: "cotton",
    badge: "Ginning & Export",
    location: "Thari Road Industrial Zone",
    specialty: "Raw Kapas Ginning, Bales Pressing & Cotton Seed Oil",
    phone: "0242-441290",
    verified: true
  },
  {
    name: "Mehrabpur Modern Cold Storage",
    nameUrdu: "محراب پور جدید کولڈ اسٹوریج",
    category: "storage",
    badge: "Temp-Controlled Silo",
    location: "Railway Bypass, Near Station Yard",
    specialty: "5,000 MT Seed Potato, Vegetables & Fruit Warehousing",
    phone: "0301-8392100",
    verified: true
  },
  {
    name: "Al-Rehman Agri Implements",
    nameUrdu: "الرحمٰن زرعی آلات و ٹریکٹر اسپیئر پارٹس",
    category: "machinery",
    badge: "Tractor & Implements",
    location: "Station Chowk, Mehrabpur",
    specialty: "Millat/Fiat Implements, Rotavators, Harvesters & Laser Levelers",
    phone: "0302-7718902",
    verified: true
  },
  {
    name: "Bismillah Rice Trading Agency",
    nameUrdu: "بسم اللہ رائس ٹریڈنگ ایجنسی",
    category: "traders",
    badge: "Grain Brokerage",
    location: "Halani Road Mandi Corridor",
    specialty: "Super Kernel Basmati, Irri-6 & Parboiled Rice Supply",
    phone: "0303-9182341",
    verified: true
  },
  {
    name: "Sindh Agro Seeds Corporation",
    nameUrdu: "سندھ ایگرو سیڈز کارپوریشن",
    category: "fertilizers",
    badge: "Certified Seed House",
    location: "Main Mandi Market, Shop #24",
    specialty: "FSC&RD Certified Wheat, Cotton & Hybrid Maize Seeds",
    phone: "0242-430880",
    verified: true
  },
  {
    name: "Ittehad Cotton & Grain Merchants",
    nameUrdu: "اتحاد کاٹن اینڈ گرین مرچنٹس",
    category: "cotton",
    badge: "Fiber Trade",
    location: "Grain Market West Wing",
    specialty: "Seed Cotton (Phutti) Spot Contracts & Delivery",
    phone: "0305-6291040",
    verified: true
  }
];

// Medical Directory from Stitch Screen 4
export const DOCTORS_DATA: DoctorInfo[] = [
  {
    name: "Dr. Muhammad Rafique Memon",
    nameUrdu: "ڈاکٹر محمد رفیق میمن",
    title: "Senior Consultant Physician & Cardiologist",
    specialty: "General Medicine & Cardiology",
    qualification: "MBBS, FCPS (Medicine), Dip. Cardiology",
    pmdcNo: "PMDC-41829-S",
    hospital: "Taluka Headquarter Hospital (THQ) / Al-Shifa Medical Complex",
    timing: "10:00 AM - 02:00 PM & 06:00 PM - 09:30 PM",
    phone: "0300-3298412",
    emergency: true
  },
  {
    name: "Dr. Farzana Parveen Soomro",
    nameUrdu: "ڈاکٹر فرزانہ پروین سومرو",
    title: "Consultant Gynecologist & Obstetrician",
    specialty: "Gynecology & Obstetrics",
    qualification: "MBBS, MCPS, DGO (LUMHS)",
    pmdcNo: "PMDC-52901-S",
    hospital: "Maternity & Mother-Child Health Center, Station Road",
    timing: "09:00 AM - 01:30 PM & 05:00 PM - 08:30 PM",
    phone: "0301-8392019",
    emergency: true
  },
  {
    name: "Dr. Tariq Hussain Rajper",
    nameUrdu: "ڈاکٹر طارق حسین راجپر",
    title: "Pediatrician & Neonatology Specialist",
    specialty: "Pediatrics & Child Care",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    pmdcNo: "PMDC-39184-S",
    hospital: "City Care Children Hospital, Near Main Chowk",
    timing: "11:00 AM - 03:00 PM & 06:30 PM - 10:00 PM",
    phone: "0302-5541298",
    emergency: false
  },
  {
    name: "Dr. Abdul Sattar Bhatti",
    nameUrdu: "ڈاکٹر عبد الستار بھٹی",
    title: "Consultant General & Laparoscopic Surgeon",
    specialty: "Surgery & Trauma",
    qualification: "MBBS, MS (General Surgery)",
    pmdcNo: "PMDC-48210-S",
    hospital: "THQ Hospital Mehrabpur / Bhatti Surgical Clinic",
    timing: "09:00 AM - 02:00 PM (Emergency 24/7 on call)",
    phone: "0300-9812401",
    emergency: true
  },
  {
    name: "Dr. Naeem Ahmed Arain",
    nameUrdu: "ڈاکٹر نعیم احمد ارائیں",
    title: "Ophthalmologist & Eye Surgeon",
    specialty: "Ophthalmology & Eye Care",
    qualification: "MBBS, DOMS, Phaco Fellow",
    pmdcNo: "PMDC-34019-S",
    hospital: "Noor Eye Clinic, Hospital Road Mehrabpur",
    timing: "04:00 PM - 09:00 PM",
    phone: "0303-7281900",
    emergency: false
  },
  {
    name: "Dr. Saima Naz",
    nameUrdu: "ڈاکٹر صائمہ ناز",
    title: "Consultant Dental Surgeon",
    specialty: "Dental Surgery & Orthodontics",
    qualification: "BDS, RDS (Sindh)",
    pmdcNo: "PMDC-6182-D",
    hospital: "Mehrabpur Dental Care, Station Road",
    timing: "11:00 AM - 02:00 PM & 05:00 PM - 09:00 PM",
    phone: "0305-4491023",
    emergency: false
  }
];

// Civic Offices from Stitch Screen 1
export const CIVIC_OFFICES: CivicOffice[] = [
  {
    title: "Taluka Municipal Administration (TMA)",
    titleUrdu: "تعلقہ میونسپل ایڈمنسٹریشن",
    officer: "Taluka Municipal Officer (TMO)",
    role: "Urban Services & Infrastructure Governance",
    address: "TMA Head Office, Railway Road, Mehrabpur",
    phone: "0242-441180",
    timing: "Mon - Sat: 08:30 AM - 04:00 PM",
    services: ["Sanitation & Municipal Water Supply", "Building Plan Approvals", "Birth, Death & Marriage Certs", "Trade Licenses"],
    domain: "Municipal Infrastructure"
  },
  {
    title: "Mukhtiarkar Revenue Office",
    titleUrdu: "دفتر مختیارکار ریونیو",
    officer: "Mukhtiarkar Taluka Mehrabpur",
    role: "Land Settlement & Revenue Cadastre",
    address: "Tehsil Complex, Court Road, Mehrabpur",
    phone: "0242-441055",
    timing: "Mon - Fri: 09:00 AM - 04:30 PM",
    services: ["Fard Malkiat & Dakhil Kharij", "Land Mutations & Record of Rights", "Agricultural Cadastral Maps", "Domicile & PRC Verification"],
    domain: "Land & Revenue"
  },
  {
    title: "NADRA Registration Center (NRC)",
    titleUrdu: "نادرا رجسٹریشن سینٹر محراب پور",
    officer: "Center In-Charge",
    role: "National Identity & Citizen Database",
    address: "Near General Post Office (GPO), Station Road",
    phone: "0242-441890",
    timing: "Mon - Fri: 08:30 AM - 04:30 PM (Tokens until 03:00 PM)",
    services: ["Smart Computerized CNIC / NICOP", "Child Registration Certificate (B-Form)", "Family Registration Certificate (FRC)", "Biometric Verification"],
    domain: "Civil Registration"
  },
  {
    title: "Police Station Mehrabpur (City)",
    titleUrdu: "تھانہ محراب پور سٹی (پولیس)",
    officer: "Station House Officer (SHO)",
    role: "Law Enforcement & Public Security",
    address: "Main Thana Road, Mehrabpur",
    phone: "0242-441015",
    emergencyHelpline: "15",
    timing: "24/7 Operations Desk",
    services: ["Emergency Police Dispatch 15", "FIR Registration & Legal Reporting", "Character Certificate Verification", "Highway & Town Patrol"],
    domain: "Law & Order"
  },
  {
    title: "SEPCO / WAPDA Sub-Division",
    titleUrdu: "سیپکو / واپڈا سب ڈویژن",
    officer: "Sub-Divisional Officer (SDO)",
    role: "Power Distribution & Grid Operations",
    address: "Grid Station Road, Mehrabpur",
    phone: "0242-441310",
    emergencyHelpline: "118",
    timing: "24/7 Power Complaint Desk",
    services: ["New Commercial & Domestic Connections", "Billing Corrections & Tariffs", "Distribution Transformer Upgrades", "Emergency Line Repairs"],
    domain: "Energy & Utilities"
  }
];
