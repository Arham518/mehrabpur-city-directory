import { Link } from "react-router-dom";
import PageShell from "@/components/Shell";
import { PageHeading, SourceLink } from "@/components/Ui";
import { NEWS, NEWS_SOURCE } from "@/data/places";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function News() {
  usePageMeta("Local news and events", "Local news, events and civic updates for Mehrabpur, with dates and sources.");
  return (
    <PageShell>
      <PageHeading title="News and events" sub="Items republished from the local community portal, with their dates. This site has no editor, so nothing here is breaking news." />
      <ul className="space-y-3">
        {NEWS.map((n) => (
          <li key={n.title} className="panel p-4">
            <div className="flex flex-wrap items-center gap-2"><span className="chip !text-accent">{n.type}</span><time className="text-[12.5px] text-muted">{n.date}</time></div>
            <h2 className="mt-1.5 text-[16px] font-bold">{n.title}</h2>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">{n.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-muted">Source: <SourceLink s={NEWS_SOURCE} />. Spotted a newer update? Use the <Link className="text-accent hover:underline" to="/contact">contact page</Link> to suggest it.</p>
    </PageShell>
  );
}
