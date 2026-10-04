import {
  BedDouble,
  Briefcase,
  CalendarDays,
  CarFront,
  Compass,
  Construction,
  Contact,
  Fuel,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Mosque,
  Navigation,
  Newspaper,
  Phone,
  Pill,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Stethoscope,
  Store,
  Syringe,
  TrainFront,
  Trees,
  UtensilsCrossed,
  Wheat,
} from "lucide-react";

const MAP = {
  BedDouble, Briefcase, CalendarDays, CarFront, Compass, Construction, Contact, Fuel, GraduationCap, Landmark, LayoutGrid, Mail, Map, MapPin, MapPinned, Mosque, Navigation, Newspaper, Phone, Pill, ShieldCheck, ShoppingBag, Smartphone, Star, Stethoscope, Store, Syringe, TrainFront, Trees, UtensilsCrossed, Wheat
};

export const Icon = ({ name, ...props }) => {
  const C = MAP[name] || MapPin;
  return <C {...props} />;
};

export const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z"/></svg>
);
export const TwitterIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 3h3l-6.6 7.5L21.7 21h-6.1l-4.8-6.3L5.3 21h-3l7-8.1L2.3 3h6.2l4.3 5.7L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z"/></svg>
);
export const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
);
