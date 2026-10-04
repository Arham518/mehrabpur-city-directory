// Section 3 — Mehrabpur Junction (MHR) scheduled timetable (approximate, ~ times; delays are common)
export const STATION = {
  name: "Mehrabpur Junction Railway Station",
  code: "MHR",
  location: "Shah Goth / Station Road area",
  corridor: "Karachi–Peshawar railway line",
  services: "18 stopping services — 9 Up + 9 Down",
  built: "Local history source associates the station with 1914 (label as local/history source)",
  source: "https://mehrabpursindh.com/",
  future_fields: ["scheduled_arrival", "scheduled_departure", "last_updated", "live_status"],
  last_updated: "2026-10-03",
};

export const UP_TRAINS = [
  { train: "Bahauddin Zikria Express", no: "25UP", route: "Karachi → Multan", time: "00:58" },
  { train: "Fareed Express", no: "37UP", route: "Karachi → Lahore", time: "02:20" },
  { train: "Sukkur Express", no: "145UP", route: "Karachi → Jacobabad", time: "06:06" },
  { train: "Hazara Express", no: "11UP", route: "Karachi → Havelian", time: "13:35" },
  { train: "Awam Express", no: "13UP", route: "Karachi → Peshawar", time: "14:55" },
  { train: "Rehman Baba Express", no: "47UP", route: "Karachi → Peshawar", time: "18:10" },
  { train: "Allama Iqbal Express", no: "9UP", route: "Karachi → Sialkot", time: "21:20" },
  { train: "Millat Express", no: "17UP", route: "Karachi → Lala Musa", time: "22:51" },
  { train: "Tezgam", no: "7UP", route: "Karachi → Rawalpindi", time: "23:09" },
];

export const DOWN_TRAINS = [
  { train: "Fareed Express", no: "38DN", route: "Lahore → Karachi", time: "00:01" },
  { train: "Bahauddin Zikria Express", no: "26DN", route: "Multan → Karachi", time: "01:00" },
  { train: "Allama Iqbal Express", no: "10DN", route: "Sialkot → Karachi", time: "01:50" },
  { train: "Tezgam", no: "8DN", route: "Rawalpindi → Karachi", time: "03:02" },
  { train: "Millat Express", no: "18DN", route: "Lala Musa → Karachi", time: "05:26" },
  { train: "Rehman Baba Express", no: "48DN", route: "Peshawar → Karachi", time: "09:13" },
  { train: "Awam Express", no: "14DN", route: "Peshawar → Karachi", time: "10:48" },
  { train: "Hazara Express", no: "12DN", route: "Havelian → Karachi", time: "16:35" },
  { train: "Sukkur Express", no: "146DN", route: "Jacobabad → Karachi", time: "23:01" },
];
