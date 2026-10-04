import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PageShell from "@/components/Shell";
import { CatIcon, CategoryCover, PageHeading } from "@/components/Ui";
import { CATEGORY_GROUPS, groupRoute } from "@/data/categories";
import { countByGroup, STATS } from "@/data/listings";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Categories() {
  usePageMeta("All categories", "All directory categories for Mehrabpur with live listing counts.");
  return (
    <PageShell side={false}>
      <PageHeading title="All categories" sub={`${CATEGORY_GROUPS.length} categories, ${STATS.total} listings. Counts are calculated from the data, not typed in.`} />
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 sm:gap-4">
        {CATEGORY_GROUPS.map((g) => (
          <Link key={g.id} to={groupRoute(g)} className="panel tilt group flex flex-col overflow-hidden">
            <div className="relative h-24"><CategoryCover group={g} className="h-full w-full" /><CatIcon group={g} size={32} className="absolute left-2.5 top-2.5 ring-2 ring-white dark:ring-card" /></div>
            <div className="flex flex-1 items-start gap-2 border-t border-line p-3">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold">{g.label}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{g.blurb}</p>
                <p className="mt-1.5 text-[12px] font-semibold tabular-nums text-accent">{countByGroup(g.id)} listings</p>
              </div>
              <ChevronRight size={16} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
