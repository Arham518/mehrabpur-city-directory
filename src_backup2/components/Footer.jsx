import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Logo } from "./Header";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-card/60">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-4 py-8 lg:flex-row lg:justify-between lg:px-6">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-medium text-muted" aria-label="Footer">
          <Link to="/explore" className="hover:text-accent">About Us</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
          <Link to="/contact#privacy" className="hover:text-accent">Privacy Policy</Link>
          <Link to="/contact#terms" className="hover:text-accent">Terms & Conditions</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 text-muted">
            {[FacebookIcon, TwitterIcon, InstagramIcon].map((I, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} aria-label={["Facebook", "Twitter", "Instagram"][i]} className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition hover:border-accent hover:bg-accent hover:text-white"><I width="16" height="16" /></a>
            ))}
          </div>
          <p className="flex items-center gap-1.5 text-xs text-muted">Made for a Better Community <Heart size={13} className="fill-red-500 text-red-500" /></p>
        </div>
      </div>
      <p className="border-t border-line/60 px-4 py-3 text-center text-[11px] text-muted">
        © {new Date().getFullYear()} Mehrabpur City Portal · Data compiled from public Maps-style listings, local portals and public directories — verify before relying on any entry.
      </p>
    </footer>
  );
}
