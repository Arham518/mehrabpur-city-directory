import { useState } from "react";
import { Send, Mail, ShieldCheck } from "lucide-react";
import { Container, PageHero, SectionTitle } from "@/components/common";
import { Button } from "@/components/ui/button";
import { CATEGORY_GROUPS } from "@/data/categories";

const field = "h-11 w-full rounded-xl border border-line bg-bg px-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const old = JSON.parse(localStorage.getItem("mhr_suggestions") || "[]");
      localStorage.setItem("mhr_suggestions", JSON.stringify([...old, { ...data, at: new Date().toISOString() }]));
    } catch (err) { /* ignore */ }
    setSent(true);
    e.currentTarget.reset();
  };
  return (
    <>
      <PageHero eyebrow="Contact" icon="Mail" title="Contact &" accent="Suggestions" text="Found a wrong phone number or want to add a business? Send a correction. (This demo form stores the message in your browser only — connect it to an email/API/Google Form to receive messages.)" />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="card-surface space-y-4 rounded-3xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">Your name<input name="name" required className={`${field} mt-1`} /></label>
            <label className="text-sm font-semibold">Phone / Email<input name="contact" className={`${field} mt-1`} /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">Business / place name<input name="place" className={`${field} mt-1`} /></label>
            <label className="text-sm font-semibold">Category
              <select name="category" className={`${field} mt-1`}>{CATEGORY_GROUPS.map((g) => <option key={g.id}>{g.label}</option>)}</select>
            </label>
          </div>
          <label className="block text-sm font-semibold">Message / correction
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-xl border border-line bg-bg p-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" placeholder="e.g. Phone number of X clinic has changed to …" />
          </label>
          <Button type="submit" size="lg"><Send size={16} /> Send</Button>
          {sent && <p className="rounded-xl bg-emerald-500/10 p-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Shukriya! Saved locally in this browser (no server is connected yet).</p>}
        </form>
        <div className="space-y-5">
          <div id="privacy" className="card-surface scroll-mt-28 rounded-3xl p-6"><h3 className="flex items-center gap-2 font-extrabold"><ShieldCheck size={18} className="text-accent" /> Privacy Policy</h3><p className="mt-2 text-sm leading-relaxed text-muted">This site shows publicly listed business information. The contact form does not send data to any server; the “My Location” feature uses your browser location only on your device and only after you grant permission. Your theme preference is stored in localStorage.</p></div>
          <div id="terms" className="card-surface scroll-mt-28 rounded-3xl p-6"><h3 className="flex items-center gap-2 font-extrabold"><Mail size={18} className="text-accent" /> Terms & Conditions</h3><p className="mt-2 text-sm leading-relaxed text-muted">Listings are compiled from public Maps-style sources, local portals and directories and may be outdated or inaccurate. Verify phone numbers, hours and timetables before relying on them. Railway times are scheduled, not live.</p></div>
        </div>
      </Container>
    </>
  );
}
