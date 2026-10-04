import {
  Stethoscope, GraduationCap, Fuel, UtensilsCrossed, ShoppingBag, CarFront, BedDouble, Landmark, Pill, Trees,
  TrainFront, ShieldCheck, Wheat, Smartphone, Briefcase, Star, CheckCheck, CircleHelp, BadgeCheck, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getGroup } from "@/data/categories";
import { CONFIDENCE } from "@/data/listings";
import { CREDITS } from "@/data/credits";

const ICONS = { Stethoscope, GraduationCap, Fuel, UtensilsCrossed, ShoppingBag, CarFront, BedDouble, Landmark, Pill, Trees, TrainFront, ShieldCheck, Wheat, Smartphone, Briefcase };
const MOSQUE = Landmark;

export function CatIcon({ group, size = 36, className }) {
  const g = typeof group === "string" ? getGroup(group) : group;
  const Icon = g.id === "masjids" ? MOSQUE : ICONS[g.icon] || Briefcase;
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full text-white", className)}
      style={{ width: size, height: size, background: g.color }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2} />
    </span>
  );
}

export function Rating({ value }) {
  if (value == null) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-semibold" title="Rating as shown on Google Maps in the supplied dataset; review count not available">
      <Star size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
      {value.toFixed(1)}
    </span>
  );
}

const TONE = {
  ok: "border-ok/40 text-ok",
  info: "border-line text-muted",
  warn: "border-warn/50 text-warn",
};
export function Confidence({ level, className }) {
  const c = CONFIDENCE[level];
  if (!c) return null;
  const Icon = level === "cross" ? CheckCheck : level === "name" ? CircleHelp : BadgeCheck;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border bg-card px-2 py-0.5 text-[11px] font-semibold", TONE[c.tone], className)} title={c.hint}>
      <Icon size={11} aria-hidden="true" /> {c.label}
    </span>
  );
}

/** Representative or local photo with the exact caption stored in credits.js */
export function Photo({ id, className, imgClassName, eager = false, caption = false, alt }) {
  const c = CREDITS[id];
  if (!c) return null;
  return (
    <figure className={cn("m-0", className)}>
      <img
        src={c.file}
        alt={alt || c.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName)}
      />
      {caption && <figcaption className="mt-1.5 text-[11.5px] leading-snug text-muted">{c.caption}</figcaption>}
    </figure>
  );
}

/** Category cover: real representative photo where one exists, otherwise a flat colour tile with the icon. */
export function CategoryCover({ group, className }) {
  const g = typeof group === "string" ? getGroup(group) : group;
  if (CREDITS[g.cover]) return <Photo id={g.cover} className={cn("overflow-hidden", className)} />;
  return (
    <div className={cn("flex items-center justify-center", className)} style={{ background: `${g.color}1f` }} aria-hidden="true">
      <CatIcon group={g} size={44} />
    </div>
  );
}

export function SectionHead({ title, sub, action, id }) {
  return (
    <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
      <div className="min-w-0">
        <h2 id={id} className="text-[17px] font-bold leading-tight tracking-tight">{title}</h2>
        {sub && <p className="mt-0.5 text-[13px] text-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeading({ title, sub, urdu, crumbs }) {
  return (
    <div className="mb-4">
      {crumbs}
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight sm:text-[26px]">{title}</h1>
        {urdu && <span className="urdu text-lg text-muted" lang="ur" dir="rtl">{urdu}</span>}
      </div>
      {sub && <p className="mt-1 max-w-3xl text-[14px] text-muted">{sub}</p>}
    </div>
  );
}

export function SourceLink({ s, className }) {
  if (!s?.url) return <span className={cn("text-muted", className)}>{s?.label || s?.name}</span>;
  return (
    <a href={s.url} target="_blank" rel="noreferrer noopener" className={cn("text-accent hover:underline", className)}>
      {s.label || s.name}
    </a>
  );
}

export const PinMark = MapPin;
