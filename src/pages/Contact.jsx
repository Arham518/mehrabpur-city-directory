import { useMemo, useState } from "react";
import { Check, Copy, Mail, MessageCircle } from "lucide-react";
import PageShell from "@/components/Shell";
import { PageHeading } from "@/components/Ui";
import { SITE_EMAIL, WHATSAPP_NUMBER } from "@/data/contact";
import { usePageMeta } from "@/hooks/usePageMeta";

const TOPICS = ["Correct a listing", "Add a business", "Report a wrong phone number", "Suggest news or an event", "Something else"];

export default function Contact() {
  usePageMeta("Contact and corrections", "Suggest a correction or a new listing for the Mehrabpur City Portal.");
  const [f, setF] = useState({ name: "", topic: TOPICS[0], listing: "", message: "" });
  const [copied, setCopied] = useState(false);
  const up = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const text = useMemo(() => [`Topic: ${f.topic}`, f.listing && `Listing: ${f.listing}`, f.name && `From: ${f.name}`].filter(Boolean).join("\n") + "\n\n" + f.message, [f]);
  const valid = f.message.trim().length > 4;
  const subject = `Mehrabpur City Portal: ${f.topic}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { window.prompt("Copy this message:", text); }
  };
  const mail = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${subject}\n\n${text}`)}`;
  return (
    <PageShell side={false}>
      <PageHeading title="Contact and corrections" sub="Found a wrong number, a closed shop or a missing place? Write it below." />
      <div className="mb-4 rounded-lg border border-line bg-soft p-3.5 text-[13px] text-muted">
        <strong className="text-ink">This page does not send anything by itself.</strong> The site has no server. Write your message, then copy it or open it in your email app or WhatsApp.
        {!SITE_EMAIL && " No portal email address is configured yet, so your email app will open without a recipient."}
        {!WHATSAPP_NUMBER && " WhatsApp opens its share screen so you choose the contact."}
      </div>
      <form className="panel grid gap-4 p-4 sm:p-5 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="c-name" className="mb-1 block text-[13px] font-semibold">Your name (optional)</label>
          <input id="c-name" className="field" value={f.name} onChange={up("name")} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="c-topic" className="mb-1 block text-[13px] font-semibold">Topic</label>
          <select id="c-topic" className="field" value={f.topic} onChange={up("topic")}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="c-listing" className="mb-1 block text-[13px] font-semibold">Listing name or link (optional)</label>
          <input id="c-listing" className="field" value={f.listing} onChange={up("listing")} placeholder="e.g. Royal Medical Center Mehrabpur" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="c-msg" className="mb-1 block text-[13px] font-semibold">Message</label>
          <textarea id="c-msg" className="field min-h-32" value={f.message} onChange={up("message")} placeholder="What should be changed, and how do you know?" />
        </div>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <button type="button" className="btn btn-primary" onClick={copy} disabled={!valid}>{copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy message</>}</button>
          <a className={`btn btn-outline ${!valid ? "pointer-events-none opacity-50" : ""}`} href={valid ? mail : undefined} aria-disabled={!valid}><Mail size={15} /> Open in email app</a>
          <a className={`btn btn-outline ${!valid ? "pointer-events-none opacity-50" : ""}`} href={valid ? wa : undefined} target="_blank" rel="noreferrer noopener" aria-disabled={!valid}><MessageCircle size={15} /> Share on WhatsApp</a>
        </div>
        {!valid && <p className="text-[12px] text-muted md:col-span-2">Type a message to enable the buttons.</p>}
      </form>
    </PageShell>
  );
}
