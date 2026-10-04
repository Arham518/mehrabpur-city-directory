import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Phone, Navigation, BadgeCheck, TriangleAlert, MapPin, Clock, ArrowRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import { getGroup } from "@/data/categories";
import { directionsUrl, telHref } from "@/lib/maps";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TiltCard } from "./ui/tilt-card";
import { Reveal } from "./ui/reveal";
import { cn } from "@/lib/utils";

export const Container = ({ className, ...p }) => <div className={cn("mx-auto w-full max-w-[1400px] px-4 lg:px-6", className)} {...p} />;

export function SectionTitle({ title, accent, sub, action, className, id }) {
  return (
    <div id={id} className={cn("mb-5 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{title}{accent && <> <span className="text-accent">{accent}</span></>}</h2>
        {sub && <p className="mt-1 max-w-2xl text-sm text-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, accent, urdu, text, image, children, icon }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-accent-soft via-bg to-bg">
      <div className="grid-dots absolute inset-0 opacity-50" aria-hidden />
      <Container className="relative grid items-center gap-8 py-10 lg:grid-cols-[1.2fr_1fr] lg:py-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {eyebrow && <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">{icon && <Icon name={icon} size={13} />}{eyebrow}</p>}
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {title} {accent && <span className="text-accent">{accent}</span>}
          </h1>
          {urdu && <p className="font-urdu mt-2 text-2xl text-muted" dir="rtl">{urdu}</p>}
          {text && <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{text}</p>}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="hidden lg:block">
            <TiltCard max={6}>
              <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
                <img src={image} alt="" className="h-64 w-full object-cover" loading="eager" />
              </div>
            </TiltCard>
          </motion.div>
        )}
      </Container>
    </section>
  );
}

export function Stars({ rating, className }) {
  if (rating == null) return null;
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-bold", className)}>
      <span className="flex">{[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-line"} />
      ))}</span>
      {rating.toFixed(1)}
    </span>
  );
}

export function VerifyBadge({ listing }) {
  return listing.verified
    ? <Badge variant="success"><BadgeCheck size={12} /> Source listed</Badge>
    : <Badge variant="warn"><TriangleAlert size={12} /> Needs verification</Badge>;
}

/** Gradient + icon "photo" used when a listing/category has no real image. */
export function Cover({ group, photo, className, children, iconSize = 54 }) {
  const g = typeof group === "string" ? getGroup(group) : group;
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ background: `linear-gradient(135deg, ${g.grad[0]}, ${g.grad[1]})` }}>
      {photo ? (
        <img src={photo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <>
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #fff 0, transparent 40%), radial-gradient(circle at 85% 80%, #fff 0, transparent 35%)" }} />
          <Icon name={g.icon} size={iconSize} className="absolute right-4 bottom-2 text-white/35 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.4} />
        </>
      )}
      {children}
    </div>
  );
}

export const GroupBadge = ({ group, size = 36 }) => {
  const g = typeof group === "string" ? getGroup(group) : group;
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white/70 dark:ring-black/30" style={{ width: size, height: size, background: g.color }}>
      <Icon name={g.icon} size={size * 0.5} />
    </span>
  );
}

/** Category card for the "Nearby Places" grid (photo/gradient, icon badge, count). */
export function CategoryCard({ group, count, to, i = 0 }) {
  return (
    <Reveal delay={i * 0.04}>
      <TiltCard>
        <Link to={to || `/businesses?cat=${group.id}`} className="group block overflow-hidden rounded-2xl card-surface transition-shadow hover:shadow-2xl">
          <Cover group={group} photo={group.photo} className="h-28 sm:h-32">
            <span className="absolute left-3 top-3"><GroupBadge group={group} size={36} /></span>
          </Cover>
          <div className="flex items-center justify-between gap-2 p-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold">{group.label}</h3>
              <p className="text-xs text-muted">{count} listed places</p>
            </div>
            <ArrowRight size={16} className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}

/** "Top Places" style card: cover, name, stars, type, area, phone, Get Directions. */
export function PlaceCard({ l, i = 0 }) {
  const g = getGroup(l.category);
  return (
    <Reveal delay={i * 0.05} className="h-full">
      <TiltCard max={6}>
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl card-surface">
          <Cover group={g} photo={g.photo && ["masjids", "transport"].includes(g.id) ? g.photo : null} className="h-32">
            <span className="absolute left-3 top-3"><GroupBadge group={g} size={32} /></span>
            {l.hours && <span className="absolute bottom-2 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur"><Clock size={10} />{l.hours}</span>}
          </Cover>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="line-clamp-2 min-h-[2.5rem] text-[15px] font-bold leading-snug">{l.name}</h3>
            <div className="flex flex-wrap items-center gap-2">
              {l.rating != null ? <Stars rating={l.rating} /> : <Badge variant="muted">Not rated</Badge>}
            </div>
            <p className="text-xs text-muted">{l.sub} · <MapPin size={11} className="-mt-0.5 inline" /> {l.area}</p>
            {l.address && <p className="line-clamp-2 text-xs text-muted">{l.address}</p>}
            <div className="mt-auto flex items-center gap-2 pt-1 text-sm font-semibold">
              <Phone size={14} className="text-accent" />
              {l.phones.length ? <a href={telHref(l.phones[0])} className="hover:text-accent">{l.phones[0]}</a> : <span className="text-xs font-normal text-muted">Phone not listed</span>}
            </div>
            <VerifyBadge listing={l} />
            <Button as="a" href={directionsUrl(l)} target="_blank" rel="noreferrer" variant="soft" className="mt-1 w-full"><Navigation size={15} /> Get Directions</Button>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}

/** Compact row for lists/tables. */
export function ListingRow({ l }) {
  const g = getGroup(l.category);
  return (
    <div className="flex items-start gap-3 rounded-2xl card-surface p-3.5 transition hover:border-accent/50">
      <GroupBadge group={g} size={38} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-sm font-bold leading-snug">{l.name}</h3>
          {l.rating != null && <Stars rating={l.rating} className="text-xs" />}
        </div>
        <p className="mt-0.5 text-xs text-muted">{l.sub} · {l.area}{l.address ? ` · ${l.address}` : ""}</p>
        {l.hours && <p className="mt-0.5 text-xs text-muted"><Clock size={11} className="-mt-0.5 inline" /> {l.hours}</p>}
        {l.note && <p className="mt-1 text-[11px] italic text-muted">{l.note}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {l.phones.map((p) => (
            <a key={p} href={telHref(p)} className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent hover:brightness-95"><Phone size={11} />{p}</a>
          ))}
          {l.email && <a href={`mailto:${l.email}`} className="text-xs font-semibold text-accent hover:underline">{l.email}</a>}
          <VerifyBadge listing={l} />
          {l.sourceUrl
            ? <a href={l.sourceUrl} target="_blank" rel="noreferrer" className="text-[11px] text-muted underline decoration-dotted hover:text-accent">{l.source}</a>
            : <span className="text-[11px] text-muted">{l.source}</span>}
        </div>
      </div>
      <a href={directionsUrl(l)} target="_blank" rel="noreferrer" aria-label={`Directions to ${l.name}`} title="Get Directions" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-white"><Navigation size={15} /></a>
    </div>
  );
}

export function EmptyState({ text = "No places match your filters." }) {
  return <div className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-muted">{text}</div>;
}
