// Mehrabpur Junction (MHR). Times are the scheduled arrival/departure at Mehrabpur from the Pakistan Railways
// timetable as republished by traintracking.pk (fetched 4 Oct 2026). All 18 stopping services match the first dataset.
export const STATION = {
  name: "Mehrabpur Junction",
  code: "MHR",
  line: "Karachi–Peshawar main line (ML-1); disused Tando Adam–Mehrabpur branch",
  coords: [27.09967, 68.42095],
  opened: "1914 (local portal; not confirmed against Pakistan Railways records)",
  fetched: "2026-10-04",
  validity: "Summer timetable 15 Apr – 14 Oct 2026. Pakistan Railways issues a new timetable twice a year, so times can change from 15 Oct.",
};

const T = (no, train, route, arr, dep) => ({ no, train, route, arr, dep, src: `https://traintracking.pk/trains/${train.toLowerCase().replace(/ /g, "-").replace("zikria", "zikria")}-${no.toLowerCase()}` });

export const UP_TRAINS = [
  T("25UP", "Bahauddin Zikria Express", "Karachi → Multan", "00:58", "01:00"),
  T("37UP", "Fareed Express", "Karachi → Lahore", "02:20", "02:22"),
  T("145UP", "Sukkur Express", "Karachi → Jacobabad", "06:06", "06:08"),
  T("11UP", "Hazara Express", "Karachi → Havelian", "13:35", "13:37"),
  T("13UP", "Awam Express", "Karachi → Peshawar", "14:55", "14:57"),
  T("47UP", "Rehman Baba Express", "Karachi → Peshawar", "18:10", "18:12"),
  T("9UP", "Allama Iqbal Express", "Karachi → Sialkot", "21:20", "21:22"),
  T("17UP", "Millat Express", "Karachi → Lala Musa", "22:51", "22:53"),
  T("7UP", "Tezgam", "Karachi → Rawalpindi", "23:09", "23:11"),
];
export const DOWN_TRAINS = [
  T("38DN", "Fareed Express", "Lahore → Karachi", "00:01", "00:03"),
  T("26DN", "Bahauddin Zikria Express", "Multan → Karachi", "01:00", "01:02"),
  T("10DN", "Allama Iqbal Express", "Sialkot → Karachi", "01:50", "01:52"),
  T("8DN", "Tezgam", "Rawalpindi → Karachi", "03:02", "03:04"),
  T("18DN", "Millat Express", "Lala Musa → Karachi", "05:26", "05:28"),
  T("48DN", "Rehman Baba Express", "Peshawar → Karachi", "09:13", "09:15"),
  T("14DN", "Awam Express", "Peshawar → Karachi", "10:48", "10:51"),
  T("12DN", "Hazara Express", "Havelian → Karachi", "16:35", "16:37"),
  T("146DN", "Sukkur Express", "Jacobabad → Karachi", "23:01", "23:03"),
];

// A second local source (mehrabpursindh.com, "2026" table) lists different times for 8 of these trains and one extra train.
export const OTHER_SOURCE = {
  label: "mehrabpursindh.com timetable table",
  url: "https://www.mehrabpursindh.com/mehrabpur-train-time-table-mehrabpur-junction-railways-info/",
  note: "That page shows different times (for example Tezgam 7UP at 23:07, Allama Iqbal 9UP at 20:44, Millat 17UP at 22:23) and adds Khyber Mail 2DN at 08:46. It may follow another timetable period, so it is shown here only for comparison and is not used in the table above.",
  rows: [
    ["7UP Tezgam", "23:07", "23:09"], ["9UP Allama Iqbal", "20:44", "20:46"], ["17UP Millat", "22:23", "22:25"], ["13UP Awam", "14:12", "14:14"],
    ["8DN Tezgam", "03:22", "03:24"], ["10DN Allama Iqbal", "01:41", "01:43"], ["18DN Millat", "04:00", "04:02"], ["14DN Awam", "11:07", "11:09"], ["2DN Khyber Mail", "08:46", "08:48"],
  ],
};

export const STATION_CONTACTS = [
  ["Railway Police helpline", "1333"],
  ["Station Police", "0242-431010"],
  ["General inquiry (national)", "117"],
  ["Police emergency", "15"],
];
export const STATION_TIPS = [
  "Arrive at least 20 minutes before the scheduled time (local portal advice).",
  "Up-country trains mostly use Platform 1 and down-country trains Platform 2 (local portal); confirm at the inquiry counter.",
  "The booking office is listed as open 24 hours (pakistani.pk, unofficial).",
];
