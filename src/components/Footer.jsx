import { Link } from "react-router-dom";
import { Logo } from "./Header";
import { CITY } from "@/data/city";
import { LAST_UPDATED, STATS } from "@/data/listings";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-navy-line bg-navy text-white">
      <div className="mx-auto grid max-w-[1480px] gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-[13px] leading-relaxed text-white/65">
            An unofficial community directory for Mehrabpur, Naushahro Feroze, Sindh. {STATS.total} listings, each with its source. Not affiliated with any government office or business listed.
          </p>
        </div>
        <FooterCol title="Explore" links={[["/explore", "About Mehrabpur"], ["/businesses", "Business directory"], ["/railway", "Railway timetable"], ["/map", "Map"]]} />
        <FooterCol title="Community" links={[["/news", "News & events"], ["/villages", "Towns & villages"], ["/history", "History"], ["/government", "Government & emergency"]]} />
        <FooterCol title="Portal" links={[["/sources", "Sources, credits & method"], ["/contact", "Contact / report a correction"], ["/categories", "All categories"]]} />
      </div>
      <div className="border-t border-navy-line">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-2 px-4 py-3 text-[12px] text-white/55 sm:px-6">
          <span>Data last updated {LAST_UPDATED}. Mehrabpur {CITY.postal} · area code {CITY.areaCode}.</span>
          <span>Made for the people of Mehrabpur.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wider text-white/55">{title}</h2>
      <ul className="space-y-1.5">
        {links.map(([to, label]) => (
          <li key={to}><Link to={to} className="text-[13.5px] text-white/80 hover:text-white hover:underline">{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
