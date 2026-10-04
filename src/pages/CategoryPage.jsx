import { useMemo } from "react";
import PageShell from "@/components/Shell";
import { CategoryCover, PageHeading } from "@/components/Ui";
import { Filters, ListingGrid, useListingFilter, useSetParam } from "./Businesses";
import { getGroup } from "@/data/categories";
import { byGroup } from "@/data/listings";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function CategoryPage({ groupId, title, sub, meta, before, after }) {
  usePageMeta(title, meta || sub);
  const g = getGroup(groupId);
  const base = useMemo(() => byGroup(groupId), [groupId]);
  const [params, set, clear] = useSetParam();
  const items = useListingFilter(base, params);
  const subs = useMemo(() => [...new Set(base.map((l) => l.sub))].sort(), [base]);
  const areas = useMemo(() => [...new Set(base.map((l) => l.area))].sort(), [base]);
  return (
    <PageShell active={groupId}>
      <div className="panel mb-5 grid overflow-hidden md:grid-cols-[1fr_240px]">
        <div className="p-4 sm:p-5"><PageHeading title={title} sub={sub} /><p className="text-[13px] text-muted">{base.length} listings in this category.</p></div>
        <CategoryCover group={g} className="hidden h-full min-h-[120px] border-l border-line md:block" />
      </div>
      {before}
      <Filters params={params} set={set} areas={areas} showCat={false} subs={subs} />
      <div className="mb-3 flex items-center justify-between text-[13px] text-muted" aria-live="polite">
        <span><strong className="text-ink">{items.length}</strong> of {base.length} listings</span>
        {[...params.keys()].length > 0 && <button type="button" onClick={clear} className="font-semibold text-accent hover:underline">Clear filters</button>}
      </div>
      <ListingGrid key={params.toString()} items={items} />
      {after}
    </PageShell>
  );
}
